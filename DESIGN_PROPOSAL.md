# Inucode Dev Portfolio - Next.js Migration & Design System Proposal

## 1. System Architecture

We will transition the existing HTML/JS/CSS codebase to a **Next.js 14+ (App Router)** application. This ensures:
-   **Server-Side Rendering (SSR)** for better SEO and initial load performance.
-   **React Server Components (RSC)** to reduce client-side bundle size.
-   **Optimized Images** using `next/image`.
-   **Modular Codebase** for easier maintenance and scalability.

### Tech Stack
-   **Framework:** Next.js (App Router)
-   **UI Library:** React
-   **Styling:** Tailwind CSS
    -   Selected for "proper margin control" and flexibility.
    -   Configured with a custom theme to match the current brand (Gold/Black).
-   **Animations:**
    -   **GSAP (GreenSock):** For complex scroll-triggered animations and timelines.
    -   **@gsap/react:** For proper cleanup and React integration.
    -   **react-tsparticles:** For the particle background.
-   **Icons:** `react-icons` (includes FontAwesome, Material Design, etc.).

## 2. Design Philosophy: "Modern, Minimalistic, Classy"

To achieve a "classy" look while maintaining the "Inucode" identity:

1.  **Typography & Spacing (Margin Control):**
    -   **Fonts:** Retain *Poppins* (Body) and *Macondo* (Headings/Accents).
    -   **Whitespace:** Significantly increase section padding and inter-element spacing to create a "breathable" layout.
    -   **Fluid Typography:** Use `clamp()` or Tailwind's responsive prefixes to ensure text scales perfectly across devices.

2.  **Color Palette (Refined):**
    -   **Primary Gold:** `#ffd700` (Used sparingly for emphasis, not everywhere).
    -   **Backgrounds:** Deep matte blacks (`#0a0a0a`) and rich grays (`#111111`) instead of flat colors.
    -   **Glassmorphism:** Use `backdrop-blur` for the Navbar and Cards to add depth without clutter.

3.  **Visuals:**
    -   **Borders:** Thin, subtle gold borders (1px) with low opacity, glowing on hover.
    -   **Shadows:** Soft, colored shadows (`shadow-gold/20`) for depth.

## 3. Component Structure

The application will be broken down into modular components:

```
src/
├── app/
│   ├── layout.js       # Root layout (Fonts, Meta, Global Providers)
│   ├── page.js         # Main Landing Page (composes sections)
│   └── globals.css     # Tailwind directives & base styles
├── components/
│   ├── ui/             # Reusable atoms
│   │   ├── Button.js
│   │   ├── SectionHeading.js
│   │   └── Card.js
│   ├── layout/         # Structural components
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   └── ParticleBackground.js
│   └── sections/       # Page sections
│       ├── Hero.js
│       ├── Services.js
│       ├── TechStack.js
│       ├── Projects.js
│       ├── Experience.js
│       └── Contact.js
├── hooks/
│   └── useScrollAnimation.js # Custom hook for GSAP
└── public/
    └── images/         # Static assets
```

## 4. Animation Strategy (GSAP)

Instead of `setInterval` loops (which impact performance), we will use:

1.  **ScrollTrigger:**
    -   Elements fade in and slide up gracefully as they enter the viewport.
    -   Staggered reveals for lists (e.g., Service Cards).
2.  **Micro-interactions:**
    -   **Hover:** Buttons fill with gold; Cards lift slightly with a glow.
    -   **Parallax:** Subtle movement of the Hero image and background particles on mouse move.
3.  **Page Load:**
    -   A minimalist Preloader (Logo pulse) -> Smooth transition to Hero.

## 5. Migration Steps

1.  **Setup:** Initialize Next.js project and configure Tailwind.
2.  **Assets:** Move images to `public/`.
3.  **Styles:** Port global CSS variables to `tailwind.config.js`.
4.  **Components:** Refactor HTML sections into React components, replacing `class` with Tailwind utility classes.
5.  **Logic:** Rewrite `script.js` animations using `useGSAP` hook inside components.

This system guarantees a high-performance, maintainable, and visually stunning portfolio.
