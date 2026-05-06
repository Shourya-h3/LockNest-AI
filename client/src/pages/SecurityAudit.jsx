import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiAlertTriangle, FiCheckCircle, FiInfo, FiRefreshCw } from 'react-icons/fi';
import api from '../services/api';
import toast from 'react-hot-toast';

const SecurityAudit = () => {
  const [auditData, setAuditData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAudit = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/analytics/audit');
      setAuditData(data);
    } catch (error) {
      toast.error('Failed to run security audit');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudit();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            AI Security <span className="text-primary">Audit</span>
          </h1>
          <p className="text-white/50 mt-1">Deep analysis of your digital security posture.</p>
        </div>
        <button 
          onClick={fetchAudit}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-2xl transition-all border border-white/10 group"
        >
          <FiRefreshCw className={`group-hover:rotate-180 transition-transform duration-500`} />
          Re-Run Audit
        </button>
      </div>

      {/* Main Score & Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Security Score Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1 bg-white/[0.03] border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="text-white/50 text-sm font-bold uppercase tracking-widest mb-4">Security Score</div>
            <div className={`text-8xl font-black tracking-tighter ${getScoreColor(auditData?.score)}`}>
              {auditData?.score}%
            </div>
            <div className="mt-4 flex items-center gap-2 justify-center">
              {auditData?.score >= 90 ? (
                <FiCheckCircle className="text-emerald-400" />
              ) : (
                <FiAlertTriangle className="text-yellow-400" />
              )}
              <span className="text-white font-bold tracking-tight italic uppercase">
                {auditData?.score >= 90 ? 'Elite Protocol' : 'Optimization Required'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Vital Stats Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white/[0.03] border border-white/5 rounded-3xl p-8"
        >
          <h3 className="text-white font-black uppercase italic tracking-tighter mb-8">Vault Vitals</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/50 text-xs font-bold uppercase">Strong</span>
                <FiCheckCircle className="text-emerald-400" />
              </div>
              <div className="text-3xl font-black text-white tracking-tighter">{auditData?.stats?.strong}</div>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/50 text-xs font-bold uppercase">Reused</span>
                <FiAlertTriangle className="text-yellow-400" />
              </div>
              <div className="text-3xl font-black text-white tracking-tighter">{auditData?.stats?.reused}</div>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/50 text-xs font-bold uppercase">Weak</span>
                <FiAlertTriangle className="text-red-400" />
              </div>
              <div className="text-3xl font-black text-white tracking-tighter">{auditData?.stats?.weak}</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recommendations */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/[0.03] border border-white/5 rounded-3xl p-8"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/20 rounded-xl">
            <FiInfo className="text-primary text-xl" />
          </div>
          <h3 className="text-white font-black uppercase italic tracking-tighter">AI Recommendations</h3>
        </div>
        
        <div className="space-y-4">
          {auditData?.recommendations?.map((rec, index) => (
            <div 
              key={index}
              className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <p className="text-white/80 font-medium">{rec}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 3D Grid Overlay Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
    </div>
  );
};

export default SecurityAudit;
