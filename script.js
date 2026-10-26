(function () {
  'use strict';

  const TOTAL_FRAMES = 237;
  const FRAME_PREFIX = 'ezgif-frame-';
  const FRAME_EXT = '.jpg';

  const canvas = document.getElementById('animation-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
  const scrollContainer = document.getElementById('animation-scroll-track') || document.getElementById('scroll-container');

  const images = [];
  let targetFrame = 0;
  let currentFrame = 0;
  let lastRenderedFrame = -1;
  let lastTime = performance.now();

  function getFrameUrl(index) {
    const num = String(index + 1).padStart(3, '0');
    return `${FRAME_PREFIX}${num}${FRAME_EXT}`;
  }

  function drawImageCrisp(img) {
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;
    const iw = img.naturalWidth || 1920;
    const ih = img.naturalHeight || 1080;

    // Standard cover scaling for the full uncropped frame
    const scale = Math.max(cw / iw, ch / ih);
    const renderWidth = iw * scale;
    const renderHeight = ih * scale;
    const dx = (cw - renderWidth) / 2;
    const dy = (ch - renderHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, dx, dy, renderWidth, renderHeight);
  }

  function getBestAvailableFrame(index) {
    if (images[index] && images[index].complete && images[index].naturalWidth > 0) {
      return images[index];
    }
    // Fallback to closest available frame to prevent frame dropping or blank flashes
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = index - offset;
      if (prev >= 0 && images[prev] && images[prev].complete && images[prev].naturalWidth > 0) {
        return images[prev];
      }
      const next = index + offset;
      if (next < TOTAL_FRAMES && images[next] && images[next].complete && images[next].naturalWidth > 0) {
        return images[next];
      }
    }
    return null;
  }

  function render(index) {
    const img = getBestAvailableFrame(index);
    if (img) {
      drawImageCrisp(img);
      lastRenderedFrame = index;
    }
  }

  function preloadImages() {
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);

      // Asynchronous GPU decompression avoids main-thread jank during scrolling
      if (img.decode) {
        img.decode()
          .then(() => {
            if (i === 0 && lastRenderedFrame === -1) {
              render(0);
            }
          })
          .catch(() => {
            img.onload = () => {
              if (i === 0 && lastRenderedFrame === -1) {
                render(0);
              }
            };
          });
      } else {
        img.onload = () => {
          if (i === 0 && lastRenderedFrame === -1) {
            render(0);
          }
        };
      }

      images.push(img);
    }
  }

  function resizeCanvas() {
    const card = document.getElementById('animation-frame-card');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = card ? card.clientWidth : Math.min(window.innerWidth * 0.92, 1240);
    const height = card ? card.clientHeight : Math.max(300, window.innerHeight - 120);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    updateScrollProgress();
    if (lastRenderedFrame >= 0) {
      render(lastRenderedFrame);
    } else {
      render(0);
    }
  }

  function updateScrollProgress() {
    const track = document.getElementById('animation-scroll-track') || document.getElementById('scroll-container');
    const catalog = document.getElementById('catalog');
    let maxScroll = 1;
    if (track) {
      maxScroll = Math.max(1, track.offsetHeight - window.innerHeight);
    } else if (catalog) {
      const rect = catalog.getBoundingClientRect();
      const catalogDocTop = rect.top + (window.pageYOffset || document.documentElement.scrollTop || 0);
      maxScroll = Math.max(1, catalogDocTop - window.innerHeight);
    } else {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    }

    const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    const progress = Math.max(0, Math.min(1, scrollTop / maxScroll));
    targetFrame = progress * (TOTAL_FRAMES - 1);
  }

  function animationLoop(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    // Refresh-rate-independent exponential damping (buttery smooth on 60Hz and 120Hz ProMotion)
    // Refresh-rate-independent exponential damping (buttery smooth on 60Hz and 120Hz ProMotion)
    const factor = 1 - Math.exp(-12 * dt);
    currentFrame += (targetFrame - currentFrame) * factor;

    if (Math.abs(targetFrame - currentFrame) < 0.005) {
      currentFrame = targetFrame;
    }

    const frameToDraw = Math.round(currentFrame);
    if (frameToDraw !== lastRenderedFrame) {
      render(frameToDraw);
    }

    requestAnimationFrame(animationLoop);
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('resize', resizeCanvas);

  resizeCanvas();
  preloadImages();
  requestAnimationFrame(animationLoop);
})();
