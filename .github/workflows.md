# GitHub

## Workflows

**ci.yml** — Runs QA on every push to `main` and every PR. Executes in parallel with Cloudflare Pages deployment (does not block it).

Steps: typecheck (`astro check`) → build (`npm run build`)

On failure: Fix in the next commit. See [docs/cicd.md](../docs/cicd.md) for details.
