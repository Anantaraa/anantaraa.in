-- Run this script in your Supabase SQL Editor to fix the missing columns error

-- Add missing gallery columns to the projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS gallery_vertical TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS gallery_horizontal_1 TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS gallery_horizontal_2 TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS gallery_grid_1 TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS gallery_grid_2 TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS gallery_grid_3 TEXT;

-- Verify the columns were added (optional, results will show in query output)
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'projects' 
AND column_name LIKE 'gallery_%';
