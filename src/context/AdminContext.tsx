import React, { createContext, useContext, useState } from 'react';
import { Product, Order } from '../types';
import { products as defaultProducts } from '../data/products';

const defaultOrders: Order[] = [
  {
    id: 'ORD-7721',
    customerName: 'Marcus Aurelius',
    customerEmail: 'marcus@romanempire.com',
    address: 'Via Appia Antica, 1, Rome, Italy',
    phone: '+39 02 1234 5678',
    postalCode: '00100',
    items: [
      { id: '1', name: 'Silk Tailored Blazer', category: 'Suits', price: 1200, quantity: 1, color: 'Midnight Black', size: 'Medium', image: 'https://images.unsplash.com/photo-1594932224491-99419519cd1d?q=80&w=200' }
    ],
    total: 1200,
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  },
  {
    id: 'ORD-8842',
    customerName: 'Isabella d\'Este',
    customerEmail: 'isabella@mantua.it',
    address: 'Castello di San Giorgio, Mantua, Italy',
    phone: '+39 03 1234 5678',
    postalCode: '46100',
    items: [
      { id: '2', name: 'Velveteen Evening Bag', category: 'Handbags', price: 850, quantity: 1, color: 'Tuscany Red', size: 'One Size', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=200' }
    ],
    total: 850,
    status: 'Pending',
    createdAt: new Date().toISOString()
  }
];

export interface AdminConfig {
  logoText: string;
  logoImage: string;
  heroTagline: string;
  heroHeading: string;
  heroDescription: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroImage: string;
  categoriesTitle: string;
  categoriesSubtitle: string;
  catMenLabel: string;
  catWomenLabel: string;
  catKidsLabel: string;
  saleText: string;
  saleDescription: string;
  saleBtnText: string;
  saleCountdownLabel: string;
  newArrivalsTagline: string;
  newArrivalsHeading: string;
  newArrivalsLinkText: string;
  reviewsTagline: string;
  reviewsHeading: string;
  footerText: string;
  footerDescription: string;
  contactEmail: string;
  contactPhone: string;
  aboutSince: string;
  aboutTitle: string;
  aboutSection1Heading: string;
  aboutSection1Para1: string;
  aboutSection1Para2: string;
  aboutSection2Heading: string;
  aboutSection2Para1: string;
  aboutSection2Para2: string;
  aboutYears: string;
  aboutClients: string;
  aboutVisionQuote: string;
  aboutFounderName: string;
  aboutFounderTitle: string;
  contactPageTitle: string;
  contactAddress: string;
  contactHours: string;
  contactSupportEmail: string;
  contactFormHeading: string;
  contactMapLabel: string;
  shopHeading: string;
  shopTagline: string;
  shopCollectionLabel: string;
  loginHeading: string;
  loginSubtext: string;
  signupHeading: string;
  signupSubtext: string;
  cartEmptyHeading: string;
  cartEmptyMessage: string;
  cartEmptyBtnText: string;
  cartSuccessHeading: string;
  cartFreeShipping: string;
  cartReturnsLabel: string;
  checkoutTitle: string;
  checkoutDeliveryLabel: string;
  checkoutCartLabel: string;
  checkoutEmptyMsg: string;
  checkoutPlaceOrderBtn: string;
  wishlistTagline: string;
  wishlistTitle: string;
  wishlistDescription: string;
  wishlistEmptyMsg: string;
  wishlistShopBtn: string;
  returnsLabel: string;
  returnsTitle: string;
  returnsDescription: string;
  returnsDays: string;
  refundTimeline: string;
  privacyLabel: string;
  privacyTitle: string;
  privacyDescription: string;
  privacyEmail: string;
  shippingLabel: string;
  shippingTitle: string;
  shippingDescription: string;
  shippingStandardTitle: string;
  shippingExpressTitle: string;
  shippingIntlTitle: string;
  shippingProcessTime: string;
  shippingStdDelivery: string;
  shippingExpDelivery: string;
  faqTitle: string;
  faqSubtitle: string;
}

export interface AdminContextType {
  config: AdminConfig;
  updateConfig: (newConfig: Partial<AdminConfig>) => void;
  products: Product[];
  updateProducts: (products: Product[]) => void;
  orders: Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addOrder: (order: Order) => void;
}

const defaultConfig: AdminConfig = {
  logoText: 'Atelier',
  logoImage: '',
  heroTagline: 'Spring Summer 2026',
  heroHeading: 'The Luxury Manifesto',
  heroDescription: 'Discover our curated selection of elevated essentials — where craftsmanship meets contemporary elegance.',
  heroCtaText: 'Shop the Collection',
  heroCtaLink: '/shop',
  heroImage: '',
  categoriesTitle: 'Explore Atelier',
  categoriesSubtitle: 'Men · Women · Kids',
  catMenLabel: 'Men',
  catWomenLabel: 'Women',
  catKidsLabel: 'Kids Wear',
  saleText: 'Up to 50% OFF',
  saleDescription: 'Discover curated essentials from our latest season with exclusive savings on select styles.',
  saleBtnText: 'Browse Sale',
  saleCountdownLabel: 'Sale ends in',
  newArrivalsTagline: 'New Arrivals',
  newArrivalsHeading: 'Just Landed',
  newArrivalsLinkText: 'View all new arrivals',
  reviewsTagline: 'User Reviews',
  reviewsHeading: 'Share your Atelier experience',
  footerText: `© ${new Date().getFullYear()} Atelier. All Rights Reserved.`,
  footerDescription: 'A premium fashion house crafting elevated essentials and signature pieces for the modern wardrobe.',
  contactEmail: 'contact@atelierfashion.com',
  contactPhone: '+39 02 1234 5678',
  aboutSince: 'Since 1994',
  aboutTitle: 'Our Story',
  aboutSection1Heading: 'Crafted with Passion and Precision',
  aboutSection1Para1: 'Atelier was born out of a desire to redefine luxury for the modern woman. Founded in the heart of Milan, our journey began with a single vision: to create pieces that are not just accessories, but extensions of a woman\'s personality.',
  aboutSection1Para2: 'Every Atelier design is a testament to the art of Italian craftsmanship. We source only the finest leathers from sustainable tanneries and work with master artisans who have dedicated their lives to the craft.',
  aboutSection2Heading: 'The Atelier Aesthetic',
  aboutSection2Para1: 'Our design philosophy is rooted in minimalism. We believe that true elegance lies in simplicity. By stripping away the unnecessary, we highlight the beauty of form, the quality of materials, and the precision of every stitch.',
  aboutSection2Para2: 'Whether it\'s a structured tote for the boardroom or a delicate clutch for an evening gala, an Atelier piece is designed to be timeless. We don\'t follow trends; we create pieces that will be cherished for generations.',
  aboutYears: '30+',
  aboutClients: '150k',
  aboutVisionQuote: 'To inspire confidence and elegance in every woman, while leading the way in sustainable luxury craftsmanship.',
  aboutFounderName: 'Alessandra Moretti',
  aboutFounderTitle: 'Founder & Creative Director',
  contactPageTitle: 'Contact Us',
  contactAddress: '123 Luxury Ave, Milan, Italy',
  contactHours: 'Mon - Sat: 10:00 AM - 8:00 PM',
  contactSupportEmail: 'support@atelierfashion.com',
  contactFormHeading: 'Send a Message',
  contactMapLabel: 'Visit Our Flagship Store',
  shopHeading: 'Shop Atelier',
  shopTagline: 'Handpicked styles for refined wardrobes',
  shopCollectionLabel: 'Collection',
  loginHeading: 'Welcome Back',
  loginSubtext: 'Enter your details to access your account',
  signupHeading: 'Create Account',
  signupSubtext: 'Join the Atelier circle for exclusive benefits',
  cartEmptyHeading: 'Your Cart is Empty',
  cartEmptyMessage: "It looks like you haven't added anything to your cart yet. Explore our latest collections and find your perfect companion.",
  cartEmptyBtnText: 'Start Shopping',
  cartSuccessHeading: 'Order Confirmed',
  cartFreeShipping: 'Complimentary Express Shipping',
  cartReturnsLabel: '30-Day Complimentary Returns',
  checkoutTitle: 'Complete your order',
  checkoutDeliveryLabel: 'Shipping Details',
  checkoutCartLabel: 'Your Bag',
  checkoutEmptyMsg: 'Add products to your bag and return here to complete checkout.',
  checkoutPlaceOrderBtn: 'Place Order',
  wishlistTagline: 'Your Wishlist',
  wishlistTitle: 'Saved Favorites',
  wishlistDescription: "Review items you've saved for later and manage your curated selection.",
  wishlistEmptyMsg: 'Your wishlist is empty',
  wishlistShopBtn: 'Continue Shopping',
  returnsLabel: 'Returns & Exchanges',
  returnsTitle: 'Easy Returns, Refined Experience',
  returnsDescription: 'A clear and elegant process for returns and exchanges, designed to keep your Atelier experience as seamless as our collection.',
  returnsDays: '30',
  refundTimeline: '5-7 business days',
  privacyLabel: 'Policy',
  privacyTitle: 'Privacy Policy',
  privacyDescription: 'Our privacy policy is designed to be clear, concise, and reassuring. We protect your data with respect, transparency, and trust.',
  privacyEmail: 'privacy@atelier.com',
  shippingLabel: 'Shipping',
  shippingTitle: 'Shipping Policy',
  shippingDescription: 'Everything you need to know about processing, delivery, tracking, and support for your Atelier shipment.',
  shippingStandardTitle: 'Standard',
  shippingExpressTitle: 'Express',
  shippingIntlTitle: 'International',
  shippingProcessTime: '1-2 business days',
  shippingStdDelivery: '3-5 business days',
  shippingExpDelivery: '1-2 business days',
  faqTitle: 'Frequently Asked Questions',
  faqSubtitle: 'Find answers to common questions about Atelier.',
};

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<AdminConfig>(() => {
    const saved = localStorage.getItem('atelier_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse atelier_config', e);
      }
    }
    return defaultConfig;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('atelier_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse atelier_products', e);
      }
    }
    return defaultProducts;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('atelier_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse atelier_orders', e);
      }
    }
    return defaultOrders;
  });

  const updateConfig = (newConfig: Partial<AdminConfig>) => {
    setConfig(prev => {
      const updated = { ...prev, ...newConfig };
      localStorage.setItem('atelier_config', JSON.stringify(updated));
      return updated;
    });
  };

  const updateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('atelier_products', JSON.stringify(newProducts));
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => {
      // Re-read from localStorage to get the most up-to-date state (prev might be stale in other tabs)
      const latest = JSON.parse(localStorage.getItem('atelier_orders') || '[]');
      const currentList = latest.length > 0 ? latest : prev;
      
      const updated = currentList.map((o: Order) => o.id === orderId ? { ...o, status } : o);
      localStorage.setItem('atelier_orders', JSON.stringify(updated));
      return updated;
    });
  };

  const addOrder = (order: Order) => {
    setOrders(prev => {
      // Re-read from localStorage to ensure we don't lose updates from other tabs
      const latest = JSON.parse(localStorage.getItem('atelier_orders') || '[]');
      const currentList = latest.length > 0 ? latest : prev;
      
      const updated = [order, ...currentList];
      localStorage.setItem('atelier_orders', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AdminContext.Provider 
      value={{ 
        config, 
        updateConfig, 
        products, 
        updateProducts, 
        orders, 
        updateOrderStatus,
        addOrder
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};