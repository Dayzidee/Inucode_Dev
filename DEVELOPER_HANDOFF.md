# Developer Handoff Guide: Inucode Portfolio Migration

## 1. Project Overview
**Objective:** Migrate an existing HTML/JS/CSS portfolio to a modern, scalable full-stack application.
**Goal:** Create a "Classy, Modern, Minimalistic" portfolio with complex animations (GSAP) and a robust backend for content management.
**Current State:** The project foundation has been scaffolded. Legacy code is archived. The file structure for both Frontend (Next.js) and Backend (NestJS) is in place.

---

## 2. Tech Stack

### Frontend (User Interface)
-   **Framework:** Next.js 14+ (App Router)
-   **Styling:** Tailwind CSS (Custom "Gold/Black" theme configured)
-   **Animations:** GSAP (`@gsap/react`), tsParticles (`@tsparticles/react`)
-   **Icons:** `react-icons`
-   **Fonts:** Poppins (Body), Macondo (Accent) - Configured in `app/layout.js`

### Backend (API & Admin)
-   **Framework:** NestJS (Modular Monolith Architecture)
-   **Language:** TypeScript
-   **Database:** PostgreSQL
-   **ORM:** Prisma
-   **Documentation:** Swagger (OpenAPI)
-   **Storage:** AWS S3 / Cloudinary (planned)

---

## 3. Directory Structure & Key Files

| Path | Description |
| :--- | :--- |
| `_legacy/` | Contains the original `index.html`, `style.css`, and `script.js` for reference. |
| `app/` | Next.js App Router source. Contains `layout.js`, `page.js`, `globals.css`. |
| `components/` | Scaffolding for UI components (`ui/`, `layout/`, `sections/`). Currently empty. |
| `backend/` | Root of the NestJS application. |
| `backend/src/` | Backend source code (`app.module.ts`, `main.ts`). |
| `backend/prisma/` | Contains `schema.prisma` with User, Post, Media models defined. |
| `ANALYSIS.md` | Detailed critique of the legacy project. |
| `DESIGN_PROPOSAL.md` | **Critical:** Contains the Frontend Component hierarchy and Animation strategy. |
| `BACKEND_ARCHITECTURE.md` | **Critical:** Contains the Backend Module breakdown and API strategy. |

---

## 4. Implementation Roadmap (Task List for AI Agent)

### Phase 1: Frontend Development (Priority: High)
*Refer to `DESIGN_PROPOSAL.md` for design philosophy.*
1.  **Component Migration:**
    -   Create `components/layout/Navbar.js`: Implement the sticky nav with the blurry glass effect (`backdrop-blur`).
    -   Create `components/sections/Hero.js`: Recreate the hero section using Tailwind. Use `useGSAP` for the entrance animations.
    -   Create `components/sections/Services.js`: Implement the cards with hover effects (`shadow-glow`).
2.  **Animation Integration:**
    -   Replace the legacy `setInterval` loops with **GSAP Timelines**.
    -   Implement the Particle Background using the `@tsparticles/react` component (ensure you use the configuration from `_legacy/script.js` as a baseline).

### Phase 2: Backend Development
*Refer to `BACKEND_ARCHITECTURE.md` for module details.*
1.  **Database Setup:**
    -   Run `npx prisma generate` and `npx prisma migrate dev` (requires a running Postgres instance).
2.  **Auth Module:**
    -   Implement JWT strategy and Login endpoint in `backend/src/auth/`.
    -   Seed a `SUPER_ADMIN` user.
3.  **Content Module:**
    -   Implement CRUD for `Post` model (Projects/Blogs).
    -   Create endpoints in `backend/src/content/`.

### Phase 3: Integration
1.  **Data Fetching:**
    -   Update Next.js `app/page.js` to fetch Projects and Services from the NestJS API (Server Components).
2.  **Admin Dashboard:**
    -   Create a protected route `/admin` in Next.js.
    -   Build a simple dashboard to manage Posts (Create/Edit/Delete).

---

## 5. Design Guidelines (Strict)
-   **Margin Control:** Use generous padding (e.g., `py-20`, `gap-8`) to maintain a "clean" look. Avoid clutter.
-   **Typography:** Use `font-accent` (Macondo) for headings and `font-sans` (Poppins) for body text.
-   **Colors:** strict adherence to `tailwind.config.js` colors.
    -   Background: `bg-black` or `bg-gradient-bg`.
    -   Text: `text-white` or `text-gray-300`.
    -   Accent: `text-gold` (Use sparingly for impact).
-   **Micro-interactions:** Every interactive element (button, card) must have a hover state (scale, glow, color shift).

---

## 6. Where to Find Prebuilt Structures
-   **Frontend Scaffolding:** `app/page.js` contains a basic example of the Hero section's HTML structure converted to Tailwind.
-   **Backend Models:** `backend/prisma/schema.prisma` already defines the data models you need to implement.
-   **Legacy Styles:** `app/globals.css` includes the ported keyframe animations (`glow`, `float`, `pulse`).

**Note:** The previous agent has already set up the build tools (`package.json`, `tsconfig`, etc.). You do not need to reinstall dependencies unless adding new ones.
