import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-beige/10 flex items-center justify-center">
      <div className="max-w-3xl w-full px-6 text-center">
        <p className="text-brand-gold uppercase tracking-widest text-sm mb-6">404</p>
        <h1 className="text-5xl font-serif uppercase tracking-widest mb-6">Page Not Found</h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-10">
          The page you are looking for doesn’t exist or may have been moved. Return to the Atelier collections and continue exploring.
        </p>
        <Link
          to="/"
          className="inline-block px-10 py-4 bg-brand-black text-white uppercase tracking-widest text-sm hover:bg-brand-gold transition-colors"
        >
          Back to Atelier
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
