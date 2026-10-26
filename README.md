# Prime Fresh Oil Mills — B2B Wholesale Portal

Official B2B digital portal and wholesale catalog for **Prime Fresh Oil Mills**, processors and exporters of cold-pressed mustard oil, high-protein de-oiled cakes (DOC), and export-grade agricultural seeds.

## Features

- **Interactive Scroll-Scrub Animation**: Canvas-driven 237-frame sequence capturing the signature bottle splash with buttery-smooth scroll interpolation.
- **Wholesale Inventory & Catalog**:
  - Cold-pressed Kachi Ghani Mustard Oil with bulk specifications (FFA, Purity, Pungency).
  - High-protein De-Oiled Cakes (DOC) & Export Grade Seeds (Yellow Sesame, Black Mustard, Groundnut, etc.).
- **Multi-Product RFQ Engine**:
  - Interactive multi-item selection with instant floating counter.
  - Tag-based inquiry builder with quantity, packaging, and freight selection.
- **B2B AI Quality Assistant**:
  - 8-bit retro pixel art animated header with custom bottle and pouch canvas.
  - Instant knowledge base covering purity %, moisture, FFA levels, and export specs.
  - Direct 1-click addition from chat recommendations into the active RFQ list.

## Quick Start (Local Development)

Start the local Python HTTP server:

```bash
python3 server.py 8000
```

Open your browser and navigate to:
```
http://localhost:8000/
```

## Project Structure

```
├── index.html                 # Main B2B landing page & catalog
├── index_standalone.html      # Standalone scroll animation testbed
├── script.js                  # Scroll scrubbing & interaction scripts
├── styles.css                 # Base stylesheet & animations
├── server.py                  # Optimized local development server
├── ezgif-frame-*.jpg          # 237 animation sequence frames
├── mustard_oil_mockup.png     # Hero mustard oil asset
├── natural-sesame-seed.jpg    # Catalog product imagery
├── logo.png                   # Prime Fresh Mills branding
└── .gitignore                 # Standard system and runtime ignores
```
