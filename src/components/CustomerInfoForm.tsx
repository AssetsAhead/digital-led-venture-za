
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface CustomerInfoFormProps {
  customerData: CustomerData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomerInfoForm = ({ customerData, onInputChange }: CustomerInfoFormProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            name="firstName"
            value={customerData.firstName}
            onChange={onInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            name="lastName"
            value={customerData.lastName}
            onChange={onInputChange}
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
          value={customerData.email}
          onChange={onInputChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={customerData.phone}
          onChange={onInputChange}
          required
        />
      </div>
    </>
  );
};

export default CustomerInfoForm;
