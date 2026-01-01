# Deployment Troubleshooting Guide

## Common Issues & Solutions

### 1. Changes Not Appearing on Published Site

**Problem:** Changes work in v0 preview but don't appear after publishing to Vercel.

**Possible Causes:**

#### A. Browser Cache
- **Solution:** Hard refresh your browser (Ctrl+Shift+R on Windows/Linux, Cmd+Shift+R on Mac)
- Clear browser cache and cookies for your domain
- Try opening in incognito/private browsing mode

#### B. Vercel CDN Cache
- **Solution:** Go to your Vercel dashboard → Your Project → Deployments
- Find the latest deployment and click "Visit"
- Or add `?v=timestamp` to your URL to bypass cache (e.g., `yoursite.com?v=123`)

#### C. Build Errors
- **Check:** Vercel dashboard → Deployments → Latest deployment → View Function Logs
- Look for any red error messages during build
- Common errors:
  - TypeScript errors
  - Missing dependencies
  - Environment variables not set

#### D. Environment Variables Not Set in Production
- **Check:** Vercel dashboard → Your Project → Settings → Environment Variables
- **Required Variables:**
  - All SUPABASE_* variables
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - NEXT_PUBLIC_VENMO_USERNAME
  - VENMO_PHONE
  - CRON_SECRET
  - NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL

### 2. GitHub Sync Issues

**Problem:** Code isn't syncing to GitHub repository.

**Solutions:**
- Check if GitHub integration is connected in v0 settings
- Go to v0 → Settings → GitHub and reconnect if needed
- Ensure you have push permissions to the repository
- Check if the branch is protected (requires PR instead of direct push)

### 3. Supabase Connection Issues

**Problem:** Database queries fail in production but work locally.

**Solutions:**
- Verify Supabase project is not paused (free tier pauses after 7 days of inactivity)
- Check environment variables match your Supabase project
- Ensure RLS (Row Level Security) policies are correctly configured
- Verify Supabase project region matches your Vercel deployment region

### 4. Middleware/Routing Issues

**Problem:** Pages redirect incorrectly or show 404 errors.

**Solutions:**
- Ensure `middleware.ts` exists in root directory (not `proxy.ts`)
- Check middleware matcher config includes your routes
- Verify authentication logic in middleware isn't blocking pages

### 5. Build Performance Issues

**Problem:** Build takes too long or times out.

**Solutions:**
- Remove unused dependencies from package.json
- Check for circular imports
- Ensure images are optimized (<1MB each)
- Consider upgrading Vercel plan for longer build timeouts

## Deployment Checklist

Before deploying, ensure:
- [ ] All environment variables are set in Vercel
- [ ] Supabase project is active and not paused
- [ ] Database tables and RLS policies are configured
- [ ] middleware.ts file exists (not proxy.ts)
- [ ] No TypeScript errors (`npm run build` locally)
- [ ] All required SQL scripts have been run
- [ ] GitHub repository is connected and syncing

## Quick Fixes

### Force Redeploy
1. Go to Vercel dashboard
2. Find latest deployment
3. Click "..." menu → "Redeploy"
4. Select "Use existing Build Cache" OFF
5. Click "Redeploy"

### Clear All Caches
1. Hard refresh browser (Ctrl+Shift+R)
2. Clear Vercel CDN cache (redeploy)
3. Purge Supabase query cache (reconnect)

### Check Build Logs
1. Vercel dashboard → Deployments
2. Click on latest deployment
3. Scroll to "Build Logs"
4. Look for red error messages
5. Fix errors and redeploy

## Still Having Issues?

If none of the above work:
1. Check Vercel deployment logs for specific error messages
2. Verify all environment variables are correct
3. Test the build locally: `npm run build && npm start`
4. Contact Vercel support or check their status page
5. Ensure your domain DNS is correctly configured
