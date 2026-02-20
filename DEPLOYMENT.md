# Deploy to Vercel + Connect Supabase

## 1. Supabase Setup

### Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → Sign in → **New Project**
2. Pick a name, set a database password, choose a region
3. Wait for the project to be created

### Get your connection string

1. In Supabase Dashboard → **Project Settings** (gear icon) → **Database**
2. Under **Connection string**, select **URI**
3. Copy the connection string. It looks like:
   ```
   postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```
4. Replace `[YOUR-PASSWORD]` with your database password
5. Add `?pgbouncer=true` to the end for serverless (recommended for Vercel)

**Final format (Transaction mode / port 6543):**
```
postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Alternative – Direct connection (port 5432):**
```
postgresql://postgres:[YOUR-PASSWORD]@db.[project-ref].supabase.co:5432/postgres?sslmode=require
```

---

## 2. Environment Variables (.env.local)

Create `.env.local` in the project root:

```env
# Supabase Postgres (use the connection string from step 1)
DATABASE_URL="postgresql://postgres.[ref]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Auth (run: openssl rand -base64 32)
AUTH_SECRET="your-generated-secret"

# Local dev
NEXTAUTH_URL="http://localhost:3000"

# Stripe (optional for local testing)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

Run locally:
```bash
npm run db:push
npm run dev
```

---

## 3. Deploy to Vercel

### Push to GitHub

```bash
cd techstack-app
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Import in Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New** → **Project**
2. **Import** your GitHub repo
3. **Root Directory**: set to `techstack-app` if the repo root contains it, or `.` if the repo root is the app
4. **Framework Preset**: Next.js
5. Before deploying, add environment variables

### Add environment variables in Vercel

Project → **Settings** → **Environment Variables**:

| Name | Value | Notes |
|------|-------|-------|
| `DATABASE_URL` | Your Supabase connection string | Same as step 1 |
| `AUTH_SECRET` | `openssl rand -base64 32` | Same as local |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | Replace with your Vercel URL |
| `STRIPE_SECRET_KEY` | `sk_live_...` or `sk_test_...` | From Stripe Dashboard |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | From Stripe webhook (step 4) |

### Deploy

1. Click **Deploy** (or push to `main` to trigger auto deploy)
2. After the first deploy, run migrations from your machine:
   ```bash
   DATABASE_URL="your-supabase-url" npx prisma db push
   ```
   Or:
   ```bash
   DATABASE_URL="your-supabase-url" npx prisma migrate deploy
   ```

---

## 4. Stripe webhook (optional)

1. Stripe Dashboard → **Developers** → **Webhooks** → **Add endpoint**
2. **Endpoint URL**: `https://your-app.vercel.app/api/stripe/webhook`
3. **Events**: `checkout.session.completed`
4. Copy the **Signing secret** and add it as `STRIPE_WEBHOOK_SECRET` in Vercel

---

## 5. Checklist

- [ ] Supabase project created
- [ ] `DATABASE_URL` in Vercel points to Supabase
- [ ] `AUTH_SECRET` and `NEXTAUTH_URL` set in Vercel
- [ ] Migrations run (`prisma db push` or `migrate deploy`)
- [ ] App loads at your Vercel URL
- [ ] Register / login works
- [ ] Dashboard is accessible when logged in
