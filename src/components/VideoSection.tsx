
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const { toast } = useToast();

  const togglePlay = () => {
    const video = document.getElementById('demo-video') as HTMLVideoElement;
    if (video) {
      if (video.paused) {
        video.play().catch(error => {
          toast({
            title: "Video playback failed",
            description: "The video couldn't be played. Please try again.",
            variant: "destructive"
          });
          console.error("Video playback error:", error);
        });
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    const video = document.getElementById('demo-video') as HTMLVideoElement;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(!isMuted);
      
      if (!video.muted) {
        toast({
          title: "Sound enabled",
          description: "Video sound has been turned on."
        });
      }
    }
  };

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
            <video 
              id="demo-video"
              className="w-full h-full object-cover"
              poster="/lovable-uploads/72778d36-88d3-4ab2-afb7-5c07ddc172c4.png"
              muted
              playsInline
              loop
            >
              {/* Updated video source with the new URL */}
              <source src="LED Customizable Backpack_Product highlights_Pippit_202505201124" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex items-center justify-between">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20" 
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20" 
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
              </Button>
            </div>
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
