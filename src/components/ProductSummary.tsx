
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tag } from 'lucide-react';

interface ProductSummaryProps {
  quantity: number;
  pricePerUnit: number;
  totalAmount: number;
  onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  savings?: number;
  isBulkOrder?: boolean;
}

const ProductSummary = ({ quantity, pricePerUnit, totalAmount, onQuantityChange, savings = 0, isBulkOrder = false }: ProductSummaryProps) => {
  return (
    <div className="bg-muted/30 p-4 rounded-lg">
      <h3 className="font-semibold mb-2">Order Summary</h3>
      {isBulkOrder && (
        <div className="mb-4">
          <Badge className="bg-led-blue/20 text-led-blue border-led-blue/50">
            <Tag className="h-3.5 w-3.5 mr-1" />
            Bulk Order Discount Applied!
          </Badge>
        </div>
      )}
      <div className="flex justify-between items-center mb-2">
        <span>Programmable LED Backpack</span>
        <div className="text-right">
          <span>R{pricePerUnit}</span>
          {isBulkOrder && (
            <p className="text-sm text-muted-foreground line-through">R1900</p>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <Label htmlFor="quantity">Quantity:</Label>
        <div>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={onQuantityChange}
            className="w-20 text-center"
          />
          {quantity >= 10 && (
            <p className="text-sm text-led-blue mt-1">10% bulk discount applied!</p>
          )}
        </div>
      </div>
      {savings > 0 && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Bulk Savings:</span>
          <span className="text-lg font-medium text-green-500">-R{savings}</span>
        </div>
      )}
      <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
        <span>Total (including shipping):</span>
        <span>R{totalAmount}</span>
      </div>
    </div>
  );
};

export default ProductSummary;
