# Prime Fresh Oil Mills — B2B Wholesale Portal (React)

Official B2B digital portal and wholesale catalog for **Prime Fresh Oil Mills**, processors and exporters of cold-pressed mustard oil, high-protein de-oiled cakes (DOC), and export-grade agricultural seeds.

Rewritten as a modern **React 19 + TypeScript + Vite + Tailwind CSS** application.

## Features

- **Interactive Scroll-Scrub Animation**: Canvas-driven 237-frame sequence capturing signature product 3D rotation and splash with smooth scroll interpolation and GPU decompression.
- **Wholesale Inventory & Catalog**:
  - Cold-pressed Kachi Ghani Mustard Oil with bulk specifications (FFA, Purity, Pungency).
  - High-protein De-Oiled Cakes (DOC) & Export Grade Seeds (Yellow Sesame, Black Mustard, Groundnut, etc.).
- **Multi-Product RFQ Engine**:
  - Interactive multi-item selection with instant floating counter and pulse feedback.
  - Tag-based inquiry builder with volume, delivery destination, packaging, and freight selection.
- **B2B AI Quality Assistant**:
  - 8-bit retro pixel art animated header with custom bottle and pouch canvas.
  - Instant knowledge base covering purity %, moisture, FFA levels, and export specs.
  - Direct 1-click addition from chat recommendations into the active RFQ list.

## Development & Build

### Install Dependencies
```bash
npm install
```

### Start Local Development Server
```bash
npm run dev
```
Dev server listens on `http://0.0.0.0:3000`.

### Production Build
```bash
npm run build
```

## Tech Stack
- **Framework**: React 19, TypeScript
- **Bundler & Tooling**: Vite
- **Styling**: Tailwind CSS
- **Assets**: 237-frame 3D scroll animation sequence, optimized vector and raster imagery
