import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);

  const fallbackVariants = product.images.map((image, index) => ({
    label: index === 0 ? product.color : `Variant ${index + 1}`,
    color: index === 0 ? product.color : '#CBD5E1',
    image,
  }));

  const variants = product.variants?.length ? product.variants : fallbackVariants;
  const [activeVariant, setActiveVariant] = useState(variants[0]);
  const [currentImage, setCurrentImage] = useState(activeVariant.image);

  useEffect(() => {
    setCurrentImage(activeVariant.image);
  }, [activeVariant]);

  const activeVariantIndex = variants.findIndex((variant) => variant.label === activeVariant.label);
  const hoverVariant = variants[(activeVariantIndex + 1) % variants.length] || activeVariant;
  const displayImage = isHovered
    ? activeVariant.fullImage ?? hoverVariant.image
    : currentImage;
  const imageFitClass = isHovered && activeVariant.fullImage ? 'object-contain' : 'object-cover';

  const badgeItems = [
    product.stock && product.stock <= 3 ? `Only ${product.stock} left` : null,
    product.viewers ? `${product.viewers} people are viewing` : null,
    product.featured ? 'Trending' : product.rating >= 4.8 ? 'Best Seller' : null,
  ].filter(Boolean) as string[];

  const isOutOfStock = product.stock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-1 ${isOutOfStock ? 'opacity-90 grayscale-[0.5]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-[32px] bg-slate-50 product-spin-container">
        <motion.img
          src={displayImage}
          alt={product.name}
          className={`h-[420px] w-full ${imageFitClass}`}
          animate={isHovered && !isOutOfStock ? { rotateY: 360 } : { rotateY: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ transformStyle: 'preserve-3d' }}
          referrerPolicy="no-referrer"
        />

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px] z-10">
            <div className="bg-white px-8 py-3 rounded-full shadow-2xl transform -rotate-12 border-2 border-slate-950">
               <p className="text-sm font-bold uppercase tracking-[0.4em] text-slate-950">Sold Out</p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/10 via-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {isOutOfStock ? (
            <span className="rounded-full bg-rose-500 px-4 py-1.5 text-[10px] uppercase tracking-[0.35em] text-white shadow-lg backdrop-blur-sm">
              Out of Stock
            </span>
          ) : (
            badgeItems.slice(0, 2).map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-slate-900 shadow-sm backdrop-blur-sm opacity-0 translate-y-2 transition duration-300 group-hover:opacity-100 group-hover:translate-y-0"
              >
                {badge}
              </span>
            ))
          )}
        </div>

        <div className="absolute inset-x-4 bottom-4 opacity-0 translate-y-6 transition duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] bg-white/85 px-4 py-3 backdrop-blur-sm shadow-lg">
            <button
              disabled={isOutOfStock}
              onClick={() => addToCart(product, 1, product.sizes?.[0])}
              className={`flex-1 rounded-full px-4 py-3 text-sm uppercase tracking-[0.35em] transition ${isOutOfStock ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-slate-950 text-white hover:bg-slate-800'}`}
            >
              {isOutOfStock ? 'Unavailable' : 'Add to Cart'}
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition hover:bg-slate-100"
              aria-label="Add to wishlist"
            >
              <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-slate-900' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{product.category}</p>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-slate-600">
            {product.type}
          </span>
        </div>

        <div className="mb-4">
          <Link to={`/product/${product.id}`} className="text-lg font-serif text-slate-950 hover:text-slate-700 transition">
            {product.name}
          </Link>
          <p className="mt-3 text-xl font-semibold text-slate-950">${product.price.toLocaleString()}</p>
        </div>

        <div className="mb-4 hidden items-center gap-2 sm:flex">
          {variants.map((variant) => (
            <button
              key={variant.label}
              type="button"
              onMouseEnter={() => !isOutOfStock && setActiveVariant(variant)}
              className={`h-9 w-9 rounded-full border transition ${activeVariant.label === variant.label ? 'border-slate-950 ring-2 ring-slate-950' : 'border-slate-200'}`}
              style={{ backgroundColor: variant.color }}
              aria-label={`View ${variant.label} variant`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            disabled={isOutOfStock}
            onClick={() => addToCart(product, 1, product.sizes?.[0])}
            className={`flex-1 rounded-full border px-5 py-3 text-sm uppercase tracking-[0.35em] transition ${isOutOfStock ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-950 border-slate-900 text-white hover:bg-slate-800'}`}
          >
            {isOutOfStock ? 'Out of Stock' : 'Quick Add'}
          </button>
          <Link
            to={`/product/${product.id}`}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition hover:bg-slate-100"
            aria-label="Quick view"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
