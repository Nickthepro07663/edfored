-- Add role column to profiles table
alter table public.profiles add column if not exists role text default 'user';

-- Create index for faster role lookups
create index if not exists profiles_role_idx on public.profiles(role);

-- Update admin_users table to include role
alter table public.admin_users add column if not exists role text default 'admin';

-- Create a function to check if user is admin or owner
create or replace function public.is_admin_or_owner()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'owner')
  );
end;
$$ language plpgsql security definer;

-- Update RLS policies for admin/owner access
drop policy if exists "bookings_update_all" on public.bookings;
create policy "bookings_update_admin"
  on public.bookings for update
  using (public.is_admin_or_owner());

-- Allow admins/owners to view all profiles
create policy "profiles_select_admin"
  on public.profiles for select
  using (public.is_admin_or_owner());

-- Allow owners to update any profile (for role management)
create policy "profiles_update_owner"
  on public.profiles for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'owner'
    )
  );
