-- Insert the admin user with username 'edfored' and password 'Admin'
-- Using a simple hash for demonstration (in production, use proper password hashing)
insert into public.admin_users (username, password_hash)
values ('edfored', 'Admin')
on conflict (username) do nothing;
