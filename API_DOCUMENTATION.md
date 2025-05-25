
# API Documentation for GHL Integration

## Overview
This document outlines the API endpoints and data structures for integrating the LED Backpack website with GoHighLevel (GHL).

## Base Information
- **Project Type**: Static React Website
- **Hosting**: Lovable Platform
- **GitHub Repository**: Connected and synced
- **Framework**: Vite + React + TypeScript

## Contact Form API

### Endpoint Information
**Current Setup**: Frontend form (needs backend integration)
**Recommended**: Create webhook endpoint for GHL integration

### Form Data Structure
```typescript
interface ContactFormData {
  name: string;          // Required, min 2 characters
  email: string;         // Required, valid email format
  phone?: string;        // Optional, international format
  message: string;       // Required, min 10 characters
  consent: boolean;      // Required, GDPR compliance
}
```

### Integration Points

#### 1. Contact Section Form
**File**: `src/components/ContactSection.tsx`
**Purpose**: Main contact form for customer inquiries
**Fields**: Name, Email, Phone, Message
**Validation**: Built-in form validation with error handling

#### 2. CTA Section
**File**: `src/components/CTASection.tsx` 
**Purpose**: Primary conversion action
**Action**: Lead capture for product interest

#### 3. Newsletter/Email Capture
**Location**: Throughout the site
**Purpose**: Build email list for marketing

## Webhook Integration

### Required Webhook URL Format
```
POST https://your-ghl-webhook-url.com/leads
```

### Headers Required
```
Content-Type: application/json
Authorization: Bearer YOUR_GHL_API_KEY
```

### Response Format Expected
```json
{
  "success": true,
  "leadId": "ghl_lead_id_here",
  "message": "Lead created successfully"
}
```

## Error Handling
- Form validation prevents invalid submissions
- Toast notifications show success/error messages
- Graceful fallback for failed API calls

## Security Considerations
- Environment variables for sensitive data
- CORS configuration for webhook endpoints
- Rate limiting on form submissions
- Spam protection mechanisms

## Testing Endpoints
For testing the integration:
1. Use browser developer tools to monitor form submissions
2. Test with sample data in GHL sandbox
3. Verify webhook delivery and lead creation
4. Test error scenarios and fallbacks
