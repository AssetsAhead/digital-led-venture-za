
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

export interface InvoiceData {
  orderNumber: string;
  date: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  paymentReference?: string;
}

export const useYocoPayment = () => {
  const { toast } = useToast();
  const [yoco, setYoco] = useState<any>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

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
          
          // Process the lead and order through the integrated system
          try {
            const response = await supabase.functions.invoke('process-lead', {
              body: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                message: `Purchase completed: LED Backpack x${formData.quantity}`,
                leadType: 'purchase',
                source: 'order_form',
                orderData: {
                  packageType: 'led_backpack',
                  quantity: formData.quantity,
                  amount: totalAmount,
                  currency: 'ZAR',
                  deliveryAddress: `${formData.address}, ${formData.city}, ${formData.province}, ${formData.postalCode}`,
                  specialInstructions: formData.specialInstructions,
                  paymentReference: result.id || `YOC_${Date.now()}`,
                  status: 'paid'
                }
              }
            });

            if (response.error) {
              console.error('Error processing lead:', response.error);
              throw new Error('Failed to process order');
            }

            const { leadId, orderId } = response.data;
            console.log('Order processed successfully:', { leadId, orderId });
            
            // Set invoice data for display
            const unitPrice = formData.quantity >= 10 ? 2200 : 2520;
            setInvoiceData({
              orderNumber: orderId || `ORD-${Date.now()}`,
              date: new Date().toLocaleDateString('en-ZA', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }),
              customerName: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              phone: formData.phone,
              address: `${formData.address}, ${formData.city}, ${formData.province}, ${formData.postalCode}`,
              quantity: formData.quantity,
              unitPrice: unitPrice,
              totalAmount: totalAmount,
              paymentReference: result.id || `YOC_${Date.now()}`
            });
            
            toast({
              title: "Order Confirmed!",
              description: `Order ${orderId} has been received and confirmed. You'll receive updates via email and WhatsApp.`,
            });
            
          } catch (error) {
            console.error('Failed to process order:', error);
            // Still show success but log the error
            toast({
              title: "Payment Successful!",
              description: "Your payment was processed successfully. If you don't receive confirmation shortly, please contact support.",
              variant: "default",
            });
          }
          
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

  const clearInvoice = () => setInvoiceData(null);

  return {
    sdkLoaded,
    isProcessing,
    processPayment,
    invoiceData,
    clearInvoice
  };
};
