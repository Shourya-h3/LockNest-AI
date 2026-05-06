import { useState, useEffect } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { FiLock, FiStar, FiPieChart, FiActivity, FiShield } from 'react-icons/fi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/analytics');
        setStats(data);
      } catch (error) {
        console.error('Failed to load stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="text-primary font-bold tracking-widest uppercase text-xs">Synchronizing Intelligence...</p>
      </div>
    );
  }

  const COLORS = ['#d4af37', '#10b981', '#ffd700', '#059669', '#b8860b', '#064e3b'];

  const StatCard = ({ title, value, icon: Icon, colorClass }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white/[0.02] backdrop-blur-3xl p-8 rounded-[2rem] border border-white/5 hover:border-primary/30 transition-all duration-500 shadow-2xl relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
        <Icon className="text-6xl text-primary" />
      </div>
      <div className="relative z-10">
        <h3 className="text-[10px] font-black text-text-dim uppercase tracking-[0.3em] mb-4">{title}</h3>
        <div className="flex items-end gap-3">
          <span className="text-4xl font-light text-white tracking-tighter">{value}</span>
          <div className={`w-2 h-2 rounded-full mb-2 ${colorClass} shadow-[0_0_10px_currentColor]`}></div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-12 p-2">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 text-primary mb-2">
            <FiShield className="text-sm" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Status: Secure</span>
          </div>
          <h1 className="text-4xl font-light text-white tracking-widest uppercase">Intelligence <span className="font-black text-primary">Nexus</span></h1>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[10px] text-text-dim font-bold tracking-widest uppercase">Last Sync</p>
          <p className="text-xs text-white font-mono">{new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Active Vaults" value={stats?.totalPasswords || 0} icon={FiLock} colorClass="bg-primary" />
        <StatCard title="Priority Assets" value={stats?.favoritePasswords || 0} icon={FiStar} colorClass="bg-accent" />
        <StatCard title="Security Risk" value={0} icon={FiActivity} colorClass="bg-secondary" />
        <StatCard title="Data Nodes" value={stats?.categoryDistribution?.length || 0} icon={FiPieChart} colorClass="bg-primary" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Distribution Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/[0.02] backdrop-blur-3xl p-10 rounded-[3rem] border border-white/5 h-[450px] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8">
            <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center">
              <FiPieChart className="text-primary" />
            </div>
          </div>
          <h3 className="text-xs font-black text-white mb-10 tracking-[0.4em] uppercase">Asset Distribution</h3>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={stats?.categoryDistribution}
                dataKey="count"
                nameKey="_id"
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={110}
                paddingAngle={8}
                stroke="none"
              >
                {stats?.categoryDistribution?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#020a08', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '16px', color: '#fff', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                itemStyle={{ color: '#d4af37' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Monthly Activity Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/[0.02] backdrop-blur-3xl p-10 rounded-[3rem] border border-white/5 h-[450px] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8">
            <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center">
              <FiActivity className="text-primary" />
            </div>
          </div>
          <h3 className="text-xs font-black text-white mb-10 tracking-[0.4em] uppercase">Temporal Activity</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={stats?.monthlyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#020a08', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '16px', color: '#fff', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
              />
              <Bar dataKey="count" fill="#d4af37" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
