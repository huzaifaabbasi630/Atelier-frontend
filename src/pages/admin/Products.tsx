import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdmin } from '../../context/AdminContext';
import { Product } from '../../types';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  X, 
  Upload,
  Check,
  Package,
  DollarSign,
  Tag,
  Layers,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Products: React.FC = () => {
  const { products, updateProducts } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'Handbags',
    description: '',
    images: [''],
    stock: 0,
    featured: false,
    rating: 5,
    reviews: []
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: 0,
        category: 'Handbags',
        description: '',
        images: [''],
        stock: 0,
        featured: false,
        rating: 5,
        reviews: []
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...(formData.images || [])];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setFormData(prev => ({ ...prev, images: [...(prev.images || []), ''] }));
  };

  const removeImageField = (index: number) => {
    const newImages = (formData.images || []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, images: newImages.length ? newImages : [''] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id ? { ...p, ...formData } as Product : p
      );
      updateProducts(updatedProducts);
    } else {
      const newProduct: Product = {
        ...formData,
        id: `PROD-${Math.floor(Math.random() * 10000)}`,
        rating: formData.rating || 5,
        reviews: formData.reviews || []
      } as Product;
      updateProducts([newProduct, ...products]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this exquisite piece from your collection?')) {
      updateProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-10">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-brand-gold">
              <Package className="w-5 h-5" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Inventory Management</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-brand-black tracking-tighter">Product Registry</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-gold transition-colors" />
              <input 
                type="text" 
                placeholder="Search collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl luxury-shadow focus:outline-none focus:border-brand-gold/30 w-full md:w-80 text-sm transition-all"
              />
            </div>
            <button 
              onClick={() => handleOpenModal()}
              className="flex items-center space-x-3 px-8 py-4 bg-brand-black text-white rounded-2xl hover:bg-brand-gold transition-all duration-500 shadow-xl group"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Add New Piece</span>
            </button>
          </div>
        </header>

        {/* Product List */}
        <section className="bg-white rounded-[2.5rem] luxury-shadow border border-gray-50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product Details</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Category</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Price</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">In Stock</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence mode='popLayout'>
                  {filteredProducts.map((product) => (
                    <motion.tr 
                      key={product.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-6">
                          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 group-hover:scale-105 transition-transform duration-500 border border-gray-100 shadow-sm">
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                            {product.featured && (
                              <div className="absolute top-1 right-1 bg-brand-gold text-white p-1 rounded-full">
                                <Star className="w-2 h-2 fill-current" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-brand-black mb-1 truncate">{product.name}</p>
                            <p className="text-[10px] text-gray-400 font-medium tracking-wide">ID: {product.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold tracking-widest uppercase">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="text-sm font-bold text-brand-black">${product.price}</span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="flex flex-col items-center">
                          <span className={`text-sm font-bold ${product.stock && product.stock > 10 ? 'text-brand-black' : product.stock && product.stock > 0 ? 'text-amber-600' : 'text-red-500'}`}>
                            {product.stock || 0}
                          </span>
                          <div className="w-16 h-1 bg-gray-100 rounded-full mt-2 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${
                                product.stock && product.stock > 20 ? 'bg-green-500' : product.stock && product.stock > 5 ? 'bg-amber-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.min(((product.stock || 0) / 50) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${product.stock && product.stock > 0 ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]'}`} />
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            {product.stock && product.stock > 0 ? 'Available' : 'Out of Stock'}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end space-x-3">
                          <button 
                            onClick={() => {
                              const newStock = (product.stock || 0) > 0 ? 0 : 50;
                              const updatedProducts = products.map(p => 
                                p.id === product.id ? { ...p, stock: newStock } : p
                              );
                              updateProducts(updatedProducts);
                            }}
                            className={`p-3 border rounded-xl luxury-shadow transition-all group/btn ${product.stock && product.stock > 0 ? 'bg-white border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-100' : 'bg-red-50 border-red-100 text-red-500 hover:text-green-500 hover:border-green-100 hover:bg-green-50'}`}
                            title={product.stock && product.stock > 0 ? 'Set Out of Stock' : 'Replenish Stock'}
                          >
                            <Package className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                          </button>
                          <button 
                            onClick={() => handleOpenModal(product)}
                            className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-brand-gold hover:border-brand-gold/30 luxury-shadow transition-all group/btn"
                          >
                            <Edit2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-100 luxury-shadow transition-all group/btn"
                          >
                            <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-8 py-32 text-center">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center">
                          <Search className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-serif text-gray-400 italic">No pieces found in the collection</h3>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Adjust your search to reveal hidden gems</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Modal Overlay */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseModal}
                className="absolute inset-0 bg-brand-black/40 backdrop-blur-sm"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[3rem] luxury-shadow flex flex-col"
              >
                {/* Modal Header */}
                <div className="px-10 py-8 border-b border-gray-50 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-10">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-serif text-brand-black">
                      {editingProduct ? 'Curate Piece' : 'Add New Creation'}
                    </h2>
                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">Refining the Atelier Collection</p>
                  </div>
                  <button onClick={handleCloseModal} className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-brand-black transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Basic Info */}
                    <div className="space-y-8">
                      <div className="space-y-6">
                        <label className="block">
                          <div className="flex items-center space-x-2 text-brand-gold mb-3">
                            <Tag className="w-3 h-3" />
                            <span className="text-[10px] uppercase tracking-widest font-bold">Piece Name</span>
                          </div>
                          <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g. Silk Reverie Evening Bag"
                            className="w-full bg-gray-50 border-transparent border focus:border-brand-gold/20 focus:bg-white rounded-2xl px-6 py-4 text-sm outline-none transition-all"
                          />
                        </label>

                        <div className="grid grid-cols-2 gap-6">
                          <label className="block">
                            <div className="flex items-center space-x-2 text-brand-gold mb-3">
                              <DollarSign className="w-3 h-3" />
                              <span className="text-[10px] uppercase tracking-widest font-bold">Price</span>
                            </div>
                            <input 
                              type="number" 
                              name="price"
                              value={formData.price}
                              onChange={handleInputChange}
                              required
                              className="w-full bg-gray-50 border-transparent border focus:border-brand-gold/20 focus:bg-white rounded-2xl px-6 py-4 text-sm outline-none transition-all"
                            />
                          </label>
                          <label className="block">
                            <div className="flex items-center space-x-2 text-brand-gold mb-3">
                              <Package className="w-3 h-3" />
                              <span className="text-[10px] uppercase tracking-widest font-bold">Stock Count</span>
                            </div>
                            <input 
                              type="number" 
                              name="stock"
                              value={formData.stock}
                              onChange={handleInputChange}
                              required
                              className="w-full bg-gray-50 border-transparent border focus:border-brand-gold/20 focus:bg-white rounded-2xl px-6 py-4 text-sm outline-none transition-all"
                            />
                          </label>
                        </div>

                        <label className="block">
                          <div className="flex items-center space-x-2 text-brand-gold mb-3">
                            <Layers className="w-3 h-3" />
                            <span className="text-[10px] uppercase tracking-widest font-bold">Category</span>
                          </div>
                          <select 
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full bg-gray-50 border-transparent border focus:border-brand-gold/20 focus:bg-white rounded-2xl px-6 py-4 text-sm outline-none transition-all appearance-none cursor-pointer"
                          >
                            <option value="Handbags">Handbags</option>
                            <option value="Footwear">Footwear</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Apparel">Apparel</option>
                            <option value="Limited Edition">Limited Edition</option>
                          </select>
                        </label>

                        <label className="block">
                          <div className="flex items-center space-x-2 text-brand-gold mb-3">
                            <Edit2 className="w-3 h-3" />
                            <span className="text-[10px] uppercase tracking-widest font-bold">Narrative Description</span>
                          </div>
                          <textarea 
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            rows={5}
                            placeholder="Describe the craftsmanship and soul of this piece..."
                            className="w-full bg-gray-50 border-transparent border focus:border-brand-gold/20 focus:bg-white rounded-2xl px-6 py-4 text-sm outline-none transition-all resize-none"
                          />
                        </label>

                        <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl">
                           <div className="space-y-1">
                              <p className="text-xs font-bold text-brand-black uppercase tracking-wider">Highlight Piece</p>
                              <p className="text-[10px] text-gray-400">Feature this creation on the main gallery</p>
                           </div>
                           <button 
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}
                            className={`w-14 h-8 rounded-full p-1 transition-all duration-500 flex items-center ${formData.featured ? 'bg-brand-gold' : 'bg-gray-200'}`}
                           >
                              <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-all duration-500 ${formData.featured ? 'translate-x-6' : 'translate-x-0'}`} />
                           </button>
                        </div>
                      </div>
                    </div>

                    {/* Image Management */}
                    <div className="space-y-8">
                       <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2 text-brand-gold">
                            <Upload className="w-3 h-3" />
                            <span className="text-[10px] uppercase tracking-widest font-bold">Visual Assets</span>
                          </div>
                          <button 
                            type="button"
                            onClick={addImageField}
                            className="text-[10px] font-bold text-brand-gold hover:text-brand-black transition-colors uppercase tracking-widest flex items-center space-x-2"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add View</span>
                          </button>
                       </div>
                       
                       <div className="space-y-6">
                         {formData.images?.map((img, idx) => (
                           <div key={idx} className="flex items-start space-x-4 group">
                             <div className="flex-1 space-y-3">
                               <input 
                                 type="url" 
                                 value={img}
                                 onChange={(e) => handleImageChange(idx, e.target.value)}
                                 placeholder="https://images.unsplash.com/..."
                                 className="w-full bg-gray-50 border-transparent border focus:border-brand-gold/20 focus:bg-white rounded-2xl px-6 py-4 text-sm outline-none transition-all"
                               />
                               {img && (
                                 <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                                   <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                                 </div>
                               )}
                             </div>
                             {formData.images!.length > 1 && (
                               <button 
                                 type="button"
                                 onClick={() => removeImageField(idx)}
                                 className="p-3 bg-red-50 text-red-400 rounded-xl hover:bg-red-100 hover:text-red-600 transition-all"
                               >
                                 <X className="w-4 h-4" />
                               </button>
                             )}
                           </div>
                         ))}
                       </div>

                       <div className="p-8 bg-brand-gold/5 rounded-[2rem] border border-brand-gold/10">
                          <div className="flex space-x-4">
                             <div className="w-10 h-10 bg-brand-gold/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                               <Star className="w-5 h-5 text-brand-gold" />
                             </div>
                             <div>
                                <h4 className="text-xs font-bold text-brand-black uppercase tracking-wider mb-1">Curation Tip</h4>
                                <p className="text-[10px] text-gray-500 leading-relaxed">
                                  Luxury collections thrive on visual consistency. Use high-resolution, professionally shot imagery with clean, architectural backgrounds.
                                </p>
                             </div>
                          </div>
                       </div>
                    </div>
                  </form>
                </div>

                {/* Modal Footer */}
                <div className="p-10 border-t border-gray-50 bg-gray-50/50 backdrop-blur-md flex items-center justify-end space-x-6">
                  <button 
                    onClick={handleCloseModal}
                    className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-brand-black transition-colors"
                  >
                    Discard Changes
                  </button>
                  <button 
                    onClick={handleSubmit}
                    className="flex items-center space-x-3 px-10 py-4 bg-brand-black text-white rounded-2xl hover:bg-brand-gold transition-all duration-500 shadow-xl group"
                  >
                    <Check className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {editingProduct ? 'Update Registry' : 'Confirm Addition'}
                    </span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default Products;
