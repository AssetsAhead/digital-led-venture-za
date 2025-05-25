
# LED Customizable Backpack Website

## Project Overview
A modern, responsive e-commerce website showcasing LED customizable backpacks with full GoHighLevel (GHL) integration capabilities.

## 🚀 Live Demo
- **Platform**: Lovable (lovable.dev)
- **GitHub**: Connected with real-time sync
- **Status**: Production-ready

## 🛠 Technology Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn UI components
- **Icons**: Lucide React
- **Forms**: React Hook Form with validation
- **Notifications**: Toast system for user feedback
- **Charts**: Recharts for data visualization
- **Deployment**: Lovable platform with GitHub sync

## 📱 Features
- **Responsive Design**: Mobile-first, works on all devices
- **Interactive Gallery**: Product showcase with hover effects
- **Video Integration**: Product demonstration videos
- **Contact Forms**: Lead capture with validation
- **Pricing Section**: Clear pricing display
- **FAQ Section**: Common questions and answers
- **SEO Optimized**: Meta tags and semantic HTML

## 🔌 GoHighLevel Integration Ready

### Integration Points
1. **Contact Form** → Lead capture for CRM
2. **CTA Buttons** → Conversion tracking
3. **Pricing Actions** → Sales funnel integration
4. **Newsletter Signup** → Email marketing lists

### Required Setup
```bash
# Environment Variables Needed
VITE_GHL_WEBHOOK_URL=your_webhook_url
VITE_GHL_API_KEY=your_api_key
VITE_GHL_LOCATION_ID=your_location_id
```

## 📁 Project Structure
```
src/
├── components/           # React components
│   ├── ui/              # Shadcn UI components
│   ├── Header.tsx       # Navigation
│   ├── HeroSection.tsx  # Landing section
│   ├── FeatureSection.tsx
│   ├── GallerySection.tsx
│   ├── VideoSection.tsx
│   ├── PricingSection.tsx
│   ├── ContactSection.tsx  # 🎯 GHL Integration Point
│   ├── CTASection.tsx      # 🎯 GHL Integration Point
│   └── Footer.tsx
├── pages/
│   └── Index.tsx        # Main page layout
└── hooks/               # Custom React hooks
```

## 🎯 Key Components for GHL Integration

### ContactSection.tsx
- **Purpose**: Main lead capture form
- **Fields**: Name, Email, Phone, Message
- **Validation**: Built-in with error handling
- **Integration**: Ready for webhook connection

### CTASection.tsx
- **Purpose**: Primary conversion point
- **Action**: "Get Your LED Backpack" button
- **Integration**: Ready for GHL funnel connection

### PricingSection.tsx
- **Purpose**: Display pricing and capture purchase intent
- **Integration**: Connect pricing buttons to sales process

## 🚀 Quick Start for Developers

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Git

### Installation
```bash
# Clone the repository
git clone [your-github-repo-url]

# Navigate to project
cd led-backpack-website

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📋 Integration Checklist for GHL Team

- [ ] Set up webhook URL in GHL
- [ ] Configure environment variables
- [ ] Test contact form submission
- [ ] Set up lead automation in GHL
- [ ] Configure email sequences
- [ ] Test CTA button actions
- [ ] Set up conversion tracking
- [ ] Configure SMS notifications (optional)

## 📚 Documentation
- [`GHL_INTEGRATION.md`](./GHL_INTEGRATION.md) - Complete integration guide
- [`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md) - API endpoints and data structures
- [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) - Deployment instructions

## 🐛 Troubleshooting
- **Form not submitting**: Check webhook URL and API keys
- **Images not loading**: Verify image paths in public folder
- **Styling issues**: Ensure Tailwind CSS is properly configured
- **Build errors**: Check console logs and component imports

## 📞 Support
- **GitHub Issues**: For bug reports and feature requests
- **Lovable Platform**: For deployment and hosting issues
- **GHL Integration**: Refer to integration documentation

## 📄 License
This project is ready for commercial use with your LED backpack business.

---

**Ready for GoHighLevel Integration** ✅  
All forms and conversion points are prepared for immediate GHL connection.
