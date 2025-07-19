
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  quantity: number;
  specialInstructions: string;
}

export const useYocoPayment = () => {
  const { toast } = useToast();
  const [yoco, setYoco] = useState<any>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Your actual Yoco public key
  const YOCO_PUBLIC_KEY = 'pk_live_a314c90fEPqmy4n30ed4';

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

  const processPayment = async (formData: FormData, totalAmount: number, onSuccess: () => void) => {
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
      yoco.on('payment_complete', async (result: any) => {
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
          
          // Send WhatsApp notification
          try {
            await supabase.functions.invoke('send-whatsapp-notification', {
              body: {
                customerName: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                quantity: formData.quantity,
                totalAmount: totalAmount,
                address: formData.address,
                city: formData.city,
                province: formData.province,
              }
            });
            console.log('WhatsApp notification sent');
          } catch (error) {
            console.error('Failed to send WhatsApp notification:', error);
          }
          
          toast({
            title: "Payment Successful!",
            description: "Your order has been placed successfully! You will receive a confirmation email shortly.",
          });
          onSuccess();
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

  return {
    sdkLoaded,
    isProcessing,
    processPayment
  };
};
