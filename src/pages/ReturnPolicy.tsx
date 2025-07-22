import React from 'react';
import { ArrowLeft, CheckCircle, XCircle, Clock, Shield, Mail, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ReturnPolicy = () => {
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
              <h1 className="text-3xl font-display font-bold">Return & Refund Policy</h1>
              <p className="text-muted-foreground mt-2">AssetsAhead comprehensive return policy</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* 30-Day Satisfaction Guarantee */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-led-purple" />
                <CardTitle>30-Day Satisfaction Guarantee</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-led-purple mb-3">LED Backpacks & Tech Products:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 30-day return window from delivery date</li>
                  <li>• Must be unused, in original packaging with all accessories (e.g., charging cables, manuals)</li>
                  <li>• No returns if LEDs are damaged from misuse or water exposure</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-led-blue mb-3">Diva Secret Stem Cells (Unopened Only):</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 15-day return window (hygiene reasons)</li>
                  <li>• Full refund only if seal is intact</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Condition Requirements */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-led-purple" />
                <CardTitle>Condition Requirements</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <h3 className="font-semibold text-green-600">Accepted:</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground ml-7">
                  <li>• Defective items (e.g., LED malfunctions, dead on arrival)</li>
                  <li>• Unopened supplements</li>
                </ul>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold text-red-600">Not Accepted:</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground ml-7">
                  <li>• Installed/altered products (e.g., cut straps, removed labels)</li>
                  <li>• Opened or used stem cell products</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Return Process */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-led-purple" />
                <CardTitle>Return Process</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-led-purple mb-3">Contact Support First</h3>
                <p className="text-muted-foreground mb-2">Email returns@assetahead.co.za with:</p>
                <ul className="space-y-1 text-muted-foreground ml-4">
                  <li>• Order number</li>
                  <li>• Photos/video of the issue</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-led-blue mb-3">Approval & Shipping</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Defective items:</strong> We'll email a pre-paid return label</li>
                  <li>• <strong>Change of mind:</strong> Customer covers return shipping</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Refunds */}
          <Card>
            <CardHeader>
              <CardTitle>Refunds</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Processed within 5 business days after inspection</li>
                <li>• Restocking fee (15%) for non-defective returns</li>
              </ul>
            </CardContent>
          </Card>

          {/* Warranty Coverage */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-led-purple" />
                <CardTitle>Warranty Coverage</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>LED Backpacks:</strong> 90-day warranty for manufacturing defects</li>
                <li>• <strong>Stem Cells:</strong> No warranty (consumable product)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Final Sale Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Final Sale Items
                <Badge variant="destructive">No Returns</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Custom-designed LED products (e.g., names/artwork)</li>
                <li>• Opened/damaged packaging</li>
              </ul>
            </CardContent>
          </Card>

          {/* International Returns */}
          <Card>
            <CardHeader>
              <CardTitle>International Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Customer bears all shipping costs + import fees.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>
                Contact our support team for assistance with returns or warranty claims.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <p className="text-sm">
                  <strong>Email:</strong> returns@assetahead.co.za
                </p>
                <p className="text-sm text-muted-foreground">
                  Response time: Within 24 hours during business days
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;