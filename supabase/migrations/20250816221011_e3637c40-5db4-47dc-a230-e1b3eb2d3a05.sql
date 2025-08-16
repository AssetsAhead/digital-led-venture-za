-- Fix critical security vulnerability: Remove public read access to leads table
-- This prevents unauthorized access to customer contact information

-- Drop the overly permissive policy that allows public read/update/delete access
DROP POLICY IF EXISTS "leads_admin_all" ON public.leads;

-- Keep the public insert policy for contact forms to continue working
-- The leads_public_insert policy already exists and is correctly scoped

-- Add a secure admin-only policy for future admin dashboard access
-- Note: This will only work once we implement user authentication and roles
CREATE POLICY "leads_admin_select" 
ON public.leads 
FOR SELECT 
TO authenticated
USING (
  -- This will be updated when user roles are implemented
  -- For now, no authenticated user can read leads (only service role from Edge Functions)
  false
);

-- Add admin-only policies for update and delete operations
CREATE POLICY "leads_admin_update" 
ON public.leads 
FOR UPDATE 
TO authenticated
USING (false);

CREATE POLICY "leads_admin_delete" 
ON public.leads 
FOR DELETE 
TO authenticated
USING (false);

-- Edge Functions will continue to work because they use the service role key
-- which bypasses RLS policies entirely