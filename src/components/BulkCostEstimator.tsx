import React, { useState, useMemo } from "react";
import {
  ChevronRight,
  Calculator,
  Truck,
  Package,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const OWNER_WHATSAPP_NUMBER = "919057292529";

type UnitType = "MT" | "Quintal" | "Litre";
type CurrencyCode = "INR" | "USD" | "LKR";

interface EstimatorProduct {
  id: string;
  catalogName: string;
  pillLabel: string;
  title: string;
  categoryBadge: string;
  grade: string;
  packaging: string;
  image: string;
  defaultUnit: UnitType;
  allowedUnits: UnitType[];
  benchmarkRatePerQuintalINR: number;
  litreRateINR: number;
  packagingCostPerMT_INR: number;
  specsSummary: string;
}

const ESTIMATOR_PRODUCTS: EstimatorProduct[] = [
  {
    id: "mustard-oil",
    catalogName: "Mustard Oil",
    pillLabel: "Mustard Oil",
    title: "Kachi Ghani Mustard Oil",
    categoryBadge: "Edible Oils",
    grade: "AGMARK Grade-1 · FFA < 0.85%",
    packaging: "15L Tins, 200L Barrels & Bulk Tankers",
    image: "./mustard_oil_mockup.png",
    defaultUnit: "MT",
    allowedUnits: ["MT", "Quintal", "Litre"],
    benchmarkRatePerQuintalINR: 13800,
    litreRateINR: 128,
    packagingCostPerMT_INR: 2400,
    specsSummary: "100% First-Press Cold Expeller · Pungency ≥ 0.32%",
  },
  {
    id: "natural-white-sesame-seeds",
    catalogName: "Natural White Sesame Seeds",
    pillLabel: "White Sesame",
    title: "Natural White Sesame Seeds",
    categoryBadge: "Edible Seeds",
    grade: "99.5% Sortex Cleaned · Moisture ≤ 5%",
    packaging: "25kg / 50kg PP Woven & Paper Lined Bags",
    image: "./natural-sesame-seed.jpg",
    defaultUnit: "MT",
    allowedUnits: ["MT", "Quintal"],
    benchmarkRatePerQuintalINR: 15400,
    litreRateINR: 154,
    packagingCostPerMT_INR: 1650,
    specsSummary: "Oil Content 48%–52% · Export & Confectionery Grade",
  },
  {
    id: "black-mustard-doc",
    catalogName: "Black Mustard De-Oiled Cake (DOC)",
    pillLabel: "Black Mustard DOC",
    title: "Black Mustard De-Oiled Cake (DOC)",
    categoryBadge: "De-Oiled Cakes",
    grade: "Crude Protein 37%–38.5% · Oil < 1.5%",
    packaging: "50kg HDPE Bags & Loose Bulk Tipper Loads",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrNLDlHcwDwPM-1wrKsE8xYBrfyLK8ymf0txdV_TO7IXFNPdMgYhG-vRPoA2sYmBTqczsLbeKbYRMxnTz4JwKO4UZkQkKPV0g-r5V047V41Qn4aH5rl3PcjS-nx0I3RTSxg6ZXBsiemFiH8l95YGdd6jShMGVU2VfCM7BQtfJ1djehJmYsndxaB1ILRpU1tVGd88-gSYU4Py_udck9AAEcApaE8Z0uLWJWRaIyZ4O-b2Qp18uvLGZwQh8pCrMZora68rg",
    defaultUnit: "MT",
    allowedUnits: ["MT", "Quintal"],
    benchmarkRatePerQuintalINR: 2850,
    litreRateINR: 28.5,
    packagingCostPerMT_INR: 950,
    specsSummary: "High-Nitrogen Compound Livestock & Poultry Feed",
  },
  {
    id: "yellow-mustard-doc",
    catalogName: "Yellow Mustard De-Oiled Cake",
    pillLabel: "Yellow Mustard DOC",
    title: "Yellow Mustard De-Oiled Cake",
    categoryBadge: "De-Oiled Cakes",
    grade: "Crude Protein 38%–40.5% · Low Fibre",
    packaging: "50kg HDPE Bags & Bulk Container Loads",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAZ5BNp6S3YDh0C3gW7qdpAvGRgD6AgEpER8tJKQwU7tdBMD_DIJMuQktvKk7t5fwOlpKD6SkrWv6BtVXLEe9cbfV4kzCiva8bec0AnFWjGo8glOb-2EKBjf-Dd9DZQwg_w2DAxn4_b0A3XPeVLLEZZ4A_SvmkFcV0vZ1E4XRn7wWqnDdZl-0rchXbpfJc_bJcle3XWGAV8mu4POVLY1R8mPzkEAfiP8GXXJZS7tQFCNsaV946xs83mGAVkVmozBUkpxGk",
    defaultUnit: "MT",
    allowedUnits: ["MT", "Quintal"],
    benchmarkRatePerQuintalINR: 3150,
    litreRateINR: 31.5,
    packagingCostPerMT_INR: 950,
    specsSummary: "Golden Expeller Flakes · High Digestibility Cattle Feed",
  },
  {
    id: "yellow-mustard-seeds",
    catalogName: "Yellow Mustard Seeds",
    pillLabel: "Yellow Mustard",
    title: "Yellow Mustard Seeds",
    categoryBadge: "Edible Seeds",
    grade: "≥ 99.5% Sortex Graded · Moisture ≤ 7%",
    packaging: "50kg Jute / PP Bags & Bulk Silo Dispatch",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHb8WtDvjO7YNZtMJw75A_KpkLUZpU5qXEgvW3gkz04UolN-MDqQZPXFrYf3-iA26AHc6HAY1nwlziMprVn5FwZJObUK8F3TKSLX-tcWLPt-9wb_lkhYV2hKQxgOyBHFVf8nkZ-8EFuS-eWREOoDvncSHz3ILZxDeiMYt5FFwff4uqhoKBPHqeuFLhaT3tJbbd5aYM11Dm153gAVXkyRFfupHZA7VNGYTpKnR-lgWKzI6V-W2Zwy8BZmxIfoB57PDUC9Q",
    defaultUnit: "MT",
    allowedUnits: ["MT", "Quintal"],
    benchmarkRatePerQuintalINR: 6450,
    litreRateINR: 64.5,
    packagingCostPerMT_INR: 1350,
    specsSummary: "Oil Yield 39.5%–42% · Milling & Condiment Grade",
  },
  {
    id: "black-sesame-seeds",
    catalogName: "Black Sesame Seeds",
    pillLabel: "Black Sesame",
    title: "Black Sesame Seeds",
    categoryBadge: "Edible Seeds",
    grade: "≥ 99.0% Sorted & De-Stoned · FFA < 1.5%",
    packaging: "25kg / 50kg Multi-Wall Lined Export Bags",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCyPlwEER-IZxG52j_9oIR5Ah4C2R-OzCBzJhFgoj2Afou8StjV7xu-c7KFB_ZdajOsWMXg1k5lUlNcZaUGXmOPU1AimIZaLJkXNlmNcb7Jget6arJLJE8RI16F5LWocWCQqoOIcZjeAUzi-X3A9FtWU_TezGZQOCYFZ6jNIN4QMwwZElJjQ4m4D6K8dse3k05LcMWOi4uJM7UMZqflYV1kvOk_G1zQy8L8nUN-rjVuRkpKCg3yqMzycChILu6MavZj7v8",
    defaultUnit: "MT",
    allowedUnits: ["MT", "Quintal"],
    benchmarkRatePerQuintalINR: 16800,
    litreRateINR: 168,
    packagingCostPerMT_INR: 1700,
    specsSummary: "Deep Black Uniform Kernels · Medicinal & Bakery Grade",
  },
  {
    id: "black-mustard-seeds",
    catalogName: "Black Mustard Seeds (Rai / Sarson)",
    pillLabel: "Black Sarson",
    title: "Black Mustard Seeds (Rai / Sarson)",
    categoryBadge: "Edible Seeds",
    grade: "≥ 99.0% Graded Grain · Oil 36.5%–39%",
    packaging: "50kg New Jute & PP Woven Sacks",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAZ5BNp6S3YDh0C3gW7qdpAvGRgD6AgEpER8tJKQwU7tdBMD_DIJMuQktvKk7t5fwOlpKD6SkrWv6BtVXLEe9cbfV4kzCiva8bec0AnFWjGo8glOb-2EKBjf-Dd9DZQwg_w2DAxn4_b0A3XPeVLLEZZ4A_SvmkFcV0vZ1E4XRn7wWqnDdZl-0rchXbpfJc_bJcle3XWGAV8mu4POVLY1R8mPzkEAfiP8GXXJZS7tQFCNsaV946xs83mGAVkVmozBUkpxGk",
    defaultUnit: "MT",
    allowedUnits: ["MT", "Quintal"],
    benchmarkRatePerQuintalINR: 5650,
    litreRateINR: 56.5,
    packagingCostPerMT_INR: 1250,
    specsSummary: "High Volatile Essential Oil ≥ 0.40% · Kachi Ghani Crushing",
  },
  {
    id: "groundnut-seeds",
    catalogName: "Groundnut Seeds (Peanut Kernels)",
    pillLabel: "Groundnut Kernels",
    title: "Groundnut Seeds (Peanut Kernels)",
    categoryBadge: "Edible Seeds",
    grade: "40/50 & 50/60 Counts · Moisture ≤ 6.5%",
    packaging: "25kg Vacuum Packs & 50kg Jute Bags",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkfVX2-k2n4NKU2KxcVeTOrV9h8T4CPWMPQGkOnRUayUEWdaRdZDkmWW-VHv6B02X50peGaOT--UnQAhzPADVoMidCXp3MvNL5uTmVcUOKGNjRsHf74u8bkMtVJ6c_MnNFngi0oDeHSQ0TyyMVhfolNJSQ-y-qn51YhmLePA4RqIr9yNlDOT4A3sfDR1JCxTNlxmtpEk1do0bX3JVhyR55W1kF9L_yeYkgc1sbsQVHxYZgAthw7pezXGks-jZk40xg3Vg",
    defaultUnit: "MT",
    allowedUnits: ["MT", "Quintal"],
    benchmarkRatePerQuintalINR: 9200,
    litreRateINR: 92,
    packagingCostPerMT_INR: 1550,
    specsSummary: "Oil Content 46%–49% · Aflatoxin Tested Export Kernels",
  },
  {
    id: "yellow-sesame-seeds",
    catalogName: "Yellow Sesame Seeds",
    pillLabel: "Yellow Sesame",
    title: "Yellow Sesame Seeds",
    categoryBadge: "Edible Seeds",
    grade: "≥ 99.5% Double-Screened · Nutty Profile",
    packaging: "25kg / 50kg Food-Grade Lined PP Bags",
    image: "./natural-sesame-seed.jpg",
    defaultUnit: "MT",
    allowedUnits: ["MT", "Quintal"],
    benchmarkRatePerQuintalINR: 15900,
    litreRateINR: 159,
    packagingCostPerMT_INR: 1650,
    specsSummary: "Golden Hulled Confectionery & Tahini Blending Grade",
  },
];

interface DeliveryZone {
  id: string;
  label: string;
  freightPerMT_INR: number;
  transitDays: string;
}

const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: "north-west",
    label: "North & West Hub (Delhi NCR, Gujarat, Punjab, Haryana)",
    freightPerMT_INR: 1850,
    transitDays: "2–3 Days",
  },
  {
    id: "central-east",
    label: "Central & East Hub (MP, UP, Bihar, West Bengal, Assam)",
    freightPerMT_INR: 2950,
    transitDays: "3–5 Days",
  },
  {
    id: "south-peninsular",
    label: "South & Coastal Hub (Maharashtra, Karnataka, TN, Telangana)",
    freightPerMT_INR: 3800,
    transitDays: "4–6 Days",
  },
  {
    id: "port-fob",
    label: "Export Port Delivery (Mundra / Kandla / Nhava Sheva CFS)",
    freightPerMT_INR: 2200,
    transitDays: "2–4 Days",
  },
  {
    id: "ex-mill",
    label: "Ex-Mill Gate Pickup (Buyer's Own Fleet / Tanker)",
    freightPerMT_INR: 0,
    transitDays: "Same Day",
  },
];

