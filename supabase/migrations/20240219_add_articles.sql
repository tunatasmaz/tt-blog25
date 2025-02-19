-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add RLS policies
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published articles
CREATE POLICY "Allow public read access on articles" ON articles
  FOR SELECT TO authenticated, anon 
  USING (published = true OR auth.role() = 'authenticated');

-- Allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users to modify articles" ON articles
  FOR ALL TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Add indexes
CREATE INDEX IF NOT EXISTS articles_slug_idx ON articles(slug);
CREATE INDEX IF NOT EXISTS articles_published_idx ON articles(published);
