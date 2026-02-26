# Image Handling

How we handle images for the author avatar, articles, and site assets.

---

## Overview

* **Astro Image** handles optimization at build time: responsive srcset, WebP/AVIF, lazy loading.
* **sharp-cli** is an optional pre-step to resize and convert sources before committing. Keeps the repo smaller and builds faster.

---

## Where to Put Images

| Use case | Location | Component |
| -------- | -------- | --------- |
| Author avatar | `src/assets/author.webp` | `AuthorBlock` |
| Article figures | `src/content/articles/<slug>/images/` or `src/assets/` | `Figure` |

Images must live under `src/` (not `public/`) to get Astro optimization. Import and pass to components.

---

## Optional: Pre-optimize with sharp-cli

Use before adding large source images. Resizes and converts to WebP to reduce repo size and build time.

**Install:** `sharp-cli` is a dev dependency.

**Resize and convert to WebP:**

```bash
npx sharp -i input.jpg -o output.webp resize 1600 -- -f webp -q 85
```

**Common use cases:**

```bash
# Author avatar (square, 384px max)
npx sharp -i photo.jpg -o src/assets/author.webp resize 384 384 -- -f webp -q 85

# Article image (max width 1600px)
npx sharp -i photo.jpg -o src/content/articles/my-article/images/hero.webp resize 1600 -- -f webp -q 85
```

**Output templates:** Use `{dir}`, `{name}`, `{ext}` for batch processing, e.g. `-o {dir}/{name}.webp`.

---

## Using Images in Code

**Author avatar** — import in `src/lib/author.ts`:

```ts
import authorImage from '@/assets/author.webp';

export const AUTHOR = {
  // ...
  avatar: authorImage,
} as const;
```

**Article figures** — import in MDX and pass to `Figure`:

```mdx
---
import Figure from '@/components/article/Figure.astro';
import hero from './images/hero.webp';
---
<Figure src={hero} alt="Description" caption="Optional caption" />
```

---

## Public Folder

Images in `public/` are served as-is with no optimization. Prefer `src/assets/` and Astro Image for author and article images.
