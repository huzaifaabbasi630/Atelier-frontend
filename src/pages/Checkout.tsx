import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import { useAuth } from '../context/AuthContext';
import { placeOrder } from '../api';
import CheckoutForm from '../components/CheckoutForm';
import CartItemCard from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import { ArrowRight } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { addOrder } = useAdmin();
  const { user } = useAuth();
  const [deliverySaved, setDeliverySaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deliveryData, setDeliveryData] = useState({
    fullName: '',
    address: '',
    phone: '',
    postalCode: '',
  });
  const navigate = useNavigate();

  const shipping = 25;
  const tax = Math.round(cartTotal * 0.08);

  const handleDeliverySubmit = (values: { fullName: string; address: string; phone: string; postalCode: string }) => {
    setDeliveryData(values);
    setDeliverySaved(true);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handlePlaceOrder = async () => {
    if (!deliverySaved) {
       alert('Please save your delivery information first.');
       return;
    }

    // Payload Validation
    if (!user?.email && !deliveryData.fullName) {
      alert('Missing customer information.');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    const orderPayload = {
      customerName: deliveryData.fullName,
      customerEmail: user?.email || 'guest@atelier.com',
      shippingAddress: `${deliveryData.address}, ${deliveryData.postalCode}`,
      phone: deliveryData.phone,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        color: item.selectedColor || item.color,
        size: item.selectedSize || 'Standard'
      })),
      totalAmount: cartTotal + shipping + tax,
      paymentMethod: 'Credit Card' // Default for now
    };

    setLoading(true);
    try {
      console.log('[Placing Order]:', orderPayload);
      const response = await placeOrder(orderPayload);
      
      console.log('[Order Success]:', response);
      
      // Update local admin state if needed (optional)
      addOrder({
        ...orderPayload,
        id: response.id || `ORD-${Date.now()}`,
        status: 'Pending',
        createdAt: new Date().toISOString()
      });

      clearCart();
      navigate('/order-success');
    } catch (err: any) {
      console.error('[Order Placement Error]:', err.message);
      alert(`Order failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-24 text-center bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <h1 className="text-5xl font-serif mb-6 uppercase tracking-widest">Your cart is empty</h1>
          <p className="text-slate-600 mb-10">Add products to your bag and return here to complete checkout.</p>
          <Link
            to="/shop"
            className="inline-flex rounded-full bg-slate-950 px-8 py-4 text-sm uppercase tracking-[0.35em] text-white transition hover:bg-slate-800"
          >
            Shop Atelier
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-8 mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Checkout</p>
          <h1 className="text-5xl font-serif font-semibold tracking-tight text-slate-950">Complete your order</h1>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:gap-16 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7 space-y-12 md:space-y-16 order-2 lg:order-1">
            <CheckoutForm onSubmit={handleDeliverySubmit} />

            <section>
              <div className="mb-6 md:mb-8">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-slate-500">02. Cart Items</p>
                <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-[0.25em] mt-3 text-slate-950">Your Bag</h2>
              </div>
              <div className="space-y-6 md:space-y-10">
                {cart.map((item) => (
                  <CartItemCard
                    key={`${item.id}-${item.selectedSize || 'default'}-${item.selectedColor || item.color}`}
                    item={item}
                    onQuantityChange={(newQuantity) => updateQuantity(item.id, newQuantity, item.selectedSize, item.selectedColor)}
                    onRemove={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                  />
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 sticky top-32">
            <OrderSummary cart={cart} subtotal={cartTotal} shipping={shipping} tax={tax} onPlaceOrder={handlePlaceOrder} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
