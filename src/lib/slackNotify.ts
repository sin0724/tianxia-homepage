// 새 문의 슬랙 알림 — Incoming Webhook으로 채널에 메시지를 보낸다.
// SLACK_WEBHOOK_URL이 없으면 조용히 스킵 (로컬 개발 등).
// 실패해도 문의 접수는 이미 DB에 저장된 뒤라 응답에 영향을 주지 않는다.

// 슬랙 mrkdwn에서 특수문자로 해석되는 것만 이스케이프
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function notifySlackContact(params: {
  brand: string;
  name: string;
  phone: string;
  email: string;
  inquiry: string;
  message: string;
  isSpam: boolean;
}): void {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;

  const { brand, name, phone, email, inquiry, message, isSpam } = params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tianxia.kr";
  const title = `${isSpam ? "[스팸의심] " : ""}새 홈페이지 문의 — ${brand} · ${name}`;
  // 슬랙 section 텍스트는 3000자 제한이라 본문은 잘라서 보낸다. 전문은 어드민에서.
  // 이스케이프하면 길이가 늘어나므로 이스케이프한 뒤에 자른다.
  const escaped = esc(message);
  const body = escaped.length > 2800 ? `${escaped.slice(0, 2800)}…` : escaped;

  const payload = {
    text: esc(title), // 모바일 푸시·알림 미리보기에 쓰인다
    blocks: [
      { type: "header", text: { type: "plain_text", text: title.slice(0, 150) } },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*브랜드명*\n${esc(brand)}` },
          { type: "mrkdwn", text: `*담당자*\n${esc(name)}` },
          { type: "mrkdwn", text: `*연락처*\n${esc(phone)}` },
          { type: "mrkdwn", text: `*이메일*\n${esc(email)}` },
          { type: "mrkdwn", text: `*문의 분야*\n${esc(inquiry || "—")}` },
        ],
      },
      { type: "section", text: { type: "mrkdwn", text: `>>> ${body}` } },
      {
        type: "context",
        elements: [{ type: "mrkdwn", text: `<${siteUrl}/admin|어드민에서 보기>` }],
      },
    ],
  };

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(5000),
  })
    .then(async (res) => {
      if (!res.ok) console.error("[contact] slack error:", res.status, await res.text());
    })
    .catch((err: unknown) => console.error("[contact] slack error:", err));
}
