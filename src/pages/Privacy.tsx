import React from 'react';
import { Mail, ShieldCheck, Globe, Lock, FileText, User } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500 mb-4">Policy</p>
          <h1 className="text-5xl md:text-6xl font-serif uppercase leading-tight">Privacy Policy</h1>
          <p className="mt-6 max-w-2xl mx-auto text-base text-slate-600 font-sans">Our privacy policy is designed to be clear, concise, and reassuring. We protect your data with respect, transparency, and trust.</p>
        </div>

        <div className="space-y-10">
          <section className="rounded-[28px] border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-5 text-slate-900">
              <FileText className="h-5 w-5" />
              <h2 className="text-2xl font-serif">Information Collection</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-sans">We collect only the information needed to process orders, personalize your experience, and communicate with you. This includes contact details, shipping information, and payment details.</p>
          </section>

          <section className="rounded-[28px] border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-5 text-slate-900">
              <Globe className="h-5 w-5" />
              <h2 className="text-2xl font-serif">Usage</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-sans">Your data helps us fulfill orders, improve our collections, tailor recommendations, and deliver a premium service across our online experience.</p>
          </section>

          <section className="rounded-[28px] border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-5 text-slate-900">
              <ShieldCheck className="h-5 w-5" />
              <h2 className="text-2xl font-serif">Data Sharing</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-sans">We never sell your personal information. Data is shared only with trusted partners necessary to process orders, deliver products, or comply with legal obligations.</p>
          </section>

          <section className="rounded-[28px] border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-5 text-slate-900">
              <Lock className="h-5 w-5" />
              <h2 className="text-2xl font-serif">Cookies</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-sans">Cookies and similar technologies help us remember preferences, secure your session, and analyze site performance. You can manage these settings in your browser.</p>
          </section>

          <section className="rounded-[28px] border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-5 text-slate-900">
              <User className="h-5 w-5" />
              <h2 className="text-2xl font-serif">User Rights</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-sans">You may review, update, or delete your personal data by contacting our support team. We honor your rights and respond to requests promptly.</p>
          </section>

          <section className="rounded-[28px] border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-5 text-slate-900">
              <Mail className="h-5 w-5" />
              <h2 className="text-2xl font-serif">Contact Info</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-sans">For privacy questions, reach out to our customer care team at privacy@atelier.com. We are committed to keeping your information secure and respected.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
