
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
    answer: "The backpack uses a power bank which is purchased separately. A 10000mAh bank will work for up to six hours of continuous use."
  },
  {
    question: "How do I customize the LED display?",
    answer: "The LED display is customized using Bluetooth from your mobile phone by means of creating a WiFi signal between the bag and mobile phone. You can create and upload custom designs, animations, and text."
  },
  {
    question: "Is the backpack waterproof?",
    answer: "The bag can be worn during soft downpours, but fluid should not enter from the bottom and the bag must never be submerged."
  },
  {
    question: "What's the delivery time?",
    answer: "Delivery time in South Africa is typically 4-5 working days and 7 days internationally."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, international shipping is available. Shipping prices vary and will be calculated at checkout."
  },
  {
    question: "What's your return policy?",
    answer: "We offer a 7-day return policy from when the unit was delivered. Shipping will be at cost to sender."
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
        
        <div className="mt-12 text-center space-y-4">
          <p className="text-muted-foreground">
            Have more questions? <a href="#contact" className="text-led-blue hover:underline">Contact us</a> and we'll get back to you as soon as possible.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="mailto:assetsahead.sa@gmail.com" className="text-led-blue hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              assetsahead.sa@gmail.com
            </a>
            <a href="tel:+27678746540" className="text-led-blue hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +27 67 874 6540
            </a>
            <a href="https://wa.me/+27678746540" target="_blank" rel="noopener noreferrer" className="text-led-blue hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 20.9l1.8-6.7c-.5-1-1-2-1-3.3a9 9 0 1 1 17.8 2 9 9 0 0 1-13.5 7.7l-5.1.3z"/><path d="M10.8 14.4c2.7 2 4.8 1.6 5.8 1 1.8-1 1.9-3.2 1-4.4-1-1-1.8-1.7-3-1-1 .6-1 1.2-1 2 0 .2 2.5 1.2 2 3.3-.4 1.8-3.6.5-4.8-.9z"/></svg>
              WhatsApp
            </a>
            <a href="https://www.facebook.com/assetsahead" target="_blank" rel="noopener noreferrer" className="text-led-blue hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              Facebook
            </a>
            <a href="https://www.instagram.com/createcontent247" target="_blank" rel="noopener noreferrer" className="text-led-blue hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
