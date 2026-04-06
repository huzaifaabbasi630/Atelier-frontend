import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, Search, X } from 'lucide-react';
import { products } from '../data/products';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { useAdmin } from '../context/AdminContext';
import { motion, AnimatePresence } from 'motion/react';

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(window.innerWidth > 1024);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsFilterOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeCategory = searchParams.get('category') || 'All';
  const selectedType = searchParams.get('type') || 'All';
  const minPrice = Number(searchParams.get('min')) || 0;
  const maxPrice = Number(searchParams.get('max')) || 5000;
  const searchTerm = searchParams.get('search') || '';

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const categoryOptions = ['All', 'Men', 'Women', 'Kids'] as const;
  const subcategoryMap: Record<string, Array<{ label: string; value: string }>> = {
    Men: [
      { label: 'All', value: 'All' },
      { label: 'Shirts', value: 'Shirt' },
      { label: 'Pants', value: 'Pants' },
      { label: 'Shoes', value: 'Shoes' },
      { label: 'Hoodies', value: 'Hoodies' },
    ],
    Women: [
      { label: 'All', value: 'All' },
      { label: 'Dresses', value: 'Dress' },
      { label: 'Tops', value: 'Top' },
      { label: 'Pants', value: 'Pants' },
    ],
    Kids: [
      { label: 'All', value: 'All' },
      { label: 'Boys Wear', value: 'Boys Wear' },
      { label: 'Girls Wear', value: 'Girls Wear' },
    ],
  };

  const { products: adminProducts } = useAdmin();
  const sourceProducts = adminProducts.length ? adminProducts : products;
  const allProductTypes = Array.from(new Set(sourceProducts.map((product) => product.type).filter(Boolean))) as string[];

  const normalizeSearchToken = (token: string) => {
    const normalized = token.trim().toLowerCase();
    if (normalized === 'sari') return 'saree';
    if (normalized === 'shirts') return 'shirt';
    if (normalized === 'dresses') return 'dress';
    return normalized.endsWith('s') ? normalized.slice(0, -1) : normalized;
  };

  const searchMatches = (product: Product, query: string) => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return true;
    const searchableFields = [
      product.name,
      product.category,
      product.type,
      product.color,
      ...(product.variants?.map((variant) => variant.label) ?? []),
    ]
      .filter(Boolean)
      .map((field) => field!.toLowerCase());

    if (searchableFields.some((field) => field.includes(normalizedQuery))) {
      return true;
    }

    const tokens = normalizedQuery
      .split(/\W+/)
      .filter(Boolean)
      .map(normalizeSearchToken);

    return tokens.every((token) =>
      searchableFields.some((field) => field.includes(token))
    );
  };

  const availableSubcategories =
    activeCategory === 'All'
      ? [{ label: 'All', value: 'All' }, ...allProductTypes.map((type) => ({ label: type, value: type }))]
      : subcategoryMap[activeCategory] || [{ label: 'All', value: 'All' }];

  useEffect(() => {
    setSearchQuery(searchTerm);
  }, [searchTerm]);

  const filteredProducts = useMemo(() => {
    return sourceProducts
      .filter((product) => {
        const categoryMatch = activeCategory === 'All' || product.category === activeCategory;
        const typeMatch = selectedType === 'All' || product.type === selectedType;
        const priceMatch = product.price >= minPrice && product.price <= maxPrice;
        const sizeMatch =
          selectedSizes.length === 0 ||
          (product.sizes?.some((size) => selectedSizes.includes(size)) ?? true);
        const searchMatch = searchQuery ? searchMatches(product, searchQuery) : true;
        return categoryMatch && typeMatch && priceMatch && sizeMatch && searchMatch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
      });
  }, [activeCategory, selectedType, minPrice, maxPrice, selectedSizes, searchQuery, sortBy]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'All' || !value) {
      newParams.delete(key);
      if (key === 'category') {
        newParams.delete('type');
      }
    } else {
      newParams.set(key, value);
      if (key === 'category') {
        newParams.delete('type');
      }
    }
    setSearchParams(newParams);
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((current) =>
      current.includes(size) ? current.filter((item) => item !== size) : [...current, size]
    );
  };

  useEffect(() => {
    if (selectedType !== 'All') {
      const validTypes = activeCategory === 'All'
        ? allProductTypes
        : subcategoryMap[activeCategory]?.map((item) => item.value) || [];
      if (!validTypes.includes(selectedType)) {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('type');
        setSearchParams(newParams);
      }
    }
  }, [activeCategory, selectedType, searchParams, allProductTypes]);

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setSearchQuery('');
    setSelectedSizes([]);
    setSortBy('featured');
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500 mb-4">{activeCategory !== 'All' ? `${activeCategory} Collection` : 'All Collections'}</p>
          <h1 className="text-5xl font-serif mb-4 uppercase tracking-widest">Shop Atelier</h1>
          <p className="text-slate-500 uppercase tracking-[0.35em] text-xs">Handpicked styles for refined wardrobes</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-12 gap-6 border-y border-slate-200 py-6">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsFilterOpen((prev) => !prev)}
              className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-slate-600 hover:text-slate-900 transition"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <div className="relative w-full max-w-[320px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Atelier..."
                className="w-full rounded-full border border-slate-200 bg-slate-50 px-10 py-3 text-xs uppercase tracking-[0.25em] text-slate-700 outline-none focus:border-slate-900"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-xs uppercase tracking-[0.35em] text-slate-400">{filteredProducts.length} Products</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-full border border-slate-200 bg-white px-4 py-3 text-xs uppercase tracking-[0.35em] text-slate-700 outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price low to high</option>
                <option value="price-high">Price high to low</option>
                <option value="rating">Top rated</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 relative">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden w-full flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-4 text-xs uppercase tracking-[0.35em] text-slate-700 shadow-sm"
          >
            <Filter className="w-4 h-4" />
            Show Filters
          </button>

          <AnimatePresence>
            {isFilterOpen && (
              <>
                {/* Mobile Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsFilterOpen(false)}
                  className="fixed inset-0 z-[60] bg-slate-950/60 backdrop-blur-sm lg:hidden"
                />
                
                <motion.aside
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 left-0 z-[70] w-[85%] max-w-[320px] bg-white p-8 shadow-2xl lg:relative lg:inset-auto lg:z-0 lg:w-[300px] lg:translate-x-0 lg:bg-transparent lg:p-0 lg:shadow-none overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-8 lg:hidden">
                    <h3 className="text-xl font-serif uppercase tracking-widest text-slate-900">Filters</h3>
                    <button onClick={() => setIsFilterOpen(false)} className="p-2 rounded-full bg-slate-50 border border-slate-100">
                      <X className="w-5 h-5 text-slate-500" />
                    </button>
                  </div>
                <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6">
                  <h4 className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-5">Category</h4>
                  <div className="flex flex-wrap gap-3">
                    {categoryOptions.map((category) => (
                      <button
                        key={category}
                        onClick={() => updateFilter('category', category)}
                        className={`rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.35em] transition ${activeCategory === category ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'}`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6">
                  <h4 className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-5">Subcategory</h4>
                  <div className="flex flex-wrap gap-3">
                    {availableSubcategories.map((subcategory) => (
                      <button
                        key={subcategory.value}
                        onClick={() => updateFilter('type', subcategory.value)}
                        className={`rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.35em] transition ${selectedType === subcategory.value ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'}`}
                      >
                        {subcategory.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6">
                  <h4 className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-5">Size</h4>
                  <div className="flex flex-wrap gap-3">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.35em] transition ${selectedSizes.includes(size) ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6">
                  <h4 className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-5">Price Range</h4>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={maxPrice}
                    onChange={(e) => updateFilter('max', e.target.value)}
                    className="w-full h-1 cursor-pointer appearance-none rounded-full bg-slate-200 accent-slate-900"
                  />
                  <div className="mt-4 flex justify-between text-xs uppercase tracking-[0.35em] text-slate-500">
                    <span>$0</span>
                    <span>Up to ${maxPrice}</span>
                  </div>
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full rounded-full border border-slate-900 bg-slate-900 px-5 py-3 text-xs uppercase tracking-[0.35em] text-white transition hover:bg-slate-800"
                >
                  Clear filters
                </button>
              </motion.aside>
             </>
            )}
          </AnimatePresence>

          <main className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32">
                <p className="text-lg font-serif mb-6">No results found for your search.</p>
                <button
                  onClick={clearFilters}
                  className="text-sm uppercase tracking-[0.35em] border-b border-slate-900 pb-1 transition hover:text-slate-900"
                >
                  Reset filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;
