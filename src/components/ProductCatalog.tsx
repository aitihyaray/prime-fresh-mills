import React from "react";
import { CATALOG_PRODUCTS } from "../data/portalData";

interface ProductCatalogProps {
  selectedProducts: Set<string>;
  onToggleProduct: (productName: string) => void;
  onInquire: (productName: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  selectedProducts,
  onToggleProduct,
  onInquire,
}) => {
  const edibleOils = CATALOG_PRODUCTS.filter((p) => p.category === "edible-oil");
  const seedsAndDocs = CATALOG_PRODUCTS.filter((p) => p.category === "seed-doc");

  return (
    <section
      className="w-full bg-transparent border-b border-[#064E3B]/15 py-12 sm:py-16 scroll-mt-24"
      id="catalog"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Ornamental Connected 4-Petal Floral Frieze Divider */}
        <div className="arch-divider max-w-md mx-auto mb-8" aria-hidden="true">
          <svg
            width="132"
            height="36"
            viewBox="0 0 132 36"
            fill="none"
            className="shrink-0"
          >
            {/* Left 4-petal pointed flower (center 22, 18) */}
            <path
              d="M22 18 C17 11 17 5 22 0 C27 5 27 11 22 18 Z M22 18 C17 25 17 31 22 36 C27 31 27 25 22 18 Z M22 18 C14 13 6 13 0 18 C6 23 14 23 22 18 Z M22 18 C30 13 38 13 44 18 C38 23 30 23 22 18 Z"
              stroke="#E4B329"
              strokeWidth="1.6"
              strokeLinejoin="round"
              fill="rgba(228, 179, 41, 0.08)"
            />
            <circle cx="22" cy="18" r="2" fill="#064E3B" />

            {/* Center 4-petal pointed flower (center 66, 18 - connected tip-to-tip at x=44 and x=88) */}
            <path
              d="M66 18 C61 11 61 5 66 0 C71 5 71 11 66 18 Z M66 18 C61 25 61 31 66 36 C71 31 71 25 66 18 Z M66 18 C58 13 50 13 44 18 C50 23 58 23 66 18 Z M66 18 C74 13 82 13 88 18 C82 23 74 23 66 18 Z"
              stroke="#E4B329"
              strokeWidth="1.8"
              strokeLinejoin="round"
              fill="rgba(228, 179, 41, 0.14)"
            />
            <circle cx="66" cy="18" r="2.4" fill="#064E3B" />

            {/* Right 4-petal pointed flower (center 110, 18 - connected tip-to-tip at x=88) */}
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

        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[11px] font-bold text-[#8A6A00] uppercase tracking-[0.2em] block">
              Mill Direct Line
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#064E3B] tracking-tight font-bold mt-1">
              Product Catalog &amp; Wholesale Inventory
            </h2>
            <p className="text-base sm:text-lg text-[#0B0902]/80 mt-1 max-w-3xl leading-relaxed">
              Direct mill supply of high-grade edible oils, premium oilseeds, and
              nutrient-rich de-oiled cakes for commercial buyers, processors, and
              bulk distributors.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs sm:text-sm text-[#0B0902]/75 font-medium">
              Standard MOQ:
            </span>
            <span className="px-3.5 py-1.5 bg-[#064E3B] border border-[#E4B329]/50 text-[#FBF7ED] font-semibold rounded-full text-xs sm:text-sm shadow-xs">
              Custom Freight &amp; Bulk Lots
            </span>
          </div>
        </div>

        {/* SECTION A: EDIBLE OILS */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl leading-none">🌾</span>
            <h3 className="text-2xl sm:text-3xl text-[#064E3B] font-bold tracking-tight">
              Edible Oils
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {edibleOils.map((product) => {
              const isSelected = selectedProducts.has(product.productName);
              return (
                <div
                  key={product.id}
                  className="rounded-2xl bg-white/95 border-[1.5px] border-[#B8C7B3] border-t-[3px] border-t-[#E4B329] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group h-full"
                >
                  <div className="flex flex-col flex-1">
                    <div className="relative h-56 w-full overflow-hidden bg-[#FBF7ED] flex items-center justify-center p-3 border-b border-[#B8C7B3]/50">
                      <img
                        alt={product.alt}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                        src={product.image}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-[#FBF7ED]/95 backdrop-blur-xs border border-[#E4B329] text-[#064E3B] text-[11px] font-bold tracking-wider uppercase shadow-2xs">
                          {product.badge}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xl text-[#064E3B] mb-1.5 font-bold">
                          {product.title}
                        </h4>
                        <p className="text-sm text-[#0B0902]/80 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 pt-0 flex items-center gap-2">
                    <button
                      type="button"
                      className="flex-1 inline-flex items-center justify-center text-xs font-semibold text-[#FBF7ED] bg-[#064E3B] hover:bg-[#04382A] h-10 rounded-full transition-all shadow-xs hover:shadow active:scale-[0.99] cursor-pointer"
                      onClick={() => onInquire(product.productName)}
                    >
                      <span>Inquire</span>
                    </button>
                    <button
                      type="button"
                      className={`rfq-toggle-btn shrink-0 active:scale-95 cursor-pointer ${
                        isSelected ? "is-selected" : ""
                      }`}
                      onClick={() => onToggleProduct(product.productName)}
                      aria-label={
                        isSelected
                          ? `Remove ${product.productName} from Inquiry List`
                          : `Add ${product.productName} to Inquiry List`
                      }
                      title={
                        isSelected
                          ? "Remove from Inquiry List"
                          : "Add to Inquiry List"
                      }
                    >
                      {isSelected ? (
                        <svg
                          className="w-4 h-4 stroke-current"
                          fill="none"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 stroke-current"
                          fill="none"
                          strokeWidth="2.4"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 5v14M5 12h14"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION B: SEEDS & DE-OILED CAKES */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl leading-none">🌾</span>
            <h3 className="text-2xl sm:text-3xl text-[#064E3B] font-bold tracking-tight">
              Seeds &amp; De-Oiled Cakes
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seedsAndDocs.map((product) => {
              const isSelected = selectedProducts.has(product.productName);
              return (
                <div
                  key={product.id}
                  className="rounded-2xl bg-white/95 border-[1.5px] border-[#B8C7B3] border-t-[3px] border-t-[#E4B329] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group h-full"
                >
                  <div className="flex flex-col flex-1">
                    <div className="relative h-48 w-full overflow-hidden bg-[#FBF7ED] border-b border-[#B8C7B3]/50">
                      <img
                        alt={product.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        src={product.image}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-[#FBF7ED]/95 backdrop-blur-xs border border-[#E4B329] text-[#064E3B] text-[11px] font-bold tracking-wider uppercase shadow-2xs">
                          {product.badge}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg text-[#064E3B] mb-1.5 font-bold">
                          {product.title}
                        </h3>
                        <p className="text-sm text-[#0B0902]/80 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 pt-0 flex items-center gap-2">
                    <button
                      type="button"
                      className="flex-1 inline-flex items-center justify-center text-xs font-semibold text-[#FBF7ED] bg-[#064E3B] hover:bg-[#04382A] h-10 rounded-full transition-all shadow-xs hover:shadow active:scale-[0.99] cursor-pointer"
                      onClick={() => onInquire(product.productName)}
                    >
                      <span>Inquire</span>
                    </button>
                    <button
                      type="button"
                      className={`rfq-toggle-btn shrink-0 active:scale-95 cursor-pointer ${
                        isSelected ? "is-selected" : ""
                      }`}
                      onClick={() => onToggleProduct(product.productName)}
                      aria-label={
                        isSelected
                          ? `Remove ${product.productName} from Inquiry List`
                          : `Add ${product.productName} to Inquiry List`
                      }
                      title={
                        isSelected
                          ? "Remove from Inquiry List"
                          : "Add to Inquiry List"
                      }
                    >
                      {isSelected ? (
                        <svg
                          className="w-4 h-4 stroke-current"
                          fill="none"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 stroke-current"
                          fill="none"
                          strokeWidth="2.4"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 5v14M5 12h14"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
