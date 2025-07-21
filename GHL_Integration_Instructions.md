# GHL Integration Instructions for LED Backpack Components

## Quick Setup Guide

### 1. Replace Webhook URLs
In each HTML file, replace `YOUR_GHL_WEBHOOK_URL` with your actual GoHighLevel webhook URL:
- `GHL_ContactForm.html` - Line 195 and 246
- `GHL_CTASection.html` - Line 240, 253, 271, and 306
- `GHL_PricingSection.html` - Line 338 and 356

### 2. Replace Page URLs
Replace these placeholder URLs with your actual page URLs:
- `YOUR_ORDER_PAGE_URL` - Your order/checkout page
- `YOUR_QUOTE_PAGE_URL` - Your quote request page

### 3. Upload to GHL
1. Copy the HTML content from each file
2. Create new pages/sections in GoHighLevel
3. Paste the HTML content into the custom HTML elements
4. Test the webhook connections

## Components Included

### 1. GHL_ContactForm.html
**Purpose**: Lead capture through contact form
**Features**:
- Name, email, phone, message fields
- Hidden tracking fields (source, timestamp, page_url)
- Responsive design with LED theme
- Social media links
- WhatsApp integration

**Webhook Payload**:
```json
{
  "name": "Customer Name",
  "email": "customer@email.com", 
  "phone": "+1234567890",
  "message": "Customer message",
  "source": "LED Backpack Website",
  "page_url": "current_page_url",
  "timestamp": "2025-01-XX"
}
```

### 2. GHL_CTASection.html
**Purpose**: Primary conversion section with purchase intent tracking
**Features**:
- Main CTA buttons (Buy Now, Get Quote)
- Purchase intent tracking
- Optional lead capture form
- Pricing display
- Mobile responsive

**Tracking Events**:
- `purchase_intent` - When Buy Now is clicked
- `quote_request` - When Get Quote is clicked
- `lead_capture` - When email is submitted

### 3. GHL_PricingSection.html
**Purpose**: Display pricing and capture purchase intent
**Features**:
- Individual vs Bulk pricing cards
- Feature comparisons
- Price tracking for both options
- Mobile responsive
- LED theme styling

**Tracking Events**:
- `individual_purchase_intent` - Individual purchase button clicked
- `bulk_quote_request` - Bulk quote button clicked

## CSS Features

### LED Theme Colors
- **LED Purple**: `#8B5CF6`
- **LED Blue**: `#0FA0CE` 
- **LED Pink**: `#EC4899`
- **LED Electric**: `#3B82F6`

### Special Effects
- **LED Text Shadow**: Multi-colored glow effect
- **LED Button Glow**: Box shadow with LED colors
- **Gradient Backgrounds**: Purple/blue gradients
- **Backdrop Blur**: Modern glass morphism effects

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly button sizes
- Readable typography scaling

## GHL Automation Setup

### 1. Webhook Configuration
Create webhooks in GHL to receive:
- Contact form submissions
- Purchase intent tracking
- Quote requests
- Lead captures

### 2. Automation Triggers
Set up automations for:
- New lead notifications
- Purchase intent follow-ups
- Quote request processing
- Email nurture sequences

### 3. Lead Scoring
Assign scores based on:
- Contact form submission: +10 points
- Purchase intent: +20 points
- Quote request: +15 points
- Page visits: +5 points

## Testing Checklist

- [ ] Contact form submits to GHL webhook
- [ ] Purchase intent tracking works
- [ ] Quote requests are captured
- [ ] Responsive design works on mobile
- [ ] All buttons link to correct pages
- [ ] LED effects display properly
- [ ] Social media links work
- [ ] WhatsApp link functions

## Customization Options

### Easy Customizations
1. **Colors**: Modify LED color values in CSS
2. **Pricing**: Update price values in HTML
3. **Text**: Change copy and messaging
4. **Links**: Update social media and contact links

### Advanced Customizations
1. **Add more tracking events**
2. **Include additional form fields**
3. **Modify animations and effects**
4. **Add A/B testing elements**

## Support
For technical issues with these components:
1. Check console for JavaScript errors
2. Verify webhook URLs are correct
3. Test form submissions manually
4. Ensure GHL webhook is receiving data

## Performance Notes
- Inline CSS for better GHL compatibility
- Minimal JavaScript dependencies
- Optimized for fast loading
- Mobile-optimized images and fonts