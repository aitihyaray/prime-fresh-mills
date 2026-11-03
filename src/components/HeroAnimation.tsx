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
      className="bg-emerald-hero relative flex min-h-[100svh] items-center overflow-hidden text-[#FBF7ED] border-b-2 border-[#E4B329]/40"
    >
      {/* 1. Combined Drifting Mustard Flowers + Subtle Golden Waves Layer */}
      <AmbientBotanicalLayer mode="hero" />

      {/* 2. Kishangarh Royal Painting Holding Mustard Flower Framed Inside Right-Side Jharokha Arch (Background Layer) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 420 520"
        preserveAspectRatio="xMaxYMax meet"
        className="pointer-events-none absolute right-2 sm:right-5 lg:right-8 bottom-0 h-[68%] sm:h-[78%] lg:h-[90%] w-auto opacity-30 md:opacity-95 blur-[0.5px] md:blur-none transition-all duration-500 drop-shadow-[0_12px_36px_rgba(0,0,0,0.38)]"
        fill="none"
      >
        <defs>
          <clipPath id="hero-jharokha-arch-clip">
            <path d="M38 520 V204 C38 134, 86 92, 134 70 C170 53, 194 32, 210 14 C226 32, 250 53, 286 70 C334 92, 382 134, 382 204 V520 Z" />
          </clipPath>
          <linearGradient
            id="hero-jharokha-vignette"
            x1="210"
            y1="14"
            x2="210"
            y2="520"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#04382A" stopOpacity="0.12" />
            <stop offset="75%" stopColor="#04382A" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#04382A" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* Outer Jharokha Arch Halo Line Touching Bottom Edge */}
        <path
          d="M26 520 V204 C26 128, 78 84, 128 60 C166 42, 192 22, 210 2 C228 22, 254 42, 292 60 C342 84, 394 128, 394 204 V520"
          stroke="#E4B329"
          strokeWidth="1.4"
          strokeDasharray="5 5"
          strokeOpacity="0.55"
        />

        {/* Clipped Kishangarh Mustard-Flower Painting (Cropping Outer Red Border & Corner Mark) */}
        <g clipPath="url(#hero-jharokha-arch-clip)">
          <image
            href="/assets/aistudio/Gemini_Generated_Image_7rv13k7rv13k7rv1_966815f5.png"
            x="16"
            y="8"
            width="388"
            height="536"
            preserveAspectRatio="xMidYMid slice"
          />
          <rect
            x="38"
            y="14"
            width="344"
            height="506"
            fill="url(#hero-jharokha-vignette)"
          />
        </g>

        {/* Crisp Golden Jharokha Arch Border Frame */}
        <path
          d="M38 520 V204 C38 134, 86 92, 134 70 C170 53, 194 32, 210 14 C226 32, 250 53, 286 70 C334 92, 382 134, 382 204 V520"
          stroke="#E4B329"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M46 520 V206 C46 140, 92 100, 138 78 C172 62, 195 42, 210 24 C225 42, 248 62, 282 78 C328 100, 374 140, 374 206 V520"
          stroke="#FBF7ED"
          strokeWidth="1"
          strokeOpacity="0.45"
          strokeLinejoin="round"
        />
      </svg>

      {/* 3. Main Hero Content Block — Split Top/Bottom on Mobile, Left-Column Flow on Desktop */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-between md:block px-4 sm:px-5 md:px-8 lg:px-10 xl:px-14 pt-20 sm:pt-24 md:pt-32 pb-6 sm:pb-10 md:pb-20 min-h-[100svh] md:min-h-0">
        {/* TOP GROUP ON MOBILE: Eyebrow (Desktop Only) + Commandingly Scaled Mobile Headline */}
        <div className="w-full max-w-none md:max-w-[53%] lg:max-w-[54%] flex flex-col items-start text-left">
          {/* Mustard Gold Eyebrow Kicker — Removed on Mobile per User Annotation */}
          <div className="hero-entrance-1 hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#04382A]/80 border border-[#E4B329]/45 backdrop-blur-xs shadow-xs max-w-full">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E4B329] whitespace-nowrap">
              Direct From Our Extraction Mill · Bulk Agro-Commodities
            </span>
          </div>

          {/* Executive Display Headline — Spans Full Marked Vertical Area on Mobile, 2-Line Left-Pinned on Desktop */}
          <h1 className="hero-entrance-2 font-sans font-semibold tracking-[-0.02em] md:tracking-[-0.025em] mt-3 mb-6 md:mt-5 md:mb-0 text-[clamp(2.35rem,9.8vw,3rem)] md:text-[2.75rem] lg:text-[3.15rem] xl:text-[3.55rem] leading-[1.32] md:leading-[1.1] text-[#FBF7ED] drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)] w-full max-w-none">
            <span className="md:block md:whitespace-nowrap">
              <span className="block md:inline">Harvest-Fresh</span>{" "}
              <span className="block md:inline">Extraction.</span>
            </span>
            <span className="md:block md:whitespace-nowrap">
              <span className="block md:inline">Built for</span>{" "}
              <span className="block md:inline font-display-serif italic font-semibold text-[#E4B329] whitespace-nowrap">
                India&apos;s Bulk Trade.
              </span>
            </span>
          </h1>
        </div>

        {/* BOTTOM GROUP ON MOBILE: Shifted Down to Bottom of Screen so Queen Artwork Shows in Center */}
        <div className="w-full md:max-w-[53%] lg:max-w-[54%] flex flex-col items-start text-left mt-auto md:mt-0">
          {/* Ornamental Heritage Cusped Arch & Mustard Blossom Art Frieze */}
          <div
            className="hero-entrance-3 md:mt-7 mb-2 sm:mb-1.5 w-full max-w-[460px] sm:max-w-[480px] xl:max-w-[520px]"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 640 86"
              fill="none"
              className="w-full h-auto overflow-visible"
            >
              {/* Left & Right Carved Cusped Arch Garland Lines */}
              <path
                d="M0 48 H56 C70 48, 78 30, 94 30 C110 30, 118 48, 132 48 H172"
                stroke="#E4B329"
                strokeWidth="1.7"
                strokeOpacity="0.75"
                strokeLinecap="round"
              />
              <path
                d="M468 48 H508 C522 48, 530 30, 546 30 C562 30, 570 48, 584 48 H640"
                stroke="#E4B329"
                strokeWidth="1.7"
                strokeOpacity="0.75"
                strokeLinecap="round"
              />
              {/* Fine Dashed Architectural Baseline Under the Wings */}
              <path
                d="M18 57 H162 M478 57 H622"
                stroke="#E4B329"
                strokeWidth="1.1"
                strokeDasharray="5 5"
                strokeOpacity="0.5"
              />

              {/* Tiny Accent Mustard Buds on Outer Cusps */}
              <circle cx="94" cy="30" r="2.8" fill="#E4B329" fillOpacity="0.8" />
              <circle cx="546" cy="30" r="2.8" fill="#E4B329" fillOpacity="0.8" />

              {/* Left Botanical Mustard Leaves & Blooming 4-Petal Mustard Flower */}
              <path
                d="M174 48 C156 34, 136 35, 124 45 C138 54, 156 54, 174 48 Z"
                fill="#5F963E"
                fillOpacity="0.9"
              />
              <path
                d="M168 46 C156 43, 144 43, 134 45"
                stroke="#FBF7ED"
                strokeOpacity="0.45"
                strokeWidth="0.9"
              />
              <path
                d="M214 54 C204 64, 192 66, 184 62 C190 54, 202 52, 214 54 Z"
                fill="#5F963E"
                fillOpacity="0.8"
              />

              <g transform="translate(198, 46)">
                <ellipse cx="0" cy="-10.5" rx="6" ry="8.8" fill="#E4B329" />
                <ellipse cx="0" cy="10.5" rx="6" ry="8.8" fill="#E4B329" />
                <ellipse cx="-10.5" cy="0" rx="8.8" ry="6" fill="#E4B329" />
                <ellipse cx="10.5" cy="0" rx="8.8" ry="6" fill="#E4B329" />
                <circle cx="0" cy="0" r="3.8" fill="#B5573A" />
                <circle cx="0" cy="0" r="1.4" fill="#FBF7ED" />
              </g>

              {/* Left Side Miniature Chhatri Arch Niche */}
              <path
                d="M232 66 V42 C232 31, 243 27, 251 24 C256 22, 259 17, 262 13 C265 17, 268 22, 273 24 C281 27, 292 31, 292 42 V66 Z"
                fill="rgba(228, 179, 41, 0.10)"
                stroke="#E4B329"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="M262 43 C258.5 36.5, 258.5 30, 262 25 C265.5 30, 265.5 36.5, 262 43 Z M262 43 C258.5 49.5, 258.5 56, 262 61 C265.5 56, 265.5 49.5, 262 43 Z M262 43 C255.5 39.5, 249 39.5, 244 43 C249 46.5, 255.5 46.5, 262 43 Z M262 43 C268.5 39.5, 275 39.5, 280 43 C275 46.5, 268.5 46.5, 262 43 Z"
                stroke="#FBF7ED"
                strokeOpacity="0.85"
                strokeWidth="1.15"
                fill="rgba(228, 179, 41, 0.22)"
              />
              <circle cx="262" cy="43" r="2" fill="#E4B329" />

              {/* Center Grand Heritage Cusped Jharokha Arch with Phool-Jaali Quatrefoil */}
              <path
                d="M320 2 L317 9 H323 Z"
                fill="#E4B329"
              />
              <path
                d="M282 68 V36 C282 23, 296 18, 307 15 C314 13, 317 8, 320 4 C323 8, 326 13, 333 15 C344 18, 358 23, 358 36 V68 Z"
                fill="rgba(228, 179, 41, 0.16)"
                stroke="#E4B329"
                strokeWidth="2.1"
                strokeLinejoin="round"
              />
              {/* Inner Cusped Arch Contour */}
              <path
                d="M288 64 V38 C288 27, 300 23, 309 20 C315 18, 318 14, 320 10 C322 14, 325 18, 331 20 C340 23, 352 27, 352 38 V64"
                stroke="#E4B329"
                strokeOpacity="0.5"
                strokeWidth="1"
              />
              {/* Central 4-Petal Phool-Jaali Quatrefoil */}
              <path
                d="M320 41 C314.5 31.5, 314.5 22, 320 15 C325.5 22, 325.5 31.5, 320 41 Z M320 41 C314.5 50.5, 314.5 60, 320 67 C325.5 60, 325.5 50.5, 320 41 Z M320 41 C310.5 35.5, 301 35.5, 294 41 C301 46.5, 310.5 46.5, 320 41 Z M320 41 C329.5 35.5, 339 35.5, 346 41 C339 46.5, 329.5 46.5, 320 41 Z"
                stroke="#FBF7ED"
                strokeWidth="1.45"
                fill="rgba(228, 179, 41, 0.32)"
              />
              <circle cx="320" cy="41" r="3" fill="#E4B329" />

              {/* Right Side Miniature Chhatri Arch Niche */}
              <path
                d="M348 66 V42 C348 31, 359 27, 367 24 C372 22, 375 17, 378 13 C381 17, 384 22, 389 24 C397 27, 408 31, 408 42 V66 Z"
                fill="rgba(228, 179, 41, 0.10)"
                stroke="#E4B329"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="M378 43 C374.5 36.5, 374.5 30, 378 25 C381.5 30, 381.5 36.5, 378 43 Z M378 43 C374.5 49.5, 374.5 56, 378 61 C381.5 56, 381.5 49.5, 378 43 Z M378 43 C371.5 39.5, 365 39.5, 360 43 C365 46.5, 371.5 46.5, 378 43 Z M378 43 C384.5 39.5, 391 39.5, 396 43 C391 46.5, 384.5 46.5, 378 43 Z"
                stroke="#FBF7ED"
                strokeOpacity="0.85"
                strokeWidth="1.15"
                fill="rgba(228, 179, 41, 0.22)"
              />
              <circle cx="378" cy="43" r="2" fill="#E4B329" />

              {/* Base Sill Line Under the 3-Arch Jharokha Arcade */}
              <path
                d="M224 68 H416"
                stroke="#E4B329"
                strokeWidth="1.6"
                strokeLinecap="round"
              />

              {/* Right Blooming 4-Petal Mustard Flower & Botanical Leaves */}
              <g transform="translate(442, 46)">
                <ellipse cx="0" cy="-10.5" rx="6" ry="8.8" fill="#E4B329" />
                <ellipse cx="0" cy="10.5" rx="6" ry="8.8" fill="#E4B329" />
                <ellipse cx="-10.5" cy="0" rx="8.8" ry="6" fill="#E4B329" />
                <ellipse cx="10.5" cy="0" rx="8.8" ry="6" fill="#E4B329" />
                <circle cx="0" cy="0" r="3.8" fill="#B5573A" />
                <circle cx="0" cy="0" r="1.4" fill="#FBF7ED" />
              </g>

              <path
                d="M426 54 C436 64, 448 66, 456 62 C450 54, 438 52, 426 54 Z"
                fill="#5F963E"
                fillOpacity="0.8"
              />
              <path
                d="M466 48 C484 34, 504 35, 516 45 C502 54, 484 54, 466 48 Z"
                fill="#5F963E"
                fillOpacity="0.9"
              />
              <path
                d="M472 46 C484 43, 496 43, 506 45"
                stroke="#FBF7ED"
                strokeOpacity="0.45"
                strokeWidth="0.9"
              />
            </svg>
          </div>

          {/* Primary & Secondary Action Buttons */}
          <div className="hero-entrance-4 mt-3 sm:mt-6 md:mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 w-full max-w-[460px] sm:max-w-[480px] xl:max-w-[520px]">
            <a
              href="#quote-section"
              onClick={(e) => scrollToSection(e, "quote-section")}
              className="btn-hero-primary-amber w-full h-[46px] sm:h-[48px] !px-4 text-[13.5px] sm:text-[14px] whitespace-nowrap cursor-pointer active:scale-95"
            >
              <span>Get Factory Price Quote</span>
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </a>

            <a
              href="#catalog"
              onClick={(e) => scrollToSection(e, "catalog")}
              className="btn-hero-secondary-glass w-full h-[46px] sm:h-[48px] !px-4 text-[13.5px] sm:text-[14px] whitespace-nowrap cursor-pointer active:scale-95"
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
