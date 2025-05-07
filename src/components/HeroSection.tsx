
import React from 'react';
import { Button } from '@/components/ui/button';
import { BadgePercent } from 'lucide-react';

const HeroSection = () => {
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
              <span className="font-medium text-led-pink">Limited Time Offer - R200 OFF</span>
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
                  <span className="text-muted-foreground line-through mr-2">R2500</span>
                  <span className="text-led-pink text-2xl">R2300</span>
                </p>
                <p className="text-sm text-muted-foreground">Free shipping on orders over R2000</p>
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
          
          {/* Hero image */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative animate-float">
              <img
                src="/lovable-uploads/72778d36-88d3-4ab2-afb7-5c07ddc172c4.png"
                alt="Programmable LED Backpack"
                width={500}
                height={500}
                className="relative z-10 drop-shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-led-purple/30 to-led-blue/30 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
