import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AdminContext, useAdmin } from '../../context/AdminContext';
import {
  Monitor, Smartphone, Tablet, Trash2, ExternalLink,
  X, Edit3, Copy, Lock, Unlock, Eye, Clock,
  RotateCcw, RotateCw, LogOut, AlignLeft, AlignCenter,
  AlignRight, AlignJustify, Move, Grid, Zap,
  RefreshCw, Sun, Moon, EyeOff, ZoomIn, ZoomOut, Layers,
  ChevronDown, Heart, ShoppingBag,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import Home from '../Home';
import Shop from '../Shop';
import About from '../About';
import Contact from '../Contact';
import FAQ from '../FAQ';
import Returns from '../Returns';
import Privacy from '../Privacy';
import Shipping from '../Shipping';
import Wishlist from '../Wishlist';
import Cart from '../Cart';
import Checkout from '../Checkout';
import Login from '../Login';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { products } from '../../data/products';
import menImpor from '../../assets/menImpor.png';
import womenImpor from '../../assets/womenImpor.png';
import kidImpor from '../../assets/kidImpor.png';

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface ElementData { id: string; type: string; rect: DOMRect | null; }
interface HistoryEntry { config: any; timestamp: number; label: string; }
interface StyleOverride {
  fontSize?: string; fontWeight?: string; color?: string; textAlign?: string;
  letterSpacing?: string; lineHeight?: string; backgroundColor?: string;
  padding?: string; margin?: string; borderRadius?: string; opacity?: string;
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const PAGES = [
  { name: 'Home',     component: Home,     icon: '🏠' },
  { name: 'Shop',     component: Shop,     icon: '🛍️' },
  { name: 'About',    component: About,    icon: 'ℹ️' },
  { name: 'Contact',  component: Contact,  icon: '📬' },
  { name: 'Login',    component: Login,    icon: '🔐' },
  { name: 'Cart',     component: Cart,     icon: '🛒' },
  { name: 'Checkout', component: Checkout, icon: '💳' },
  { name: 'Wishlist', component: Wishlist, icon: '❤️' },
  { name: 'FAQ',      component: FAQ,      icon: '❓' },
  { name: 'Returns',  component: Returns,  icon: '↩️' },
  { name: 'Privacy',  component: Privacy,  icon: '🔒' },
  { name: 'Shipping', component: Shipping, icon: '🚚' },
];

const FONTS = [
  'Inter','Playfair Display','Montserrat','Poppins','Raleway',
  'Josefin Sans','Cormorant Garamond','DM Sans','Space Grotesk','Syne',
];

const ANIMATIONS = ['none','fadeIn','slideUp','slideLeft','slideRight','zoomIn','bounce','pulse','shake','flip'];

const COLOR_PRESETS = [
  '#000000','#1a1a1a','#333333','#666666','#999999','#cccccc','#ffffff',
  '#D4AF37','#B8961E','#C9A227','#E8C84F',
  '#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899',
];

const SECTION_MAP: Record<string, { label: string; color: string }> = {
  navbar:      { label: 'Navigation Bar',  color: '#3b82f6' },
  hero:        { label: 'Hero Section',    color: '#D4AF37' },
  categories:  { label: 'Categories',      color: '#8b5cf6' },
  saleBanner:  { label: 'Sale Banner',     color: '#ef4444' },
  newArrivals: { label: 'New Arrivals',    color: '#22c55e' },
  reviews:     { label: 'Reviews',         color: '#f97316' },
  footer:      { label: 'Footer',          color: '#6366f1' },
  // Non-home page sections
  shopPage:    { label: 'Shop Page',       color: '#0ea5e9' },
  aboutPage:   { label: 'About Page',      color: '#a855f7' },
  contactPage: { label: 'Contact Page',    color: '#14b8a6' },
  loginPage:   { label: 'Login Page',      color: '#f43f5e' },
  cartPage:    { label: 'Cart Page',       color: '#f97316' },
  checkoutPage:{ label: 'Checkout Page',   color: '#8b5cf6' },
  wishlistPage:{ label: 'Wishlist Page',   color: '#ec4899' },
  faqPage:     { label: 'FAQ Page',        color: '#06b6d4' },
  returnsPage: { label: 'Returns Page',    color: '#84cc16' },
  privacyPage: { label: 'Privacy Page',    color: '#6366f1' },
  shippingPage:{ label: 'Shipping Page',   color: '#f59e0b' },
};

// ─── SMALL REUSABLE COMPONENTS ────────────────────────────────────────────────
const Toast = ({ message, type, onClose }: { message: string; type: 'success'|'error'|'info'; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 24, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }}
    className={`fixed bottom-8 right-8 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-medium
      ${type === 'success' ? 'bg-green-500 text-white' : type === 'error' ? 'bg-red-500 text-white' : 'bg-gray-900 text-white'}`}
  >
    <span>{type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
    <span>{message}</span>
    <button onClick={onClose} className="ml-1 opacity-60 hover:opacity-100"><X className="w-3.5 h-3.5" /></button>
  </motion.div>
);

const ColorPicker = ({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{label}</label>
      <div className="relative">
        <button onClick={() => setOpen(!open)}
          className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-xl border-2 border-transparent hover:border-gray-200 transition-all">
          <div className="w-5 h-5 rounded-lg border border-gray-200 shrink-0" style={{ background: value }} />
          <span className="text-xs font-mono text-gray-600">{value}</span>
          <ChevronDown className="w-3 h-3 text-gray-400 ml-auto" />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              className="absolute z-50 top-full mt-1 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4">
              <div className="grid grid-cols-9 gap-1.5 mb-3">
                {COLOR_PRESETS.map(c => (
                  <button key={c} onClick={() => { onChange(c); setOpen(false); }}
                    className={`w-6 h-6 rounded-lg border-2 transition-all hover:scale-110 ${value === c ? 'border-gray-900 scale-110' : 'border-transparent'}`}
                    style={{ background: c }} />
                ))}
              </div>
              <input type="color" value={value} onChange={e => onChange(e.target.value)} className="w-full h-8 rounded-lg cursor-pointer border-0" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const SliderInput = ({ label, value, min, max, unit = 'px', onChange }: {
  label: string; value: number; min: number; max: number; unit?: string; onChange: (v: number) => void;
}) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between">
      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{label}</label>
      <span className="text-[10px] font-mono text-gray-600 bg-gray-100 px-2 py-0.5 rounded-lg">{value}{unit}</span>
    </div>
    <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))}
      className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-yellow-500" />
  </div>
);

const FieldInput = ({ label, value, onChange, multiline = false, placeholder = '', type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void;
  multiline?: boolean; placeholder?: string; type?: string;
}) => (
  <div className="space-y-1.5">
    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{label}</label>
    {multiline ? (
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3}
        className="w-full p-3.5 bg-gray-50 rounded-2xl text-sm resize-none border-2 border-transparent focus:bg-white focus:border-yellow-400/40 transition-all outline-none" />
    ) : (
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full p-3.5 bg-gray-50 rounded-2xl text-sm border-2 border-transparent focus:bg-white focus:border-yellow-400/40 transition-all outline-none" />
    )}
  </div>
);

