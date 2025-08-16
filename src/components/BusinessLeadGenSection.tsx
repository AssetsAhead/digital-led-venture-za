import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

const BusinessLeadGenSection = () => {
  return (
    <section id="leadgen" className="py-16 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.15),transparent_70%)]"></div>
      
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="outline" className="border-led-purple bg-background/50 text-led-purple px-4 py-1">
            BUSINESS SOLUTIONS
          </Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight led-text">
            Lead Generation Excellence
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive solutions to capture, nurture, and convert leads into loyal customers
          </p>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border border-border">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-2">AssetsAhead Presentation</h3>
              <p className="text-muted-foreground">
                Discover how we're capturing Africa's 50M SMBs with innovative lead generation solutions
              </p>
            </div>
            
            <div className="relative w-full h-[450px] rounded-lg overflow-hidden border border-border">
              <iframe 
                src="https://gamma.app/embed/381hc1kgddj1d84" 
                className="w-full h-full"
                allow="fullscreen" 
                title="AssetsAhead: Capturing Africa's 50M SMBs"
              />
            </div>
            
            <div className="flex justify-center mt-6">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => window.open('https://gamma.app/embed/381hc1kgddj1d84', '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
                Open in New Tab
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BusinessLeadGenSection;