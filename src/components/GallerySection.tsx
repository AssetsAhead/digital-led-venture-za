
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const GallerySection = () => {
  return (
    <section id="gallery" className="py-16 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.15),transparent_70%)]"></div>
      
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="outline" className="border-led-pink bg-background/50 text-led-pink px-4 py-1">
            DISPLAY
          </Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight led-text">
            Express Your Creativity
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Customize your backpack with any design, text, or animation. The possibilities are endless.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="overflow-hidden border-0 rounded-lg neon-border">
            <img 
              src="/lovable-uploads/f8becb11-4814-46d3-93eb-bd1fc1ad6501.png" 
              alt="LED Backpack Side View" 
              className="w-full h-auto object-cover aspect-square"
            />
          </Card>
          
          <Card className="overflow-hidden border-0 rounded-lg neon-border">
            <img 
              src="/lovable-uploads/4ead3332-c7e7-4aa8-a503-3110e0724ae7.png" 
              alt="LED Backpack Interior View" 
              className="w-full h-auto object-cover aspect-square"
            />
          </Card>
          
          <Card className="overflow-hidden border-0 rounded-lg neon-border">
            <img 
              src="/lovable-uploads/dc7e2e62-8fd6-4359-ab6a-3f9f613ad2af.png" 
              alt="LED Backpack QR Code Display" 
              className="w-full h-auto object-cover aspect-square"
            />
          </Card>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="overflow-hidden border-0 rounded-lg neon-border">
            <img 
              src="/lovable-uploads/2a1e85b0-8d71-4f8e-9546-4dc39b180adb.png" 
              alt="Waterproof Material" 
              className="w-full h-auto object-cover"
            />
          </Card>
          
          <div className="flex flex-col justify-center p-4">
            <h3 className="text-2xl font-bold mb-4">Waterproof Material</h3>
            <p className="text-muted-foreground">
              Made with high density nylon fabric, our LED backpacks are designed to withstand water, provide resistance to wear and tear, and maintain color integrity even with frequent use.
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              <li className="flex items-center">
                <span className="mr-2 text-led-purple">✓</span> Water resistant
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-led-purple">✓</span> Highly durable
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-led-purple">✓</span> Non-fading color
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-led-purple">✓</span> Stain resistant
              </li>
            </ul>
          </div>
        </div>
        
        <p className="text-center mt-12 text-lg text-muted-foreground max-w-2xl mx-auto">
          Easily change your display with the tap of a button. Create animations, display messages, or show off your favorite pixel art.
        </p>
      </div>
    </section>
  );
};

export default GallerySection;
