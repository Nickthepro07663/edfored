-- Create inquiries table to store contact form submissions
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE
);

-- Add RLS policies
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Allow admins to read all inquiries
CREATE POLICY "Admins can read all inquiries"
  ON inquiries FOR SELECT
  USING (true);

-- Allow anyone to insert inquiries (public contact form)
CREATE POLICY "Anyone can submit inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (true);
