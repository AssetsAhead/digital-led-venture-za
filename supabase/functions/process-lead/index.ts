import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Input validation helpers
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
  return phoneRegex.test(phone);
};

const sanitizeString = (str: string, maxLength: number): string => {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, maxLength);
};

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message?: string;
  source?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData = await req.json();
    console.log('Processing lead request');

    // Validate required fields
    if (!rawData.firstName || typeof rawData.firstName !== 'string') {
      return new Response(
        JSON.stringify({ error: 'First name is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    if (!rawData.lastName || typeof rawData.lastName !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Last name is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    if (!rawData.email || !isValidEmail(rawData.email)) {
      return new Response(
        JSON.stringify({ error: 'Valid email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    if (rawData.phone && !isValidPhone(rawData.phone)) {
      return new Response(
        JSON.stringify({ error: 'Invalid phone number format' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Sanitize and validate input
    const leadData: LeadData = {
      firstName: sanitizeString(rawData.firstName, 100),
      lastName: sanitizeString(rawData.lastName, 100),
      email: sanitizeString(rawData.email, 255).toLowerCase(),
      phone: rawData.phone ? sanitizeString(rawData.phone, 20) : undefined,
      message: rawData.message ? sanitizeString(rawData.message, 1000) : undefined,
      source: rawData.source ? sanitizeString(rawData.source, 50) : 'website',
    };

    console.log('Validated lead data for:', leadData.email);

    // Insert lead into database
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert({
        first_name: leadData.firstName,
        last_name: leadData.lastName,
        email: leadData.email,
        phone: leadData.phone,
        message: leadData.message,
        source: leadData.source,
      })
      .select()
      .single();

    if (leadError) {
      console.error('Error inserting lead:', leadError);
      throw leadError;
    }

    console.log('Lead created:', lead.id);

    // Trigger email automation (internal call with service role)
    try {
      const emailResponse = await supabase.functions.invoke('send-email-sequence', {
        body: { leadId: lead.id, emailType: 'welcome' }
      });
      console.log('Email automation triggered:', emailResponse);
    } catch (emailError) {
      console.error('Email automation failed:', emailError);
    }

    // Trigger WhatsApp sequence (internal call with service role)
    if (leadData.phone) {
      try {
        const whatsappResponse = await supabase.functions.invoke('send-whatsapp-sequence', {
          body: { leadId: lead.id, messageType: 'welcome' }
        });
        console.log('WhatsApp sequence triggered:', whatsappResponse);
      } catch (whatsappError) {
        console.error('WhatsApp sequence failed:', whatsappError);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        leadId: lead.id,
        message: 'Lead processed successfully' 
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Error in process-lead function:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred processing your request' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
