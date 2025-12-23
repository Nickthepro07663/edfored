# Supabase Configuration Guide

## Preventing Project Pausing

Supabase free tier projects pause after **7 days of inactivity**. This guide explains how to keep your project active.

### Solution 1: Automated Keep-Alive (Implemented)

We've added an automated keep-alive system that pings your database regularly:

1. **Vercel Cron Job** (Recommended if deployed on Vercel)
   - The `vercel.json` file configures a cron job that runs every 6 hours
   - This automatically hits the `/api/cron/keep-alive` endpoint
   - Requires no additional setup when deployed to Vercel

2. **External Cron Service** (For other deployments)
   - Use a service like [cron-job.org](https://cron-job.org) or [EasyCron](https://www.easycron.com/)
   - Set up a cron job to hit: `https://your-domain.com/api/cron/keep-alive`
   - Schedule: Every 6 hours
   - Add header: `Authorization: Bearer YOUR_CRON_SECRET`
   - Set the `CRON_SECRET` environment variable in your deployment

### Solution 2: Upgrade to Paid Plan

For production applications, upgrade to a paid Supabase plan:

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to Settings → Billing
4. Choose the **Pro Plan** ($25/month) or higher
5. Benefits:
   - No pausing/expiration
   - Better performance
   - More database storage
   - Dedicated resources

### Solution 3: Manual Activity

If you're just testing:
- Log in to your app at least once every 7 days
- Make a booking or view the dashboard
- This counts as activity and resets the pause timer

## Environment Variables

Make sure these are set in your Vercel project or `.env.local`:

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Cron Security (Optional but recommended)
CRON_SECRET=your_random_secret_string
```

## Checking Project Status

1. Visit your [Supabase Dashboard](https://supabase.com/dashboard)
2. Check if your project shows "Paused" or "Active"
3. If paused, click "Restore" to reactivate it
4. The keep-alive cron will prevent future pausing

## Connection Pooling

Supabase uses connection pooling by default. The connection settings are:

- **Pooled Connection** (Transaction Mode): Use for serverless functions
- **Direct Connection** (Session Mode): Use for long-running processes

Our app uses the pooled connection which is optimal for Next.js API routes and server components.

## Troubleshooting

**Project still pausing?**
- Check that the cron job is running (view logs in Vercel dashboard)
- Verify `CRON_SECRET` is set correctly
- Ensure the `/api/cron/keep-alive` route is accessible

**Database connection errors?**
- Check that all Supabase environment variables are set
- Verify your Supabase project is active (not paused)
- Check Supabase dashboard for any service issues

**Need help?**
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Support](https://supabase.com/support)
