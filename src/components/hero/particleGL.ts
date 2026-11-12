/**
 * 101 파티클의 WebGL 그리기.
 *
 * 2D 캔버스로는 색 묶음마다 수천 개 삼각형이 든 경로를 통째로 래스터화해야 한다.
 * 타워로 모여 있을 땐 경로가 좁아 괜찮지만, 스크롤로 화면 전체에 흩어지면
 * 경로 하나하나가 캔버스 전체를 덮어 프레임이 뚝뚝 끊겼다 (모바일·고해상도에서 특히).
 *
 * 여기서는 파티클 하나를 점(gl.POINTS) 하나로 보내고, 삼각형 모양은 프래그먼트
 * 셰이더가 거리 함수로 그린다. 파티클이 어디에 흩어져 있든 그리기 호출은 두 번
 * (속 → 뼈대)이고 비용이 거의 같다.
 *
 * 위치·회전·크기 계산(스프링, 흩어짐, 숫자 → 타워)은 그대로 자바스크립트가 하고,
 * 매 프레임 그 결과만 버퍼로 올린다. WebGL을 못 쓰는 환경에서는 null을 돌려주고
 * 호출한 쪽이 2D 캔버스로 그린다.
 */

const VERT = `
attribute vec2 a_pos;    // 화면 px
attribute float a_rot;
attribute float a_size;  // 외접원 반지름, 화면 px
attribute vec3 a_color;
attribute float a_kind;  // 0: 속(외곽선 삼각형), 1: 뼈대(채운 삼각형)
attribute float a_hy;    // 타워 위의 높이 0~1 (빛 훑기용)
uniform vec2 u_res;
uniform float u_dpr;
// 프래그먼트 셰이더도 쓰는 값이다. 정밀도를 똑같이 적지 않으면 링크가 실패한다
// (버텍스는 기본이 highp, 프래그먼트는 mediump).
uniform mediump float u_line;
uniform float u_sweep;
varying vec3 v_color;
varying float v_kind;
varying vec2 v_cs;
varying float v_r;
varying float v_ps;
void main() {
  vec2 clip = (a_pos / u_res) * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  float r = a_size * u_dpr;
  float ps = a_size <= 0.0 ? 0.0 : max(3.0, r * 2.0 + u_line * 2.0 + 3.0);
  gl_PointSize = ps;
  v_ps = ps;
  v_r = r;
  v_cs = vec2(cos(a_rot), sin(a_rot));
  v_kind = a_kind;
  float glow = 1.0 - smoothstep(0.0, 0.05, abs(a_hy - u_sweep));
  v_color = mix(a_color, vec3(1.0), glow * 0.9);
}`;

const FRAG = `
precision mediump float;
uniform float u_alpha;
uniform float u_line;
varying vec3 v_color;
varying float v_kind;
varying vec2 v_cs;
varying float v_r;
varying float v_ps;
// 정삼각형까지의 부호 있는 거리 (r: 변의 절반, 꼭짓점이 위)
float sdTri(vec2 p, float r) {
  const float k = 1.7320508;
  p.x = abs(p.x) - r;
  p.y = p.y + r / k;
  if (p.x + k * p.y > 0.0) p = vec2(p.x - k * p.y, -k * p.x - p.y) / 2.0;
  p.x -= clamp(p.x, -2.0 * r, 0.0);
  return -length(p) * sign(p.y);
}
void main() {
  vec2 p = (gl_PointCoord - 0.5) * v_ps;
  vec2 q = vec2(p.x * v_cs.x + p.y * v_cs.y, -p.x * v_cs.y + p.y * v_cs.x);
  q.y = -q.y;
  float d = sdTri(q, v_r * 0.8660254);
  float a = v_kind > 0.5
    ? 1.0 - smoothstep(-0.6, 0.6, d)
    : 1.0 - smoothstep(u_line - 0.5, u_line + 0.5, abs(d));
  a *= u_alpha;
  if (a < 0.004) discard;
  gl_FragColor = vec4(v_color * a, a);
}`;

/** 파티클마다 바뀌지 않는 값: r, g, b(0~1), kind, hy */
export const GL_STATIC_STRIDE = 5;
/** 매 프레임 바뀌는 값: x, y, rot, size */
export const GL_DYNAMIC_STRIDE = 4;

export type ParticleGL = {
  /** 파티클을 새로 만들었을 때 한 번. 앞쪽 fillCount개가 속, 나머지가 뼈대여야 한다. */
  setParticles(staticData: Float32Array, count: number, fillCount: number): void;
  draw(
    dynamic: Float32Array,
    o: { width: number; height: number; dpr: number; fillAlpha: number; lineAlpha: number; sweepY: number }
  ): void;
  dispose(): void;
};

