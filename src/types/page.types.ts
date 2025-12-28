// Types
export interface Offer {
  id: number;
  seller: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  price: number;
  status: string;
}

export interface Message {
  id: number;
  sender: string;
  message: string;
  timestamp: string;
  isSeller: boolean;
  isSystem?: boolean;
  isLink?: boolean;
}
