import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  ExternalLink
} from 'lucide-react';

const StatCard = ({ title, value, change, trend, icon: Icon, color }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-[24px] border border-neutral-100 shadow-sm hover:shadow-md transition-all"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
        trend === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
      }`}>
        {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change}
      </div>
    </div>
    <p className="text-neutral-500 text-sm font-medium">{title}</p>
    <h3 className="text-2xl font-bold mt-1">{value}</h3>
  </motion.div>
);

const DashboardOverview = () => {
  const stats = [
    { title: 'Total Revenue', value: '₹12,45,200', change: '+12.5%', trend: 'up', icon: IndianRupee, color: 'bg-igo-green' },
    { title: 'Active Orders', value: '142', change: '+8.2%', trend: 'up', icon: ShoppingBag, color: 'bg-blue-500' },
    { title: 'New Customers', value: '1,284', change: '-2.4%', trend: 'down', icon: Users, color: 'bg-igo-gold' },
    { title: 'Avg. Order Value', value: '₹850', change: '+4.1%', trend: 'up', icon: TrendingUp, color: 'bg-purple-500' },
  ];

  const recentOrders = [
    { id: '#ORD-7821', customer: 'Arun Kumar', status: 'Delivered', amount: '₹1,250', date: '2 mins ago' },
    { id: '#ORD-7820', customer: 'Priya Dharshini', status: 'Processing', amount: '₹890', date: '15 mins ago' },
    { id: '#ORD-7819', customer: 'Rajesh V', status: 'Shipped', amount: '₹2,100', date: '45 mins ago' },
    { id: '#ORD-7818', customer: 'Suresh Raina', status: 'Delivered', amount: '₹450', date: '1 hour ago' },
    { id: '#ORD-7817', customer: 'Meera Bai', status: 'Pending', amount: '₹1,560', date: '2 hours ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-neutral-800">Operational Overview</h1>
        <p className="text-neutral-500 mt-1">Here's what's happening with IGO Protein Cuts today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-[32px] border border-neutral-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-neutral-50 flex items-center justify-between">
            <h2 className="font-bold text-lg">Recent Transactions</h2>
            <button className="text-igo-green text-sm font-bold flex items-center gap-1 hover:underline">
              View All <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-neutral-50 text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50/50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-sm text-neutral-800">{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-500">
                          {order.customer.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-neutral-600">{order.customer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-600' :
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-sm text-neutral-800">{order.amount}</td>
                    <td className="px-6 py-4 text-xs text-neutral-400 font-medium">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health / Live Activity */}
        <div className="space-y-6">
          <div className="bg-white rounded-[32px] border border-neutral-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg">Inventory Alerts</h2>
              <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded text-[10px] font-bold">3 CRITICAL</span>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Chicken Breast', stock: '2kg', status: 'Critical' },
                { name: 'Vanjaram Steaks', stock: '5kg', status: 'Low' },
                { name: 'Nattu Kozhi', stock: '3kg', status: 'Critical' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-neutral-50 rounded-2xl">
                  <div>
                    <p className="text-xs font-bold text-neutral-800">{item.name}</p>
                    <p className="text-[10px] text-neutral-400">Current Stock: {item.stock}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                    item.status === 'Critical' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[32px] border border-neutral-100 shadow-sm p-6">
            <h2 className="font-bold text-lg mb-6">Live System Feed</h2>
            <div className="space-y-6">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-igo-green/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-igo-green" />
                    </div>
                    {i !== 2 && <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-6 bg-neutral-100"></div>}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-800">Inventory Update</p>
                    <p className="text-xs text-neutral-500 mt-1">Chicken Breast stock updated for Anna Nagar Hub.</p>
                    <span className="text-[10px] text-neutral-300 font-medium mt-2 block">12:45 PM</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
