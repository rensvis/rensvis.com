# Analytics Architecture Specification (Umami Self-Hosted, Portable)

This document defines the analytics architecture for the developer blog using Umami, deployed via Railway with full portability to other providers.

Design goals:

* Privacy-friendly analytics
* Self-hosted
* Fully portable (no vendor lock-in)
* Infrastructure as code
* Easy migration to any provider

---

# Architecture Overview

Production architecture:

```id="arch1"
Cloudflare Pages (blog)
    ↓
analytics.rensvis.com
    ↓
Umami (Railway container)
    ↓
PostgreSQL (Railway managed)
```

Local development architecture:

```id="arch2"
Docker Compose
    ↓
Umami container
    ↓
PostgreSQL
```

---

# Folder Structure

Analytics infrastructure lives inside the main repo:

```id="fs1"
analytics/
  Dockerfile
  docker-compose.yml
  .env.example
  README.md
```

Purpose:

* Version-controlled infra
* Fully reproducible deployment
* Easy migration to other providers

---

# Environment Configuration

Required environment variables:

```env id="env1"
DATABASE_URL=
HASH_SALT=
```

Never hardcode secrets.

Production values are injected by Railway.

Local values are defined in `.env`.

Example `.env.example`:

```env id="env2"
DATABASE_URL=postgresql://user:password@localhost:5432/umami
HASH_SALT=generate-random-string
```

Generate salt:

```bash id="env3"
openssl rand -base64 32
```

---

# Docker Configuration

Dockerfile:

```dockerfile id="docker1"
FROM ghcr.io/umami-software/umami:postgresql-latest

ENV DATABASE_TYPE=postgresql
```

No provider-specific configuration included.

This ensures portability.

---

# Local Development Configuration

docker-compose.yml:

```yaml id="docker2"
version: "3"

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: umami
      POSTGRES_USER: umami
      POSTGRES_PASSWORD: umami
    ports:
      - "5432:5432"

  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    ports:
      - "3000:3000"
    env_file:
      - .env
    depends_on:
      - postgres
```

Run locally:

```bash id="docker3"
docker compose up
```

Access:

```id="docker4"
http://localhost:3000
```

---

# Railway Deployment

Authenticate:

```bash id="rail1"
railway login
```

Initialize project:

```bash id="rail2"
railway init
```

Add PostgreSQL:

```bash id="rail3"
railway add
```

Deploy:

```bash id="rail4"
railway up
```

Railway injects required environment variables automatically.

---

# Domain Configuration

Production domain:

```id="domain1"
analytics.rensvis.com
```

Configured via:

* Railway domain settings
* Cloudflare DNS

SSL handled automatically.

---

# Astro Integration

Umami script added to base layout:

```astro id="astro1"
<script
  async
  defer
  src={import.meta.env.PUBLIC_UMAMI_SCRIPT_URL}
  data-website-id={import.meta.env.PUBLIC_UMAMI_WEBSITE_ID}
/>
```

Cloudflare Pages environment variables:

```env id="astro2"
PUBLIC_UMAMI_SCRIPT_URL=https://analytics.rensvis.com/script.js
PUBLIC_UMAMI_WEBSITE_ID=your-website-id
```

---

# Portability Guarantees

This design allows deployment to any provider:

Supported environments:

* Railway
* VPS (Docker)
* Fly.io
* DigitalOcean
* Hetzner
* Render
* Kubernetes

Migration requires only:

```bash id="portable1"
docker run \
  -e DATABASE_URL=... \
  -e HASH_SALT=... \
  ghcr.io/umami-software/umami:postgresql-latest
```

No code changes required.

---

# Security Considerations

Required practices:

* Never commit `.env`
* Use strong HASH_SALT
* Use SSL domain
* Restrict database access

Optional future:

* Private network database access
* Firewall restrictions

---

# Operational Model

Deployment responsibilities:

Railway:

* container runtime
* database
* scaling
* uptime

Repo:

* configuration
* reproducibility
* portability

Cloudflare Pages:

* blog hosting
* analytics script integration

---

# Future Improvements (Optional)

Not required initially:

* GitHub → Railway auto deploy
* Database backups
* Monitoring alerts

Architecture already supports these.

---

# Summary

This analytics system provides:

* Fully self-hosted analytics
* Privacy-focused tracking
* Zero vendor lock-in
* Fully portable Docker deployment
* Infrastructure as code
* Seamless integration with Astro blog

Deployment target:

```id="summary1"
analytics.rensvis.com
```

Managed via Railway with full migration flexibility.
