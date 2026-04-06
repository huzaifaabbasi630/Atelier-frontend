import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../types';

interface ReviewsSectionProps {
  reviews: Review[];
  description: string;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, description }) => {
  const addtionalInfo = [
    { title: 'Fabric Details', value: '100% premium cotton, soft hand feel, breathable and long-lasting.' },
    { title: 'Care Instructions', value: 'Dry clean recommended. Do not bleach. Iron on low heat.' },
    { title: 'Shipping Info', value: 'Free express shipping on all orders. Delivered in 3-5 business days.' },
  ];

  return (
    <div className="space-y-14">
      <section className="space-y-6">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Product Description</p>
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.18)]">
          <p className="text-sm leading-relaxed text-slate-700">{description}</p>
        </div>
      </section>

      <section className="space-y-6">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Customer Impressions</p>
        <div className="grid gap-6 lg:grid-cols-2">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.18)]">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-base font-semibold text-slate-900">{review.user}</p>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Verified Buyer</p>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className={`w-4 h-4 ${idx < review.rating ? 'fill-current' : 'text-slate-200'}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{review.comment}</p>
              <p className="mt-4 text-[10px] uppercase tracking-[0.35em] text-slate-400">{review.date}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Additional Info</p>
        <div className="grid gap-6 lg:grid-cols-3">
          {addtionalInfo.map((info) => (
            <div key={info.title} className="rounded-[32px] border border-slate-200 bg-white p-6 text-sm text-slate-700">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-3">{info.title}</p>
              <p>{info.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ReviewsSection;
