import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, LogIn, UserPlus, ArrowLeft } from 'lucide-react';

const LoginRequired: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center space-y-8"
      >
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-brand-beige/30 rounded-[2rem] flex items-center justify-center mx-auto mb-8 relative z-10 border border-brand-beige">
            <Lock className="w-10 h-10 text-brand-gold" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl -z-0"></div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-serif text-brand-black tracking-tight">Authentication Required</h1>
          <p className="text-gray-500 leading-relaxed max-w-sm mx-auto">
            To maintain the exclusivity of our collection and provide a personalized experience, we require you to be signed in before adding items to your bag.
          </p>
        </div>

        <div className="flex flex-col space-y-4 pt-4">
          <Link 
            to="/login"
            className="flex items-center justify-center space-x-3 w-full py-4 bg-brand-black text-white rounded-2xl hover:bg-brand-gold transition-all duration-500 shadow-xl group"
          >
            <LogIn className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Sign In to Your Account</span>
          </Link>
          
          <Link 
            to="/login?signup=true"
            className="flex items-center justify-center space-x-3 w-full py-4 bg-white border border-gray-100 text-brand-black rounded-2xl hover:border-brand-gold/30 hover:luxury-shadow transition-all duration-500 group"
          >
            <UserPlus className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Create Your Invitation</span>
          </Link>
        </div>

        <div className="pt-8">
          <Link 
            to="/shop" 
            className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-brand-black transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Return to Gallery</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginRequired;
