-- Grant permissions to anon role (for public access)
GRANT INSERT ON public.strandly_waitlist TO anon;
GRANT SELECT ON public.strandly_waitlist TO anon;

-- Grant permissions to authenticated role
GRANT INSERT ON public.strandly_waitlist TO authenticated;
GRANT SELECT ON public.strandly_waitlist TO authenticated;

-- Grant permissions to service_role (for admin access)
GRANT ALL ON public.strandly_waitlist TO service_role;

-- Enable RLS if not already enabled
ALTER TABLE public.strandly_waitlist ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can join waitlist" ON public.strandly_waitlist;
DROP POLICY IF EXISTS "No public read access" ON public.strandly_waitlist;

-- Create policy to allow anyone to insert (public waitlist)
CREATE POLICY "Anyone can join waitlist" 
ON public.strandly_waitlist 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Create policy to prevent reading waitlist data (privacy)
CREATE POLICY "No public read access" 
ON public.strandly_waitlist 
FOR SELECT 
TO anon, authenticated
USING (false);

-- Verify the grants were created
SELECT 
    grantee, 
    privilege_type, 
    is_grantable
FROM information_schema.role_table_grants 
WHERE table_name = 'strandly_waitlist' 
AND table_schema = 'public'
ORDER BY grantee, privilege_type; 