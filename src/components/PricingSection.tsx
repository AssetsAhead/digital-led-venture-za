
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BadgePercent, ShoppingCart, DollarSign } from 'lucide-react';

const PricingSection = () => {
  // Exchange rate calculation (ZAR to USD)
  const exchangeRate = 0.055; // Approximate ZAR to USD exchange rate
  const priceZAR = 2304; // R2300 + R4
  const originalPriceZAR = 2500;
  const priceUSD = Math.round(priceZAR * exchangeRate);
  const originalPriceUSD = Math.round(originalPriceZAR * exchangeRate);
  
  return (
    <section id="pricing" className="py-16 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.2),transparent_70%)]"></div>
      
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="outline" className="border-led-purple bg-background/50 text-led-purple px-4 py-1">
            LIMITED TIME OFFER
          </Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight led-text">
            Launch Special
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Be among the first in South Africa to own this revolutionary backpack at our special introductory price.
          </p>
        </div>
        
        <Card className="max-w-3xl mx-auto border border-led-purple/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <Badge className="mb-4 bg-led-pink/20 text-led-pink border-led-pink/50">
                  <BadgePercent className="h-3.5 w-3.5 mr-1" /> R196 OFF
                </Badge>
                <h3 className="text-2xl font-bold mb-2">Programmable LED Backpack</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Full LED display panel
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Smartphone app control
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Water resistant construction
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> 16" laptop compartment
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> 1 year warranty
                  </li>
                </ul>
              </div>
              
              <div className="md:w-1/2 text-center md:text-right">
                <div className="space-y-2 mb-6">
                  <p className="text-muted-foreground line-through">R{originalPriceZAR} (${originalPriceUSD})</p>
                  <div className="flex flex-col">
                    <p className="text-4xl font-bold text-led-pink">R{priceZAR}</p>
                    <div className="flex items-center justify-end space-x-2 mt-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <p className="text-lg text-muted-foreground">${priceUSD} USD</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">+ R120 delivery anywhere in South Africa</p>
                </div>
                
                <Button size="lg" className="w-full bg-gradient-to-r from-led-purple to-led-blue hover:opacity-90 transition-opacity led-glow">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                
                <p className="text-sm text-muted-foreground mt-4">
                  Limited stock available. Ships within 3-5 business days.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PricingSection;
