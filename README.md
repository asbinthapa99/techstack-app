# TechStack Full-Stack App

Next.js 14+ App Router app with email/password auth, Postgres (Neon + Prisma), Stripe one-time payments, and a protected dashboard.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Auth**: NextAuth v5 (Credentials + JWT)
- **Database**: PostgreSQL via Neon + Prisma
- **Payments**: Stripe (one-time checkout + webhook)
- **Deploy**: Vercel

## Quick Start (Local)

### 1. Install dependencies

```bash
cd techstack-app
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in:

- `DATABASE_URL` — from [Neon](https://neon.tech) (or any Postgres)
- `AUTH_SECRET` — run `openssl rand -base64 32`
- `NEXTAUTH_URL` — `http://localhost:3000`
- `STRIPE_SECRET_KEY` — from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
- `STRIPE_WEBHOOK_SECRET` — from Stripe (see Webhook section below)

### 3. Create database and push schema

```bash
npm run db:push
```

### 4. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment (Vercel + Supabase)

For step-by-step instructions to connect Supabase and deploy to Vercel, see **[DEPLOYMENT.md](./DEPLOYMENT.md)**.

## Deployment (Vercel) – Summary

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Import project in Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New** → **Project**
2. Import your GitHub repo
3. Root Directory: `techstack-app` (or `.` if the repo root is the app)
4. Framework Preset: Next.js
5. Do **not** deploy yet — add env vars first.

### 3. Add environment variables in Vercel

Project → **Settings** → **Environment Variables**:

| Name                 | Value                                   |
|----------------------|-----------------------------------------|
| `DATABASE_URL`       | Supabase or Neon Postgres connection string |
| `AUTH_SECRET`        | `openssl rand -base64 32`               |
| `NEXTAUTH_URL`       | `https://your-app.vercel.app`           |
| `STRIPE_SECRET_KEY`  | `sk_live_...` (or `sk_test_...`)        |
| `STRIPE_WEBHOOK_SECRET` | From Stripe webhook (see below)     |

### 4. Set up Stripe webhook

1. Stripe Dashboard → **Developers** → **Webhooks** → **Add endpoint**
2. **Endpoint URL**: `https://your-app.vercel.app/api/stripe/webhook`
3. **Events**: `checkout.session.completed`
4. Copy the **Signing secret** (`whsec_...`) and add it as `STRIPE_WEBHOOK_SECRET` in Vercel.

### 5. Deploy

1. Trigger a deploy (push to `main` or **Redeploy**)
2. Run migrations before first deploy (or use `db:push` for prototyping):

   ```bash
   npx prisma migrate deploy
   # or, for quick schema sync: npx prisma db push
   ```

   For Vercel, run this once from your machine (with `DATABASE_URL` set) or add a post-deploy script.

---

## Checklist: Verify It Works

### Local

- [ ] `npm run dev` runs without errors
- [ ] Home page loads with migrated content
- [ ] Register → new user created
- [ ] Login → redirects to dashboard
- [ ] Dashboard shows user email and payment status
- [ ] Logout works
- [ ] Pricing page shows plans
- [ ] Checkout (test mode) redirects to Stripe and back

### Production

- [ ] App deploys on Vercel
- [ ] Register / Login / Logout work
- [ ] Dashboard is protected (redirects to login when not authenticated)
- [ ] Stripe checkout completes; webhook updates order status
- [ ] Dashboard shows "Paid" after successful payment

---

## Security Notes

- **Secrets**: Never expose `STRIPE_SECRET_KEY`, `AUTH_SECRET`, or `DATABASE_URL` to the browser. They are used only in API routes and server code.
- **Input validation**: Registration uses Zod; add validation to other APIs as needed.
- **Rate limiting**: For production, add rate limiting (e.g. Vercel KV + `@upstash/ratelimit` or similar) on `/api/auth/register`, `/api/auth/signin`, and `/api/stripe/checkout`.

---

## Folder structure

```
techstack-app/
├── prisma/
│   └── schema.prisma
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── auth/register/route.ts
│   │   │   ├── news/route.ts
│   │   │   └── stripe/
│   │   │       ├── checkout/route.ts
│   │   │       └── webhook/route.ts
│   │   ├── components/
│   │   ├── dashboard/page.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── pricing/page.tsx
│   │   └── page.tsx (home)
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── prisma.ts
│   │   └── stripe.ts
│   └── middleware.ts
└── .env.example
```
