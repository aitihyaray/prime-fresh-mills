import React, { useState } from "react";
import { ALL_PRODUCT_OPTIONS } from "../data/portalData";

// Owner's WhatsApp Number (Country code + 10-digit number, no '+' or spaces, e.g., '91XXXXXXXXXX')
const OWNER_WHATSAPP_NUMBER = "919057292529";

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
  const [validationAlert, setValidationAlert] = useState<string | null>(null);

  const showInlineAlert = (msg: string) => {
    setValidationAlert(msg);
    setTimeout(() => {
      setValidationAlert((current) => (current === msg ? null : current));
    }, 4500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationAlert(null);

    if (selectedProducts.size === 0) {
      setShowProductError(true);
      showInlineAlert(
        "Please select at least one product from the catalog or dropdown before submitting."
      );
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

  const handleWhatsAppInquiry = () => {
    setValidationAlert(null);

    const missingFields: string[] = [];
    if (selectedProducts.size === 0) {
      missingFields.push("at least one Product of Interest");
      setShowProductError(true);
      setTimeout(() => setShowProductError(false), 2200);
    }
    if (!companyName.trim()) missingFields.push("Company Name");
    if (!phone.trim()) missingFields.push("Contact Number");
    if (!email.trim()) missingFields.push("Business Email");

    if (missingFields.length > 0) {
      showInlineAlert(
        `Please provide ${missingFields.join(", ")} before sending via WhatsApp.`
      );
      if (selectedProducts.size === 0) {
        const chipsEl = document.getElementById("productChipsBox");
        if (chipsEl) {
          chipsEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
      return;
    }

    const productsBulletList = Array.from(selectedProducts)
      .map((prod) => `- ${prod}`)
      .join("\n");

    const requirementLines: string[] = [];
    if (volume.trim()) {
      requirementLines.push(`*Order Volume:* ${volume.trim()}`);
    }
    if (location.trim()) {
      requirementLines.push(`*Delivery Destination:* ${location.trim()}`);
    }
    if (specifications.trim()) {
      requirementLines.push(`*Packaging / Specs:* ${specifications.trim()}`);
    }
    requirementLines.push(
      "Please provide freight factoring and rate quotation for the above items."
    );

    const messageText = [
      "*New Commercial Inquiry - Prime Fresh Oil Mills*",
      "",
      `*Company:* ${companyName.trim()}`,
      `*Contact:* ${phone.trim()}`,
      `*Email:* ${email.trim()}`,
      "",
      "*Products of Interest:*",
      productsBulletList,
      "",
      "*Requirement Details:*",
      ...requirementLines,
    ].join("\n");

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab safely
    const anchor = document.createElement("a");
    anchor.href = whatsappUrl;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setValidationAlert(null);
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
        {/* Ornamental Connected 4-Petal Floral Frieze Divider */}
        <div className="arch-divider max-w-md mx-auto mb-10" aria-hidden="true">
          <svg
            width="132"
            height="36"
            viewBox="0 0 132 36"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M22 18 C17 11 17 5 22 0 C27 5 27 11 22 18 Z M22 18 C17 25 17 31 22 36 C27 31 27 25 22 18 Z M22 18 C14 13 6 13 0 18 C6 23 14 23 22 18 Z M22 18 C30 13 38 13 44 18 C38 23 30 23 22 18 Z"
              stroke="#E4B329"
              strokeWidth="1.6"
              strokeLinejoin="round"
              fill="rgba(228, 179, 41, 0.08)"
            />
            <circle cx="22" cy="18" r="2" fill="#064E3B" />
            <path
              d="M66 18 C61 11 61 5 66 0 C71 5 71 11 66 18 Z M66 18 C61 25 61 31 66 36 C71 31 71 25 66 18 Z M66 18 C58 13 50 13 44 18 C50 23 58 23 66 18 Z M66 18 C74 13 82 13 88 18 C82 23 74 23 66 18 Z"
              stroke="#E4B329"
              strokeWidth="1.8"
              strokeLinejoin="round"
              fill="rgba(228, 179, 41, 0.14)"
            />
            <circle cx="66" cy="18" r="2.4" fill="#064E3B" />
            <path
              d="M110 18 C105 11 105 5 110 0 C115 5 115 11 110 18 Z M110 18 C105 25 105 31 110 36 C115 31 115 25 110 18 Z M110 18 C102 13 94 13 88 18 C94 23 102 23 110 18 Z M110 18 C118 13 126 13 132 18 C126 23 118 23 110 18 Z"
              stroke="#E4B329"
              strokeWidth="1.6"
              strokeLinejoin="round"
              fill="rgba(228, 179, 41, 0.08)"
            />
            <circle cx="110" cy="18" r="2" fill="#064E3B" />
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Commercial Contacts & Direct Desk */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold text-[#8A6A00] uppercase tracking-[0.2em] block">
                  Commercial Engagement
                </span>
                <h2 className="text-3xl sm:text-4xl text-[#064E3B] tracking-tight font-bold mt-1">
                  Request a Wholesale Quotation
                </h2>
                <p className="text-base text-[#0B0902]/80 mt-2 leading-relaxed">
                  Connect directly with our commercial desk for real-time spot
                  rates, scheduled quarterly contracts, and bulk packaging
                  specifications.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-3 pt-2">
                <a
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/95 hover:bg-white border-[1.5px] border-[#B8C7B3] hover:border-[#E4B329] transition-colors shadow-2xs"
                  href="tel:+919057292529"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#064E3B] text-[#E4B329] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[24px]">
                      call
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#8A6A00] uppercase tracking-wider block">
                      Direct Commercial Desk
                    </span>
                    <span className="text-xl text-[#064E3B] font-bold">
                      +91 90572 92529
                    </span>
                    <span className="text-xs text-[#0B0902]/70 block">
                      Mon - Sat (9:00 AM - 7:00 PM IST)
                    </span>
                  </div>
                </a>

                <a
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/95 hover:bg-white border-[1.5px] border-[#B8C7B3] hover:border-[#E4B329] transition-colors shadow-2xs"
                  href="mailto:Puneet2garg@gmail.com"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#E4B329]/20 border border-[#E4B329] text-[#064E3B] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[24px]">
                      mail
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#8A6A00] uppercase tracking-wider block">
                      Procurement &amp; Inquiries
                    </span>
                    <span className="text-lg sm:text-xl text-[#064E3B] font-bold break-all">
                      Puneet2garg@gmail.com
                    </span>
                    <span className="text-xs text-[#0B0902]/70 block">
                      Official Quotations &amp; Billing Desk
                    </span>
                  </div>
                </a>

                {/* Corporate / Mill Facility Note */}
                <div className="p-4 rounded-xl bg-white/95 border-[1.5px] border-[#B8C7B3] shadow-2xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-[#064E3B] text-[20px]">
                      factory
                    </span>
                    <span className="text-[11px] text-[#064E3B] font-bold uppercase tracking-wider">
                      Manufacturing Unit
                    </span>
                  </div>
                  <p className="text-sm text-[#0B0902] italic font-medium">
                    [Factory &amp; Corporate Address: To Be Updated / Confirmed]
                  </p>
                  <p className="text-xs text-[#0B0902]/75 mt-2 leading-relaxed">
                    Logistics: Dispatches routed via Pan-India multi-axle
                    tankers, containerized freight, and local logistics freight
                    hubs.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3.5 bg-white/90 border border-dashed border-[#064E3B]/40 rounded-xl text-[#0B0902]/80 text-xs">
              <p>
                Notice: All bulk consignments are weighed on verified commercial
                weighbridges with electronic tare reconciliation slips.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Quotation Form with Heritage Arched Gold Crown (.arch-quote-card) */}
          <div className="lg:col-span-7">
            <div className="arch-quote-card p-6 sm:p-8 md:pt-11 shadow-md relative min-h-[460px]">
              <div className="mb-6 text-center sm:text-left">
                <h3 className="text-2xl text-[#064E3B] font-bold">
                  Submit RFQ / Commercial Inquiry
                </h3>
                <p className="text-sm text-[#0B0902]/75 mt-1">
                  Please provide estimated volumes and destination points for
                  accurate freight factoring.
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    className="block text-xs font-semibold text-[#064E3B] mb-1.5"
                    htmlFor="companyName"
                  >
                    Company / Enterprise Name *
                  </label>
                  <input
                    className="w-full h-11 px-3 rounded-lg bg-[#FBF7ED] border-[1.5px] border-[#B8C7B3] text-[#0B0902] text-sm focus:bg-white focus:border-[#064E3B] focus:ring-2 focus:ring-[#E4B329] outline-none transition-all"
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
                      className="block text-xs font-semibold text-[#064E3B] mb-1.5"
                      htmlFor="phone"
                    >
                      Contact Number *
                    </label>
                    <input
                      className="w-full h-11 px-3 rounded-lg bg-[#FBF7ED] border-[1.5px] border-[#B8C7B3] text-[#0B0902] text-sm focus:bg-white focus:border-[#064E3B] focus:ring-2 focus:ring-[#E4B329] outline-none transition-all"
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
                      className="block text-xs font-semibold text-[#064E3B] mb-1.5"
                      htmlFor="email"
                    >
                      Business Email *
                    </label>
                    <input
                      className="w-full h-11 px-3 rounded-lg bg-[#FBF7ED] border-[1.5px] border-[#B8C7B3] text-[#0B0902] text-sm focus:bg-white focus:border-[#064E3B] focus:ring-2 focus:ring-[#E4B329] outline-none transition-all"
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
                      className="block text-xs font-semibold text-[#064E3B]"
                      htmlFor="productDropdown"
                    >
                      Products of Interest *
                    </label>
                    <span
                      id="selectedCountText"
                      className="text-xs text-[#8A6A00] font-semibold"
                    >
                      {count === 1
                        ? "1 product selected"
                        : `${count} products selected`}
                    </span>
                  </div>

                  {/* Selected Chips Container */}
                  <div
                    id="productChipsBox"
                    className={`min-h-[48px] p-2.5 rounded-lg bg-[#FBF7ED] border-[1.5px] flex flex-wrap items-center gap-2 transition-all ${
                      showProductError
                        ? "ring-2 ring-[#7A1F2B] border-[#7A1F2B]"
                        : "border-[#B8C7B3]"
                    }`}
                  >
                    {count === 0 ? (
                      <span
                        id="emptyChipsPlaceholder"
                        className="text-xs text-[#0B0902]/60 italic select-none py-1 px-1"
                      >
                        Select products from catalog or dropdown below...
                      </span>
                    ) : (
                      Array.from(selectedProducts).map((prod) => (
                        <span
                          key={prod}
                          className="product-chip inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#064E3B] border border-[#E4B329] text-[#FBF7ED] text-xs font-semibold animate-chip-in transition-all select-none"
                        >
                          <span>{prod}</span>
                          <button
                            type="button"
                            className="w-4 h-4 rounded-full inline-flex items-center justify-center hover:bg-[#E4B329] hover:text-[#0B0902] transition-colors cursor-pointer ml-0.5 text-sm leading-none"
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
                          setValidationAlert(null);
                          e.target.value = "";
                        }
                      }}
                      defaultValue=""
                      className="w-full h-11 px-3 rounded-lg bg-[#FBF7ED] border-[1.5px] border-[#B8C7B3] text-[#0B0902] text-sm focus:bg-white focus:border-[#064E3B] focus:ring-2 focus:ring-[#E4B329] outline-none transition-all cursor-pointer"
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
                      className="block text-xs font-semibold text-[#064E3B] mb-1.5"
                      htmlFor="volume"
                    >
                      Order Volume *
                    </label>
                    <input
                      className="w-full h-11 px-3 rounded-lg bg-[#FBF7ED] border-[1.5px] border-[#B8C7B3] text-[#0B0902] text-sm focus:bg-white focus:border-[#064E3B] focus:ring-2 focus:ring-[#E4B329] outline-none transition-all"
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
                      className="block text-xs font-semibold text-[#064E3B] mb-1.5"
                      htmlFor="location"
                    >
                      Delivery Destination / Warehouse / Port *
                    </label>
                    <input
                      className="w-full h-11 px-3 rounded-lg bg-[#FBF7ED] border-[1.5px] border-[#B8C7B3] text-[#0B0902] text-sm focus:bg-white focus:border-[#064E3B] focus:ring-2 focus:ring-[#E4B329] outline-none transition-all"
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
                    className="block text-xs font-semibold text-[#064E3B] mb-1.5"
                    htmlFor="specifications"
                  >
                    Technical Specs or Packaging Notes
                  </label>
                  <textarea
                    className="w-full p-3 rounded-lg bg-[#FBF7ED] border-[1.5px] border-[#B8C7B3] text-[#0B0902] text-sm focus:bg-white focus:border-[#064E3B] focus:ring-2 focus:ring-[#E4B329] outline-none transition-all"
                    id="specifications"
                    placeholder="Enter packaging preferences (Barrels/Tins/Bags), moisture tolerance, or delivery timeline requirements..."
                    rows={3}
                    value={specifications}
                    onChange={(e) => setSpecifications(e.target.value)}
                  />
                </div>

                {/* Inline Validation Toast / Alert */}
                {validationAlert && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FFF7F6] border border-[#7A1F2B] text-[#7A1F2B] text-xs font-semibold shadow-2xs animate-chip-in"
                  >
                    <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">
                      error
                    </span>
                    <span className="flex-1 leading-relaxed">
                      {validationAlert}
                    </span>
                    <button
                      type="button"
                      onClick={() => setValidationAlert(null)}
                      className="text-[#7A1F2B]/70 hover:text-[#7A1F2B] font-bold text-sm leading-none px-1 cursor-pointer"
                      aria-label="Dismiss alert"
                    >
                      &times;
                    </button>
                  </div>
                )}

                {/* Form Action Buttons: Submit Quote Request & Inquire via WhatsApp */}
                <div className="pt-2 w-full flex flex-col gap-3">
                  <button
                    className="w-full flex items-center justify-center gap-2 whitespace-nowrap text-[15px] font-bold text-[#0B0902] bg-[#E4B329] hover:bg-[#EFC24A] border border-[#D4A11D] py-3 px-5 rounded-full transition-all shadow-sm hover:shadow-md disabled:opacity-75 cursor-pointer"
                    id="submitBtn"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <span>
                      {isSubmitting ? "Processing..." : "Submit Quote Request"}
                    </span>
                    <span className="material-symbols-outlined text-[20px] text-[#0B0902] shrink-0">
                      assignment_turned_in
                    </span>
                  </button>

                  <button
                    type="button"
                    id="whatsappInquiryBtn"
                    onClick={handleWhatsAppInquiry}
                    className="whatsapp-glass-btn w-full flex items-center justify-center gap-2 whitespace-nowrap text-[15px] font-semibold py-3 px-5 rounded-full cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5 fill-current shrink-0"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>Inquire via WhatsApp</span>
                  </button>
                </div>
              </form>

              {/* Toast Notification Overlay */}
              {isSubmitted && (
                <div
                  className="absolute inset-0 bg-[#FBF7ED]/96 backdrop-blur-sm rounded-[inherit] flex flex-col items-center justify-center p-6 text-center z-20 animate-fade-in"
                  id="toastNotification"
                >
                  <div className="w-16 h-16 rounded-full bg-[#064E3B] border-2 border-[#E4B329] text-[#E4B329] flex items-center justify-center mb-3 shadow-md animate-bounce">
                    <span className="material-symbols-outlined text-[36px]">
                      check_circle
                    </span>
                  </div>
                  <h4 className="text-2xl text-[#064E3B] font-bold">
                    Quotation Request Logged
                  </h4>
                  <p className="text-sm sm:text-base text-[#0B0902]/80 max-w-md mt-2 leading-relaxed">
                    Thank you! Your commercial inquiry has been logged on our
                    desk. Our sales team will follow up via{" "}
                    <strong className="text-[#064E3B]">
                      Puneet2garg@gmail.com
                    </strong>{" "}
                    or phone directly.
                  </p>
                  <button
                    className="mt-6 px-6 py-2 rounded-full bg-[#064E3B] text-[#FBF7ED] hover:bg-[#04382A] text-xs font-semibold transition-colors cursor-pointer"
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
