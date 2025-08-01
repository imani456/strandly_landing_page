-- Create waitlist table for Strandly
CREATE TABLE public.strandly_waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  user_type TEXT NOT NULL CHECK (user_type IN ('client', 'stylist')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
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

-- Create index for email lookups
CREATE INDEX idx_strandly_waitlist_email ON public.strandly_waitlist(email);
CREATE INDEX idx_strandly_waitlist_created_at ON public.strandly_waitlist(created_at);