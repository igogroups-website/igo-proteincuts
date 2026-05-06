import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  TrendingUp, 
  ArrowUpRight, 
  Calendar,
  Download,
  Filter,
  PieChart as PieChartIcon,
  Activity
} from 'lucide-react';

const ChartBar = ({ height, label, active }: any) => (
  <div className="flex flex-col items-center gap-3 flex-1 h-full justify-end group">
    <div className="relative w-full flex justify-center items-end h-full">
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: `${height}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`w-full max-w-[40px] rounded-t-xl transition-all duration-300 ${
          active ? 'bg-igo-green shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-neutral-100 group-hover:bg-neutral-200'
        }`}
      />
      {active && (
        <div className="absolute -top-10 bg-neutral-dark text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          ₹45.2k
        </div>
      )}
    </div>
    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">{label}</span>
  </div>
);

const Analytics = () => {
  const weeklyData = [
    { label: 'Mon', height: 45 },
    { label: 'Tue', height: 65 },
    { label: 'Wed', height: 55 },
    { label: 'Thu', height: 85, active: true },
    { label: 'Fri', height: 70 },
    { label: 'Sat', height: 95 },
    { label: 'Sun', height: 80 },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-neutral-800">Performance Intelligence</h1>
          <p className="text-neutral-500 mt-1">Advanced data visualization for your meat enterprise.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 rounded-2xl text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-all">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-igo-green text-white rounded-2xl text-sm font-bold shadow-lg shadow-igo-green/20 hover:bg-igo-green/90 transition-all">
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Growth Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-neutral-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-xl font-bold text-neutral-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-igo-green" />
                Revenue Analytics
              </h3>
              <p className="text-neutral-400 text-xs mt-1">Growth trends across the current week.</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-neutral-800">₹8,42,000</span>
              <div className="flex items-center gap-1 text-green-500 text-xs font-bold justify-end mt-1">
                <ArrowUpRight className="w-3 h-3" />
                +14.5% vs last week
              </div>
            </div>
          </div>

          <div className="h-[300px] flex items-end gap-4 md:gap-8 px-4">
            {weeklyData.map((item, i) => (
              <ChartBar key={i} {...item} />
            ))}
          </div>
        </div>

        {/* Sales Breakdown */}
        <div className="bg-neutral-dark p-8 rounded-[40px] shadow-2xl text-white flex flex-col">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-igo-gold" />
            Category Mix
          </h3>
          <div className="space-y-6 flex-1">
            {[
              { label: 'Chicken', percentage: 45, color: 'bg-igo-green' },
              { label: 'Mutton', percentage: 30, color: 'bg-igo-gold' },
              { label: 'Fish & Sea', percentage: 20, color: 'bg-blue-500' },
              { label: 'Eggs/Others', percentage: 5, color: 'bg-neutral-600' },
            ].map((cat) => (
              <div key={cat.label} className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-neutral-400">{cat.label}</span>
                  <span>{cat.percentage}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full ${cat.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-bold transition-all border border-white/5">
            Detailed Breakdown
          </button>
        </div>
      </div>

      {/* Secondary Insights Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Conversion Rate', value: '4.2%', icon: Activity, color: 'text-igo-green' },
          { label: 'Avg. Fulfillment', value: '72 min', icon: BarChart3, color: 'text-blue-500' },
          { label: 'Customer LTV', value: '₹14,500', icon: TrendingUp, color: 'text-purple-500' },
          { label: 'Return Rate', value: '0.8%', icon: Filter, color: 'text-red-500' },
        ].map((insight, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm"
          >
            <div className={`p-3 rounded-2xl bg-neutral-50 inline-block mb-4 ${insight.color}`}>
              <insight.icon className="w-5 h-5" />
            </div>
            <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">{insight.label}</p>
            <h4 className="text-2xl font-bold mt-1 text-neutral-800">{insight.value}</h4>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
