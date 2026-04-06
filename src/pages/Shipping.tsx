import React from 'react';
import { Package, Rocket, Globe, DollarSign, MapPin, AlertTriangle, ArrowRight, Clock } from 'lucide-react';

const shippingTypes = [
  {
    icon: Package,
    title: 'Standard',
    description: 'Reliable shipping for graceful, everyday delivery.',
  },
  {
    icon: Rocket,
    title: 'Express',
    description: 'Faster delivery when you want luxury in a hurry.',
  },
  {
    icon: Globe,
    title: 'International',
    description: 'Global delivery with premium care and visibility.',
  },
];

const Shipping: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500 mb-4">Shipping</p>
          <h1 className="text-5xl md:text-6xl font-serif uppercase leading-tight">Shipping Policy</h1>
          <p className="mt-6 max-w-2xl mx-auto text-base text-slate-600 font-sans">Everything you need to know about processing, delivery, tracking, and support for your Atelier shipment.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {shippingTypes.map((method) => {
            const Icon = method.icon;
            return (
              <div key={method.title} className="rounded-[32px] border border-slate-200 p-8 text-center shadow-[0_24px_80px_-40px_rgba(15,23,42,0.2)]">
                <Icon className="mx-auto h-10 w-10 text-slate-700 mb-4" />
                <h2 className="text-xl font-serif mb-2">{method.title}</h2>
                <p className="text-slate-600 text-sm font-sans">{method.description}</p>
              </div>
            );
          })}
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 mb-16 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.2)]">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm uppercase tracking-[0.35em] text-slate-500">Processing Time</span>
                <Clock className="h-5 w-5 text-slate-500" />
              </div>
              <p className="text-slate-600 text-sm font-sans">Most orders are prepared within 1-2 business days.</p>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm uppercase tracking-[0.35em] text-slate-500">Shipping Costs</span>
                <DollarSign className="h-5 w-5 text-slate-500" />
              </div>
              <p className="text-slate-600 text-sm font-sans">Costs vary by service and destination, with transparent pricing at checkout.</p>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm uppercase tracking-[0.35em] text-slate-500">Delivery Time</span>
                <MapPin className="h-5 w-5 text-slate-500" />
              </div>
              <p className="text-slate-600 text-sm font-sans">Standard delivery arrives in 3-5 business days, express in 1-2 days.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[32px] border border-slate-200 p-8 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.2)]">
            <div className="flex items-center gap-3 mb-6 text-slate-900">
              <Package className="h-6 w-6" />
              <h2 className="text-2xl font-serif">Tracking Orders</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-sans">After your order ships, we send a secure tracking number so you can follow every step of the delivery.</p>
            <div className="mt-8 grid gap-4">
              {['Order confirmed', 'Shipment prepared', 'Carrier pickup', 'Delivered to your door'].map((step, idx) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700">{idx + 1}</div>
                  <p className="text-slate-600 text-sm font-sans">{step}</p>
                  {idx < 3 && <ArrowRight className="h-4 w-4 text-slate-400" />}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 p-8 bg-slate-50 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.2)]">
            <div className="flex items-center gap-3 mb-6 text-slate-900">
              <AlertTriangle className="h-6 w-6" />
              <h2 className="text-2xl font-serif">Lost / Damaged Items</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-sans">If your package is lost or arrives damaged, contact our customer support immediately. We will resolve the issue quickly with replacement or refund options.</p>
            <p className="mt-6 text-slate-500 text-sm font-sans">Please retain packaging and order information until your issue has been fully resolved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
