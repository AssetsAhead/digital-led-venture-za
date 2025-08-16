
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, TrendingUp } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-24 pb-12">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_50%)]"></div>
      <div className="absolute top-20 left-0 w-64 h-64 bg-led-blue/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-led-pink/20 rounded-full filter blur-3xl"></div>

      <div className="container relative px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex flex-col space-y-6 lg:w-3/5 text-center lg:text-left">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <Sparkles className="h-5 w-5 text-led-pink animate-led-pulse" />
              <span className="font-medium text-led-pink">Unlocking Growth Through Innovation</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight led-text">
              Welcome to<br />
              <span className="text-led-purple">Assets</span><span className="text-led-blue">Ahead</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 max-w-[700px] mx-auto lg:mx-0">
              We specialize in high-impact solutions designed to generate leads, elevate brands, and scale businesses. Your next big opportunity starts here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-led-purple to-led-blue hover:opacity-90 transition-opacity led-glow"
                onClick={() => window.location.href = '#services'}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Get Started
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-led-pink/50 text-led-pink hover:bg-led-pink/10"
                onClick={() => window.location.href = '/presentation'}
              >
                Explore Our Portfolio
              </Button>
            </div>
          </div>
          
          {/* Hero visual */}
          <div className="lg:w-2/5 flex justify-center">
            <div className="relative">
              <div className="grid grid-cols-1 gap-6 max-w-sm">
                <div className="animate-float">
                  <img
                    src="/lovable-uploads/72778d36-88d3-4ab2-afb7-5c07ddc172c4.png"
                    alt="LED Business Solutions"
                    className="relative z-10 drop-shadow-2xl rounded-lg w-full"
                  />
                </div>
                <div className="animate-float animation-delay-300">
                  <img
                    src="/lovable-uploads/dc7e2e62-8fd6-4359-ab6a-3f9f613ad2af.png"
                    alt="Digital Innovation"
                    className="relative z-10 drop-shadow-2xl rounded-lg w-full"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-led-purple/30 to-led-blue/30 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
