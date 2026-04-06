import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const Footer: React.FC = () => {
  const { config } = useAdmin();

  return (
    <footer className="bg-brand-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link to="/" className="text-3xl font-serif tracking-widest uppercase">
            {config.logoText || 'Atelier'}
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            {config.footerDescription || 'A premium fashion house crafting elevated essentials and signature pieces for the modern wardrobe.'}
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-brand-gold transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-brand-gold transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-brand-gold transition-colors"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-serif mb-6 uppercase tracking-widest text-brand-gold">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/shop?category=Men" className="hover:text-white transition-colors">Men</Link></li>
            <li><Link to="/shop?category=Women" className="hover:text-white transition-colors">Women</Link></li>
            <li><Link to="/shop?category=Kids" className="hover:text-white transition-colors">Kids</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-serif mb-6 uppercase tracking-widest text-brand-gold">Company</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-serif mb-6 uppercase tracking-widest text-brand-gold">Support</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link to="/returns" className="hover:text-white transition-colors">Returns</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
            <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping</Link></li>
          </ul>
          {config.contactEmail && (
            <p className="mt-6 text-xs text-gray-500">{config.contactEmail}</p>
          )}
          {config.contactPhone && (
            <p className="text-xs text-gray-500">{config.contactPhone}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-gray-800 text-center text-xs text-gray-500 uppercase tracking-widest">
        {config.footerText || `© ${new Date().getFullYear()} Atelier. All Rights Reserved.`}
      </div>
    </footer>
  );
};

export default Footer;