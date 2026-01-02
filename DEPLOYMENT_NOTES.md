# Deployment Configuration

## Current Setup

This project is configured for maximum deployment stability:

### Removed Components
- **No middleware.ts**: Removed to prevent deployment cancellation issues
- **No proxy.ts**: Simplified routing to avoid conflicts
- **No cron jobs**: Removed Supabase keep-alive cron to eliminate deployment blockers

### Authentication
- Admin/Owner pages use localStorage-based session management
- Dashboard uses server-side Supabase auth
- No middleware-based auth protection

### Build Configuration
- TypeScript errors are NOT ignored (strict mode)
- ESLint runs during builds
- Images are unoptimized for broader hosting compatibility

## Deployment Steps

1. **Connect to Vercel**: Click "Publish" in v0
2. **Set Environment Variables**: All Supabase env vars are automatically added
3. **Add Custom Env Vars**:
   - `NEXT_PUBLIC_VENMO_USERNAME`: Your Venmo username
   - `VENMO_PHONE`: Your phone for Venmo (optional)

4. **Deploy**: Vercel will automatically build and deploy

## Supabase Keep-Alive (Optional)

Since the cron job is removed, your Supabase free tier database may pause after 7 days of inactivity. To prevent this:
- Upgrade to Supabase paid tier ($25/month)
- Or manually visit your site weekly to keep it active
- Or set up an external cron service (like cron-job.org) to ping your homepage

## If Deployment Still Fails

Contact support at vercel.com/help with:
- Your project URL
- Deployment logs
- Error messages

## Database Setup

After successful deployment, run the SQL scripts in order:
1. `001_create_users_table.sql`
2. `002_create_owner_account.sql`
3. `003_create_sessions_table.sql`
4. `004_create_bookings_table.sql`
5. `005_create_cms_and_analytics.sql`
6. `006_create_inquiries_table.sql`

Run these in the v0 interface (they execute automatically on Supabase).
