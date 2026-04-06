import React from 'react';
import { ArrowRight, Clock, ShieldCheck, Package, RefreshCcw, AlertTriangle } from 'lucide-react';

const Returns: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500 mb-4">Returns & Exchanges</p>
          <h1 className="text-5xl md:text-6xl font-serif uppercase leading-tight">Easy Returns, Refined Experience</h1>
          <p className="mt-6 max-w-2xl mx-auto text-base text-slate-600 font-sans">A clear and elegant process for returns and exchanges, designed to keep your Atelier experience as seamless as our collection.</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start mb-20">
          <div className="space-y-8">
            <div className="rounded-[32px] border border-slate-200 p-8 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.2)]">
              <div className="flex items-center gap-4 mb-4 text-slate-900">
                <ShieldCheck className="h-6 w-6" />
                <h2 className="text-2xl font-serif">Return Policy</h2>
              </div>
              <p className="text-slate-600 leading-relaxed font-sans">We accept returns on most unworn, unaltered items within 30 days of receipt. Products should be returned in the original packaging with tags intact.</p>
            </div>

            <div className="rounded-[32px] border border-slate-200 p-8 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.2)]">
              <div className="flex items-center gap-4 mb-4 text-slate-900">
                <Clock className="h-6 w-6" />
                <h2 className="text-2xl font-serif">Return Window</h2>
              </div>
              <p className="text-slate-600 leading-relaxed font-sans">Submit your return request within 30 days of delivery. Personalized and sale items may follow special eligibility rules described below.</p>
            </div>

            <div className="rounded-[32px] border border-slate-200 p-8 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.2)]">
              <div className="flex items-center gap-4 mb-4 text-slate-900">
                <Package className="h-6 w-6" />
                <h2 className="text-2xl font-serif">Exchange Process</h2>
              </div>
              <p className="text-slate-600 leading-relaxed font-sans">Choose the item you want to exchange, submit the request, then return the original piece. Once we receive the item, we will ship the replacement promptly.</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px] bg-slate-50 p-8 relative">
            <div className="absolute inset-y-0 left-10 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
            <div className="relative space-y-8">
              {[
                { step: '1', title: 'Submit Request', description: 'Complete the return or exchange form on our Returns page and choose your preferred outcome.' },
                { step: '2', title: 'Prepare Package', description: 'Pack your item securely with the original packaging and any return label provided.' },
                { step: '3', title: 'Ship Item', description: 'Send the package using the provided label or your selected courier.' },
                { step: '4', title: 'Review & Process', description: 'We inspect the item and process your exchange or refund within 5 business days.' },
              ].map((step) => (
                <div key={step.step} className="relative pl-16">
                  <div className="absolute left-0 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm">{step.step}</div>
                  <div className="border-l border-slate-300 pl-6">
                    <h3 className="text-xl font-serif mb-2">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed font-sans">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8">
            <h3 className="text-2xl font-serif mb-4">Refund Timeline</h3>
            <p className="text-slate-600 leading-relaxed font-sans">Once your return is received and inspected, refunds are issued within 5-7 business days. The amount will be returned to your original payment method.</p>
          </div>
          <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8">
            <h3 className="text-2xl font-serif mb-4">Exceptions</h3>
            <ul className="space-y-4 text-slate-600 font-sans">
              <li className="flex items-start gap-3"><AlertTriangle className="h-4 w-4 mt-1 text-slate-500" /> Sale items may only be eligible for store credit.</li>
              <li className="flex items-start gap-3"><AlertTriangle className="h-4 w-4 mt-1 text-slate-500" /> Personalized products cannot be returned unless defective.</li>
              <li className="flex items-start gap-3"><AlertTriangle className="h-4 w-4 mt-1 text-slate-500" /> Items must be unworn, unused, and in original condition.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Returns;
