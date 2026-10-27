import React from "react";

interface FooterProps {
  onNavigate: (targetId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#FAF4DD] border-t border-[#EADFB4] shadow-[0_-1px_8px_rgba(75,60,20,0.03)] mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-10 sm:pt-14 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Column 1: Brand Info */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img
                alt="Prime Fresh Oil Mills"
                className="h-10 w-10 object-contain shrink-0"
                src="./logo.png"
              />
              <span className="text-xl text-[#1C1917] font-bold">
                Prime Fresh Oil Mills
              </span>
            </div>
            <p className="text-sm text-[#44403C] max-w-md leading-relaxed">
              Wholesale manufacturer &amp; bulk supplier of premium edible seeds,
              industrial grade oils, and nutrient-dense de-oiled cakes. Formulated
              to institutional food-grade standards with strict batch tracking.
            </p>

            <div className="flex flex-col gap-1.5 text-xs sm:text-sm text-[#1C1917] mt-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8d4b00] text-[16px]">
                  phone_in_talk
                </span>
                <span>
                  Direct Commercial Desk:{" "}
                  <a
                    className="text-[#8d4b00] hover:underline font-semibold"
                    href="tel:+919057292529"
                  >
                    +91 90572 92529
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8d4b00] text-[16px]">
                  mail
                </span>
                <span>
                  Procurement Inquiries:{" "}
                  <a
                    className="text-[#8d4b00] hover:underline font-semibold"
                    href="mailto:Puneet2garg@gmail.com"
                  >
                    Puneet2garg@gmail.com
                  </a>
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-start gap-4 mt-3 pt-1">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#3B2716] hover:text-[#8d4b00] transition-all duration-200 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#3B2716] hover:text-[#8d4b00] transition-all duration-200 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#3B2716] hover:text-[#8d4b00] transition-all duration-200 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Facility & Operations */}
          <div className="md:col-span-4 flex flex-col gap-2">
            <span className="text-[11px] font-bold text-[#8A5A00] uppercase tracking-wider">
              Facility &amp; Operations
            </span>
            <div className="bg-[#F5ECCF] border border-[#EADFB4]/70 p-4 rounded-xl shadow-[0_1px_3px_rgba(75,60,20,0.04)]">
              <span className="text-xs font-semibold text-[#44403C] block mb-1">
                Industrial Dispatch Location
              </span>
              <p className="text-xs text-[#1C1917] italic">
                [Factory &amp; Corporate Address: To Be Updated / Confirmed]
              </p>
              <span className="text-[11px] font-medium text-[#57534E] block mt-2">
                Logistics: Dispatch via Pan-India Tankers &amp; Heavy Freight Carrier Hubs
              </span>
            </div>
          </div>

          {/* Column 3: Commercial Navigation */}
          <div className="md:col-span-3 flex flex-col gap-2">
            <span className="text-[11px] font-bold text-[#8A5A00] uppercase tracking-wider">
              Commercial Navigation
            </span>
            <nav className="flex flex-col gap-1.5 text-sm">
              <a
                className="transition-colors py-0.5 text-[#8d4b00] font-semibold hover:underline"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("home");
                }}
              >
                Home Overview
              </a>
              <a
                className="text-[#44403C] hover:text-[#1C1917] transition-colors py-0.5"
                href="#catalog"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("catalog");
                }}
              >
                Product Catalog &amp; MOQs
              </a>
              <a
                className="text-[#44403C] hover:text-[#1C1917] transition-colors py-0.5"
                href="#catalog"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("catalog");
                }}
              >
                Wholesale Catalog
              </a>
              <a
                className="text-[#44403C] hover:text-[#1C1917] transition-colors py-0.5"
                href="#quote-section"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("quote-section");
                }}
              >
                Direct B2B Desk
              </a>
              <a
                className="text-[#8d4b00] hover:underline py-0.5 font-semibold"
                href="#quote-section"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("quote-section");
                }}
              >
                Submit RFQ
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#EADFB4]/60 text-xs text-[#57534E]">
          <p className="text-center md:text-left">
            © 2024 Prime Fresh Oil Mills. All commercial rights reserved. Verified wholesale trade portal.
          </p>
          <div>
            <span>
              B2B Commercial Disclaimer: Specifications provided per batch sample. Subject to contractual verification.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
