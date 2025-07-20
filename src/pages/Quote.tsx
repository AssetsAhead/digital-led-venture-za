import React from 'react';
import Header from '@/components/Header';
import QuotationForm from '@/components/QuotationForm';
import Footer from '@/components/Footer';

const Quote = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 led-text">
              Request Bulk Quote
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get special pricing for orders of 10 or more LED backpacks. Perfect for corporate events, 
              educational institutions, and promotional campaigns.
            </p>
          </div>
          <QuotationForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Quote;