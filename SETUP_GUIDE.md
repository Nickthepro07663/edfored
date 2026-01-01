# EDforED Tutoring Website - Setup Guide

## Environment Variables Required

Add these environment variables to your Vercel project or .env file:

### Supabase Configuration
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (admin access)
- `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` - Development redirect URL (e.g., http://localhost:3000)

### Venmo Configuration
- `NEXT_PUBLIC_VENMO_USERNAME` - Your Venmo username (e.g., @edfored)
- `VENMO_PHONE` - Your Venmo phone number without dashes (format: 5515023368)

### Cron Job Security (Required for keep-alive)
- `CRON_SECRET` - Random secret string for securing the keep-alive endpoint (generate a secure random string)

### Calendly Configuration (Optional)
Update the Calendly URL in `app/booking/_components/booking-client-page.tsx`:
- Replace the Calendly embed URL with your actual Calendly booking link
- Find: `https://calendly.com/your-username`
- Replace with your Calendly scheduling page

## Contact Information

Update these values in your website:
- **Email**: edfored2025@gmail.com
- **Phone**: (551) 502-3368
- **Social Media**: Update Instagram, YouTube, and TikTok links in the footer and contact components

## Setting Up Venmo Payment

1. Download the Venmo mobile app and create/login to your account
2. Set up your profile with a username (e.g., @edfored)
3. Add your username to `NEXT_PUBLIC_VENMO_USERNAME` environment variable
4. Add your phone number to `VENMO_PHONE` (numbers only, no spaces or dashes)
5. Students will see a payment button that generates a Venmo deep link for easy payment

**Payment Flow:**
- Student books a session through the website
- Booking is created in database with "unpaid" status
- Student clicks Venmo payment button
- Venmo app opens with pre-filled amount and note
- Admin marks payment as received in dashboard

## Setting Up Calendly (Optional)

1. Go to [Calendly](https://calendly.com) and create an account
2. Set up your event types (tutoring sessions with different durations)
3. Configure your availability and calendar sync
4. Get your Calendly scheduling page URL
5. Update the booking page component with your URL
6. Calendly automatically syncs with Google Calendar, Outlook, iCloud, etc.

## Supabase Keep-Alive System

The app includes an automated keep-alive system to prevent Supabase free tier from pausing due to inactivity:

### How It Works
- Makes multiple random database queries every 6 hours
- Keeps your database active and prevents auto-pause
- Runs automatically when deployed to Vercel

### Setup Options

**Option 1: Vercel Deployment (Automatic)**
- Cron job is configured in `vercel.json`
- Runs automatically every 6 hours
- No additional setup needed after deployment

**Option 2: External Cron Service (if not using Vercel)**
1. Sign up at [cron-job.org](https://cron-job.org) or [EasyCron](https://www.easycron.com)
2. Create a new cron job:
   - URL: `https://your-domain.com/api/cron/keep-alive`
   - Schedule: Every 6 hours (e.g., 0 */6 * * *)
   - Method: GET
   - Add custom header: `Authorization: Bearer YOUR_CRON_SECRET`
3. Save and enable the cron job

**Option 3: Upgrade to Supabase Pro (Production)**
- For production apps, consider upgrading to Supabase Pro ($25/month)
- No pausing, better performance, more storage
- Eliminates need for keep-alive workarounds

See `SUPABASE_SETUP.md` for detailed instructions.

## Default Admin Credentials

**Important:** Change these credentials after first login!

- **Owner Account** (Full system access)
  - Username: `Nick`
  - Password: `Nick_0711`
  - Access: User management, all admin features

- **Admin Account** (Staff access)
  - Username: `edfored`
  - Password: `Admin`
  - Access: Booking management, payment tracking

## Database Schema

The app uses Supabase PostgreSQL with the following tables:

### Core Tables
- `profiles` - Extended user data (linked to Supabase Auth)
- `admin_users` - Admin/owner accounts with roles
- `bookings` - Session bookings with payment status and scheduling

### SQL Scripts
Run these in order from the `/scripts` folder:
1. `001_create_tables.sql` - Creates initial schema
2. `002_insert_admin.sql` - Adds default admin account
3. `003_add_roles_and_permissions.sql` - Adds role system
4. `004_create_owner_account.sql` - Creates owner account

You can run these directly from the v0 interface - they execute automatically.

## Content Updates Needed

Replace placeholder content with your actual data:

### Images
- `/public/edfored-team-2025.jpg` - Your current team photo
- `/public/original-six-members.jpg` - Original founding members photo
- Add tutor headshots to `/public/` folder

### About Page (`app/about/page.tsx`)
- Add your actual tutor names, photos, and achievements
- Add marketing team member names and headshots
- Update tutor count and town coverage stats

### Social Media Links
Update in `components/footer.tsx` and `components/contact.tsx`:
- Instagram: Replace `#` with your Instagram URL
- YouTube: Replace `#` with your YouTube channel URL
- TikTok: Replace `#` with your TikTok profile URL

## Features Overview

- **User Authentication**: Secure Supabase Auth with email/password
- **Role-Based Access**: Owner, Admin, Staff, and User roles
- **Booking System**: Custom form + optional Calendly integration
- **Payment Processing**: Venmo deep linking for mobile payments
- **Calendar Integration**: Via Calendly (syncs to Google, Outlook, etc.)
- **Admin Dashboard**: Manage bookings, track payments, view calendar
- **Owner Dashboard**: User management, role assignment, system access
- **Automated Keep-Alive**: Prevents Supabase free tier from pausing

## Deployment

**Note:** This project has been optimized for deployment by removing middleware complexity that was causing cancellation issues.

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)
2. Connect to Vercel and deploy
3. Add all environment variables in Vercel project settings
4. Vercel will automatically run the cron job for keep-alive
5. Test the booking flow and payment links
6. Update admin credentials for security

## Deployment Troubleshooting

If your deployment is still canceling during initialization:

1. **Check Build Logs**: Look for TypeScript or ESLint errors in the Vercel deployment logs
2. **Verify Environment Variables**: Ensure all required Supabase variables are set in the Vars section
3. **Check Supabase Connection**: Make sure your Supabase project is active and not paused
4. **Contact Support**: Visit vercel.com/help with your project details and error logs

**Common Issues:**
- Missing environment variables
- Supabase project paused (run keep-alive endpoint manually)
- TypeScript compilation errors (check build logs)
- Large bundle size (ensure images are properly optimized)

## Support

For questions or issues:
- Email: edfored2025@gmail.com
- Phone: (551) 502-3368
