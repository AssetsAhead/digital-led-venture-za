
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
              src="/lovable-uploads/9ee3977b-96d5-4b5a-a1a1-969a3e40957b.png" 
              alt="LED Backpack Display" 
              className="w-full h-auto object-cover aspect-square"
            />
          </Card>
          
          <Card className="overflow-hidden border-0 rounded-lg neon-border">
            <img 
              src="/lovable-uploads/f754fd4c-abfd-4c0b-b4e6-aabcc932f760.png" 
              alt="LED Backpack App Control" 
              className="w-full h-auto object-cover aspect-square"
            />
          </Card>
          
          <Card className="overflow-hidden border-0 rounded-lg neon-border">
            <img 
              src="/lovable-uploads/0561b03c-7158-4ce3-8856-e7d2378696b6.png" 
              alt="Premium Zipper Quality" 
              className="w-full h-auto object-cover aspect-square"
            />
          </Card>
        </div>
        
        <div className="mt-12 text-center">
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Easily change your display with the tap of a button. Create animations, display messages, or show off your favorite pixel art.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
