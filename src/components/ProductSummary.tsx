
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ProductSummaryProps {
  quantity: number;
  pricePerUnit: number;
  totalAmount: number;
  onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductSummary = ({ quantity, pricePerUnit, totalAmount, onQuantityChange }: ProductSummaryProps) => {
  return (
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
          value={quantity}
          onChange={onQuantityChange}
          className="w-20 text-center"
        />
      </div>
      <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
        <span>Total (including shipping):</span>
        <span>R{totalAmount}</span>
      </div>
    </div>
  );
};

export default ProductSummary;
