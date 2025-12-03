import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Download, CheckCircle } from 'lucide-react';
import jsPDF from 'jspdf';

interface InvoiceData {
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

interface InvoiceProps {
  data: InvoiceData;
  onClose?: () => void;
}

const Invoice: React.FC<InvoiceProps> = ({ data, onClose }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFillColor(139, 92, 246); // Purple
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', 20, 25);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('DigiBag LED Backpack', pageWidth - 20, 15, { align: 'right' });
    doc.text('www.digibag.co.za', pageWidth - 20, 22, { align: 'right' });
    doc.text('hello@digibag.co.za', pageWidth - 20, 29, { align: 'right' });
    
    // Invoice details
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    
    let y = 55;
    
    // Invoice info box
    doc.setFillColor(245, 245, 245);
    doc.rect(20, y - 5, pageWidth - 40, 25, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.text('Invoice Number:', 25, y + 5);
    doc.text('Date:', 25, y + 12);
    doc.setFont('helvetica', 'normal');
    doc.text(data.orderNumber, 70, y + 5);
    doc.text(data.date, 70, y + 12);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Payment Ref:', pageWidth / 2, y + 5);
    doc.setFont('helvetica', 'normal');
    doc.text(data.paymentReference || 'N/A', pageWidth / 2 + 35, y + 5);
    
    y += 35;
    
    // Bill To section
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Bill To:', 20, y);
    
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(data.customerName, 20, y);
    y += 6;
    doc.text(data.email, 20, y);
    y += 6;
    doc.text(data.phone, 20, y);
    y += 6;
    
    // Wrap address if too long
    const addressLines = doc.splitTextToSize(data.address, pageWidth - 40);
    addressLines.forEach((line: string) => {
      doc.text(line, 20, y);
      y += 6;
    });
    
    y += 10;
    
    // Items table header
    doc.setFillColor(139, 92, 246);
    doc.rect(20, y, pageWidth - 40, 10, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('Description', 25, y + 7);
    doc.text('Qty', 110, y + 7);
    doc.text('Unit Price', 130, y + 7);
    doc.text('Total', pageWidth - 35, y + 7);
    
    y += 15;
    
    // Items
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text('LED Backpack - Programmable Display', 25, y);
    doc.text(data.quantity.toString(), 113, y);
    doc.text(`R${data.unitPrice.toLocaleString()}`, 130, y);
    doc.text(`R${(data.unitPrice * data.quantity).toLocaleString()}`, pageWidth - 35, y);
    
    // Shipping line if included
    if (data.quantity < 10) {
      y += 10;
      doc.text('Shipping (Nationwide Delivery)', 25, y);
      doc.text('-', 113, y);
      doc.text('Included', 130, y);
      doc.text('R0', pageWidth - 35, y);
    }
    
    y += 15;
    
    // Divider
    doc.setDrawColor(200, 200, 200);
    doc.line(20, y, pageWidth - 20, y);
    
    y += 10;
    
    // Totals
    doc.setFont('helvetica', 'bold');
    doc.text('Subtotal:', 130, y);
    doc.text(`R${data.totalAmount.toLocaleString()}`, pageWidth - 35, y);
    
    y += 8;
    doc.text('VAT (Included):', 130, y);
    doc.text(`R${Math.round(data.totalAmount * 0.15 / 1.15).toLocaleString()}`, pageWidth - 35, y);
    
    y += 12;
    doc.setFillColor(139, 92, 246);
    doc.rect(120, y - 5, pageWidth - 140, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text('TOTAL PAID:', 125, y + 3);
    doc.text(`R${data.totalAmount.toLocaleString()}`, pageWidth - 35, y + 3);
    
    y += 25;
    
    // Payment status
    doc.setTextColor(34, 197, 94);
    doc.setFontSize(14);
    doc.text('✓ PAID', pageWidth / 2, y, { align: 'center' });
    
    // Footer
    y = 270;
    doc.setTextColor(128, 128, 128);
    doc.setFontSize(8);
    doc.text('Thank you for your purchase!', pageWidth / 2, y, { align: 'center' });
    doc.text('For support, contact us at hello@digibag.co.za', pageWidth / 2, y + 5, { align: 'center' });
    
    // Save the PDF
    doc.save(`Invoice_${data.orderNumber}.pdf`);
  };

  return (
    <Card className="max-w-2xl mx-auto border-2 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-led-purple to-led-blue text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">INVOICE</h2>
            <p className="text-white/80 text-sm">DigiBag LED Backpack</p>
          </div>
          <CheckCircle className="h-10 w-10 text-green-300" />
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Invoice Details */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground">Invoice Number</p>
            <p className="font-semibold">{data.orderNumber}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Date</p>
            <p className="font-semibold">{data.date}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Payment Reference</p>
            <p className="font-semibold">{data.paymentReference || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" /> Paid
            </span>
          </div>
        </div>

        {/* Bill To */}
        <div>
          <h3 className="font-semibold mb-2 text-muted-foreground">Bill To</h3>
          <div className="space-y-1">
            <p className="font-medium">{data.customerName}</p>
            <p className="text-sm text-muted-foreground">{data.email}</p>
            <p className="text-sm text-muted-foreground">{data.phone}</p>
            <p className="text-sm text-muted-foreground">{data.address}</p>
          </div>
        </div>

        {/* Items */}
        <div>
          <h3 className="font-semibold mb-2 text-muted-foreground">Items</h3>
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-12 gap-2 p-3 bg-primary text-primary-foreground text-sm font-medium">
              <div className="col-span-6">Description</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right">Unit Price</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            <div className="grid grid-cols-12 gap-2 p-3 text-sm">
              <div className="col-span-6">LED Backpack - Programmable Display</div>
              <div className="col-span-2 text-center">{data.quantity}</div>
              <div className="col-span-2 text-right">R{data.unitPrice.toLocaleString()}</div>
              <div className="col-span-2 text-right font-medium">R{(data.unitPrice * data.quantity).toLocaleString()}</div>
            </div>
            {data.quantity < 10 && (
              <div className="grid grid-cols-12 gap-2 p-3 text-sm border-t">
                <div className="col-span-6">Shipping (Nationwide)</div>
                <div className="col-span-2 text-center">-</div>
                <div className="col-span-2 text-right">Included</div>
                <div className="col-span-2 text-right font-medium">R0</div>
              </div>
            )}
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>R{data.totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">VAT (Included)</span>
              <span>R{Math.round(data.totalAmount * 0.15 / 1.15).toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total Paid</span>
              <span className="text-primary">R{data.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t">
          <Button onClick={generatePDF} className="flex-1 bg-gradient-to-r from-led-purple to-led-blue">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          {onClose && (
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Invoice;
