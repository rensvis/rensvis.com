# rensvis.com

Personal developer blog built with Astro, React, MDX, Tailwind, and shadcn/ui.

## Stack

- **Framework**: Astro
- **UI**: React, Tailwind CSS, shadcn/ui
- **Content**: MDX via Astro Content Collections
- **Deploy**: Cloudflare Pages

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro check` | Run TypeScript/type check |

## Project Structure

```
src/
├── content/articles/   # MDX articles
├── components/
│   ├── ui/             # shadcn components
│   ├── article/        # Article-specific components
│   └── layout/         # Header, Footer, etc.
├── layouts/
├── lib/
│   ├── site.ts         # Site config (url, name, description)
│   └── utils.ts        # Utilities
└── pages/
```

## Development

```sh
npm install
npm run dev
```

## Environment Variables

Optional, for deployment:

| Variable | Description |
|----------|-------------|
| `PUBLIC_UMAMI_WEBSITE_ID` | Umami analytics website ID (enables tracking) |
| `PUBLIC_UMAMI_SCRIPT_URL` | Umami script URL (default: `https://analytics.rensvis.com/script.js`) |
