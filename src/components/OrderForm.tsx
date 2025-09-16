
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useYocoPayment } from '@/hooks/useYocoPayment';
import ProductSummary from './ProductSummary';
import CustomerInfoForm from './CustomerInfoForm';
import ShippingAddressForm from './ShippingAddressForm';

const OrderForm = () => {
  const { toast } = useToast();
  const { sdkLoaded, isProcessing, processPayment } = useYocoPayment();
  
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
  const [testMode, setTestMode] = useState(false);
  const basePrice = testMode ? 5 : 2520; // R5.00 for testing, R2520 for production (R2400 + R120 shipping)
  const bulkDiscountPrice = testMode ? 5 : 2200; // Same test price for bulk (R2400 - R200 bulk discount)
  const pricePerUnit = formData.quantity >= 10 ? bulkDiscountPrice : basePrice;
  const totalAmount = pricePerUnit * formData.quantity;
  const savings = formData.quantity >= 10 ? (basePrice - bulkDiscountPrice) * formData.quantity : 0;

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

    const resetForm = () => {
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
    };

    await processPayment(formData, totalAmount, resetForm);
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
          <form onSubmit={handleYocoCheckout} className="space-y-6">
            {/* Product Summary */}
            <ProductSummary
              quantity={formData.quantity}
              pricePerUnit={pricePerUnit}
              totalAmount={totalAmount}
              onQuantityChange={handleInputChange}
              savings={savings}
              isBulkOrder={formData.quantity >= 10}
            />

            {/* Customer Information */}
            <CustomerInfoForm
              customerData={{
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone
              }}
              onInputChange={handleInputChange}
            />

            {/* Shipping Address */}
            <ShippingAddressForm
              shippingData={{
                address: formData.address,
                city: formData.city,
                province: formData.province,
                postalCode: formData.postalCode,
                specialInstructions: formData.specialInstructions
              }}
              onInputChange={handleInputChange}
            />

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-led-purple to-led-blue hover:opacity-90 transition-opacity led-glow"
              disabled={isProcessing || !sdkLoaded}
            >
              <CreditCard className="h-5 w-5 mr-2" />
              {isProcessing ? 'Processing...' : `Pay R${totalAmount} with Yoco`}
            </Button>

            <p className="text-sm text-foreground/80 text-center">
              Secure payment processing powered by Yoco.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderForm;
