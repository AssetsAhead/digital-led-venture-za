
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ShoppingCart, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const OrderForm = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    quantity: 1,
    specialInstructions: ''
  });

  // Pricing
  const pricePerUnit = 1900;
  const totalAmount = pricePerUnit * formData.quantity;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? Math.max(1, parseInt(value) || 1) : value
    }));
  };

  const validateForm = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'province', 'postalCode'];
    return required.every(field => formData[field].trim() !== '');
  };

  const handlePayFastCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // PayFast integration parameters
      const payFastData = {
        merchant_id: 'YOUR_MERCHANT_ID', // Replace with your PayFast merchant ID
        merchant_key: 'YOUR_MERCHANT_KEY', // Replace with your PayFast merchant key
        return_url: `${window.location.origin}/payment-success`,
        cancel_url: `${window.location.origin}/payment-cancelled`,
        notify_url: `${window.location.origin}/payment-notify`,
        name_first: formData.firstName,
        name_last: formData.lastName,
        email_address: formData.email,
        cell_number: formData.phone,
        m_payment_id: `ORDER_${Date.now()}`,
        amount: totalAmount.toFixed(2),
        item_name: `LED Backpack x${formData.quantity}`,
        item_description: `Programmable LED Backpack - Quantity: ${formData.quantity}`,
        custom_str1: JSON.stringify({
          address: formData.address,
          city: formData.city,
          province: formData.province,
          postalCode: formData.postalCode,
          specialInstructions: formData.specialInstructions
        })
      };

      // Create PayFast form and submit
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://www.payfast.co.za/eng/process'; // Use sandbox URL for testing: https://sandbox.payfast.co.za/eng/process
      form.target = '_blank';

      Object.entries(payFastData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      toast({
        title: "Redirecting to Payment",
        description: "You will be redirected to PayFast to complete your payment.",
      });

    } catch (error) {
      console.error('PayFast checkout error:', error);
      toast({
        title: "Payment Error",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Order Your LED Backpack
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePayFastCheckout} className="space-y-6">
            {/* Product Summary */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Order Summary</h3>
              <div className="flex justify-between items-center mb-2">
                <span>Programmable LED Backpack</span>
                <span>R{pricePerUnit}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="quantity">Quantity:</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-20 text-center"
                />
              </div>
              <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                <span>Total (including shipping):</span>
                <span>R{totalAmount}</span>
              </div>
            </div>

            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Shipping Address */}
            <div className="space-y-4">
              <h3 className="font-semibold">Shipping Address</h3>
              
              <div>
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="province">Province *</Label>
                  <Input
                    id="province"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
              <Textarea
                id="specialInstructions"
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                placeholder="Any special delivery instructions or notes..."
                rows={3}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-led-purple to-led-blue hover:opacity-90 transition-opacity led-glow"
              disabled={isProcessing}
            >
              <CreditCard className="h-5 w-5 mr-2" />
              {isProcessing ? 'Processing...' : `Pay R${totalAmount} with PayFast`}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              You will be redirected to PayFast to complete your secure payment.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderForm;
