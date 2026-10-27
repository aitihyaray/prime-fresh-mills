import React, { useState, useEffect, useRef } from "react";
import { ChatMessage, KnowledgeItem } from "../types/portal";
import { PRODUCT_KNOWLEDGE, QUICK_QUERIES } from "../data/portalData";

interface QualityAssistantChatbotProps {
  onAddProductToRfq: (productName: string) => void;
  selectedProducts: Set<string>;
}

export const QualityAssistantChatbot: React.FC<QualityAssistantChatbotProps> = ({
  onAddProductToRfq,
  selectedProducts,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Hello! Inquire about purity levels, moisture content, oil yield, or export grading across any of our seed, cake, or oil batches.",
      timestamp: new Date(),
    },
  ]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Pixel Art Animation loop
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animId: number;
    const sparkles = [
      { x: 18, y: 35, speed: 0.35, size: 2, phase: 0 },
      { x: 36, y: 28, speed: 0.45, size: 2, phase: 2 },
      { x: 55, y: 38, speed: 0.3, size: 2, phase: 4 },
      { x: 26, y: 15, speed: 0.4, size: 1.5, phase: 1 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bob = Math.sin(frame * 0.05) * 1.8;

      // Circular stone podium
      ctx.fillStyle = "#D8CFB5";
      ctx.beginPath();
      ctx.ellipse(40, 47, 28, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#C4B798";
      ctx.fillRect(12, 47, 56, 4);
      ctx.beginPath();
      ctx.ellipse(40, 51, 28, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Pouch Package (Right)
      const pouchX = 42;
      const pouchY = 17 + bob * 0.7;
      ctx.fillStyle = "#E5D7B5";
      ctx.fillRect(pouchX, pouchY + 6, 19, 23);
      ctx.fillStyle = "#8B4513";
      ctx.fillRect(pouchX + 3, pouchY + 11, 13, 10);
      ctx.fillStyle = "#FFFDF5";
      ctx.fillRect(pouchX + 5, pouchY + 13, 9, 4);
      ctx.fillStyle = "#BFB18B";
      ctx.fillRect(pouchX + 2, pouchY + 2, 15, 5);

      // Glass Mustard Oil Bottle (Left/Center)
      const botX = 19;
      const botY = 11 + bob;

      // Red Cap
      ctx.fillStyle = "#B91C1C";
      ctx.fillRect(botX + 5, botY, 6, 5);
      ctx.fillStyle = "#DC2626";
      ctx.fillRect(botX + 6, botY + 1, 4, 3);

      // Neck
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.fillRect(botX + 6, botY + 5, 4, 6);
      ctx.fillStyle = "#EAB308";
      ctx.fillRect(botX + 6.5, botY + 7, 3, 4);

      // Glass Body
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.fillRect(botX + 1, botY + 11, 14, 28);

      // Golden Mustard Oil
      ctx.fillStyle = "#EAB308";
      ctx.fillRect(botX + 2, botY + 13, 12, 25);
      ctx.fillStyle = "#CA8A04";
      ctx.fillRect(botX + 2, botY + 24, 12, 14);

      // Glass highlight
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fillRect(botX + 3, botY + 14, 2, 22);

      // Brand stamp
      ctx.fillStyle = "#FFFDF5";
      ctx.fillRect(botX + 4, botY + 22, 8, 8);
      ctx.fillStyle = "#8B4513";
      ctx.fillRect(botX + 6, botY + 24, 4, 4);

      // Sparkle / Shimmer particles
      sparkles.forEach((s) => {
        const sy = (s.y - frame * s.speed) % 44;
        const curY = (sy < 0 ? sy + 44 : sy) + 4;
        const alpha = Math.abs(Math.sin(frame * 0.08 + s.phase));
        ctx.fillStyle = `rgba(217, 119, 6, ${alpha})`;
        ctx.fillRect(s.x, curY, s.size, s.size);
        ctx.fillRect(s.x - 1, curY + 1, s.size + 2, s.size - 1);
      });

      frame++;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleQuery = (queryText: string) => {
    const userMsg: ChatMessage = {
      id: "u-" + Date.now(),
      sender: "user",
      text: queryText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const q = queryText.toLowerCase();

      let botResponse: ChatMessage;

      if (
        q.includes("oil") &&
        (q.includes("mustard") ||
          q.includes("ffa") ||
          q.includes("purity") ||
          q.includes("kachi"))
      ) {
        botResponse = {
          id: "b-" + Date.now(),
          sender: "bot",
          knowledgeItem: PRODUCT_KNOWLEDGE.mustardOil,
          timestamp: new Date(),
        };
      } else if (
        q.includes("yellow mustard") ||
        (q.includes("seed") && q.includes("yellow"))
      ) {
        botResponse = {
          id: "b-" + Date.now(),
          sender: "bot",
          knowledgeItem: PRODUCT_KNOWLEDGE.yellowMustardSeeds,
          timestamp: new Date(),
        };
      } else if (
        q.includes("black mustard") ||
        q.includes("rai") ||
        q.includes("sarson")
      ) {
        botResponse = {
          id: "b-" + Date.now(),
          sender: "bot",
          knowledgeItem: PRODUCT_KNOWLEDGE.blackMustardSeeds,
          timestamp: new Date(),
        };
      } else if (
        q.includes("doc") ||
        q.includes("cake") ||
        q.includes("protein") ||
        q.includes("de-oiled")
      ) {
        botResponse = {
          id: "b-" + Date.now(),
          sender: "bot",
          knowledgeItem: PRODUCT_KNOWLEDGE.doc,
          timestamp: new Date(),
        };
      } else if (q.includes("sesame") || q.includes("til")) {
        botResponse = {
          id: "b-" + Date.now(),
          sender: "bot",
          knowledgeItem: PRODUCT_KNOWLEDGE.sesame,
          timestamp: new Date(),
        };
      } else if (q.includes("groundnut") || q.includes("peanut")) {
        botResponse = {
          id: "b-" + Date.now(),
          sender: "bot",
          knowledgeItem: PRODUCT_KNOWLEDGE.groundnut,
          timestamp: new Date(),
        };
      } else if (
        q.includes("moisture") ||
        q.includes("admixture") ||
        q.includes("limit") ||
        q.includes("storage") ||
        q.includes("grade")
      ) {
        botResponse = {
          id: "b-" + Date.now(),
          sender: "bot",
          knowledgeItem: PRODUCT_KNOWLEDGE.moistureAdmixture,
          timestamp: new Date(),
        };
      } else {
        botResponse = {
          id: "b-" + Date.now(),
          sender: "bot",
          htmlContent: `
            We maintain strict AGMARK & export quality parameters across all lines:<br/><br/>
            • <strong>Edible Oils:</strong> 100% Kachi Ghani, FFA &lt; 0.85%<br/>
            • <strong>Seeds:</strong> 99.0% - 99.9% Sortex Cleaned, Moisture &lt; 7%<br/>
            • <strong>De-Oiled Cakes:</strong> High crude protein (36% - 40%), low fat<br/><br/>
            Click any quick query chip below or submit your custom requirement in the RFQ desk!
          `,
          timestamp: new Date(),
        };
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    handleQuery(inputText.trim());
    setInputText("");
  };

  return (
    <div id="aiChatbotContainer" className="fixed bottom-7 right-7 z-[999] font-sans">
      {/* Launcher Button */}
      <button
        id="chatbotLauncherBtn"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="chat-launcher-glass relative w-14 h-14 rounded-full text-white flex items-center justify-center cursor-pointer transition-all duration-300 active:scale-95"
        aria-label="Open Prime Quality Assistant"
        title="Quality & Specs Assistant"
      >
        {!isOpen ? (
          <svg
            id="chatbotLauncherIconOpen"
            className="w-6 h-6 fill-current transition-transform duration-200"
            viewBox="0 0 24 24"
          >
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
            <circle cx="8" cy="9" r="1.2" />
            <circle cx="12" cy="9" r="1.2" />
            <circle cx="16" cy="9" r="1.2" />
          </svg>
        ) : (
          <svg
            id="chatbotLauncherIconClose"
            className="w-6 h-6 fill-current transition-transform duration-200"
            viewBox="0 0 24 24"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        )}

        {/* Notification Pulse Dot */}
        <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border-2 border-white" />
        </span>
      </button>

      {/* Chatbot Window Panel */}
      <div
        id="chatbotPanel"
        className={`fixed bottom-[92px] right-4 sm:right-7 w-[380px] max-w-[calc(100vw-32px)] h-[530px] max-h-[calc(100vh-120px)] bg-[#FDFBF7] rounded-2xl border border-[#E8DFD0] shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-out transform origin-bottom-right ${
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto translate-y-0"
            : "scale-95 opacity-0 pointer-events-none translate-y-4"
        }`}
      >
        {/* Header with Pixel Art Animation & Product Duo */}
        <div className="px-3.5 py-2.5 bg-gradient-to-r from-[#FAF5E9] via-[#FAF0DA] to-[#F5E8C8] border-b border-[#E8DFD0] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            {/* Pixel Art Canvas Container */}
            <div className="relative w-[72px] h-[50px] bg-white/80 rounded-xl border border-[#EADFB4] flex items-center justify-center overflow-hidden shadow-inner shrink-0">
              <canvas
                id="chatbotPixelCanvas"
                ref={canvasRef}
                width={80}
                height={56}
                className="w-full h-full block"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
            <div>
              <h4 className="font-bold text-[#1C1917] text-sm leading-tight tracking-tight">
                Prime Quality Assistant
              </h4>
              <p className="text-[11px] text-[#44403C] leading-tight mt-0.5">
                Grade, Purity &amp; Technical Specs Desk
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-green-800 font-semibold uppercase tracking-wider">
                  Quality Desk Online
                </span>
              </div>
            </div>
          </div>
          {/* Minimize Button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#1C1917] hover:bg-black/5 hover:text-black transition-colors cursor-pointer"
            aria-label="Close Chatbot"
          >
            ✕
          </button>
        </div>

        {/* Messages Container */}
        <div
          id="chatbotMessages"
          className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs sm:text-sm"
        >
          {messages.map((msg) => {
            if (msg.sender === "user") {
              return (
                <div key={msg.id} className="flex justify-end">
                  <div className="bg-[#8B4513] text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-sm leading-relaxed">
                    {msg.text}
                  </div>
                </div>
              );
            }

            // Bot message
            return (
              <div key={msg.id} className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-[#8B4513] text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm select-none">
                  🌾
                </div>
                <div className="bg-[#F4EDE0] text-[#1C1917] p-3 rounded-2xl rounded-tl-none border border-[#E8DFD0] max-w-[88%] shadow-sm leading-relaxed">
                  {msg.text && <div>{msg.text}</div>}
                  {msg.htmlContent && (
                    <div
                      dangerouslySetInnerHTML={{ __html: msg.htmlContent }}
                    />
                  )}
                  {msg.knowledgeItem && (
                    <div>
                      <div className="font-bold text-[#8B4513] mb-2 flex items-center gap-1.5 border-b border-[#E8DFD0] pb-1.5 text-xs sm:text-sm">
                        <span>📋</span>
                        <span>{msg.knowledgeItem.title}</span>
                      </div>
                      <div className="space-y-1.5 text-[11px] sm:text-xs">
                        {msg.knowledgeItem.specs.map((s, idx) => (
                          <div
                            key={idx}
                            className="bg-white/80 p-1.5 rounded border border-[#E8DFD0]/60"
                          >
                            <span className="font-semibold text-[#1C1917] block">
                              {s.label}:
                            </span>
                            <span className="text-[#44403C]">{s.value}</span>
                          </div>
                        ))}
                      </div>

                      {msg.knowledgeItem.productName && (
                        <div className="mt-2.5 pt-2 border-t border-[#E8DFD0]/80">
                          <button
                            type="button"
                            onClick={() => {
                              onAddProductToRfq(msg.knowledgeItem!.productName);
                              // Smooth scroll to RFQ if needed
                              const quoteEl = document.getElementById("quote-section");
                              if (quoteEl) {
                                quoteEl.scrollIntoView({ behavior: "smooth" });
                              }
                            }}
                            className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#8B4513] hover:bg-[#72380F] text-white text-[11px] font-semibold transition-all shadow-xs cursor-pointer"
                          >
                            <span>+</span>
                            <span>
                              {selectedProducts.has(msg.knowledgeItem.productName)
                                ? `Added "${msg.knowledgeItem.productName}" (In RFQ List)`
                                : `Add "${msg.knowledgeItem.productName}" to RFQ`}
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div id="botTypingIndicator" className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-full bg-[#8B4513] text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm select-none">
                🌾
              </div>
              <div className="bg-[#F4EDE0] p-3 rounded-2xl rounded-tl-none border border-[#E8DFD0] shadow-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B4513] animate-dot-1" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B4513] animate-dot-2" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B4513] animate-dot-3" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Reply Chips Row */}
        <div className="px-3 py-2 bg-[#FAF7E8] border-t border-[#E8DFD0]/80 shrink-0">
          <div className="text-[10px] uppercase font-bold text-[#8A5A00] tracking-wider mb-1.5 px-0.5">
            Quick Specification Queries:
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {QUICK_QUERIES.map((query) => (
              <button
                key={query}
                type="button"
                onClick={() => handleQuery(query)}
                className="quick-chip whitespace-nowrap px-2.5 py-1 rounded-full bg-white hover:bg-[#8B4513] text-[#8B4513] hover:text-white border border-[#8B4513]/30 transition-all font-medium text-[11px] shadow-xs cursor-pointer"
              >
                {query}
              </button>
            ))}
          </div>
        </div>

        {/* Input Box Bar */}
        <div className="p-2.5 bg-white border-t border-[#E8DFD0] shrink-0">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              id="chatbotInput"
              type="text"
              placeholder="Ask about grade, oil content, moisture..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 h-9 px-3.5 rounded-full bg-[#FAF4DD] border border-[#E8DFD0] text-xs text-[#1C1917] focus:outline-none focus:ring-1.5 focus:ring-[#8B4513] transition-all placeholder:text-stone-400"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-full bg-[#8B4513] hover:bg-[#72380F] text-white flex items-center justify-center shrink-0 shadow-sm transition-all active:scale-95 cursor-pointer"
              aria-label="Send Message"
            >
              <svg
                className="w-4 h-4 fill-current transform rotate-45 -translate-y-0.5 -translate-x-0.5"
                viewBox="0 0 24 24"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
