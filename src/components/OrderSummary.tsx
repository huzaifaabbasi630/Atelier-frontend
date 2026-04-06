import React, { useState } from 'react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Truck, User, Mail, Smartphone, MapPin } from 'lucide-react';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  cart: CartItem[];
  onPlaceOrder: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, shipping, tax, cart, onPlaceOrder }) => {
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Credit'>('COD');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    holder: '',
    expiry: '',
    cvv: ''
  });

  const total = subtotal + shipping + tax;

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-[0_24px_80px_-30px_rgba(15,23,42,0.18)] sticky top-32 space-y-10">
      {/* Product Details Section */}
      <section className="space-y-6">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">01. Order Inventory</h2>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
          {cart.map((item) => (
            <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group transition-all hover:bg-white hover:luxury-shadow">
               <div className="w-16 h-20 rounded-xl overflow-hidden bg-white shadow-sm border border-slate-100 flex-shrink-0">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
               </div>
               <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-bold text-brand-black truncate">{item.name}</h3>
                  <p className="text-[9px] text-brand-gold uppercase tracking-widest font-bold mt-1">{item.category}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[8px] uppercase tracking-widest text-slate-500 font-bold">
                       {item.selectedSize || 'Standard'}
                    </span>
                    <span className="text-[10px] text-gray-400">·</span>
                    <span className="text-[9px] uppercase tracking-widest text-slate-500 font-medium italic">
                       {item.selectedColor || item.color}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                     <span className="text-[10px] font-bold text-brand-black">${item.price} × {item.quantity}</span>
                     <span className="text-xs font-serif font-bold text-brand-black">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Payment Selection */}
      <section className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">02. Settlement</h2>
            <CreditCard className="w-4 h-4 text-brand-gold" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
           <button 
             onClick={() => setPaymentMethod('COD')}
             className={`p-5 rounded-2xl border transition-all duration-500 text-left relative overflow-hidden group ${paymentMethod === 'COD' ? 'border-brand-black bg-brand-black text-white' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-brand-gold/30'}`}
           >
              <Truck className={`w-5 h-5 mb-3 ${paymentMethod === 'COD' ? 'text-brand-gold' : 'text-slate-300'}`} />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]">COD</p>
              <p className="text-[8px] opacity-60 mt-1 uppercase">Pay at door</p>
              {paymentMethod === 'COD' && <div className="absolute top-3 right-3 w-2 h-2 bg-brand-gold rounded-full" />}
           </button>

           <button 
             onClick={() => setPaymentMethod('Credit')}
             className={`p-5 rounded-2xl border transition-all duration-500 text-left relative overflow-hidden group ${paymentMethod === 'Credit' ? 'border-brand-black bg-brand-black text-white' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-brand-gold/30'}`}
           >
              <CreditCard className={`w-5 h-5 mb-3 ${paymentMethod === 'Credit' ? 'text-brand-gold' : 'text-slate-300'}`} />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Credit</p>
              <p className="text-[8px] opacity-60 mt-1 uppercase">Digital Pay</p>
              {paymentMethod === 'Credit' && <div className="absolute top-3 right-3 w-2 h-2 bg-brand-gold rounded-full" />}
           </button>
        </div>

        <AnimatePresence mode="wait">
           {paymentMethod === 'COD' ? (
              <motion.div 
                key="cod"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-6 bg-brand-gold/5 border border-brand-gold/20 rounded-2xl"
              >
                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                       <Truck className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div>
                       <h4 className="text-xs font-bold text-brand-black uppercase tracking-widest mb-1 italic">Cash on Delivery</h4>
                       <p className="text-[10px] text-gray-500 leading-relaxed uppercase">You will pay the full amount to our courier partner at the time of delivery at your doorstep.</p>
                    </div>
                 </div>
              </motion.div>
           ) : (
              <motion.div 
                key="credit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                  <label className="block space-y-2">
                     <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400 px-1">Card Number</span>
                     <input 
                       type="text" 
                       placeholder="XXXX XXXX XXXX XXXX"
                       value={cardInfo.number}
                       onChange={(e) => setCardInfo({...cardInfo, number: e.target.value})}
                       className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-xs focus:outline-none focus:border-brand-gold focus:bg-white transition-all tracking-[2px]"
                     />
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="block space-y-2">
                       <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400 px-1">Expiry</span>
                       <input 
                         type="text" 
                         placeholder="MM/YY"
                         value={cardInfo.expiry}
                         onChange={(e) => setCardInfo({...cardInfo, expiry: e.target.value})}
                         className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-xs focus:outline-none focus:border-brand-gold focus:bg-white transition-all"
                       />
                    </label>
                    <label className="block space-y-2">
                       <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400 px-1">CVV</span>
                       <input 
                         type="password" 
                         placeholder="***"
                         maxLength={3}
                         value={cardInfo.cvv}
                         onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
                         className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-xs focus:outline-none focus:border-brand-gold focus:bg-white transition-all"
                       />
                    </label>
                  </div>
              </motion.div>
           )}
        </AnimatePresence>
      </section>

      {/* Financial Breakdown Section */}
      <section className="space-y-6 pt-10 border-t border-slate-100">
         <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">03. Bill Breakdown</h2>
         <div className="space-y-4 text-xs">
           <div className="flex justify-between items-center text-slate-500 uppercase tracking-widest text-[10px]">
             <span>Subtotal</span>
             <span className="font-bold text-brand-black tracking-normal">${subtotal.toLocaleString()}</span>
           </div>
           <div className="flex justify-between items-center text-slate-500 uppercase tracking-widest text-[10px]">
             <span>Shipping</span>
             <span className="font-bold text-brand-black tracking-normal">${shipping.toLocaleString()}</span>
           </div>
           <div className="flex justify-between items-center text-slate-500 uppercase tracking-widest text-[10px]">
             <span>Tax (GST 8%)</span>
             <span className="font-bold text-brand-black tracking-normal">${tax.toLocaleString()}</span>
           </div>
           <div className="pt-6 mt-6 border-t border-dashed border-slate-200 flex justify-between items-end">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold">Total Amount Due</p>
                <p className="text-[9px] text-gray-400 uppercase mt-1">Inclusive of all taxes</p>
              </div>
              <span className="text-3xl font-serif font-bold text-brand-black tracking-tight italic">${total.toLocaleString()}</span>
           </div>
         </div>
      </section>

      <button
        onClick={onPlaceOrder}
        disabled={paymentMethod === 'Credit' && (!cardInfo.number || !cardInfo.expiry || !cardInfo.cvv)}
        className="w-full rounded-2xl bg-brand-black text-white py-6 text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-500 hover:bg-brand-gold hover:shadow-2xl hover:-translate-y-1 disabled:opacity-30 disabled:cursor-not-allowed group shadow-xl"
      >
        <span className="flex items-center justify-center gap-3">
           {paymentMethod === 'COD' ? 'Confirm Parcel' : 'Process Payment'}
        </span>
      </button>

      <div className="flex flex-col items-center justify-center space-y-3 opacity-40 group">
         <div className="flex gap-4">
            <span className="text-[10px] font-bold uppercase tracking-widest">SSL Secure</span>
            <span className="text-[10px] text-brand-gold font-bold">·</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">PCI Compliant</span>
         </div>
         <p className="text-[8px] uppercase tracking-[0.2em] font-medium transition-colors group-hover:text-brand-gold">Your privacy is our priority at Atelier</p>
      </div>
    </div>
  );
};

export default OrderSummary;
