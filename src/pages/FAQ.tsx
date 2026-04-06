import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, CreditCard, Package, RotateCcw, User, ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    category: 'Orders & Payment',
    icon: ShoppingBag,
    items: [
      {
        question: 'How do I place an order?',
        answer: 'Browse our collections, select the product you love, choose your size, and complete checkout using our secure payments flow. You will receive an order confirmation email once your purchase is complete.',
      },
      {
        question: 'What payment methods are accepted?',
        answer: 'We accept major credit cards, debit cards, and secure digital wallets. All payments are processed through encrypted gateways for safe and seamless checkout.',
      },
    ],
  },
  {
    category: 'Products & Sizing',
    icon: CreditCard,
    items: [
      {
        question: 'Can I request product details before purchasing?',
        answer: 'Yes. Our product pages include detailed descriptions, materials, and fit guidance. For additional questions, our support team is happy to help via the contact page.',
      },
      {
        question: 'How does sizing work?',
        answer: 'Each product includes a size guide and fit notes. If you need personalized assistance, our support specialists can help you choose the best size for your needs.',
      },
    ],
  },
  {
    category: 'Delivery & Shipping',
    icon: Package,
    items: [
      {
        question: 'How long does delivery take?',
        answer: 'Standard delivery usually arrives within 3-5 business days. Express shipping is available for faster delivery where offered.',
      },
      {
        question: 'Can I track my shipment?',
        answer: 'Yes, once your order ships we will send a tracking number and delivery link so you can follow your package from our studio to your door.',
      },
    ],
  },
  {
    category: 'Returns & Exchanges',
    icon: RotateCcw,
    items: [
      {
        question: 'How can I exchange or return a product?',
        answer: 'Visit our Returns & Exchanges page to begin the process. Follow the step-by-step guide and submit your request within the return window for eligibility.',
      },
      {
        question: 'Are there any return fees?',
        answer: 'Most returns are complimentary when submitted within the policy window. Some exceptions may apply for international orders or personalized items.',
      },
    ],
  },
  {
    category: 'Account & Support',
    icon: User,
    items: [
      {
        question: 'How can I update my account details?',
        answer: 'Log in to your account page to update your information, shipping address, and communication preferences. If you need assistance, our support team is available to help.',
      },
      {
        question: 'How do I contact customer support?',
        answer: 'Use the contact page or email our team directly for styling advice, order questions, or support with a purchase. We aim to respond promptly during business hours.',
      },
    ],
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<{ cat: number; item: number } | null>({ cat: 0, item: 0 });

  const handleToggle = (catIndex: number, itemIndex: number) => {
    if (openIndex?.cat === catIndex && openIndex?.item === itemIndex) {
      setOpenIndex(null);
      return;
    }
    setOpenIndex({ cat: catIndex, item: itemIndex });
  };

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500 mb-4">Customer Care</p>
          <h1 className="text-5xl md:text-6xl font-serif uppercase leading-tight">Frequently Asked Questions</h1>
          <p className="mt-6 max-w-2xl mx-auto text-base text-slate-600 font-sans">Find clear answers to our most common questions across orders, products, shipping, returns, and account support.</p>
        </div>

        <div className="space-y-10">
          {faqData.map((category, catIndex) => {
            const Icon = category.icon;
            return (
              <section key={category.category} className="rounded-[32px] border border-slate-200 p-8 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.2)]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-700 shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif">{category.category}</h2>
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Trusted guidance and clarity</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => {
                    const isOpen = openIndex?.cat === catIndex && openIndex?.item === itemIndex;
                    return (
                      <div key={item.question} className="rounded-3xl border border-slate-200 bg-slate-50">
                        <button
                          type="button"
                          onClick={() => handleToggle(catIndex, itemIndex)}
                          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                        >
                          <span className="text-base font-medium text-slate-900 font-sans">{item.question}</span>
                          {isOpen ? <ChevronUp className="h-5 w-5 text-slate-600" /> : <ChevronDown className="h-5 w-5 text-slate-600" />}
                        </button>
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden px-6"
                        >
                          {isOpen && (
                            <p className="pb-6 text-slate-600 leading-relaxed text-sm font-sans">{item.answer}</p>
                          )}
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
