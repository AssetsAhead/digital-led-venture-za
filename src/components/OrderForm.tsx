
import React, { useState, useEffect } from 'react';
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
  const [yoco, setYoco] = useState<any>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);
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

  // Replace this with your actual Yoco public key
  const YOCO_PUBLIC_KEY = 'pk_test_ed3c54a6gOol69qa7f45'; // This is a test key - replace with your actual key

  // Pricing
  const pricePerUnit = 1900;
  const totalAmount = pricePerUnit * formData.quantity;

  useEffect(() => {
    // Initialize Yoco SDK
    const script = document.createElement('script');
    script.src = 'https://js.yoco.com/sdk/v1/yoco-sdk-web.js';
    script.onload = () => {
      console.log('Yoco SDK loaded');
      if (window.YocoSDK) {
        try {
          const sdk = new window.YocoSDK({
            publicKey: YOCO_PUBLIC_KEY
          });
          setYoco(sdk);
          setSdkLoaded(true);
          console.log('Yoco SDK initialized successfully');
        } catch (error) {
          console.error('Error initializing Yoco SDK:', error);
          toast({
            title: "Payment System Error",
            description: "Unable to initialize payment system. Please check your API keys.",
            variant: "destructive",
          });
        }
      }
    };
    script.onerror = () => {
      console.error('Failed to load Yoco SDK');
      toast({
        title: "Payment System Error",
        description: "Failed to load payment system. Please try again later.",
        variant: "destructive",
      });
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

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

  const handleYocoCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!yoco || !sdkLoaded) {
      toast({
        title: "Payment Error",
        description: "Payment system is not ready. Please try again in a moment.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      console.log('Initiating Yoco checkout with amount:', totalAmount * 100);
      
      // Create Yoco checkout session
      const checkoutOptions = {
        amountInCents: totalAmount * 100, // Yoco expects amount in cents
        currency: 'ZAR',
        name: `${formData.firstName} ${formData.lastName}`,
        description: `LED Backpack x${formData.quantity}`,
        locale: 'auto',
        metadata: {
          orderId: `ORDER_${Date.now()}`,
          quantity: formData.quantity.toString(),
          customerEmail: formData.email,
          customerPhone: formData.phone,
          shippingAddress: `${formData.address}, ${formData.city}, ${formData.province}, ${formData.postalCode}`,
          specialInstructions: formData.specialInstructions
        }
      };

      console.log('Checkout options:', checkoutOptions);

      // Open Yoco checkout
      yoco.showPopup(checkoutOptions);

      // Handle payment result
      yoco.on('payment_complete', (result: any) => {
        console.log('Payment result:', result);
        if (result.error) {
          console.error('Payment error:', result.error);
          toast({
            title: "Payment Failed",
            description: result.error.message || "Payment could not be processed.",
            variant: "destructive",
          });
        } else {
          console.log('Payment successful:', result);
          toast({
            title: "Payment Successful!",
            description: "Your order has been placed successfully! You will receive a confirmation email shortly.",
          });
          
          // Reset form after successful payment
          setFormData({
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
        }
        setIsProcessing(false);
      });

      yoco.on('popup_closed', () => {
        console.log('Yoco popup closed');
        setIsProcessing(false);
      });

    } catch (error) {
      console.error('Yoco checkout error:', error);
      toast({
        title: "Payment Error",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
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
          {/* SDK Status Indicator */}
          <div className="mb-4 p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${sdkLoaded ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className="text-sm">
                Payment System: {sdkLoaded ? 'Ready' : 'Loading...'}
              </span>
            </div>
          </div>

          <form onSubmit={handleYocoCheckout} className="space-y-6">
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
              disabled={isProcessing || !sdkLoaded}
            >
              <CreditCard className="h-5 w-5 mr-2" />
              {isProcessing ? 'Processing...' : `Pay R${totalAmount} with Yoco`}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              Secure payment processing powered by Yoco.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderForm;
