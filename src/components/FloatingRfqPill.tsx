import React from "react";

interface FloatingRfqPillProps {
  selectedCount: number;
  onScrollToRfq: () => void;
}

export const FloatingRfqPill: React.FC<FloatingRfqPillProps> = ({
  selectedCount,
  onScrollToRfq,
}) => {
  const isVisible = selectedCount > 0;

  return (
    <div
      id="floatingRfqPill"
      className={`fixed bottom-[90px] sm:bottom-7 right-4 sm:right-[96px] z-[998] transition-all duration-300 ease-out transform ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-24 opacity-0 pointer-events-none"
      }`}
    >
      <button
        type="button"
        onClick={onScrollToRfq}
        className="group flex items-center gap-3 px-5 py-3 rounded-full bg-[#064E3B] hover:bg-[#04382A] text-[#FBF7ED] shadow-xl hover:shadow-2xl border-2 border-[#E4B329] transition-all duration-200 active:scale-95 cursor-pointer"
        aria-label="View RFQ with selected items"
      >
        <span
          id="rfqBadgeCount"
          className="w-6 h-6 rounded-full bg-[#E4B329] text-[#0B0902] text-xs font-bold flex items-center justify-center shadow-inner font-mono"
        >
          {selectedCount}
        </span>
        <span className="font-semibold text-sm tracking-wide">
          Items Selected — View RFQ
        </span>
        <span className="text-base text-[#E4B329] transition-transform group-hover:translate-x-1">
          →
        </span>
      </button>
    </div>
  );
};
