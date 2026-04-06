import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { useAdmin } from '../context/AdminContext';

const Contact: React.FC = () => {
  const { config } = useAdmin();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif mb-10 leading-tight uppercase tracking-widest"
          >
            {config.contactPageTitle || 'Contact Us'}
          </motion.h1>
          <div className="w-24 h-0.5 bg-brand-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <h2 className="text-3xl font-serif leading-tight">We'd Love to Hear from You</h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                Whether you have a question about our collections, need assistance with an order, or simply want to share your feedback, our team is here to help.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="p-4 bg-brand-beige/30 luxury-border">
                  <MapPin className="w-6 h-6 text-brand-gold" />
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-widest font-medium mb-2">Our Boutique</h4>
                  <p className="text-gray-500 text-sm">{config.contactAddress || '123 Luxury Ave, Milan, Italy'}</p>
                  <p className="text-gray-500 text-sm">{config.contactHours || 'Mon - Sat: 10:00 AM - 8:00 PM'}</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="p-4 bg-brand-beige/30 luxury-border">
                  <Phone className="w-6 h-6 text-brand-gold" />
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-widest font-medium mb-2">Call Us</h4>
                  <p className="text-gray-500 text-sm">{config.contactPhone || '+39 02 1234 5678'}</p>
                  <p className="text-gray-500 text-sm">Customer Support: 24/7</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="p-4 bg-brand-beige/30 luxury-border">
                  <Mail className="w-6 h-6 text-brand-gold" />
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-widest font-medium mb-2">Email Us</h4>
                  <p className="text-gray-500 text-sm">{config.contactEmail || 'contact@atelierfashion.com'}</p>
                  <p className="text-gray-500 text-sm">{config.contactSupportEmail || 'support@atelierfashion.com'}</p>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-brand-beige">
              <h4 className="text-xs uppercase tracking-widest font-medium mb-6">Follow Our Journey</h4>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-brand-gold transition-colors"><Instagram className="w-6 h-6" /></a>
                <a href="#" className="hover:text-brand-gold transition-colors"><Facebook className="w-6 h-6" /></a>
                <a href="#" className="hover:text-brand-gold transition-colors"><Twitter className="w-6 h-6" /></a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-brand-beige/10 p-10 luxury-border"
          >
            <h3 className="text-2xl font-serif mb-10 uppercase tracking-widest">
              {config.contactFormHeading || 'Send a Message'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Full Name</label>
                <input type="text" required value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-brand-beige py-4 focus:outline-none focus:border-brand-gold text-sm uppercase tracking-widest"
                  placeholder="ENTER YOUR NAME" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Email Address</label>
                <input type="email" required value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-brand-beige py-4 focus:outline-none focus:border-brand-gold text-sm uppercase tracking-widest"
                  placeholder="ENTER YOUR EMAIL" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Your Message</label>
                <textarea required rows={4} value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-brand-beige py-4 focus:outline-none focus:border-brand-gold text-sm uppercase tracking-widest resize-none"
                  placeholder="HOW CAN WE HELP YOU?" />
              </div>
              <button type="submit"
                className="w-full bg-brand-black text-white py-5 uppercase tracking-widest text-sm hover:bg-brand-gold transition-luxury flex items-center justify-center space-x-4">
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
              {isSubmitted && (
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="text-center text-brand-gold text-xs uppercase tracking-widest mt-6 font-medium">
                  Thank you! Your message has been sent.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>

        {/* Map */}
        <section className="mt-32">
          <div className="aspect-[21/9] w-full bg-brand-beige/30 luxury-border overflow-hidden relative">
            <img src="https://picsum.photos/seed/milan-map/1920/800" alt="Map Location"
              className="w-full h-full object-cover grayscale opacity-50" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white p-10 luxury-shadow text-center">
                <MapPin className="w-10 h-10 text-brand-gold mx-auto mb-4" />
                <h4 className="text-lg font-serif mb-2">{config.contactMapLabel || 'Visit Our Flagship Store'}</h4>
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  {config.contactAddress || '123 Luxury Ave, Milan, Italy'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;