import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ClipboardList, 
  Settings, 
  ExternalLink,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout: React.FC<{ children: React.ReactNode; hideNavigation?: boolean }> = ({ children, hideNavigation = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Products', icon: ShoppingBag, path: '/admin/products' },
    { name: 'Orders', icon: ClipboardList, path: '/admin/orders' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-transparent flex">
      {/* Sidebar - Desktop */}
      {!hideNavigation && (
        <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-100 shadow-sm fixed h-full z-40">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif tracking-tighter text-brand-black">ATELIER</Link>
          <span className="text-[10px] bg-brand-gold/10 text-brand-gold px-2 py-0.5 rounded tracking-widest font-medium">ADMIN</span>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-brand-black text-white shadow-lg' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-brand-black'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-50 space-y-4">
          <Link 
            to="/admin/editor"
            className="flex items-center justify-center space-x-2 w-full p-4 bg-brand-gold/10 text-brand-gold hover:bg-brand-gold hover:text-white transition-all duration-300 rounded-xl group"
          >
            <span className="text-xs font-semibold tracking-widest uppercase">Edit Atelier Website</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
          
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-gray-500 hover:text-red-600 transition-colors rounded-xl"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </aside>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 ${!hideNavigation ? 'lg:ml-72' : ''} min-h-screen`}>
        {/* Header - Desktop & Mobile */}
        {!hideNavigation && (
          <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
            <button 
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            <h1 className="text-lg font-semibold text-gray-900 capitalize hidden lg:block">
              {navItems.find(i => i.path === location.pathname)?.name || 'Admin Panel'}
            </h1>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900">{user?.name || 'Administrator'}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Luxury Curator</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-brand-black flex items-center justify-center text-white text-xs font-bold ring-4 ring-gray-50">
                {user?.name?.[0] || 'A'}
              </div>
            </div>
          </header>
        )}

        {/* Dynamic Content */}
        <div className={`${!hideNavigation ? 'p-6 lg:p-10 max-w-7xl mx-auto' : 'h-full w-full'}`}>
          {children}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <aside 
            className="w-72 bg-white h-full flex flex-col shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <Link to="/" className="text-2xl font-serif text-brand-black">ATELIER</Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <nav className="flex-1 p-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      isActive ? 'bg-brand-black text-white' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="p-6 border-t border-gray-50">
               <button 
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 w-full text-red-600 transition-colors font-medium"
              >
                <LogOut className="w-5 h-5" />
                <span>Log out</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