// ─── SECTION WRAPPER ──────────────────────────────────────────────────────────
const SectionWrap = ({
  id, children, selectedId, hoveredId, onHover, onClick, style, previewMode,
}: {
  id: string; children: React.ReactNode; selectedId: string | null; hoveredId: string | null;
  onHover: (id: string | null) => void; onClick: (e: React.MouseEvent) => void;
  style?: React.CSSProperties; previewMode: boolean;
}) => {
  const color = SECTION_MAP[id]?.color || '#D4AF37';
  const isSelected = selectedId === id;
  const isHovered = hoveredId === id && !isSelected;
  return (
    <div
      className="relative"
      style={{
        outline: isSelected ? `2px solid ${color}` : isHovered && !previewMode ? `2px dashed ${color}99` : 'none',
        outlineOffset: '-2px',
        ...style,
      }}
      onMouseEnter={() => !previewMode && onHover(id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Badge */}
      {!previewMode && (isSelected || isHovered) && (
        <div className="absolute top-0 left-0 z-[200] pointer-events-none px-2.5 py-0.5 text-[9px] font-black text-white uppercase tracking-widest"
          style={{ background: color }}>
          {SECTION_MAP[id]?.label || id}
        </div>
      )}
      {/* Click interceptor */}
      {!previewMode && (
        <div
          className="absolute inset-0 z-[100] cursor-pointer"
          onClick={onClick}
        />
      )}
      {children}
    </div>
  );
};

// ─── MAIN EDITOR ─────────────────────────────────────────────────────────────
const Editor: React.FC = () => {
  const adminContext = useAdmin();
  const { config, updateConfig } = adminContext;
  const navigate = useNavigate();

  const [localConfig, setLocalConfig]   = useState({ ...config });
  const [history, setHistory]           = useState<HistoryEntry[]>([{ config: { ...config }, timestamp: Date.now(), label: 'Initial' }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isSaved, setIsSaved]           = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);

  const [activeTab, setActiveTab]             = useState<'content'|'style'|'layout'|'animation'>('content');
  const [previewDevice, setPreviewDevice]     = useState<'desktop'|'tablet'|'mobile'>('desktop');
  const [currentPreviewPage, setCurrentPreviewPage] = useState('Home');
  const [isDarkMode, setIsDarkMode]           = useState(false);
  const [zoom, setZoom]                       = useState(100);
  const [showGrid, setShowGrid]               = useState(false);
  const [previewMode, setPreviewMode]         = useState(false);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const [fontFamily, setFontFamily]           = useState('inherit');

  const [selectedElement, setSelectedElement]   = useState<ElementData | null>(null);
  const [hoveredElementId, setHoveredElementId] = useState<string | null>(null);
  const [isLocked, setIsLocked]   = useState<Record<string, boolean>>({});
  const [isHidden, setIsHidden]   = useState<Record<string, boolean>>({});
  const [styleOverrides, setStyleOverrides] = useState<Record<string, StyleOverride>>({});
  const [dragOrder, setDragOrder] = useState(['navbar','hero','categories','saleBanner','newArrivals','reviews','footer']);
  const [dragOver, setDragOver]   = useState<string | null>(null);
  const [dragItem, setDragItem]   = useState<string | null>(null);
  const [toast, setToast]         = useState<{ message: string; type: 'success'|'error'|'info' } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => { setLocalConfig({ ...config }); setIsSaved(true); }, [config]);

  useEffect(() => {
    if (!isSaved) {
      const t = setTimeout(() => { localStorage.setItem('editor_draft', JSON.stringify(localConfig)); showToast('Draft auto-saved', 'info'); }, 30000);
      return () => clearTimeout(t);
    }
  }, [localConfig, isSaved]);

  const showToast = (msg: string, type: 'success'|'error'|'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleUpdate = useCallback((field: string, value: any, label = 'Edit') => {
    const nc = { ...localConfig, [field]: value };
    setLocalConfig(nc);
    setIsSaved(false);
    const nh = history.slice(0, historyIndex + 1);
    nh.push({ config: nc, timestamp: Date.now(), label });
    setHistory(nh);
    setHistoryIndex(nh.length - 1);
  }, [localConfig, history, historyIndex]);

  const updateStyle = (id: string, updates: Partial<StyleOverride>) => {
    setStyleOverrides(p => ({ ...p, [id]: { ...p[id], ...updates } }));
    setIsSaved(false);
  };

  const undo = useCallback(() => {
    if (historyIndex > 0) { setLocalConfig(history[historyIndex - 1].config); setHistoryIndex(h => h - 1); setIsSaved(false); showToast('Undone', 'info'); }
  }, [historyIndex, history]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) { setLocalConfig(history[historyIndex + 1].config); setHistoryIndex(h => h + 1); setIsSaved(false); showToast('Redone', 'info'); }
  }, [historyIndex, history]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey||e.ctrlKey) && !e.shiftKey && e.key==='z') { e.preventDefault(); undo(); }
      if ((e.metaKey||e.ctrlKey) && e.shiftKey && e.key==='z') { e.preventDefault(); redo(); }
      if ((e.metaKey||e.ctrlKey) && e.key==='s') { e.preventDefault(); publishChanges(); }
      if (e.key==='Escape') setSelectedElement(null);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [undo, redo]);

  const publishChanges = async () => {
    setIsPublishing(true);
    try {
      await new Promise(r => setTimeout(r, 900));
      updateConfig(localConfig);
      setIsSaved(true);
      showToast('🚀 Live website updated!', 'success');
    } catch { showToast('Failed to publish.', 'error'); }
    finally { setIsPublishing(false); }
  };

  const handleSectionClick = (id: string, e: React.MouseEvent) => {
    if (previewMode) return;
    e.preventDefault(); e.stopPropagation();
    if (isLocked[id]) { showToast('Element is locked.', 'info'); return; }
    setSelectedElement({ id, type: SECTION_MAP[id]?.label || id, rect: (e.currentTarget as HTMLElement).getBoundingClientRect() });
    setActiveTab('content');
  };

  const confirmDeleteAction = () => {
    if (!confirmDelete) return;
    setIsHidden(p => ({ ...p, [confirmDelete]: true }));
    if (selectedElement?.id === confirmDelete) setSelectedElement(null);
    setConfirmDelete(null);
    showToast('Section hidden', 'success');
  };

  const currentStyle = selectedElement ? (styleOverrides[selectedElement.id] || {}) : {};
  const SelectedPageComponent = PAGES.find(p => p.name === currentPreviewPage)?.component || Home;

  // ── PAGE-LEVEL SECTION ID ────────────────────────────────────────────────────
  // Maps non-home pages to a clickable section ID for the left panel
  const pageToSectionId: Record<string, string> = {
    Shop:     'shopPage',
    About:    'aboutPage',
    Contact:  'contactPage',
    Login:    'loginPage',
    Cart:     'cartPage',
    Checkout: 'checkoutPage',
    Wishlist: 'wishlistPage',
    FAQ:      'faqPage',
    Returns:  'returnsPage',
    Privacy:  'privacyPage',
    Shipping: 'shippingPage',
  };

  // ── LEFT PANEL ──────────────────────────────────────────────────────────────
  const renderContentTab = () => {
    if (!selectedElement) return (
      <div className="space-y-5">
        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
          <p className="text-[10px] text-blue-700 font-bold uppercase tracking-widest mb-1">👆 How to use</p>
          <p className="text-xs text-blue-600 leading-relaxed">Click any section on the right to select it. All edit controls will appear here.</p>
        </div>
        <div className="space-y-2">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Quick select:</p>
          {Object.entries(SECTION_MAP).map(([id, s]) => (
            <button key={id} onClick={() => setSelectedElement({ id, type: s.label, rect: null })}
              className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all text-left group">
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
              <span className="text-xs font-bold text-gray-700 group-hover:text-gray-900">{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    );

    const id = selectedElement.id;

    // ── HOME PAGE SECTIONS ──
    if (id === 'navbar') return (
      <div className="space-y-4">
        <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-[9px] text-blue-700 font-black uppercase tracking-widest mb-1">🔵 Editing: Navigation Bar</p>
        </div>
        <FieldInput label="Logo Text" value={localConfig.logoText || ''} onChange={v => handleUpdate('logoText', v, 'Logo text')} placeholder="ATELIER" />
        <div className="p-3 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-500">Tip: Navbar links won't navigate in editor mode. Use the page tabs at top to switch pages.</p>
        </div>
      </div>
    );

    if (id === 'hero') return (
      <div className="space-y-4">
        <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-100">
          <p className="text-[9px] text-yellow-700 font-black uppercase tracking-widest">✏️ Editing: Hero Section — changes update live</p>
        </div>
        <FieldInput label="🏷️ Tagline (small top text)" value={localConfig.heroTagline || ''} onChange={v => handleUpdate('heroTagline', v, 'Hero tagline')} placeholder="Spring Summer 2026" />
        <FieldInput label="📌 Main Heading (big title)" value={localConfig.heroHeading || ''} onChange={v => handleUpdate('heroHeading', v, 'Hero heading')} multiline placeholder="The Luxury Manifesto" />
        <FieldInput label="📝 Description Paragraph" value={localConfig.heroDescription || ''} onChange={v => handleUpdate('heroDescription', v, 'Hero description')} multiline placeholder="Discover our curated selection..." />
        <FieldInput label="🔘 CTA Button Text" value={localConfig.heroCtaText || ''} onChange={v => handleUpdate('heroCtaText', v, 'Hero CTA')} placeholder="Shop the Collection" />
        <FieldInput label="🔗 CTA Button Link" value={localConfig.heroCtaLink || ''} onChange={v => handleUpdate('heroCtaLink', v, 'Hero link')} placeholder="/shop" />
        <div className="space-y-2">
          <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">🖼️ Background Image URL</label>
          <input type="text" value={localConfig.heroImage || ''} onChange={e => handleUpdate('heroImage', e.target.value, 'Hero image')} placeholder="https://images.unsplash.com/..."
            className="w-full p-3.5 bg-gray-50 rounded-2xl text-xs border-2 border-transparent focus:bg-white focus:border-yellow-400/40 transition-all outline-none" />
          {localConfig.heroImage && (
            <div className="rounded-xl overflow-hidden h-20 mt-1 border border-gray-100">
              <img src={localConfig.heroImage} alt="Hero preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    );

    if (id === 'categories') return (
      <div className="space-y-4">
        <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
          <p className="text-[9px] text-purple-700 font-black uppercase tracking-widest mb-1">🟣 Editing: Explore Atelier (Categories)</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-500 mb-2">This section shows Men, Women, Kids cards with local images.</p>
          <p className="text-xs text-gray-500">Use the <strong>Style</strong> tab to change colors and appearance of this section.</p>
        </div>
        <FieldInput
          label="Section Title"
          value={localConfig.categoriesTitle || 'Explore Atelier'}
          onChange={v => handleUpdate('categoriesTitle', v, 'Categories title')}
          placeholder="Explore Atelier"
        />
        <FieldInput
          label="Section Subtitle"
          value={localConfig.categoriesSubtitle || 'Men · Women · Kids'}
          onChange={v => handleUpdate('categoriesSubtitle', v, 'Categories subtitle')}
          placeholder="Men · Women · Kids"
        />
        <div className="p-3 bg-purple-50 rounded-xl">
          <p className="text-[10px] text-purple-600 font-bold uppercase tracking-widest mb-2">Category Labels</p>
          <div className="space-y-2">
            <FieldInput label="Men Label" value={localConfig.catMenLabel || 'Men'} onChange={v => handleUpdate('catMenLabel', v)} placeholder="Men" />
            <FieldInput label="Women Label" value={localConfig.catWomenLabel || 'Women'} onChange={v => handleUpdate('catWomenLabel', v)} placeholder="Women" />
            <FieldInput label="Kids Label" value={localConfig.catKidsLabel || 'Kids Wear'} onChange={v => handleUpdate('catKidsLabel', v)} placeholder="Kids Wear" />
          </div>
        </div>
      </div>
    );

    if (id === 'saleBanner') return (
      <div className="space-y-4">
        <div className="p-3 bg-red-50 rounded-xl border border-red-100">
          <p className="text-[9px] text-red-700 font-black uppercase tracking-widest mb-1">🔴 Editing: Sale Banner</p>
        </div>
        <FieldInput label="💰 Sale Heading" value={localConfig.saleText || 'Up to 50% OFF'} onChange={v => handleUpdate('saleText', v, 'Sale text')} placeholder="Up to 50% OFF" />
        <FieldInput label="📝 Sale Description" value={localConfig.saleDescription || 'Discover curated essentials from our latest season.'} onChange={v => handleUpdate('saleDescription', v, 'Sale description')} multiline />
        <FieldInput label="🔘 Button Text" value={localConfig.saleBtnText || 'Browse Sale'} onChange={v => handleUpdate('saleBtnText', v, 'Sale button')} />
        <FieldInput label="⏱️ Countdown Label" value={localConfig.saleCountdownLabel || 'Sale ends in'} onChange={v => handleUpdate('saleCountdownLabel', v)} placeholder="Sale ends in" />
      </div>
    );

    if (id === 'newArrivals') return (
      <div className="space-y-4">
        <div className="p-3 bg-green-50 rounded-xl border border-green-100">
          <p className="text-[9px] text-green-700 font-black uppercase tracking-widest mb-1">🟢 Editing: New Arrivals / Just Landed</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-500">Products come from Admin → Products. Edit section headings below.</p>
        </div>
        <FieldInput label="Section Tagline" value={localConfig.newArrivalsTagline || 'New Arrivals'} onChange={v => handleUpdate('newArrivalsTagline', v, 'New arrivals tagline')} placeholder="New Arrivals" />
        <FieldInput label="Section Heading" value={localConfig.newArrivalsHeading || 'Just Landed'} onChange={v => handleUpdate('newArrivalsHeading', v, 'New arrivals heading')} placeholder="Just Landed" />
        <FieldInput label="View All Link Text" value={localConfig.newArrivalsLinkText || 'View all new arrivals'} onChange={v => handleUpdate('newArrivalsLinkText', v)} placeholder="View all new arrivals" />
      </div>
    );

    if (id === 'reviews') return (
      <div className="space-y-4">
        <div className="p-3 bg-orange-50 rounded-xl border border-orange-100">
          <p className="text-[9px] text-orange-700 font-black uppercase tracking-widest mb-1">🟠 Editing: Reviews Section</p>
        </div>
        <FieldInput label="Section Tagline" value={localConfig.reviewsTagline || 'User Reviews'} onChange={v => handleUpdate('reviewsTagline', v, 'Reviews tagline')} placeholder="User Reviews" />
        <FieldInput label="Section Heading" value={localConfig.reviewsHeading || 'Share your Atelier experience'} onChange={v => handleUpdate('reviewsHeading', v, 'Reviews heading')} multiline placeholder="Share your Atelier experience" />
        <div className="p-3 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-500">Customer reviews display automatically when users are logged in and submit reviews.</p>
        </div>
      </div>
    );

    if (id === 'footer') return (
      <div className="space-y-4">
        <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
          <p className="text-[9px] text-indigo-700 font-black uppercase tracking-widest mb-1">🟤 Editing: Footer</p>
        </div>
        <FieldInput label="© Copyright Text" value={localConfig.footerText || ''} onChange={v => handleUpdate('footerText', v, 'Footer text')} />
        <FieldInput label="📧 Contact Email" value={localConfig.contactEmail || ''} onChange={v => handleUpdate('contactEmail', v)} />
        <FieldInput label="📞 Contact Phone" value={localConfig.contactPhone || ''} onChange={v => handleUpdate('contactPhone', v)} />
        <FieldInput label="Brand Description" value={localConfig.footerDescription || ''} onChange={v => handleUpdate('footerDescription', v)} multiline placeholder="A premium fashion house..." />
      </div>
    );

    // ── NON-HOME PAGE SECTIONS ──
    if (id === 'shopPage') return (
      <div className="space-y-4">
        <div className="p-3 bg-sky-50 rounded-xl border border-sky-100">
          <p className="text-[9px] text-sky-700 font-black uppercase tracking-widest mb-1">🛍️ Editing: Shop Page</p>
        </div>
        <FieldInput label="Page Heading" value={localConfig.shopHeading || 'Shop Atelier'} onChange={v => handleUpdate('shopHeading', v, 'Shop heading')} placeholder="Shop Atelier" />
        <FieldInput label="Page Tagline" value={localConfig.shopTagline || 'Handpicked styles for refined wardrobes'} onChange={v => handleUpdate('shopTagline', v)} multiline placeholder="Handpicked styles for refined wardrobes" />
        <FieldInput label="Collection Label (when category selected)" value={localConfig.shopCollectionLabel || 'Collection'} onChange={v => handleUpdate('shopCollectionLabel', v)} placeholder="Collection" />
        <div className="p-3 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-500">Products are managed in Admin → Products panel. Filter and sort options are auto-generated.</p>
        </div>
      </div>
    );

    if (id === 'aboutPage') return (
      <div className="space-y-4">
        <div className="p-3 bg-violet-50 rounded-xl border border-violet-100">
          <p className="text-[9px] text-violet-700 font-black uppercase tracking-widest mb-1">ℹ️ Editing: About Page</p>
        </div>
        <FieldInput label="Founded Year (e.g. Since 1994)" value={localConfig.aboutSince || 'Since 1994'} onChange={v => handleUpdate('aboutSince', v)} placeholder="Since 1994" />
        <FieldInput label="Page Title" value={localConfig.aboutTitle || 'Our Story'} onChange={v => handleUpdate('aboutTitle', v)} placeholder="Our Story" />
        <FieldInput label="Section 1 Heading" value={localConfig.aboutSection1Heading || 'Crafted with Passion and Precision'} onChange={v => handleUpdate('aboutSection1Heading', v)} multiline placeholder="Crafted with Passion and Precision" />
        <FieldInput label="Section 1 Paragraph 1" value={localConfig.aboutSection1Para1 || ''} onChange={v => handleUpdate('aboutSection1Para1', v)} multiline placeholder="Atelier was born out of..." />
        <FieldInput label="Section 1 Paragraph 2" value={localConfig.aboutSection1Para2 || ''} onChange={v => handleUpdate('aboutSection1Para2', v)} multiline placeholder="Every Atelier design..." />
        <FieldInput label="Section 2 Heading" value={localConfig.aboutSection2Heading || 'The Atelier Aesthetic'} onChange={v => handleUpdate('aboutSection2Heading', v)} placeholder="The Atelier Aesthetic" />
        <FieldInput label="Stats: Years of Heritage" value={localConfig.aboutYears || '30+'} onChange={v => handleUpdate('aboutYears', v)} placeholder="30+" />
        <FieldInput label="Stats: Happy Clients" value={localConfig.aboutClients || '150k'} onChange={v => handleUpdate('aboutClients', v)} placeholder="150k" />
        <FieldInput label="Vision Quote" value={localConfig.aboutVisionQuote || ''} onChange={v => handleUpdate('aboutVisionQuote', v)} multiline placeholder="To inspire confidence and elegance..." />
        <FieldInput label="Founder Name" value={localConfig.aboutFounderName || 'Alessandra Moretti'} onChange={v => handleUpdate('aboutFounderName', v)} placeholder="Alessandra Moretti" />
        <FieldInput label="Founder Title" value={localConfig.aboutFounderTitle || 'Founder & Creative Director'} onChange={v => handleUpdate('aboutFounderTitle', v)} placeholder="Founder & Creative Director" />
      </div>
    );

    if (id === 'contactPage') return (
      <div className="space-y-4">
        <div className="p-3 bg-teal-50 rounded-xl border border-teal-100">
          <p className="text-[9px] text-teal-700 font-black uppercase tracking-widest mb-1">📬 Editing: Contact Page</p>
        </div>
        <FieldInput label="Page Title" value={localConfig.contactPageTitle || 'Contact Us'} onChange={v => handleUpdate('contactPageTitle', v)} placeholder="Contact Us" />
        <FieldInput label="Boutique Address" value={localConfig.contactAddress || '123 Luxury Ave, Milan, Italy'} onChange={v => handleUpdate('contactAddress', v)} placeholder="123 Luxury Ave, Milan, Italy" />
        <FieldInput label="Opening Hours" value={localConfig.contactHours || 'Mon - Sat: 10:00 AM - 8:00 PM'} onChange={v => handleUpdate('contactHours', v)} placeholder="Mon - Sat: 10:00 AM - 8:00 PM" />
        <FieldInput label="Phone Number" value={localConfig.contactPhone || '+39 02 1234 5678'} onChange={v => handleUpdate('contactPhone', v)} placeholder="+39 02 1234 5678" />
        <FieldInput label="Email Address" value={localConfig.contactEmail || 'contact@atelierfashion.com'} onChange={v => handleUpdate('contactEmail', v)} placeholder="contact@atelierfashion.com" />
        <FieldInput label="Support Email" value={localConfig.contactSupportEmail || 'support@atelierfashion.com'} onChange={v => handleUpdate('contactSupportEmail', v)} placeholder="support@atelierfashion.com" />
        <FieldInput label="Form: Section Heading" value={localConfig.contactFormHeading || 'Send a Message'} onChange={v => handleUpdate('contactFormHeading', v)} placeholder="Send a Message" />
        <FieldInput label="Map Location Label" value={localConfig.contactMapLabel || 'Visit Our Flagship Store'} onChange={v => handleUpdate('contactMapLabel', v)} placeholder="Visit Our Flagship Store" />
      </div>
    );

    if (id === 'loginPage') return (
      <div className="space-y-4">
        <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
          <p className="text-[9px] text-rose-700 font-black uppercase tracking-widest mb-1">🔐 Editing: Login Page</p>
        </div>
        <FieldInput label="Login Heading" value={localConfig.loginHeading || 'Welcome Back'} onChange={v => handleUpdate('loginHeading', v)} placeholder="Welcome Back" />
        <FieldInput label="Login Subtext" value={localConfig.loginSubtext || 'Enter your details to access your account'} onChange={v => handleUpdate('loginSubtext', v)} multiline placeholder="Enter your details to access your account" />
        <FieldInput label="Sign Up Heading" value={localConfig.signupHeading || 'Create Account'} onChange={v => handleUpdate('signupHeading', v)} placeholder="Create Account" />
        <FieldInput label="Sign Up Subtext" value={localConfig.signupSubtext || 'Join the Atelier circle for exclusive benefits'} onChange={v => handleUpdate('signupSubtext', v)} multiline placeholder="Join the Atelier circle..." />
        <div className="p-3 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-500">Admin credentials: 12345678@gmail.com / 12345678</p>
        </div>
      </div>
    );

    if (id === 'cartPage') return (
      <div className="space-y-4">
        <div className="p-3 bg-orange-50 rounded-xl border border-orange-100">
          <p className="text-[9px] text-orange-700 font-black uppercase tracking-widest mb-1">🛒 Editing: Cart Page</p>
        </div>
        <FieldInput label="Empty Cart Heading" value={localConfig.cartEmptyHeading || 'Your Cart is Empty'} onChange={v => handleUpdate('cartEmptyHeading', v)} placeholder="Your Cart is Empty" />
        <FieldInput label="Empty Cart Message" value={localConfig.cartEmptyMessage || "It looks like you haven't added anything yet."} onChange={v => handleUpdate('cartEmptyMessage', v)} multiline />
        <FieldInput label="Empty Cart Button Text" value={localConfig.cartEmptyBtnText || 'Start Shopping'} onChange={v => handleUpdate('cartEmptyBtnText', v)} placeholder="Start Shopping" />
        <FieldInput label="Order Confirmed Heading" value={localConfig.cartSuccessHeading || 'Order Confirmed'} onChange={v => handleUpdate('cartSuccessHeading', v)} placeholder="Order Confirmed" />
        <FieldInput label="Free Shipping Label" value={localConfig.cartFreeShipping || 'Complimentary Express Shipping'} onChange={v => handleUpdate('cartFreeShipping', v)} placeholder="Complimentary Express Shipping" />
        <FieldInput label="Returns Label" value={localConfig.cartReturnsLabel || '30-Day Complimentary Returns'} onChange={v => handleUpdate('cartReturnsLabel', v)} placeholder="30-Day Complimentary Returns" />
      </div>
    );

    if (id === 'checkoutPage') return (
      <div className="space-y-4">
        <div className="p-3 bg-violet-50 rounded-xl border border-violet-100">
          <p className="text-[9px] text-violet-700 font-black uppercase tracking-widest mb-1">💳 Editing: Checkout Page</p>
        </div>
        <FieldInput label="Page Title" value={localConfig.checkoutTitle || 'Complete your order'} onChange={v => handleUpdate('checkoutTitle', v)} placeholder="Complete your order" />
        <FieldInput label="Delivery Section Label" value={localConfig.checkoutDeliveryLabel || 'Shipping Details'} onChange={v => handleUpdate('checkoutDeliveryLabel', v)} placeholder="Shipping Details" />
        <FieldInput label="Cart Section Label" value={localConfig.checkoutCartLabel || 'Your Bag'} onChange={v => handleUpdate('checkoutCartLabel', v)} placeholder="Your Bag" />
        <FieldInput label="Empty Cart Message" value={localConfig.checkoutEmptyMsg || 'Add products to your bag and return here.'} onChange={v => handleUpdate('checkoutEmptyMsg', v)} multiline />
        <FieldInput label="Place Order Button Text" value={localConfig.checkoutPlaceOrderBtn || 'Place Order'} onChange={v => handleUpdate('checkoutPlaceOrderBtn', v)} placeholder="Place Order" />
      </div>
    );

    if (id === 'wishlistPage') return (
      <div className="space-y-4">
        <div className="p-3 bg-pink-50 rounded-xl border border-pink-100">
          <p className="text-[9px] text-pink-700 font-black uppercase tracking-widest mb-1">❤️ Editing: Wishlist Page</p>
        </div>
        <FieldInput label="Page Tagline" value={localConfig.wishlistTagline || 'Your Wishlist'} onChange={v => handleUpdate('wishlistTagline', v)} placeholder="Your Wishlist" />
        <FieldInput label="Page Title" value={localConfig.wishlistTitle || 'Saved Favorites'} onChange={v => handleUpdate('wishlistTitle', v)} placeholder="Saved Favorites" />
        <FieldInput label="Page Description" value={localConfig.wishlistDescription || 'Review items you\'ve saved for later.'} onChange={v => handleUpdate('wishlistDescription', v)} multiline />
        <FieldInput label="Empty Wishlist Message" value={localConfig.wishlistEmptyMsg || 'Your wishlist is empty'} onChange={v => handleUpdate('wishlistEmptyMsg', v)} placeholder="Your wishlist is empty" />
        <FieldInput label="Continue Shopping Button" value={localConfig.wishlistShopBtn || 'Continue Shopping'} onChange={v => handleUpdate('wishlistShopBtn', v)} placeholder="Continue Shopping" />
      </div>
    );

    if (id === 'faqPage') return (
      <div className="space-y-4">
        <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-100">
          <p className="text-[9px] text-cyan-700 font-black uppercase tracking-widest mb-1">❓ Editing: FAQ Page</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-500">The FAQ page currently shows the Contact form layout. You can update the heading and content below.</p>
        </div>
        <FieldInput label="Page Title" value={localConfig.faqTitle || 'Frequently Asked Questions'} onChange={v => handleUpdate('faqTitle', v)} placeholder="Frequently Asked Questions" />
        <FieldInput label="Page Subtitle" value={localConfig.faqSubtitle || 'Find answers to common questions about Atelier.'} onChange={v => handleUpdate('faqSubtitle', v)} multiline />
      </div>
    );

    if (id === 'returnsPage') return (
      <div className="space-y-4">
        <div className="p-3 bg-lime-50 rounded-xl border border-lime-100">
          <p className="text-[9px] text-lime-700 font-black uppercase tracking-widest mb-1">↩️ Editing: Returns Page</p>
        </div>
        <FieldInput label="Page Label" value={localConfig.returnsLabel || 'Returns & Exchanges'} onChange={v => handleUpdate('returnsLabel', v)} placeholder="Returns & Exchanges" />
        <FieldInput label="Page Title" value={localConfig.returnsTitle || 'Easy Returns, Refined Experience'} onChange={v => handleUpdate('returnsTitle', v)} multiline placeholder="Easy Returns, Refined Experience" />
        <FieldInput label="Page Description" value={localConfig.returnsDescription || 'A clear and elegant process for returns and exchanges.'} onChange={v => handleUpdate('returnsDescription', v)} multiline />
        <FieldInput label="Return Window (days)" value={localConfig.returnsDays || '30'} onChange={v => handleUpdate('returnsDays', v)} placeholder="30" />
        <FieldInput label="Refund Timeline" value={localConfig.refundTimeline || '5-7 business days'} onChange={v => handleUpdate('refundTimeline', v)} placeholder="5-7 business days" />
      </div>
    );

    if (id === 'privacyPage') return (
      <div className="space-y-4">
        <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
          <p className="text-[9px] text-indigo-700 font-black uppercase tracking-widest mb-1">🔒 Editing: Privacy Policy Page</p>
        </div>
        <FieldInput label="Page Label" value={localConfig.privacyLabel || 'Policy'} onChange={v => handleUpdate('privacyLabel', v)} placeholder="Policy" />
        <FieldInput label="Page Title" value={localConfig.privacyTitle || 'Privacy Policy'} onChange={v => handleUpdate('privacyTitle', v)} placeholder="Privacy Policy" />
        <FieldInput label="Page Description" value={localConfig.privacyDescription || 'Our privacy policy is designed to be clear and reassuring.'} onChange={v => handleUpdate('privacyDescription', v)} multiline />
        <FieldInput label="Contact Email for Privacy" value={localConfig.privacyEmail || 'privacy@atelier.com'} onChange={v => handleUpdate('privacyEmail', v)} placeholder="privacy@atelier.com" />
      </div>
    );

    if (id === 'shippingPage') return (
      <div className="space-y-4">
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-[9px] text-amber-700 font-black uppercase tracking-widest mb-1">🚚 Editing: Shipping Page</p>
        </div>
        <FieldInput label="Page Label" value={localConfig.shippingLabel || 'Shipping'} onChange={v => handleUpdate('shippingLabel', v)} placeholder="Shipping" />
        <FieldInput label="Page Title" value={localConfig.shippingTitle || 'Shipping Policy'} onChange={v => handleUpdate('shippingTitle', v)} placeholder="Shipping Policy" />
        <FieldInput label="Page Description" value={localConfig.shippingDescription || 'Everything you need to know about delivery and tracking.'} onChange={v => handleUpdate('shippingDescription', v)} multiline />
        <FieldInput label="Standard Shipping Title" value={localConfig.shippingStandardTitle || 'Standard'} onChange={v => handleUpdate('shippingStandardTitle', v)} placeholder="Standard" />
        <FieldInput label="Express Shipping Title" value={localConfig.shippingExpressTitle || 'Express'} onChange={v => handleUpdate('shippingExpressTitle', v)} placeholder="Express" />
        <FieldInput label="International Shipping Title" value={localConfig.shippingIntlTitle || 'International'} onChange={v => handleUpdate('shippingIntlTitle', v)} placeholder="International" />
        <FieldInput label="Processing Time" value={localConfig.shippingProcessTime || '1-2 business days'} onChange={v => handleUpdate('shippingProcessTime', v)} placeholder="1-2 business days" />
        <FieldInput label="Standard Delivery Time" value={localConfig.shippingStdDelivery || '3-5 business days'} onChange={v => handleUpdate('shippingStdDelivery', v)} placeholder="3-5 business days" />
        <FieldInput label="Express Delivery Time" value={localConfig.shippingExpDelivery || '1-2 business days'} onChange={v => handleUpdate('shippingExpDelivery', v)} placeholder="1-2 business days" />
      </div>
    );

    return <div className="p-4 bg-gray-50 rounded-2xl"><p className="text-xs text-gray-400">Select a section to edit.</p></div>;
  };

  const renderStyleTab = () => !selectedElement ? (
    <div className="p-4 bg-gray-50 rounded-2xl"><p className="text-xs text-gray-400">Select a section first.</p></div>
  ) : (
    <div className="space-y-5">
      <ColorPicker label="Text Color" value={currentStyle.color || '#000000'} onChange={v => updateStyle(selectedElement.id, { color: v })} />
      <ColorPicker label="Background Color" value={currentStyle.backgroundColor || '#ffffff'} onChange={v => updateStyle(selectedElement.id, { backgroundColor: v })} />
      <SliderInput label="Font Size" value={parseInt(currentStyle.fontSize || '16')} min={8} max={120} unit="px" onChange={v => updateStyle(selectedElement.id, { fontSize: `${v}px` })} />
      <div className="space-y-1.5">
        <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Font Weight</label>
        <div className="flex gap-1">
          {['300','400','600','700','900'].map(w => (
            <button key={w} onClick={() => updateStyle(selectedElement.id, { fontWeight: w })}
              className={`flex-1 py-2 rounded-xl text-xs transition-all ${currentStyle.fontWeight === w ? 'bg-yellow-400 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              style={{ fontWeight: w }}>{w}</button>
          ))}
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Text Align</label>
        <div className="flex gap-1">
          {[{ v:'left',I:AlignLeft },{ v:'center',I:AlignCenter },{ v:'right',I:AlignRight },{ v:'justify',I:AlignJustify }].map(({ v, I }) => (
            <button key={v} onClick={() => updateStyle(selectedElement.id, { textAlign: v })}
              className={`flex-1 py-2.5 rounded-xl flex items-center justify-center transition-all ${currentStyle.textAlign === v ? 'bg-yellow-400 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
              <I className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>
      </div>
      <SliderInput label="Letter Spacing" value={parseFloat(currentStyle.letterSpacing || '0')} min={-2} max={20} unit="px" onChange={v => updateStyle(selectedElement.id, { letterSpacing: `${v}px` })} />
      <SliderInput label="Line Height" value={Math.round(parseFloat(currentStyle.lineHeight || '1.5') * 10)} min={10} max={30} unit="" onChange={v => updateStyle(selectedElement.id, { lineHeight: `${v/10}` })} />
      <SliderInput label="Opacity" value={Math.round(parseFloat(currentStyle.opacity || '1') * 100)} min={0} max={100} unit="%" onChange={v => updateStyle(selectedElement.id, { opacity: `${v/100}` })} />
      <SliderInput label="Border Radius" value={parseInt(currentStyle.borderRadius || '0')} min={0} max={64} unit="px" onChange={v => updateStyle(selectedElement.id, { borderRadius: `${v}px` })} />
      <div className="space-y-1.5 pt-2 border-t border-gray-100">
        <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Global Font Family</label>
        <div className="space-y-1">
          {FONTS.map(f => (
            <button key={f} onClick={() => setFontFamily(f)}
              className={`w-full p-2.5 rounded-xl text-sm text-left transition-all ${fontFamily === f ? 'bg-yellow-400 text-white font-bold' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
              style={{ fontFamily: f }}>{f}</button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLayoutTab = () => (
    <div className="space-y-5">
      {selectedElement && (
        <>
          <SliderInput label="Padding" value={parseInt(currentStyle.padding || '0')} min={0} max={200} unit="px" onChange={v => updateStyle(selectedElement.id, { padding: `${v}px` })} />
          <SliderInput label="Margin" value={parseInt(currentStyle.margin || '0')} min={0} max={200} unit="px" onChange={v => updateStyle(selectedElement.id, { margin: `${v}px` })} />
        </>
      )}
      <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Section Order (Home Page)</p>
        {dragOrder.map((sid, i) => (
          <div key={sid} draggable
            onDragStart={() => setDragItem(sid)}
            onDragOver={e => { e.preventDefault(); setDragOver(sid); }}
            onDrop={() => {
              if (!dragItem || dragItem === sid) return;
              const o = [...dragOrder];
              o.splice(o.indexOf(dragItem), 1); o.splice(o.indexOf(sid), 0, dragItem);
              setDragOrder(o); setDragItem(null); setDragOver(null);
              showToast('Reordered!', 'success');
            }}
            onDragEnd={() => { setDragItem(null); setDragOver(null); }}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-grab active:cursor-grabbing border-2 transition-all
              ${dragOver === sid ? 'border-yellow-400 bg-yellow-50' : 'border-transparent bg-gray-50'}
              ${dragItem === sid ? 'opacity-40' : ''}`}
          >
            <Move className="w-3.5 h-3.5 text-gray-400" />
            <div className="w-2 h-2 rounded-full" style={{ background: SECTION_MAP[sid]?.color }} />
            <span className="text-xs font-bold text-gray-700 flex-1">{SECTION_MAP[sid]?.label || sid}</span>
            <span className="text-[10px] text-gray-400">#{i+1}</span>
            <button onClick={e => { e.stopPropagation(); setIsHidden(p => ({ ...p, [sid]: !p[sid] })); }}
              className={`p-1 rounded-lg ${isHidden[sid] ? 'text-red-400' : 'text-gray-300 hover:text-gray-500'}`}>
              {isHidden[sid] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnimationTab = () => !selectedElement ? (
    <div className="p-4 bg-gray-50 rounded-2xl"><p className="text-xs text-gray-400">Select a section first.</p></div>
  ) : (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-1.5">
        {ANIMATIONS.map(a => (
          <button key={a} className="py-2.5 rounded-xl text-xs font-medium capitalize bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all">
            {a === 'none' ? '✕ None' : a}
          </button>
        ))}
      </div>
    </div>
  );

  // ── PREVIEW DATA ─────────────────────────────────────────────────────────────
  const isHome = currentPreviewPage === 'Home';
  const newArrivalsData = products.slice(1, 5);
  const categories = [
    { name: 'Men', label: localConfig.catMenLabel || 'Men', image: menImpor },
    { name: 'Women', label: localConfig.catWomenLabel || 'Women', image: womenImpor },
    { name: 'Kids', label: localConfig.catKidsLabel || 'Kids Wear', image: kidImpor },
  ];

  const sectionProps = (id: string) => ({
    id,
    selectedId: selectedElement?.id || null,
    hoveredId: hoveredElementId,
    onHover: setHoveredElementId,
    onClick: (e: React.MouseEvent) => handleSectionClick(id, e),
    style: styleOverrides[id] as React.CSSProperties,
    previewMode,
  });

  return (
    <div className={`h-screen w-screen flex overflow-hidden font-sans ${isDarkMode ? 'bg-gray-950' : 'bg-[#F0F2F5]'}`}>

      {/* CONFIRM MODAL */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setConfirmDelete(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()} className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full mx-4 text-center space-y-4">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                <Trash2 className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-lg font-bold">Hide this section?</h3>
              <p className="text-sm text-gray-500">Restore it anytime from the Layout tab.</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmDelete(null)} className="flex-1 py-3 bg-gray-100 rounded-2xl text-sm font-bold">Cancel</button>
                <button onClick={confirmDeleteAction} className="flex-1 py-3 bg-red-500 rounded-2xl text-sm font-bold text-white">Hide</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}</AnimatePresence>

      {/* HISTORY PANEL */}
      <AnimatePresence>
        {showHistoryPanel && (
          <motion.div initial={{ x: -280, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -280, opacity: 0 }}
            className="fixed left-[400px] top-0 h-full w-60 bg-white shadow-2xl z-[500] border-r border-gray-100 overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold">Version History</h3>
              <button onClick={() => setShowHistoryPanel(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            {[...history].reverse().map((entry, i) => {
              const ri = history.length - 1 - i;
              return (
                <button key={i} onClick={() => { setLocalConfig(history[ri].config); setHistoryIndex(ri); setIsSaved(false); showToast('Restored!', 'success'); setShowHistoryPanel(false); }}
                  className={`w-full text-left p-3 rounded-xl mb-1 transition-all ${ri === historyIndex ? 'bg-yellow-50 border border-yellow-200' : 'hover:bg-gray-50'}`}>
                  <p className="text-xs font-bold text-gray-800">{entry.label}</p>
                  <p className="text-[10px] text-gray-400">{new Date(entry.timestamp).toLocaleTimeString()}</p>
                  {ri === historyIndex && <span className="text-[9px] font-bold text-yellow-600">Current</span>}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ LEFT PANEL ══════════════════════════════════════════════════════════ */}
      <aside className="w-[400px] flex flex-col bg-white border-r border-gray-100 overflow-hidden shrink-0 z-[100] shadow-2xl">

        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-gray-50 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/admin')} className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 transition-all">
                <LogOut className="w-3.5 h-3.5" />
              </button>
              <div>
                <h2 className="text-[11px] font-black text-gray-900 uppercase tracking-widest">Atelier Studio</h2>
                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Visual Editor v2.0</p>
              </div>
            </div>
            <div className="flex items-center gap-0.5">
              <button onClick={undo} disabled={historyIndex === 0} title="Undo ⌘Z" className="p-2 text-gray-300 enabled:text-gray-600 hover:bg-gray-50 rounded-xl disabled:cursor-not-allowed transition-all"><RotateCcw className="w-3.5 h-3.5" /></button>
              <button onClick={redo} disabled={historyIndex >= history.length - 1} title="Redo ⌘⇧Z" className="p-2 text-gray-300 enabled:text-gray-600 hover:bg-gray-50 rounded-xl disabled:cursor-not-allowed transition-all"><RotateCw className="w-3.5 h-3.5" /></button>
              <button onClick={() => setShowHistoryPanel(!showHistoryPanel)} className={`p-2 rounded-xl transition-all ${showHistoryPanel ? 'bg-yellow-50 text-yellow-500' : 'text-gray-400 hover:bg-gray-50'}`}><Clock className="w-3.5 h-3.5" /></button>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 text-gray-400 hover:bg-gray-50 rounded-xl transition-all">{isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}</button>
              <button onClick={() => setShowGrid(!showGrid)} className={`p-2 rounded-xl transition-all ${showGrid ? 'bg-yellow-50 text-yellow-500' : 'text-gray-400 hover:bg-gray-50'}`}><Grid className="w-3.5 h-3.5" /></button>
            </div>
          </div>
          {/* Status bar */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl">
            <div className={`w-2 h-2 rounded-full shrink-0 ${isSaved ? 'bg-green-400' : 'bg-amber-400 animate-pulse'}`} />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex-1">
              {selectedElement ? `Editing: ${SECTION_MAP[selectedElement.id]?.label || selectedElement.type}` : isSaved ? 'All saved' : 'Unsaved changes'}
            </span>
            {selectedElement && (
              <div className="flex items-center gap-1">
                <button onClick={() => setIsLocked(p => ({ ...p, [selectedElement.id]: !p[selectedElement.id] }))}
                  className={`p-1.5 rounded-lg transition-all ${isLocked[selectedElement.id] ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>
                  {isLocked[selectedElement.id] ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                </button>
                <button onClick={() => setIsHidden(p => ({ ...p, [selectedElement.id]: !p[selectedElement.id] }))}
                  className="p-1.5 rounded-lg bg-gray-100 text-gray-400 hover:bg-gray-200 transition-all">
                  {isHidden[selectedElement.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </button>
                <button onClick={() => setConfirmDelete(selectedElement.id)}
                  className="p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition-all"><Trash2 className="w-3 h-3" /></button>
                <button onClick={() => setSelectedElement(null)}
                  className="p-1.5 rounded-lg bg-gray-100 text-gray-400 hover:bg-gray-200 transition-all"><X className="w-3 h-3" /></button>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="px-5 py-2.5 border-b border-gray-50 shrink-0">
          <div className="flex bg-gray-50 p-1 rounded-2xl gap-0.5">
            {(['content','style','layout','animation'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all
                  ${activeTab === tab ? 'bg-white text-gray-900 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Editing surface */}
        <div className="flex-1 overflow-y-auto p-5" style={{ scrollbarWidth: 'thin' }}>
          <AnimatePresence mode="wait">
            <motion.div key={`${selectedElement?.id||'none'}-${activeTab}`}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.12 }}>
              {activeTab === 'content'   && renderContentTab()}
              {activeTab === 'style'     && renderStyleTab()}
              {activeTab === 'layout'    && renderLayoutTab()}
              {activeTab === 'animation' && renderAnimationTab()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Publish footer */}
        <div className="p-5 border-t border-gray-50 space-y-2.5 shrink-0">
          <button onClick={publishChanges} disabled={isSaved || isPublishing}
            className={`w-full py-4 rounded-[1.2rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2
              ${isSaved ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : isPublishing ? 'bg-yellow-400 text-white cursor-wait'
                : 'bg-gray-900 hover:bg-yellow-400 text-white shadow-xl active:scale-[0.98]'}`}>
            {isPublishing
              ? <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><RefreshCw className="w-4 h-4" /></motion.div> Publishing...</>
              : <><Zap className="w-4 h-4" />{isSaved ? 'No Pending Changes' : 'Push to Live Website'}</>}
          </button>
          <div className="flex gap-2">
            <button onClick={() => setPreviewMode(!previewMode)}
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5
                ${previewMode ? 'bg-green-100 text-green-700' : 'bg-gray-50 hover:bg-gray-100 text-gray-600'}`}>
              <Eye className="w-3.5 h-3.5" />{previewMode ? 'Exit Preview' : 'Preview'}
            </button>
            <button onClick={() => window.open('/', '_blank')}
              className="flex-1 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all flex items-center justify-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5" />Live Site
            </button>
          </div>
          <p className="text-center text-[9px] text-gray-300 font-bold uppercase tracking-widest">
            ⌘Z Undo · ⌘⇧Z Redo · ⌘S Save · ESC Deselect
          </p>
        </div>
      </aside>

      {/* ══ RIGHT PREVIEW ════════════════════════════════════════════════════════ */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">

        {/* Toolbar */}
        <div className="px-5 pt-4 pb-3 shrink-0">
          <div className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl shadow-lg border
            ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center gap-1 flex-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              <Layers className="w-3 h-3 text-yellow-500 shrink-0" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap mx-2">Pages</span>
              <div className="w-px h-4 bg-gray-200 mr-2" />
              {PAGES.map(page => (
                <button key={page.name} onClick={() => { setCurrentPreviewPage(page.name); setSelectedElement(null); }}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all whitespace-nowrap
                    ${currentPreviewPage === page.name ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'}`}>
                  {page.icon} {page.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 border-l border-gray-100 pl-2">
              <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500"><ZoomOut className="w-3 h-3" /></button>
              <span className="text-[10px] font-bold text-gray-500 w-9 text-center">{zoom}%</span>
              <button onClick={() => setZoom(z => Math.min(150, z + 10))} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500"><ZoomIn className="w-3 h-3" /></button>
            </div>
            <div className="flex items-center gap-1 border-l border-gray-100 pl-2">
              {([{ d:'desktop',I:Monitor },{ d:'tablet',I:Tablet },{ d:'mobile',I:Smartphone }] as const).map(({ d, I }) => (
                <button key={d} onClick={() => setPreviewDevice(d as any)}
                  className={`p-2 rounded-xl transition-all ${previewDevice === d ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-100'}`}>
                  <I className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 flex items-center justify-center overflow-hidden px-5 pb-5 relative">
          {showGrid && (
            <div className="absolute inset-0 pointer-events-none z-10 opacity-10"
              style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.3) 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
          )}
          {previewMode && (
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg pointer-events-none">
              👁 Preview Mode — links active
            </div>
          )}

          <div
            className={`bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] border border-gray-100 transition-all duration-700
              ${previewDevice === 'desktop' ? 'w-full h-full' : previewDevice === 'tablet' ? 'h-[96%]' : 'h-[94%]'}`}
            style={{
              width: previewDevice !== 'desktop' ? (previewDevice === 'tablet' ? '768px' : '390px') : undefined,
              borderRadius: previewDevice === 'desktop' ? '2rem' : previewDevice === 'tablet' ? '3rem' : '4rem',
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'center center',
            }}
          >
            {/* ── SCROLLABLE INNER ── */}
            <div
              className="w-full h-full overflow-y-auto bg-white relative"
              style={{
                borderRadius: previewDevice === 'desktop' ? '2rem' : previewDevice === 'tablet' ? '3rem' : '4rem',
                fontFamily,
              }}
              onClickCapture={e => {
                if (previewMode) return;
                const anchor = (e.target as HTMLElement).closest('a');
                if (anchor) { e.preventDefault(); e.stopPropagation(); }
              }}
            >
              <AdminContext.Provider value={{ ...adminContext, config: localConfig }}>
                {isHome ? (
                  /* ── HOME PAGE: each section individually selectable ── */
                  <div className="min-h-full">
                    {dragOrder.map(sid => {
                      if (isHidden[sid]) return null;

                      if (sid === 'navbar') return (
                        <SectionWrap key="navbar" {...sectionProps('navbar')}>
                          <Navbar />
                        </SectionWrap>
                      );

                      if (sid === 'hero') return (
                        <SectionWrap key="hero" {...sectionProps('hero')}>
                          <section className="relative min-h-[92vh] overflow-hidden bg-slate-950">
                            <div className="absolute inset-0 bg-cover bg-center"
                              style={{ backgroundImage: `url(${localConfig.heroImage})` }} />
                            <div className="absolute inset-0 bg-slate-950/35" />
                            <div className="relative z-10 flex min-h-[92vh] items-center">
                              <div className="max-w-3xl px-6 py-24 ml-[6px]">
                                <div className="max-w-xl text-white">
                                  <p className="text-sm uppercase tracking-[0.4em] text-slate-200 mb-6">
                                    {localConfig.heroTagline}
                                  </p>
                                  <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-6">
                                    {localConfig.heroHeading}
                                  </h1>
                                  <p className="max-w-xl text-sm md:text-base text-slate-200 mb-10">
                                    {localConfig.heroDescription}
                                  </p>
                                  <div className="flex flex-wrap gap-3">
                                    <span className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/10 px-8 py-3 text-sm uppercase tracking-[0.35em] text-white cursor-default">
                                      {localConfig.heroCtaText}
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                      </svg>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </SectionWrap>
                      );

                      if (sid === 'categories') return (
                        <SectionWrap key="categories" {...sectionProps('categories')}>
                          <section className="py-24">
                            <div className="max-w-7xl mx-auto px-6">
                              <div className="text-center mb-16">
                                <h2 className="text-4xl font-serif mb-4">{localConfig.categoriesTitle || 'Explore Atelier'}</h2>
                                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{localConfig.categoriesSubtitle || 'Men · Women · Kids'}</p>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {categories.map(cat => (
                                  <div key={cat.name} className="group relative overflow-hidden rounded-[32px] bg-slate-100 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.25)]">
                                    <img src={cat.image} alt={cat.name} className="h-[520px] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-slate-950/20" />
                                    <div className="absolute inset-0 flex items-end p-8">
                                      <div>
                                        <p className="text-sm uppercase tracking-[0.4em] text-white mb-2">Editorial</p>
                                        <h3 className="text-3xl font-serif text-white">{cat.label}</h3>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </section>
                        </SectionWrap>
                      );

                      if (sid === 'saleBanner') return (
                        <SectionWrap key="saleBanner" {...sectionProps('saleBanner')}>
                          <section className="py-20">
                            <div className="mx-auto max-w-6xl px-6">
                              <div className="rounded-[40px] bg-slate-900 px-8 py-16 text-center text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)]">
                                <p className="text-sm uppercase tracking-[0.4em] text-slate-400 mb-5">Limited Time Offer</p>
                                <h2 className="text-5xl md:text-6xl font-serif mb-6">{localConfig.saleText || 'Up to 50% OFF'}</h2>
                                <p className="max-w-2xl mx-auto text-base text-slate-300 mb-8">{localConfig.saleDescription || 'Discover curated essentials from our latest season with exclusive savings.'}</p>
                                <span className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white px-8 py-3 text-sm uppercase tracking-[0.35em] text-slate-950 cursor-default">
                                  {localConfig.saleBtnText || 'Browse Sale'}
                                </span>
                              </div>
                            </div>
                          </section>
                        </SectionWrap>
                      );

                      if (sid === 'newArrivals') return (
                        <SectionWrap key="newArrivals" {...sectionProps('newArrivals')}>
                          <section className="py-24">
                            <div className="max-w-7xl mx-auto px-6">
                              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-12">
                                <div>
                                  <p className="text-sm uppercase tracking-[0.4em] text-slate-500 mb-3">{localConfig.newArrivalsTagline || 'New Arrivals'}</p>
                                  <h2 className="text-4xl font-serif">{localConfig.newArrivalsHeading || 'Just Landed'}</h2>
                                </div>
                                <span className="text-sm uppercase tracking-[0.35em] text-slate-600 border-b border-slate-900/10 pb-1">
                                  {localConfig.newArrivalsLinkText || 'View all new arrivals'}
                                </span>
                              </div>
                              <div className="-mx-4 overflow-x-auto pb-4">
                                <div className="inline-flex gap-6 px-4">
                                  {newArrivalsData.map(product => (
                                    <div key={product.id} className="min-w-[320px] rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.15)]">
                                      <div className="relative overflow-hidden rounded-[28px] bg-slate-100">
                                        <img src={product.images[0]} alt={product.name} className="h-[360px] w-full object-cover" referrerPolicy="no-referrer" />
                                      </div>
                                      <div className="mt-6 flex items-center justify-between gap-3">
                                        <div>
                                          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{product.category}</p>
                                          <h3 className="text-xl font-serif mt-3">{product.name}</h3>
                                        </div>
                                        <button className="rounded-full border border-slate-200 p-3 text-slate-600"><Heart className="w-4 h-4" /></button>
                                      </div>
                                      <div className="mt-4 flex items-center justify-between text-sm text-slate-700">
                                        <span>${product.price.toLocaleString()}</span>
                                        <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-white">
                                          <ShoppingBag className="w-4 h-4" /> Add
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </section>
                        </SectionWrap>
                      );

                      if (sid === 'reviews') return (
                        <SectionWrap key="reviews" {...sectionProps('reviews')}>
                          <section className="py-24 bg-slate-50">
                            <div className="max-w-7xl mx-auto px-6">
                              <div className="mb-10">
                                <p className="text-sm uppercase tracking-[0.4em] text-slate-500 mb-3">{localConfig.reviewsTagline || 'User Reviews'}</p>
                                <h2 className="text-4xl font-serif">{localConfig.reviewsHeading || 'Share your Atelier experience'}</h2>
                              </div>
                              <div className="rounded-[32px] border border-slate-200 bg-white p-8">
                                <p className="text-sm text-slate-400 italic">Customer reviews appear here when logged in.</p>
                              </div>
                            </div>
                          </section>
                        </SectionWrap>
                      );

                      if (sid === 'footer') return (
                        <SectionWrap key="footer" {...sectionProps('footer')}>
                          <Footer />
                        </SectionWrap>
                      );

                      return null;
                    })}
                  </div>
                ) : (
                  /* ── OTHER PAGES: entire page is one clickable section ── */
                  <div className="min-h-full">
                    {/* Navbar — always selectable */}
                    <SectionWrap id="navbar" {...sectionProps('navbar')} style={styleOverrides['navbar'] as React.CSSProperties}>
                      <Navbar />
                    </SectionWrap>

                    {/* Page body — wrapped in a SectionWrap for click-to-edit */}
                    {(() => {
                      const pageSectionId = pageToSectionId[currentPreviewPage] || 'shopPage';
                      return (
                        <SectionWrap
                          id={pageSectionId}
                          selectedId={selectedElement?.id || null}
                          hoveredId={hoveredElementId}
                          onHover={setHoveredElementId}
                          onClick={(e: React.MouseEvent) => handleSectionClick(pageSectionId, e)}
                          style={styleOverrides[pageSectionId] as React.CSSProperties}
                          previewMode={previewMode}
                        >
                          <div style={{ pointerEvents: 'none' }}>
                            <SelectedPageComponent />
                          </div>
                        </SectionWrap>
                      );
                    })()}

                    {/* Footer — always selectable */}
                    <SectionWrap id="footer" {...sectionProps('footer')} style={styleOverrides['footer'] as React.CSSProperties}>
                      <Footer />
                    </SectionWrap>
                  </div>
                )}
              </AdminContext.Provider>
            </div>

            {/* Device frames */}
            {previewDevice === 'mobile' && (
              <div className="absolute inset-0 pointer-events-none border-[14px] border-gray-900 rounded-[4.5rem] z-10">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-900 rounded-b-3xl" />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/20 rounded-full" />
              </div>
            )}
            {previewDevice === 'tablet' && (
              <div className="absolute inset-0 pointer-events-none border-[12px] border-gray-800 rounded-[3rem] z-10">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-700" />
              </div>
            )}
          </div>
        </div>

        {/* HUD */}
        <div className="absolute bottom-8 right-8 pointer-events-none">
          <div className="bg-white/80 backdrop-blur-xl px-4 py-2.5 rounded-2xl shadow-lg border border-white/80 flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${selectedElement ? 'bg-blue-500' : 'bg-gray-300'}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-700">
              {selectedElement ? (SECTION_MAP[selectedElement.id]?.label || selectedElement.type) : 'Click any section to edit'}
            </span>
            {selectedElement && <><div className="w-px h-3 bg-gray-200" /><span className="text-[10px] text-gray-400">{currentPreviewPage}</span></>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Editor;