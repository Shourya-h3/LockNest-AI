import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiArrowLeft, FiUnlock } from 'react-icons/fi';
import api from '../services/api';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/forgotpassword', { email });
      toast.success(data.message);
      // In a real app, we'd wait for email. 
      // For this demo, we'll show the link in a toast or console
      console.log('Reset Link:', data.resetUrl);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Recovery failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 relative overflow-hidden">
      <div className="bg-3d-grid opacity-20"></div>
      
      <Link to="/login" className="absolute top-8 left-8 flex items-center gap-2 text-text-dim hover:text-white transition-colors group z-20">
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Login</span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/[0.02] backdrop-blur-3xl p-12 rounded-[3rem] shadow-[0_0_80px_rgba(0,0,0,0.5)] w-full max-w-lg border border-primary/20 relative z-10"
      >
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-tr from-secondary to-primary rounded-[2rem] mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-secondary/30">
            <FiUnlock className="text-background text-4xl" />
          </div>
          <h2 className="text-4xl font-semibold text-white mb-4 tracking-tight uppercase">Recovery</h2>
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">Emergency Access Protocol</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="text-xs font-black text-primary/60 ml-2 uppercase tracking-widest">Registered Email</label>
            <div className="relative group">
              <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-primary group-focus-within:text-accent transition-colors" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/5 text-white rounded-2xl py-5 pl-14 pr-4 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder:text-white/10 text-lg font-light"
                placeholder="YOU@VAULT.COM"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-accent text-background font-black py-5 rounded-2xl transition-all active:scale-[0.98] shadow-2xl shadow-primary/20 text-xl uppercase tracking-tighter disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Generate Recovery Link'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
