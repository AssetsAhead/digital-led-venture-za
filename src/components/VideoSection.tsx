
import React from 'react';
import { Badge } from '@/components/ui/badge';

const VideoSection = () => {
  return (
    <section id="video" className="py-16 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.2),transparent_70%)]"></div>
      
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="outline" className="border-led-purple bg-background/50 text-led-purple px-4 py-1">
            DEMONSTRATION
          </Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight led-text">
            See It In Action
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Watch how the programmable LED backpack works and how you can customize it.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-2xl">
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/r0NOdgJImSk" 
              title="LED Backpack Demo" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            The LED SPACE app allows you to create custom designs, text, and animations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
