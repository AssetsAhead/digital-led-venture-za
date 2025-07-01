
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ShippingData {
  address: string;
  city: string;
  province: string;
  postalCode: string;
  specialInstructions: string;
}

interface ShippingAddressFormProps {
  shippingData: ShippingData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ShippingAddressForm = ({ shippingData, onInputChange }: ShippingAddressFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Shipping Address</h3>
      
      <div>
        <Label htmlFor="address">Street Address *</Label>
        <Input
          id="address"
          name="address"
          value={shippingData.address}
          onChange={onInputChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            name="city"
            value={shippingData.city}
            onChange={onInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="province">Province *</Label>
          <Input
            id="province"
            name="province"
            value={shippingData.province}
            onChange={onInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="postalCode">Postal Code *</Label>
          <Input
            id="postalCode"
            name="postalCode"
            value={shippingData.postalCode}
            onChange={onInputChange}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
        <Textarea
          id="specialInstructions"
          name="specialInstructions"
          value={shippingData.specialInstructions}
          onChange={onInputChange}
          placeholder="Any special delivery instructions or notes..."
          rows={3}
        />
      </div>
    </div>
  );
};

export default ShippingAddressForm;
