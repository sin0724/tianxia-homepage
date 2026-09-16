import type { Metadata } from "next";
import Link from "next/link";
import { BASE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
  description: "티엔샤 홈페이지 및 Meta 상담 신청의 개인정보 수집·이용, 보관, 위탁과 권리 행사 안내입니다.",
  alternates: { canonical: `${BASE_URL}/privacy` },
  openGraph: {
    title: "개인정보 처리방침 | 티엔샤",
    description: "상담 신청 개인정보 처리와 권리 행사 안내",
    url: `${BASE_URL}/privacy`,
  },
};

const sections = [
  { id: "collection", title: "수집 항목과 이용 목적" },
  { id: "retention", title: "보관기간과 파기" },
  { id: "providers", title: "처리위탁과 국외 이전" },
  { id: "advertising", title: "Meta 광고 측정과 쿠키" },
  { id: "rights", title: "이용자의 권리와 행사 방법" },
  { id: "security", title: "보호 조치" },
  { id: "contact", title: "개인정보 보호 담당자" },
  { id: "changes", title: "시행일과 변경 안내" },
];

function PolicySection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 border-t border-zinc-200 pt-8">
      <h2 className="mb-5 text-xl font-bold tracking-tight text-zinc-950">{title}</h2>
      <div className="space-y-4 text-sm leading-7 text-zinc-700 md:text-base">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-stone-50 px-5 py-10 text-zinc-950 md:px-10 md:py-16">
      <article className="mx-auto max-w-3xl">
        <header className="mb-10">
          <Link href="/" className="text-sm font-bold tracking-widest text-zinc-600 hover:text-red-600">TIANXIA</Link>
          <p className="mt-12 text-xs font-semibold tracking-widest text-red-700">PRIVACY POLICY</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">개인정보 처리방침</h1>
          <p className="mt-5 text-sm text-zinc-500">시행일: 2026년 9월 16일 · 운영자: (주)티엔샤</p>
          <p className="mt-6 leading-7 text-zinc-700">
            (주)티엔샤는 홈페이지와 Facebook·Instagram의 상담 신청 폼을 통해 받은 정보를
            상담 접수, 연락, 견적·제안 및 요청하신 서비스 안내에 이용합니다.
            이 방침은 해당 상담 신청 정보와 홈페이지 이용 과정의 정보 처리에 적용됩니다.
          </p>
        </header>

        <nav aria-label="개인정보 처리방침 목차" className="mb-12 rounded-2xl border border-zinc-200 bg-white p-6">
          <p className="mb-4 text-sm font-bold">필요한 내용 바로 보기</p>
          <ol className="grid gap-3 text-sm sm:grid-cols-2">
            {sections.map((section, index) => (
              <li key={section.id}><a href={`#${section.id}`} className="underline decoration-zinc-300 underline-offset-4 hover:text-red-700">{index + 1}. {section.title}</a></li>
            ))}
          </ol>
        </nav>

        <div className="space-y-10">
          <PolicySection id="collection" title="1. 수집 항목과 이용 목적">
            <p>신청자가 직접 입력하거나 Meta 폼에서 확인하여 제출한 정보를 수집합니다. 각 신청 화면에서 필수 여부를 안내합니다.</p>
            <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
              <table className="w-full min-w-[520px] text-left text-sm">
                <caption className="sr-only">신청 경로별 수집 항목과 목적</caption>
                <thead className="bg-zinc-100"><tr><th scope="col" className="p-4">경로</th><th scope="col" className="p-4">항목</th><th scope="col" className="p-4">목적</th></tr></thead>
                <tbody className="divide-y divide-zinc-200">
                  <tr><th scope="row" className="p-4 font-medium">홈페이지 문의</th><td className="p-4">필수: 브랜드명, 담당자 이름, 전화번호, 이메일, 문의 내용<br />선택: 문의 분야</td><td className="p-4">문의 확인, 상담 연락, 견적·제안, 요청사항 처리</td></tr>
                  <tr><th scope="row" className="p-4 font-medium">Meta 상담 폼</th><td className="p-4">회사·브랜드명, 담당자 이름, 전화번호, 카카오톡 ID 또는 이메일, 업종·관심 서비스 등 해당 폼의 응답, 신청 시각, 폼·광고·리드 식별정보</td><td className="p-4">신청 접수, 담당자 배정, 상담 연락, 상담 이력 및 유입 경로 관리</td></tr>
                  <tr><th scope="row" className="p-4 font-medium">홈페이지 이용</th><td className="p-4">IP 주소, 브라우저 정보, 접속·이벤트 정보, 광고 쿠키 식별자</td><td className="p-4">서비스 운영, 스팸·오류 대응, 광고 유입과 전환 측정</td></tr>
                </tbody>
              </table>
            </div>
            <p>상담에 필요하지 않은 주민등록번호, 금융정보, 건강정보 등은 입력하지 말아 주세요. 필수 정보의 수집·이용에 동의하지 않을 수 있으며, 이 경우 해당 폼을 통한 상담 접수가 제한될 수 있습니다. 선택 항목을 입력하지 않아도 상담을 신청할 수 있습니다.</p>
            <p>신청하신 상담과 별개의 광고성 메시지 발송은 필요한 경우 별도 동의를 받아 진행합니다.</p>
          </PolicySection>

          <PolicySection id="retention" title="2. 보관기간과 파기">
            <p><strong className="text-zinc-950">계약으로 이어지지 않은 상담 정보는 상담 종료 후 1년 동안 보관한 뒤 파기합니다.</strong> 해당 기간은 후속 문의 대응과 중복 상담 확인을 위한 기간입니다. 그 전에 삭제나 동의 철회를 요청하시면 법령상 보관 의무 등 정당한 사유가 없는 한 처리합니다.</p>
            <p>계약으로 이어진 정보는 계약 이행에 필요한 범위에서 관리하며, 관계 법령에 별도 보관 의무가 있는 자료는 해당 법정 기간 동안 분리하여 보관합니다. 단순 상담 기록 전체에 법정 보관기간을 일괄 적용하지 않습니다.</p>
            <p>보관기간이 끝나거나 처리 목적이 달성되면 대상 정보를 확인하여 지체 없이 파기합니다. 전자 기록은 복구·재생되지 않도록 삭제하고, 출력물이 있는 경우 분쇄하거나 소각합니다. 상담 DB뿐 아니라 문의 알림과 재수집 방지 기록 등 관련 저장 위치도 함께 확인합니다. 삭제 요청 이후 동일한 과거 문의가 다시 등록되지 않도록 필요한 최소 식별정보를 사용하는 경우 그 목적이 끝나면 함께 삭제합니다.</p>
          </PolicySection>

          <PolicySection id="providers" title="3. 처리위탁과 국외 이전">
            <p>상담 접수와 관리에 필요한 서버·데이터베이스·알림 서비스를 이용합니다. 필요한 범위에서 수탁자가 정보를 처리하며, 상담정보를 판매하거나 다른 회사의 독자적인 영업 목적으로 제공하지 않습니다. 별도의 선택 동의에 따른 광고 측정 정보의 처리와 Meta의 이용 목적은 제4항에서 구분하여 안내합니다.</p>
            <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
              <table className="w-full min-w-[600px] text-left text-sm">
                <caption className="sr-only">상담 정보 수탁자, 이전 국가, 항목과 목적</caption>
                <thead className="bg-zinc-100"><tr><th scope="col" className="p-4">수탁자·문의</th><th scope="col" className="p-4">이전 국가</th><th scope="col" className="p-4">항목·업무</th></tr></thead>
                <tbody className="divide-y divide-zinc-200">
                  <tr><th scope="row" className="p-4 font-medium">Railway Corp.<br /><a href="mailto:privacy@railway.com" className="text-xs underline">privacy@railway.com</a></th><td className="p-4">미국</td><td className="p-4">홈페이지 및 Meta 상담 신청 정보, 접속 정보 / 서버 운영, 홈페이지 문의 저장, CRM 처리</td></tr>
                  <tr><th scope="row" className="p-4 font-medium">Supabase, Inc.<br /><a href="mailto:privacy@supabase.com" className="text-xs underline">privacy@supabase.com</a></th><td className="p-4">일본 도쿄</td><td className="p-4">Meta 상담 신청 정보, 접수·상담 이력 / CRM 데이터베이스 보관</td></tr>
                  <tr><th scope="row" className="p-4 font-medium">Slack Technologies Limited<br /><span className="text-xs font-normal">서비스 운영: Slack Technologies, LLC</span><br /><a href="mailto:privacy@slack.com" className="text-xs underline">privacy@slack.com</a></th><td className="p-4">미국<br /><span className="text-xs">메시지 저장</span></td><td className="p-4">업체명, 담당자, 연락처, 이메일, 신청 내용 / 담당자에게 신규 문의 알림</td></tr>
                </tbody>
              </table>
            </div>
            <p><strong>이전 시기·방법:</strong> 홈페이지 신청을 제출할 때 또는 Meta 폼 신청을 CRM에서 수집·관리할 때 암호화된 네트워크 통신으로 전송합니다. Slack에는 신규 문의 등록 시 알림이 전달됩니다.</p>
            <p><strong>보유·이용 기간:</strong> 제2항의 상담 정보 보관기간을 넘지 않는 범위에서 처리하며, 처리 목적 달성·동의 철회·위탁 업무 종료 시 필요한 삭제 절차를 진행합니다. 회사는 보관기간 및 삭제 요청에 맞춰 수탁 서비스의 기록을 관리하며, 백업 등은 각 서비스의 계약상 삭제 절차에 따릅니다.</p>
            <p><strong>이전 근거와 선택:</strong> 새 Meta 상담 폼에서는 위 내용을 안내하고 국외 처리위탁·보관에 대한 동의를 받습니다. 신청하신 서비스의 계약 체결·이행을 위하여 필요한 처리위탁·보관에는 개인정보 보호법 제28조의8 제1항 제3호 가목에 따른 공개를 적용합니다. 광고 측정 목적의 이전은 아래 별도의 선택 동의에 따릅니다.</p>
            <p>국외 이전 동의를 거부하거나 철회하려면 폼 제출을 중단하거나 개인정보 담당자에게 요청할 수 있습니다. 온라인 접수에 필요한 이전을 거부하면 해당 폼을 통한 접수·관리가 제한될 수 있습니다. 이메일로 대체 상담 방법을 문의하실 수 있으며, 이메일 서비스 자체의 처리는 해당 제공자의 방침이 적용됩니다.</p>
          </PolicySection>

          <PolicySection id="advertising" title="4. Meta 광고 측정과 쿠키">
            <p>홈페이지에서 광고 측정에 동의한 경우 Meta Pixel과 전환 API를 이용하여 페이지 방문과 상담 신청 이벤트를 측정합니다. 이메일·전화번호는 전환 API 전송 시 해시 처리되며, IP 주소, 브라우저 정보, 광고 쿠키 식별자(_fbp, _fbc), 이벤트 시각·식별자와 페이지 정보가 함께 처리될 수 있습니다. 해시 처리는 익명화를 의미하지 않습니다.</p>
            <p>이 정보는 페이지 방문·문의 제출 시 암호화된 통신으로 미국의 Meta Platforms, Inc.에 전달되어 광고 효과 측정, 매칭·분석, 광고 게재·맞춤화와 Meta 서비스 개선에 이용될 수 있습니다. Meta는 비즈니스 도구 약관에 따라 매칭용 연락처 정보를 매칭 후 삭제하고 이벤트 정보를 최대 2년 보관할 수 있습니다. 생성된 광고 타겟은 별도의 삭제 절차가 적용됩니다. Meta의 글로벌 인프라·협력사를 통한 추가 처리는 Meta의 개인정보처리방침과 데이터 처리 약관에서 안내합니다.</p>
            <p>Meta 문의 창구: Meta Platforms, Inc., 1 Meta Way, Menlo Park, CA 94025, USA. 아래 Meta 개인정보처리방침의 문의·권리 행사 기능을 이용할 수 있습니다.</p>
            <p>Meta 폼에 직접 제출한 정보의 플랫폼 내 처리는 Meta의 방침도 적용됩니다. Meta에서 티엔샤로 전달된 상담 정보는 이 방침에 따라 관리합니다.</p>
            <p>화면의 광고 측정 설정에서 동의·거부를 선택하거나 이전 동의를 철회할 수 있습니다. 거부해도 홈페이지 문의 접수는 가능합니다. 거부 이후에는 이 브라우저에서 향후 Pixel·전환 API 이벤트 전송을 중단합니다. 이미 전달된 정보의 삭제는 개인정보 담당자 또는 Meta에 요청할 수 있습니다.</p>
            <p>브라우저의 개인정보·쿠키 설정에서 쿠키를 차단하거나 삭제하고, Meta 계정의 광고 설정에서도 광고 관련 선택을 관리할 수 있습니다. 선택 상태는 이 브라우저에 저장되므로 다른 기기나 브라우저에서는 다시 선택해야 할 수 있습니다.</p>
            <p><a className="underline underline-offset-4" href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">Meta 개인정보처리방침</a> · <a className="underline underline-offset-4" href="https://www.facebook.com/adpreferences" target="_blank" rel="noopener noreferrer">Meta 광고 설정</a> · <a className="underline underline-offset-4" href="https://www.facebook.com/legal/terms/businesstools" target="_blank" rel="noopener noreferrer">Meta 비즈니스 도구 약관</a></p>
          </PolicySection>

          <PolicySection id="rights" title="5. 이용자의 권리와 행사 방법">
            <p>본인 또는 적법한 대리인은 개인정보 열람, 정정·삭제, 처리정지, 동의 철회를 요청할 수 있습니다. 아래 담당 이메일로 요청 내용과 상담 신청에 사용한 연락처를 보내주시면 본인 여부를 확인한 후 처리 결과를 안내합니다. 주민등록증 사본 등 불필요한 민감정보를 먼저 보내지 말아 주세요.</p>
            <p>법령에 따라 요청이 제한되는 경우에는 그 사유를 안내합니다. 필수 정보의 삭제·처리정지로 상담을 계속할 수 없는 경우에도 먼저 안내합니다.</p>
            <p>침해 신고와 분쟁 상담은 <a href="https://privacy.kisa.or.kr" className="underline underline-offset-4">개인정보침해 신고센터</a> 또는 <a href="https://www.kopico.go.kr" className="underline underline-offset-4">개인정보 분쟁조정위원회</a>를 이용할 수 있습니다.</p>
          </PolicySection>

          <PolicySection id="security" title="6. 보호 조치">
            <p>상담 관리 화면의 인증과 접근 권한, 암호화된 통신, 입력값 검증과 스팸 요청 제한 등을 적용합니다. 개인정보를 처리하는 업무와 계정의 범위를 관리하며, 공개 페이지에 상담 원문이나 연락처를 노출하지 않습니다.</p>
          </PolicySection>

          <PolicySection id="contact" title="7. 개인정보 보호 담당자">
            <dl className="grid grid-cols-[7rem_1fr] gap-x-4 gap-y-2 rounded-xl bg-white p-6 border border-zinc-200">
              <dt className="text-zinc-500">담당자</dt><dd className="font-medium text-zinc-950">신현준</dd>
              <dt className="text-zinc-500">담당 부서</dt><dd>총괄부서</dd>
              <dt className="text-zinc-500">이메일</dt><dd className="break-all"><a href="mailto:b-567@naver.com" className="underline underline-offset-4">b-567@naver.com</a></dd>
            </dl>
          </PolicySection>

          <PolicySection id="changes" title="8. 시행일과 변경 안내">
            <p>이 방침은 2026년 9월 16일부터 적용합니다. 처리 목적·항목·보관기간·위탁 등 내용이 변경되면 이 페이지에 변경 내용과 시행일을 안내하며, 별도의 동의가 필요한 변경은 해당 절차를 거칩니다.</p>
          </PolicySection>
        </div>

        <footer className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
          <p>© 2026 (주)티엔샤 TIANXIA</p>
          <Link href="/" className="underline underline-offset-4 hover:text-red-700">홈페이지로 돌아가기</Link>
        </footer>
      </article>
    </main>
  );
}
