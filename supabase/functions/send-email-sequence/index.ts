import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.3";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Validate UUID format
const isValidUUID = (str: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

const emailTemplates = {
  welcome: {
    subject: "Welcome to AssetsAhead - Your Growth Journey Starts Now!",
    html: (name: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Welcome to AssetsAhead, ${name}!</h1>
        <p>Thank you for your interest in our innovative solutions. We're excited to help you unlock growth through our cutting-edge services.</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>🚀 What's Next?</h3>
          <ul>
            <li>📞 Our team will contact you within 24 hours</li>
            <li>💡 Discover personalized solutions for your business</li>
            <li>🎯 Get a custom strategy consultation</li>
          </ul>
        </div>
        
        <p>In the meantime, explore our portfolio of successful projects and see how we've helped businesses like yours achieve remarkable growth.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://assetsahead.com" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Explore Our Services</a>
        </div>
        
        <p>Best regards,<br>The AssetsAhead Team</p>
      </div>
    `
  },
  follow_up_1: {
    subject: "Your Business Growth Opportunity Awaits",
    html: (name: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Hi ${name},</h1>
        <p>We noticed you're interested in scaling your business. Here are some quick wins you can implement today:</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>🔥 Quick Growth Hacks:</h3>
          <ul>
            <li>💎 Optimize your lead generation process</li>
            <li>🌐 Enhance your digital marketing strategy</li>
            <li>💡 Explore turnkey business opportunities</li>
          </ul>
        </div>
        
        <p>Ready to dive deeper? Let's schedule a free consultation to discuss your specific needs.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="mailto:info@assetsahead.com" style="background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Schedule Free Consultation</a>
        </div>
      </div>
    `
  },
  product_info: {
    subject: "Discover Our Game-Changing Solutions",
    html: (name: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Exclusive Solutions for ${name}</h1>
        
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; margin: 20px 0;">
          <h2>🚀 Transform Your Business Today</h2>
          <p>Join hundreds of successful entrepreneurs who've scaled their businesses with our proven solutions.</p>
        </div>
        
        <div style="display: grid; gap: 20px; margin: 30px 0;">
          <div style="border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px;">
            <h3>💡 LED Bizz-in-a-Bag</h3>
            <p>Complete turnkey LED business package - everything you need to start earning immediately.</p>
          </div>
          
          <div style="border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px;">
            <h3>🔥 Business Leadgen</h3>
            <p>Advanced lead generation systems that fill your sales pipeline automatically.</p>
          </div>
          
          <div style="border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px;">
            <h3>🌐 Web & Digital Marketing</h3>
            <p>Professional websites and campaigns that convert visitors into customers.</p>
          </div>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://assetsahead.com" style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">View All Solutions</a>
        </div>
      </div>
    `
  },
  follow_up_2: {
    subject: "Last Chance - Don't Miss This Opportunity",
    html: (name: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #dc2626;">Final Notice for ${name}</h1>
        <p>We've been trying to connect with you about transforming your business. This is your last chance to join our exclusive program.</p>
        
        <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 20px; margin: 20px 0;">
          <h3>⏰ Time is Running Out</h3>
          <p>Our current consultation spots are filling up fast. Don't let this opportunity slip away.</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="mailto:info@assetsahead.com" style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Claim Your Spot Now</a>
        </div>
        
        <p><small>If you're no longer interested, you can unsubscribe from future emails.</small></p>
      </div>
    `
  },
  special_offer: {
    subject: "🎯 Exclusive 30% Discount - Limited Time Only",
    html: (name: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; border-radius: 12px; text-align: center;">
          <h1>🎯 Special Offer for ${name}</h1>
          <h2 style="font-size: 48px; margin: 10px 0;">30% OFF</h2>
          <p>Limited time exclusive discount on all our services</p>
        </div>
        
        <div style="padding: 30px 0;">
          <h3>This exclusive offer includes:</h3>
          <ul style="font-size: 16px; line-height: 1.6;">
            <li>✅ Complete business setup consultation</li>
            <li>✅ Custom marketing strategy</li>
            <li>✅ 3 months of free support</li>
            <li>✅ Bonus: LED backpack starter kit</li>
          </ul>
        </div>
        
        <div style="background: #fee2e2; border: 2px dashed #dc2626; padding: 20px; text-align: center; margin: 20px 0;">
          <h3 style="color: #dc2626;">⏰ Expires in 48 hours!</h3>
          <p>Use code: <strong>GROWTH30</strong></p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="mailto:info@assetsahead.com?subject=GROWTH30%20Discount" style="background: #f59e0b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-size: 18px;">Claim 30% Discount</a>
        </div>
      </div>
    `
  }
};

interface EmailRequest {
  leadId: string;
  emailType: 'welcome' | 'follow_up_1' | 'follow_up_2' | 'product_info' | 'special_offer';
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
    console.log('Received email sequence request');

    // Validate input
    if (!rawData.leadId || typeof rawData.leadId !== 'string' || !isValidUUID(rawData.leadId)) {
      return new Response(
        JSON.stringify({ error: 'Valid lead ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    if (!rawData.emailType || typeof rawData.emailType !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Email type is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Validate email type
    const validTypes = Object.keys(emailTemplates);
    if (!validTypes.includes(rawData.emailType)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email type' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const { leadId, emailType }: EmailRequest = rawData;
    console.log(`Sending ${emailType} email for lead ${leadId}`);

    // Get lead data
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('first_name, email')
      .eq('id', leadId)
      .single();

    if (leadError || !lead) {
      console.error('Lead not found:', leadError);
      return new Response(
        JSON.stringify({ error: 'Lead not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const template = emailTemplates[emailType];

    // Send email
    const emailResponse = await resend.emails.send({
      from: 'AssetsAhead <noreply@assetsahead.com>',
      to: [lead.email],
      subject: template.subject,
      html: template.html(lead.first_name || 'there'),
    });

    if (emailResponse.error) {
      throw emailResponse.error;
    }

    // Update email sequence record
    const { error: updateError } = await supabase
      .from('email_sequences')
      .update({ 
        status: 'sent', 
        sent_at: new Date().toISOString() 
      })
      .eq('lead_id', leadId)
      .eq('email_type', emailType)
      .eq('status', 'scheduled');

    if (updateError) {
      console.error('Failed to update email sequence:', updateError);
    }

    console.log('Email sent successfully:', emailResponse.data?.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        emailId: emailResponse.data?.id,
        message: 'Email sent successfully' 
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Error in send-email-sequence function:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send email' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
