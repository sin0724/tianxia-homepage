export const META_CONSENT_COOKIE = "tianxia_meta_consent";
export const META_CONSENT_CHANGED = "tianxia:meta-consent-changed";
export const META_CONSENT_SETTINGS = "tianxia:meta-consent-settings";
export const META_CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

export type MetaConsentChoice = "granted" | "denied";

export function isPublicMetaPath(pathname: string): boolean {
  return ["/", "/privacy", "/shopee", "/kol-marketing", "/taiwan-marketing", "/taiwan-marketing/gonggu", "/taiwan-marketing/dcard"].includes(pathname);
}

export function isMetaConsentGranted(value: unknown): boolean {
  return value === "granted";
}

export function readMetaConsent(cookieHeader: string): MetaConsentChoice | null {
  const value = cookieHeader.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${META_CONSENT_COOKIE}=`))
    ?.slice(META_CONSENT_COOKIE.length + 1);
  return value === "granted" || value === "denied" ? value : null;
}

export function getBrowserMetaConsent(): MetaConsentChoice | null {
  return typeof document === "undefined" ? null : readMetaConsent(document.cookie);
}

export function saveMetaConsent(choice: MetaConsentChoice): void {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${META_CONSENT_COOKIE}=${choice}; Path=/; Max-Age=${META_CONSENT_MAX_AGE}; SameSite=Lax${secure}`;
  window.dispatchEvent(new Event(META_CONSENT_CHANGED));
  // 다른 탭에는 변경 사실만 알린다. 동의 여부는 항상 같은 HTTP 쿠키에서 읽는다.
  try {
    localStorage.setItem(META_CONSENT_CHANGED, `${Date.now()}-${choice}`);
  } catch {
    // 저장소가 차단되어도 동의 쿠키와 현재 탭의 선택은 정상 작동한다.
  }
}
