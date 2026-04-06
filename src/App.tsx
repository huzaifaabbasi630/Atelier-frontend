import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Shipping from './pages/Shipping';
import FAQ from './pages/FAQ';
import Returns from './pages/Returns';
import Privacy from './pages/Privacy';
import Wishlist from './pages/Wishlist';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import LoginRequired from './pages/LoginRequired';
import LogoutConfirm from './pages/LogoutConfirm';
import OrderSuccess from './pages/OrderSuccess';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';

import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';
import { AnimatePresence } from 'motion/react';
import ThankYouPage from './pages/ThankYouPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminSettings from './pages/admin/Settings';
import WebsiteEditor from './pages/admin/Editor';

const AppRoutes = () => {
  const location = useLocation();
  const hideChrome = location.pathname.startsWith('/admin');

  return (
    <>
      {!hideChrome && <Navbar />}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login-required" element={<LoginRequired />} />
            <Route path="/logout-confirm" element={<LogoutConfirm />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/editor" element={<WebsiteEditor />} />

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!hideChrome && <Footer />}
    </>
  );
};

export default function App() {
  return (
    <Router>
        <AuthProvider>
          <AdminProvider>
            <CartProvider>
              <WishlistProvider>
                <div className="flex flex-col min-h-screen overflow-x-hidden">
                  <ScrollToTop />
                  <AppRoutes />
                </div>
              </WishlistProvider>
            </CartProvider>
          </AdminProvider>
        </AuthProvider>
    </Router>
  );
}
