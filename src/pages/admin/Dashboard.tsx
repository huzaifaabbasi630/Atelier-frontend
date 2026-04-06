import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdmin } from '../../context/AdminContext';
import { 
  ShoppingBag, 
  Package, 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight,
  TrendingDown,
  User,
  Mail,
  Phone,
  MapPin,
  X,
  CreditCard,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Order } from '../../types';

const Dashboard: React.FC = () => {
  const { products, orders, updateOrderStatus } = useAdmin();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Real Stats Calculation
  const stats = [
    { 
      label: 'Total Orders', 
      value: orders.length, 
      icon: ShoppingBag, 
      color: 'bg-blue-50 text-blue-600',
      trend: { value: '+12%', isUp: true } 
    },
    { 
      label: 'Confirmed Orders', 
      value: orders.filter(o => o.status === 'Confirmed' || o.status === 'Shipped' || o.status === 'Delivered').length, 
      icon: CheckCircle2, 
      color: 'bg-green-50 text-green-600',
      trend: { value: '+8%', isUp: true } 
    },
    { 
      label: 'Pending Orders', 
      value: orders.filter(o => o.status === 'Pending').length, 
      icon: Clock, 
      color: 'bg-orange-50 text-orange-600',
      trend: { value: orders.filter(o => o.status === 'Pending').length > 0 ? '+New' : 'Zero', isUp: orders.filter(o => o.status === 'Pending').length > 0 } 
    },
    { 
      label: 'Total Products', 
      value: products.length, 
      icon: Package, 
      color: 'bg-indigo-50 text-indigo-600',
      trend: { value: '+5', isUp: true } 
    },
    { 
      label: 'Out of Stock', 
      value: products.filter(p => !p.stock || p.stock === 0).length, 
      icon: AlertCircle, 
      color: 'bg-red-50 text-red-600',
      trend: { value: 'Stable', isUp: true } 
    }
  ];

  const handleConfirmOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'Confirmed');
    setSelectedOrder(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-12">
        {/* Welcome Section */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-serif text-brand-black tracking-tighter">Atelier Overview</h1>
            <p className="text-gray-400 capitalize tracking-[0.2em] font-medium text-xs">Curating your luxury excellence today</p>
          </div>
          <div className="flex bg-white luxury-shadow rounded-2xl p-1.5 border border-gray-100">
            {['1D', '1W', '1M', '1Y'].map((range) => (
              <button 
                key={range}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                  range === '1W' ? 'bg-brand-black text-white shadow-lg' : 'text-gray-400 hover:text-brand-black'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white p-8 rounded-3xl luxury-shadow border border-gray-50 flex flex-col items-center text-center group hover:border-brand-gold/30 transition-all duration-500"
              >
                <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-2">{stat.label}</h3>
                <p className="text-3xl font-serif text-brand-black mb-4">{stat.value}</p>
                <div className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${stat.trend.isUp ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                  {stat.trend.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{stat.trend.value}</span>
                </div>
              </motion.div>
            );
          })}
        </section>

        <section className="grid grid-cols-1 gap-8">
           {/* Detailed Orders List */}
           <div className="bg-white rounded-[2rem] luxury-shadow border border-gray-50 p-10">
            <div className="flex items-center justify-between mb-10">
              <div className="space-y-1">
                <h2 className="text-2xl font-serif text-brand-black">Latest Requests</h2>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Real-time order management</p>
              </div>
            </div>

            <div className="space-y-6">
              {orders.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                   <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-8 h-8 text-gray-200" />
                   </div>
                   <p className="text-gray-400 italic">No orders recorded yet.</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-7 rounded-[1.8rem] bg-gray-50/50 hover:bg-white hover:luxury-shadow border border-transparent transition-all duration-500 group">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[10px] font-bold text-gray-400 border border-gray-100 group-hover:border-brand-gold/20 transition-colors uppercase tracking-widest">
                        #{order.id.split('-')[1]}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 group-hover:text-brand-gold transition-colors">{order.customerName}</h3>
                        <p className="text-[10px] text-gray-400 font-medium tracking-wide flex items-center mt-1">
                          <Mail className="w-3 h-3 mr-2" />
                          {order.customerEmail}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 sm:mt-0 flex items-center justify-between sm:justify-end sm:space-x-10">
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">${order.total.toLocaleString()}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium italic">{order.items.length} Curated Items</p>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span className={`px-5 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase shadow-sm ${
                          order.status === 'Confirmed' ? 'bg-green-500 text-white shadow-green-100' :
                          order.status === 'Pending' ? 'bg-amber-500 text-white shadow-amber-100' :
                          'bg-brand-black text-white'
                        }`}>
                          {order.status}
                        </span>

                        {order.status === 'Pending' && (
                          <button 
                            onClick={() => setSelectedOrder(order)}
                            className="bg-white border border-gray-200 text-brand-black px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:border-brand-gold hover:text-brand-gold transition-all luxury-shadow flex items-center space-x-2"
                          >
                            <User className="w-3 h-3" />
                            <span>Customer Info</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
           </div>
        </section>

        {/* Customer Details Modal */}
        <AnimatePresence>
          {selectedOrder && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={() => setSelectedOrder(null)}
                 className="absolute inset-0 bg-brand-black/40 backdrop-blur-sm"
               />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9, y: 30 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.9, y: 30 }}
                 className="relative bg-white w-full max-w-2xl rounded-[2.5rem] luxury-shadow overflow-hidden"
               >
                 <div className="p-10 border-b border-gray-50 flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-serif">Customer Dossier</h2>
                      <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold italic">Order Reference: {selectedOrder.id}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => handleConfirmOrder(selectedOrder.id)}
                          className="bg-green-500 text-white px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-green-600 transition-all flex items-center space-x-2 shadow-lg shadow-green-100"
                        >
                          <Check className="w-4 h-4" />
                          <span>Confirm Order</span>
                        </button>
                        <button onClick={() => setSelectedOrder(null)} className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                          <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                 </div>

                 <div className="p-10 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <div className="space-y-6">
                          <div className="flex items-start space-x-4">
                             <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                <User className="w-5 h-5 text-slate-400" />
                             </div>
                             <div>
                                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">Full Name</p>
                                <p className="text-sm font-bold text-brand-black">{selectedOrder.customerName}</p>
                             </div>
                          </div>
                          <div className="flex items-start space-x-4">
                             <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Mail className="w-5 h-5 text-slate-400" />
                             </div>
                             <div>
                                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">Email Address</p>
                                <p className="text-sm font-bold text-brand-black">{selectedOrder.customerEmail}</p>
                             </div>
                          </div>
                          <div className="flex items-start space-x-4">
                             <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Phone className="w-5 h-5 text-slate-400" />
                             </div>
                             <div>
                                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">Contact Number</p>
                                <p className="text-sm font-bold text-brand-black">{selectedOrder.phone}</p>
                             </div>
                          </div>
                       </div>

                       <div className="space-y-6">
                          <div className="flex items-start space-x-4">
                             <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-5 h-5 text-slate-400" />
                             </div>
                             <div>
                                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">Shipping Logistics</p>
                                <p className="text-sm font-bold text-brand-black leading-relaxed">{selectedOrder.address}</p>
                                <p className="text-[10px] text-brand-gold font-bold mt-2">Postal Code: {selectedOrder.postalCode}</p>
                             </div>
                          </div>
                          <div className="flex items-start space-x-4">
                             <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                <CreditCard className="w-5 h-5 text-slate-400" />
                             </div>
                             <div>
                                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">Status</p>
                                <span className="text-[10px] font-extrabold text-amber-600 bg-amber-50 px-3 py-1 rounded-lg uppercase tracking-widest">Awaiting Confirmation</span>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="pt-10 border-t border-gray-50">
                       <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-6">Order Contents</p>
                       <div className="space-y-4">
                          {selectedOrder.items.map(item => (
                            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-brand-gold/10 transition-colors">
                               <div className="flex items-center space-x-4">
                                  <div className="w-16 h-16 bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 p-0.5">
                                     <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-[10px]" />
                                  </div>
                                  <div>
                                     <p className="text-[9px] text-brand-gold font-bold uppercase tracking-widest mb-1">{item.category}</p>
                                     <p className="text-xs font-bold text-brand-black">{item.name}</p>
                                     <div className="flex items-center space-x-2 mt-2">
                                        <span className="text-[8px] uppercase tracking-widest bg-white border border-slate-200 px-2 py-0.5 rounded font-bold text-slate-500">
                                           Size: {item.size || 'Standard'}
                                        </span>
                                        <span className="text-[8px] uppercase tracking-widest bg-white border border-slate-200 px-2 py-0.5 rounded font-bold text-slate-500 italic">
                                           {item.color || 'Default'}
                                        </span>
                                        <span className="text-[9px] font-bold text-slate-400">× {item.quantity}</span>
                                     </div>
                                  </div>
                               </div>
                               <p className="text-xs font-bold text-brand-black">${(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
               </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
