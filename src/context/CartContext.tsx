import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = sessionStorage.getItem('atelier_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('atelier_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1, selectedSize?: string, selectedColor?: string) => {
    if (!user) {
      navigate('/login-required');
      return;
    }
    setCart(prev => {
      const existing = prev.find(
        item =>
          item.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );
      if (existing) {
        return prev.map(item =>
          item.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, selectedSize, selectedColor }];
    });
  };

  const removeFromCart = (productId: string, selectedSize?: string, selectedColor?: string) => {
    setCart(prev =>
      prev.filter(item => {
        if (selectedSize === undefined && selectedColor === undefined) return item.id !== productId;
        return !(item.id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor);
      })
    );
  };

  const updateQuantity = (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id !== productId) return item;
        if (
          (selectedSize === undefined || item.selectedSize === selectedSize) &&
          (selectedColor === undefined || item.selectedColor === selectedColor)
        ) {
          return { ...item, quantity: Math.max(1, quantity) };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
