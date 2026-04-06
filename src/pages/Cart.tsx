import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-24 text-center max-w-2xl mx-auto px-6">
        <div className="w-24 h-24 bg-brand-beige/30 rounded-full flex items-center justify-center mx-auto mb-10 luxury-border">
          <ShoppingBag className="w-12 h-12 text-brand-gold" />
        </div>
        <h1 className="text-5xl font-serif mb-6 uppercase tracking-widest">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-12 leading-relaxed">
          It looks like you haven't added anything to your cart yet. Explore our latest collections and find your perfect companion.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-brand-black text-white px-12 py-4 uppercase tracking-widest text-sm hover:bg-brand-gold transition-luxury shadow-xl"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Progress Bar - Only Step 1 Active */}
        <div className="flex items-center justify-center space-x-10 mb-20">
          <div className="flex items-center space-x-3 text-brand-gold font-bold">
            <span className="w-8 h-8 rounded-full border border-brand-gold flex items-center justify-center text-xs font-bold">01</span>
            <span className="text-[10px] uppercase tracking-widest font-bold italic">Shopping Cart</span>
          </div>
          <div className="w-20 h-px bg-gray-200" />
          <div className="flex items-center space-x-3 text-gray-300">
            <span className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-xs font-medium">02</span>
            <span className="text-[10px] uppercase tracking-widest font-medium">Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex items-end justify-between border-b-2 border-brand-black pb-8">
                 <h2 className="text-4xl font-serif uppercase tracking-tight">Your Selections</h2>
                 <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{cart.length} items curated</p>
              </div>

              <div className="space-y-8">
                {cart.map(item => (
                  <motion.div 
                    layout
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} 
                    className="flex flex-col sm:flex-row items-center gap-10 py-10 border-b border-brand-beige group hover:bg-slate-50/50 transition-colors px-6 rounded-3xl"
                  >
                    <div className="w-32 aspect-[3/4] overflow-hidden luxury-border bg-brand-beige shadow-lg transform group-hover:scale-105 transition-transform duration-700">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 space-y-4 text-center sm:text-left">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-2">{item.category}</p>
                        <h3 className="text-2xl font-serif text-brand-black mb-1">{item.name}</h3>
                        <div className="flex items-center justify-center sm:justify-start space-x-3 mt-3 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                           <span className="px-2 py-1 bg-gray-100 rounded">Color: {item.selectedColor || item.color}</span>
                           {item.selectedSize && <span className="px-2 py-1 bg-gray-100 rounded">Size: {item.selectedSize}</span>}
                        </div>
                      </div>
                      <p className="text-xl font-serif text-brand-black">${item.price.toLocaleString()}</p>
                    </div>

                    <div className="flex flex-col items-center sm:items-end gap-6 min-w-[150px]">
                        <div className="flex items-center bg-white border border-gray-200 rounded-full luxury-shadow p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)} 
                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-full transition-colors text-lg"
                          >
                            –
                          </button>
                          <span className="w-12 text-center text-sm font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)} 
                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-full transition-colors text-lg text-brand-gold"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center space-x-6">
                           <span className="text-2xl font-serif font-bold text-brand-black tracking-tight">${(item.price * item.quantity).toLocaleString()}</span>
                           <button 
                            onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)} 
                            className="p-3 bg-red-50 text-red-300 hover:text-red-500 rounded-2xl hover:bg-red-100 transition-all"
                           >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-gray-100 sticky top-32 space-y-10 luxury-shadow">
              <h3 className="text-2xl font-serif uppercase tracking-widest text-brand-black">Investment Summary</h3>
              
              <div className="space-y-6">
                <div className="flex justify-between text-[11px] uppercase tracking-[0.2em] font-bold">
                  <span className="text-gray-400">Total Selections</span>
                  <span className="text-brand-black">${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] uppercase tracking-[0.2em] font-bold">
                  <span className="text-gray-400">Shipment</span>
                  <span className="text-brand-gold italic">Complimentary</span>
                </div>
                <div className="flex justify-between text-[11px] uppercase tracking-[0.2em] font-bold">
                  <span className="text-gray-400">Taxes</span>
                  <span className="text-gray-400">Calculated later</span>
                </div>
                <div className="pt-8 border-t border-brand-beige flex justify-between items-end">
                   <div>
                    <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-gray-500">Estimated Total</span>
                    <p className="text-[8px] text-gray-400 uppercase mt-1">Final amount at checkout</p>
                   </div>
                  <span className="text-3xl font-serif font-bold text-brand-black italic">${cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-brand-black text-white py-6 rounded-2xl uppercase tracking-[0.4em] text-[10px] font-bold hover:bg-brand-gold transition-all duration-700 flex items-center justify-center space-x-4 shadow-2xl group active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
              </button>

              <div className="pt-8 space-y-6">
                <div className="flex items-center space-x-5 text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400 group">
                  <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center luxury-shadow group-hover:text-brand-gold transition-colors">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span>Express Global Logistics</span>
                </div>
                <div className="flex items-center space-x-5 text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400 group">
                  <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center luxury-shadow group-hover:text-brand-gold transition-colors">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <span>Extended 30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
