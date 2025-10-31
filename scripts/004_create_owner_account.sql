-- Insert owner account into admin_users table
-- Password: Nick_0711 (stored as plain text for simplicity as requested)
insert into public.admin_users (username, password_hash, role)
values ('Nick', 'Nick_0711', 'owner')
on conflict (username) do nothing;

-- Note: In production, passwords should be properly hashed
-- This is a simplified version for development purposes
