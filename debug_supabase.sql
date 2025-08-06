-- 1. Check if table exists and its structure
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'strandly_waitlist' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Check if RLS is enabled
SELECT 
    schemaname, 
    tablename, 
    rowsecurity,
    hasindexes,
    hasrules
FROM pg_tables 
WHERE tablename = 'strandly_waitlist';

-- 3. Check all policies on the table
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd, 
    qual, 
    with_check
FROM pg_policies 
WHERE tablename = 'strandly_waitlist';

-- 4. Check table permissions
SELECT 
    grantee, 
    privilege_type, 
    is_grantable
FROM information_schema.role_table_grants 
WHERE table_name = 'strandly_waitlist' 
AND table_schema = 'public';

-- 5. Check if anon role has insert permission
SELECT 
    grantee, 
    privilege_type
FROM information_schema.role_table_grants 
WHERE table_name = 'strandly_waitlist' 
AND table_schema = 'public' 
AND grantee = 'anon';

-- 6. Check if authenticated role has insert permission
SELECT 
    grantee, 
    privilege_type
FROM information_schema.role_table_grants 
WHERE table_name = 'strandly_waitlist' 
AND table_schema = 'public' 
AND grantee = 'authenticated'; 