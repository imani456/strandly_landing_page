-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'strandly_waitlist';

-- Check existing policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'strandly_waitlist';

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can join waitlist" ON public.strandly_waitlist;
DROP POLICY IF EXISTS "No public read access" ON public.strandly_waitlist;

-- Enable RLS if not already enabled
ALTER TABLE public.strandly_waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public waitlist)
CREATE POLICY "Anyone can join waitlist" 
ON public.strandly_waitlist 
FOR INSERT 
WITH CHECK (true);

-- Create policy to prevent reading waitlist data (privacy)
CREATE POLICY "No public read access" 
ON public.strandly_waitlist 
FOR SELECT 
USING (false);

-- Verify the policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'strandly_waitlist'; 