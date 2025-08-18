import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QuoteData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  quantity: number;
  requirements: string;
  useCase: string;
  estimatedTotal: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const quoteData: QuoteData = await req.json();
    console.log('Received quote request:', quoteData);

    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const whatsappFrom = Deno.env.get('TWILIO_WHATSAPP_FROM');

    if (!accountSid || !authToken || !whatsappFrom) {
      throw new Error('Missing Twilio credentials');
    }

    // Format the message
    const message = `📋 NEW BULK QUOTE REQUEST!

Company: ${quoteData.companyName}
Contact: ${quoteData.contactPerson}
Email: ${quoteData.email}
Phone: ${quoteData.phone}
Quantity: ${quoteData.quantity} units
Estimated Total: R${quoteData.estimatedTotal.toLocaleString()}

Use Case: ${quoteData.useCase || 'Not specified'}
Special Requirements: ${quoteData.requirements || 'None'}

Respond within 24 hours! 💼`;

    // Send WhatsApp message via Twilio
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    
    const formData = new URLSearchParams();
    formData.append('From', 'whatsapp:+27678746540');
    formData.append('To', 'whatsapp:+27678746540');
    formData.append('Body', message);

    const response = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${accountSid}:${authToken}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Twilio error:', errorText);
      throw new Error(`Twilio API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Quote WhatsApp message sent successfully:', result.sid);

    return new Response(
      JSON.stringify({ success: true, messageSid: result.sid }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Error sending quote WhatsApp notification:', error);
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