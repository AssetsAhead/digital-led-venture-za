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

        <Tabs defaultValue="presentation" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="presentation">Business LeadGen</TabsTrigger>
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="presentation" className="space-y-6">
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
          </TabsContent>
          
          <TabsContent value="strategies" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border border-border">
                <CardContent className="p-6">
                  <div className="text-3xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold mb-2">Targeted Acquisition</h3>
                  <p className="text-muted-foreground">
                    Multi-channel campaigns designed to reach your ideal customer profile with precision messaging
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border border-border">
                <CardContent className="p-6">
                  <div className="text-3xl mb-4">🔄</div>
                  <h3 className="text-xl font-semibold mb-2">Automation & Nurturing</h3>
                  <p className="text-muted-foreground">
                    Smart workflows that engage prospects at the right time with personalized content
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border border-border">
                <CardContent className="p-6">
                  <div className="text-3xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold mb-2">Data-Driven Insights</h3>
                  <p className="text-muted-foreground">
                    Real-time analytics and optimization to maximize ROI and conversion rates
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border border-border">
                <CardContent className="p-6">
                  <div className="text-3xl mb-4">💬</div>
                  <h3 className="text-xl font-semibold mb-2">WhatsApp Integration</h3>
                  <p className="text-muted-foreground">
                    Direct customer engagement through Africa's most popular messaging platform
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <Card className="bg-card/50 backdrop-blur-sm border border-border">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-led-purple mb-2">50M+</div>
                  <h3 className="text-lg font-semibold mb-1">SMBs Targeted</h3>
                  <p className="text-muted-foreground text-sm">
                    Across Africa's fastest-growing markets
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border border-border">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-led-blue mb-2">85%</div>
                  <h3 className="text-lg font-semibold mb-1">Conversion Rate</h3>
                  <p className="text-muted-foreground text-sm">
                    From qualified leads to customers
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border border-border">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-led-pink mb-2">300%</div>
                  <h3 className="text-lg font-semibold mb-1">ROI Increase</h3>
                  <p className="text-muted-foreground text-sm">
                    Average client return on investment
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-card/50 backdrop-blur-sm border border-border">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-4">Ready to Transform Your Lead Generation?</h3>
                <p className="text-muted-foreground mb-6">
                  Join hundreds of businesses already scaling with our proven lead generation system
                </p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-led-purple to-led-blue hover:opacity-90 transition-opacity led-glow"
                  onClick={() => window.location.href = '#contact'}
                >
                  Get Started Today
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default BusinessLeadGenSection;