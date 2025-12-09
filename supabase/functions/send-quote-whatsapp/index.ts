import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData = await req.json();
    console.log('Received quote request');

    // Validate required fields
    if (!rawData.companyName || typeof rawData.companyName !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Company name is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    if (!rawData.contactPerson || typeof rawData.contactPerson !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Contact person is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    if (!rawData.email || !isValidEmail(rawData.email)) {
      return new Response(
        JSON.stringify({ error: 'Valid email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    if (!rawData.phone || !isValidPhone(rawData.phone)) {
      return new Response(
        JSON.stringify({ error: 'Valid phone number is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    if (typeof rawData.quantity !== 'number' || rawData.quantity < 10 || rawData.quantity > 10000) {
      return new Response(
        JSON.stringify({ error: 'Valid quantity is required (10-10000)' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Sanitize input
    const quoteData: QuoteData = {
      companyName: sanitizeString(rawData.companyName, 200),
      contactPerson: sanitizeString(rawData.contactPerson, 100),
      email: sanitizeString(rawData.email, 255).toLowerCase(),
      phone: sanitizeString(rawData.phone, 20),
      quantity: Math.floor(rawData.quantity),
      requirements: sanitizeString(rawData.requirements || '', 500),
      useCase: sanitizeString(rawData.useCase || '', 200),
      estimatedTotal: typeof rawData.estimatedTotal === 'number' ? Math.floor(rawData.estimatedTotal) : 0,
    };

    console.log('Validated quote request for:', quoteData.email);

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
      JSON.stringify({ error: 'Failed to process quote request' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
