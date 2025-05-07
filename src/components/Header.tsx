
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex justify-between items-center h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-display font-bold">
            <span className="text-led-purple">Assets</span>
            <span className="text-led-blue">Ahead</span>
          </h1>
        </div>

        <nav className="hidden md:flex gap-6 items-center">
          <a href="#features" className="text-sm font-medium hover:text-led-purple transition-colors">
            Features
          </a>
          <a href="#gallery" className="text-sm font-medium hover:text-led-purple transition-colors">
            Gallery
          </a>
          <a href="#faq" className="text-sm font-medium hover:text-led-purple transition-colors">
            FAQ
          </a>
          <a href="#contact" className="text-sm font-medium hover:text-led-purple transition-colors">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Badge variant="outline" className="hidden md:block border-led-pink bg-background/50 text-led-pink">
            Special Launch Offer
          </Badge>
          <Button size="sm" variant="ghost" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-led-pink text-[10px] text-white">
              0
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
