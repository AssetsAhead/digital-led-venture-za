import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, BadgePercent } from 'lucide-react';

const LEDProductsSection = () => {
  // Exchange rate calculation (ZAR to USD)
  const exchangeRate = 0.055; // Approximate ZAR to USD exchange rate
  const priceZAR = 2520; // Updated price including shipping (R2400 + R120 shipping)
  const originalPriceZAR = 2700; // Original price
  const priceUSD = Math.round(priceZAR * exchangeRate);
  const originalPriceUSD = Math.round(originalPriceZAR * exchangeRate);

  return (
    <section id="led-products" className="py-16 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.1),transparent_70%)]"></div>
      
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="outline" className="border-led-pink bg-background/50 text-led-pink px-4 py-1">
            💡 LED BIZZ-IN-A-BAG
          </Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight led-text">
            Featured LED Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Innovative LED solutions that help you stand out and build your business
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Product Images */}
          <div className="flex justify-center">
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

          {/* Product Info */}
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BadgePercent className="h-5 w-5 text-led-pink animate-led-pulse" />
                  <span className="font-medium text-led-pink">Special Launch Offer - R300 OFF</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight led-text mb-4">
                  Programmable LED Backpack
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  South Africa's most advanced customizable backpack. Express yourself with animated LED displays you control from your phone. Perfect for entrepreneurs, students, and anyone wanting to make a statement.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-semibold">
                        <span className="text-muted-foreground line-through mr-2">R{originalPriceZAR}</span>
                        <span className="text-led-pink text-2xl">R{priceZAR}</span>
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          <span className="line-through">${originalPriceUSD}</span> 
                          <span className="ml-1 font-medium">${priceUSD} USD</span>
                        </p>
                      </div>
                      <p className="text-sm text-led-pink font-medium mt-1">Free shipping included!</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      className="bg-gradient-to-r from-led-purple to-led-blue hover:opacity-90 transition-opacity led-glow flex-1"
                      onClick={() => window.location.href = '/order'}
                    >
                      Buy Now - Limited Stock!
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-led-pink/50 text-led-pink hover:bg-led-pink/10"
                      onClick={() => window.location.href = '/quote'}
                    >
                      Get Bulk Quote
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full pulse"></span>
                    <span className="text-sm text-muted-foreground">
                      <span className="font-medium text-green-500">8 people</span> purchased in the last 24 hours
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LEDProductsSection;