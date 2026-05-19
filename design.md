# CineFlow Design System

## 🎨 Design Commitment: Theatrical Redux (Cinematic Typographic Brutalism)

*   **Topological Choice:** Betrays the standard Left-Text/Right-Image SaaS hero split by layering a massive, screen-wide typographic element (`CINEFLOW`) *behind* floating high-contrast movie poster cards on a Z-axis, creating physical theater depth.
*   **Risk Factor:** High-contrast crimson lighting overlays and dark `#050505` backgrounds with deep velvet shadows demand precise layout spacing to avoid feeling cramped.
*   **Readability Conflict:** Overlaying giant, semi-transparent title lettering behind floating movie cards, trading absolute text legibility for atmospheric brand presence.
*   **Cliché Liquidation:** Liquidated fintech blue, neon purple, glassmorphism, bento grids, and soft/round friendly shapes (`rounded-md` or `rounded-xl`). Swapped for sharp 2px geometric frames, deep rich shadows, and physical gold/crimson lighting accents.

---

## 🎨 Color Palette & Design Tokens

These colors are defined as CSS variables under `:root` in the global CSS configuration.

| Token | CSS Variable | Hex Code | Purpose |
| :--- | :--- | :--- | :--- |
| **Background** | `--background` | `#050505` | Deep cinema darkness |
| **Surface** | `--surface` | `#101010` | Section backgrounds and panels |
| **Card** | `--card` | `#171717` | Movie cards and container backgrounds |
| **Primary** | `--primary` | `#E50914` | Netflix-style Crimson Red accent |
| **Primary Dark** | `--primary-dark` | `#9F0712` | Deep crimson for hovers and shadows |
| **Gold** | `--gold` | `#F5C542` | Premium theatrical gold for ratings & rewards |
| **Ember** | `--ember` | `#FF7A1A` | Warm secondary glow |
| **Text** | `--text` | `#F8FAFC` | Off-white for high readability |
| **Muted** | `--muted` | `#A1A1AA` | Secondary and descriptive texts |
| **Border** | `--border` | `#2A2A2A` | Hard geometric separator borders |

---

## 📐 Geometry & Spacing

*   **Border Radius:** Strict 2px sharp corners for buttons, cards, and input fields to maintain a premium, technical cinema frame aesthetic.
*   **Border Width:** Solid 1px or 2px rules. No soft gradients for borders.
*   **Spacing Grid:** Strict 8px (0.5rem) increment scale for layout consistency.

---

## 🎭 Motion & Transitions

*   **Film Grain Overlay:** A subtle, hardware-accelerated looping noise overlay to simulate classic film reels.
*   **Radial Glow Effects:** Cinematic background spotlights (`radial-gradient`) in Crimson and Gold to create depth.
*   **Micro-interactions:** Interactive elements (buttons, movie cards) scale up slightly with spring-like physics and cast localized glows.
*   **Scroll Reveals:** Sections utilize Framer Motion to fade/slide up organically as they enter the viewport.
