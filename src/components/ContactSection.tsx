
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    zapierWebhookUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await supabase.functions.invoke('process-lead', {
        body: formData
      });

      if (response.error) {
        throw response.error;
      }

      toast({
        title: "Success! 🎉",
        description: "Thank you for your interest! Our team will contact you within 24 hours. Check your email for a welcome message.",
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        zapierWebhookUrl: ''
      });

    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.15),transparent_70%)]"></div>
      
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="outline" className="border-led-pink bg-background/50 text-led-pink px-4 py-1">
            GET IN TOUCH
          </Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight led-text">
            Contact Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Send us a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="First name"
                      className="bg-input"
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
                      placeholder="Last name"
                      className="bg-input"
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
                    placeholder="your@email.com"
                    className="bg-input"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+27 123 456 789"
                    className="bg-input"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your business needs and goals..."
                    className="bg-input"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="zapierWebhookUrl">Zapier Webhook URL (Optional)</Label>
                  <Input
                    id="zapierWebhookUrl"
                    name="zapierWebhookUrl"
                    type="url"
                    placeholder="https://hooks.zapier.com/hooks/catch/..."
                    className="bg-input"
                    value={formData.zapierWebhookUrl}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Connect your Zapier automation to receive lead notifications
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-led-purple hover:bg-led-purple/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message & Start My Growth Journey"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Connect with us</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <p className="text-muted-foreground">assetsahead.sa@gmail.com</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">Phone</h4>
                  <p className="text-muted-foreground">+27 82 637 0673</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">WhatsApp</h4>
                  <Button variant="outline" className="w-full border-led-blue text-led-blue hover:bg-led-blue/10" 
                    onClick={() => window.open('https://wa.me/27826370673', '_blank')}>
                    Chat with us on WhatsApp
                  </Button>
                </div>
                
                <div className="pt-4">
                  <h4 className="font-medium mb-3">Follow us</h4>
                  <div className="flex gap-4 justify-center">
                    <Button variant="ghost" size="icon" onClick={() => window.open('https://www.facebook.com/assetsahead', '_blank')}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-led-blue"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                      <span className="sr-only">Facebook</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => window.open('https://www.instagram.com/createcontent247', '_blank')}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-led-purple"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                      <span className="sr-only">Instagram</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => window.open('#', '_blank')}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-led-pink"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
