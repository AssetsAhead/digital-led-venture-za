-- Fix critical security vulnerability: Remove public read access to orders table
-- This prevents unauthorized access to sensitive order information including amounts and addresses

-- Drop the overly permissive policy that allows public read/update/delete access
DROP POLICY IF EXISTS "orders_admin_all" ON public.orders;

-- Keep the public insert policy for order creation to continue working
-- The orders_public_insert policy already exists and is correctly scoped

-- Add a secure admin-only policy for future admin dashboard access
-- Note: This will only work once we implement user authentication and roles
CREATE POLICY "orders_admin_select" 
ON public.orders 
FOR SELECT 
TO authenticated
USING (
  -- This will be updated when user roles are implemented
  -- For now, no authenticated user can read orders (only service role from Edge Functions)
  false
);

-- Add admin-only policies for update and delete operations
CREATE POLICY "orders_admin_update" 
ON public.orders 
FOR UPDATE 
TO authenticated
USING (false);

CREATE POLICY "orders_admin_delete" 
ON public.orders 
FOR DELETE 
TO authenticated
USING (false);

-- Edge Functions will continue to work because they use the service role key
-- which bypasses RLS policies entirely