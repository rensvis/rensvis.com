# CI/CD

## Deploy flow

```
push to main → Cloudflare Pages deploys immediately
             → GitHub Actions runs QA in parallel
```

Cloudflare deploys on every push to `main`; there is no gate to stop it. GitHub Actions runs typecheck and build as a parallel QA signal.

## QA failure

If QA fails, fix in the next commit. The previous push may already be live. Use the [Actions](https://github.com/rensvis/rensvis.com/actions) tab to monitor status.

## Local QA

Before pushing:

```sh
npx astro check
npm run build
```
