-- Create CMS content table
CREATE TABLE IF NOT EXISTS cms_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section VARCHAR(100) NOT NULL UNIQUE,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_by VARCHAR(255)
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(50) NOT NULL,
  page_path VARCHAR(255),
  user_id UUID,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default CMS content
INSERT INTO cms_content (section, content, updated_by) VALUES
('hero', '{
  "headline": "Empowering K-8 Students Through Peer Tutoring",
  "subheadline": "High school students providing personalized, affordable tutoring to help younger students excel in their studies.",
  "stats": [
    {"label": "Members", "value": "20+"},
    {"label": "Categories", "value": "5"},
    {"label": "Towns", "value": "10+"}
  ]
}', 'system'),
('contact', '{
  "email": "edfored2025@gmail.com",
  "phone": "(551) 502-3368",
  "address": "Serving New Jersey Communities",
  "social": {
    "instagram": "https://www.instagram.com/edfored",
    "youtube": "https://www.youtube.com/@EdforEd-2025",
    "tiktok": "https://www.tiktok.com/@edfored"
  }
}', 'system'),
('about', '{
  "mission": "At EDforED, we believe in the power of peer learning. Founded by high school students, our mission is to provide accessible, high-quality tutoring to K-8 students while giving back to communities in need.",
  "vision": "We donate 10% of our profits to support education initiatives in South America, helping bridge the educational gap globally."
}', 'system')
ON CONFLICT (section) DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_cms_section ON cms_content(section);

-- Enable RLS
ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- RLS policies - allow public read, only authenticated users can write
CREATE POLICY "Public can read CMS content"
  ON cms_content FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update CMS content"
  ON cms_content FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can read analytics"
  ON analytics FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert analytics"
  ON analytics FOR INSERT
  WITH CHECK (true);
