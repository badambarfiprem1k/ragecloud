# RageCloud – Premium Digital Marketplace

A professional Next.js digital marketplace for Minecraft plugins, mods, skripts, and digital assets.

## 🚀 Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase
- **Payments**: Razorpay
- **Hosting**: Vercel (with GitHub integration)

## 📋 Project Structure

```
app/                 # Next.js app directory (pages, layouts, routes)
components/          # Reusable React components
lib/                 # Utility functions and external services
hooks/               # Custom React hooks
utils/               # Helper functions
types/               # TypeScript type definitions
styles/              # Global CSS
supabase/            # Supabase migrations and schemas
public/              # Static files
```

## 🔧 Setup Instructions

### Step 1: Install Dependencies

```bash
npm install
```

This installs all required packages listed in `package.json`.

### Step 2: Set Up Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your actual values:

```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_KEY=your_service_key
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_test_key
RAZORPAY_SECRET_KEY=your_test_secret
```

**Note**: We use `NEXT_PUBLIC_` prefix for client-side variables. Never expose sensitive keys.

### Step 3: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## 📦 Development Workflow

1. **Code**: Make changes locally
2. **Test**: Run `npm run dev` and test on localhost
3. **Commit**: `git commit -m "feature: description"`
4. **Push**: `git push origin main`
5. **Deploy**: Vercel automatically deploys to preview URL
6. **Test Preview**: Test on the Vercel preview URL
7. **Fix**: If bugs found, repeat

## ✅ Testing Checklist

### Phase 1: Setup (Current)
- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] Dev server running

### Phase 2: Landing Page
- [ ] Hero section renders
- [ ] Navigation works
- [ ] Footer displays
- [ ] Responsive on mobile/tablet/desktop

### Phase 3: Authentication
- [ ] Sign up works
- [ ] Login works
- [ ] Email verification
- [ ] Forgot password flow

### Phase 4: Shop
- [ ] Products display
- [ ] Filters work
- [ ] Search works
- [ ] Add to cart

### Phase 5: Payments
- [ ] Cart displays correctly
- [ ] Razorpay test mode integration
- [ ] Payment success/failure handling
- [ ] Webhook verification

### Phase 6: Dashboard
- [ ] Purchase history displays
- [ ] Download links work
- [ ] Protected downloads

### Phase 7: Admin
- [ ] Upload products
- [ ] Manage orders
- [ ] Analytics

## 🔐 Security Notes

- Never commit `.env.local`
- Always use test keys during development
- Verify payments on backend (Razorpay webhooks)
- Protect download URLs
- Validate all API requests

## 📝 Development Rules

1. Build ONE feature at a time
2. Test after every feature
3. Small, organized commits
4. Never hardcode secrets
5. Follow TypeScript strict mode
6. Keep components reusable

## 🌐 Deployment

### Development (Vercel Preview)
- Automatically deploys on git push
- Test on preview URL
- No domain connection yet

### Production (After Full Testing)
- Connect `ragecloud.xyz`
- Configure SSL
- Enable production mode in Razorpay
- Go live

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Razorpay Docs](https://razorpay.com/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🎯 Current Status

✅ Project initialized
⏳ Setting up first features

Next step: Build landing page with navigation
