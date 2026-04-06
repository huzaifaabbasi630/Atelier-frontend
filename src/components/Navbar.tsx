import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, Moon, Sun, ChevronDown, ChevronRight, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAdmin } from '../context/AdminContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

const categorySections = [
  {
    title: 'Men',
    items: [
      { label: 'All', value: 'All' },
      { label: 'Shirts', value: 'Shirt' },
      { label: 'Pants', value: 'Pants' },
      { label: 'Shoes', value: 'Shoes' },
      { label: 'Hoodies', value: 'Hoodies' },
    ],
  },
  {
    title: 'Women',
    items: [
      { label: 'All', value: 'All' },
      { label: 'Dresses', value: 'Dress' },
      { label: 'Tops', value: 'Top' },
      { label: 'Pants', value: 'Pants' },
    ],
  },
  {
    title: 'Kids',
    items: [
      { label: 'All', value: 'All' },
      { label: 'Boys Wear', value: 'Boys Wear' },
      { label: 'Girls Wear', value: 'Girls Wear' },
    ],
  },
];

const searchSuggestions = [
  'Men Shirts',
  'Women Saree',
  'Silk dress',
  'Tailored shirt',
  'Leather loafers',
  'Velvet heels',
  'Satin blouse',
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(categorySections[0].title);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { config } = useAdmin();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('atelier-theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
      window.localStorage.setItem('atelier-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-mode');
      window.localStorage.setItem('atelier-theme', 'light');
    }
  }, [darkMode]);

  const filteredSuggestions = searchQuery
    ? searchSuggestions.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  const handleSearchSubmit = (query: string) => {
    setSearchQuery('');
    setIsSuggestionOpen(false);
    setIsMobileMenuOpen(false);
    navigate(`/shop?search=${encodeURIComponent(query)}`);
  };

  const navTheme = darkMode
    ? 'bg-slate-950/95 text-slate-100 border-slate-800'
    : isScrolled
    ? 'bg-white/95 text-slate-950 border-slate-200'
    : 'bg-transparent text-slate-950';

  const inputTheme = darkMode
    ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-400'
    : 'bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-500';

  const mobileDrawerBg = darkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900';
  const mobileBorderColor = darkMode ? 'border-slate-800' : 'border-slate-200';
  const mobileSubBg = darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200';
  const mobileLinkColor = darkMode ? 'text-slate-100' : 'text-slate-900';
  const mobileSubLinkColor = darkMode ? 'text-slate-300 hover:text-slate-100' : 'text-slate-700 hover:text-slate-900';

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 border-b border-transparent transition-all duration-500 backdrop-blur-xl ${navTheme}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-6">

          {/* Left: Hamburger (mobile) + Logo */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 bg-white/90 text-slate-800 shadow-sm transition hover:bg-slate-100 active:scale-95"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link
              to="/"
              className="flex items-center gap-3 text-lg sm:text-xl font-serif tracking-[0.30em] sm:tracking-[0.35em] uppercase text-slate-900"
            >
              {config.logoImage ? (
                <img src={config.logoImage} alt={config.logoText} className="h-7 sm:h-8 w-auto object-contain" referrerPolicy="no-referrer" />
              ) : (
                config.logoText
              )}
            </Link>
          </div>

          {/* Center: Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-10">
            <Link
              to="/"
              className={`text-sm uppercase tracking-[0.35em] transition ${location.pathname === '/' ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`text-sm uppercase tracking-[0.35em] transition ${location.pathname === '/shop' ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Shop
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.35em] text-slate-600 transition hover:text-slate-900">
                Category
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full z-20 mt-4 min-w-[420px] rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.25)]"
                  >
                    <div className="grid grid-cols-[130px_1fr] gap-6">
                      <div className="space-y-2">
                        {categorySections.map(section => (
                          <button
                            key={section.title}
                            type="button"
                            onMouseEnter={() => setHoveredCategory(section.title)}
                            className={`w-full rounded-3xl px-4 py-3 text-left text-sm uppercase tracking-[0.35em] transition ${hoveredCategory === section.title ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                          >
                            {section.title}
                          </button>
                        ))}
                      </div>

                      <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                        <p className="text-[10px] uppercase tracking-[0.45em] text-slate-500 mb-4">{hoveredCategory} Collection</p>
                        <div className="space-y-3">
                          {categorySections
                            .find((section) => section.title === hoveredCategory)
                            ?.items.map((item) => {
                              const link =
                                item.value === 'All'
                                  ? `/shop?category=${hoveredCategory}`
                                  : `/shop?category=${hoveredCategory}&type=${encodeURIComponent(item.value)}`;
                              return (
                                <Link
                                  key={item.value}
                                  to={link}
                                  className="block text-sm text-slate-700 hover:text-slate-900 transition"
                                >
                                  {item.label}
                                </Link>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/about"
              className={`text-sm uppercase tracking-[0.35em] transition ${location.pathname === '/about' ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm uppercase tracking-[0.35em] transition ${location.pathname === '/contact' ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Contact
            </Link>
          </div>

          {/* Search Bar: Desktop only */}
          <div className="hidden xl:flex flex-1 justify-center px-4">
            <div className="w-full max-w-[520px] relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSuggestionOpen(Boolean(e.target.value));
                }}
                onFocus={() => setIsSuggestionOpen(Boolean(searchQuery))}
                onBlur={() => setTimeout(() => setIsSuggestionOpen(false), 150)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    handleSearchSubmit(searchQuery.trim());
                  }
                }}
                placeholder="Search for products..."
                className={`w-full rounded-full border px-14 py-3 text-sm outline-none ${inputTheme} transition focus:ring-2 focus:ring-slate-300`}
              />

              <AnimatePresence>
                {isSuggestionOpen && filteredSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute left-0 right-0 top-full mt-3 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.18)]"
                  >
                    {filteredSuggestions.map(suggestion => (
                      <button
                        key={suggestion}
                        type="button"
                        onMouseDown={() => handleSearchSubmit(suggestion)}
                        className="w-full px-6 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 transition"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <Link
                to="/logout-confirm"
                className="hidden lg:inline-flex items-center justify-center rounded-full border border-red-100 bg-white px-5 py-2 text-sm uppercase tracking-[0.25em] text-red-500 transition hover:border-red-200 hover:bg-red-50 shadow-sm"
              >
                Logout
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden lg:inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2 text-sm uppercase tracking-[0.25em] text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 shadow-sm"
              >
                Login
              </Link>
            )}

            <Link
              to="/cart"
              className="relative rounded-full p-2.5 sm:p-3 bg-slate-100 text-slate-700 transition hover:bg-slate-200 active:scale-95"
              aria-label="View cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-slate-900 text-[10px] text-white px-1.5">
                  {cartCount}
                </span>
              )}
            </Link>

            {wishlist.length > 0 && (
              <Link
                to="/wishlist"
                className="relative rounded-full p-2.5 sm:p-3 bg-slate-100 text-slate-700 transition hover:bg-slate-200 active:scale-95"
                aria-label="View wishlist"
              >
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-pink text-[10px] text-white px-1.5">
                  {wishlist.length}
                </span>
              </Link>
            )}

            <button
              onClick={() => setDarkMode(prev => !prev)}
              className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 active:scale-95"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              key="drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className={`fixed top-0 left-0 z-[70] h-full w-[85vw] max-w-[340px] flex flex-col shadow-2xl lg:hidden ${mobileDrawerBg}`}
            >
              {/* Drawer Header */}
              <div className={`flex items-center justify-between px-6 py-5 border-b ${mobileBorderColor}`}>
                <Link
                  to="/"
                  className="text-lg font-serif tracking-[0.35em] uppercase"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {config.logoImage ? (
                    <img src={config.logoImage} alt={config.logoText} className="h-7 w-auto object-contain" referrerPolicy="no-referrer" />
                  ) : (
                    config.logoText
                  )}
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-9 h-9 flex items-center justify-center rounded-full border ${mobileBorderColor} transition hover:bg-slate-100 active:scale-95`}
                  aria-label="Close mobile menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body — scrollable */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-1">

                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        handleSearchSubmit(searchQuery.trim());
                      }
                    }}
                    placeholder="Search products..."
                    className={`w-full rounded-full border px-12 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-slate-300 ${inputTheme}`}
                  />
                </div>

                {/* Nav Links */}
                {[
                  { label: 'Home', to: '/' },
                  { label: 'Shop', to: '/shop' },
                  { label: 'About', to: '/about' },
                  { label: 'Contact', to: '/contact' },
                ].map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between w-full py-3.5 text-sm uppercase tracking-[0.35em] font-medium border-b ${mobileBorderColor} ${mobileLinkColor} transition hover:pl-1`}
                  >
                    {label}
                    <ChevronRight className="w-4 h-4 opacity-30" />
                  </Link>
                ))}

                {/* Category Accordion */}
                <div className={`border-b ${mobileBorderColor}`}>
                  <button
                    type="button"
                    onClick={() => setMobileCategoryOpen(open => !open)}
                    className={`flex w-full items-center justify-between py-3.5 text-sm uppercase tracking-[0.35em] font-medium ${mobileLinkColor}`}
                  >
                    Category
                    <motion.div animate={{ rotate: mobileCategoryOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {mobileCategoryOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className={`mb-4 rounded-2xl border p-4 space-y-4 ${mobileSubBg}`}>
                          {categorySections.map(section => (
                            <div key={section.title}>
                              <p className="text-[10px] uppercase tracking-[0.45em] text-slate-500 mb-2">
                                {section.title}
                              </p>
                              <div className="space-y-1.5">
                                {section.items.map(item => {
                                  const link =
                                    item.value === 'All'
                                      ? `/shop?category=${section.title}`
                                      : `/shop?category=${section.title}&type=${encodeURIComponent(item.value)}`;
                                  return (
                                    <Link
                                      key={`${section.title}-${item.value}`}
                                      to={link}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className={`block text-sm py-1 transition ${mobileSubLinkColor}`}
                                    >
                                      {item.label}
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className={`px-6 py-5 border-t ${mobileBorderColor} space-y-3`}>
                {user ? (
                  <Link
                    to="/logout-confirm"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex w-full items-center justify-center rounded-full border border-red-100 bg-red-50 px-5 py-2.5 text-sm uppercase tracking-[0.25em] text-red-500 transition hover:bg-red-100 active:scale-95"
                  >
                    Logout
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm uppercase tracking-[0.25em] text-white transition hover:bg-slate-800 active:scale-95"
                  >
                    Login
                  </Link>
                )}

                <div className="flex gap-3">
                  <Link
                    to="/cart"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm uppercase tracking-[0.2em] transition hover:bg-slate-100 active:scale-95 ${mobileBorderColor} ${mobileLinkColor}`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {cartCount > 0 && <span className="font-medium">{cartCount}</span>}
                  </Link>

                  {wishlist.length > 0 && (
                    <Link
                      to="/wishlist"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm uppercase tracking-[0.2em] transition hover:bg-slate-100 active:scale-95 ${mobileBorderColor} ${mobileLinkColor}`}
                    >
                      <Heart className="w-4 h-4" />
                      <span className="font-medium">{wishlist.length}</span>
                    </Link>
                  )}

                  <button
                    onClick={() => setDarkMode(prev => !prev)}
                    className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm transition hover:bg-slate-100 active:scale-95 ${mobileBorderColor} ${mobileLinkColor}`}
                    aria-label="Toggle dark mode"
                  >
                    {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;