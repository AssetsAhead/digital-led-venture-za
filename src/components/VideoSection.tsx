
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
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

  const handleVideoError = () => {
    setHasError(true);
    toast({
      title: "Video unavailable",
      description: "The video file could not be loaded. Please check back later.",
      variant: "destructive"
    });
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
            {hasError ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-muted p-8 text-center">
                <div className="text-destructive mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Video Unavailable</h3>
                <p className="text-muted-foreground max-w-md">
                  The video file is currently missing or could not be loaded. Please contact support or check back later.
                </p>
              </div>
            ) : (
              <video 
                id="demo-video"
                className="w-full h-full object-cover"
                poster="/lovable-uploads/72778d36-88d3-4ab2-afb7-5c07ddc172c4.png"
                muted
                playsInline
                loop
                onError={handleVideoError}
              >
                <source src="/LED_Backpack_Demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            
            {!hasError && (
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
            )}
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
