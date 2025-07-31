
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
          <a href="#services" className="text-sm font-medium hover:text-led-purple transition-colors">
            Services
          </a>
          <a href="#gallery" className="text-sm font-medium hover:text-led-purple transition-colors">
            Portfolio
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
            Innovation Partners
          </Badge>
        </div>
      </div>
    </header>
  );
};

export default Header;
