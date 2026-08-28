# Next Step Freelance

Marketing site for Next Step Freelance, built with [Nuxt 4](https://nuxt.com).

## Project layout

- `app/pages` — routes (landing page, services, cases, about, contact)
- `app/components` — page sections and reusable cards
- `app/data` — static content (case studies)
- `app/utils` — small shared helpers, auto-imported by Nuxt
- `app/assets/css/main.css` — design tokens and shared layout primitives (`.section-box`, etc.)
- `public/logo` — brand marks; `public/team` — team member photos
- `scripts/recolor-logo.mjs` — one-off tool that recolours the source UCN logo art into the site's indigo palette

## Setup

Install dependencies:

```bash
npm install
```

## Development server

Starts on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

Pushes to `main` are deployed automatically via `.github/workflows/deploy.yml`, which SSHes into the server and runs `docker compose up -d` (see `docker-compose.yml` and `Caddyfile`).