export function createParticleGL(canvas: HTMLCanvasElement): ParticleGL | null {
  const attrs: WebGLContextAttributes = {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: true,
  };
  let gl: WebGLRenderingContext | null = null;
  try {
    gl = canvas.getContext("webgl", attrs) as WebGLRenderingContext | null;
  } catch {
    gl = null;
  }
  if (!gl) return null;
  const g = gl;

  let program: WebGLProgram | null = null;
  let staticBuf: WebGLBuffer | null = null;
  let dynamicBuf: WebGLBuffer | null = null;
  let dynamicSize = 0;
  let loc: Record<string, number> = {};
  let uni: Record<string, WebGLUniformLocation | null> = {};
  let lost = false;
  // 컨텍스트를 잃었다 되찾으면 다시 올려야 하므로 사본을 들고 있는다
  let kept: { data: Float32Array; count: number; fillCount: number } | null = null;

  function compile(type: number, source: string) {
    const sh = g.createShader(type);
    if (!sh) return null;
    g.shaderSource(sh, source);
    g.compileShader(sh);
    if (!g.getShaderParameter(sh, g.COMPILE_STATUS)) {
      console.warn("[101] 셰이더 컴파일 실패:", g.getShaderInfoLog(sh));
      g.deleteShader(sh);
      return null;
    }
    return sh;
  }

  function init() {
    const vs = compile(g.VERTEX_SHADER, VERT);
    const fs = compile(g.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return false;
    const p = g.createProgram();
    if (!p) return false;
    g.attachShader(p, vs);
    g.attachShader(p, fs);
    g.linkProgram(p);
    if (!g.getProgramParameter(p, g.LINK_STATUS)) {
      console.warn("[101] 셰이더 링크 실패:", g.getProgramInfoLog(p));
      return false;
    }
    program = p;
    loc = {};
    for (const name of ["a_pos", "a_rot", "a_size", "a_color", "a_kind", "a_hy"]) {
      loc[name] = g.getAttribLocation(p, name);
    }
    uni = {};
    for (const name of ["u_res", "u_dpr", "u_line", "u_sweep", "u_alpha"]) {
      uni[name] = g.getUniformLocation(p, name);
    }
    staticBuf = g.createBuffer();
    dynamicBuf = g.createBuffer();
    dynamicSize = 0;
    g.disable(g.DEPTH_TEST);
    g.enable(g.BLEND);
    return true;
  }

  function uploadStatic() {
    if (!kept || !staticBuf) return;
    g.bindBuffer(g.ARRAY_BUFFER, staticBuf);
    g.bufferData(g.ARRAY_BUFFER, kept.data, g.STATIC_DRAW);
  }

  if (!init()) return null;

  const onLost = (e: Event) => {
    e.preventDefault();
    lost = true;
  };
  const onRestored = () => {
    lost = !init();
    uploadStatic();
  };
  canvas.addEventListener("webglcontextlost", onLost);
  canvas.addEventListener("webglcontextrestored", onRestored);

  return {
    setParticles(staticData, count, fillCount) {
      kept = { data: staticData, count, fillCount };
      if (!lost) uploadStatic();
    },

    draw(dynamic, o) {
      if (lost || !program || !kept || kept.count === 0) return;
      const F = Float32Array.BYTES_PER_ELEMENT;
      g.viewport(0, 0, canvas.width, canvas.height);
      g.clearColor(0, 0, 0, 0);
      g.clear(g.COLOR_BUFFER_BIT);
      g.useProgram(program);

      g.bindBuffer(g.ARRAY_BUFFER, staticBuf);
      const ss = GL_STATIC_STRIDE * F;
      g.enableVertexAttribArray(loc.a_color);
      g.vertexAttribPointer(loc.a_color, 3, g.FLOAT, false, ss, 0);
      g.enableVertexAttribArray(loc.a_kind);
      g.vertexAttribPointer(loc.a_kind, 1, g.FLOAT, false, ss, 3 * F);
      g.enableVertexAttribArray(loc.a_hy);
      g.vertexAttribPointer(loc.a_hy, 1, g.FLOAT, false, ss, 4 * F);

      g.bindBuffer(g.ARRAY_BUFFER, dynamicBuf);
      if (dynamicSize !== dynamic.length) {
        g.bufferData(g.ARRAY_BUFFER, dynamic, g.DYNAMIC_DRAW);
        dynamicSize = dynamic.length;
      } else {
        g.bufferSubData(g.ARRAY_BUFFER, 0, dynamic);
      }
      const ds = GL_DYNAMIC_STRIDE * F;
      g.enableVertexAttribArray(loc.a_pos);
      g.vertexAttribPointer(loc.a_pos, 2, g.FLOAT, false, ds, 0);
      g.enableVertexAttribArray(loc.a_rot);
      g.vertexAttribPointer(loc.a_rot, 1, g.FLOAT, false, ds, 2 * F);
      g.enableVertexAttribArray(loc.a_size);
      g.vertexAttribPointer(loc.a_size, 1, g.FLOAT, false, ds, 3 * F);

      g.uniform2f(uni.u_res, o.width, o.height);
      g.uniform1f(uni.u_dpr, o.dpr);
      // 2D 캔버스의 선 굵기 0.9px과 같은 굵기 (반폭, 기기 px)
      g.uniform1f(uni.u_line, 0.45 * o.dpr);
      g.uniform1f(uni.u_sweep, o.sweepY);

      // 속: 빛을 더한다 (겹친 곳이 밝아진다)
      g.blendFunc(g.ONE, g.ONE);
      g.uniform1f(uni.u_alpha, o.fillAlpha);
      g.drawArrays(g.POINTS, 0, kept.fillCount);
      // 뼈대: 그대로 덮어 그린다 (더하면 윤곽이 하얗게 날아간다)
      g.blendFunc(g.ONE, g.ONE_MINUS_SRC_ALPHA);
      g.uniform1f(uni.u_alpha, o.lineAlpha);
      g.drawArrays(g.POINTS, kept.fillCount, kept.count - kept.fillCount);
    },

    dispose() {
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      if (staticBuf) g.deleteBuffer(staticBuf);
      if (dynamicBuf) g.deleteBuffer(dynamicBuf);
      if (program) g.deleteProgram(program);
      kept = null;
    },
  };
}
