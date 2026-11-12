"""
타이베이 101 히어로의 '뼈대' 좌표를 굽는다.

  python scripts/bake-101-skeleton.py

public/images/taipei101-hero.png 에서 타워의 좌우 폭을 행마다 재고, 그 실루엣으로
외곽선·처마·중앙 기둥·하단 장식의 선 좌표를 만들어
src/components/hero/taipei101Skeleton.ts 로 내보낸다.

파티클 컴포넌트(Taipei101Particles)는 이 선 위에 작은 파티클을 촘촘히 올려
윤곽을 또렷하게 만들고, 속은 이미지에서 직접 뽑아 채운다. 이미지를 바꾸면
이 스크립트를 다시 돌려야 뼈대와 속이 어긋나지 않는다.

필요: pillow, numpy, scipy
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from scipy.ndimage import median_filter, uniform_filter1d
from scipy.signal import find_peaks

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public/images/taipei101-hero.png"
OUT = ROOT / "src/components/hero/taipei101Skeleton.ts"

im = Image.open(SRC).convert("RGB")
W, H = im.size
lum = np.asarray(im).max(axis=2).astype(np.uint8)
blur = np.asarray(Image.fromarray(lum).filter(ImageFilter.GaussianBlur(4))).astype(np.float32)

col = blur.sum(axis=0)
cx = float((col * np.arange(W)).sum() / col.sum())
ci = int(round(cx))

# ---- 1) 행마다 좌우 끝: 가운데에서 바깥으로 걸어 나가며 밝기가 끊기는 곳 ----
# 타워 밖에 떠 있는 삼각형 조각은 가운데와 이어져 있지 않아 자연히 빠진다.
THR, GAP = 28, 10


def extent(row: np.ndarray, step: int) -> int:
    x, gap, last = ci, 0, ci
    while 0 <= x < W and gap < GAP:
        if row[x] > THR:
            last, gap = x, 0
        else:
            gap += 1
        x += step
    return last


left = np.array([extent(blur[y], -1) for y in range(H)], dtype=np.float32)
right = np.array([extent(blur[y], 1) for y in range(H)], dtype=np.float32)
# AI 이미지라 좌우가 미세하게 다르다 → 평균 반폭으로 대칭화해서 반듯하게 세운다
hw = (right - left) / 2
# 가장자리에 흩날린 가루 때문에 행마다 들쭉날쭉하다 → 중앙값으로 튀는 값을 누르고 살짝 다듬는다
hw = median_filter(hw, size=11)
hw = uniform_filter1d(hw, size=5)

ys = np.nonzero(hw > 2)[0]
y_top, y_bot = int(ys.min()), int(ys.max())
hw[:y_top] = 0
hw[y_bot + 1 :] = 0

# ---- 2) 처마: 폭이 국소 최대인 행 ----
smooth = uniform_filter1d(hw, size=7)
peaks, _ = find_peaks(smooth, prominence=5, distance=30)
eaves = [int(p) for p in peaks if 120 < p < 720]
# 하단 기단의 가로띠
podium = [int(p) for p in peaks if p >= 880]


def rdp(points: np.ndarray, eps: float) -> np.ndarray:
    """Ramer–Douglas–Peucker 단순화."""
    if len(points) < 3:
        return points
    a, b = points[0], points[-1]
    ab = b - a
    n = np.hypot(*ab) or 1.0
    d = np.abs(ab[0] * (points[:, 1] - a[1]) - ab[1] * (points[:, 0] - a[0])) / n
    i = int(d.argmax())
    if d[i] > eps:
        return np.vstack([rdp(points[: i + 1], eps)[:-1], rdp(points[i:], eps)])
    return np.vstack([a, b])


lines: list[tuple[str, np.ndarray]] = []

# 외곽선 (좌·우 대칭)
rows = np.arange(y_top, y_bot + 1)
for sign in (-1, 1):
    pts = np.stack([cx + sign * hw[rows], rows.astype(np.float32)], axis=1)
    # 단순화 허용치를 넉넉히 줘서 층의 옆면이 곧은 선분으로 떨어지게 한다
    lines.append(("outline", rdp(pts, 2.2)))

# 처마: 양 끝이 낮고 가운데가 솟은 지붕선
RISE = 22.0
for ye in eaves:
    half = float(hw[ye])
    xs = np.linspace(-half, half, 41)
    yy = ye - RISE * (1 - (np.abs(xs) / half) ** 1.5)
    lines.append(("eave", np.stack([cx + xs, yy], axis=1)))

# 기단 가로띠
for yp in podium:
    half = float(hw[yp])
    lines.append(("eave", np.array([[cx - half, yp], [cx + half, yp]], dtype=np.float32)))

# 중앙 기둥: 몸통은 두 줄, 첨탑은 한 줄
body_top = eaves[0] - int(RISE) if eaves else y_top + 110
SPINE = 11.0
lines.append(("spine", np.array([[cx, y_top], [cx, body_top]], dtype=np.float32)))
for sign in (-1, 1):
    lines.append(
        ("spine", np.array([[cx + sign * SPINE, body_top], [cx + sign * SPINE, y_bot]], dtype=np.float32))
    )

# 하단 원형 장식(여의 문양) 두 개 — 이미지에서 잰 위치
for mx in (300.0, 387.0):
    for r in (14.0, 7.0):
        t = np.linspace(0, 2 * np.pi, 33)
        lines.append(("ring", np.stack([mx + np.cos(t) * r, 768 + np.sin(t) * r], axis=1)))

# ---- 3) 내보내기 ----
# 반폭 프로파일은 128행으로 줄여서: 타워 안/밖 판정과 입체감(깊이) 계산에 쓴다
PROFILE_ROWS = 128
prof = [float(hw[min(H - 1, int(round(i * (H - 1) / (PROFILE_ROWS - 1))))]) / W for i in range(PROFILE_ROWS)]


def fmt(v: float) -> str:
    return f"{v:.4f}".rstrip("0").rstrip(".")


out = [
    "// scripts/bake-101-skeleton.py 가 만든 파일 — 손으로 고치지 말 것.",
    "// 좌표는 모두 원본 이미지 기준 0~1 (x는 폭, y는 높이).",
    "",
    'export type SkeletonKind = "outline" | "eave" | "spine" | "ring";',
    "",
    f"export const T101_CX = {fmt(cx / W)};",
    f"export const T101_TOP = {fmt(y_top / H)};",
    f"export const T101_BOTTOM = {fmt(y_bot / H)};",
    "",
    "/** 행별 타워 반폭 (y = i / (length - 1)) */",
    "export const T101_HALF_WIDTH: number[] = [" + ",".join(fmt(v) for v in prof) + "];",
    "",
    "/** [종류, x0, y0, x1, y1, ...] */",
    "export const T101_LINES: [SkeletonKind, ...number[]][] = [",
]
for kind, pts in lines:
    flat = ",".join(f"{fmt(x / W)},{fmt(y / H)}" for x, y in pts)
    out.append(f'  ["{kind}",{flat}],')
out.append("];")
out.append("")
OUT.write_text("\n".join(out), encoding="utf-8")

total = sum(float(np.hypot(*np.diff(p, axis=0).T).sum()) for _, p in lines)
print(f"cx={cx:.1f} top={y_top} bottom={y_bot} eaves={eaves} podium={podium}")
print(f"lines={len(lines)} total_length={total:.0f}px -> {OUT.relative_to(ROOT)} ({OUT.stat().st_size} bytes)")
