# Authentication Setup Guide

This guide will help you set up Supabase authentication for RageCloud.

## Prerequisites

- Supabase project created (free tier available at supabase.com)
- Environment variables configured

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create a free account
3. Click "New Project"
4. Fill in project details:
   - **Name**: ragecloud
   - **Password**: Generate a secure password
   - **Region**: Choose closest to your users
5. Wait for project to initialize (2-3 minutes)

## Step 2: Get Your Credentials

1. Go to **Settings → API** in your Supabase project
2. Copy these values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_KEY`
3. Add to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
```

## Step 3: Run Database Migration

1. Go to **SQL Editor** in Supabase
2. Click **New Query**
3. Copy the contents of `/supabase/migrations/001_init_schema.sql`
4. Paste into the SQL editor
5. Click **Run**
6. Wait for migration to complete

This creates all tables: users, products, categories, orders, downloads, reviews, wishlist, etc.

## Step 4: Enable OAuth Providers (Optional)

To use Google/Apple login, you need to configure OAuth:

### Google Sign-In

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable **Google+ API**
4. Create **OAuth 2.0 Credentials**:
   - Application type: Web
   - Authorized redirect URIs: Add `https://your-project.supabase.co/auth/v1/callback`
5. Copy **Client ID** and **Client Secret**
6. In Supabase → **Authentication → Providers → Google**:
   - Enable Google
   - Paste Client ID and Client Secret
   - Save

### Apple Sign-In

1. Go to [Apple Developer](https://developer.apple.com/)
2. Create a new Service ID
3. Configure Sign in with Apple
4. Get **Client ID** and **Key**
5. In Supabase → **Authentication → Providers → Apple**:
   - Enable Apple
   - Paste credentials
   - Save

## Step 5: Configure Email Settings

1. Go to **Authentication → Email Templates**
2. Customize email templates for:
   - Confirmation email
   - Password reset email
   - Magic link email
3. These are sent to users automatically

## Step 6: Set Redirect URLs

These tell Supabase where to redirect after authentication:

1. Go to **Authentication → URL Configuration**
2. Add these URLs:
   - Site URL: `http://localhost:3000` (development)
   - Redirect URLs:
     - `http://localhost:3000/auth/callback`
     - `http://localhost:3000/dashboard`
     - `http://localhost:3000/login`
     - `http://localhost:3000/verify-email`

For production, add your domain:
- Site URL: `https://ragecloud.xyz`
- Redirect URLs: Update with production URLs

## Step 7: Test Authentication

1. Start dev server: `npm run dev`
2. Open http://localhost:3000/signup
3. Try signing up with:
   - Email and password
   - Google account
   - Apple account (if configured)
4. Check your email for verification link
5. Click link to verify email
6. You should be redirected to dashboard

## Testing Workflows

### Email/Password Signup
1. Go to `/signup`
2. Enter username, email, password
3. Accept terms
4. Click "Create Account"
5. Check email for verification link
6. Click link
7. Success! Redirect to dashboard

### Email/Password Login
1. Go to `/login`
2. Enter email and password
3. Optionally check "Remember me"
4. Click "Sign In"
5. Redirect to dashboard

### Forgot Password
1. Go to `/forgot-password`
2. Enter email
3. Check email for reset link
4. Click link (in email)
5. Enter new password
6. Login with new password

### Google/Apple OAuth
1. Go to `/signup` or `/login`
2. Click "Continue with Google/Apple"
3. Authorize app
4. Account created/logged in automatically
5. Redirect to dashboard

## Troubleshooting

### "Invalid credentials" error
- Check `.env.local` has correct Supabase URL and keys
- Restart dev server after updating env

### OAuth not working
- Verify redirect URLs configured in Supabase
- Check OAuth provider credentials are correct
- Ensure OAuth is enabled in Supabase dashboard

### Email not received
- Check spam folder
- Verify email templates are configured
- Check Supabase logs for errors

### User not appearing in database
- Check the `users` table in Supabase (SQL Editor)
- Verify database migration ran successfully
- Check auth logs for errors

## Database Schema

The migration creates:

| Table | Purpose |
|-------|---------|
| `users` | User profiles (extends auth) |
| `products` | Digital products |
| `categories` | Product categories |
| `orders` | Customer orders |
| `order_items` | Items in each order |
| `downloads` | User download access |
| `reviews` | Product reviews |
| `wishlist` | Saved products |
| `carts` | Shopping cart |
| `notifications` | User notifications |
| `coupons` | Discount codes |

All tables have Row-Level Security (RLS) to protect user data.

## Row-Level Security (RLS)

RLS policies ensure:
- Users can only see their own orders, downloads, wishlist, cart
- Products are visible only if not hidden
- Reviews are public but only users can edit their own
- Admins can edit products

Policies are automatically created by the migration.

## Next Steps

1. ✅ Authentication pages created
2. 🔄 **Now**: Set up Supabase and run migration
3. 📦 Build shopping cart
4. 💳 Integrate Razorpay payments
5. 🛍️ Create product detail pages
6. 👨‍💼 Build admin dashboard

## Need Help?

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Authentication](https://supabase.com/docs/guides/auth)
- [Email Configuration](https://supabase.com/docs/guides/auth/auth-smtp)
- [OAuth Providers](https://supabase.com/docs/guides/auth/social-login)

---

**Continue to the next phase once authentication is working!**
