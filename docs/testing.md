# Testing and Quality Assurance Specification

This document defines automated testing and quality checks for the developer blog, focusing on accessibility, performance, SEO, and build integrity.

---

# Goals

Ensure every deployment meets professional quality standards:

* Accessibility compliance (WCAG)
* Lighthouse scores ≥ 95
* No build or type errors
* No accessibility regressions
* Fully automated CI validation

---

# Tooling Overview

| Purpose                          | Tool                     | Reason                     |
| -------------------------------- | ------------------------ | -------------------------- |
| Build validation                 | TypeScript + Astro build | Ensures site compiles      |
| Accessibility testing            | Playwright + axe-core    | Most accurate a11y testing |
| Performance, SEO, best practices | Lighthouse CI            | Industry standard          |
| End-to-end validation            | Playwright               | Tests real browser output  |

---

# 1. Build Validation

Run build check:

```bash
npm run build
```

Ensures:

* Astro compiles successfully
* Content collections are valid
* No type errors

This must pass before deployment.

---

# 2. Accessibility Testing (Playwright + axe)

## Install

```bash
npm install -D @playwright/test axe-core @axe-core/playwright
```

## Example test

Create:

```bash
tests/a11y.spec.ts
```

```ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('homepage has no accessibility violations', async ({ page }) => {
  await page.goto('http://localhost:4321')

  const results = await new AxeBuilder({ page }).analyze()

  expect(results.violations).toEqual([])
})
```

This fails CI if accessibility violations exist.

---

# 3. Lighthouse Testing (Lighthouse CI)

## Install

```bash
npm install -D @lhci/cli
```

## Config

Create:

```bash
lighthouserc.json
```

```json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:4321"],
      "startServerCommand": "npm run preview"
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.95 }],
        "categories:accessibility": ["error", { "minScore": 1 }],
        "categories:seo": ["error", { "minScore": 1 }],
        "categories:best-practices": ["error", { "minScore": 1 }]
      }
    }
  }
}
```

Run:

```bash
npx lhci autorun
```

CI fails if scores fall below thresholds.

---

# 4. Test Scripts

Add to:

```json
package.json
```

```json
{
  "scripts": {
    "build": "astro build && pagefind --site dist",
    "preview": "astro preview",
    "test:a11y": "playwright test",
    "test:lighthouse": "lhci autorun",
    "test": "npm run test:a11y && npm run test:lighthouse"
  }
}
```

---

# 5. CI Integration (GitHub Actions)

Create:

```bash
.github/workflows/ci.yml
```

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm install

      - run: npm run build

      - run: npx playwright install --with-deps

      - run: npm run preview &
      - run: npx wait-on http://localhost:4321

      - run: npm run test
```

CI fails automatically on:

* Accessibility violations
* Lighthouse score regressions
* Build failures

---

# 6. Quality Gates

Required minimum scores:

| Category       | Minimum |
| -------------- | ------- |
| Performance    | 95      |
| Accessibility  | 100     |
| SEO            | 100     |
| Best Practices | 100     |

Accessibility violations must be zero.

---

# 7. When Tests Run

Tests run automatically:

* On every pull request
* On every push to main
* Before deployment

Prevents regressions from reaching production.

---

# Summary

This testing setup ensures:

* Professional accessibility compliance
* Consistently high Lighthouse scores
* Automated quality enforcement
* Reliable production deployments

Tooling used:

* Playwright
* axe-core
* Lighthouse CI
* GitHub Actions

All checks run automatically in CI.
