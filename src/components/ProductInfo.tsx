import React from 'react';
import { Product } from '../types';
import { ShoppingBag } from 'lucide-react';

interface ProductInfoProps {
  product: Product;
  selectedSize: string;
  onSelectSize: (size: string) => void;
  onAddToCart: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, selectedSize, onSelectSize, onAddToCart }) => {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{product.category} · {product.type}</p>
        <h1 className="mt-4 text-4xl font-serif text-slate-950 leading-tight">{product.name}</h1>
        <p className="mt-6 text-3xl font-semibold text-slate-900">${product.price.toLocaleString()}</p>
      </div>

      <p className="text-sm leading-relaxed text-slate-600">{product.description}</p>

      {product.sizes && (
        <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-4">Select Size</p>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => onSelectSize(size)}
                className={`rounded-full border px-4 py-3 text-xs uppercase tracking-[0.35em] transition ${selectedSize === size ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onAddToCart}
        className="inline-flex items-center gap-3 rounded-full bg-slate-950 px-6 py-4 text-sm uppercase tracking-[0.35em] text-white transition hover:bg-slate-800"
      >
        <ShoppingBag className="w-4 h-4" />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductInfo;
