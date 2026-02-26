# CI/CD

## Deploy flow

```
push to main → Cloudflare Pages deploys immediately
             → GitHub Actions runs QA in parallel
```

Cloudflare deploys on every push to `main`; there is no gate to stop it. GitHub Actions runs typecheck and build as a parallel QA signal.

## Workflows

**ci.yml** — Runs QA on every push to `main` and every PR. Executes in parallel with Cloudflare Pages deployment (does not block it).

- Steps: typecheck (`astro check`) → build (`npm run build`)

## QA failure

If QA fails, fix in the next commit. The previous push may already be live. Use the [Actions](https://github.com/rensvis/rensvis.com/actions) tab to monitor status.

## Local QA

Before pushing:

```sh
npx astro check
npm run build
```
