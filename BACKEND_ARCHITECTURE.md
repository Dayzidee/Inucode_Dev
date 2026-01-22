# Inucode Dev Portfolio - Backend System Architecture

## 1. Architectural Overview: Modular Monolith

To support a "multi-modular application" with distinct functional units (Admin, Dashboard, Media, Posts), we propose a **Modular Monolith Architecture** using **NestJS**.

This approach provides:
-   **Strict Boundaries:** Each feature (Auth, Media, Blog) is a self-contained module.
-   **Scalability:** Modules can be extracted into microservices later if needed.
-   **Maintainability:** Clear separation of concerns suitable for "modern" and "classy" engineering standards.

### Technology Stack
-   **Runtime:** Node.js
-   **Framework:** NestJS (TypeScript)
-   **Database:** PostgreSQL (Relational integrity for posts/users)
-   **ORM:** Prisma (Type-safe database access)
-   **Storage:** AWS S3 or Cloudinary (for optimized media hosting)
-   **Caching:** Redis (for Dashboard stats and Session management)

---

## 2. System Modules

The backend will be organized into the following distinct modules:

### A. Core Module (Shared Kernel)
-   **Config:** Centralized configuration (Env vars).
-   **Database:** Prisma Client instance.
-   **Logger:** System-wide logging.
-   **Interceptors:** Response transformation (Standardized API response format).

### B. Authentication & Authorization (IAM)
-   **Function:** Handles user identity and access control.
-   **Features:**
    -   JWT Strategy (Access & Refresh Tokens).
    -   RBAC (Role-Based Access Control): `SUPER_ADMIN`, `EDITOR`.
    -   Google/GitHub OAuth (optional).

### C. Content Management (CMS) Module
-   **Function:** Manages "Posts" (Projects, Blog Articles, Services).
-   **Features:**
    -   CRUD operations for Projects/Blogs.
    -   Draft/Publish workflow.
    -   Tagging and Categorization.
    -   Rich Text support (Markdown/JSON).

### D. Media Module
-   **Function:** Handles file uploads and processing.
-   **Features:**
    -   **Upload:** Secure signed URLs for direct upload or server-side piping.
    -   **Optimization:** Auto-resize/compress images (WebP format).
    -   **Management:** Gallery view, Delete, Organize in folders.

### E. Admin & Dashboard Module
-   **Function:** Aggregates data for the Admin UI.
-   **Features:**
    -   **Analytics:** Visitor counts, Top viewed projects (via integration with analytics tools or internal logs).
    -   **App Control:** Toggle "Maintenance Mode", Update "Hire Me" status dynamically.
    -   **Audit Logs:** Track who changed what (for security).

---

## 3. Database Schema Design (Prisma)

```prisma
// High-level schema concept

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      Role     @default(EDITOR)
  posts     Post[]
  logs      AuditLog[]
}

enum Role {
  SUPER_ADMIN
  EDITOR
}

model Post {
  id          String   @id @default(uuid())
  title       String
  slug        String   @unique
  content     String   // Markdown or JSON
  type        PostType // PROJECT or BLOG
  status      Status   @default(DRAFT)
  images      Media[]
  authorId    String
  author      User     @relation(fields: [authorId], references: [id])
  createdAt   DateTime @default(now())
}

model Media {
  id        String   @id @default(uuid())
  url       String
  type      String   // image/png, etc.
  postId    String?
  post      Post?    @relation(fields: [postId], references: [id])
}

model AppSetting {
  key       String   @id
  value     String   // JSON value
  description String?
}
```

---

## 4. API Structure (REST)

The API will expose the following endpoints, documented via Swagger:

-   `/api/v1/auth/login`
-   `/api/v1/admin/dashboard` (Stats)
-   `/api/v1/content/posts` (GET - Public)
-   `/api/v1/admin/posts` (POST/PUT/DELETE - Protected)
-   `/api/v1/media/upload` (Multipart)

---

## 5. Deployment & Infrastructure

-   **Dockerized:** Each service (App, DB, Redis) runs in containers.
-   **CI/CD:** GitHub Actions to build and deploy to a VPS (e.g., DigitalOcean, Railway) or Serverless (Vercel/AWS Lambda).
-   **Security:** Rate limiting (Throttler), Helmet (Headers), CORS configuration.

This architecture ensures your backend is as "classy" and robust as your frontend.
