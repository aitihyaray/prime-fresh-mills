import React from "react";
import { Product } from "../types/portal";
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
      className="w-full bg-[#FAF4DD] border-y border-[#EADFB4]/70 py-10 sm:py-14 scroll-mt-24"
      id="catalog"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[11px] font-bold text-[#8A5A00] uppercase tracking-wider block">
              Mill Direct Line
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#1C1917] tracking-tight font-bold mt-1">
              Product Catalog &amp; Wholesale Inventory
            </h2>
            <p className="text-base sm:text-lg text-[#44403C] mt-1 max-w-3xl leading-relaxed">
              Direct mill supply of high-grade edible oils, premium oilseeds, and
              nutrient-rich de-oiled cakes for commercial buyers, processors, and bulk distributors.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs sm:text-sm text-[#44403C]">Standard MOQ:</span>
            <span className="px-3 py-1 bg-[#EDE1BF] border border-[#EADFB4] text-[#1C1917] font-semibold rounded-md text-xs sm:text-sm shadow-xs">
              Custom Freight &amp; Bulk Lots
            </span>
          </div>
        </div>

        {/* SECTION A: EDIBLE OILS */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl leading-none">🌾</span>
            <h3 className="text-2xl sm:text-3xl text-[#1C1917] font-bold tracking-tight">
              Edible Oils
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {edibleOils.map((product) => {
              const isSelected = selectedProducts.has(product.productName);
              return (
                <div
                  key={product.id}
                  className="rounded-2xl bg-white border border-[#EADFB4]/70 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group h-full"
                >
                  <div className="flex flex-col flex-1">
                    <div className="relative h-56 w-full overflow-hidden bg-[#FAF4DD]/30 flex items-center justify-center p-3">
                      <img
                        alt={product.alt}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                        src={product.image}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-[#FFFCF0]/90 backdrop-blur-sm border border-[#EADFB4]/60 text-[#8A5A00] text-[11px] font-bold tracking-wider uppercase shadow-sm">
                          {product.badge}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xl text-[#1C1917] mb-1.5 font-bold">
                          {product.title}
                        </h4>
                        <p className="text-sm text-[#44403C] leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 pt-0 flex items-center gap-2">
                    <button
                      type="button"
                      className="flex-1 inline-flex items-center justify-center text-xs font-semibold text-white bg-[#8d4b00] hover:bg-[#b15f00] h-10 rounded-lg transition-all shadow-sm hover:shadow active:scale-[0.99] cursor-pointer"
                      onClick={() => onInquire(product.productName)}
                    >
                      <span>Inquire</span>
                      <span className="ml-1.5 text-[11px] leading-none">▶</span>
                    </button>
                    <button
                      type="button"
                      className={`rfq-toggle-btn w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-[1.5px] border-[#8B4513] transition-all duration-200 active:scale-90 shadow-sm cursor-pointer ${
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
                      <span className="btn-icon text-lg font-bold leading-none select-none transition-transform duration-200">
                        {isSelected ? "✓" : "+"}
                      </span>
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
            <h3 className="text-2xl sm:text-3xl text-[#1C1917] font-bold tracking-tight">
              Seeds &amp; De-Oiled Cakes
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seedsAndDocs.map((product) => {
              const isSelected = selectedProducts.has(product.productName);
              return (
                <div
                  key={product.id}
                  className="rounded-2xl bg-white border border-[#EADFB4]/70 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group h-full"
                >
                  <div className="flex flex-col flex-1">
                    <div className="relative h-48 w-full overflow-hidden bg-[#F3E8C8]">
                      <img
                        alt={product.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        src={product.image}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-[#FFFCF0]/90 backdrop-blur-sm border border-[#EADFB4]/60 text-[#8A5A00] text-[11px] font-bold tracking-wider uppercase shadow-sm">
                          {product.badge}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg text-[#1C1917] mb-1.5 font-bold">
                          {product.title}
                        </h3>
                        <p className="text-sm text-[#44403C] leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 pt-0 flex items-center gap-2">
                    <button
                      type="button"
                      className="flex-1 inline-flex items-center justify-center text-xs font-semibold text-white bg-[#8d4b00] hover:bg-[#b15f00] h-10 rounded-lg transition-all shadow-sm hover:shadow active:scale-[0.99] cursor-pointer"
                      onClick={() => onInquire(product.productName)}
                    >
                      <span>Inquire</span>
                      <span className="ml-1.5 text-[11px] leading-none">▶</span>
                    </button>
                    <button
                      type="button"
                      className={`rfq-toggle-btn w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-[1.5px] border-[#8B4513] transition-all duration-200 active:scale-90 shadow-sm cursor-pointer ${
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
                      <span className="btn-icon text-lg font-bold leading-none select-none transition-transform duration-200">
                        {isSelected ? "✓" : "+"}
                      </span>
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
