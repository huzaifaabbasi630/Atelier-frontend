import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdmin } from '../../context/AdminContext';
import { 
  Search, 
  ChevronRight, 
  MoreVertical, 
  Package, 
  MapPin, 
  User, 
  ShoppingBag, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Eye,
  ArrowUpDown,
  Filter,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Order } from '../../types';

const Orders: React.FC = () => {
  const { orders, updateOrderStatus } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'All') return matchesSearch;
    if (statusFilter === 'Pending') return matchesSearch && o.status === 'Pending';
    if (statusFilter === 'Completed') return matchesSearch && (o.status === 'Delivered');
    if (statusFilter === 'Cancelled') return matchesSearch && o.status === 'Cancelled';
    return matchesSearch;
  });

  const getStatusColor = (status: Order['status']) => {
    switch(status) {
       case 'Pending': return 'bg-amber-500/10 text-amber-600 border-amber-200';
       case 'Confirmed': return 'bg-blue-500/10 text-blue-600 border-blue-200';
       case 'Shipped': return 'bg-indigo-500/10 text-indigo-600 border-indigo-200';
       case 'Delivered': return 'bg-green-500/10 text-green-600 border-green-200';
       case 'Cancelled': return 'bg-red-500/10 text-red-600 border-red-200';
       default: return 'bg-gray-100 text-gray-500';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch(status) {
       case 'Pending': return Clock;
       case 'Confirmed': return CheckCircle2;
       case 'Shipped': return Truck;
       case 'Delivered': return CheckCircle2;
       case 'Cancelled': return X;
       default: return Package;
    }
  };

  return (
    <AdminLayout>
       <div className="space-y-10">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
               <h1 className="text-5xl font-serif text-brand-black tracking-tighter">Order Registry</h1>
               <p className="text-gray-400 capitalize tracking-[0.2em] text-[10px] font-bold">Managing your luxury requests</p>
            </div>
            <div className="flex bg-white luxury-shadow rounded-2xl p-1.5 border border-gray-100">
               {['All', 'Pending', 'Completed', 'Cancelled'].map((tab) => (
                 <button 
                   key={tab}
                   onClick={() => setStatusFilter(tab)}
                   className={`px-8 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${
                     tab === statusFilter ? 'bg-brand-black text-white shadow-lg' : 'text-gray-400 hover:text-brand-black'
                   }`}
                 >
                   {tab}
                 </button>
               ))}
            </div>
          </header>

          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-gold transition-colors" />
            <input 
              type="text" 
              placeholder="Search registry by customer ID or name..." 
              className="w-full pl-16 pr-8 py-5 bg-white border border-gray-100 luxury-shadow rounded-[1.5rem] outline-none text-sm focus:ring-4 focus:ring-brand-gold/5 transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-[2.5rem] luxury-shadow border border-gray-50 overflow-hidden">
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr className="border-b border-gray-50">
                     <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Request ID</th>
                     <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Patron</th>
                     <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Value</th>
                     <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                     <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                   {filteredOrders.map((order) => {
                     const StatusIcon = getStatusIcon(order.status);
                     return (
                       <tr key={order.id} className="group hover:bg-gray-50/50 transition-colors">
                         <td className="px-10 py-8">
                           <div className="inline-flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                                 #
                              </div>
                              <span className="text-sm font-bold text-gray-900">{order.id}</span>
                           </div>
                         </td>
                         <td className="px-10 py-8">
                           <div className="flex items-center space-x-4">
                             <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-bold border border-indigo-100 shadow-sm">
                                {order.customerName[0]}
                             </div>
                             <div>
                               <p className="text-sm font-bold text-gray-900">{order.customerName}</p>
                               <p className="text-[10px] text-gray-400 font-medium tracking-wide">{order.customerEmail}</p>
                             </div>
                           </div>
                         </td>
                         <td className="px-10 py-8">
                           <p className="text-sm font-bold text-gray-900">${order.total.toLocaleString()}</p>
                           <p className="text-[10px] text-gray-400 font-medium">{order.items.length} Piece(s)</p>
                         </td>
                         <td className="px-10 py-8">
                            <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                               <StatusIcon className="w-3.5 h-3.5" />
                               <span>{order.status}</span>
                            </span>
                         </td>
                         <td className="px-10 py-8">
                            <div className="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button 
                                 onClick={() => setSelectedOrder(order)}
                                 className="p-3 bg-white border border-gray-100 rounded-xl text-gray-500 hover:text-brand-black hover:border-brand-gold transition-all shadow-sm"
                               >
                                 <Eye className="w-4 h-4" />
                               </button>
                               <div className="relative group/menu">
                                 <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-500 hover:bg-gray-100 transition-all shadow-sm">
                                   <MoreVertical className="w-4 h-4" />
                                 </button>
                                 <div className="absolute right-0 top-full mt-2 w-48 bg-white luxury-shadow rounded-2xl p-2 border border-gray-100 hidden group-hover/menu:block z-10 animate-in fade-in slide-in-from-top-4 duration-300">
                                   {['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                                     <button 
                                       key={status}
                                       onClick={() => updateOrderStatus(order.id, status as any)}
                                       className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-brand-black transition-all"
                                     >
                                       <span>Mark as {status}</span>
                                     </button>
                                   ))}
                                 </div>
                               </div>
                            </div>
                         </td>
                       </tr>
                     );
                   })}
                 </tbody>
               </table>
             </div>
          </div>
       </div>

       {/* Order Details Modal */}
       <AnimatePresence>
          {selectedOrder && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-black/40 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                className="bg-white w-full max-w-3xl overflow-hidden rounded-[3rem] shadow-2xl relative"
              >
                <div className="absolute top-8 right-8 z-10">
                  <button 
                    onClick={() => setSelectedOrder(null)} 
                    className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-brand-black transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-10 lg:p-14">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
                     <div>
                       <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Registry Request #{selectedOrder.id}</span>
                       <h2 className="text-4xl font-serif text-brand-black mt-2">Request Details</h2>
                     </div>
                     <div className={`px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest border shadow-sm ${getStatusColor(selectedOrder.status)}`}>
                       Current Status: {selectedOrder.status}
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                     <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                           <User className="w-5 h-5 text-brand-gold shrink-0 mt-1" />
                           <div>
                              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Patron Information</p>
                              <p className="text-sm font-bold text-gray-900">{selectedOrder.customerName}</p>
                              <p className="text-sm text-gray-500 font-medium">{selectedOrder.customerEmail}</p>
                           </div>
                        </div>
                        <div className="flex items-start space-x-4">
                           <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-1" />
                           <div>
                              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Delivery Destination</p>
                              <p className="text-sm font-medium text-gray-600 leading-relaxed">{selectedOrder.address}</p>
                              <p className="text-sm font-medium text-gray-600 mt-1">{selectedOrder.postalCode}</p>
                              <p className="text-sm font-medium text-gray-600 mt-1">{selectedOrder.phone}</p>
                           </div>
                        </div>
                     </div>
                     <div className="bg-gray-50 rounded-[2rem] p-8 space-y-4 shadow-inner">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-4">Registry Summary</p>
                        <div className="flex justify-between items-center text-sm">
                           <span className="text-gray-500 font-medium">Subtotal</span>
                           <span className="text-gray-900 font-bold">${selectedOrder.total}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                           <span className="text-gray-500 font-medium">White Glove Shipping</span>
                           <span className="text-gray-900 font-bold">Complimentary</span>
                        </div>
                        <div className="pt-4 border-t border-gray-200 flex justify-between items-center text-xl font-serif">
                           <span className="text-brand-black">Total Value</span>
                           <span className="text-brand-black">${selectedOrder.total}</span>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4 subtle-scrollbar">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Request Manifesto</p>
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-6 p-4 rounded-2xl border border-gray-100 bg-white luxury-shadow">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 shadow-sm border border-gray-50">
                           <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                           <h4 className="text-sm font-bold text-gray-900">{item.name}</h4>
                           <div className="mt-2 space-y-1">
                             {item.color && <p className="text-[10px] text-gray-500 font-medium">Color: <span className="text-gray-700 font-bold">{item.color}</span></p>}
                             {item.size && <p className="text-[10px] text-gray-500 font-medium">Size: <span className="text-gray-700 font-bold">{item.size}</span></p>}
                             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Quantity: {item.quantity}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="text-sm font-bold text-gray-900">${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
       </AnimatePresence>
    </AdminLayout>
  );
};

export default Orders;
