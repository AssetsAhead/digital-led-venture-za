-- Fix critical security vulnerabilities by properly configuring RLS policies
-- The current policies are backwards - they block admin access but allow public access

-- Drop the problematic admin-blocking policies
DROP POLICY IF EXISTS "leads_admin_delete" ON public.leads;
DROP POLICY IF EXISTS "leads_admin_select" ON public.leads;
DROP POLICY IF EXISTS "leads_admin_update" ON public.leads;

DROP POLICY IF EXISTS "orders_admin_delete" ON public.orders;
DROP POLICY IF EXISTS "orders_admin_select" ON public.orders;
DROP POLICY IF EXISTS "orders_admin_update" ON public.orders;

-- Create proper restrictive policies that block public access to sensitive data
-- Only allow service role (backend functions) to read/write this data

-- Leads table policies - block all public access
CREATE POLICY "leads_block_public_select" ON public.leads
  FOR SELECT USING (false);

CREATE POLICY "leads_block_public_update" ON public.leads
  FOR UPDATE USING (false);

CREATE POLICY "leads_block_public_delete" ON public.leads
  FOR DELETE USING (false);

-- Orders table policies - block all public access
CREATE POLICY "orders_block_public_select" ON public.orders
  FOR SELECT USING (false);

CREATE POLICY "orders_block_public_update" ON public.orders
  FOR UPDATE USING (false);

CREATE POLICY "orders_block_public_delete" ON public.orders
  FOR DELETE USING (false);

-- Email campaigns - block public access to proprietary marketing data
CREATE POLICY "campaigns_block_public_select" ON public.email_campaigns
  FOR SELECT USING (false);

CREATE POLICY "campaigns_block_public_insert" ON public.email_campaigns
  FOR INSERT WITH CHECK (false);

CREATE POLICY "campaigns_block_public_update" ON public.email_campaigns
  FOR UPDATE USING (false);

CREATE POLICY "campaigns_block_public_delete" ON public.email_campaigns
  FOR DELETE USING (false);

-- Email sends - block public access to email tracking data
CREATE POLICY "email_sends_block_public_select" ON public.email_sends
  FOR SELECT USING (false);

CREATE POLICY "email_sends_block_public_insert" ON public.email_sends
  FOR INSERT WITH CHECK (false);

CREATE POLICY "email_sends_block_public_update" ON public.email_sends
  FOR UPDATE USING (false);

CREATE POLICY "email_sends_block_public_delete" ON public.email_sends
  FOR DELETE USING (false);