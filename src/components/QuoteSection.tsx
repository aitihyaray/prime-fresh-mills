import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  Building2,
  Factory,
  PackageCheck,
  Store,
  Truck,
  Boxes,
  FlaskConical,
  CalendarClock,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Scale,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  FileCheck2,
} from "lucide-react";
import { CATALOG_PRODUCTS, ALL_PRODUCT_OPTIONS } from "../data/portalData";

// Owner's WhatsApp Number (Country code + 10-digit number)
const OWNER_WHATSAPP_NUMBER = "919057292529";

interface QuoteSectionProps {
  selectedProducts: Set<string>;
  onAddProduct: (prod: string) => void;
  onRemoveProduct: (prod: string) => void;
  onClearProducts: () => void;
}

interface OrgOption {
  id: string;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
}

interface ScopeOption {
  id: string;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
}

interface CommodityCardItem {
  id: string;
  displayName: string;
  catalogName: string;
  badge: string;
  image: string;
  category: "primary" | "doc";
}

const ORG_PROFILES: OrgOption[] = [
  {
    id: "Edible Oil Brand",
    label: "Edible Oil Brand",
    subtitle: "Retail & regional oil marketers seeking bulk expeller lots",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    id: "FMCG Packer / Company",
    label: "FMCG Packer / Company",
    subtitle: "High-volume food processors & industrial bottling plants",
    icon: <Factory className="w-5 h-5" />,
  },
  {
    id: "Private-Label Buyer",
    label: "Private-Label Buyer",
    subtitle: "Custom branded tins, pouches, bottles & export packs",
    icon: <PackageCheck className="w-5 h-5" />,
  },
  {
    id: "Commodity Wholesaler / HoReCa",
    label: "Commodity Wholesaler / HoReCa",
    subtitle: "Mandi stockists, institutional kitchens & feed distributors",
    icon: <Store className="w-5 h-5" />,
  },
];

const REQUIREMENT_SCOPES: ScopeOption[] = [
  {
    id: "Bulk Tanker / Loose Supply",
    label: "Bulk Tanker / Loose Supply",
    subtitle: "Multi-axle liquid tankers or loose tipper truck loads",
    icon: <Truck className="w-5 h-5" />,
  },
  {
    id: "Private-Label Contract Packing",
    label: "Private-Label Contract Packing",
    subtitle: "Ready-to-retail 1L bottles, 15L tins & 50kg HDPE bags",
    icon: <Boxes className="w-5 h-5" />,
  },
  {
    id: "Lab Samples & Spec Evaluation",
    label: "Lab Samples & Spec Evaluation",
    subtitle: "COA sheet, FFA/pungency assay & physical sample dispatch",
    icon: <FlaskConical className="w-5 h-5" />,
  },
  {
    id: "Regular Monthly Retainer",
    label: "Regular Monthly Retainer",
    subtitle: "Scheduled recurring dispatches with locked mandi spreads",
    icon: <CalendarClock className="w-5 h-5" />,
  },
];

const findCatalogImage = (productName: string, fallback: string): string => {
  const match = CATALOG_PRODUCTS.find(
    (p) =>
      p.productName.toLowerCase() === productName.toLowerCase() ||
      p.title.toLowerCase() === productName.toLowerCase()
  );
  return match ? match.image : fallback;
};

const PRIMARY_COMMODITIES: CommodityCardItem[] = [
  {
    id: "mustard-oil",
    displayName: "Kachi Ghani Mustard Oil",
    catalogName: "Mustard Oil",
    badge: "AGMARK Grade-1 · Cold Pressed",
    image: findCatalogImage("Mustard Oil", "./mustard_oil_mockup.png"),
    category: "primary",
  },
  {
    id: "yellow-mustard-seeds",
    displayName: "Yellow Mustard Seeds",
    catalogName: "Yellow Mustard Seeds",
    badge: "Premium Milling · ≥99.5% Purity",
    image: findCatalogImage("Yellow Mustard Seeds", "./mustard_oil_mockup.png"),
    category: "primary",
  },
  {
    id: "black-mustard-seeds",
    displayName: "Black Mustard Seeds",
    catalogName: "Black Mustard Seeds (Rai / Sarson)",
    badge: "High Volatile Oil · Rai/Sarson",
    image: findCatalogImage(
      "Black Mustard Seeds (Rai / Sarson)",
      "./mustard_oil_mockup.png"
    ),
    category: "primary",
  },
  {
    id: "white-sesame-seeds",
    displayName: "White Sesame Seeds",
    catalogName: "Natural White Sesame Seeds",
    badge: "Sortex Cleaned & Graded",
    image: findCatalogImage(
      "Natural White Sesame Seeds",
      "./natural-sesame-seed.jpg"
    ),
    category: "primary",
  },
  {
    id: "black-sesame-seeds",
    displayName: "Black Sesame Seeds",
    catalogName: "Black Sesame Seeds",
    badge: "Sorted & De-Stoned",
    image: findCatalogImage("Black Sesame Seeds", "./natural-sesame-seed.jpg"),
    category: "primary",
  },
  {
    id: "groundnut-seeds",
    displayName: "Groundnut Seeds",
    catalogName: "Groundnut Seeds (Peanut Kernels)",
    badge: "Graded Counts · Export Spec",
    image: findCatalogImage(
      "Groundnut Seeds (Peanut Kernels)",
      "./natural-sesame-seed.jpg"
    ),
    category: "primary",
  },
  {
    id: "yellow-mustard-doc",
    displayName: "Yellow Mustard Cake (DOC)",
    catalogName: "Yellow Mustard De-Oiled Cake",
    badge: "38%–40.5% Crude Protein",
    image: findCatalogImage(
      "Yellow Mustard De-Oiled Cake",
      "./mustard_oil_mockup.png"
    ),
    category: "doc",
  },
  {
    id: "black-mustard-doc",
    displayName: "Black Mustard Cake",
    catalogName: "Black Mustard De-Oiled Cake (DOC)",
    badge: "High-Nitrogen Feed & Meal",
    image: findCatalogImage(
      "Black Mustard De-Oiled Cake (DOC)",
      "./mustard_oil_mockup.png"
    ),
    category: "doc",
  },
];

const TIMELINE_OPTIONS = [
  "Immediate Dispatch",
  "Within 15–30 Days",
  "Quarterly Contract",
  "Rate Discovery Only",
];

const STEP_META = [
  {
    step: 1,
    shortLabel: "Profile",
    mobileLabel: "Profile",
    title: "Who are we partnering with?",
  },
  {
    step: 2,
    shortLabel: "Scope",
    mobileLabel: "Scope",
    title: "How can our mill serve you?",
  },
  {
    step: 3,
    shortLabel: "Commodities",
    mobileLabel: "Products",
    title: "Select Oils, Seeds & De-Oiled Cakes",
  },
  {
    step: 4,
    shortLabel: "Schedule",
    mobileLabel: "Schedule",
    title: "Schedule & Estimated Tonnage",
  },
];

