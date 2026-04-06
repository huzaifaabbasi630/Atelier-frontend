import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogOut, X, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LogoutConfirm: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleConfirm = () => {
    logout();
    navigate('/');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white luxury-shadow luxury-border p-12 text-center space-y-8 rounded-[2.5rem]"
      >
        <div className="w-20 h-20 bg-red-50 rounded-[2rem] flex items-center justify-center mx-auto mb-4 border border-red-100">
          <LogOut className="w-8 h-8 text-red-500" />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-serif text-brand-black tracking-tight uppercase">Signing Out?</h1>
          <p className="text-gray-500 leading-relaxed text-sm">
            Are you sure you wish to end your current session at Atelier? Your selection in the bag will be preserved if you return shortly.
          </p>
        </div>

        <div className="flex flex-col space-y-4 pt-4">
          <button 
            onClick={handleConfirm}
            className="flex items-center justify-center space-x-3 w-full py-4 bg-brand-black text-white rounded-2xl hover:bg-red-600 transition-all duration-500 shadow-xl group"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Confirm Logout</span>
          </button>
          
          <button 
            onClick={handleCancel}
            className="flex items-center justify-center space-x-3 w-full py-4 bg-white border border-gray-100 text-brand-black rounded-2xl hover:border-brand-gold/30 hover:luxury-shadow transition-all duration-500 group"
          >
            <X className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Stay Signed In</span>
          </button>
        </div>

        <div className="pt-4">
          <button 
            onClick={() => navigate('/')} 
            className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-brand-black transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Return to Gallery</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LogoutConfirm;
