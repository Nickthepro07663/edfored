-- Create tutors table for CMS management
CREATE TABLE IF NOT EXISTS tutors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  bio TEXT,
  subjects TEXT[], -- Array of subjects they teach
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample tutors
INSERT INTO tutors (name, bio, subjects, image_url, display_order, is_active) VALUES
  ('Sarah Johnson', 'High school senior specializing in mathematics and science. National Merit Scholar with 4 years tutoring experience.', ARRAY['Math', 'Science', 'Physics'], '/professional-woman-smiling.png', 1, true),
  ('Michael Chen', 'Junior honor student passionate about languages and coding. Fluent in English, Spanish, and Mandarin.', ARRAY['Language', 'Coding', 'Spanish'], '/young-asian-man-smiling.png', 2, true),
  ('Emma Rodriguez', 'Senior with extensive music background. First chair clarinet and piano instructor for 3 years.', ARRAY['Music', 'Piano', 'Clarinet'], '/hispanic-woman-smiling.jpg', 3, true)
ON CONFLICT DO NOTHING;
