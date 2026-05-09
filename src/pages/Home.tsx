import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, ShoppingBag } from 'lucide-react';
import { products } from '../data/products';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import hero from '../assets/hero.png';
import menImpor from '../assets/menImpor.png';
import womenImpor from '../assets/womenImpor.png';
import kidImpor from '../assets/kidImpor.png';

const liveNotifications = [
  'Ali from Karachi just bought a Hoodie',
  'Sara added Sneakers to cart',
  'Liam from London just reserved a Tailored Shirt',
];

const customerVoices = [
  { name: 'Maya K.', rating: 5, text: 'The fit is flawless and the fabric feels bespoke.' },
  { name: 'Ethan R.', rating: 4, text: 'Every detail speaks premium craftsmanship.' },
  { name: 'Nina L.', rating: 5, text: 'A quiet luxury wardrobe essential.' },
];

const getCountdown = () => {
  const now = new Date();
  const target = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  const diff = target.getTime() - now.getTime();
  return {
    hours: String(Math.max(0, Math.floor(diff / 3600000))).padStart(2, '0'),
    minutes: String(Math.max(0, Math.floor((diff % 3600000) / 60000))).padStart(2, '0'),
    seconds: String(Math.max(0, Math.floor((diff % 60000) / 1000))).padStart(2, '0'),
  };
};

