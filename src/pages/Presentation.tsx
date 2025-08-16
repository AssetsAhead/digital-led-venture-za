import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Presentation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12">
        <div className="container px-4 md:px-6">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-6 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold led-text">
                <span className="text-led-purple">Assets</span><span className="text-led-blue">Ahead</span> Presentation
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                We specialize in high-impact solutions designed to generate leads, elevate brands, and scale businesses
              </p>
            </div>
          </div>

          {/* Presentation Embed */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  AssetsAhead: Capturing Africa's 50M SMBs
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://gamma.app/embed/381hc1kgddj1d84', '_blank')}
                  className="gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open in New Tab
                </Button>
              </div>
              
              <div className="relative w-full" style={{ paddingBottom: '64.28%' }}>
                <iframe
                  src="https://gamma.app/embed/381hc1kgddj1d84"
                  className="absolute top-0 left-0 w-full h-full rounded border border-border"
                  allow="fullscreen"
                  title="AssetsAhead: Capturing Africa's 50M SMBs"
                />
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-led-purple mb-2">Lead Generation</h3>
                <p className="text-sm text-muted-foreground">
                  Innovative strategies to identify and convert high-quality prospects into customers.
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-led-blue mb-2">Brand Elevation</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive branding solutions that establish market presence and credibility.
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-led-pink mb-2">Business Scaling</h3>
                <p className="text-sm text-muted-foreground">
                  Strategic growth solutions designed to scale operations and maximize profitability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Presentation;