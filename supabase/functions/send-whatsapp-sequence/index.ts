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

// Validate UUID format
const isValidUUID = (str: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

const whatsappTemplates = {
  welcome: (name: string) => `🎉 Welcome to AssetsAhead, ${name}!

Thank you for your interest in our growth solutions. We're excited to help you transform your business!

🚀 What's next:
• Our team will contact you within 24 hours
• Get a personalized consultation
• Discover solutions perfect for your needs

Ready to unlock your business potential? 💼

Reply STOP to opt out of messages.`,

  product_showcase: (name: string) => `Hi ${name}! 👋

Check out our game-changing solutions that are helping businesses scale rapidly:

💡 LED Bizz-in-a-Bag - Complete turnkey business
🔥 Advanced Lead Generation Systems  
🌐 Professional Web & Digital Marketing
💎 Revolutionary Diva Stemcells
🚀 Custom SAAS & App Development

Which solution interests you most? Let's discuss how we can accelerate your growth! 📈

Reply with the number that interests you:
1️⃣ LED Business
2️⃣ Lead Generation
3️⃣ Web & Marketing
4️⃣ Beauty & Wellness
5️⃣ Software Development`,

  follow_up: (name: string) => `Hi ${name}! 

Just checking in - have you had a chance to think about our growth solutions? 🤔

Many of our clients see results within the first 30 days:
✅ 300% increase in qualified leads
✅ 250% boost in online visibility  
✅ 150% growth in revenue

Don't let this opportunity pass by. Our consultation spots are filling up fast! ⏰

Ready to get started? Just reply YES and we'll schedule your free strategy session! 📞`,

  special_offer: (name: string) => `🎯 EXCLUSIVE OFFER for ${name}!

For the next 48 HOURS ONLY:

🔥 30% OFF all services
🎁 FREE 3-month support package
💡 BONUS LED backpack starter kit

This is our biggest discount of the year! 

⏰ Offer expires in 48 hours
💬 Reply CLAIM30 to secure your discount
📞 Or call us immediately at +27 67 874 6540

Don't miss out - this offer won't last long! 🏃‍♂️💨`
};

interface WhatsAppRequest {
  leadId: string;
  messageType: 'welcome' | 'product_showcase' | 'follow_up' | 'special_offer';
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authorization - this function should only be called internally
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('Missing or invalid authorization header');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const rawData = await req.json();
    console.log('Received WhatsApp sequence request');

    // Validate input
    if (!rawData.leadId || typeof rawData.leadId !== 'string' || !isValidUUID(rawData.leadId)) {
      return new Response(
        JSON.stringify({ error: 'Valid lead ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    if (!rawData.messageType || typeof rawData.messageType !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Message type is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Validate message type
    const validTypes = Object.keys(whatsappTemplates);
    if (!validTypes.includes(rawData.messageType)) {
      return new Response(
        JSON.stringify({ error: 'Invalid message type' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const { leadId, messageType }: WhatsAppRequest = rawData;
    console.log(`Sending ${messageType} WhatsApp message for lead ${leadId}`);

    // Get lead data
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('first_name, phone')
      .eq('id', leadId)
      .single();

    if (leadError || !lead) {
      console.error('Lead not found:', leadError);
      return new Response(
        JSON.stringify({ error: 'Lead not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    if (!lead.phone) {
      return new Response(
        JSON.stringify({ error: 'No phone number available for lead' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const template = whatsappTemplates[messageType];

    // Clean and format phone number
    let cleanPhone = lead.phone.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '27' + cleanPhone.substring(1);
    } else if (!cleanPhone.startsWith('27')) {
      cleanPhone = '27' + cleanPhone;
    }

    const message = template(lead.first_name || 'there');

    // Send WhatsApp message via Twilio
    const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const twilioWhatsAppFrom = Deno.env.get('TWILIO_WHATSAPP_FROM');

    if (!twilioAccountSid || !twilioAuthToken || !twilioWhatsAppFrom) {
      throw new Error('Twilio credentials not configured');
    }

    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;
    const credentials = btoa(`${twilioAccountSid}:${twilioAuthToken}`);

    const twilioResponse = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        From: twilioWhatsAppFrom,
        To: `whatsapp:+${cleanPhone}`,
        Body: message,
      }),
    });

    if (!twilioResponse.ok) {
      const errorText = await twilioResponse.text();
      console.error('Twilio API error:', errorText);
      throw new Error(`Twilio API error: ${twilioResponse.status}`);
    }

    const twilioData = await twilioResponse.json();

    // Update WhatsApp sequence record
    const { error: updateError } = await supabase
      .from('whatsapp_sequences')
      .update({ 
        status: 'sent', 
        sent_at: new Date().toISOString() 
      })
      .eq('lead_id', leadId)
      .eq('message_type', messageType)
      .eq('status', 'scheduled');

    if (updateError) {
      console.error('Failed to update WhatsApp sequence:', updateError);
    }

    console.log('WhatsApp message sent successfully:', twilioData.sid);

    return new Response(
      JSON.stringify({ 
        success: true, 
        messageSid: twilioData.sid,
        message: 'WhatsApp message sent successfully' 
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Error in send-whatsapp-sequence function:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send WhatsApp message' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
