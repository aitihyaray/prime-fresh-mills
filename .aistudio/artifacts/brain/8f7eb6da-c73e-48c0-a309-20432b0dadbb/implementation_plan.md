# Deep Emerald & Mustard Gold Theme + Heritage Architectural Motifs & Mustard Bloom Animation

This plan updates the visual palette of the **Prime Fresh Oil Mills** wholesale portal to the Deep Emerald (`#064E3B`, `#04382A`), Mustard Gold (`#E4B329`), Warm Cream (`#FBF7ED`), and Soft Sage (`#B8C7B3`) theme, integrates subtle heritage architectural design elements (Jaali lattice patterns, cusped arch frames, ornamental golden dividers, and an arched skyline footer silhouette), and adds the drifting yellow mustard flower and leaf animation with subtle golden waves across both the Hero and Catalog sections—while strictly excluding any mention of the word "Rajasthan" and keeping all existing copy, product cards, and B2B workflows intact.

## User Review & Critical Decisions

> [!IMPORTANT]
> Your latest feedback and preferences have been locked into this revised plan:

- **Confirmed Decision 1 — Zero Usage of "Rajasthan" in Text**: The word *"Rajasthan"* will **never** appear anywhere in headlines, badges, descriptions, metadata, or UI labels.
- **Confirmed Decision 2 — Heritage Architectural Design Elements**: We will weave authentic architectural geometry into the visual design:
  - **Jaali Geometric Lattice Pattern**: Subtle golden diamond-and-circle Jaali SVG lattice texture (`#E4B329` at low opacity) on cream surface accents.
  - **Cusped Jharokha / Arch Frames & Curved Card Crowns**: Arched top borders (`border-top: 4px solid #E4B329` with graceful arched top radii and ornamental corner flourishes) on the B2B Quotation container and section headers.
  - **Ornamental Golden Diamond Dividers & Arched Skyline Transition**: Delicate golden SVG motif dividers between major sections and an emerald palace-arch skyline SVG border transitioning into the footer.
- **Confirmed Decision 3 — Deep Emerald Hero + Warm Cream Catalog Split**: The **Hero section** uses a rich **Deep Emerald Green (`#04382A` → `#064E3B`)** backdrop with warm cream (`#FBF7ED`) and mustard gold (`#E4B329`) typography, while the **Product Catalog and Quotation sections** sit on a luminous **Warm Cream (`#FBF7ED`)** canvas accented by deep emerald (`#064E3B`) headings and soft sage (`#B8C7B3`) borders.
- **Confirmed Decision 4 — Combined Flower & Golden Wave Animation Across Hero & Catalog**: Both the **Hero section** and the **Product Catalog / lower content flow** feature drifting 4-petal yellow mustard blossoms (`#E4B329` with `#B5573A` centers) and green botanical leaves (`#5F963E`) layered over subtle golden wave streams.

---

## 1. Overview & Core Concept

- **What It Does**: Restyles the application with a regal Deep Emerald and Mustard Gold visual identity enriched with classical Indian architectural motifs (Jaali geometric fretwork, cusped arch borders, ornamental section dividers) and a continuous animation of drifting yellow mustard blossoms, leaves, and golden silk waves.
- **Target Audience / Persona**: Institutional edible-oil buyers, FMCG procurement heads, cattle-feed manufacturers, and wholesale agro-commodity distributors.
- **Key Value**: Elevates brand authority through handcrafted architectural detailing and organic botanical motion while keeping all existing text and B2B ordering workflows untouched.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Arrival on Deep Emerald Hero**: Visitors land on a rich emerald green (`#064E3B` / `#04382A`) Hero stage framed by subtle golden Jharokha arch filigrees in the background corners, where 4-petal yellow mustard blooms and green leaves drift gently across subtle golden wave ribbons behind the crisp cream (`#FBF7ED`) and mustard-gold (`#E4B329`) headline and CTAs.
  2. **Seamless Transition to Heritage Cream Catalog**: Scrolling into the Product Catalog reveals a warm cream (`#FBF7ED`) canvas accented by a delicate Jaali geometric lattice backdrop, ornamental golden diamond dividers, and a soft ambient layer of drifting mustard blossoms and golden wave currents behind the 8 product cards.
  3. **Arched Quotation Desk & Skyline Footer**: The B2B Quotation form features a regal arched gold-crowned card border (`border-top: 4px solid #E4B329`), followed by an emerald architectural skyline silhouette transitioning into the `#064E3B` footer.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Royal Agro-Milling Heritage — combining deep botanical emerald, vibrant mustard-bloom gold, warm sun-bleached cream, and geometric Jaali / Jharokha architectural ornament.
  - *Color Palette & Mood*:
    - `--green` / Primary Brand Emerald: `#064E3B`
    - `--green-deep` / Deep Emerald Shadow: `#04382A`
    - `--gold` / Mustard Blossom Gold: `#E4B329` (hover `#EFC24A`, dark text accent `#8A6A00`)
    - `--cream` / Warm Heritage Canvas: `#FBF7ED`
    - `--sage` / Structural Borders & Muted Accents: `#B8C7B3`
    - `--ink` / Primary Dark Prose: `#0B0902`
    - `--terracotta` / Blossom Center & Focus Ring Accent: `#A24A2D` / `#B5573A`
  - *Architectural Elements*:
    - **Jaali Lattice Texture (`.jaali-pattern`)**: Repeating 44×44px SVG diamond-and-rosette geometric lattice in `#E4B329` (`stroke-opacity: 0.22`).
    - **Cusped Arch & Crown Borders**: Subtle arched header dividers and a gold-crowned arched frame (`border-top: 4px solid #E4B329`) on the Quotation card.
    - **Architectural Skyline Silhouette**: Full-width SVG silhouette of traditional domes, chhatris, and cusped arches (`fill: #064E3B`) crowning the transition from the cream Quote section into the Deep Emerald Footer.

