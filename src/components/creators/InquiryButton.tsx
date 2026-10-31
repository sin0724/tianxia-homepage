"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { ContactModal } from "@/components/sections/ContactSection";

const DEFAULT_CLASS =
  "inline-block px-6 py-3 bg-iris text-white text-sm font-bold hover:bg-iris-hover transition-colors";

/**
 * 크리에이터 섭외 문의 버튼.
 * 홈 Contact 섹션(/#contact)을 거치지 않고 문의 폼을 바로 띄우며,
 * 어떤 크리에이터를 보고 문의했는지 문의분야·내용에 미리 채워 둔다.
 */
export default function InquiryButton({
  label,
  creator,
  inquiry = "크리에이터 섭외",
  className = DEFAULT_CLASS,
  children,
}: {
  label: string;
  /** 특정 크리에이터 상세에서 누른 경우 "이름 (분류)" */
  creator?: string;
  /** 문의분야 칸에 미리 채울 값 */
  inquiry?: string;
  /** 기본 빨간 버튼 대신 다른 모양이 필요할 때 통째로 바꾼다 */
  className?: string;
  /** 지정하면 label 대신 이 내용을 버튼 안에 그린다 (label은 접근성 이름으로 쓴다) */
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={children ? label : undefined}
        className={className}
      >
        {children ?? label}
      </button>
      <AnimatePresence>
        {open && (
          <ContactModal
            onClose={() => setOpen(false)}
            defaultInquiry={inquiry}
            defaultMessage={
              creator
                ? `섭외 희망 크리에이터: ${creator}\n\n캠페인 내용·일정: `
                : undefined
            }
          />
        )}
      </AnimatePresence>
    </>
  );
}
