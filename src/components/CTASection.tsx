import React from 'react';
import { Button } from '@/components/ui/button';
import { BadgeDollarSign, ShoppingCart, DollarSign } from 'lucide-react';

const CTASection = () => {
  // Exchange rate calculation (ZAR to USD)
  const exchangeRate = 0.055; // Approximate ZAR to USD exchange rate
  const priceZAR = 2520; // Updated price including shipping (R2400 + R120 shipping)
  const priceUSD = Math.round(priceZAR * exchangeRate);
  
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-led-purple/10 to-background pointer-events-none"></div>
      
      <div className="container px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-1 mb-8 rounded-full bg-led-pink/20 text-led-pink border border-led-pink/30">
            <BadgeDollarSign className="h-5 w-5 mr-1" /> 
            <span className="px-3 py-1 text-sm font-medium">
              Introductory Offer - R300 OFF Limited Time Only
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 led-text">
            Be The First To Make A Statement
          </h2>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Don't miss out on the most innovative backpack to hit the South African market. Express yourself with limitless customization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-led-purple to-led-blue hover:opacity-90 transition-opacity led-glow"
              onClick={() => window.location.href = '/order'}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Buy Now - R{priceZAR} <span className="ml-1 text-sm opacity-80">(${priceUSD})</span>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-led-pink text-led-pink hover:bg-led-pink/10"
              onClick={() => window.location.href = '/quote'}
            >
              Get Bulk Quote
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-white/80">
            Free shipping included! Limited stock available.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
