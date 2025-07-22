
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-display font-bold mb-4">
              <span className="text-led-purple">Assets</span>
              <span className="text-led-blue">Ahead</span>
            </h3>
            <p className="text-muted-foreground">
              South Africa's premier provider of innovative tech-enhanced products.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-led-purple transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-muted-foreground hover:text-led-purple transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-led-purple transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="text-muted-foreground hover:text-led-purple transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-led-purple transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://www.privacypolicies.com/live/6f38d2ad-a9e4-4442-a370-f0c362b8d41a" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-led-purple transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-muted-foreground hover:text-led-purple transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/return-policy" className="text-muted-foreground hover:text-led-purple transition-colors">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-led-purple transition-colors">
                  Shipping Information
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} AssetsAhead. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground">
              Designed and developed in South Africa
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
