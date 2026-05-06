import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShield, FiLock, FiActivity, FiArrowRight } from 'react-icons/fi';

const Home = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* 3D Animated Grid Background */}
      <div className="bg-3d-grid opacity-30"></div>
      
      {/* Subtle Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center z-10 max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-primary text-[10px] font-bold tracking-[0.6em] uppercase mb-12"
        >
          Secured by Quantum AI
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-light text-white mb-10 tracking-[0.2em] leading-tight uppercase">
          LockNest <span className="font-black text-primary">Sovereign</span>
        </h1>
        
        <p className="text-sm md:text-base text-text-dim mb-16 max-w-xl mx-auto leading-relaxed tracking-widest uppercase font-medium opacity-70">
          The elite standard for digital vaulting. <br /> 
          Absolute encryption. Unparalleled elegance.
        </p>

        <div className="flex flex-col sm:flex-row gap-12 justify-center items-center">
          <Link to="/register" className="group relative text-white text-xs font-bold tracking-[0.3em] uppercase transition-all hover:text-primary">
            <span>Initialize Vault</span>
            <div className="h-[1px] w-full bg-primary/30 mt-2 group-hover:bg-primary transition-all"></div>
          </Link>
          
          <Link to="/login" className="group relative text-white text-xs font-bold tracking-[0.3em] uppercase transition-all hover:text-primary">
            <span>Member Portal</span>
            <div className="h-[1px] w-full bg-primary/30 mt-2 group-hover:bg-primary transition-all"></div>
          </Link>
        </div>

        <div className="mt-40 grid grid-cols-1 sm:grid-cols-3 gap-16 text-center max-w-4xl mx-auto opacity-50 hover:opacity-100 transition-opacity duration-1000">
          {[
            { title: "Vault", desc: "Military Grade AES-256" },
            { title: "Intel", desc: "AI Threat Detection" },
            { title: "Privacy", desc: "Zero-Knowledge Logic" }
          ].map((feature, i) => (
            <div key={i} className="group cursor-default">
              <h3 className="text-[10px] font-black text-primary mb-2 uppercase tracking-[0.4em]">{feature.title}</h3>
              <p className="text-[9px] text-text-dim tracking-widest uppercase">{feature.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