const CURRENCY_CONFIG: Record<
  CurrencyCode,
  { symbol: string; rateFromINR: number; locale: string }
> = {
  INR: { symbol: "₹", rateFromINR: 1, locale: "en-IN" },
  USD: { symbol: "$", rateFromINR: 0.0119, locale: "en-US" },
  LKR: { symbol: "LKR ", rateFromINR: 3.55, locale: "en-LK" },
};

interface BulkCostEstimatorProps {
  onSelectForProforma?: (productName: string, volumeText: string) => void;
}

export const BulkCostEstimator: React.FC<BulkCostEstimatorProps> = ({
  onSelectForProforma,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [unit, setUnit] = useState<UnitType>("MT");
  const [quantity, setQuantity] = useState<number>(10);
  const [selectedZoneId, setSelectedZoneId] = useState<string>("north-west");
  const [currency, setCurrency] = useState<CurrencyCode>("INR");

  const activeProduct = ESTIMATOR_PRODUCTS[activeIndex];
  const selectedZone =
    DELIVERY_ZONES.find((z) => z.id === selectedZoneId) || DELIVERY_ZONES[0];

  const handleSelectProduct = (index: number) => {
    const nextProd = ESTIMATOR_PRODUCTS[index];
    setActiveIndex(index);
    if (!nextProd.allowedUnits.includes(unit)) {
      setUnit("MT");
      setQuantity(10);
    }
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % ESTIMATOR_PRODUCTS.length;
    handleSelectProduct(nextIdx);
  };

  const handleUnitChange = (newUnit: UnitType) => {
    if (newUnit === unit) return;
    if (newUnit === "MT") {
      setQuantity(10);
    } else if (newUnit === "Quintal") {
      setQuantity(100);
    } else {
      setQuantity(5000);
    }
    setUnit(newUnit);
  };

  const sliderBounds = useMemo(() => {
    if (unit === "MT") return { min: 1, max: 100, step: 1 };
    if (unit === "Quintal") return { min: 10, max: 1000, step: 10 };
    return { min: 500, max: 50000, step: 500 };
  }, [unit]);

  const effectiveUnitRateINR = useMemo(() => {
    if (unit === "Quintal") return activeProduct.benchmarkRatePerQuintalINR;
    if (unit === "MT") return activeProduct.benchmarkRatePerQuintalINR * 10;
    return activeProduct.litreRateINR;
  }, [activeProduct, unit]);

  const equivalentMT = useMemo(() => {
    const safeQty = Math.max(0, quantity || 0);
    if (unit === "MT") return safeQty;
    if (unit === "Quintal") return safeQty / 10;
    return (safeQty * 0.91) / 1000;
  }, [quantity, unit]);

  const breakdownINR = useMemo(() => {
    const safeQty = Math.max(0, quantity || 0);
    const baseMaterial = safeQty * effectiveUnitRateINR;
    const freight = equivalentMT * selectedZone.freightPerMT_INR;
    const packaging = equivalentMT * activeProduct.packagingCostPerMT_INR;
    const subtotal = baseMaterial + freight + packaging;
    const gst = subtotal * 0.05;
    const grandTotal = subtotal + gst;

    return {
      baseMaterial,
      freight,
      packaging,
      gst,
      grandTotal,
    };
  }, [
    quantity,
    effectiveUnitRateINR,
    equivalentMT,
    selectedZone,
    activeProduct,
  ]);

  const formatMoney = (amountINR: number) => {
    const cfg = CURRENCY_CONFIG[currency];
    const converted = amountINR * cfg.rateFromINR;
    return (
      cfg.symbol +
      Math.round(converted).toLocaleString(cfg.locale, {
        maximumFractionDigits: 0,
      })
    );
  };

  const unitLabelSingular =
    unit === "MT" ? "Metric Tonne" : unit === "Quintal" ? "Quintal" : "Litre";
  const unitLabelPlural =
    unit === "MT" ? "Metric Tonnes" : unit === "Quintal" ? "Quintals" : "Litres";

  const handleWhatsAppEstimate = () => {
    const safeQty = Math.max(1, quantity || 1);
    const messageLines = [
      "*Bulk Procurement Cost Estimate - Prime Fresh Oil Mills*",
      "",
      `*Product:* ${activeProduct.title} (${activeProduct.grade})`,
      `*Order Quantity:* ${safeQty.toLocaleString("en-IN")} ${unitLabelPlural}`,
      `*Delivery Zone:* ${selectedZone.label}`,
      `*Applied Rate:* ₹${effectiveUnitRateINR.toLocaleString("en-IN")} per ${unitLabelSingular}`,
      "",
      "*Estimated Breakdown:*",
      `• Base Material: ${formatMoney(breakdownINR.baseMaterial)}`,
      `• Est. Logistics & Freight: ${formatMoney(breakdownINR.freight)}`,
      `• Packaging & Handling: ${formatMoney(breakdownINR.packaging)}`,
      `• Applicable GST (5%): ${formatMoney(breakdownINR.gst)}`,
      `*Estimated Total:* ${formatMoney(breakdownINR.grandTotal)}`,
      "",
      "Please confirm today's live spot rate and dispatch schedule for this volume.",
    ].join("\n");

    const whatsappUrl = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(
      messageLines
    )}`;
    const anchor = document.createElement("a");
    anchor.href = whatsappUrl;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleFormalProforma = () => {
    const volumeStr = `${quantity} ${unitLabelPlural}`;
    if (onSelectForProforma) {
      onSelectForProforma(activeProduct.catalogName, volumeStr);
    } else {
      const el = document.getElementById("commercial-inquiry-window");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      id="cost-estimator"
      className="w-full max-w-5xl mx-auto rounded-2xl bg-[#FBF8F2]/95 backdrop-blur-md border border-[rgba(220,215,200,0.7)] shadow-[0_10px_28px_rgba(27,67,50,0.06)] p-3.5 sm:p-5 my-7 sm:my-9 transition-all"
    >
      {/* Clean Minimal Top Header */}
      <div className="flex items-center justify-between gap-3 pb-3 mb-3.5 border-b border-[rgba(220,215,200,0.55)]">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1B4332]/10 border border-[#1B4332]/20 text-[10px] font-bold uppercase tracking-[0.15em] text-[#1B4332]">
            <Calculator className="w-3 h-3 text-[#1B4332]" />
            Cost Estimator
          </span>
          <h3 className="text-base sm:text-lg font-bold text-[#2A1D17] tracking-tight leading-snug">
            Bulk Order &amp; Procurement Cost Estimator
          </h3>
        </div>
      </div>

      {/* Main 2-Column Layout (Desktop) / Stacked (Mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
        {/* LEFT COLUMN: Crisp Product Display Card (with Right-Edge Next Button) + Minimalist Controls */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
          {/* 1. Dynamic Product Display Card with Right-Side Next Product Switcher Button */}
          <div className="rounded-xl bg-white/90 backdrop-blur-md border border-[rgba(220,215,200,0.65)] p-3 sm:p-3.5 flex items-center gap-3 sm:gap-3.5 shadow-2xs transition-all">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#FAF6EF] border border-[rgba(220,215,200,0.55)] p-1.5 flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src={activeProduct.image}
                alt={activeProduct.title}
                className="w-full h-full object-cover rounded-lg transition-transform duration-500"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-[#1B4332] text-[#FBF8F2] text-[9px] font-bold uppercase tracking-wider">
                  {activeProduct.categoryBadge}
                </span>
                <span className="text-[10px] font-semibold text-[#B45309] bg-[#D97706]/10 px-2 py-0.5 rounded-full border border-[#D97706]/25 truncate">
                  {activeProduct.grade}
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-[#2A1D17] truncate">
                {activeProduct.title}
              </h4>
              <p className="text-[11px] text-[#2A1D17]/65 truncate mt-0.5">
                {activeProduct.specsSummary}
              </p>
              <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-[#1B4332] truncate max-w-full">
                <Package className="w-3 h-3 shrink-0" />
                <span className="truncate">
                  Packaging: {activeProduct.packaging}
                </span>
              </div>
            </div>

            {/* Right-Side Vertical Next-Product Button (Cycles through all 9 catalog products) */}
            <button
              type="button"
              onClick={handleNext}
              title={`Next Product (${
                ESTIMATOR_PRODUCTS[(activeIndex + 1) % ESTIMATOR_PRODUCTS.length]
                  .pillLabel
              })`}
              aria-label="Switch to next product"
              className="h-16 sm:h-20 w-9 sm:w-11 rounded-xl bg-[#FAF6EF] hover:bg-[#1B4332] text-[#1B4332] hover:text-[#FBF8F2] border border-[#D97706]/35 hover:border-[#1B4332] flex flex-col items-center justify-center shrink-0 transition-all cursor-pointer shadow-2xs active:scale-95 group"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.4] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* 2. Minimalist Input Controls */}
          <div className="rounded-xl bg-white/85 backdrop-blur-md border border-[rgba(220,215,200,0.6)] p-3.5 sm:p-4 space-y-3">
            {/* Control A: Quantity Input + Unit Toggle + Interactive Slider */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <label
                  htmlFor="estimator-qty-input"
                  className="text-[11px] font-bold uppercase tracking-wider text-[#2A1D17]/80"
                >
                  Order Quantity ({unitLabelPlural})
                </label>

                {/* Quick Unit Toggle */}
                <div className="inline-flex items-center bg-[#FAF6EF] p-0.5 rounded-lg border border-[rgba(220,215,200,0.65)]">
                  {activeProduct.allowedUnits.map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => handleUnitChange(u)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                        unit === u
                          ? "bg-[#1B4332] text-white shadow-2xs"
                          : "text-[#2A1D17]/70 hover:text-[#2A1D17]"
                      }`}
                    >
                      {u === "MT"
                        ? "Metric Tonnes"
                        : u === "Quintal"
                        ? "Quintals"
                        : "Litres"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <input
                  id="estimator-qty-input"
                  type="text"
                  inputMode="numeric"
                  value={quantity === 0 ? "" : quantity}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/[^0-9]/g, "");
                    const val = parseInt(cleaned, 10);
                    setQuantity(isNaN(val) ? 0 : Math.min(100000, val));
                  }}
                  className="no-spinner w-full h-9 pl-3 pr-16 rounded-lg bg-[#FAF6EF] border border-[rgba(220,215,200,0.85)] text-[#2A1D17] font-bold text-sm focus:bg-white focus:border-[#1B4332] outline-none transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-[#2A1D17]/50 pointer-events-none">
                  {unit}
                </span>
              </div>

              {/* Interactive Range Slider */}
              <div className="mt-2">
                <input
                  type="range"
                  aria-label="Order quantity slider"
                  min={sliderBounds.min}
                  max={sliderBounds.max}
                  step={sliderBounds.step}
                  value={Math.min(
                    Math.max(quantity, sliderBounds.min),
                    sliderBounds.max
                  )}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#E6DEC8] rounded-lg appearance-none cursor-pointer accent-[#1B4332]"
                />
                <div className="flex justify-between text-[10px] text-[#2A1D17]/50 font-medium mt-0.5">
                  <span>
                    Min: {sliderBounds.min.toLocaleString("en-IN")} {unit}
                  </span>
                  <span>
                    Mid: {(sliderBounds.max / 2).toLocaleString("en-IN")} {unit}
                  </span>
                  <span>
                    {sliderBounds.max.toLocaleString("en-IN")}+ {unit}
                  </span>
                </div>
              </div>
            </div>

            {/* Control B: Destination / Delivery Zone */}
            <div className="pt-2.5 border-t border-[rgba(220,215,200,0.45)]">
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="estimator-zone-select"
                  className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#2A1D17]/80"
                >
                  <Truck className="w-3 h-3 text-[#1B4332]" />
                  <span>Delivery Zone</span>
                </label>
                <span className="text-[10px] font-semibold text-[#1B4332]">
                  Transit: {selectedZone.transitDays} · ₹
                  {selectedZone.freightPerMT_INR.toLocaleString("en-IN")}/MT
                </span>
              </div>
              <select
                id="estimator-zone-select"
                value={selectedZoneId}
                onChange={(e) => setSelectedZoneId(e.target.value)}
                className="w-full h-9 px-2.5 rounded-lg bg-[#FAF6EF] border border-[rgba(220,215,200,0.85)] text-[#2A1D17] text-[11px] font-semibold focus:bg-white focus:border-[#1B4332] outline-none transition-all cursor-pointer"
              >
                {DELIVERY_ZONES.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Crisp Live Calculation Breakdown Card */}
        <div className="lg:col-span-5 flex">
          <div className="w-full rounded-xl bg-white/80 backdrop-blur-xl border border-[rgba(220,215,200,0.7)] shadow-[0_8px_24px_rgba(42,29,23,0.05)] p-3.5 sm:p-4 flex flex-col justify-between">
            <div>
              {/* Top Bar: Title + Currency Switcher */}
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[rgba(220,215,200,0.55)]">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#1B4332] block">
                    Live Cost Projection
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-[#2A1D17]">
                    Estimate Summary
                  </h4>
                </div>

                {/* Currency Switcher (INR / USD / LKR) */}
                <div className="inline-flex items-center bg-[#FAF6EF] p-0.5 rounded-lg border border-[rgba(220,215,200,0.65)]">
                  {(["INR", "USD", "LKR"] as CurrencyCode[]).map((curr) => (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => setCurrency(curr)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                        currency === curr
                          ? "bg-[#1B4332] text-white shadow-2xs"
                          : "text-[#2A1D17]/65 hover:text-[#2A1D17]"
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Line Items */}
              <div className="py-2.5 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[#2A1D17]/85 font-medium block">
                      Base Material Cost
                    </span>
                    <span className="text-[10px] text-[#2A1D17]/55">
                      {quantity.toLocaleString("en-IN")} {unit} × ₹
                      {effectiveUnitRateINR.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <span className="font-bold text-[#2A1D17]">
                    {formatMoney(breakdownINR.baseMaterial)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[#2A1D17]/85 font-medium block">
                      Estimated Logistics &amp; Freight
                    </span>
                    <span className="text-[10px] text-[#2A1D17]/55">
                      ~{equivalentMT.toFixed(1)} MT ·{" "}
                      {selectedZone.transitDays}
                    </span>
                  </div>
                  <span className="font-semibold text-[#2A1D17]">
                    {breakdownINR.freight === 0
                      ? "Ex-Mill (0)"
                      : formatMoney(breakdownINR.freight)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[#2A1D17]/85 font-medium block">
                      Standard Packaging &amp; Handling
                    </span>
                    <span className="text-[10px] text-[#2A1D17]/55">
                      Mill loading &amp; weighbridge tare
                    </span>
                  </div>
                  <span className="font-semibold text-[#2A1D17]">
                    {formatMoney(breakdownINR.packaging)}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1.5 border-t border-dashed border-[rgba(220,215,200,0.7)]">
                  <span className="text-[#2A1D17]/75 font-medium">
                    Applicable GST (5%)
                  </span>
                  <span className="font-semibold text-[#2A1D17]">
                    {formatMoney(breakdownINR.gst)}
                  </span>
                </div>
              </div>

              {/* Highlighted Total Box */}
              <div className="rounded-xl bg-[#FAF6EF] border border-[#D97706]/30 p-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2A1D17]/65 block">
                    Estimated Landed Total
                  </span>
                  <span className="text-[10px] text-[#1B4332] font-semibold inline-flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                    Incl. 5% GST &amp; Loading
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-[#D97706] to-[#B45309] bg-clip-text text-transparent tracking-tight">
                    {formatMoney(breakdownINR.grandTotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="pt-3 mt-3 border-t border-[rgba(220,215,200,0.5)] space-y-1.5">
              <button
                type="button"
                onClick={handleWhatsAppEstimate}
                className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#D97706] to-[#B45309] hover:from-[#B45309] hover:to-[#92400E] text-white font-bold text-xs sm:text-[13px] shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99]"
              >
                <span>Inquire This Estimate via WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              </button>

              <button
                type="button"
                onClick={handleFormalProforma}
                className="w-full py-1 text-[11px] font-bold text-[#1B4332] hover:text-[#2A1D17] transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Request Formal Proforma in Commercial Inquiry Below</span>
                <span>↓</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkCostEstimator;