- **Interactive Feedback & Motion**:
  - **Drifting Mustard Petals & Leaves (`.petals` / `.petal`)**: 14 SVG botanical elements alternating between 4-petal yellow mustard blossoms (`#E4B329` petals + `#B5573A` center) and green mustard leaves (`#5F963E` blade + `#FBF7ED` vein), drifting downward and swaying horizontally on staggered 12–21s infinite loops (`@keyframes fall`).
  - **Subtle Golden Wave Canvas**: Smooth sine-harmonic golden-amber wave ribbons (`#E4B329` / `#8A6A00`) undulate gently in the background of both the Hero and Catalog sections, responding subtly to pointer movement.
  - **Accessibility**: Respects `prefers-reduced-motion: reduce` by pausing continuous drift animations for motion-sensitive users.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1 — Architectural Geometry Without Geographic Naming**
  - *Chosen Approach*: Incorporate the visual craft of traditional architecture (Jaali geometric lattice SVG patterns, cusped arch SVG motifs, ornamental diamond dividers, and the chhatri/arch skyline footer silhouette) purely as visual design elements while keeping all text 100% free of the word "Rajasthan".
  - *Why*: Directly honors your brand direction—giving the portal a distinctive, heritage architectural character without tying the written copy to a specific state name.

- **Decision 2 — Non-Intrusive Ambient Motion Across Hero & Catalog**
  - *Chosen Approach*: Render the drifting mustard flowers/leaves and subtle golden wave canvas inside `pointer-events-none` background layers in both the Deep Emerald Hero and the Warm Cream Catalog/Quote flow.
  - *Why*: Delivers continuous visual cohesion from top to bottom while ensuring every product filter, card button, and quotation input remains crisp and immediately clickable.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                Application Theme & Architectural Ornament               │
│   Palette: Emerald (#064E3B / #04382A) · Gold (#E4B329) · Cream (#FBF7ED)│
│   Motifs: Jaali Lattice SVG · Cusped Arch Dividers · Skyline Silhouette │
└───────────────────┬─────────────────────────────────┬───────────────────┘
                    │                                 │
                    ▼                                 ▼
┌───────────────────────────────────────┐ ┌───────────────────────────────┐
│        Deep Emerald Hero Stage        │ │  Warm Cream Catalog & RFQ Flow│
│  Bg: Linear Gradient #04382A→#064E3B  │ │  Bg: Cream (#FBF7ED) + Jaali  │
│  Text: Cream (#FBF7ED) & Gold (#E4B329)│ │  Headings: Emerald (#064E3B)  │
│  Ornament: Subtle Golden Arch Filigree│ │  Ornament: Gold Diamond Rules │
├───────────────────────────────────────┤ ├───────────────────────────────┤
│  Ambient Motion Layer (Hero Mode)     │ │  Ambient Motion Layer (Cream) │
│  • 14 Drifting Mustard Blooms/Leaves  │ │  • Drifting Mustard Blooms    │
│  • Subtle Golden Silk Wave Canvas     │ │  • Soft Golden Wave Ribbons   │
└───────────────────────────────────────┘ └───────────────┬───────────────┘
                                                          │
                    ┌─────────────────────────────────────┼───────────────┐
                    ▼                                     ▼               ▼
     ┌─────────────────────────────┐       ┌────────────────────┐ ┌──────────────┐
     │   8-Product Catalog Grid    │──────▶│ Arched Quote Desk  │ │ Arch Skyline │
     │ • Sage Borders (#B8C7B3)    │       │ & Floating RFQ Pill│ │ + Emerald    │
     │ • Emerald/Gold Action Btns  │       │ • 4px Gold Crown   │ │ Footer       │
     └─────────────────────────────┘       └────────────────────┘ └──────────────┘
```

- **Data Model & State**:
  - `PETAL_ITEMS` (deterministic array of 14 botanical particles with `left`, `size`, `delay`, `dur`, and `kind: 'bloom' | 'leaf'`) rendered as lightweight inline SVGs in both the Hero and Catalog ambient layers.
  - Existing `selectedProducts` (`Set<string>`) state in the root application continues to drive the Product Catalog cards, Floating RFQ Pill, Quote Section chips, and Quality Assistant without modification.

- **Interactive Component & State Mapping**:
  - **Header Navigation**: Sticky `#FBF7ED/95` header with `#064E3B` brand typography, `#E4B329` underline hover states, and a Mustard Gold (`#E4B329` fill with `#0B0902` ink text) primary quote CTA.
  - **Hero Section**: Deep emerald (`#04382A` → `#064E3B`) background with subtle golden Jharokha arch corner filigree, drifting mustard flowers/leaves + subtle golden wave canvas; primary button in Mustard Gold (`#E4B329`) and secondary outline button in warm cream (`#FBF7ED`).
  - **Product Catalog & Quote Section**: Warm cream (`#FBF7ED`) background with subtle Jaali lattice texture, ornamental golden diamond dividers, and drifting mustard flowers + golden waves behind the content containers; Quote card crowned with a `#E4B329` arched top border; emerald architectural skyline SVG transitioning into the `#064E3B` footer.
