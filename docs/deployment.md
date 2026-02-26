# Deployment

## Current setup

**Platform:** Cloudflare Workers (static assets binding; deploy via `wrangler deploy`)

**Build output:** `dist/` — static HTML, assets, Pagefind index, optional Worker entrypoint

**Deploy:** Cloudflare deploys on push to `main`. Configure build command `npm run build` and output directory `dist`.

## Vendor-specific pieces

| Item | Purpose |
|------|---------|
| `@astrojs/cloudflare` | Build output format for Workers/Pages |
| `wrangler.jsonc` | Worker config, asset binding |
| `npm run preview` | Local preview via `wrangler dev` |

The site is fully static (`getStaticPaths` everywhere). The adapter mainly affects build output and deployment — no KV, D1, or Workers APIs in app code.

## Vendor flexibility

To switch platforms (e.g. Vercel, Netlify):

1. **Adapter** — Swap `@astrojs/cloudflare` for target adapter (or `output: 'static'` if staying static).
2. **Config** — Replace `wrangler.jsonc` with platform config.
3. **Deploy** — Point CI/CD or platform dashboard at the new target.

Build command (`astro build && pagefind --site dist`) and app code stay the same.

**CI preview** uses `serve dist`, so QA is already platform-agnostic.
