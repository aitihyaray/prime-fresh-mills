import React, { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 237;

export const HeroAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const lastRenderedFrameRef = useRef<number>(-1);
  const lastTimeRef = useRef<number>(performance.now());
  const rafIdRef = useRef<number | null>(null);
  const [loadedCount, setLoadedCount] = useState<number>(0);

  const getFrameUrl = (index: number) => {
    const num = String(index + 1).padStart(3, "0");
    return `/ezgif-frame-${num}.jpg`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    // 1. Draw Image Helper
    const drawImageCrisp = (img: HTMLImageElement) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;
      const iw = img.naturalWidth || 1920;
      const ih = img.naturalHeight || 1080;

      const isMobile = window.innerWidth <= 768;

      // Full-height immersive cover scaling filling the card container without white borders
      const scale = Math.max(cw / iw, ch / ih);
      const renderWidth = iw * scale;
      const renderHeight = ih * scale;

      // Desktop: 100% untouched standard (cw - renderWidth) / 2
      // Mobile: align visual focal point (bottle and pouch cluster) dead center
      // Adjusting focal point to 55% accounts for the bottle+packet cluster offset
      const focalX = isMobile ? 0.55 : 0.5;
      const dx = isMobile ? cw * 0.5 - renderWidth * focalX : (cw - renderWidth) / 2;
      const dy = (ch - renderHeight) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, dx, dy, renderWidth, renderHeight);
    };

    // 2. Frame fallbacks to avoid any blank flash
    const getBestAvailableFrame = (index: number): HTMLImageElement | null => {
      const imgs = imagesRef.current;
      if (imgs[index] && imgs[index].complete && imgs[index].naturalWidth > 0) {
        return imgs[index];
      }
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = index - offset;
        if (prev >= 0 && imgs[prev] && imgs[prev].complete && imgs[prev].naturalWidth > 0) {
          return imgs[prev];
        }
        const next = index + offset;
        if (next < TOTAL_FRAMES && imgs[next] && imgs[next].complete && imgs[next].naturalWidth > 0) {
          return imgs[next];
        }
      }
      return null;
    };

    const render = (index: number) => {
      const img = getBestAvailableFrame(index);
      if (img) {
        drawImageCrisp(img);
        lastRenderedFrameRef.current = index;
      }
    };

    // 3. Resize Canvas
    const resizeCanvas = () => {
      const card = cardRef.current;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const isMobile = window.innerWidth <= 768;

      // Full immersive size filling the container card on both desktop and mobile
      const width = card
        ? card.clientWidth
        : Math.min(window.innerWidth * (isMobile ? 0.94 : 0.92), 1240);

      const height = card
        ? card.clientHeight
        : Math.max(300, window.innerHeight - (isMobile ? 100 : 120));

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      updateScrollProgress();
      if (lastRenderedFrameRef.current >= 0) {
        render(lastRenderedFrameRef.current);
      } else {
        render(0);
      }
    };

    // 4. Update Scroll Progress
    const updateScrollProgress = () => {
      const track = trackRef.current;
      let maxScroll = 1;
      if (track) {
        maxScroll = Math.max(1, track.offsetHeight - window.innerHeight);
      } else {
        maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      }
      const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const progress = Math.max(0, Math.min(1, scrollTop / maxScroll));
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
    };

    // 5. Preload Images
    let loaded = 0;
    imagesRef.current = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      const markLoaded = () => {
        loaded++;
        if (loaded % 20 === 0 || loaded === TOTAL_FRAMES) {
          setLoadedCount(loaded);
        }
        if (i === 0 && lastRenderedFrameRef.current === -1) {
          render(0);
        }
      };

      if (img.decode) {
        img.decode()
          .then(markLoaded)
          .catch(() => {
            img.onload = markLoaded;
          });
      } else {
        img.onload = markLoaded;
      }
      imagesRef.current.push(img);
    }

    // 6. Smooth Animation Loop
    const animationLoop = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      // Exponential damping
      const factor = 1 - Math.exp(-12 * dt);
      currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * factor;

      if (Math.abs(targetFrameRef.current - currentFrameRef.current) < 0.005) {
        currentFrameRef.current = targetFrameRef.current;
      }

      const frameToDraw = Math.round(currentFrameRef.current);
      if (frameToDraw !== lastRenderedFrameRef.current) {
        render(frameToDraw);
      }

      rafIdRef.current = requestAnimationFrame(animationLoop);
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();
    rafIdRef.current = requestAnimationFrame(animationLoop);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", resizeCanvas);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <div
      id="animation-scroll-track"
      ref={trackRef}
      className="relative w-full"
      style={{ position: "relative", width: "100%", height: "260vh" }}
    >
      <div
        id="animation-sticky-container"
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none"
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "80px",
          paddingBottom: "24px",
          boxSizing: "border-box",
        }}
      >
        <div
          id="animation-frame-card"
          ref={cardRef}
          className="relative mx-auto rounded-2xl border border-[#EADFB4]/80 shadow-lg overflow-hidden flex items-center justify-center bg-white pointer-events-none"
          style={{
            width: "min(92vw, 1240px)",
            height: "min(calc(100vh - 120px), 760px)",
            borderRadius: "14px",
            overflow: "hidden",
            border: "1px solid rgba(234, 223, 180, 0.85)",
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <canvas
            id="animation-canvas"
            ref={canvasRef}
            className="block pointer-events-none"
            style={{ display: "block", borderRadius: "14px" }}
          />
        </div>
      </div>
    </div>
  );
};
