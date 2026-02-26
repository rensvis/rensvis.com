# Umami Analytics

Self-hosted, privacy-friendly analytics for rensvis.com. Deployed via Railway with full portability to other providers.

## Local Development

1. Copy `.env.example` to `.env` and set values:

   ```sh
   cp .env.example .env
   ```

2. Generate `APP_SECRET`:

   ```sh
   openssl rand -base64 32
   ```

3. Run:

   ```sh
   docker compose up
   ```

4. Access Umami at http://localhost:3000

5. Create admin account and add a website. Copy the website ID for `PUBLIC_UMAMI_WEBSITE_ID`.

## Railway Deployment

1. Authenticate:

   ```sh
   railway login
   ```

2. Initialize project:

   ```sh
   railway init
   ```

3. Add PostgreSQL:

   ```sh
   railway add
   ```

4. Set `APP_SECRET` in Railway dashboard (or `railway variables`).

5. Deploy:

   ```sh
   railway up
   ```

Railway injects `DATABASE_URL` automatically when PostgreSQL is added.

## Domain

Production: `https://analytics.rensvis.com`

Configure via:

- Railway domain settings
- Cloudflare DNS (CNAME `analytics.rensvis.com` → Railway)

## Cloudflare Pages (Blog)

Set these environment variables for the blog:

| Variable | Description |
|----------|-------------|
| `PUBLIC_UMAMI_SCRIPT_URL` | `https://analytics.rensvis.com/script.js` (or override if needed) |
| `PUBLIC_UMAMI_WEBSITE_ID` | Website ID from Umami dashboard |
