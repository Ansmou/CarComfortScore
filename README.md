# CarComfortScore

Ride-comfort rankings for cars in Pakistan (2024–25) — a fast, fully static Next.js site.

**Live:** https://car-comfort-score.vercel.app/

## Tech stack
- [Next.js 14](https://nextjs.org/) (App Router), static export (`output: 'export'`)
- React 18, plain JSX
- Hosted on [Vercel](https://vercel.com/) with auto-deploy from the `main` branch

## Local development
```bash
npm install      # first time only
npm run dev      # http://localhost:3000
```

## Project structure
```
app/          Routes (App Router): home, /blog, /science, /why, sitemap, robots
components/    React components (interactive UI lives in *Client.jsx)
data/          Content: cars.js (rankings), articles.js (blog posts)
public/        Static assets (robots.txt, sitemap.xml)
```

## Editing content
- **Add or edit a car:** `data/cars.js`
- **Add or edit a blog post:** `data/articles.js`
- Then run `npm run build` to confirm it still builds.

## Deployment & workflow
Pushing to **`main`** auto-deploys to production. Pushing any **other branch** creates a private **preview** deployment you can review before merging. Full workflow and safety checklist: see [CLAUDE.md](CLAUDE.md).

> **One-time after cloning**, enable the pre-push test reminder:
> ```bash
> git config core.hooksPath .githooks
> ```
