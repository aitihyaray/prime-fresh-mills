import React from "react";

interface HeaderProps {
  onNavigate: (targetId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    onNavigate(targetId);
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-[100] shadow-sm transition-all"
      style={{
        background: "rgba(251, 246, 236, 0.85)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(229, 215, 181, 0.4)",
        boxShadow:
          "rgba(0, 0, 0, 0.04) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 0px 0px inset",
      }}
    >
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-4 shrink-0">
          <a
            href="#"
            onClick={(e) => handleNavClick(e, "home")}
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <img
              alt="Prime Fresh Oil Mills"
              className="h-11 w-11 sm:h-12 sm:w-12 object-contain shrink-0"
              src="/logo.png"
            />
            <span className="font-bold text-lg sm:text-xl text-[#1C1917] tracking-tight leading-none">
              Prime Fresh Oil Mills
            </span>
          </a>
        </div>

        {/* Navigation pill */}
        <nav
          className="hidden lg:flex items-center p-1 rounded-full border border-white/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-white/90 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:bg-white/20"
          style={{
            background: "rgba(0, 0, 0, 0.03)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <a
            className="text-sm text-[#8d4b00] font-bold transition-all duration-200 hover:scale-[1.03] hover:shadow-md px-4 py-1.5 rounded-full shadow-sm"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              boxShadow:
                "rgba(0, 0, 0, 0.06) 0px 2px 8px, rgba(255, 255, 255, 0.9) 0px 1px 0px inset",
            }}
            href="#"
            onClick={(e) => handleNavClick(e, "home")}
          >
            Home
          </a>
          <a
            className="text-sm text-[#44403C] hover:text-[#8d4b00] hover:bg-white/90 hover:shadow-sm hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 px-4 py-1.5 rounded-full"
            href="#catalog"
            onClick={(e) => handleNavClick(e, "catalog")}
          >
            Products
          </a>
          <a
            className="text-sm text-[#44403C] hover:text-[#8d4b00] hover:bg-white/90 hover:shadow-sm hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 px-4 py-1.5 rounded-full"
            href="#infrastructure"
            onClick={(e) => handleNavClick(e, "infrastructure")}
          >
            About Scope
          </a>
          <a
            className="text-sm text-[#44403C] hover:text-[#8d4b00] hover:bg-white/90 hover:shadow-sm hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 px-4 py-1.5 rounded-full"
            href="#quote-section"
            onClick={(e) => handleNavClick(e, "quote-section")}
          >
            Contact
          </a>
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center gap-4">
          <a
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#1C1917] hover:text-[#8d4b00] transition-all py-1.5 px-3.5 rounded-full border border-white/80 shadow-sm hover:shadow"
            style={{
              background: "rgba(255, 255, 255, 0.65)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow:
                "rgba(0, 0, 0, 0.05) 0px 1px 3px, rgba(255, 255, 255, 0.9) 0px 1px 0px inset",
            }}
            href="tel:+919057292529"
          >
            <span className="material-symbols-outlined text-[#8d4b00] text-[18px]">
              call
            </span>
            <span className="font-medium">+91 90572 92529</span>
          </a>

          <a
            className="inline-flex items-center justify-center text-sm font-semibold text-white bg-[#8d4b00] hover:bg-[#b15f00] px-5 h-10 rounded-full transition-all shadow-[0_2px_8px_rgba(141,75,0,0.25)] hover:shadow-[0_4px_16px_rgba(141,75,0,0.35)] border border-[#8d4b00]/30"
            style={{
              boxShadow:
                "rgba(141, 75, 0, 0.28) 0px 2px 10px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset",
            }}
            href="#quote-section"
            onClick={(e) => handleNavClick(e, "quote-section")}
          >
            Request a Quote
          </a>

          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 border border-white/80 shadow-sm transition-all"
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <span className="material-symbols-outlined text-[#8d4b00] text-[18px]">
              person
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
