
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    title: "Customizable Through LED SPACE App",
    description: "Design your own animations, text, and images through the intuitive smartphone app",
    icon: "📱"
  },
  {
    title: "Water and Dust Resistant",
    description: "IP54 rated to protect your belongings from rain, splashes, and dust",
    icon: "💧"
  },
  {
    title: "Premium Quality Materials",
    description: "Built with high-grade nylon and polyester for strength and durability",
    icon: "✨"
  },
  {
    title: "Durable Construction",
    description: "Reinforced stitching and premium zippers that stand up to daily use",
    icon: "🛠️"
  },
  {
    title: "Optimized Airflow Design",
    description: "Strategic padding and mesh for maximum comfort during extended wear",
    icon: "💨"
  },
  {
    title: "Luxurious Back Padding",
    description: "Ergonomically designed padding reduces strain on your back and shoulders",
    icon: "🧠"
  },
  {
    title: "Spacious Interior",
    description: "Multiple compartments for organized storage of all your essentials",
    icon: "📊"
  },
  {
    title: "Padded Laptop Sleeve",
    description: "Secure compartment fits laptops up to 16 inches with shock protection",
    icon: "💻"
  }
];

const FeatureSection = () => {
  return (
    <section id="features" className="py-16 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(15,160,206,0.15),transparent_70%)]"></div>
      
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="outline" className="border-led-blue bg-background/50 text-led-blue px-4 py-1">
            INNOVATION
          </Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight led-text">
            Next-Gen Features
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The future of backpacks is here. Stand out from the crowd with technology that makes a statement.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border border-border hover:border-led-purple transition-colors group">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-led-purple transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-led-purple to-led-blue hover:opacity-90 transition-opacity led-glow"
            onClick={() => window.location.href = '/order'}
          >
            Order Now - Limited Stock!
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
