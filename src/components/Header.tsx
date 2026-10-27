import React, { useState, useEffect } from "react";

interface HeaderProps {
  onNavigate: (targetId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    setIsDrawerOpen(false);
    onNavigate(targetId);
  };

  const toggleDrawer = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDrawerOpen((prev) => !prev);
  };

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen]);

  return (
    <>
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
          {/* Brand / Logo — Click Trigger for Slide-Out Drawer */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={toggleDrawer}
              aria-expanded={isDrawerOpen}
              aria-controls="mobile-nav-drawer"
              aria-label="Open navigation menu"
              className="flex items-center gap-3 transition-all duration-200 hover:opacity-90 active:scale-[0.98] cursor-pointer text-left focus:outline-none group"
            >
              <img
                alt="Prime Fresh Oil Mills"
                className="h-11 w-11 sm:h-12 sm:w-12 object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
                src="/logo.png"
              />
              <span className="font-bold text-lg sm:text-xl text-[#1C1917] tracking-tight leading-none">
                Prime Fresh Oil Mills
              </span>
            </button>
          </div>

          {/* Desktop Navigation pill */}
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
              href="#home"
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
              className="header-cta-glass inline-flex items-center justify-center whitespace-nowrap cursor-pointer active:scale-95"
              href="#quote-section"
              onClick={(e) => handleNavClick(e, "quote-section")}
            >
              <span className="sm:hidden">Get Quote</span>
              <span className="hidden sm:inline">Request a Quote</span>
            </a>
          </div>
        </div>
      </header>

      {/* Backdrop Overlay */}
      <div
        className={`drawer-backdrop ${
          isDrawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-Out Drawer Menu (Left to Right) */}
      <aside
        id="mobile-nav-drawer"
        aria-label="Mobile Navigation Drawer"
        aria-hidden={!isDrawerOpen}
        className="drawer-panel flex flex-col justify-between p-5"
        style={{
          transform: isDrawerOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div>
          {/* Drawer Header with Logo & Close (X) Button */}
          <div className="flex items-center justify-between pb-5 mb-4 border-b border-[#EADFB4]/60">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="Prime Fresh Oil Mills"
                className="h-9 w-9 object-contain shrink-0"
              />
              <span className="font-bold text-base text-[#1C1917] tracking-tight leading-tight">
                Prime Fresh Oil Mills
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Close navigation menu"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#44403C] hover:text-[#1C1917] hover:bg-black/5 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <svg
                className="w-5 h-5 stroke-current"
                fill="none"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Primary Navigation Links */}
          <nav className="flex flex-col space-y-1.5">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "home")}
              className="drawer-nav-link"
            >
              <span>Home</span>
              <span className="text-sm text-[#8d4b00]/60">→</span>
            </a>

            <a
              href="#catalog"
              onClick={(e) => handleNavClick(e, "catalog")}
              className="drawer-nav-link"
            >
              <span>Catalog</span>
              <span className="text-sm text-[#8d4b00]/60">→</span>
            </a>

            <a
              href="#about"
              onClick={(e) => handleNavClick(e, "about")}
              className="drawer-nav-link"
            >
              <span>About Us</span>
              <span className="text-sm text-[#8d4b00]/60">→</span>
            </a>
          </nav>
        </div>

        {/* Bottom Direct Desk Info inside Drawer */}
        <div className="pt-4 border-t border-[#EADFB4]/60">
          <span className="text-[11px] font-bold text-[#8A5A00] uppercase tracking-wider block mb-2">
            Direct Commercial Desk
          </span>
          <a
            href="tel:+919057292529"
            className="flex items-center gap-2.5 py-2 px-3 rounded-xl bg-white/60 border border-white/80 text-xs font-semibold text-[#1C1917] hover:text-[#8d4b00] transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[#8d4b00] text-[18px]">
              call
            </span>
            <span>+91 90572 92529</span>
          </a>
        </div>
      </aside>
    </>
  );
};
