
# Deployment Guide for GHL Integration

## Current Deployment Status
- **Platform**: Lovable (lovable.dev)
- **GitHub**: Connected and synced
- **Live URL**: Available through Lovable publish feature
- **Build Status**: Automated through Lovable platform

## Quick Setup for GHL Team

### Step 1: Access the Live Site
1. The website is live and accessible through Lovable
2. GitHub repository contains all source code
3. Real-time preview available in Lovable editor

### Step 2: Environment Configuration
Create these environment variables in your deployment:

```bash
# GoHighLevel Integration
VITE_GHL_WEBHOOK_URL=https://your-ghl-instance.com/webhook/leads
VITE_GHL_API_KEY=your_api_key_here
VITE_GHL_LOCATION_ID=your_location_id

# Optional: Analytics
VITE_GA_TRACKING_ID=your_google_analytics_id
VITE_FB_PIXEL_ID=your_facebook_pixel_id
```

### Step 3: Webhook Setup in GHL
1. **Create new webhook** in GHL admin panel
2. **Set trigger**: Form submission or API call
3. **Configure response**: JSON format as documented
4. **Test connection** with sample data

### Step 4: Form Integration
The contact forms are ready and need webhook connection:

**Contact Form Location**: Main contact section
**Form Handler**: Needs webhook URL configuration
**Response Handling**: Built-in success/error messaging

## File Structure for Reference
```
/
├── src/
│   ├── components/
│   │   ├── ContactSection.tsx    # Main contact form
│   │   ├── CTASection.tsx        # Conversion actions
│   │   ├── PricingSection.tsx    # Pricing display
│   │   └── ...other components
│   ├── pages/
│   │   └── Index.tsx             # Main page layout
│   └── ...
├── public/
│   └── lovable-uploads/          # Product images
├── GHL_INTEGRATION.md            # This integration guide
├── API_DOCUMENTATION.md          # API details
└── README.md                     # Project overview
```

## Custom Domain Setup (Optional)
If you want a custom domain:
1. **In Lovable**: Go to Project > Settings > Domains
2. **Add your domain**: yourledbackpack.com
3. **Update DNS**: Point to Lovable servers
4. **SSL**: Automatically handled by Lovable

## Monitoring and Analytics
- **Form Submissions**: Monitor through GHL dashboard
- **Website Traffic**: Google Analytics integration ready
- **Lead Quality**: Track conversion rates in GHL
- **Error Monitoring**: Browser console and GHL logs

## Support Contacts
- **Technical Issues**: Through GitHub repository
- **Lovable Platform**: Lovable support team
- **Integration Help**: GHL support documentation

## Backup and Version Control
- **Code Backup**: Automatically synced to GitHub
- **Version History**: Available in Lovable editor
- **Rollback**: Easy rollback through Lovable interface
