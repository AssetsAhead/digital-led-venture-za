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

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message?: string;
  source?: string;
  zapierWebhookUrl?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const leadData: LeadData = await req.json();
    console.log('Processing lead:', leadData);

    // Insert lead into database
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert({
        first_name: leadData.firstName,
        last_name: leadData.lastName,
        email: leadData.email,
        phone: leadData.phone,
        message: leadData.message,
        source: leadData.source || 'website',
        zapier_webhook_url: leadData.zapierWebhookUrl
      })
      .select()
      .single();

    if (leadError) {
      console.error('Error inserting lead:', leadError);
      throw leadError;
    }

    console.log('Lead created:', lead.id);

    // Trigger Zapier webhook if provided
    if (leadData.zapierWebhookUrl) {
      try {
        const zapierResponse = await fetch(leadData.zapierWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lead_id: lead.id,
            name: `${leadData.firstName} ${leadData.lastName}`,
            email: leadData.email,
            phone: leadData.phone,
            message: leadData.message,
            timestamp: new Date().toISOString(),
            source: leadData.source || 'website'
          })
        });
        console.log('Zapier webhook triggered:', zapierResponse.status);
      } catch (zapierError) {
        console.error('Zapier webhook failed:', zapierError);
        // Don't fail the entire process if Zapier fails
      }
    }

    // Trigger email automation
    try {
      const emailResponse = await supabase.functions.invoke('send-email-sequence', {
        body: { leadId: lead.id, emailType: 'welcome' }
      });
      console.log('Email automation triggered:', emailResponse);
    } catch (emailError) {
      console.error('Email automation failed:', emailError);
    }

    // Trigger WhatsApp sequence
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
        message: 'Lead processed and sequences initiated' 
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Error in process-lead function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);