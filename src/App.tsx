import React, { useState } from "react";
import { Header } from "./components/Header";
import { HeroAnimation, AmbientBotanicalLayer } from "./components/HeroAnimation";
import { ProductCatalog } from "./components/ProductCatalog";
import { QuoteSection } from "./components/QuoteSection";
import { FloatingRfqPill } from "./components/FloatingRfqPill";
import { Footer } from "./components/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";

export const App: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    () => new Set()
  );

  const toggleProduct = (name: string) => {
    if (!name) return;
    setSelectedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  const addProduct = (name: string) => {
    if (!name) return;
    setSelectedProducts((prev) => {
      const next = new Set(prev);
      next.add(name);
      return next;
    });
  };

  const removeProduct = (name: string) => {
    if (!name) return;
    setSelectedProducts((prev) => {
      const next = new Set(prev);
      next.delete(name);
      return next;
    });
  };

  const clearProducts = () => {
    setSelectedProducts(new Set());
  };

  const pulseChipsBox = () => {
    try {
      const chipsBox = document.getElementById("productChipsBox");
      if (chipsBox) {
        chipsBox.classList.add("pulse-glow");
        setTimeout(() => chipsBox.classList.remove("pulse-glow"), 900);
      }
    } catch (e) {
      console.warn("Could not pulse chips box", e);
    }
  };

  const scrollToRfq = () => {
    try {
      const quoteSection = document.getElementById("quote-section");
      if (quoteSection) {
        quoteSection.scrollIntoView({ behavior: "smooth" });
        pulseChipsBox();
      }
    } catch (e) {
      console.warn("Could not scroll to RFQ", e);
    }
  };

  const handleInquire = (productName: string) => {
    addProduct(productName);
    scrollToRfq();
  };

  const handleNavigate = (targetId: string) => {
    try {
      if (targetId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const resolvedId = targetId === "about" ? "infrastructure" : targetId;
        const el =
          document.getElementById(resolvedId) ||
          document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          if (resolvedId === "quote-section") {
            pulseChipsBox();
          }
        }
      }
    } catch (e) {
      console.warn("Could not navigate to " + targetId, e);
    }
  };

  return (
    <ErrorBoundary>
      <div className="bg-[#FBF7ED] font-sans text-[#0B0902] antialiased selection:bg-[#E4B329]/30 selection:text-[#064E3B] min-h-screen">
        <Header onNavigate={handleNavigate} />

        <main className="w-full bg-[#FBF7ED] min-h-screen">
          <div className="flex flex-col w-full">
            {/* SECTION 1: DEEP EMERALD & MUSTARD GOLD HERO SHOWCASE */}
            <ErrorBoundary>
              <HeroAnimation />
            </ErrorBoundary>

            {/* CATALOG & LOWER SECTIONS FLOW WITH HERITAGE JAALI LATTICE */}
            <div
              id="content-flow-container"
              className="jaali-pattern relative w-full z-20 bg-[#FBF7ED] overflow-hidden"
            >
              {/* Drifting Mustard Flowers & Leaves — Ends at the Catalog Intro / Edible Oils Heading */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 inset-x-0 h-[350px] sm:h-[385px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_72%,transparent_100%)]"
              >
                <AmbientBotanicalLayer mode="catalog" />
              </div>

              <div className="relative z-10">
                {/* SECTION 2: PRODUCT CATALOG & SPECIFICATION MATRIX */}
                <ErrorBoundary>
                  <ProductCatalog
                    selectedProducts={selectedProducts}
                    onToggleProduct={toggleProduct}
                    onInquire={handleInquire}
                  />
                </ErrorBoundary>

                {/* SECTION 3: B2B QUOTATION FORM & PROCUREMENT DESK */}
                <ErrorBoundary>
                  <QuoteSection
                    selectedProducts={selectedProducts}
                    onAddProduct={addProduct}
                    onRemoveProduct={removeProduct}
                    onClearProducts={clearProducts}
                  />
                </ErrorBoundary>

                {/* FOOTER WITH ARCHITECTURAL SKYLINE TRANSITION */}
                <ErrorBoundary>
                  <Footer onNavigate={handleNavigate} />
                </ErrorBoundary>
              </div>
            </div>
          </div>

          {/* FLOATING RFQ INQUIRY PILL */}
          <FloatingRfqPill
            selectedCount={selectedProducts.size}
            onScrollToRfq={scrollToRfq}
          />
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default App;
