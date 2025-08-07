-- Create leads table for tracking customer interactions
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  message TEXT,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  lead_score INTEGER DEFAULT 0,
  last_contact_at TIMESTAMP WITH TIME ZONE,
  zapier_webhook_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert (contact form submissions)
CREATE POLICY "Anyone can create leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admin access (you can modify this later for auth)
CREATE POLICY "Admin can view all leads" 
ON public.leads 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can update leads" 
ON public.leads 
FOR UPDATE 
USING (true);

-- Create email sequences table
CREATE TABLE public.email_sequences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  sequence_step INTEGER NOT NULL DEFAULT 1,
  email_type TEXT NOT NULL CHECK (email_type IN ('welcome', 'follow_up_1', 'follow_up_2', 'product_info', 'special_offer')),
  sent_at TIMESTAMP WITH TIME ZONE,
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'sent', 'delivered', 'opened', 'clicked', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for email sequences
ALTER TABLE public.email_sequences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage email sequences" 
ON public.email_sequences 
FOR ALL 
USING (true);

-- Create WhatsApp sequences table
CREATE TABLE public.whatsapp_sequences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  sequence_step INTEGER NOT NULL DEFAULT 1,
  message_type TEXT NOT NULL CHECK (message_type IN ('welcome', 'product_showcase', 'follow_up', 'special_offer')),
  sent_at TIMESTAMP WITH TIME ZONE,
  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'sent', 'delivered', 'read', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for WhatsApp sequences
ALTER TABLE public.whatsapp_sequences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage whatsapp sequences" 
ON public.whatsapp_sequences 
FOR ALL 
USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for leads table
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to schedule initial follow-up sequences
CREATE OR REPLACE FUNCTION public.schedule_lead_sequences()
RETURNS TRIGGER AS $$
BEGIN
  -- Schedule welcome email immediately
  INSERT INTO public.email_sequences (lead_id, sequence_step, email_type, scheduled_for)
  VALUES (NEW.id, 1, 'welcome', now());
  
  -- Schedule follow-up emails
  INSERT INTO public.email_sequences (lead_id, sequence_step, email_type, scheduled_for)
  VALUES 
    (NEW.id, 2, 'follow_up_1', now() + INTERVAL '1 day'),
    (NEW.id, 3, 'product_info', now() + INTERVAL '3 days'),
    (NEW.id, 4, 'follow_up_2', now() + INTERVAL '7 days'),
    (NEW.id, 5, 'special_offer', now() + INTERVAL '14 days');
  
  -- Schedule WhatsApp sequences
  INSERT INTO public.whatsapp_sequences (lead_id, sequence_step, message_type, scheduled_for)
  VALUES 
    (NEW.id, 1, 'welcome', now() + INTERVAL '1 hour'),
    (NEW.id, 2, 'product_showcase', now() + INTERVAL '2 days'),
    (NEW.id, 3, 'follow_up', now() + INTERVAL '5 days'),
    (NEW.id, 4, 'special_offer', now() + INTERVAL '10 days');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-schedule sequences when lead is created
CREATE TRIGGER schedule_sequences_on_lead_creation
  AFTER INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.schedule_lead_sequences();