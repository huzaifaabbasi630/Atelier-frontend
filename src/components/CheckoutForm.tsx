import React, { useState } from 'react';

interface CheckoutFormProps {
  onSubmit: (values: { fullName: string; address: string; phone: string; postalCode: string }) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit }) => {
  const [values, setValues] = useState({
    fullName: '',
    address: '',
    phone: '',
    postalCode: '',
  });

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div>
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">01. Delivery</p>
          <h2 className="text-3xl font-serif uppercase tracking-[0.25em] mt-3">Shipping Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Full Name</span>
            <input
              type="text"
              value={values.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="ALEXANDER VOGUE"
              className="mt-3 w-full border-0 border-b border-slate-300 bg-transparent py-3 text-sm uppercase tracking-[0.15em] text-slate-900 outline-none transition focus:border-slate-900"
            />
          </label>

          <label className="block md:col-span-2">
            <span className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Shipping Address</span>
            <input
              type="text"
              value={values.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="221B BAKER STREET, LONDON"
              className="mt-3 w-full border-0 border-b border-slate-300 bg-transparent py-3 text-sm uppercase tracking-[0.15em] text-slate-900 outline-none transition focus:border-slate-900"
            />
          </label>

          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Phone Number</span>
            <input
              type="tel"
              value={values.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+44 20 7946 0958"
              className="mt-3 w-full border-0 border-b border-slate-300 bg-transparent py-3 text-sm uppercase tracking-[0.15em] text-slate-900 outline-none transition focus:border-slate-900"
            />
          </label>

          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Postal Code</span>
            <input
              type="text"
              value={values.postalCode}
              onChange={(e) => handleChange('postalCode', e.target.value)}
              placeholder="NW1 6XE"
              className="mt-3 w-full border-0 border-b border-slate-300 bg-transparent py-3 text-sm uppercase tracking-[0.15em] text-slate-900 outline-none transition focus:border-slate-900"
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-4 text-sm uppercase tracking-[0.35em] text-white transition hover:bg-slate-800"
      >
        Save Delivery
      </button>
    </form>
  );
};

export default CheckoutForm;
