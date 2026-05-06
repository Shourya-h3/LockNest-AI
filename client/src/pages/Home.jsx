import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShield, FiLock, FiActivity, FiArrowRight, FiCheckCircle, FiCpu, FiGlobe } from 'react-icons/fi';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#020a08] flex flex-col items-center relative overflow-x-hidden">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="bg-3d-grid opacity-20 h-full w-full"></div>
      </div>
      
      {/* Navigation Header */}
      <nav className="w-full max-w-7xl px-8 py-8 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <FiShield className="text-[#020a08] text-xl" />
          </div>
          <span className="text-white font-black uppercase tracking-tighter text-xl italic">LockNest</span>
        </div>
        <div className="flex items-center gap-8">
          <Link to="/login" className="text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest transition-all hidden md:block">Portal Login</Link>
          <Link to="/register" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all">Initialize</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-32 z-10 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full inline-flex items-center gap-3"
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">Quantum Encryption V2.0 Active</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9] italic"
        >
          SOVEREIGN <br />
          <span className="text-primary drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">SECURITY</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/50 text-base md:text-lg max-w-2xl mb-12 leading-relaxed font-medium"
        >
          The world's most elegant AI-powered vault. Secure your digital assets with 
          military-grade logic and breathtaking minimalist design.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
        >
          <Link 
            to="/register" 
            className="group relative bg-primary hover:bg-accent text-background px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-[0_0_40px_rgba(212,175,55,0.2)] flex items-center justify-center gap-3"
          >
            Enter the Nexus
            <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
          <Link 
            to="/login" 
            className="bg-white/5 hover:bg-white/10 border border-white/5 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3"
          >
            Access Vault
          </Link>
        </motion.div>

        {/* Feature Highlights */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {[
            { icon: FiCpu, title: "AI Audit", desc: "Real-time vulnerability analysis of your entire vault." },
            { icon: FiLock, title: "AES-256", desc: "Industry-leading encryption standards for every asset." },
            { icon: FiGlobe, title: "Anywhere", desc: "Cloud-synced access from phone, tablet, or desktop." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + (i * 0.1) }}
              className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] text-left hover:border-primary/20 transition-all group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="text-primary text-xl" />
              </div>
              <h3 className="text-white font-black uppercase tracking-tighter mb-2 italic">{feature.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Trust Footer */}
      <footer className="w-full max-w-7xl px-8 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 z-10">
        <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em]">© 2026 LockNest Sovereign Infrastructure</p>
        <div className="flex gap-8">
          <div className="flex items-center gap-2 opacity-30">
            <FiCheckCircle className="text-primary" />
            <span className="text-white text-[10px] font-bold uppercase tracking-widest">End-to-End Encrypted</span>
          </div>
          <div className="flex items-center gap-2 opacity-30">
            <FiCheckCircle className="text-primary" />
            <span className="text-white text-[10px] font-bold uppercase tracking-widest">Zero-Knowledge API</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