const Home: React.FC = () => {
  const [activeNotification, setActiveNotification] = useState(0);
  const [countdown, setCountdown] = useState(getCountdown());
  const [reviewText, setReviewText] = useState('');
  const [submittedReviews, setSubmittedReviews] = useState<{ name: string; text: string }[]>([]);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { config, products: adminProducts } = useAdmin();
  const sourceProducts = adminProducts.length ? adminProducts : products;

  const categories = [
    { name: 'Men',   label: config.catMenLabel   || 'Men',       image: menImpor   },
    { name: 'Women', label: config.catWomenLabel  || 'Women',     image: womenImpor },
    { name: 'Kids',  label: config.catKidsLabel   || 'Kids Wear', image: kidImpor   },
  ];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveNotification(prev => (prev + 1) % liveNotifications.length);
    }, 4500);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !reviewText.trim()) return;
    setSubmittedReviews(current => [{ name: user.name, text: reviewText.trim() }, ...current]);
    setReviewText('');
  };

  const allReviews = [
    ...customerVoices.map(r => ({ name: r.name, text: r.text })),
    ...submittedReviews,
  ];

  const newArrivals = sourceProducts.slice(1, 5);

  return (
    <div className="overflow-hidden bg-white text-slate-950">

      {/* ── Live Notification ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNotification}
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.25 }}
          className="notification-popup"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500 mb-1.5">Live notification</p>
          <p className="text-xs sm:text-sm font-medium text-slate-900 leading-snug">
            {liveNotifications[activeNotification]}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="relative min-h-[100svh] sm:min-h-[92vh] overflow-hidden bg-slate-950">
        <div
className="absolute inset-0 bg-cover bg-no-repeat bg-right sm:bg-center"          style={{ backgroundImage: `url(${config.heroImage || hero})` }}
        />
        <div className="absolute inset-0 bg-slate-950/40" />

        <div className="relative z-10 flex min-h-[100svh] sm:min-h-[92vh] items-end sm:items-center">
          <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 pb-16 pt-28 sm:py-32">
            <div className="max-w-xl sm:max-w-2xl text-white">
              <motion.p
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-[9px] sm:text-sm uppercase tracking-[0.4em] text-slate-200 mb-4 sm:mb-6"
              >
                {config.heroTagline}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.1] mb-4 sm:mb-6"
              >
                {config.heroHeading}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-sm sm:max-w-lg text-sm sm:text-base text-slate-300 mb-8 sm:mb-10 leading-relaxed"
              >
                {config.heroDescription}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <Link
                  to={config.heroCtaLink || '/shop'}
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-7 py-3.5 sm:px-8 sm:py-4 text-[10px] sm:text-sm uppercase tracking-[0.35em] text-white transition hover:bg-white hover:text-slate-950 active:scale-95 w-full sm:w-auto"
                >
                  <span>{config.heroCtaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-14 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif mb-3 sm:mb-4">
              {config.categoriesTitle || 'Explore Atelier'}
            </h2>
            <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-slate-500">
              {config.categoriesSubtitle || 'Men · Women · Kids'}
            </p>
          </div>

          {/* Mobile: horizontal scroll | md+: 3-col grid */}
          <div className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto pb-4 md:pb-0 -mx-5 px-5 md:mx-0 md:px-0 snap-x snap-mandatory">
            {categories.map(category => (
              <Link
                key={category.name}
                to={`/shop?category=${category.name}`}
                className="group relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-slate-100 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.25)] flex-shrink-0 w-[72vw] xs:w-[60vw] sm:w-[45vw] md:w-auto snap-start"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-[380px] sm:h-[460px] md:h-[520px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/20" />
                <div className="absolute inset-0 flex items-end p-5 sm:p-8">
                  <div>
                    <p className="text-[9px] sm:text-sm uppercase tracking-[0.4em] text-white mb-1.5 sm:mb-2">
                      Editorial
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-serif text-white">{category.label}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SALE BANNER ── */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="rounded-[28px] sm:rounded-[40px] bg-slate-900 px-6 sm:px-8 py-12 sm:py-16 text-center text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)]">
            <p className="text-[10px] sm:text-sm uppercase tracking-[0.4em] text-slate-400 mb-4 sm:mb-5">
              Limited Time Offer
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4 sm:mb-6">
              {config.saleText || 'Up to 50% OFF'}
            </h2>
            <p className="max-w-xs sm:max-w-2xl mx-auto text-sm sm:text-base text-slate-300 mb-5 sm:mb-6">
              {config.saleDescription || 'Discover curated essentials from our latest season with exclusive savings on select styles.'}
            </p>

            {/* Countdown — stacks nicely on small screens */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-white/10 px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs uppercase tracking-[0.35em] text-slate-200 mb-7 sm:mb-8">
              <span>{config.saleCountdownLabel || 'Sale ends in'}</span>
              <span className="font-mono font-semibold text-white">
                {countdown.hours}:{countdown.minutes}:{countdown.seconds}
              </span>
            </div>

            <br />
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white px-7 sm:px-8 py-3 text-xs sm:text-sm uppercase tracking-[0.35em] text-slate-950 transition hover:bg-slate-100 active:scale-95"
            >
              {config.saleBtnText || 'Browse Sale'}
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ── */}
      <section className="py-14 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col gap-3 sm:gap-6 sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-12">
            <div>
              <p className="text-[10px] sm:text-sm uppercase tracking-[0.4em] text-slate-500 mb-2 sm:mb-3">
                {config.newArrivalsTagline || 'New Arrivals'}
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif">
                {config.newArrivalsHeading || 'Just Landed'}
              </h2>
            </div>
            <Link
              to="/shop"
              className="self-start sm:self-auto text-xs sm:text-sm uppercase tracking-[0.35em] text-slate-600 border-b border-slate-900/10 pb-1 hover:text-slate-900"
            >
              {config.newArrivalsLinkText || 'View all new arrivals'}
            </Link>
          </div>

          {/* Horizontal scroll on all screens */}
          <div className="-mx-5 sm:-mx-6 overflow-x-auto pb-4">
            <div className="inline-flex gap-4 sm:gap-6 px-5 sm:px-6">
              {newArrivals.map(product => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="min-w-[260px] xs:min-w-[290px] sm:min-w-[320px] rounded-[24px] sm:rounded-[32px] border border-slate-200 bg-white p-4 sm:p-5 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.15)]"
                >
                  <div className="relative overflow-hidden rounded-[20px] sm:rounded-[28px] bg-slate-100">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-[280px] xs:h-[310px] sm:h-[360px] w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent" />
                  </div>
                  <div className="mt-4 sm:mt-6 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[9px] sm:text-xs uppercase tracking-[0.35em] text-slate-500">
                        {product.category}
                      </p>
                      <h3 className="text-lg sm:text-xl font-serif mt-2 sm:mt-3 leading-snug">
                        {product.name}
                      </h3>
                    </div>
                    <button className="shrink-0 rounded-full border border-slate-200 p-2.5 sm:p-3 text-slate-600 transition hover:bg-slate-100 active:scale-95">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-4 flex items-center justify-between text-sm text-slate-700">
                    <span className="font-medium">${product.price.toLocaleString()}</span>
                    <button
                      onClick={() => addToCart(product, 1, product.sizes?.[0])}
                      className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-slate-900 px-3.5 sm:px-4 py-2 text-xs sm:text-sm text-white transition hover:bg-slate-800 active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-14 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col gap-3 sm:gap-6 sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-10">
            <div>
              <p className="text-[10px] sm:text-sm uppercase tracking-[0.4em] text-slate-500 mb-2 sm:mb-3">
                {config.reviewsTagline || 'User Reviews'}
              </p>
              <h2 className="text-2xl sm:text-4xl font-serif leading-snug">
                {config.reviewsHeading || 'Share your Atelier experience'}
              </h2>
            </div>
          </div>

          {/* Review Form */}
          <div className="rounded-[24px] sm:rounded-[32px] border border-slate-200 bg-white p-5 sm:p-8 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.15)] mb-8 sm:mb-12">
            {user ? (
              <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-slate-500">
                    Write your review
                  </label>
                  <textarea
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                    rows={3}
                    className="mt-3 w-full rounded-[18px] sm:rounded-[24px] border border-slate-200 bg-slate-50 px-4 sm:px-5 py-3 sm:py-4 text-sm text-slate-900 outline-none focus:border-slate-900 resize-none"
                    placeholder="Share your experience with Atelier"
                  />
                </div>
                <button
                  type="submit"
                  className="self-end inline-flex items-center justify-center rounded-full bg-slate-900 px-7 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-[0.35em] text-white transition hover:bg-slate-800 active:scale-95"
                >
                  Submit Review
                </button>
              </form>
            ) : (
              <div className="rounded-[18px] sm:rounded-[24px] border border-slate-200 bg-slate-50 px-5 sm:px-6 py-6 sm:py-8 text-center text-xs sm:text-sm text-slate-600">
                Please login to submit a review
              </div>
            )}
          </div>

          {/* Marquee */}
          <div className="review-marquee overflow-hidden rounded-[24px] sm:rounded-[32px] border border-slate-200 bg-slate-950 px-4 sm:px-5 py-5 sm:py-6 text-white">
            <div className="review-marquee-track inline-flex items-center gap-4 sm:gap-6">
              {[...allReviews, ...allReviews].map((review, index) => (
                <div
                  key={`${review.name}-${index}`}
                  className="min-w-[240px] sm:min-w-[320px] rounded-[20px] sm:rounded-[28px] bg-white/10 p-4 sm:p-5"
                >
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.35em] text-slate-200 mb-2 sm:mb-3">
                    {review.name}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;