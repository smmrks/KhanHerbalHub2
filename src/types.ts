export interface Package {
  id: string;
  name: string;
  weight: string;
  price: number;
  originalPrice: number;
  description: string;
  features: string[];
  popular?: boolean;
  savings?: string;
  badge?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  location: string;
  date: string;
  variant: string;
  verified: boolean;
  avatarUrl: string;
}

export interface Ingredient {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  benefit: string;
  imageUrl: string;
}

export interface Order {
  id: string;
  name: string;
  phone: string;
  district: string;
  upazila: string;
  address: string;
  packageId: string;
  quantity: number;
  paymentMethod: 'bKash' | 'Nagad' | 'Rocket' | 'COD';
  paymentPhone?: string;
  transactionId?: string;
  specialNote?: string;
  couponCode?: string;
  status: 'pending' | 'processing' | 'completed';
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  createdAt: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type ViewTab = 'home' | 'privacy' | 'refund' | 'shipping' | 'terms' | 'faq' | 'contact' | 'admin';
