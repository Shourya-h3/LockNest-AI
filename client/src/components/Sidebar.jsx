import { NavLink } from 'react-router-dom';
import { FiGrid, FiLock, FiShield, FiSettings, FiActivity } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: FiGrid, path: '/dashboard' },
    { name: 'Vault Assets', icon: FiLock, path: '/vault' },
    { name: 'Security Audit', icon: FiShield, path: '/security-audit' },
    { name: 'Node Config', icon: FiActivity, path: '/student-registration' },
  ];

  return (
    <div className="w-72 bg-white/[0.01] backdrop-blur-3xl h-full flex flex-col border-r border-white/5 relative z-40">
      <div className="p-10 flex items-center gap-4 mb-8">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
          <FiShield className="text-background text-2xl" />
        </div>
        <div>
          <h2 className="text-xl font-black text-white tracking-tighter uppercase leading-none">LockNest</h2>
          <span className="text-[9px] text-primary font-bold tracking-[0.3em] uppercase">Sovereign</span>
        </div>
      </div>

      <nav className="flex-1 px-6 space-y-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-500 group relative ${
                isActive 
                  ? 'bg-primary/10 text-primary border border-primary/20 shadow-2xl shadow-primary/5' 
                  : 'text-text-dim hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon className="text-xl" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">{item.name}</span>
            <div className="absolute left-0 w-1 h-0 bg-primary rounded-full transition-all group-hover:h-4 group-[.active]:h-8 opacity-0 group-hover:opacity-100 group-[.active]:opacity-100"></div>
          </NavLink>
        ))}
      </nav>

      <div className="p-8 mt-auto">
        <div className="px-6 py-4 flex items-center gap-4 text-text-dim hover:text-primary cursor-pointer rounded-2xl hover:bg-primary/5 transition-all group border border-transparent hover:border-primary/10">
          <FiSettings className="text-xl group-hover:rotate-90 transition-transform duration-500" />
          <span className="text-xs font-black uppercase tracking-[0.2em]">Sys Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
