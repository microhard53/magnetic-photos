export interface DeliveryDetails {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryDay: string;
  specialInstructions?: string;
}

export interface CartPhoto {
  url: string;
  name: string;
  size: number;
}

export type PaymentMethod = 'creditCard' | 'paypal' | 'applePay';

export interface Order {
  id: string;
  photos: CartPhoto[];
  deliveryDetails: DeliveryDetails;
  totalAmount: number;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
} 