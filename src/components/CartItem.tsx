import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import { CartItem } from '../types';

interface CartItemProps {
  item: CartItem;
  onQuantityChange: (newQuantity: number) => void;
  onRemove: () => void;
}

const CartItemCard: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="flex gap-6 group">
      <div className="w-24 h-32 overflow-hidden rounded-xl bg-slate-100">
        <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <div className="flex-1 flex flex-col justify-between py-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-slate-900">{item.name}</h3>
            <p className="text-[9px] text-brand-gold uppercase tracking-widest font-bold mb-1">{item.category}</p>
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500 mt-1">
              {item.selectedColor || item.color} / {item.selectedSize || 'One Size'}
            </p>
          </div>
          <button onClick={onRemove} className="text-slate-400 hover:text-rose-500 transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
            <button
              onClick={() => onQuantityChange(Math.max(1, item.quantity - 1))}
              className="text-slate-700 transition hover:text-slate-900"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="min-w-[24px] text-center text-sm font-semibold">{item.quantity}</span>
            <button
              onClick={() => onQuantityChange(item.quantity + 1)}
              className="text-slate-700 transition hover:text-slate-900"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-lg font-semibold text-slate-900">${(item.price * item.quantity).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
