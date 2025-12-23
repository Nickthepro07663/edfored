# Edfored Tutoring Website - Setup Guide

## Environment Variables Required

Add these environment variables to your Vercel project:

### Supabase Configuration
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` - Development redirect URL (e.g., http://localhost:3000)

### Venmo Configuration
- `NEXT_PUBLIC_VENMO_USERNAME` - Your Venmo username (e.g., @edfored)
- `VENMO_PHONE` - Your Venmo phone number (format: 1234567890)

### Cron Job Security (Optional but recommended)
- `CRON_SECRET` - Random secret string for securing the keep-alive endpoint

### Calendly Configuration
Update the Calendly URL in the booking page:
- Replace `https://calendly.com/edfored/session` with your actual Calendly booking link

## Setting Up Venmo

1. Download the Venmo mobile app and create an account
2. Set up your profile with a username (e.g., @edfored)
3. Add your username to `NEXT_PUBLIC_VENMO_USERNAME`
4. Add your phone number to `VENMO_PHONE`
5. Students will see a payment button that generates a Venmo payment link

## Setting Up Calendly

1. Go to [Calendly](https://calendly.com)
2. Create your account and set up your scheduling page
3. Update the booking page with your Calendly URL
4. Calendly bookings automatically sync with your Google Calendar, Outlook, etc.

## Supabase Keep-Alive System

The app includes an automated keep-alive system to prevent Supabase from pausing:

1. **Vercel Deployment (Automatic)**
   - Cron job configured in `vercel.json` runs every 6 hours
   - No additional setup needed

2. **External Cron Service**
   - Set up at [cron-job.org](https://cron-job.org) or similar
   - URL: `https://your-domain.com/api/cron/keep-alive`
   - Schedule: Every 6 hours
   - Add header: `Authorization: Bearer YOUR_CRON_SECRET`

3. **For Production**: Consider upgrading to Supabase Pro plan ($25/month) to avoid pausing entirely

See `SUPABASE_SETUP.md` for detailed instructions.

## Default Admin Credentials

- **Owner Account**
  - Username: Nick
  - Password: Nick_0711

- **Admin Account**
  - Username: edfored
  - Password: Admin

## Database Schema

The app uses Supabase with the following main tables:
- `profiles` - User accounts with roles (user, admin, staff, owner)
- `bookings` - Session bookings with payment status and schedule info

## Features

- User authentication with Supabase
- Role-based access control (Owner, Admin, Staff, User)
- Booking system with Calendly integration
- Venmo payment processing
- Calendar sync capabilities
- Admin dashboard for managing bookings and payments
- Owner dashboard for user management
- Automated Supabase keep-alive system
