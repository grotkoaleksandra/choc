# CLAUDE.md — CHOC

## Project Overview

CHOC is a magazine/editorial website with an e-commerce feature. It combines long-form articles with a curated product shop.

**Tech Stack:**
- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS v4
- Fonts: Geist Sans + Geist Mono (via next/font)

## Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Header + Footer
│   ├── page.tsx            # Homepage: featured article, recent articles, shop preview, newsletter
│   ├── globals.css         # Tailwind + CSS custom properties
│   ├── articles/
│   │   ├── page.tsx        # Articles listing
│   │   └── [slug]/page.tsx # Individual article page
│   ├── shop/page.tsx       # Product grid
│   └── about/page.tsx      # About page
├── components/
│   ├── Header.tsx          # Nav with mobile hamburger menu
│   ├── Footer.tsx          # Footer with links
│   ├── ArticleCard.tsx     # Reusable article preview card
│   └── ProductCard.tsx     # Reusable product card
```

## Development

```bash
npm run dev     # Start dev server (localhost:3000)
npm run build   # Production build
npm run lint    # ESLint
```

## Design System

- Color tokens: `--accent` (warm brown), `--muted` (gray), `--background`, `--foreground`
- Dark mode supported via `prefers-color-scheme`
- Typography: Geist Sans for body, clean editorial aesthetic
- Max content width: `max-w-7xl` (1280px)
- Article content: `max-w-3xl` (768px)

## Conventions

- Data is currently hardcoded in page files (articles, products)
- Image placeholders shown as gray boxes — replace with real images
- All pages are server components except Header (client component for mobile menu toggle)
