# Super Simple Cloudflare + D1 Setup

## 1. Upload to GitHub
Upload everything in this ZIP to your GitHub repository.

## 2. Create Cloudflare Pages project
Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect GitHub.

Settings:

```text
Build command: leave empty
Build output directory: .
```

Deploy once.

## 3. Create D1 database
Cloudflare Dashboard → Workers & Pages → D1 → Create database.

Name:

```text
japan-trip-2026-db
```

## 4. Create table
Open the D1 database console and paste `schema.sql`, then run it.

## 5. Add D1 binding
Go to your Pages project → Settings → Bindings → Add binding → D1 database.

Use exactly:

```text
Variable name: DB
D1 database: japan-trip-2026-db
```

## 6. Redeploy
Go to Deployments → Retry deployment / Redeploy.

## 7. Test
Visit:

```text
https://your-site.pages.dev/api/health
```

If it says `database: connected`, D1 is working.

Your spending tracker will now sync through D1. If the API is offline, it falls back to browser localStorage.
