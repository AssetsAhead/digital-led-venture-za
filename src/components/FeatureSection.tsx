
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    title: "Business Leadgen",
    description: "Cutting-edge lead generation strategies to fuel your sales pipeline",
    icon: "🔥"
  },
  {
    title: "Diva Stemcells",
    description: "Revolutionary beauty and wellness solutions for timeless vitality",
    icon: "💎"
  },
  {
    title: "LED Bizz-in-a-Bag",
    description: "Turnkey LED business opportunities for aspiring entrepreneurs",
    icon: "💡"
  },
  {
    title: "Web Creation & Digital Marketing",
    description: "Stunning websites and data-driven campaigns that convert",
    icon: "🌐"
  },
  {
    title: "SAAS & App Development",
    description: "Scalable software solutions to power the future",
    icon: "🚀"
  }
];

const FeatureSection = () => {
  return (
    <section id="services" className="py-16 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(15,160,206,0.15),transparent_70%)]"></div>
      
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="outline" className="border-led-blue bg-background/50 text-led-blue px-4 py-1">
            OUR EXPERTISE
          </Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight led-text">
            High-Impact Solutions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you're launching a startup, expanding your digital footprint, or investing in high-yield ventures, AssetsAhead delivers the tools and expertise to build, grow, and monetize.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border border-border hover:border-led-purple transition-colors group">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-led-purple transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-led-purple to-led-blue hover:opacity-90 transition-opacity led-glow"
            onClick={() => window.location.href = '#contact'}
          >
            Start Your Journey
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
