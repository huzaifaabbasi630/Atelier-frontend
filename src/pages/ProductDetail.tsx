import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { addRecentlyViewedId } from '../utils/recentlyViewed';
import { Heart, ShoppingBag, Star, ChevronLeft, ChevronRight, Box, Camera, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import Product3DModal from '../components/Product3DModal';
import ProductARButton from '../components/ProductARButton';
import { motion, AnimatePresence } from 'motion/react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products: adminProducts } = useAdmin();
  const sourceProducts = adminProducts.length ? adminProducts : products;
  const product = sourceProducts.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [viewerMode, setViewerMode] = useState<'3d' | 'ar' | null>(null);
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 200, y: 200 });

  const handleZoomMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;
    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
    setQuantity(1);
  }, [id]);

  useEffect(() => {
    if (product?.sizes?.length) {
      setSelectedSize(product.sizes[0]);
    }
    if (product) {
      const initialColor = product.variants?.[0]?.label ?? product.color;
      setSelectedColor(initialColor);
      if (product.variants?.length) {
        const variantIndex = product.variants.findIndex((variant) => variant.label === initialColor);
        setActiveImage(variantIndex >= 0 ? variantIndex : 0);
      }
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      addRecentlyViewedId(product.id);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h1 className="text-3xl font-serif mb-6">Product not found</h1>
        <Link to="/shop" className="text-sm uppercase tracking-widest border-b border-slate-900 pb-1 hover:text-slate-900 transition-colors">
          Back to Shop
        </Link>
      </div>
    );
  }

  const relatedProducts = sourceProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + (product.deliveryDays ?? 4));

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-slate-500 mb-12">
          <Link to="/" className="hover:text-slate-900 transition">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-slate-900 transition">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-slate-900 transition">{product.category}</Link>
          <span>/</span>
          <span className="text-slate-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 md:gap-6 lg:grid-cols-[90px_minmax(0,1fr)] lg:items-start">
            <div className="flex gap-3 md:gap-4 overflow-x-auto lg:flex-col lg:overflow-y-auto scrollbar-hide pb-2 lg:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`flex-shrink-0 w-20 h-24 md:w-20 md:h-26 overflow-hidden rounded-[20px] border ${activeImage === idx ? 'border-slate-900 ring-2 ring-slate-900' : 'border-slate-200'} bg-slate-50 transition`}
                >
                  <img src={img} alt={`${product.name} ${idx}`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

            <div
              className="relative overflow-hidden rounded-[32px] bg-slate-100"
              onMouseEnter={() => setIsZooming(true)}
              onMouseMove={handleZoomMove}
              onMouseLeave={() => setIsZooming(false)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={product.images[activeImage]}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out"
                  style={{
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transform: isZooming ? 'scale(1.25)' : 'scale(1)',
                  }}
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 transition-opacity duration-300 hover:opacity-100">
                <button
                  onClick={() => setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="rounded-full bg-white p-3 shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="rounded-full bg-white p-3 shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-4">{product.type || product.category}</p>
              <h1 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">{product.name}</h1>
              <div className="flex flex-wrap items-center gap-6">
                <p className="text-3xl font-semibold text-slate-900">${product.price.toLocaleString()}</p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${index < Math.round(product.rating) ? 'fill-brand-gold text-brand-gold' : 'text-slate-200'}`}
                    />
                  ))}
                  <span className="uppercase tracking-[0.35em]">{product.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-600 max-w-2xl">{product.description}</p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Only left in stock</p>
                <p className="mt-3 text-lg font-semibold text-slate-900">{product.stock ?? 8} items remaining</p>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Live viewers</p>
                <p className="mt-3 text-lg font-semibold text-slate-900">{product.viewers ?? 12} people are viewing this product</p>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 sm:col-span-2">
                <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Estimated delivery</p>
                <p className="mt-3 text-lg font-semibold text-slate-900">Arrives by {deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4 relative">
                <div className="flex items-center gap-4 rounded-full border border-slate-200 bg-slate-50 px-4 py-3">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="text-xl text-slate-900" disabled={product.stock !== undefined && Number(product.stock) <= 0}>-</button>
                  <span className="min-w-[36px] text-center text-sm font-medium">{quantity}</span>
                  <button onClick={() => setQuantity((q) => q + 1)} className="text-xl text-slate-900" disabled={product.stock !== undefined && Number(product.stock) <= 0}>+</button>
                </div>
                
                <div className="relative group/cart">
                  <button
                    disabled={product.stock !== undefined && Number(product.stock) <= 0}
                    onClick={() => addToCart(product, quantity, selectedSize, selectedColor)}
                    className={`inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm uppercase tracking-[0.35em] transition ${product.stock !== undefined && Number(product.stock) <= 0 ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {product.stock !== undefined && Number(product.stock) <= 0 ? 'Sold Out' : 'Add to Cart'}
                  </button>

                  {(product.stock !== undefined && Number(product.stock) <= 0) && (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
                      animate={{ scale: 1, opacity: 1, rotate: -15 }}
                      className="absolute -top-4 -right-4 bg-rose-600 text-white px-4 py-1 rounded-lg shadow-xl border-2 border-white z-20 pointer-events-none"
                    >
                      <p className="text-[10px] font-black uppercase tracking-[0.2em]">Out of Stock</p>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => setIs3DModalOpen(true)}
                  className="rounded-full border border-slate-200 px-6 py-4 text-sm uppercase tracking-[0.35em] text-slate-700 transition hover:bg-slate-100 flex items-center justify-center gap-3 shadow-sm bg-white"
                >
                  <Box className="w-4 h-4 text-brand-gold" />
                  View in 3D
                </button>
                <ProductARButton modelUrl={product.model3D} productName={product.name} />
              </div>

              <button
                onClick={() => toggleWishlist(product)}
                className={`w-full rounded-full py-4 text-sm uppercase tracking-[0.35em] transition ${isInWishlist(product.id) ? 'bg-brand-pink text-white' : 'border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white'}`}
              >
                <span className="inline-flex items-center justify-center gap-3">
                  <Heart className="w-4 h-4" />
                  {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
                </span>
              </button>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-sm uppercase tracking-[0.35em] text-slate-500 mb-4">Choose size</h2>
              <div className="flex flex-wrap gap-3">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-full px-4 py-3 text-xs uppercase tracking-[0.35em] transition ${selectedSize === size ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            {product.variants?.length ? (
              <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-sm uppercase tracking-[0.35em] text-slate-500 mb-4">Choose color</h2>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.label}
                      type="button"
                      onClick={() => {
                        setSelectedColor(variant.label);
                        const variantIndex = product.variants!.findIndex((v) => v.label === variant.label);
                        setActiveImage(variantIndex >= 0 ? variantIndex : 0);
                      }}
                      className={`flex items-center gap-3 rounded-full px-4 py-3 text-xs uppercase tracking-[0.35em] transition ${selectedColor === variant.label ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'}`}
                    >
                      <span className="h-3 w-3 rounded-full border border-slate-200" style={{ backgroundColor: variant.color }} />
                      {variant.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <section className="mt-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between mb-10">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500 mb-3">Reviews</p>
              <h2 className="text-3xl font-serif">What buyers are saying</h2>
            </div>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-xs uppercase tracking-[0.35em] text-slate-600">
              Verified buyer reviews
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div key={review.id} className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_40px_-24px_rgba(15,23,42,0.15)]">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{review.user}</h3>
                      <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Verified Buyer</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${index < review.rating ? 'fill-brand-gold text-brand-gold' : 'text-slate-200'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600 mb-4">"{review.comment}"</p>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400">{review.date}</p>
                </div>
              ))
            ) : (
              <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center text-slate-600">
                No reviews yet. Be the first to share your experience.
              </div>
            )}
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif mb-4 uppercase tracking-[0.35em]">You may also like</h2>
              <div className="mx-auto h-0.5 w-20 bg-brand-gold" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </section>
        )}
      </div>

      <AnimatePresence>
        {viewerMode && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-2xl rounded-[32px] bg-white p-10 shadow-2xl"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{viewerMode === '3d' ? '3D Viewer' : 'AR Preview'}</p>
                  <h3 className="text-2xl font-serif text-slate-900">{viewerMode === '3d' ? 'Explore the product in 3D' : 'Visualize it in your space'}</h3>
                </div>
                <button onClick={() => setViewerMode(null)} className="text-slate-500 hover:text-slate-900">Close</button>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-slate-100 p-14 text-center text-slate-500">
                {viewerMode === '3d'
                  ? '3D product viewer placeholder — imagine a high-fidelity 3D model here.'
                  : 'AR camera preview placeholder — visualize the product in your room.'}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Product3DModal 
        isOpen={is3DModalOpen} 
        onClose={() => setIs3DModalOpen(false)} 
        productName={product.name}
        modelUrl={product.model3D}
      />
    </div>
  );
};

export default ProductDetail;
