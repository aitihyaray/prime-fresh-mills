import React, { useState } from "react";
import { ALL_PRODUCT_OPTIONS } from "../data/portalData";

interface QuoteSectionProps {
  selectedProducts: Set<string>;
  onAddProduct: (prod: string) => void;
  onRemoveProduct: (prod: string) => void;
  onClearProducts: () => void;
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({
  selectedProducts,
  onAddProduct,
  onRemoveProduct,
  onClearProducts,
}) => {
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [volume, setVolume] = useState("");
  const [location, setLocation] = useState("");
  const [specifications, setSpecifications] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showProductError, setShowProductError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedProducts.size === 0) {
      setShowProductError(true);
      setTimeout(() => setShowProductError(false), 2000);
      const chipsEl = document.getElementById("productChipsBox");
      if (chipsEl) {
        chipsEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCompanyName("");
    setPhone("");
    setEmail("");
    setVolume("");
    setLocation("");
    setSpecifications("");
    onClearProducts();
  };

  const count = selectedProducts.size;

  return (
    <>
      <div id="infrastructure" className="scroll-mt-24" />
      <section
        className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12 sm:py-16 scroll-mt-20"
        id="quote-section"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Commercial Contacts & Direct Desk */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold text-[#8A5A00] uppercase tracking-wider block">
                  Commercial Engagement
                </span>
                <h2 className="text-3xl sm:text-4xl text-[#1C1917] tracking-tight font-bold mt-1">
                  Request a Wholesale Quotation
                </h2>
                <p className="text-base text-[#44403C] mt-2 leading-relaxed">
                  Connect directly with our commercial desk for real-time spot rates,
                  scheduled quarterly contracts, and bulk packaging specifications.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-3 pt-2">
                <a
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#F5ECCF] hover:bg-[#F3E8C8] border border-[#EADFB4]/70 transition-colors shadow-xs"
                  href="tel:+919057292529"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#8d4b00] text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[24px]">
                      call
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#57534E] uppercase tracking-wider block">
                      Direct Commercial Desk
                    </span>
                    <span className="text-xl text-[#1C1917] font-bold">
                      +91 90572 92529
                    </span>
                    <span className="text-xs text-[#44403C] block">
                      Mon - Sat (9:00 AM - 7:00 PM IST)
                    </span>
                  </div>
                </a>

                <a
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#F5ECCF] hover:bg-[#F3E8C8] border border-[#EADFB4]/70 transition-colors shadow-xs"
                  href="mailto:Puneet2garg@gmail.com"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#EDE1BF] border border-[#EADFB4]/60 text-[#8d4b00] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[24px]">
                      mail
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#57534E] uppercase tracking-wider block">
                      Procurement &amp; Inquiries
                    </span>
                    <span className="text-lg sm:text-xl text-[#1C1917] font-bold break-all">
                      Puneet2garg@gmail.com
                    </span>
                    <span className="text-xs text-[#44403C] block">
                      Official Quotations &amp; Billing Desk
                    </span>
                  </div>
                </a>

                {/* Corporate / Mill Facility Note */}
                <div className="p-4 rounded-xl bg-[#FAF4DD] border border-[#EADFB4]/60 shadow-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-[#8A5A00] text-[20px]">
                      factory
                    </span>
                    <span className="text-[11px] text-[#8A5A00] font-bold uppercase tracking-wider">
                      Manufacturing Unit
                    </span>
                  </div>
                  <p className="text-sm text-[#1C1917] italic font-medium">
                    [Factory &amp; Corporate Address: To Be Updated / Confirmed]
                  </p>
                  <p className="text-xs text-[#44403C] mt-2 leading-relaxed">
                    Logistics: Dispatches routed via Pan-India multi-axle tankers,
                    containerized freight, and local logistics freight hubs.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 bg-[#F3E8C8] border border-[#EADFB4]/70 rounded-xl text-[#44403C] text-xs">
              <p>
                Notice: All bulk consignments are weighed on verified commercial
                weighbridges with electronic tare reconciliation slips.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Quotation Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white border border-[#EADFB4]/80 p-6 md:p-8 shadow-lg relative min-h-[460px]">
              <div className="mb-6">
                <h3 className="text-2xl text-[#1C1917] font-bold">
                  Submit RFQ / Commercial Inquiry
                </h3>
                <p className="text-sm text-[#44403C] mt-1">
                  Please provide estimated volumes and destination points for accurate
                  freight factoring.
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                    htmlFor="companyName"
                  >
                    Company / Enterprise Name *
                  </label>
                  <input
                    className="w-full h-11 px-3 rounded-lg bg-[#FAF4DD] border border-[#EADFB4]/70 text-[#1C1917] text-sm focus:bg-white focus:ring-2 focus:ring-[#8d4b00] outline-none transition-all"
                    id="companyName"
                    placeholder="e.g., Agro Foods Pvt Ltd"
                    required
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                      htmlFor="phone"
                    >
                      Contact Number *
                    </label>
                    <input
                      className="w-full h-11 px-3 rounded-lg bg-[#FAF4DD] border border-[#EADFB4]/70 text-[#1C1917] text-sm focus:bg-white focus:ring-2 focus:ring-[#8d4b00] outline-none transition-all"
                      id="phone"
                      placeholder="+91 XXXXX XXXXX"
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                      htmlFor="email"
                    >
                      Business Email *
                    </label>
                    <input
                      className="w-full h-11 px-3 rounded-lg bg-[#FAF4DD] border border-[#EADFB4]/70 text-[#1C1917] text-sm focus:bg-white focus:ring-2 focus:ring-[#8d4b00] outline-none transition-all"
                      id="email"
                      placeholder="procurement@company.com"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Multi-Tag Product Selector */}
                <div className="space-y-1.5" id="multiProductSelectorContainer">
                  <div className="flex items-center justify-between">
                    <label
                      className="block text-xs font-semibold text-[#1C1917]"
                      htmlFor="productDropdown"
                    >
                      Products of Interest *
                    </label>
                    <span
                      id="selectedCountText"
                      className="text-xs text-[#44403C] font-medium"
                    >
                      {count === 1 ? "1 product selected" : `${count} products selected`}
                    </span>
                  </div>

                  {/* Selected Chips Container */}
                  <div
                    id="productChipsBox"
                    className={`min-h-[48px] p-2.5 rounded-lg bg-[#FAF4DD] border flex flex-wrap items-center gap-2 transition-all ${
                      showProductError
                        ? "ring-2 ring-red-500 border-red-400"
                        : "border-[#EADFB4]/80"
                    }`}
                  >
                    {count === 0 ? (
                      <span
                        id="emptyChipsPlaceholder"
                        className="text-xs text-[#44403C]/70 italic select-none py-1 px-1"
                      >
                        Select products from catalog or dropdown below...
                      </span>
                    ) : (
                      Array.from(selectedProducts).map((prod) => (
                        <span
                          key={prod}
                          className="product-chip inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B4513]/10 border border-[#8B4513]/30 text-[#8B4513] text-xs font-semibold animate-chip-in transition-all hover:bg-[#8B4513]/15 select-none"
                        >
                          <span>{prod}</span>
                          <button
                            type="button"
                            className="w-4 h-4 rounded-full inline-flex items-center justify-center hover:bg-[#8B4513] hover:text-white transition-colors cursor-pointer ml-0.5 text-sm leading-none"
                            aria-label={`Remove ${prod}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveProduct(prod);
                            }}
                          >
                            &times;
                          </button>
                        </span>
                      ))
                    )}
                  </div>

                  {/* Add Another Product Dropdown */}
                  <div className="relative pt-0.5">
                    <select
                      id="productDropdown"
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val) {
                          onAddProduct(val);
                          e.target.value = "";
                        }
                      }}
                      defaultValue=""
                      className="w-full h-11 px-3 rounded-lg bg-[#FAF4DD] border border-[#EADFB4]/80 text-[#1C1917] text-sm focus:bg-white focus:ring-2 focus:ring-[#8d4b00] outline-none transition-all cursor-pointer"
                    >
                      <option value="" disabled>
                        + Add another product from catalog...
                      </option>
                      {ALL_PRODUCT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          🌾 {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                      htmlFor="volume"
                    >
                      Order Volume *
                    </label>
                    <input
                      className="w-full h-11 px-3 rounded-lg bg-[#FAF4DD] border border-[#EADFB4]/70 text-[#1C1917] text-sm focus:bg-white focus:ring-2 focus:ring-[#8d4b00] outline-none transition-all"
                      id="volume"
                      placeholder="e.g. 5 Metric Tons or 2,000 Liters"
                      required
                      type="text"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                      htmlFor="location"
                    >
                      Delivery Destination / Warehouse / Port *
                    </label>
                    <input
                      className="w-full h-11 px-3 rounded-lg bg-[#FAF4DD] border border-[#EADFB4]/70 text-[#1C1917] text-sm focus:bg-white focus:ring-2 focus:ring-[#8d4b00] outline-none transition-all"
                      id="location"
                      placeholder="City, State / PIN Code / Freight Hub"
                      required
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                    htmlFor="specifications"
                  >
                    Technical Specs or Packaging Notes
                  </label>
                  <textarea
                    className="w-full p-3 rounded-lg bg-[#FAF4DD] border border-[#EADFB4]/70 text-[#1C1917] text-sm focus:bg-white focus:ring-2 focus:ring-[#8d4b00] outline-none transition-all"
                    id="specifications"
                    placeholder="Enter packaging preferences (Barrels/Tins/Bags), moisture tolerance, or delivery timeline requirements..."
                    rows={3}
                    value={specifications}
                    onChange={(e) => setSpecifications(e.target.value)}
                  />
                </div>

                <div className="pt-2">
                  <button
                    className="w-full inline-flex items-center justify-center text-sm font-semibold text-white bg-[#8d4b00] hover:bg-[#b15f00] h-12 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-75 cursor-pointer"
                    id="submitBtn"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <span>
                      {isSubmitting ? "Processing..." : "Submit Quote Request"}
                    </span>
                    <span className="material-symbols-outlined ml-2 text-[20px]">
                      assignment_turned_in
                    </span>
                  </button>
                </div>
              </form>

              {/* Toast Notification Overlay */}
              {isSubmitted && (
                <div
                  className="absolute inset-0 bg-[#FFFCF0]/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center z-20 animate-fade-in"
                  id="toastNotification"
                >
                  <div className="w-16 h-16 rounded-full bg-[#FEE6B3] border border-[#EADFB4] text-[#8d4b00] flex items-center justify-center mb-3 shadow-md animate-bounce">
                    <span className="material-symbols-outlined text-[36px]">
                      check_circle
                    </span>
                  </div>
                  <h4 className="text-2xl text-[#1C1917] font-bold">
                    Quotation Request Logged
                  </h4>
                  <p className="text-sm sm:text-base text-[#44403C] max-w-md mt-2 leading-relaxed">
                    Thank you! Your commercial inquiry has been logged on our desk.
                    Our sales team will follow up via{" "}
                    <strong className="text-[#1C1917]">Puneet2garg@gmail.com</strong>{" "}
                    or phone directly.
                  </p>
                  <button
                    className="mt-6 px-6 py-2 rounded-lg bg-[#F5ECCF] hover:bg-[#F3E8C8] border border-[#EADFB4] text-[#1C1917] text-xs font-semibold transition-colors cursor-pointer"
                    onClick={handleReset}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
