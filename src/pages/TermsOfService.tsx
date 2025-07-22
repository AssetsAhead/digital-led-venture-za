import React from 'react';
import { ArrowLeft, Scale, FileText, Shield, AlertTriangle, Globe, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container px-4 md:px-6 py-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-display font-bold">Terms of Service</h1>
              <p className="text-muted-foreground mt-2">AssetsAhead - Effective Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Introduction */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-led-purple" />
                <CardTitle>Acceptance of Terms</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Welcome to AssetsAhead. By accessing or using our website and services, you agree to be bound by these Terms of Service ("Terms"). 
                If you do not agree to these Terms, please do not use our services.
              </p>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. 
                Your continued use of our services constitutes acceptance of any modifications.
              </p>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Company Name:</strong> AssetsAhead (Pty) Ltd</p>
                <p><strong>Registration:</strong> [Company Registration Number]</p>
                <p><strong>Address:</strong> [Physical Address], South Africa</p>
                <p><strong>Email:</strong> info@assetahead.co.za</p>
                <p><strong>Returns:</strong> returns@assetahead.co.za</p>
              </div>
            </CardContent>
          </Card>

          {/* Product Information & Pricing */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-led-purple" />
                <CardTitle>Product Information & Pricing</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Product Descriptions</h3>
                <p className="text-muted-foreground">
                  We strive to provide accurate product descriptions and images. However, we do not warrant that descriptions 
                  or other content is accurate, complete, or error-free. Colors may vary due to monitor settings.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Pricing</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• All prices are in South African Rand (ZAR) unless otherwise specified</li>
                  <li>• Prices include VAT where applicable</li>
                  <li>• We reserve the right to correct pricing errors and cancel orders with incorrect pricing</li>
                  <li>• Bulk discount pricing applies automatically for qualifying quantities</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Ordering & Payment */}
          <Card>
            <CardHeader>
              <CardTitle>Ordering & Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Order Process</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Orders are subject to acceptance and availability</li>
                  <li>• A contract is formed when we send order confirmation</li>
                  <li>• We reserve the right to refuse or cancel orders</li>
                  <li>• Order cancellation is possible within 2 hours of placement</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Payment Terms</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Payment is required at time of order</li>
                  <li>• Accepted payment methods: Credit/Debit cards, EFT, Yoco payments</li>
                  <li>• All payments are processed securely through our payment partners</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Shipping & Delivery */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping & Delivery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Delivery Areas</h3>
                <p className="text-muted-foreground">
                  We currently deliver within South Africa. International shipping may be available upon request.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Delivery Timeframes</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Standard delivery: 3-7 business days</li>
                  <li>• Express delivery: 1-3 business days (where available)</li>
                  <li>• Timeframes may vary during peak periods</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Risk & Responsibility</h3>
                <p className="text-muted-foreground">
                  Risk of loss transfers to you upon delivery. Please inspect packages upon receipt and report 
                  damage immediately.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Returns & Warranties */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-led-purple" />
                <CardTitle>Returns & Warranties</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Returns and refunds are governed by our comprehensive 
                <a href="/return-policy" className="text-led-purple hover:underline ml-1">Return Policy</a>. 
                Please review this policy for detailed information about return conditions, timeframes, and procedures.
              </p>
            </CardContent>
          </Card>

          {/* Prohibited Uses */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <CardTitle>Prohibited Uses</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">You may not:</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Purchase products for commercial resale without authorization</li>
                    <li>• Use products in ways that violate safety guidelines</li>
                    <li>• Reverse engineer or modify LED components</li>
                    <li>• Use our content or images without permission</li>
                    <li>• Make fraudulent purchases or provide false information</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Age Requirement</h3>
                  <p className="text-muted-foreground">
                    You must be at least 18 years old to make purchases. By ordering, you confirm you meet this requirement.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Safety & Usage */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <CardTitle>Product Safety & Usage</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-led-purple">LED Products Safety</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Do not stare directly into LED lights</li>
                  <li>• Keep away from water unless specified as waterproof</li>
                  <li>• Use only provided charging cables and adapters</li>
                  <li>• Discontinue use if overheating occurs</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-led-blue">Supplement Products</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Consult healthcare provider before use</li>
                  <li>• Follow dosage instructions carefully</li>
                  <li>• Not intended to diagnose, treat, cure, or prevent disease</li>
                  <li>• Keep out of reach of children</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Our Rights</h3>
                <p className="text-muted-foreground">
                  All content, trademarks, and intellectual property on this site belong to AssetsAhead. 
                  Unauthorized use is prohibited.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Custom Designs</h3>
                <p className="text-muted-foreground">
                  Custom LED designs created for your order become your property upon full payment. 
                  We retain the right to use design techniques and general concepts.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-amber-500" />
                <CardTitle>Limitation of Liability</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Badge variant="outline" className="mb-2">Important Legal Notice</Badge>
                <p className="text-muted-foreground">
                  To the maximum extent permitted by law, AssetsAhead shall not be liable for any indirect, 
                  incidental, special, or consequential damages arising from the use of our products or services.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Maximum Liability</h3>
                <p className="text-muted-foreground">
                  Our total liability for any claim shall not exceed the amount paid for the specific product or service.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Product Disclaimers</h3>
                <p className="text-muted-foreground">
                  Products are provided "as is" without warranty of any kind. We disclaim all warranties, 
                  express or implied, except as required by law.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-led-purple" />
                <CardTitle>Governing Law & Disputes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Jurisdiction</h3>
                <p className="text-muted-foreground">
                  These Terms are governed by the laws of South Africa. Any disputes will be subject to 
                  the exclusive jurisdiction of South African courts.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Dispute Resolution</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• First contact our customer service team</li>
                  <li>• Mediation may be required before legal action</li>
                  <li>• Small claims court for disputes under applicable limits</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Data */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Data Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your privacy is important to us. Please review our 
                <a href="https://www.privacypolicies.com/live/6f38d2ad-a9e4-4442-a370-f0c362b8d41a" target="_blank" rel="noopener noreferrer" className="text-led-purple hover:underline ml-1">
                  Privacy Policy
                </a> to understand how we collect, use, and protect your personal information.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-muted/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-led-purple" />
                <CardTitle>Contact Us</CardTitle>
              </div>
              <CardDescription>
                Questions about these Terms of Service? Get in touch with our team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">General Inquiries</h4>
                  <p className="text-sm text-muted-foreground">info@assetahead.co.za</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Legal Matters</h4>
                  <p className="text-sm text-muted-foreground">legal@assetahead.co.za</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />
          
          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p className="mt-2">
              These Terms of Service are legally binding. Please read carefully and contact us with any questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;