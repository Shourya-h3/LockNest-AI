import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft, FiShield } from 'react-icons/fi';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(name, email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 relative overflow-hidden">
      {/* 3D Animated Grid Background */}
      <div className="bg-3d-grid opacity-20"></div>
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]"></div>

      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-text-dim hover:text-white transition-colors group z-20">
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="bg-white/[0.02] backdrop-blur-3xl p-12 rounded-[3rem] shadow-[0_0_80px_rgba(0,0,0,0.5)] w-full max-w-lg border border-primary/20 relative z-10 overflow-hidden"
      >
        {/* Luxury Gold Shine */}
        <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-gradient-to-br from-primary/10 via-transparent to-transparent rotate-45 pointer-events-none animate-pulse"></div>

        <div className="text-center mb-12 relative">
          <div className="w-24 h-24 bg-gradient-to-tr from-secondary to-primary rounded-[2rem] mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-secondary/30 transform -rotate-12 hover:rotate-0 transition-transform duration-700">
            <FiShield className="text-background text-4xl rotate-12" />
          </div>
          <h2 className="text-4xl font-semibold text-white mb-4 tracking-tight uppercase">Create Account</h2>
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">Private Security Perimeter</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative">
          <div className="space-y-3">
            <label className="text-xs font-black text-primary/60 ml-2 uppercase tracking-widest">Full Name</label>
            <div className="relative group">
              <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-primary group-focus-within:text-accent transition-colors" />
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/5 text-white rounded-2xl py-5 pl-14 pr-4 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder:text-white/10 text-lg font-light"
                placeholder="FIRST_NAME LAST_NAME"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black text-primary/60 ml-2 uppercase tracking-widest">Email Address</label>
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

          <div className="space-y-3">
            <label className="text-xs font-black text-primary/60 ml-2 uppercase tracking-widest">Master Key</label>
            <div className="relative group">
              <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-primary group-focus-within:text-accent transition-colors" />
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/5 text-white rounded-2xl py-5 pl-14 pr-14 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder:text-white/10 text-lg font-light"
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

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-background font-black py-5 rounded-2xl transition-all active:scale-[0.98] shadow-2xl shadow-primary/20 text-xl uppercase tracking-tighter mt-6"
          >
            Create Your Perimeter
          </button>
        </form>

        <div className="mt-12 text-center relative">
          <p className="text-text-dim text-sm font-medium tracking-wide">
            Already established? <Link to="/login" className="text-primary hover:text-accent font-black underline-offset-8 hover:underline transition-all">Authenticate Entrance</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
