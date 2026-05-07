import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiEye, FiEyeOff, FiShield } from 'react-icons/fi';
import api from '../services/api';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Access Keys do not match');
    }

    setIsLoading(true);
    try {
      await api.put(`/auth/resetpassword/${token}`, { password });
      toast.success('Password updated successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Reset failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 relative overflow-hidden">
      <div className="bg-3d-grid opacity-20"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/[0.02] backdrop-blur-3xl p-12 rounded-[3rem] shadow-[0_0_80px_rgba(0,0,0,0.5)] w-full max-w-lg border border-primary/20 relative z-10"
      >
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-tr from-primary to-accent rounded-[2rem] mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-primary/30">
            <FiShield className="text-background text-4xl" />
          </div>
          <h2 className="text-4xl font-semibold text-white mb-4 tracking-tight uppercase">Reset Access</h2>
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">Establish New Password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-black text-primary/60 ml-2 uppercase tracking-widest">New Password</label>
            <div className="relative group">
              <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-primary group-focus-within:text-accent transition-colors" />
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/5 text-white rounded-2xl py-5 pl-14 pr-14 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-lg"
                placeholder="••••••••"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-primary hover:text-white transition-colors p-2"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black text-primary/60 ml-2 uppercase tracking-widest">Confirm Password</label>
            <div className="relative group">
              <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-primary group-focus-within:text-accent transition-colors" />
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/5 text-white rounded-2xl py-5 pl-14 pr-4 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-lg"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-background font-black py-5 rounded-2xl transition-all active:scale-[0.98] shadow-2xl shadow-primary/20 text-xl uppercase tracking-tighter mt-6 disabled:opacity-50"
          >
            {isLoading ? 'Resetting...' : 'Update Password'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
