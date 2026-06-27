# CarComfortScore — Project Guide

Next.js 14 (App Router) **static site** ranking car ride comfort for Pakistan, hosted on Vercel.
Live: https://car-comfort-score.vercel.app/

## Commands
- `npm run dev` — local dev server at http://localhost:3000 (hot reload). **Use this to preview changes privately before they go live.**
- `npm run build` — production build (static export to `out/`). Run this if unsure a change compiles.
- `npm start` — serve a production build locally (rarely needed).

## ⚠️ Golden rule: never push to `main` untested
`main` = **production**. Every push to `main` auto-deploys to customers in ~1–2 minutes.
Before pushing to `main`, the change MUST be tested one of two ways:
1. **Local:** `npm run dev` → verify at http://localhost:3000
2. **Preview:** commit on a feature branch and `git push -u origin <branch>` → Vercel builds a **private preview URL**. Production stays untouched until the branch is merged into `main`.

When asked to push to `main`, confirm testing was done first (or do it). Prefer the preview-branch route for anything non-trivial.

## Before ANY push — account check
The repo is under the **Ansmou** GitHub account, but this machine also has an **AIDEAI** account that only has *read* access. Verify before pushing:
```
gh api user --jq .login   # must print "Ansmou"
```
If it prints `AIDEAI`, run `gh auth switch -u Ansmou` first, or the push is rejected.

> A `.githooks/pre-push` hook enforces the test reminder on `main`. One-time setup after a fresh clone: `git config core.hooksPath .githooks`

## Architecture & hard constraints
- **Static export** (`next.config.js` → `output: 'export'`). The site is 100% static HTML built at deploy time, so there is **NO runtime server**:
  - No `getServerSideProps`, no server-side API routes, no middleware, no ISR/on-demand revalidation.
  - Images are unoptimized (`images.unoptimized = true`).
  - Dynamic routes must export `generateStaticParams` (see `app/blog/[slug]/page.jsx`).
  - `trailingSlash: true` — all URLs end in `/`.
- **Routes** live in `app/` (App Router); interactive UI is in client components under `components/` (`*Client.jsx`).
- **Content/data** lives in `data/cars.js` (car rankings) and `data/articles.js` (blog posts). There is no database — edit these files to add cars or articles.

## Conventions
- JavaScript + JSX (no TypeScript).
- Keep every new page static-export-safe (no server-only code).
- After editing anything in `data/`, run `npm run build` once to confirm static generation still succeeds.
