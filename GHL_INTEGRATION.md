
# GoHighLevel Integration Guide

## Project Overview
- **Technology Stack**: React, TypeScript, Vite, Tailwind CSS, Shadcn UI
- **Purpose**: LED Customizable Backpack E-commerce Website
- **Deployment**: Lovable platform with GitHub sync
- **Live Preview**: Available in Lovable editor

## Project Description
This is a modern e-commerce website for LED customizable backpacks featuring:
- Product showcase with interactive gallery
- Video demonstrations
- Pricing information
- Contact forms for lead capture
- FAQ section
- Responsive design optimized for all devices

## Integration Points for GHL

### 1. Contact Form Integration
**Location**: ContactSection component
- **Form Fields**: Name, Email, Phone, Message
- **Purpose**: Lead capture for sales team
- **Webhook Target**: Send form submissions to GHL CRM

### 2. CTA (Call-to-Action) Integration
**Location**: CTASection component
- **Purpose**: Primary conversion point
- **Action**: "Get Your LED Backpack" button
- **Integration**: Connect to GHL landing pages or order forms

### 3. Pricing Section Integration
**Location**: PricingSection component
- **Purpose**: Display pricing and capture purchase intent
- **Integration**: Connect pricing buttons to GHL sales funnels

## Required Environment Variables
```
VITE_GHL_WEBHOOK_URL=your_ghl_webhook_url_here
VITE_GHL_API_KEY=your_ghl_api_key_here
VITE_GHL_LOCATION_ID=your_ghl_location_id_here
```

## Webhook Configuration for GHL

### Contact Form Webhook
**Expected Payload**:
```json
{
  "name": "Customer Name",
  "email": "customer@email.com",
  "phone": "+1234567890",
  "message": "Customer inquiry message",
  "source": "LED Backpack Website",
  "timestamp": "2025-01-XX",
  "page_url": "website_url"
}
```

### Lead Capture Webhook
**Expected Payload**:
```json
{
  "email": "customer@email.com",
  "source": "CTA Button",
  "product_interest": "LED Backpack",
  "timestamp": "2025-01-XX",
  "page_url": "website_url"
}
```

## Integration Steps for GHL Team

1. **Set up webhooks** in GHL to receive form submissions
2. **Configure automation** to handle new leads
3. **Set up email sequences** for lead nurturing
4. **Connect payment processing** if handling transactions
5. **Configure SMS notifications** for urgent inquiries

## Technical Implementation Notes

- All forms use React Hook Form with validation
- Toast notifications confirm successful submissions
- Responsive design works on all devices
- Fast loading with optimized images
- SEO-friendly structure

## Support and Contact

For technical questions about this integration, contact the development team through the GitHub repository or Lovable project.
