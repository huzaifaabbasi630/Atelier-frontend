import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useAdmin } from '../context/AdminContext';

const Wishlist: React.FC = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { config } = useAdmin();

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500 mb-4">
            {config.wishlistTagline || 'Your Wishlist'}
          </p>
          <h1 className="text-5xl font-serif uppercase tracking-widest">
            {config.wishlistTitle || 'Saved Favorites'}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-base text-slate-600 font-sans">
            {config.wishlistDescription || "Review items you've saved for later and manage your curated selection."}
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-24 rounded-[32px] border border-slate-200 bg-slate-50">
            <Heart className="mx-auto mb-6 h-12 w-12 text-slate-400" />
            <p className="text-xl font-serif mb-4">{config.wishlistEmptyMsg || 'Your wishlist is empty'}</p>
            <p className="text-slate-600 mb-8">Add items to your wishlist and they will appear here.</p>
            <Link
              to="/shop"
              className="inline-flex rounded-full bg-slate-950 px-8 py-4 text-sm uppercase tracking-[0.35em] text-white transition hover:bg-slate-800"
            >
              {config.wishlistShopBtn || 'Continue Shopping'}
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {wishlist.map(item => (
              <div key={item.id} className="grid gap-6 lg:grid-cols-[230px_1fr_auto] items-center rounded-[32px] border border-slate-200 bg-slate-50 p-6">
                <div className="h-56 overflow-hidden rounded-[28px] bg-white">
                  <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-2">{item.category}</p>
                  <h2 className="text-2xl font-serif text-slate-900 mb-3">{item.name}</h2>
                  <p className="text-sm text-slate-600 mb-3">{item.description}</p>
                  <p className="text-base font-semibold text-slate-900">${item.price.toLocaleString()}</p>
                </div>
                <div className="space-y-3 text-right">
                  <Link to={`/product/${item.id}`}
                    className="inline-flex rounded-full border border-slate-200 bg-white px-5 py-3 text-sm uppercase tracking-[0.35em] text-slate-900 transition hover:bg-slate-100">
                    View
                  </Link>
                  <button onClick={() => toggleWishlist(item)}
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm uppercase tracking-[0.35em] text-slate-900 transition hover:bg-slate-100">
                    <Trash2 className="w-4 h-4 mr-2" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;