export const QuoteSection: React.FC<QuoteSectionProps> = ({
  selectedProducts,
  onAddProduct,
  onRemoveProduct,
  onClearProducts,
}) => {
  // Wizard Step State (1..5) + Standalone Step 6 Portal State
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isStandalonePortalOpen, setIsStandalonePortalOpen] =
    useState<boolean>(false);
  const [mobileLedgerExpanded, setMobileLedgerExpanded] =
    useState<boolean>(false);

  // Slides 1–5 State
  const [orgType, setOrgType] = useState<string>("Edible Oil Brand");
  const [selectedScopes, setSelectedScopes] = useState<string[]>([
    "Bulk Tanker / Loose Supply",
  ]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([
    "PP Bags (50kg)",
  ]);
  const [timeline, setTimeline] = useState<string>("Immediate Dispatch");
  const [volume, setVolume] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  // Slide 6 Contact & Final Form State
  const [companyName, setCompanyName] = useState<string>("");
  const [contactPerson, setContactPerson] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [specifications, setSpecifications] = useState<string>("");
  const [notesManuallyEdited, setNotesManuallyEdited] =
    useState<boolean>(false);
  const [activeVisualProduct, setActiveVisualProduct] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showProductError, setShowProductError] = useState<boolean>(false);
  const [validationAlert, setValidationAlert] = useState<string | null>(null);

  // Automatically compose rich specifications summary for Slide 6 unless manually edited
  const autoGeneratedNotes = useMemo(() => {
    const parts: string[] = [];
    if (selectedScopes.length > 0) {
      parts.push(`Service Scope: ${selectedScopes.join(", ")}`);
    }
    if (selectedFormats.length > 0) {
      parts.push(`Preferred Format: ${selectedFormats.join(", ")}`);
    }
    if (timeline) {
      parts.push(`Dispatch Schedule: ${timeline}`);
    }
    return parts.join(" | ");
  }, [selectedScopes, selectedFormats, timeline]);

  useEffect(() => {
    if (!notesManuallyEdited) {
      setSpecifications(autoGeneratedNotes);
    }
  }, [autoGeneratedNotes, notesManuallyEdited]);

  // Keep activeVisualProduct synced with selectedProducts
  const selectedProductsList = useMemo(
    () => Array.from(selectedProducts),
    [selectedProducts]
  );

  useEffect(() => {
    if (
      selectedProductsList.length > 0 &&
      (!activeVisualProduct || !selectedProducts.has(activeVisualProduct))
    ) {
      setActiveVisualProduct(selectedProductsList[0]);
    } else if (selectedProductsList.length === 0) {
      setActiveVisualProduct("Mustard Oil");
    }
  }, [selectedProductsList, activeVisualProduct, selectedProducts]);

  // Handle Browser History & Scroll Lock for Standalone Slide 6 View
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.hash !== "#dispatch-confirmation") {
        setIsStandalonePortalOpen(false);
      } else {
        setIsStandalonePortalOpen(true);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (isStandalonePortalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isStandalonePortalOpen]);

  const openStandaloneDispatchPortal = () => {
    if (!notesManuallyEdited) {
      setSpecifications(autoGeneratedNotes);
    }
    try {
      window.history.pushState(
        { dispatchPortal: true },
        "",
        "#dispatch-confirmation"
      );
    } catch {
      // Ignore history error in restricted iframe contexts
    }
    setIsStandalonePortalOpen(true);
  };

  const closeStandaloneDispatchPortal = () => {
    setIsStandalonePortalOpen(false);
    try {
      if (window.location.hash === "#dispatch-confirmation") {
        window.history.pushState({}, "", window.location.pathname);
      }
    } catch {
      // Ignore history error
    }
  };

  const toggleScope = (scopeId: string) => {
    setSelectedScopes((prev) =>
      prev.includes(scopeId)
        ? prev.filter((s) => s !== scopeId)
        : [...prev, scopeId]
    );
  };

  const toggleFormat = (format: string) => {
    setSelectedFormats((prev) =>
      prev.includes(format)
        ? prev.filter((f) => f !== format)
        : [...prev, format]
    );
  };

  const toggleCatalogProduct = (catalogName: string) => {
    if (selectedProducts.has(catalogName)) {
      onRemoveProduct(catalogName);
    } else {
      onAddProduct(catalogName);
    }
  };

  // Calculate live completion percentage across the 4 steps
  const completionStats = useMemo(() => {
    let completed = 0;
    if (orgType.trim()) completed += 1;
    if (selectedScopes.length > 0) completed += 1;
    if (selectedProducts.size > 0) completed += 1;
    if (timeline && (volume.trim() || location.trim())) completed += 1;
    const pct = Math.min(100, Math.max(25, completed * 25));
    return { completed, pct };
  }, [orgType, selectedScopes, selectedProducts.size, timeline, volume, location]);

  const showInlineAlert = (msg: string) => {
    setValidationAlert(msg);
    setTimeout(() => {
      setValidationAlert((current) => (current === msg ? null : current));
    }, 4500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationAlert(null);

    if (!companyName.trim() || !contactPerson.trim()) {
      showInlineAlert("Please enter both Company Name and Contact Person.");
      return;
    }

    if (phone.length !== 10) {
      showInlineAlert("Please enter a valid 10-digit WhatsApp / mobile number.");
      return;
    }

    if (selectedProducts.size === 0) {
      setShowProductError(true);
      showInlineAlert(
        "Please select at least one commodity before submitting your inquiry."
      );
      setTimeout(() => setShowProductError(false), 2000);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 650);
  };

  const handleWhatsAppInquiry = () => {
    setValidationAlert(null);

    const missingFields: string[] = [];
    if (selectedProducts.size === 0) {
      missingFields.push("at least one Selected Commodity");
      setShowProductError(true);
      setTimeout(() => setShowProductError(false), 2200);
    }
    if (!companyName.trim()) missingFields.push("Company Name");
    if (!contactPerson.trim()) missingFields.push("Contact Person");
    if (phone.length !== 10) missingFields.push("a 10-digit Contact Number");
    if (!email.trim()) missingFields.push("Business Email");

    if (missingFields.length > 0) {
      showInlineAlert(
        `Please provide ${missingFields.join(", ")} before sending via WhatsApp.`
      );
      return;
    }

    const productsBulletList = Array.from(selectedProducts)
      .map((prod) => `• ${prod}`)
      .join("\n");

    const messageText = [
      "*MILL DISPATCH BRIEF — PRIME FRESH OIL MILLS*",
      "-----------------------------------------",
      `*Company:* ${companyName.trim()}`,
      `*Contact Person:* ${contactPerson.trim()}`,
      `*WhatsApp / Phone:* +91 ${phone}`,
      `*Business Email:* ${email.trim()}`,
      `*Organization Profile:* ${orgType}`,
      "",
      "*1. Requirement Scope:*",
      selectedScopes.length > 0
        ? selectedScopes.map((s) => `• ${s}`).join("\n")
        : "• Standard Wholesale Supply",
      "",
      "*2. Selected Commodities (Oils / Seeds / DOC):*",
      productsBulletList,
      "",
      "*3. Packaging & Format Preferences:*",
      selectedFormats.length > 0 ? selectedFormats.join(", ") : "Standard Mill Packaging",
      "",
      "*4. Dispatch Schedule & Volume:*",
      `*Estimated Volume:* ${volume.trim() || "To be discussed"}`,
      `*Delivery Destination:* ${location.trim() || "To be confirmed"}`,
      `*Dispatch Timeline:* ${timeline || "Immediate"}`,
      "",
      specifications.trim()
        ? `*Additional Notes:* ${specifications.trim()}`
        : "",
      "",
      "Please share ex-mill spot rates, freight factoring, and proforma dispatch terms.",
    ]
      .filter(Boolean)
      .join("\n");

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodedMessage}`;

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
    setContactPerson("");
    setPhone("");
    setEmail("");
    setVolume("");
    setLocation("");
    setNotesManuallyEdited(false);
    onClearProducts();
    setCurrentStep(1);
    setIsStandalonePortalOpen(false);
  };

  // Lookup product details for thumbnails & visual preview card
  const getProductMeta = (prodName: string) => {
    const foundCatalog = CATALOG_PRODUCTS.find(
      (p) =>
        p.productName.toLowerCase() === prodName.toLowerCase() ||
        p.title.toLowerCase() === prodName.toLowerCase()
    );
    if (foundCatalog) {
      return {
        title: foundCatalog.title,
        badge: foundCatalog.badge,
        image: foundCatalog.image,
        description: foundCatalog.description,
      };
    }
    return {
      title: prodName,
      badge: "AGMARK / Mill Direct",
      image: "./mustard_oil_mockup.png",
      description:
        "Direct expeller mill supply with verified weighbridge tare slips and COA quality assurance.",
    };
  };

  const featuredVisualMeta = getProductMeta(
    activeVisualProduct || selectedProductsList[0] || "Mustard Oil"
  );

  // Reusable Heritage Archway SVG Crown
  const renderArchwayCrown = (subtitle: string, title: string) => (
    <div className="relative w-full select-none">
      <svg
        viewBox="0 0 1000 88"
        fill="none"
        className="w-full h-auto block -mb-px pointer-events-none"
        aria-hidden="true"
      >
        {/* Left & Right Heritage Finials */}
        <path
          d="M32 18 C32 24, 26 28, 26 34 C26 39, 29 41, 32 41 C35 41, 38 39, 38 34 C38 28, 32 24, 32 18 Z"
          fill="#F5E6C8"
          stroke="#C89D54"
          strokeWidth="1.6"
        />
        <path
          d="M968 18 C968 24, 962 28, 962 34 C962 39, 965 41, 968 41 C971 41, 974 39, 974 34 C974 28, 968 24, 968 18 Z"
          fill="#F5E6C8"
          stroke="#C89D54"
          strokeWidth="1.6"
        />
        {/* Central Kalash Spire */}
        <path
          d="M500 4 L494 15 H506 Z"
          fill="#D97706"
          stroke="#C89D54"
          strokeWidth="1.4"
        />
        <path
          d="M340 28 C395 16, 450 13, 500 11 C550 13, 605 16, 660 28 Z"
          fill="#F5E6C8"
          stroke="#C89D54"
          strokeWidth="1.6"
        />
        {/* Outer Mandapa Archway */}
        <path
          d="M24 88 V54 C24 46, 18 42, 10 41 H24 V40 C175 22, 355 20, 500 16 C645 20, 825 22, 976 40 V41 H990 C982 42, 976 46, 976 54 V88 H962 V64 C962 44, 770 25, 500 25 C230 25, 38 44, 38 64 V88 Z"
          fill="#F5E6C8"
          stroke="#C89D54"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Inner Cusped Jharokha Arch */}
        <path
          d="M38 88 V64 C38 44, 230 25, 500 25 C770 25, 962 44, 962 64 V88 H952 V70 C942 70, 934 64, 934 56 C934 45, 835 38, 745 37 C660 32, 555 31, 500 27 C445 31, 340 32, 255 37 C165 38, 66 45, 66 56 C66 64, 58 70, 48 70 V88 Z"
          fill="#FBF8F2"
          stroke="#C89D54"
          strokeWidth="1.5"
        />
        <path
          d="M38 88 V70 H48 C58 70, 66 64, 66 56 C66 45, 165 38, 255 37 C340 32, 445 31, 500 27 C555 31, 660 32, 745 37 C835 38, 934 45, 934 56 C934 64, 942 70, 952 70 H962 V88 Z"
          fill="#FFFDF9"
        />
        <path
          d="M38 70 H48 C58 70, 66 64, 66 56 C66 45, 165 38, 255 37 C340 32, 445 31, 500 27 C555 31, 660 32, 745 37 C835 38, 934 45, 934 56 C934 64, 942 70, 952 70 H962"
          stroke="#C89D54"
          strokeWidth="1.5"
        />
      </svg>

      {/* Header Title Bar Inside the Archway */}
      <div className="bg-[#FFFDF9] border-x-[2px] border-[#C89D54] mx-[2.4%] px-3 sm:px-8 pt-1.5 pb-3.5 sm:pb-4 text-center border-b border-[#C89D54]/35">
        <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[#1B4332]/8 border border-[#C89D54]/60 mb-1.5 max-w-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] shrink-0" />
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[#D97706] whitespace-nowrap">
            MILL DISPATCH DESK
            <span className="hidden sm:inline"> · GUIDED CONFIGURATOR</span>
          </span>
        </div>
        <h3 className="text-lg sm:text-2xl md:text-[26px] font-bold text-[#1B4332] tracking-tight leading-snug">
          {title}
        </h3>
      </div>
    </div>
  );

  const renderArchwayBase = () => (
    <svg
      viewBox="0 0 1000 42"
      fill="none"
      className="w-full h-auto block -mt-px pointer-events-none select-none"
      aria-hidden="true"
    >
      <rect
        x="24"
        y="0"
        width="952"
        height="7"
        fill="#F5E6C8"
        stroke="#C89D54"
        strokeWidth="1.6"
      />
      <rect
        x="14"
        y="7"
        width="972"
        height="7"
        rx="2"
        fill="#FFFDF9"
        stroke="#C89D54"
        strokeWidth="1.6"
      />
      <rect
        x="26"
        y="14"
        width="948"
        height="6"
        rx="2"
        fill="#F5E6C8"
        stroke="#C89D54"
        strokeWidth="1.5"
      />
      <path
        d="M310 20 C350 31, 420 33, 500 33 C580 33, 650 31, 690 20 Z"
        fill="#F5E6C8"
        stroke="#C89D54"
        strokeWidth="1.5"
      />
      <path
        d="M490 33 C490 37, 496 39, 500 41 C504 39, 510 37, 510 33 Z"
        fill="#D97706"
        stroke="#C89D54"
        strokeWidth="1.4"
      />
    </svg>
  );

  return (
    <>
      <div id="infrastructure" className="scroll-mt-24" />
      <section
        className="w-full max-w-[1380px] mx-auto px-2.5 sm:px-6 lg:px-10 py-10 sm:py-16 scroll-mt-20"
        id="quote-section"
      >
        {/* Ornamental Connected 4-Petal Floral Frieze Divider */}
        <div
          className="arch-divider max-w-md mx-auto mb-8 sm:mb-10 px-2"
          aria-hidden="true"
        >
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

        <div className="space-y-8 sm:space-y-12">
          {/* 1. Top Block: Request a Wholesale Quotation & Commercial Desk Cards */}
          <div className="px-1.5 sm:px-0">
            <div className="max-w-3xl">
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

            {/* Contact Cards (3-Column Desktop, Stacked Mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
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
                <div className="min-w-0">
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
                <p className="text-xs text-[#0B0902]/75 mt-1.5 leading-relaxed">
                  Logistics: Dispatches routed via Pan-India multi-axle tankers,
                  containerized freight, and local logistics freight hubs.
                </p>
              </div>
            </div>

            <div className="mt-4 p-3.5 bg-white/90 border border-dashed border-[#064E3B]/40 rounded-xl text-[#0B0902]/80 text-xs">
              <p>
                Notice: All bulk consignments are weighed on verified commercial
                weighbridges with electronic tare reconciliation slips.
              </p>
            </div>
          </div>

          {/* 2. PART 1: THE IN-PAGE 4-SLIDE INTERACTIVE WIZARD ("BUILD YOUR DISPATCH BRIEF") */}
          <div id="commercial-inquiry-window" className="scroll-mt-24">
            {/* Anchor for legacy pulseChipsBox calls */}
            <div id="productChipsBox" className="sr-only" />

            <div className="w-full max-w-6xl mx-auto">
              {renderArchwayCrown(
                "MILL DISPATCH DESK · GUIDED CONFIGURATOR",
                "Build Your Dispatch Brief"
              )}

              {/* Main Archway Body Container */}
              <div className="bg-[#FBF8F2] border-x-[2px] border-[#C89D54] mx-[2.4%] px-3 sm:px-7 md:px-9 py-4 sm:py-7 shadow-[0_20px_50px_rgba(27,67,50,0.08)]">
                {/* Mobile Clean Single-Line Dispatch Summary Bar (Collapsible) */}
                <div className="lg:hidden mb-3.5 rounded-xl bg-[#1B4332] text-[#FBF8F2] border border-[#C89D54]/60 shadow-xs overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileLedgerExpanded((prev) => !prev)
                    }
                    className="w-full px-3.5 py-2.5 flex items-center justify-between gap-2 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-[#D97706] shrink-0" />
                      <span className="text-xs font-bold text-[#FBF8F2] whitespace-nowrap">
                        Dispatch Summary
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#D97706]/25 border border-[#D97706]/50 text-[#FBF8F2] text-[10px] font-bold whitespace-nowrap">
                        {selectedProducts.size} Selected
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-[#C89D54] shrink-0 whitespace-nowrap">
                      <span>{mobileLedgerExpanded ? "Hide" : "Details"}</span>
                      {mobileLedgerExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </button>

                  {mobileLedgerExpanded && (
                    <div className="px-3.5 pb-3 pt-2 border-t border-[#C89D54]/25 space-y-1.5 text-xs">
                      <div className="flex justify-between gap-2">
                        <span className="text-[#C89D54]">Partner Profile:</span>
                        <span className="font-semibold text-right">
                          {orgType}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-[#C89D54]">Service Scope:</span>
                        <span className="font-semibold text-right">
                          {selectedScopes.length > 0
                            ? selectedScopes.join(", ")
                            : "—"}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-[#C89D54]">Commodities:</span>
                        <span className="font-semibold text-right">
                          {selectedProductsList.length > 0
                            ? selectedProductsList.join(", ")
                            : "None selected yet"}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-[#C89D54]">Schedule & Vol:</span>
                        <span className="font-semibold text-right">
                          {timeline}
                          {volume ? ` · ${volume}` : ""}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2-Column Split on Desktop (65% Left Wizard / 35% Right Live Ledger) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-start">
                  {/* LEFT COLUMN (65% -> 8 of 12 cols): Segmented Progress Bar + Active Slide + Navigation */}
                  <div className="lg:col-span-8 flex flex-col justify-between bg-white/80 backdrop-blur-md rounded-2xl border-[1.5px] border-[#C89D54]/55 p-3.5 sm:p-6 shadow-xs">
                    {/* Segmented 4-Pill Progress Bar */}
                    <div className="mb-5 sm:mb-6">
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-[11px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.16em] text-[#1B4332] whitespace-nowrap">
                          Step {currentStep} of 4
                          <span className="hidden sm:inline">
                            {" "}
                            — {STEP_META[currentStep - 1].shortLabel}
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={openStandaloneDispatchPortal}
                          className="text-[11px] font-bold text-[#D97706] hover:text-[#1B4332] underline underline-offset-2 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <span className="sm:hidden">Skip to Form →</span>
                          <span className="hidden sm:inline">
                            Skip to Final Dispatch Slip →
                          </span>
                        </button>
                      </div>

                      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                        {STEP_META.map((item) => {
                          const isActive = currentStep === item.step;
                          const isCompleted = currentStep > item.step;
                          return (
                            <button
                              key={item.step}
                              type="button"
                              onClick={() => setCurrentStep(item.step)}
                              className={`group flex flex-col items-center sm:items-start text-center sm:text-left px-1.5 py-2 sm:p-2 rounded-xl border transition-all cursor-pointer ${
                                isActive
                                  ? "bg-[#1B4332] border-[#D97706] text-[#FBF8F2] shadow-xs"
                                  : isCompleted
                                  ? "bg-[#1B4332]/10 border-[#C89D54] text-[#1B4332]"
                                  : "bg-[#FBF8F2] border-[#C89D54]/40 text-[#2A1D17]/60 hover:border-[#C89D54]"
                              }`}
                            >
                              <div className="flex items-center justify-center sm:justify-between w-full gap-1 mb-0.5 sm:mb-1">
                                <span
                                  className={`text-[10px] font-extrabold uppercase tracking-wider ${
                                    isActive
                                      ? "text-[#D97706]"
                                      : isCompleted
                                      ? "text-[#1B4332]"
                                      : "text-[#2A1D17]/50"
                                  }`}
                                >
                                  0{item.step}
                                </span>
                                {isCompleted && (
                                  <Check className="w-3 h-3 text-[#D97706] shrink-0" />
                                )}
                              </div>
                              <span className="text-[10px] sm:text-[11px] font-bold w-full leading-tight sm:truncate">
                                <span className="sm:hidden">
                                  {item.mobileLabel}
                                </span>
                                <span className="hidden sm:inline">
                                  {item.shortLabel}
                                </span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Active Slide Content Area */}
                    <div
                      key={currentStep}
                      className="min-h-[300px] flex flex-col justify-between animate-fade-in"
                    >
                      <div>
                        <div className="mb-4">
                          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#D97706] block">
                            Slide 0{currentStep}
                          </span>
                          <h4 className="text-xl sm:text-2xl font-bold text-[#2A1D17] tracking-tight mt-0.5">
                            {STEP_META[currentStep - 1].title}
                          </h4>
                        </div>

                        {/* SLIDE 1: ORGANIZATION PROFILE */}
                        {currentStep === 1 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {ORG_PROFILES.map((org) => {
                              const selected = orgType === org.id;
                              return (
                                <button
                                  key={org.id}
                                  type="button"
                                  onClick={() => setOrgType(org.id)}
                                  className={`flex items-start gap-3.5 p-4 rounded-xl border-[1.5px] text-left transition-all cursor-pointer ${
                                    selected
                                      ? "bg-[#1B4332]/10 border-[#D97706] shadow-[0_0_0_1px_#D97706]"
                                      : "bg-[#FBF8F2]/90 border-[#C89D54]/45 hover:border-[#C89D54] hover:bg-white"
                                  }`}
                                >
                                  <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                      selected
                                        ? "bg-[#1B4332] text-[#D97706]"
                                        : "bg-[#1B4332]/10 text-[#1B4332]"
                                    }`}
                                  >
                                    {org.icon}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="text-sm sm:text-[15px] font-bold text-[#2A1D17]">
                                        {org.label}
                                      </span>
                                      {selected && (
                                        <span className="w-5 h-5 rounded-full bg-[#D97706] text-white flex items-center justify-center shrink-0">
                                          <Check className="w-3 h-3" />
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-[#2A1D17]/70 mt-1 leading-relaxed">
                                      {org.subtitle}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* SLIDE 2: REQUIREMENT SCOPE */}
                        {currentStep === 2 && (
                          <div>
                            <p className="text-xs text-[#2A1D17]/70 mb-3">
                              Select one or more fulfillment modes required for
                              your plant or distribution line:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {REQUIREMENT_SCOPES.map((scope) => {
                                const selected = selectedScopes.includes(
                                  scope.id
                                );
                                return (
                                  <button
                                    key={scope.id}
                                    type="button"
                                    onClick={() => toggleScope(scope.id)}
                                    className={`flex items-start gap-3.5 p-4 rounded-xl border-[1.5px] text-left transition-all cursor-pointer ${
                                      selected
                                        ? "bg-[#1B4332]/10 border-[#D97706] shadow-[0_0_0_1px_#D97706]"
                                        : "bg-[#FBF8F2]/90 border-[#C89D54]/45 hover:border-[#C89D54] hover:bg-white"
                                    }`}
                                  >
                                    <div
                                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                        selected
                                          ? "bg-[#1B4332] text-[#D97706]"
                                          : "bg-[#1B4332]/10 text-[#1B4332]"
                                      }`}
                                    >
                                      {scope.icon}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center justify-between gap-2">
                                        <span className="text-sm sm:text-[15px] font-bold text-[#2A1D17]">
                                          {scope.label}
                                        </span>
                                        {selected && (
                                          <span className="w-5 h-5 rounded-full bg-[#D97706] text-white flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3" />
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-xs text-[#2A1D17]/70 mt-1 leading-relaxed">
                                        {scope.subtitle}
                                      </p>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* SLIDE 3: PRIMARY COMMODITIES (OILS, SEEDS & DE-OILED CAKES) */}
                        {currentStep === 3 && (
                          <div>
                            <p className="text-xs text-[#2A1D17]/70 mb-3">
                              Tap to select edible oils, graded oilseeds, and
                              de-oiled cakes (DOC) for your dispatch brief:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {PRIMARY_COMMODITIES.map((item) => {
                                const selected = selectedProducts.has(
                                  item.catalogName
                                );
                                return (
                                  <button
                                    key={item.id}
                                    type="button"
                                    onClick={() =>
                                      toggleCatalogProduct(item.catalogName)
                                    }
                                    className={`group flex items-center gap-3 p-3 rounded-xl border-[1.5px] text-left transition-all cursor-pointer ${
                                      selected
                                        ? "bg-[#1B4332]/10 border-[#D97706] shadow-[0_0_0_1px_#D97706]"
                                        : "bg-[#FBF8F2]/90 border-[#C89D54]/45 hover:border-[#C89D54] hover:bg-white"
                                    }`}
                                  >
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#C89D54] bg-white shrink-0">
                                      <img
                                        src={item.image}
                                        alt={item.displayName}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                      />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-start justify-between gap-1">
                                        <span className="text-xs sm:text-[13px] font-bold text-[#2A1D17] leading-snug">
                                          {item.displayName}
                                        </span>
                                        {selected && (
                                          <span className="w-4 h-4 rounded-full bg-[#D97706] text-white flex items-center justify-center shrink-0 mt-0.5">
                                            <Check className="w-2.5 h-2.5" />
                                          </span>
                                        )}
                                      </div>
                                      <span className="inline-block text-[10px] font-semibold text-[#1B4332] bg-[#1B4332]/10 px-2 py-0.5 rounded-full mt-1">
                                        {item.badge}
                                      </span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* SLIDE 4: DISPATCH TIMELINE & VOLUME */}
                        {currentStep === 4 && (
                          <div className="space-y-5">
                            <div>
                              <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] block mb-2.5">
                                Target Dispatch Schedule
                              </span>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                {TIMELINE_OPTIONS.map((item) => {
                                  const active = timeline === item;
                                  return (
                                    <button
                                      key={item}
                                      type="button"
                                      onClick={() => setTimeline(item)}
                                      className={`px-3 py-2.5 rounded-xl text-xs font-bold border-[1.5px] text-center transition-all cursor-pointer ${
                                        active
                                          ? "bg-[#1B4332] text-[#FBF8F2] border-[#D97706] shadow-xs"
                                          : "bg-[#FBF8F2] text-[#2A1D17] border-[#C89D54]/55 hover:border-[#D97706]"
                                      }`}
                                    >
                                      {item}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                              <div>
                                <label
                                  htmlFor="wizardVolume"
                                  className="block text-xs sm:text-sm font-bold text-[#1B4332] mb-1.5"
                                >
                                  Estimated Volume (MT / Litres / Quintals)
                                </label>
                                <div className="relative flex items-center">
                                  <Scale className="w-4 h-4 text-[#D97706] absolute left-3.5 pointer-events-none" />
                                  <input
                                    id="wizardVolume"
                                    type="text"
                                    value={volume}
                                    onChange={(e) => setVolume(e.target.value)}
                                    placeholder="e.g., 10 MT or 5,000 Litres"
                                    className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-[#FBF8F2] border-[1.5px] border-[#C89D54]/70 text-[#2A1D17] font-semibold placeholder:text-[#2A1D17]/35 placeholder:font-normal text-sm focus:bg-white focus:border-[#1B4332] focus:ring-2 focus:ring-[#D97706]/40 outline-none transition-all"
                                  />
                                </div>
                              </div>

                              <div>
                                <label
                                  htmlFor="wizardLocation"
                                  className="block text-xs sm:text-sm font-bold text-[#1B4332] mb-1.5"
                                >
                                  Destination City / State
                                </label>
                                <div className="relative flex items-center">
                                  <MapPin className="w-4 h-4 text-[#D97706] absolute left-3.5 pointer-events-none" />
                                  <input
                                    id="wizardLocation"
                                    type="text"
                                    value={location}
                                    onChange={(e) =>
                                      setLocation(e.target.value)
                                    }
                                    placeholder="e.g., Jaipur, Rajasthan / Mundra"
                                    className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-[#FBF8F2] border-[1.5px] border-[#C89D54]/70 text-[#2A1D17] font-semibold placeholder:text-[#2A1D17]/35 placeholder:font-normal text-sm focus:bg-white focus:border-[#1B4332] focus:ring-2 focus:ring-[#D97706]/40 outline-none transition-all"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Wizard Bottom Navigation Controls */}
                      <div className="mt-6 pt-4 border-t border-[#C89D54]/35 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setCurrentStep((prev) => Math.max(1, prev - 1))
                          }
                          disabled={currentStep === 1}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold border border-[#C89D54] text-[#2A1D17] bg-[#FBF8F2] hover:bg-white disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back</span>
                        </button>

                        {currentStep < 4 ? (
                          <button
                            type="button"
                            onClick={() =>
                              setCurrentStep((prev) => Math.min(4, prev + 1))
                            }
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#1B4332] hover:bg-[#143325] text-[#FBF8F2] border border-[#D97706] shadow-sm transition-all cursor-pointer active:scale-95"
                          >
                            <span>Continue</span>
                            <ArrowRight className="w-4 h-4 text-[#D97706]" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={openStandaloneDispatchPortal}
                            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-[#D97706] hover:bg-[#B45309] text-white border border-[#F5E6C8] shadow-md transition-all cursor-pointer active:scale-95"
                          >
                            <span>Proceed to Final Dispatch Slip</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN (35% -> 4 of 12 cols): Live "Dispatch Summary" Ledger Card in Deep Forest Green */}
                  <div className="hidden lg:flex lg:col-span-4 flex-col justify-between rounded-2xl bg-[#1B4332] text-[#FBF8F2] border-[1.5px] border-[#C89D54] p-5 shadow-[0_14px_34px_rgba(27,67,50,0.22)]">
                    <div>
                      <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#C89D54]/35">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D97706] block">
                            Live Mill Ledger
                          </span>
                          <h5 className="text-lg font-bold text-[#FBF8F2] tracking-tight">
                            Dispatch Summary
                          </h5>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-[#D97706]/20 border border-[#D97706] text-[#FBF8F2] text-xs font-bold">
                          {completionStats.pct}%
                        </span>
                      </div>

                      {/* Amber Completion Bar */}
                      <div className="mt-3 mb-4">
                        <div className="h-2 w-full rounded-full bg-[#0F291E] overflow-hidden border border-[#C89D54]/30">
                          <div
                            className="h-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] transition-all duration-300 rounded-full"
                            style={{ width: `${completionStats.pct}%` }}
                          />
                        </div>
                      </div>

                      {/* Ledger Entries */}
                      <div className="space-y-3.5 text-xs">
                        <div className="pb-2.5 border-b border-[#C89D54]/25">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#C89D54] block">
                            01 · Organization Profile
                          </span>
                          <span className="text-sm font-bold text-[#FBF8F2] mt-0.5 block">
                            {orgType || "Not selected"}
                          </span>
                        </div>

                        <div className="pb-2.5 border-b border-[#C89D54]/25">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#C89D54] block">
                            02 · Requirement Scope
                          </span>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {selectedScopes.length > 0 ? (
                              selectedScopes.map((s) => (
                                <span
                                  key={s}
                                  className="px-2 py-0.5 rounded-md bg-white/10 border border-[#C89D54]/40 text-[11px] font-semibold text-[#FBF8F2]"
                                >
                                  {s}
                                </span>
                              ))
                            ) : (
                              <span className="text-[#FBF8F2]/50 italic">
                                Select service scope...
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="pb-2.5 border-b border-[#C89D54]/25">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C89D54]">
                              03 · Selected Commodities
                            </span>
                            <span className="text-[10px] font-bold text-[#D97706]">
                              {selectedProductsList.length} selected
                            </span>
                          </div>
                          {selectedProductsList.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                              {selectedProductsList.map((prod) => (
                                <span
                                  key={prod}
                                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D97706]/20 border border-[#D97706]/70 text-[11px] font-semibold text-[#FBF8F2]"
                                >
                                  <span className="truncate max-w-[170px]">
                                    {prod}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => onRemoveProduct(prod)}
                                    className="hover:text-[#D97706] cursor-pointer ml-0.5"
                                    aria-label={`Remove ${prod}`}
                                  >
                                    &times;
                                  </button>
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-[#FBF8F2]/50 italic mt-1 block">
                              Tap commodities in Slide 3...
                            </span>
                          )}
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#C89D54] block">
                            04 · Schedule &amp; Tonnage
                          </span>
                          <span className="text-xs font-semibold text-[#FBF8F2] mt-0.5 block">
                            {timeline}
                            {volume ? ` · ${volume}` : ""}
                            {location ? ` → ${location}` : ""}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-[#C89D54]/35">
                      <button
                        type="button"
                        onClick={openStandaloneDispatchPortal}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                      >
                        <FileCheck2 className="w-4 h-4" />
                        <span>Open Final Dispatch Slip</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {renderArchwayBase()}
            </div>
          </div>
        </div>
      </section>

      {/* PART 2: SLIDE 6 — STANDALONE FULL-PAGE FINAL ENQUIRY PORTAL */}
      {isStandalonePortalOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mill Dispatch Desk — Final Commercial Inquiry"
            className="fixed inset-0 z-[200] overflow-y-auto bg-[#FBF8F2] jaali-pattern text-[#2A1D17] animate-fade-in"
          >
            {/* Standalone Top Navigation Bar */}
            <div className="sticky top-0 z-30 bg-[#1B4332]/95 backdrop-blur-md border-b-2 border-[#C89D54] px-4 sm:px-8 py-3 shadow-md">
              <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src="./logo.png"
                    alt="Prime Fresh Oil Mills"
                    className="w-9 h-9 rounded-full bg-white p-0.5 border border-[#C89D54] object-contain shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D97706] block leading-none">
                      Mill Dispatch Portal · Step 6 of 6
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#FBF8F2] tracking-tight">
                      Prime Fresh Oil Mills — Final Dispatch Slip
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeStandaloneDispatchPortal}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FBF8F2] hover:bg-white text-[#1B4332] border border-[#C89D54] text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4 text-[#D97706]" />
                  <span>Return to Main Website</span>
                </button>
              </div>
            </div>

            {/* Standalone Portal Main Container */}
            <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-10 py-6 sm:py-10">
              {renderArchwayCrown(
                "MILL DISPATCH DESK — FINAL COMMERCIAL INQUIRY",
                "Verified Wholesale Dispatch Slip & RFQ"
              )}

              <div className="relative bg-[#FFFDF9] border-x-[2px] border-[#C89D54] mx-[2.4%] px-4 sm:px-8 md:px-10 py-6 sm:py-8 shadow-[0_24px_60px_rgba(27,67,50,0.12)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
                  {/* LEFT COLUMN (7 Cols): The Pre-Filled Commercial Form */}
                  <div className="lg:col-span-7">
                    <div className="mb-5 pb-3 border-b border-[#C89D54]/40 flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#D97706] block">
                          Pre-Populated From Your 5-Step Brief
                        </span>
                        <h4 className="text-lg sm:text-xl font-bold text-[#1B4332]">
                          Confirm Dispatch &amp; Billing Coordinates
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={closeStandaloneDispatchPortal}
                        className="text-xs font-bold text-[#D97706] hover:text-[#1B4332] underline cursor-pointer"
                      >
                        Edit Wizard Steps (1–5)
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Row 1: Company Name * & Contact Person * */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label
                            htmlFor="finalCompanyName"
                            className="block text-sm font-bold text-[#1B4332] mb-1"
                          >
                            Company Name *
                          </label>
                          <input
                            id="finalCompanyName"
                            type="text"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="e.g., Agro Foods Pvt Ltd"
                            className="w-full h-11 px-3.5 rounded-xl bg-[#FBF8F2] border-[1.5px] border-[#C89D54]/70 text-[#2A1D17] font-semibold placeholder:text-[#2A1D17]/30 placeholder:font-normal text-sm focus:bg-white focus:border-[#1B4332] focus:ring-2 focus:ring-[#D97706]/35 outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="finalContactPerson"
                            className="block text-sm font-bold text-[#1B4332] mb-1"
                          >
                            Contact Person *
                          </label>
                          <input
                            id="finalContactPerson"
                            type="text"
                            required
                            value={contactPerson}
                            onChange={(e) => setContactPerson(e.target.value)}
                            placeholder="e.g., Rajesh Sharma (Procurement Head)"
                            className="w-full h-11 px-3.5 rounded-xl bg-[#FBF8F2] border-[1.5px] border-[#C89D54]/70 text-[#2A1D17] font-semibold placeholder:text-[#2A1D17]/30 placeholder:font-normal text-sm focus:bg-white focus:border-[#1B4332] focus:ring-2 focus:ring-[#D97706]/35 outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Row 2: Contact Number (WhatsApp) * & Business Email * */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label
                            htmlFor="finalPhone"
                            className="block text-sm font-bold text-[#1B4332] mb-1"
                          >
                            Contact Number (WhatsApp) *
                          </label>
                          <div className="relative flex items-center">
                            <span className="absolute left-3.5 text-sm font-bold text-[#2A1D17]/45 select-none pointer-events-none">
                              +91
                            </span>
                            <input
                              id="finalPhone"
                              type="tel"
                              inputMode="numeric"
                              maxLength={10}
                              required
                              value={phone}
                              onChange={(e) =>
                                setPhone(
                                  e.target.value.replace(/\D/g, "").slice(0, 10)
                                )
                              }
                              placeholder="XXXXX XXXXX"
                              className="w-full h-11 pl-12 pr-3.5 rounded-xl bg-[#FBF8F2] border-[1.5px] border-[#C89D54]/70 text-[#2A1D17] font-semibold placeholder:text-[#2A1D17]/30 placeholder:font-normal text-sm focus:bg-white focus:border-[#1B4332] focus:ring-2 focus:ring-[#D97706]/35 outline-none transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="finalEmail"
                            className="block text-sm font-bold text-[#1B4332] mb-1"
                          >
                            Business Email *
                          </label>
                          <input
                            id="finalEmail"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="procurement@company.com"
                            className="w-full h-11 px-3.5 rounded-xl bg-[#FBF8F2] border-[1.5px] border-[#C89D54]/70 text-[#2A1D17] font-semibold placeholder:text-[#2A1D17]/30 placeholder:font-normal text-sm focus:bg-white focus:border-[#1B4332] focus:ring-2 focus:ring-[#D97706]/35 outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Row 3: Organization Type (Pre-filled from Slide 1, editable dropdown) */}
                      <div>
                        <label
                          htmlFor="finalOrgType"
                          className="block text-sm font-bold text-[#1B4332] mb-1"
                        >
                          Organization Type
                        </label>
                        <select
                          id="finalOrgType"
                          value={orgType}
                          onChange={(e) => setOrgType(e.target.value)}
                          className="w-full h-11 px-3.5 rounded-xl bg-[#FBF8F2] border-[1.5px] border-[#C89D54]/70 text-[#2A1D17] font-semibold text-sm focus:bg-white focus:border-[#1B4332] focus:ring-2 focus:ring-[#D97706]/35 outline-none transition-all cursor-pointer"
                        >
                          {ORG_PROFILES.map((org) => (
                            <option key={org.id} value={org.id}>
                              {org.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Row 4: Selected Commodities (Visual Chips with Thumbnails + Add Dropdown) */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label
                            htmlFor="finalAddCommodity"
                            className="block text-sm font-bold text-[#1B4332]"
                          >
                            Selected Commodities *
                          </label>
                          <span className="text-xs font-bold text-[#D97706]">
                            {selectedProductsList.length} item
                            {selectedProductsList.length === 1 ? "" : "s"} in
                            dispatch slip
                          </span>
                        </div>

                        <div
                          className={`min-h-[54px] p-2.5 rounded-xl bg-[#FBF8F2] border-[1.5px] flex flex-wrap items-center gap-2 transition-all ${
                            showProductError
                              ? "border-[#7A1F2B] ring-2 ring-[#7A1F2B]/30"
                              : "border-[#C89D54]/70"
                          }`}
                        >
                          {selectedProductsList.length === 0 ? (
                            <span className="text-xs text-[#2A1D17]/45 italic px-1">
                              No commodities selected yet — add an item below:
                            </span>
                          ) : (
                            selectedProductsList.map((prod) => {
                              const meta = getProductMeta(prod);
                              return (
                                <div
                                  key={prod}
                                  onClick={() => setActiveVisualProduct(prod)}
                                  className={`inline-flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full border text-xs font-bold transition-all cursor-pointer ${
                                    activeVisualProduct === prod
                                      ? "bg-[#1B4332] text-[#FBF8F2] border-[#D97706] shadow-xs"
                                      : "bg-white text-[#2A1D17] border-[#C89D54] hover:border-[#D97706]"
                                  }`}
                                >
                                  <img
                                    src={meta.image}
                                    alt={meta.title}
                                    className="w-6 h-6 rounded-full object-cover border border-[#C89D54]"
                                  />
                                  <span>{prod}</span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onRemoveProduct(prod);
                                    }}
                                    className="w-4 h-4 rounded-full inline-flex items-center justify-center hover:bg-[#D97706] hover:text-white transition-colors cursor-pointer"
                                    aria-label={`Remove ${prod}`}
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              );
                            })
                          )}
                        </div>

                        <div className="mt-2">
                          <select
                            id="finalAddCommodity"
                            defaultValue=""
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val) {
                                onAddProduct(val);
                                setActiveVisualProduct(val);
                                setValidationAlert(null);
                                e.target.value = "";
                              }
                            }}
                            className="w-full h-10 px-3.5 rounded-xl bg-[#FBF8F2] border-[1.5px] border-[#C89D54]/60 text-[#2A1D17]/80 text-xs sm:text-sm font-semibold focus:bg-white focus:border-[#1B4332] outline-none transition-all cursor-pointer"
                          >
                            <option value="" disabled>
                              + Add another item from mill catalog...
                            </option>
                            {ALL_PRODUCT_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                🌾 {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Row 5: Estimated Volume, Delivery Timeline & Destination */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label
                            htmlFor="finalVolume"
                            className="block text-xs sm:text-sm font-bold text-[#1B4332] mb-1"
                          >
                            Estimated Volume *
                          </label>
                          <input
                            id="finalVolume"
                            type="text"
                            required
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                            placeholder="e.g., 10 MT or 5,000 L"
                            className="w-full h-10 px-3 rounded-xl bg-[#FBF8F2] border-[1.5px] border-[#C89D54]/70 text-[#2A1D17] font-semibold text-xs sm:text-sm focus:bg-white focus:border-[#1B4332] outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="finalTimeline"
                            className="block text-xs sm:text-sm font-bold text-[#1B4332] mb-1"
                          >
                            Delivery Timeline
                          </label>
                          <select
                            id="finalTimeline"
                            value={timeline}
                            onChange={(e) => setTimeline(e.target.value)}
                            className="w-full h-10 px-3 rounded-xl bg-[#FBF8F2] border-[1.5px] border-[#C89D54]/70 text-[#2A1D17] font-semibold text-xs sm:text-sm focus:bg-white focus:border-[#1B4332] outline-none transition-all cursor-pointer"
                          >
                            {TIMELINE_OPTIONS.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="finalDestination"
                            className="block text-xs sm:text-sm font-bold text-[#1B4332] mb-1"
                          >
                            Destination City/State *
                          </label>
                          <input
                            id="finalDestination"
                            type="text"
                            required
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="City, State / Port"
                            className="w-full h-10 px-3 rounded-xl bg-[#FBF8F2] border-[1.5px] border-[#C89D54]/70 text-[#2A1D17] font-semibold text-xs sm:text-sm focus:bg-white focus:border-[#1B4332] outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Row 6: Additional Specifications / Notes (Auto-populated & Editable) */}
                      <div>
                        <label
                          htmlFor="finalSpecs"
                          className="block text-xs sm:text-sm font-bold text-[#1B4332] mb-1"
                        >
                          Additional Specifications / Notes
                        </label>
                        <textarea
                          id="finalSpecs"
                          rows={2}
                          value={specifications}
                          onChange={(e) => {
                            setSpecifications(e.target.value);
                            setNotesManuallyEdited(true);
                          }}
                          placeholder="Service scope, packaging preferences, or lab specification notes..."
                          className="w-full px-3.5 py-2 rounded-xl bg-[#FBF8F2] border-[1.5px] border-[#C89D54]/70 text-[#2A1D17] font-medium text-xs sm:text-sm focus:bg-white focus:border-[#1B4332] outline-none transition-all resize-none"
                        />
                      </div>

                      {/* Validation Alert */}
                      {validationAlert && (
                        <div
                          role="alert"
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FFF7F6] border border-[#7A1F2B] text-[#7A1F2B] text-xs font-semibold shadow-2xs"
                        >
                          <span className="flex-1 leading-relaxed">
                            {validationAlert}
                          </span>
                          <button
                            type="button"
                            onClick={() => setValidationAlert(null)}
                            className="font-bold text-sm px-1 cursor-pointer"
                          >
                            &times;
                          </button>
                        </div>
                      )}

                      {/* Dual Submission Buttons */}
                      <div className="pt-2 flex flex-col sm:flex-row gap-3">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#1B4332] hover:bg-[#143325] text-[#FBF8F2] border border-[#C89D54] font-bold text-sm sm:text-[15px] shadow-md transition-all cursor-pointer active:scale-95 disabled:opacity-60"
                        >
                          <span>
                            {isSubmitting
                              ? "Logging Dispatch Slip..."
                              : "Submit Official Inquiry"}
                          </span>
                          <FileCheck2 className="w-4 h-4 text-[#D97706]" />
                        </button>

                        <button
                          type="button"
                          onClick={handleWhatsAppInquiry}
                          className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#D97706]/15 hover:bg-[#D97706] text-[#1B4332] hover:text-white border-[1.5px] border-[#D97706] backdrop-blur-md font-bold text-sm sm:text-[15px] shadow-sm transition-all cursor-pointer active:scale-95"
                        >
                          <svg
                            className="w-4 h-4 fill-current shrink-0"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                          </svg>
                          <span>Send Brief via WhatsApp</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* RIGHT COLUMN (5 Cols): Visual Summary & Mill Assurance Card */}
                  <div className="lg:col-span-5 space-y-4">
                    {/* Decorative Golden Geometric Frame Showcase */}
                    <div className="rounded-2xl bg-[#1B4332] text-[#FBF8F2] border-2 border-[#C89D54] p-5 shadow-lg relative overflow-hidden">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D97706]">
                          Selected Commodity Showcase
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#D97706]/25 border border-[#D97706] text-[10px] font-bold text-[#FBF8F2]">
                          {featuredVisualMeta.badge}
                        </span>
                      </div>

                      {/* Decorative Golden Arch / Geometric Frame Around Image */}
                      <div className="relative rounded-xl p-2 border-[1.5px] border-[#C89D54] bg-[#0F291E]/90">
                        <div className="relative h-48 sm:h-52 w-full rounded-lg overflow-hidden border border-[#C89D54]/50">
                          <img
                            src={featuredVisualMeta.image}
                            alt={featuredVisualMeta.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0F291E] via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <h5 className="text-lg font-bold text-[#FBF8F2] drop-shadow-xs">
                              {featuredVisualMeta.title}
                            </h5>
                            <p className="text-xs text-[#FBF8F2]/80 line-clamp-2 mt-0.5">
                              {featuredVisualMeta.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Summary Tags of Configured Brief */}
                      <div className="mt-4 pt-3 border-t border-[#C89D54]/30 grid grid-cols-2 gap-2.5 text-xs">
                        <div className="p-2.5 rounded-xl bg-white/5 border border-[#C89D54]/25">
                          <span className="text-[10px] uppercase tracking-wider text-[#C89D54] block">
                            Partner Profile
                          </span>
                          <span className="font-bold text-[#FBF8F2] truncate block mt-0.5">
                            {orgType}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/5 border border-[#C89D54]/25">
                          <span className="text-[10px] uppercase tracking-wider text-[#C89D54] block">
                            Packaging Format
                          </span>
                          <span className="font-bold text-[#FBF8F2] truncate block mt-0.5">
                            {selectedFormats.join(", ") || "Mill Standard"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Mill Direct Guarantee Box */}
                    <div className="rounded-2xl bg-[#FBF8F2] border-[1.5px] border-[#C89D54] p-5 shadow-xs">
                      <div className="flex items-center gap-2 mb-3">
                        <ShieldCheck className="w-5 h-5 text-[#1B4332]" />
                        <h5 className="text-sm sm:text-base font-bold text-[#1B4332] uppercase tracking-wider">
                          Mill Direct Guarantee
                        </h5>
                      </div>

                      <div className="space-y-3 text-xs sm:text-sm">
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-[#1B4332] text-[#D97706] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                            1
                          </span>
                          <div>
                            <span className="font-bold text-[#2A1D17] block">
                              Direct Mandi Sourcing
                            </span>
                            <span className="text-xs text-[#2A1D17]/75">
                              Zero middleman markups — direct Rajasthan &amp;
                              central belt oilseed procurement.
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-[#1B4332] text-[#D97706] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                            2
                          </span>
                          <div>
                            <span className="font-bold text-[#2A1D17] block">
                              Lab-Tested Purity
                            </span>
                            <span className="text-xs text-[#2A1D17]/75">
                              AGMARK Grade-1 &amp; FSSAI compliant batches with
                              verified FFA, moisture, and pungency COA slips.
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-[#1B4332] text-[#D97706] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                            3
                          </span>
                          <div>
                            <span className="font-bold text-[#2A1D17] block">
                              Pan-India Logistics
                            </span>
                            <span className="text-xs text-[#2A1D17]/75">
                              Electronic weighbridge tare slips with multi-axle
                              tankers and containerized rail/road dispatch.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Confirmation Overlay Inside Slide 6 When Submitted */}
                {isSubmitted && (
                  <div className="absolute inset-0 bg-[#FBF8F2]/96 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20 animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-[#1B4332] border-2 border-[#D97706] text-[#D97706] flex items-center justify-center mb-4 shadow-lg">
                      <Check className="w-8 h-8" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706]">
                      Mill Dispatch Desk Confirmed
                    </span>
                    <h4 className="text-2xl sm:text-3xl text-[#1B4332] font-bold mt-1">
                      Official Dispatch Inquiry Logged
                    </h4>
                    <p className="text-sm sm:text-base text-[#2A1D17]/80 max-w-md mt-2 leading-relaxed">
                      Thank you,{" "}
                      <strong className="text-[#1B4332]">
                        {contactPerson || companyName}
                      </strong>
                      ! Your configured procurement brief has been assigned to
                      our commercial desk. We will revert shortly via{" "}
                      <strong className="text-[#1B4332]">
                        Puneet2garg@gmail.com
                      </strong>{" "}
                      and WhatsApp.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={handleWhatsAppInquiry}
                        className="px-6 py-2.5 rounded-full bg-[#D97706] hover:bg-[#B45309] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                      >
                        Also Send Copy via WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-2.5 rounded-full bg-[#1B4332] text-[#FBF8F2] hover:bg-[#143325] text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                      >
                        Return to Website
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {renderArchwayBase()}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
