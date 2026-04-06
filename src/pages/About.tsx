import React from 'react';
import { motion } from 'motion/react';
import { useAdmin } from '../context/AdminContext';
import story1 from '../assets/story1.png';
import story2 from '../assets/story2.png';

const About: React.FC = () => {
  const { config } = useAdmin();

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Hero */}
        <div className="text-center mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-brand-gold uppercase tracking-[0.3em] text-xs mb-6 font-medium"
          >
            {config.aboutSince || 'Since 1994'}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif mb-10 leading-tight uppercase tracking-widest"
          >
            {config.aboutTitle || 'Our Story'}
          </motion.h1>
          <div className="w-24 h-0.5 bg-brand-gold mx-auto" />
        </div>

        {/* Section 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-[4/5] overflow-hidden luxury-border"
          >
            <img src={story2} alt="Crafted with Passion" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="text-4xl font-serif leading-tight">
              {config.aboutSection1Heading || 'Crafted with Passion and Precision'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {config.aboutSection1Para1 || "Atelier was born out of a desire to redefine luxury for the modern woman. Founded in the heart of Milan, our journey began with a single vision: to create pieces that are not just accessories, but extensions of a woman's personality."}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {config.aboutSection1Para2 || 'Every Atelier design is a testament to the art of Italian craftsmanship. We source only the finest leathers from sustainable tanneries and work with master artisans who have dedicated their lives to the craft.'}
            </p>
            <div className="pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-px bg-brand-gold" />
                <span className="text-xs uppercase tracking-widest font-medium">Sustainable Luxury</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-px bg-brand-gold" />
                <span className="text-xs uppercase tracking-widest font-medium">Ethical Production</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:order-2 aspect-[4/5] overflow-hidden luxury-border"
          >
            <img src={story1} alt="Design Philosophy" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:order-1 space-y-10"
          >
            <h2 className="text-4xl font-serif leading-tight">
              {config.aboutSection2Heading || 'The Atelier Aesthetic'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {config.aboutSection2Para1 || "Our design philosophy is rooted in minimalism. We believe that true elegance lies in simplicity. By stripping away the unnecessary, we highlight the beauty of form, the quality of materials, and the precision of every stitch."}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {config.aboutSection2Para2 || "Whether it's a structured tote for the boardroom or a delicate clutch for an evening gala, an Atelier piece is designed to be timeless. We don't follow trends; we create pieces that will be cherished for generations."}
            </p>
            <div className="grid grid-cols-2 gap-10 pt-10 border-t border-brand-beige">
              <div>
                <h4 className="text-3xl font-serif text-brand-gold mb-2">{config.aboutYears || '30+'}</h4>
                <p className="text-[10px] uppercase tracking-widest text-gray-500">Years of Heritage</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif text-brand-gold mb-2">{config.aboutClients || '150k'}</h4>
                <p className="text-[10px] uppercase tracking-widest text-gray-500">Happy Clients</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Vision Section */}
        <section className="py-24 bg-brand-beige/20 luxury-border text-center px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif mb-10 leading-tight">Our Vision for the Future</h2>
            <p className="text-gray-600 leading-relaxed mb-12 italic">
              "{config.aboutVisionQuote || 'To inspire confidence and elegance in every woman, while leading the way in sustainable luxury craftsmanship.'}"
            </p>
            <div className="flex items-center justify-center space-x-10">
              <img src="https://picsum.photos/seed/sig/200/100" alt="Signature" className="h-12 opacity-50 grayscale" referrerPolicy="no-referrer" />
              <div className="text-left">
                <p className="text-sm font-serif">{config.aboutFounderName || 'Alessandra Moretti'}</p>
                <p className="text-[10px] uppercase tracking-widest text-brand-gold">
                  {config.aboutFounderTitle || 'Founder & Creative Director'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 