import { Product } from './product';

export interface CartItem {
  id: string; // unique key combining product.id + size + color
  product: Product;
  size?: string;
  color?: string;
  quantity: number;
  unitPrice: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size?: string, color?: string, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
}
