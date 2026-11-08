# Engineering & Design Handoff: 3D Mechanical Macropad & Portfolio Upgrades

**Date:** November 8, 2026  
**Project:** Sendo Tjiamis Portfolio (`sendo-portfolio`)  
**Scope:** Hero Section 3D Macropad Navigation, Smart Scroll Navbar, and Zest macOS Rebranding.

---

## 1. Executive Summary

This release replaces the static hero section with an interactive, tactile **3D Mechanical Macropad** rendered via Three.js, establishing the portfolio's hero as a bespoke showcase of engineering craft. The top navigation bar has been redesigned to stay invisible at the top of the page, automatically revealing as a floating Apple-glass pill once the user scrolls down past the hero. Additionally, the open-source developer tool **PasteTap** has been rebranded to **Zest** with its official macOS 512x512 retina app icon.

---

## 2. Key Components & Implementation Map

### A. 3D Mechanical Macropad (`src/components/Macropad3D.tsx`)
- **Technology:** Vanilla Three.js WebGL with procedural geometry (zero external `.gltf` asset weight, <50ms first render).
- **Chassis & Plate:** Anodized aluminum unibody case with chamfered edges, dark/light theme PBR material switching, and front LED indicator bar.
- **5 Tactile Keycaps:**
  - `01` **About** (`#about`)
  - `02` **Experience** (`#experience`)
  - `03` **Projects** (`#projects`)
  - `04` **Skills** (`#skills`)
  - `05` **Education** (`#education`)
- **Interaction & Physics:**
  - Raycaster-driven hover detection and pointer tilt following the user's cursor with lerp damping.
  - Spring-loaded physical keypress depression (`y: 0.26 -> 0.08 -> 0.26`).
  - Synthesized Web Audio mechanical switch click ("thock" resonance + tactile impulse) with zero audio file downloads.
  - Built-in status bar with sound mute toggle and top-level theme switcher.
- **Accessibility & Compliance:**
  - Embedded semantic `<nav aria-label="Hero 3D Macropad Navigation">` with real `<button>` elements and instant `:focus-visible` styling for screen readers and keyboard users.
  - Honors `prefers-reduced-motion: reduce` by dampening tilt and continuous motion.

### B. Hero Section Integration (`src/components/Hero.tsx`)
- Structured as a responsive 2-column layout (`grid-cols-1 lg:grid-cols-12`):
  - **Left Column (7 cols):** Availability status badge, headline, bio, primary CTA, and social links.
  - **Right Column (5 cols):** Interactive 3D Macropad card.
- Loaded with `next/dynamic` (`ssr: false`) and an Apple-style pulsing skeleton to guarantee lightning-fast SSR and zero Largest Contentful Paint (LCP) regressions.

### C. Smart Scroll-Triggered Navigation (`src/components/Navbar.tsx`)
- **Hero View (`scrollY <= 200px`):** Navbar is hidden (`-translate-y-full opacity-0 pointer-events-none`) so the 3D Macropad acts as the primary navigation.
- **Scrolled Down (`scrollY > 200px`):** The floating Apple-glass pill smoothly slides into view (`translate-y-0 opacity-100`) via transform and opacity transitions (strictly adhering to Hallmark Floor Rule 2).

### D. Zest macOS Rebranding
- **Asset:** New 512x512 retina app icon deployed to [`public/assets/project-logo/zest-logo.png`](file:///Users/sendotjiamis/Documents/sendotjiam-portfolio/public/assets/project-logo/zest-logo.png).
- **Data:** Updated [`src/data/projects.ts`](file:///Users/sendotjiamis/Documents/sendotjiam-portfolio/src/data/projects.ts) (`id: 'zest'`, `Swift 6`, and `https://github.com/sendotjiam/zest`).
- **Configuration:** Updated [`.gitignore`](file:///Users/sendotjiamis/Documents/sendotjiam-portfolio/.gitignore) so Next.js static assets in `public/` are preserved in version control.

---

## 3. Macro Keyboard Design Improvement Proposals

Here is the design and engineering roadmap to elevate the 3D Macropad into an artisan mechanical centerpiece:

### Proposal 1: Sculpted Keycap Profiles (Cherry / KAT Profile)
- **Current State:** Straight extruded rounded boxes with planar canvas textures.
- **Improvement:**
  - Introduce cylindrical or spherical scooped dishes on the keycap top surfaces using Three.js `ExtrudeGeometry` with a custom bezier cross-section or parametric spline.
  - Add stepped front/rear angles (R1/R2 row sculpting) so the top row (`About`, `Experience`, `Projects`) angles downward towards the viewer, enhancing tactile realism.

### Proposal 2: Rotary Encoder Knob (Dial)
- **Concept:** Add a CNC-machined knurled aluminum rotary knob to the top-right corner of the chassis.
- **Interactions:**
  - Drag or scroll-wheel on the knob turns the dial with subtle haptic/audio detent clicks.
  - Turning the knob steps through portfolio sections sequentially or controls the mechanical sound volume.

### Proposal 3: Physical Keyboard Hotkey Bindings
- **Concept:** Connect the visitor's real physical keyboard to the 3D canvas.
- **Implementation:**
  - Add a window `keydown` listener for keys `1`, `2`, `3`, `4`, `5` (or `A`, `E`, `P`, `S`, `D`).
  - Pressing a physical key triggers the exact same 3D depression animation, plays the synthesized thock, and smooth-scrolls to that section.

### Proposal 4: Underglow / Keycap Backlighting (Apple Tint Glow)
- **Concept:** Add subtle LED backlighting underneath each key switch.
- **Implementation:**
  - Use Three.js `PointLight` or an additive glow billboard shader underneath the keycaps.
  - Keys glow softly in Apple Blue (`#0071e3` / `#2997ff`) when hovered or activated, bleeding through a frosted polycarbonate switch housing.

### Proposal 5: Switch Sound Profile Selector
- **Concept:** Allow keyboard enthusiasts to pick their favorite mechanical switch type.
- **Options in Web Audio Synthesizer:**
  1. **Lubed Linear ("Thock"):** Low-pitch 180Hz acoustic resonance, soft bottom-out.
  2. **Tactile ("Holy Panda"):** Crisp 500Hz tactile leaf snap followed by deep clack.
  3. **Clicky ("Cherry MX Blue"):** High-frequency 900Hz click impulse.

### Proposal 6: Constrained 3D Orbit / Turntable Drag
- **Concept:** Allow visitors to click-and-drag or swipe to inspect the macropad in 3D.
- **Implementation:**
  - Add a constrained pointer-drag rotation clamped to `[-30°, +30°]` azimuth and `[15°, 55°]` polar angle.
  - Auto-centers smoothly back to home position on pointer release via spring dampening.
  - Add an engraved brass weight plate on the underside with "Designed for Sendo Tjiamis • Grab iOS".

---

## 4. Verification & Running the Project

```bash
# 1. Start local development server
npm run dev
# Open http://localhost:3000

# 2. Typecheck with TypeScript
npx tsc --noEmit

# 3. Production build & bundle analysis
npm run build
```

**Build Status:**
- TypeScript: `0 errors`
- Next.js 14 Static Export: `Route /: 15.8 kB (103 kB First Load JS)`
