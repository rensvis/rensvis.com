# Developer Blog — Design & Architecture Specification

## 1. Purpose

Primary goals:

* Demonstrate expertise and authority in frontend engineering
* Strengthen personal brand
* Improve SEO and AI discoverability
* Serve as a long-term knowledge base
* Provide portfolio of technical thinking and experience

Content focus areas:

* Angular
* Flutter
* Design systems
* UX engineering
* Frontend architecture
* Developer workflows in large organizations
* Performance and tooling
* Lifestyle (secondary category)

---

## 2. Core Principles

Design and architecture must prioritize:

* Content-first design
* Excellent readability
* Minimal visual noise
* Fast performance
* Long-term maintainability
* Strong SEO and AI crawlability
* Full control over content and components

---

## 3. Technology Stack

### Framework

* Astro (primary framework)
* React (component layer inside Astro)

Rationale:

* Best performance for content sites
* Native MDX support
* Minimal JavaScript output
* Excellent SEO characteristics

---

### Content

* MDX (primary content format)
* File-based content stored in Git
* Astro Content Collections

Content types:

* Articles (long-form and short-form)
* No separate "notes" system initially

Example structure:

```
/src/content/articles/
  article-slug.mdx
```

---

### Design System

Design system stack:

* Tailwind CSS
* shadcn/ui
* Radix UI primitives (via shadcn)
* Tailwind Typography plugin

Requirements:

* Fully customizable
* Accessible
* Minimal visual style
* No vendor lock-in
* Support for custom MDX components

---

### Components

Component types:

**Layout components**

* Header
* Footer
* Page layout
* Article layout

**Article components**

* Author block
* Callouts
* Code blocks
* Images
* Tags
* Featured indicator

**UI components**

* Buttons
* Cards
* Badges
* Navigation

---

## 4. Site Structure

URL structure:

```
/
/articles
/articles/[slug]
/tags/[tag]
/about
```

No separate author page. Author information appears:

* On About page
* On each article

---

## 5. Content Features

Each article supports:

Frontmatter fields:

```
title
description
date
tags
featured
```

Capabilities:

* Tags
* Featured articles
* Custom MDX components
* Images
* Code blocks with syntax highlighting

---

## 6. SEO Requirements

Must include:

* Static pre-rendered HTML
* Semantic HTML structure
* Meta tags
* OpenGraph tags
* Twitter cards
* Canonical URLs
* Sitemap.xml
* robots.txt
* RSS feed
* Structured data (JSON-LD Article schema)

Goals:

* Maximum search engine discoverability
* Maximum AI crawler compatibility

---

## 7. AI Indexing Optimization

Site must support:

* Clean semantic markup
* Fully static content
* Crawlable HTML (no client-only rendering)
* Stable URLs
* Sitemap.xml
* RSS feed

Optional future:

* llms.txt

---

## 8. Full-Text Search

Search system:

* Pagefind

Requirements:

* Fully static search index
* No backend required
* Full-text indexing of all articles
* Fast client-side search

---

## 9. Analytics

Analytics system:

* Umami (privacy-focused, open source)

Requirements:

* Privacy friendly
* No cookies required
* Lightweight
* Track page views and referrers

---

## 10. Image Handling

Requirements:

* Astro native image optimization
* Lazy loading
* Responsive images
* Optimized formats

---

## 11. Deployment

Deployment platform:

* Cloudflare Pages (primary)

Requirements:

* Automatic deployment via GitHub
* Global CDN distribution
* Fast deployment
* Zero backend required

Build output:

```
/dist
```

Build process:

```
astro build
pagefind --site dist
```

---

## 12. Performance Requirements

Targets:

* Lighthouse score ≥ 95
* Minimal JavaScript
* Fast first contentful paint
* Fast time to interactive

Astro island architecture used to minimize JS.

---

## 13. Design Requirements

Visual style:

* Minimal
* Professional
* Content-focused
* Excellent typography

UX requirements:

* Mobile-first design
* Fully responsive
* Dark mode support
* Fast navigation
* Clear reading hierarchy

---

## 14. Featured Articles System

Articles support:

```
featured: true
```

Used for:

* Homepage highlighting
* Featured section

---

## 15. Author Information

Author block displayed on each article.

Includes:

* Name
* Role
* Short bio
* Avatar
* External links (GitHub, LinkedIn, etc.)

Purpose:

* Reinforce credibility and authority

---

## 16. Newsletter Support (Future)

Planned for future integration.

Possible providers:

* ConvertKit
* Beehiiv
* Mailchimp

Not included in initial version.

---

## 17. CMS Support (Future)

Initial version uses Git-based MDX.

Future CMS integration possible via:

* Sanity
* Contentful
* Directus

Architecture designed to support later migration.

---

## 18. Folder Structure

```
/src
  /content/articles

  /components
    /ui
    /article
    /layout

  /layouts

  /pages

  /lib

/public
```

---

## 19. Deployment Flow

Deployment pipeline:

```
Git push → Cloudflare Pages build → Global CDN deploy
```

Build steps:

```
astro build
pagefind --site dist
```

---

## 20. Non-Goals (Initial Version)

Not included initially:

* CMS
* Comments system
* Multi-author support
* Newsletter integration

---

## 21. Summary

This architecture provides:

* Maximum performance
* Maximum SEO and AI discoverability
* Full control over design system
* Full MDX flexibility
* Minimal operational complexity
* Long-term scalability

Stack summary:

* Astro
* React
* MDX
* Tailwind
* shadcn/ui
* Pagefind
* Umami
* Cloudflare Pages

---

End of specification.
