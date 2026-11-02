import React, { useEffect, useRef } from "react";
import { Droplets, ShieldCheck, Truck, ArrowUpRight } from "lucide-react";

interface OilDroplet {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  wobblePhase: number;
  wobbleSpeed: number;
  alpha: number;
  hueShift: number;
}

// 14 drifting mustard blossoms & botanical leaves (inspired by the reference animation)
const PETAL_ITEMS = Array.from({ length: 14 }, (_, t) => ({
  left: (t * 73) % 100,
  size: 16 + ((t * 7) % 18),
  delay: -((t * 1.7) % 14),
  dur: 12 + ((t * 3) % 9),
  kind: t % 3 === 0 ? ("leaf" as const) : ("bloom" as const),
}));

interface AmbientBotanicalLayerProps {
  mode: "hero" | "catalog";
}

export const AmbientBotanicalLayer: React.FC<AmbientBotanicalLayerProps> = ({
  mode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resizeCanvas = () => {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const pointer = {
      x: width * 0.65,
      y: height * 0.45,
      targetX: width * 0.65,
      targetY: height * 0.45,
    };
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if ("touches" in e && e.touches.length > 0) {
        pointer.targetX = e.touches[0].clientX - rect.left;
        pointer.targetY = e.touches[0].clientY - rect.top;
      } else if ("clientX" in e) {
        pointer.targetX = e.clientX - rect.left;
        pointer.targetY = e.clientY - rect.top;
      }
    };
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    const isHero = mode === "hero";
    const dropletCount = isHero ? 22 : 16;
    const droplets: OilDroplet[] = Array.from(
      { length: dropletCount },
      (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 3.5 + (i % 5) * 3.2,
        speedY: 0.2 + Math.random() * 0.34,
        speedX: (Math.random() - 0.5) * 0.22,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.012 + Math.random() * 0.016,
        alpha: isHero
          ? 0.2 + Math.random() * 0.28
          : 0.14 + Math.random() * 0.2,
        hueShift: i % 3,
      })
    );

    const ribbons = isHero
      ? [
          {
            yRatio: 0.32,
            amp1: 42,
            amp2: 22,
            freq1: 0.0022,
            freq2: 0.0046,
            speed: 0.01,
            thickness: 140,
            colorTop: "rgba(228, 179, 41, 0.18)",
            colorBottom: "rgba(228, 179, 41, 0.0)",
            strokeColor: "rgba(228, 179, 41, 0.34)",
          },
          {
            yRatio: 0.54,
            amp1: 54,
            amp2: 28,
            freq1: 0.0018,
            freq2: 0.0038,
            speed: -0.0085,
            thickness: 165,
            colorTop: "rgba(239, 194, 74, 0.14)",
            colorBottom: "rgba(4, 56, 42, 0.0)",
            strokeColor: "rgba(228, 179, 41, 0.26)",
          },
          {
            yRatio: 0.74,
            amp1: 38,
            amp2: 20,
            freq1: 0.0025,
            freq2: 0.005,
            speed: 0.012,
            thickness: 125,
            colorTop: "rgba(184, 199, 179, 0.1)",
            colorBottom: "rgba(6, 78, 59, 0.0)",
            strokeColor: "rgba(228, 179, 41, 0.2)",
          },
        ]
      : [
          {
            yRatio: 0.22,
            amp1: 38,
            amp2: 20,
            freq1: 0.002,
            freq2: 0.0042,
            speed: 0.009,
            thickness: 150,
            colorTop: "rgba(228, 179, 41, 0.12)",
            colorBottom: "rgba(251, 247, 237, 0.0)",
            strokeColor: "rgba(228, 179, 41, 0.28)",
          },
          {
            yRatio: 0.52,
            amp1: 48,
            amp2: 24,
            freq1: 0.0017,
            freq2: 0.0036,
            speed: -0.008,
            thickness: 170,
            colorTop: "rgba(6, 78, 59, 0.05)",
            colorBottom: "rgba(251, 247, 237, 0.0)",
            strokeColor: "rgba(228, 179, 41, 0.22)",
          },
          {
            yRatio: 0.8,
            amp1: 36,
            amp2: 18,
            freq1: 0.0023,
            freq2: 0.0046,
            speed: 0.011,
            thickness: 140,
            colorTop: "rgba(228, 179, 41, 0.1)",
            colorBottom: "rgba(251, 247, 237, 0.0)",
            strokeColor: "rgba(6, 78, 59, 0.12)",
          },
        ];

    let time = 0;

    const render = () => {
      time += 1;
      pointer.x += (pointer.targetX - pointer.x) * 0.04;
      pointer.y += (pointer.targetY - pointer.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Subtle golden wave ribbons
      ribbons.forEach((ribbon, idx) => {
        const baseY = height * ribbon.yRatio;
        const phase = time * ribbon.speed + idx * 1.7;

        ctx.beginPath();
        const step = 20;
        for (let x = 0; x <= width + step; x += step) {
          const distToPointer = Math.abs(x - pointer.x);
          const pointerPull =
            Math.max(0, 1 - distToPointer / 360) *
            ((pointer.y - baseY) * 0.09);

          const y =
            baseY +
            Math.sin(x * ribbon.freq1 + phase) * ribbon.amp1 +
            Math.cos(x * ribbon.freq2 - phase * 1.3) * ribbon.amp2 +
            pointerPull;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = ribbon.strokeColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.lineTo(width, baseY + ribbon.thickness);
        ctx.lineTo(0, baseY + ribbon.thickness);
        ctx.closePath();

        const grad = ctx.createLinearGradient(
          0,
          baseY - ribbon.amp1,
          0,
          baseY + ribbon.thickness
        );
        grad.addColorStop(0, ribbon.colorTop);
        grad.addColorStop(1, ribbon.colorBottom);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Buoyant golden droplets
      droplets.forEach((d) => {
        d.wobblePhase += d.wobbleSpeed;
        d.y -= d.speedY;
        d.x += Math.sin(d.wobblePhase) * 0.32 + d.speedX;

        if (d.y < -d.radius * 2) {
          d.y = height + d.radius * 2;
          d.x = Math.random() * width;
        }
        if (d.x < -d.radius * 2) d.x = width + d.radius;
        if (d.x > width + d.radius * 2) d.x = -d.radius;

        const dropGrad = ctx.createRadialGradient(
          d.x - d.radius * 0.3,
          d.y - d.radius * 0.3,
          d.radius * 0.1,
          d.x,
          d.y,
          d.radius
        );

        dropGrad.addColorStop(0, `rgba(251, 247, 237, ${d.alpha + 0.22})`);
        dropGrad.addColorStop(0.6, `rgba(228, 179, 41, ${d.alpha})`);
        dropGrad.addColorStop(1, `rgba(138, 106, 0, ${d.alpha * 0.35})`);

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = dropGrad;
        ctx.fill();
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
    };
  }, [mode]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden z-0"
    >
      {/* 1. Subtle Golden Silk Waves Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* 2. Drifting Yellow Mustard Flowers & Green Leaves */}
      <div className="petals">
        {PETAL_ITEMS.map((item, idx) => (
          <span
            key={idx}
            className={mode === "hero" ? "petal" : "petal--catalog"}
            style={{
              left: `${item.left}%`,
              width: item.size,
              height: item.size,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.dur}s`,
            }}
          >
            {item.kind === "leaf" ? (
              <svg viewBox="0 0 24 24">
                <path
                  d="M3 21C3 9 10 3 21 3c0 11-6 18-18 18Z"
                  fill="#5F963E"
                />
                <path
                  d="M5 19C9 13 13 9 18 6"
                  stroke="#FBF7ED"
                  strokeOpacity="0.55"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <g fill="#E4B329">
                  <ellipse cx="12" cy="6" rx="4" ry="5.5" />
                  <ellipse cx="12" cy="18" rx="4" ry="5.5" />
                  <ellipse cx="6" cy="12" rx="5.5" ry="4" />
                  <ellipse cx="18" cy="12" rx="5.5" ry="4" />
                </g>
                <circle cx="12" cy="12" r="2.6" fill="#B5573A" />
              </svg>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export const HeroAnimation: React.FC = () => {
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      aria-label="Prime Fresh Oil Mills — Direct Mill Agro-Commodities & Cold-Pressed Oils"
      className="bg-emerald-hero relative flex min-h-[85svh] items-center overflow-hidden text-[#FBF7ED] border-b-2 border-[#E4B329]/40"
    >
      {/* 1. Combined Drifting Mustard Flowers + Subtle Golden Waves Layer */}
      <AmbientBotanicalLayer mode="hero" />

      {/* 2. Decorative Heritage Cusped Jharokha Arch Filigree (Right Architectural Watermark) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 360 480"
        className="pointer-events-none absolute -right-12 bottom-0 h-[86%] w-auto opacity-18 hidden md:block"
        fill="none"
      >
        <path
          d="M24 470V210C24 140 72 95 112 72C142 54 166 28 180 12C194 28 218 54 248 72C288 95 336 140 336 210V470"
          stroke="#E4B329"
          strokeWidth="2.5"
        />
        <path
          d="M42 470V216C42 154 84 112 122 90C148 74 168 52 180 36C192 52 212 74 238 90C276 112 318 154 318 216V470"
          stroke="#E4B329"
          strokeWidth="1.2"
          strokeDasharray="6 6"
        />
        <circle cx="180" cy="96" r="14" stroke="#E4B329" strokeWidth="1.5" />
        <path d="M180 74L190 96L180 118L170 96Z" fill="#E4B329" fillOpacity="0.35" />
      </svg>

      {/* 3. Main Hero Content Block */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12 pt-32 sm:pt-36 pb-20 sm:pb-24">
        <div className="max-w-3xl flex flex-col items-start text-left">
          {/* Mustard Gold Eyebrow Kicker */}
          <div className="hero-entrance-1 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#04382A]/80 border border-[#E4B329]/45 backdrop-blur-md shadow-xs">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#E4B329]">
              Direct From Our Extraction Mill · Bulk Agro-Commodities
            </span>
          </div>

          {/* Original Executive Display Headline */}
          <h1 className="hero-entrance-2 font-sans font-semibold tracking-[-0.02em] mt-5 sm:mt-6 text-4xl sm:text-6xl lg:text-[4.25rem] leading-[1.08] text-[#FBF7ED] drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
            Harvest-Fresh Extraction.
            <br />
            Built for{" "}
            <span className="font-display-serif italic font-semibold text-[#E4B329]">
              India&apos;s Bulk Trade.
            </span>
          </h1>

          {/* Original B2B Description Paragraph */}
          <p className="hero-entrance-3 font-sans mt-5 max-w-2xl text-[15px] sm:text-[16.5px] leading-[1.65] text-[#FBF7ED]/90">
            Welcome to{" "}
            <strong className="font-semibold text-[#E4B329]">
              Prime Fresh Oil Mills
            </strong>{" "}
            — your trusted processing partner for unblended Kachi Ghani Mustard,
            Groundnut, Cottonseed, and Soyabean oils alongside high-protein
            cattle feed cakes. Crushed daily from farm-selected seeds and
            dispatched straight to wholesalers, food factories, and
            institutional buyers.
          </p>

          {/* 3 Mill Capability Pillars */}
          <div className="hero-entrance-3 mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#04382A]/75 border border-[#E4B329]/35 shadow-sm backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-[#E4B329]/20 text-[#E4B329] flex items-center justify-center shrink-0">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#B8C7B3]">
                  Extraction Grade
                </div>
                <div className="text-xs font-bold text-[#FBF7ED]">
                  100% First-Press Pure
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#04382A]/75 border border-[#E4B329]/35 shadow-sm backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-[#E4B329]/20 text-[#E4B329] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#B8C7B3]">
                  Quality Assurance
                </div>
                <div className="text-xs font-bold text-[#FBF7ED]">
                  Lab-Tested Every Batch
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#04382A]/75 border border-[#E4B329]/35 shadow-sm backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-[#E4B329]/20 text-[#E4B329] flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#B8C7B3]">
                  Supply Formats
                </div>
                <div className="text-xs font-bold text-[#FBF7ED]">
                  Pouches, Tins &amp; Tankers
                </div>
              </div>
            </div>
          </div>

          {/* Primary & Secondary Action Buttons */}
          <div className="hero-entrance-4 mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#quote-section"
              onClick={(e) => scrollToSection(e, "quote-section")}
              className="btn-hero-primary-amber text-[15px] whitespace-nowrap cursor-pointer active:scale-95"
            >
              <span>Get Factory Price Quote</span>
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </a>

            <a
              href="#catalog"
              onClick={(e) => scrollToSection(e, "catalog")}
              className="btn-hero-secondary-glass text-[15px] whitespace-nowrap cursor-pointer active:scale-95"
            >
              <span>Browse 8 Mill Products</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export const HeroScrollAnimation = HeroAnimation;
export default HeroAnimation;
