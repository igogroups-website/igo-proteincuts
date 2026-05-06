import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Search, 
  Mail, 
  Phone, 
  MapPin, 
  Star,
  ChevronRight,
  Filter,
  Download,
  IndianRupee
} from 'lucide-react';

const CustomerManagement = () => {
  const customers = [
    { id: 1, name: 'Arun Kumar', email: 'arun.k@gmail.com', orders: 12, totalSpend: '₹15,400', lastOrder: '2 days ago', status: 'VIP' },
    { id: 2, name: 'Priya Dharshini', email: 'priya.d@outlook.com', orders: 8, totalSpend: '₹9,800', lastOrder: '5 days ago', status: 'Regular' },
    { id: 3, name: 'Rajesh V', email: 'rajesh.v@yahoo.com', orders: 24, totalSpend: '₹42,100', lastOrder: '1 day ago', status: 'Diamond' },
    { id: 4, name: 'Meera Bai', email: 'meera.b@gmail.com', orders: 3, totalSpend: '₹2,500', lastOrder: '1 month ago', status: 'New' },
    { id: 5, name: 'Suresh Raina', email: 'suresh.r@msn.com', orders: 15, totalSpend: '₹18,900', lastOrder: '1 week ago', status: 'VIP' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800 text-display">Customer Intelligence</h1>
          <p className="text-neutral-500 text-sm">Monitor your user base and their engagement levels.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-all">
            <Download className="w-4 h-4" />
            Export Segments
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Customers', value: '1,284', change: '+12%', icon: Users, color: 'text-igo-green' },
          { label: 'Active This Month', value: '842', change: '+5%', icon: Star, color: 'text-igo-gold' },
          { label: 'Avg. Lifetime Value', value: '₹14,500', change: '+8%', icon: IndianRupee, color: 'text-blue-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
            <div className={`p-3 rounded-2xl bg-neutral-50 inline-block mb-4 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                <h4 className="text-2xl font-bold mt-1 text-neutral-800">{stat.value}</h4>
              </div>
              <span className="text-green-500 text-xs font-bold">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Search & List */}
      <div className="bg-white rounded-[32px] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search by name, email or phone..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-igo-green/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-neutral-50 text-neutral-600 rounded-xl text-xs font-bold">
              <Filter className="w-3.5 h-3.5" />
              Status: All
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-neutral-50/50 text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Orders</th>
                <th className="px-6 py-4">Total Spend</th>
                <th className="px-6 py-4">Last Activity</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-neutral-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-sm font-bold text-neutral-500">
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-neutral-800">{c.name}</p>
                        <p className="text-[10px] text-neutral-400 font-medium">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                      c.status === 'Diamond' ? 'bg-purple-100 text-purple-600' :
                      c.status === 'VIP' ? 'bg-igo-green/10 text-igo-green' :
                      c.status === 'Regular' ? 'bg-blue-100 text-blue-600' :
                      'bg-neutral-100 text-neutral-500'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-neutral-600">{c.orders}</td>
                  <td className="px-6 py-4 text-sm font-bold text-neutral-800">{c.totalSpend}</td>
                  <td className="px-6 py-4 text-xs text-neutral-400 font-medium">{c.lastOrder}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-neutral-400 hover:text-igo-green hover:bg-neutral-50 rounded-xl transition-all">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;
