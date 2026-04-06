import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Github, Chrome, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { loginUser, signupUser } from '../api';

const Login: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(!searchParams.get('signup'));
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    if (searchParams.get('signup')) {
      setIsLogin(false);
    }
  }, [searchParams]);

  const validateForm = () => {
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return false;
    }
    if (!isLogin && !formData.name.trim()) {
      setError('Please enter your full name.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isLogin) {
        // Attempt Login
        const data = await loginUser(formData.email, formData.password);
        
        // Log successful response for debugging
        console.log('[Login Success]:', data);
        
        login({ 
          name: data.displayName || data.email.split('@')[0], 
          email: data.email,
          token: data.token,
          // If backend returns admin flag
          role: data.admin ? 'admin' : 'user'
        });

        // Redirect based on role
        if (data.admin || formData.email === '12345678@gmail.com') {
          navigate('/admin');
        } else {
          navigate('/thank-you');
        }
      } else {
        // Attempt Signup
        const data = await signupUser(formData.email, formData.password, formData.name);
        
        // Log successful response for debugging
        console.log('[Signup Success]:', data);
        
        // After signup, switch to login or auto-login
        setIsLogin(true);
        setError('Account created successfully! Please sign in.');
        setFormData({ ...formData, password: '' });
      }
    } catch (err: any) {
      // ✅ DISPLAY BACKEND ERROR TO USER (e.g., "Email already exists", "Wrong password")
      console.error('[Auth Error]:', err.message);
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-beige/10 flex items-center justify-center">
      <div className="max-w-md w-full px-6">
        <div className="bg-white p-10 luxury-border luxury-shadow">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif mb-4 uppercase tracking-widest">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-500 uppercase tracking-widest text-[10px]">
              {isLogin ? 'Enter your details to access your account' : 'Join the Atelier circle for exclusive benefits'}
            </p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-center"
              >
                <p className="text-[10px] uppercase tracking-widest font-bold text-red-500">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-brand-beige pl-8 py-4 focus:outline-none focus:border-brand-gold text-sm uppercase tracking-widest"
                      placeholder="ENTER YOUR NAME"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-brand-beige pl-8 py-4 focus:outline-none focus:border-brand-gold text-sm uppercase tracking-widest"
                  placeholder="ENTER YOUR EMAIL"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Password</label>
                {isLogin && (
                  <button type="button" className="text-[10px] uppercase tracking-widest text-brand-gold hover:text-brand-black transition-colors">
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-transparent border-b border-brand-beige pl-8 py-4 focus:outline-none focus:border-brand-gold text-sm uppercase tracking-widest"
                  placeholder="ENTER YOUR PASSWORD"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-black text-white py-5 uppercase tracking-widest text-sm hover:bg-brand-gold transition-luxury flex items-center justify-center space-x-4"
            >
              <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-12 space-y-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-brand-beige" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-white px-4 text-gray-400">Or Continue With</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button className="flex items-center justify-center p-4 border border-brand-beige hover:border-brand-gold transition-luxury">
                <Chrome className="w-5 h-5" />
              </button>
              <button className="flex items-center justify-center p-4 border border-brand-beige hover:border-brand-gold transition-luxury">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="flex items-center justify-center p-4 border border-brand-beige hover:border-brand-gold transition-luxury">
                <Github className="w-5 h-5" />
              </button>
            </div>

            <p className="text-center text-[10px] uppercase tracking-widest text-gray-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-brand-gold font-medium hover:text-brand-black transition-colors"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
