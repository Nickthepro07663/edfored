-- Create bookings table to store all booking requests
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  grade_level text not null,
  preferred_date date not null,
  preferred_time text not null,
  message text,
  is_paid boolean default false,
  status text default 'pending',
  created_at timestamp with time zone default now()
);

-- Enable RLS on bookings
alter table public.bookings enable row level security;

-- Users can view their own bookings
create policy "bookings_select_own"
  on public.bookings for select
  using (auth.uid() = user_id);

-- Users can insert their own bookings
create policy "bookings_insert_own"
  on public.bookings for insert
  with check (auth.uid() = user_id);

-- Admin can view all bookings (we'll handle admin check in the app)
create policy "bookings_select_all"
  on public.bookings for select
  using (true);

-- Admin can update all bookings
create policy "bookings_update_all"
  on public.bookings for update
  using (true);

-- Create profiles table for user information
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  phone text,
  created_at timestamp with time zone default now()
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Users can view their own profile
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can insert their own profile
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Users can update their own profile
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- Create admin users table (simple approach)
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password_hash text not null,
  created_at timestamp with time zone default now()
);

-- Enable RLS on admin_users
alter table public.admin_users enable row level security;

-- Only allow select for authentication purposes
create policy "admin_users_select"
  on public.admin_users for select
  using (true);
