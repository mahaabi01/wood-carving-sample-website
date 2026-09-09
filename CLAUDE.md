# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Next.js 15 (App Router) e-commerce/marketing site for Om Wood Carving, a Nepali/Indian temple-style wood carving business. Public storefront + a custom-built admin panel (no third-party CMS), backed by PostgreSQL via Prisma.

## Commands

```bash
npm run dev      # start dev server, bound to 0.0.0.0 (not just localhost)
npm run build    # production build
npm run start    # run production build
npm run lint     # next lint
```

Prisma (schema at `prisma/schema.prisma`, seed at `prisma/seed.ts`):

```bash
npx prisma generate         # regenerate client (also runs automatically on `npm install` via postinstall)
npx prisma migrate dev      # create/apply a migration in development
npx prisma db seed          # run prisma/seed.ts
npx prisma studio           # browse the database
```

There is no test suite configured in this repo.

## Architecture

**Auth is hand-rolled, not NextAuth**, despite `next-auth` being a dependency — it is unused. Admin login is `POST /api/auth/login` (`src/app/api/auth/login/route.ts`): validates credentials with `bcryptjs` against `User.password`, requires `role === "ADMIN"`, and signs a JWT (`jsonwebtoken`) into an httpOnly `admin-token` cookie. `src/middleware.ts` gates every `/admin/*` route (except `/admin/login`) by checking only for the *presence* of that cookie — it does not verify the JWT — and redirects bare `/admin` to `/admin/dashboard`.

**Data layer**: Prisma + PostgreSQL. `src/lib/prisma.ts` exports a singleton `PrismaClient` cached on `globalThis` in dev to survive HMR. The schema (`prisma/schema.prisma`) covers: users/accounts/sessions (NextAuth-shaped tables exist but are effectively unused by the current login flow), categories & products (with `ProductImage`), orders & order items, blog posts, heritage articles, videos, gallery categories/items, team members, contact messages, site settings, testimonials, and projects (with `ProjectImage`) — most content models have a `published` boolean and many have `featured`, since the public site only shows published rows while the admin `?all=true` query param reveals everything.

**API routes** (`src/app/api/**/route.ts`) follow a consistent REST-ish pattern per resource: collection route does `GET` (list, filtered by `published` unless `all=true`) + `POST` (create), `[id]/route.ts` does `GET`/`PUT`/`PATCH`/`DELETE` for one record. Handlers generate slugs from the title/name (lowercased, non-alphanumerics replaced with `-`), check for slug collisions before insert, and return `{ message }` JSON on errors. Not every Prisma model in the schema has a corresponding API route yet (e.g. products/orders/blog/team/gallery admin pages currently exist as UI but may not have matching routes) — check `src/app/api` before assuming an endpoint exists.

**Image uploads** go through Cloudinary (`src/services/cloudinaryConfig.ts`, `uploadToCloudinary`/`deleteFromCloudinary`), not local file storage; `next.config.ts` allow-lists `res.cloudinary.com` and `images.unsplash.com` as remote image sources.

**Admin panel** (`src/app/admin/**`) is a client-rendered dashboard (`layout.tsx` is `"use client"`) sharing one sidebar/topbar shell across all admin pages, with the login page opted out of that chrome. Each resource (categories, products, orders, testimonials, projects, team, blog) has its own `page.tsx` under `src/app/admin/<resource>/` that talks to the corresponding `/api/<resource>` route.

**Public site** (`src/app/**` minus `admin`/`api`) is a set of route-per-page marketing/storefront pages (shop, projects, gallery, heritage, blog, team, testimonials, about, contact, video), most with `[slug]`/`[id]` detail routes, sharing `LayoutWrapper`/`Navbar`/`Footer` from `src/components`.

**Cart state** is client-only via Zustand (`src/store/cart.ts`), persisted to localStorage under the `omwood-cart` key — there is no server-side cart; checkout presumably posts a completed cart to an orders endpoint.

**Styling**: Tailwind CSS v4 (via `@tailwindcss/postcss`), `framer-motion` for animation, `lucide-react` for icons.

**Path alias**: `@/*` maps to `src/*` (see `tsconfig.json`).

## Notes

- `next.config.ts` sets `eslint.ignoreDuringBuilds: true`, so `next build` will not fail on lint errors — run `npm run lint` separately to catch issues.
- Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) are set globally in `next.config.ts`.
- Required env vars are documented in `.env.example`: `DATABASE_URL`, `JWT_SECRET`, `NEXTAUTH_SECRET`/`NEXTAUTH_URL`, SMTP (`EMAIL_*`, used by `src/services/sendMail.ts` via nodemailer), and `CLOUDINARY_*`.
