
import React from 'react';
import { Button } from '@/components/ui/button';
import { BadgePercent, DollarSign } from 'lucide-react';

const HeroSection = () => {
  // Exchange rate calculation (ZAR to USD)
  const exchangeRate = 0.055; // Approximate ZAR to USD exchange rate
  const priceZAR = 1900; // Updated price including shipping
  const originalPriceZAR = 2300; // Original price
  const priceUSD = Math.round(priceZAR * exchangeRate);
  const originalPriceUSD = Math.round(originalPriceZAR * exchangeRate);
  
  return (
    <section className="relative overflow-hidden pt-24 pb-12">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_50%)]"></div>
      <div className="absolute top-20 left-0 w-64 h-64 bg-led-blue/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-led-pink/20 rounded-full filter blur-3xl"></div>

      <div className="container relative px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex flex-col space-y-4 lg:w-1/2">
            <div className="flex items-center gap-2">
              <BadgePercent className="h-5 w-5 text-led-pink animate-led-pulse" />
              <span className="font-medium text-led-pink">All Time Low Price - R400 OFF</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight led-text">
              Programmable<br />
              LED Backpack
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-[600px]">
              Stand out with South Africa's most advanced customizable backpack. Express yourself with animated LED displays you control from your phone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="space-y-2">
                <p className="text-xl font-semibold">
                  <span className="text-muted-foreground line-through mr-2">R{originalPriceZAR}</span>
                  <span className="text-led-pink text-2xl">R{priceZAR}</span>
                </p>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    <span className="line-through">${originalPriceUSD}</span> 
                    <span className="ml-1 font-medium">${priceUSD} USD</span>
                  </p>
                </div>
                <p className="text-sm text-led-pink font-medium">Free shipping included!</p>
              </div>
              
              <Button className="bg-gradient-to-r from-led-purple to-led-blue hover:opacity-90 transition-opacity led-glow sm:ml-auto">
                Buy Now - Limited Stock!
              </Button>
            </div>
            
            <div className="pt-4 flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full pulse"></span>
              <span className="text-sm text-muted-foreground">
                <span className="font-medium text-green-500">8 people</span> purchased in the last 24 hours
              </span>
            </div>
          </div>
          
          {/* Hero images */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="animate-float">
                  <img
                    src="/lovable-uploads/72778d36-88d3-4ab2-afb7-5c07ddc172c4.png"
                    alt="Programmable LED Backpack"
                    className="relative z-10 drop-shadow-2xl rounded-lg"
                  />
                </div>
                <div className="animate-float animation-delay-300">
                  <img
                    src="/lovable-uploads/dc7e2e62-8fd6-4359-ab6a-3f9f613ad2af.png"
                    alt="LED Backpack with QR Display"
                    className="relative z-10 drop-shadow-2xl rounded-lg"
                  />
                </div>
                <div className="animate-float animation-delay-500 col-span-2">
                  <img
                    src="/lovable-uploads/2a1e85b0-8d71-4f8e-9546-4dc39b180adb.png"
                    alt="Waterproof LED Backpack Material"
                    className="relative z-10 drop-shadow-2xl rounded-lg"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-led-purple/30 to-led-blue/30 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
