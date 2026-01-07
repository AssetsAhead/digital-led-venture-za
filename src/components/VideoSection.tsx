import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const VideoSection = () => {
  // Replace with your actual YouTube video ID
  const youtubeVideoId = "dQw4w9WgXcQ"; // Placeholder - update with your video ID

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
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Watch how the programmable LED backpack works and how you can customize it.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video overflow-hidden rounded-lg shadow-2xl bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1`}
              title="LED Backpack Demo"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          <p className="text-center text-sm text-white/80 mt-4">
            The LED SPACE app allows you to create custom designs, text, and animations.
          </p>
          
          <div className="text-center mt-8">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-led-purple to-led-blue hover:opacity-90 transition-opacity led-glow"
              onClick={() => window.location.href = '/order'}
            >
              Order Yours Today!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
