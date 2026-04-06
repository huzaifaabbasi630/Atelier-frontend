import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdmin } from '../../context/AdminContext';
import { Shield, Bell, Database, Mail, Phone, Lock, Save } from 'lucide-react';
import { motion } from 'motion/react';

const Settings: React.FC = () => {
  const { config, updateConfig } = useAdmin();

  return (
    <AdminLayout>
      <div className="space-y-12">
        <header className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-serif text-brand-black tracking-tighter">System Configuration</h1>
          <p className="text-gray-400 capitalize tracking-[0.2em] font-medium text-xs">Manage your luxury platform protocols</p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Brand Identity */}
          <div className="bg-white p-10 rounded-[2.5rem] luxury-shadow border border-gray-50 flex flex-col h-full">
            <div className="flex items-center space-x-4 mb-10">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif">Brand Protocol</h2>
            </div>

            <div className="space-y-8 flex-1">
              <div className="space-y-3">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Atelier Logo Signature</label>
                <input 
                  type="text" 
                  value={config.logoText}
                  onChange={(e) => updateConfig({ logoText: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-brand-gold/10 transition-all outline-none"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Contact Manifesto</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input 
                      type="text" 
                      value={config.contactEmail}
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 border-transparent rounded-2xl text-sm outline-none"
                      disabled
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input 
                      type="text" 
                      value={config.contactPhone}
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 border-transparent rounded-2xl text-sm outline-none"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Infrastructure */}
          <div className="bg-brand-black p-10 rounded-[2.5rem] shadow-2xl text-white flex flex-col h-full">
            <div className="flex items-center space-x-4 mb-10">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand-gold backdrop-blur-md">
                <Database className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif">Security Archives</h2>
            </div>

            <div className="space-y-6 flex-1">
              {[
                { title: 'Data Persistence', status: 'Active (LocalStorage)', icon: Database },
                { title: 'Admin Encryption', status: 'JWT Shield v4', icon: Lock },
                { title: 'Cloud Sync', status: 'Synchronized', icon: Bell },
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group cursor-pointer hover:bg-brand-gold/10 transition-all">
                  <div className="flex items-center space-x-5">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/50 group-hover:text-brand-gold transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">{item.title}</h4>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest">{item.status}</p>
                    </div>
                  </div>
                  <Save className="w-4 h-4 text-white/20 group-hover:text-brand-gold transition-all" />
                </div>
              ))}
            </div>

            <button className="mt-10 w-full py-5 bg-white text-brand-black rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-white transition-all duration-500 shadow-xl">
              Sync All Repositories
            </button>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default Settings;
