
import React from 'react';
import Header from '@/components/Header';
import OrderForm from '@/components/OrderForm';
import Footer from '@/components/Footer';

const Order = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 led-text">
              Complete Your Order
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Fill in your details below to order your programmable LED backpack. 
              Payment is processed securely through PayFast.
            </p>
          </div>
          <OrderForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Order;
