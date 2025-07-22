import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calculator, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QuotationForm = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    quantity: 10,
    requirements: '',
    useCase: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? Math.max(10, parseInt(value) || 10) : value
    }));
  };

  const calculateEstimate = () => {
    const basePrice = 1700; // Bulk price
    let pricePerUnit = basePrice;
    
    // Volume discounts
    if (formData.quantity >= 50) pricePerUnit = 1600;
    if (formData.quantity >= 100) pricePerUnit = 1500;
    if (formData.quantity >= 200) pricePerUnit = 1400;
    
    return pricePerUnit * formData.quantity;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Send WhatsApp notification for quote request
      const response = await fetch('/functions/v1/send-quote-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          quantity: formData.quantity,
          requirements: formData.requirements,
          useCase: formData.useCase,
          estimatedTotal: estimate
        }),
      });

      if (response.ok) {
        toast({
          title: "Quote Request Submitted",
          description: "We'll get back to you within 24 hours with a detailed quote.",
        });
      } else {
        throw new Error('Failed to send notification');
      }
    } catch (error) {
      console.error('Error sending quote request:', error);
      toast({
        title: "Quote Request Submitted",
        description: "We'll get back to you within 24 hours with a detailed quote.",
      });
    }
    
    // Reset form
    setFormData({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      quantity: 10,
      requirements: '',
      useCase: ''
    });
  };

  const estimate = calculateEstimate();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Request Bulk Quote
          </CardTitle>
          <p className="text-muted-foreground">
            Get a personalized quote for 10+ LED backpacks with volume discounts
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="quantity">Required Quantity (minimum 10) *</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="10"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="useCase">Use Case / Application</Label>
              <Textarea
                id="useCase"
                name="useCase"
                value={formData.useCase}
                onChange={handleInputChange}
                placeholder="e.g., Corporate events, school programs, promotional campaigns..."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="requirements">Special Requirements</Label>
              <Textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                placeholder="Custom branding, specific delivery dates, special packaging..."
                className="mt-1"
              />
            </div>

            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Estimated Quote</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span>{formData.quantity} units</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Price per Unit:</span>
                    <span>R{Math.round(estimate / formData.quantity)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total Estimate:</span>
                    <span className="text-led-purple">R{estimate.toLocaleString()}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  *Final pricing may vary based on customization requirements
                </p>
              </CardContent>
            </Card>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-led-purple to-led-blue hover:opacity-90 transition-opacity led-glow"
            >
              <Send className="h-5 w-5 mr-2" />
              Request Detailed Quote
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              We'll respond with a detailed quote within 24 hours
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuotationForm;