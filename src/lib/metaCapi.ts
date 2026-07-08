import { createHash } from "crypto";

// Meta 전환 API(CAPI) — 문의 폼 Lead 이벤트를 서버에서 직접 전송.
// 브라우저 픽셀과 동일한 event_id를 사용해 Meta가 중복 집계를 제거한다.
// META_CAPI_ACCESS_TOKEN이 없으면 조용히 스킵 (로컬 개발 등).

export const META_PIXEL_ID = process.env.META_PIXEL_ID ?? "1713769906448027";

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

// 한국 전화번호를 국가코드 포함 숫자만(E.164)으로 정규화 — Meta 매칭 규격
const normalizePhone = (raw: string) => {
  const digits = raw.replace(/\D/g, "");
  return digits.startsWith("0") ? `82${digits.slice(1)}` : digits;
};

export function sendLeadEvent(params: {
  email: string;
  phone: string;
  eventId: string;
  sourceUrl: string;
  ip?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
}): void {
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!token) return;

  const { email, phone, eventId, sourceUrl, ip, userAgent, fbp, fbc } = params;
  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: sourceUrl,
        user_data: {
          em: [sha256(email.trim().toLowerCase())],
          ph: [sha256(normalizePhone(phone))],
          ...(ip && ip !== "unknown" ? { client_ip_address: ip } : {}),
          ...(userAgent ? { client_user_agent: userAgent } : {}),
          ...(fbp ? { fbp } : {}),
          ...(fbc ? { fbc } : {}),
        },
      },
    ],
  };

  // 응답을 기다리지 않음 — 실패해도 문의 접수에는 영향 없음
  fetch(`https://graph.facebook.com/v23.0/${META_PIXEL_ID}/events?access_token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then(async (res) => {
      if (!res.ok) console.error("[meta-capi] error:", res.status, await res.text());
    })
    .catch((err: unknown) => console.error("[meta-capi] error:", err));
}
