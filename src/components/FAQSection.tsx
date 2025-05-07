
import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "How long does the battery last?",
    answer: "The battery lasts up to 6-8 hours with continuous LED display use. With occasional use, it can last multiple days on a single charge."
  },
  {
    question: "How do I customize the LED display?",
    answer: "Download the free LED SPACE app from Google Play or App Store. The app connects to your backpack via Bluetooth and allows you to create and upload custom designs, animations, and text."
  },
  {
    question: "Is the backpack waterproof?",
    answer: "The backpack is water resistant (IP54 rated), which means it can handle light rain and splashes, but it's not designed to be submerged in water."
  },
  {
    question: "What's the delivery time within South Africa?",
    answer: "We typically deliver within 3-5 business days to all major areas in South Africa. Remote areas might take 5-7 business days."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we only ship within South Africa. We're planning to expand to neighboring countries soon."
  },
  {
    question: "What's your return policy?",
    answer: "We offer a 14-day return policy for unused items in original packaging. For defective items, we provide a 1-year warranty."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-16 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,160,206,0.15),transparent_70%)]"></div>
      
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="outline" className="border-led-blue bg-background/50 text-led-blue px-4 py-1">
            SUPPORT
          </Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight led-text">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about the AssetsAhead LED Backpack.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:text-led-purple transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Have more questions? <a href="#contact" className="text-led-blue hover:underline">Contact us</a> and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
