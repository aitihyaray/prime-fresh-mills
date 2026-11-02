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

    if (phone.length !== 10) {
      showInlineAlert("Please enter a valid 10-digit mobile phone number.");
      return;
    }

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
    if (phone.length !== 10) missingFields.push("a 10-digit Contact Number");
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
      `*Contact:* +91 ${phone}`,
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
        className="w-full max-w-[1380px] mx-auto px-2.5 sm:px-6 lg:px-10 py-10 sm:py-16 scroll-mt-20"
        id="quote-section"
      >
        {/* Ornamental Connected 4-Petal Floral Frieze Divider */}
        <div className="arch-divider max-w-md mx-auto mb-8 sm:mb-10 px-2" aria-hidden="true">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Commercial Contacts & Direct Desk */}
          <div className="lg:col-span-4 flex flex-col justify-between px-1.5 sm:px-0">
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

          {/* Right Column: Interactive Quotation Form Framed Inside a Wide Traditional Jharokha Window */}
          <div className="lg:col-span-8">
            <div className="jharokha-window-wrapper w-full max-w-4xl mx-auto select-none sm:select-auto">
              {/* 1. TOP JHAROKHA CROWN: Ribbed Dome, Twin Corner Kalash Finials, Projecting Chhajja Eaves & Cusped Arch */}
              <svg
                viewBox="0 0 800 205"
                fill="none"
                className="w-full h-auto block -mb-px pointer-events-none"
                aria-hidden="true"
              >
                {/* Left Corner Turret Finial (Kalash) */}
                <path
                  d="M56 38 C56 48, 50 54, 45 63 C40 72, 42 84, 56 86 C70 84, 72 72, 67 63 C62 54, 56 48, 56 38 Z"
                  fill="#F3DFB6"
                  stroke="#8A6A00"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                <rect
                  x="43"
                  y="86"
                  width="26"
                  height="14"
                  rx="2"
                  fill="#F3DFB6"
                  stroke="#8A6A00"
                  strokeWidth="2.2"
                />

                {/* Right Corner Turret Finial (Kalash) */}
                <path
                  d="M744 38 C744 48, 738 54, 733 63 C728 72, 730 84, 744 86 C758 84, 760 72, 755 63 C750 54, 744 48, 744 38 Z"
                  fill="#F3DFB6"
                  stroke="#8A6A00"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                <rect
                  x="731"
                  y="86"
                  width="26"
                  height="14"
                  rx="2"
                  fill="#F3DFB6"
                  stroke="#8A6A00"
                  strokeWidth="2.2"
                />

                {/* Central Spire Finial (Kalash) */}
                <path
                  d="M400 6 C396 16, 392 24, 390 32 L410 32 C408 24, 404 16, 400 6 Z"
                  fill="#E4B329"
                  stroke="#8A6A00"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                <path
                  d="M376 37 C386 30, 414 30, 424 37"
                  stroke="#8A6A00"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />

                {/* Central Ribbed Onion / Lotus Dome */}
                <path
                  d="M150 94 C148 52, 278 40, 400 28 C522 40, 652 52, 650 94 Z"
                  fill="#F3DFB6"
                  stroke="#8A6A00"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                />
                {/* Dome Vertical Ribs */}
                <path
                  d="M400 30 V78 M346 36 C334 50, 330 66, 330 82 M454 36 C466 50, 470 66, 470 82 M288 45 C270 58, 264 72, 264 86 M512 45 C530 58, 536 72, 536 86 M226 56 C210 68, 206 80, 206 90 M574 56 C590 68, 594 80, 594 90"
                  stroke="#8A6A00"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Outer Cream Stone Crown, Cornice & Projecting Chhajja Eaves (Outer Pillars at x=24 and x=776) */}
                <path
                  d="M24 205 V160 C24 138, 16 128, 2 126 H34 V100 H134 C228 62, 346 60, 400 52 C454 60, 572 62, 666 100 H766 V126 H798 C784 128, 776 138, 776 160 V205 H758 V144 C758 98, 588 70, 400 70 C212 70, 42 98, 42 144 V205 Z"
                  fill="#FFFDF7"
                  stroke="#8A6A00"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                />

                {/* Chhajja Eave Horizontal Accent Lines */}
                <path
                  d="M2 126 H84 M716 126 H798"
                  stroke="#8A6A00"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />

                {/* Recessed Warm Sandstone Arch Band (Between x=42..758 and Inner Chamber x=58..742) */}
                <path
                  d="M42 205 V144 C42 98, 212 70, 400 70 C588 70, 758 98, 758 144 V205 H742 V174 C732 174, 724 166, 724 156 C724 134, 678 124, 638 122 C608 102, 550 98, 502 96 C458 94, 426 90, 400 82 C374 90, 342 94, 298 96 C250 98, 192 102, 162 122 C122 124, 76 134, 76 156 C76 166, 68 174, 58 174 V205 Z"
                  fill="#F3DFB6"
                  stroke="#8A6A00"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />

                {/* Secondary Parallel Cusped Arch Contour Line */}
                <path
                  d="M50 203 V154 C50 126, 102 112, 150 110 C182 88, 242 84, 294 82 C344 80, 376 76, 400 66 C424 76, 456 80, 506 82 C558 84, 618 88, 650 110 C698 112, 750 126, 750 154 V203"
                  stroke="#8A6A00"
                  strokeWidth="1.5"
                  strokeOpacity="0.65"
                  fill="none"
                />

                {/* Inner White Window Chamber Top Arch (x=58 to x=742) */}
                <path
                  d="M58 205 V174 C68 174, 76 166, 76 156 C76 134, 122 124, 162 122 C192 102, 250 98, 298 96 C342 94, 374 90, 400 82 C426 90, 458 94, 502 96 C550 98, 608 102, 638 122 C678 124, 724 134, 724 156 C724 166, 732 174, 742 174 V205 Z"
                  fill="#FFFFFF"
                />
                {/* Crisp Stroke on the Inner Cusped Arch */}
                <path
                  d="M58 205 V174 C68 174, 76 166, 76 156 C76 134, 122 124, 162 122 C192 102, 250 98, 298 96 C342 94, 374 90, 400 82 C426 90, 458 94, 502 96 C550 98, 608 102, 638 122 C678 124, 724 134, 724 156 C724 166, 732 174, 742 174 V205"
                  stroke="#8A6A00"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />

                {/* Pillar Capital Rings at y=192 */}
                <path
                  d="M24 192 H42 M42 198 H58 M742 198 H758 M758 192 H776"
                  stroke="#8A6A00"
                  strokeWidth="1.9"
                />
              </svg>

              {/* 2. MIDDLE JHAROKHA PILLARS & INNER WINDOW CHAMBER (RFQ FORM) */}
              <div className="jharokha-outer-pillars">
                <div className="jharokha-inner-chamber px-4 sm:px-8 md:px-10 pt-1 sm:pt-1.5 pb-4 sm:pb-6">
                  <div className="mb-3 sm:mb-3.5 text-center border-b border-[#E4B329]/35 pb-2.5 sm:pb-3">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A6A00] mb-0.5">
                      Mill Dispatch Desk
                    </span>
                    <h3 className="text-xl sm:text-2xl text-[#064E3B] font-bold leading-tight">
                      Commercial Inquiry
                    </h3>
                    <p className="text-xs text-[#0B0902]/65 mt-0.5 max-w-md mx-auto">
                      Share volume &amp; destination for instant rate quotes.
                    </p>
                  </div>

                  <form className="space-y-2.5 sm:space-y-3" onSubmit={handleSubmit}>
                    <div>
                      <label
                        className="block text-xs font-semibold text-[#064E3B] mb-1"
                        htmlFor="companyName"
                      >
                        Company Name *
                      </label>
                      <input
                        className="w-full h-10 px-3.5 rounded-lg bg-[#FBF7ED] border-[1.5px] border-[#B8C7B3] text-[#0B0902] placeholder:text-[#0B0902]/15 placeholder:font-normal text-sm focus:bg-white focus:border-[#064E3B] focus:ring-2 focus:ring-[#E4B329] outline-none transition-all"
                        id="companyName"
                        placeholder="e.g., Agro Foods Pvt Ltd"
                        required
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                      <div>
                        <label
                          className="block text-xs font-semibold text-[#064E3B] mb-1"
                          htmlFor="phone"
                        >
                          Contact Number *
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3.5 text-sm font-normal text-[#0B0902]/20 select-none pointer-events-none">
                            +91
                          </span>
                          <input
                            className="w-full h-10 pl-11 pr-3.5 rounded-lg bg-[#FBF7ED] border-[1.5px] border-[#B8C7B3] text-[#0B0902] placeholder:text-[#0B0902]/15 placeholder:font-normal text-sm focus:bg-white focus:border-[#064E3B] focus:ring-2 focus:ring-[#E4B329] outline-none transition-all"
                            id="phone"
                            placeholder="XXXXX XXXXX"
                            required
                            type="tel"
                            inputMode="numeric"
                            maxLength={10}
                            pattern="[0-9]{10}"
                            title="Please enter a 10-digit mobile phone number"
                            value={phone}
                            onChange={(e) =>
                              setPhone(
                                e.target.value.replace(/\D/g, "").slice(0, 10)
                              )
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          className="block text-xs font-semibold text-[#064E3B] mb-1"
                          htmlFor="email"
                        >
                          Business Email *
                        </label>
                        <input
                          className="w-full h-10 px-3.5 rounded-lg bg-[#FBF7ED] border-[1.5px] border-[#B8C7B3] text-[#0B0902] placeholder:text-[#0B0902]/15 placeholder:font-normal text-sm focus:bg-white focus:border-[#064E3B] focus:ring-2 focus:ring-[#E4B329] outline-none transition-all"
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
                    <div
                      className="space-y-1.5"
                      id="multiProductSelectorContainer"
                    >
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
                        className={`min-h-[40px] p-2 rounded-lg bg-[#FBF7ED] border-[1.5px] flex flex-wrap items-center gap-1.5 transition-all ${
                          showProductError
                            ? "ring-2 ring-[#7A1F2B] border-[#7A1F2B]"
                            : "border-[#B8C7B3]"
                        }`}
                      >
                        {count === 0 ? (
                          <span
                            id="emptyChipsPlaceholder"
                            className="text-xs text-[#0B0902]/20 italic select-none py-0.5 px-1"
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
                          className="w-full h-10 px-3.5 rounded-lg bg-[#FBF7ED] border-[1.5px] border-[#B8C7B3] text-[#0B0902]/30 text-sm focus:bg-white focus:text-[#0B0902] focus:border-[#064E3B] focus:ring-2 focus:ring-[#E4B329] outline-none transition-all cursor-pointer"
                        >
                          <option value="" disabled>
                            + Add another product from catalog...
                          </option>
                          {ALL_PRODUCT_OPTIONS.map((opt) => (
                            <option key={opt} value={opt} className="text-[#0B0902]">
                              🌾 {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                      <div>
                        <label
                          className="block text-xs font-semibold text-[#064E3B] mb-1"
                          htmlFor="volume"
                        >
                          Order Volume *
                        </label>
                        <input
                          className="w-full h-10 px-3.5 rounded-lg bg-[#FBF7ED] border-[1.5px] border-[#B8C7B3] text-[#0B0902] placeholder:text-[#0B0902]/15 placeholder:font-normal text-sm focus:bg-white focus:border-[#064E3B] focus:ring-2 focus:ring-[#E4B329] outline-none transition-all"
                          id="volume"
                          placeholder="e.g., 5 MT or 2,000 L"
                          required
                          type="text"
                          value={volume}
                          onChange={(e) => setVolume(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          className="block text-xs font-semibold text-[#064E3B] mb-1"
                          htmlFor="location"
                        >
                          Delivery Destination *
                        </label>
                        <input
                          className="w-full h-10 px-3.5 rounded-lg bg-[#FBF7ED] border-[1.5px] border-[#B8C7B3] text-[#0B0902] placeholder:text-[#0B0902]/15 placeholder:font-normal text-sm focus:bg-white focus:border-[#064E3B] focus:ring-2 focus:ring-[#E4B329] outline-none transition-all"
                          id="location"
                          placeholder="City, State / PIN"
                          required
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className="block text-xs font-semibold text-[#064E3B] mb-1"
                        htmlFor="specifications"
                      >
                        Packaging / Notes
                      </label>
                      <textarea
                        className="w-full px-3.5 py-2 rounded-lg bg-[#FBF7ED] border-[1.5px] border-[#B8C7B3] text-[#0B0902] placeholder:text-[#0B0902]/15 placeholder:font-normal text-sm focus:bg-white focus:border-[#064E3B] focus:ring-2 focus:ring-[#E4B329] outline-none transition-all resize-none"
                        id="specifications"
                        placeholder="Packaging preferences (Barrels/Tins/Bags) or timeline notes..."
                        rows={1}
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
                    <div className="pt-1.5 w-full flex flex-col sm:flex-row gap-3">
                      <button
                        className="flex-1 flex items-center justify-center gap-2 whitespace-nowrap text-[15px] font-bold text-[#0B0902] bg-[#E4B329] hover:bg-[#EFC24A] border border-[#D4A11D] py-3 px-5 rounded-full transition-all shadow-sm hover:shadow-md disabled:opacity-75 cursor-pointer"
                        id="submitBtn"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        <span>
                          {isSubmitting
                            ? "Processing..."
                            : "Submit Quote Request"}
                        </span>
                        <span className="material-symbols-outlined text-[20px] text-[#0B0902] shrink-0">
                          assignment_turned_in
                        </span>
                      </button>

                      <button
                        type="button"
                        id="whatsappInquiryBtn"
                        onClick={handleWhatsAppInquiry}
                        className="whatsapp-glass-btn flex-1 flex items-center justify-center gap-2 whitespace-nowrap text-[15px] font-semibold py-3 px-5 rounded-full cursor-pointer"
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
                      className="absolute inset-0 bg-[#FBF7ED]/96 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20 animate-fade-in"
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
                        Thank you! Your commercial inquiry has been logged on
                        our desk. Our sales team will follow up via{" "}
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

              {/* 3. BOTTOM JHAROKHA BASE: Carved Pillar Pedestals, Stepped Stone Sill, Fluted Lotus Corbel & Hanging Kalash Drop */}
              <svg
                viewBox="0 0 800 148"
                fill="none"
                className="w-full h-auto block -mt-px pointer-events-none"
                aria-hidden="true"
              >
                {/* Pillar Base Pedestal Moldings (x=24..776, y=0..20) */}
                <rect
                  x="24"
                  y="0"
                  width="18"
                  height="20"
                  fill="#FFFDF7"
                  stroke="#8A6A00"
                  strokeWidth="2.2"
                />
                <rect
                  x="42"
                  y="0"
                  width="16"
                  height="20"
                  fill="#F3DFB6"
                  stroke="#8A6A00"
                  strokeWidth="2"
                />
                <rect
                  x="58"
                  y="0"
                  width="684"
                  height="20"
                  fill="#FFFFFF"
                  stroke="#8A6A00"
                  strokeWidth="2"
                />
                <rect
                  x="742"
                  y="0"
                  width="16"
                  height="20"
                  fill="#F3DFB6"
                  stroke="#8A6A00"
                  strokeWidth="2"
                />
                <rect
                  x="758"
                  y="0"
                  width="18"
                  height="20"
                  fill="#FFFDF7"
                  stroke="#8A6A00"
                  strokeWidth="2.2"
                />
                <path
                  d="M24 9 H42 M42 12 H58 M742 12 H758 M758 9 H776"
                  stroke="#8A6A00"
                  strokeWidth="1.8"
                />

                {/* Upper Stepped Stone Sill */}
                <rect
                  x="14"
                  y="20"
                  width="772"
                  height="14"
                  rx="3"
                  fill="#FFFDF7"
                  stroke="#8A6A00"
                  strokeWidth="2.3"
                />

                {/* Lower Wide Projecting Chhajja Ledge */}
                <rect
                  x="4"
                  y="34"
                  width="792"
                  height="12"
                  rx="4"
                  fill="#FFFDF7"
                  stroke="#8A6A00"
                  strokeWidth="2.3"
                />

                {/* Sub-Sill Golden Molding */}
                <rect
                  x="28"
                  y="46"
                  width="744"
                  height="9"
                  rx="2"
                  fill="#F3DFB6"
                  stroke="#8A6A00"
                  strokeWidth="2"
                />

                {/* Fluted / Ribbed Inverted Lotus Bowl Corbel (Padma-Kosha) */}
                <path
                  d="M60 55 C94 100, 232 112, 360 112 H440 C568 112, 706 100, 740 55 Z"
                  fill="#F3DFB6"
                  stroke="#8A6A00"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                />

                {/* Radiating Curved Lotus Ribs inside the Corbel Bowl */}
                <path
                  d="M400 55 V112 M348 55 C350 80, 366 100, 384 112 M452 55 C450 80, 434 100, 416 112 M288 55 C298 82, 332 102, 372 112 M512 55 C502 82, 468 102, 428 112 M224 55 C242 84, 296 104, 364 112 M576 55 C558 84, 504 104, 436 112 M160 55 C186 86, 260 106, 354 112 M640 55 C614 86, 540 106, 446 112 M102 55 C136 86, 228 108, 346 112 M698 55 C664 86, 572 108, 454 112"
                  stroke="#8A6A00"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                />

                {/* Bottom Collar Ring */}
                <rect
                  x="356"
                  y="112"
                  width="88"
                  height="9"
                  rx="4.5"
                  fill="#FFFDF7"
                  stroke="#8A6A00"
                  strokeWidth="2.2"
                />

                {/* Hanging Kalash Finial Drop (Pendant) */}
                <path
                  d="M376 121 C374 132, 392 136, 400 146 C408 136, 426 132, 424 121 Z"
                  fill="#E4B329"
                  stroke="#8A6A00"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
