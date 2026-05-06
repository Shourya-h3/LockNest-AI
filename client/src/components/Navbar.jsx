import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiBell, FiLogOut, FiUser, FiSearch, FiMenu } from 'react-icons/fi';

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="h-20 bg-white/[0.02] backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4 md:gap-8">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-3 bg-white/5 rounded-xl text-primary hover:bg-white/10 transition-all"
        >
          <FiMenu className="text-xl" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Welcome, {user?.name?.split(' ')[0]}</h1>
          <p className="text-xs text-text-dim font-medium uppercase tracking-widest">Digital Vault Secure</p>
        </div>
        
        <div className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/5 px-4 py-2 rounded-xl focus-within:border-primary/50 transition-all">
          <FiSearch className="text-text-dim" />
          <input 
            type="text" 
            placeholder="Search vault..." 
            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/20 w-64"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="text-text-dim hover:text-white transition-colors relative p-2 rounded-lg hover:bg-white/5">
          <FiBell className="text-2xl" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_rgba(244,63,94,0.6)]"></span>
        </button>
        
        <div className="flex items-center gap-4 pl-6 border-l border-white/10">
          <div className="flex flex-col items-end hidden md:flex">
            <p className="text-sm font-bold text-white">{user?.name}</p>
            <p className="text-[10px] text-secondary font-bold uppercase tracking-tighter">{user?.role}</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-primary to-secondary p-[1px]">
            <div className="w-full h-full rounded-xl bg-background overflow-hidden border border-background/20">
              <img src={user?.avatar || 'https://ui-avatars.com/api/?name=' + user?.name} alt="avatar" className="w-full h-full object-cover" />
            </div>
          </div>
          <button 
            onClick={logout} 
            className="p-2 rounded-xl text-text-dim hover:text-accent hover:bg-accent/10 transition-all"
            title="Sign Out"
          >
            <FiLogOut className="text-xl" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
