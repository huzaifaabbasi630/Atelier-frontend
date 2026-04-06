export interface ProductVariant {
  label: string;
  color: string;
  image: string;
  fullImage?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  type?: string;
  color: string;
  description: string;
  images: string[];
  variants?: ProductVariant[];
  rating: number;
  reviews: Review[];
  featured?: boolean;
  sizes?: string[];
  stock?: number;
  viewers?: number;
  deliveryDays?: number;
  model3D?: string;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  address: string;
  phone: string;
  postalCode: string;
  items: OrderItem[];
  total: number;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered';
  createdAt: string;
}
