import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BadgePercent, ShoppingCart, DollarSign, Users } from 'lucide-react';

const PricingSection = () => {
  // Exchange rate calculation (ZAR to USD)
  const exchangeRate = 0.055; // Approximate ZAR to USD exchange rate
  const priceZAR = 1900; // Updated price including shipping
  const originalPriceZAR = 2300; // Original price
  const priceUSD = Math.round(priceZAR * exchangeRate);
  const originalPriceUSD = Math.round(originalPriceZAR * exchangeRate);
  
  // Bulk order pricing
  const bulkPriceZAR = 1700; // Bulk order price
  const bulkPriceUSD = Math.round(bulkPriceZAR * exchangeRate);
  
  return (
    <section id="pricing" className="py-16 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.2),transparent_70%)]"></div>
      
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="outline" className="border-led-purple bg-background/50 text-led-purple px-4 py-1">
            ALL TIME LOW PRICE
          </Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight led-text">
            Special Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our prices have been reduced by R400 to an all time low. Don't miss this opportunity!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="border border-led-purple/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div>
                <Badge className="mb-4 bg-led-pink/20 text-led-pink border-led-pink/50">
                  <BadgePercent className="h-3.5 w-3.5 mr-1" /> R400 OFF
                </Badge>
                <h3 className="text-2xl font-bold mb-2">Individual Purchase</h3>
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
                
                <div className="space-y-2 mb-6">
                  <p className="text-muted-foreground line-through">R{originalPriceZAR} (${originalPriceUSD})</p>
                  <div className="flex flex-col">
                    <p className="text-4xl font-bold text-led-pink">R{priceZAR}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <p className="text-lg text-muted-foreground">${priceUSD} USD</p>
                    </div>
                  </div>
                  <p className="text-sm text-led-pink font-medium">Free shipping included!</p>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-led-purple to-led-blue hover:opacity-90 transition-opacity led-glow"
                  onClick={() => window.location.href = '/order'}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-led-blue/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div>
                <Badge className="mb-4 bg-led-blue/20 text-led-blue border-led-blue/50">
                  <Users className="h-3.5 w-3.5 mr-1" /> BULK DISCOUNT
                </Badge>
                <h3 className="text-2xl font-bold mb-2">Bulk Orders (10+)</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> All individual features included
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Priority shipping
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Dedicated account manager
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Extended warranty options
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Volume discount options available
                  </li>
                </ul>
                
                <div className="space-y-2 mb-6">
                  <div className="flex flex-col">
                    <p className="text-4xl font-bold text-led-blue">R{bulkPriceZAR}/unit</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <p className="text-lg text-muted-foreground">${bulkPriceUSD}/unit USD</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Free delivery for bulk orders</p>
                </div>
                
                <Button size="lg" variant="outline" className="w-full border-led-blue text-led-blue hover:bg-led-blue/10">
                  Request Quote
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <p className="text-center mt-8 text-sm text-muted-foreground max-w-2xl mx-auto">
          Limited stock available. Ships within 3-5 business days. All prices include VAT and shipping. For bulk orders of 10+ units, please contact us for special pricing and customization options.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
