import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Instagram, Twitter, Facebook, Sparkles } from 'lucide-react';

/**
 * ThankYouPage Component
 * Displays a luxury "Thank You" message after successful login.
 */
const ThankYouPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If no user is present (e.g. page refreshed or direct link), redirect to login
  useEffect(() => {
    if (!user) {
      const timeout = setTimeout(() => navigate('/login'), 3000);
      return () => clearTimeout(timeout);
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-brand-gold/30">
      {/* Celebration Layer (Subtle floating sparkles) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: [0, 1, 0], 
              y: [100, -200],
              x: Math.random() * 400 - 200 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              delay: i * 0.5,
              ease: "linear"
            }}
            className="absolute left-1/2 bottom-0 text-brand-gold/20"
          >
            <Sparkles size={24 + i * 4} />
          </motion.div>
        ))}
      </div>

      <main className="flex-1 flex items-center justify-center px-6 py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white luxury-shadow rounded-sm overflow-hidden border border-brand-beige/20"
        >
          {/* Welcome Content */}
          <div className="p-12 md:p-20 flex flex-col justify-center text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl md:text-6xl font-serif mb-8 text-brand-black tracking-tighter italic">
                Atelier
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-xl md:text-2xl uppercase tracking-[0.5em] font-light text-gray-400 mb-6">
                Login Successful
              </h2>
              <p className="text-2xl md:text-3xl font-serif leading-snug mb-8 text-slate-800">
                Thank you, <span className="text-brand-gold italic">{user?.name || '[Username]'}</span>, for logging in to Atelier!
              </p>
              <p className="text-sm md:text-base text-slate-500 mb-12 max-w-md mx-auto lg:mx-0 font-light leading-relaxed tracking-wide">
                We are delighted to have you back. Your curated selection of luxury fashion awaits discovery.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/"
                className="group relative inline-flex items-center justify-center gap-4 bg-brand-black text-white px-12 py-5 text-xs uppercase tracking-[0.4em] overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 w-full h-full bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <ShoppingBag className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">Shop the Collection</span>
              </Link>
            </motion.div>
          </div>

          {/* Decorative Visual */}
          <div className="hidden lg:block relative h-full bg-slate-100 overflow-hidden">
            <motion.img 
              initial={{ scale: 1.2, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000" 
              alt="Luxury Fashion Background" 
              className="w-full h-full object-cover grayscale-[20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
          </div>
        </motion.div>
      </main>

     
    </div>
  );
};

export default ThankYouPage;