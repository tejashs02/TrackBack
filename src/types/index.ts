export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'organization';
  avatar?: string;
  organizationId?: string;
  createdAt: Date;
}

export interface Item {
  id: string;
  userId: string;
  type: 'lost' | 'found';
  title: string;
  description: string;
  category: string;
  location: {
    address: string;
    coordinates?: [number, number];
  };
  dateReported: Date;
  dateLostFound: Date;
  images: string[];
  status: 'active' | 'matched' | 'resolved' | 'archived';
  contactInfo: {
    email?: string;
    phone?: string;
    preferredContact: 'email' | 'phone';
  };
  reward?: number;
  tags: string[];
  organizationId?: string;
}

export interface Match {
  id: string;
  lostItemId: string;
  foundItemId: string;
  similarity: number;
  status: 'pending' | 'confirmed' | 'rejected';
  createdAt: Date;
  verifiedBy?: string;
}

export interface Organization {
  id: string;
  name: string;
  type: 'airport' | 'university' | 'mall' | 'transport' | 'other';
  address: string;
  contactEmail: string;
  isVerified: boolean;
  adminIds: string[];
}

export const ITEM_CATEGORIES = [
  'Electronics',
  'Documents',
  'Accessories',
  'Bags',
  'Keys',
  'Jewelry',
  'Clothing',
  'Books',
  'Sports Equipment',
  'Other'
];