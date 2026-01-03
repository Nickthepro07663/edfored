-- Add announcement banners table
CREATE TABLE IF NOT EXISTS announcement_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message TEXT NOT NULL,
  link_url TEXT,
  link_text TEXT,
  is_active BOOLEAN DEFAULT true,
  background_color TEXT DEFAULT '#3B82F6',
  text_color TEXT DEFAULT '#FFFFFF',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default banner
INSERT INTO announcement_banners (message, link_url, link_text, is_active) 
VALUES (
  '🎉 New Year Special: 20% off your first session!',
  '/booking',
  'Book Now',
  false
) ON CONFLICT DO NOTHING;

-- Update cms_content to use JSONB for better querying
ALTER TABLE cms_content ALTER COLUMN content TYPE JSONB USING content::JSONB;
