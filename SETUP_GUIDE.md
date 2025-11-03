# Edfored Tutoring Website - Setup Guide

## Environment Variables Required

Add these environment variables to your Vercel project:

### Supabase Configuration
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` - Development redirect URL (e.g., http://localhost:3000)

### PayPal Configuration
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID` - Your PayPal Client ID (from Developer Dashboard)
- `PAYPAL_CLIENT_SECRET` - Your PayPal Client Secret (from Developer Dashboard)

### Calendly Configuration
Update the Calendly URL in the booking page:
- Replace `https://calendly.com/edfored/session` with your actual Calendly booking link

## Setting Up PayPal

1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Create an App in the Sandbox environment
3. Get your Client ID and Secret
4. Add them to your environment variables

## Setting Up Calendly

1. Go to [Calendly](https://calendly.com)
2. Create your account and set up your scheduling page
3. Update the booking page with your Calendly URL
4. Calendly bookings automatically sync with your Google Calendar, Outlook, etc.

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
- PayPal payment processing
- Calendar sync capabilities
- Admin dashboard for managing bookings and payments
- Owner dashboard for user management
