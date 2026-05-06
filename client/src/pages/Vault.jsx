import { useState, useEffect } from 'react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiSearch, FiCopy, FiEye, FiEyeOff, FiTrash2, FiEdit2, FiShield, FiExternalLink } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { checkPasswordStrength } from '../utils/passwordStrength';

const Vault = () => {
  const [passwords, setPasswords] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  // Form State
  const [formData, setFormData] = useState({
    website: '',
    username: '',
    password: '',
    category: 'Other',
    notes: '',
    favorite: false
  });

  const fetchPasswords = async () => {
    try {
      const { data } = await api.get('/passwords');
      setPasswords(data);
    } catch (error) {
      toast.error('Failed to fetch passwords');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Securely copied to clipboard');
  };

  const toggleVisibility = (id) => {
    setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirm permanent deletion of this asset?')) {
      try {
        await api.delete(`/passwords/${id}`);
        setPasswords(passwords.filter(p => p._id !== id));
        toast.success('Asset removed from vault');
      } catch (error) {
        toast.error('Deletion failed');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/passwords', formData);
      setPasswords([data, ...passwords]);
      setShowModal(false);
      setFormData({ website: '', username: '', password: '', category: 'Other', notes: '', favorite: false });
      toast.success('New node initialized in vault');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Initialization failed');
    }
  };

  const filteredPasswords = passwords.filter(p => 
    p.website.toLowerCase().includes(search.toLowerCase()) || 
    p.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 text-primary mb-3">
            <FiShield className="text-sm" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Storage Protocol: Active</span>
          </div>
          <h1 className="text-4xl font-light text-white tracking-widest uppercase">Secured <span className="font-black text-primary">Assets</span></h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary group-focus-within:text-accent transition-colors" />
            <input 
              type="text"
              placeholder="FILTER_VAULT..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/[0.02] border border-white/5 text-white rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-primary/50 w-full md:w-80 transition-all placeholder:text-white/10 uppercase text-xs tracking-widest font-bold"
            />
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-primary hover:bg-accent text-background font-black py-4 px-8 rounded-2xl flex items-center gap-3 transition-all shadow-xl shadow-primary/10 uppercase text-xs tracking-widest active:scale-95"
          >
            <FiPlus className="text-lg" /> New Node
          </button>
        </div>
      </div>

      {/* Password List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full py-20 text-center">
            <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase">Deciphering Vault...</p>
          </div>
        ) : filteredPasswords.map((item) => (
          <motion.div 
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8 hover:border-primary/30 transition-all duration-500 group relative shadow-2xl overflow-hidden"
          >
            {/* Card Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-[80px] group-hover:bg-primary/10 transition-colors"></div>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-white/5 to-white/10 flex items-center justify-center text-2xl font-black text-primary border border-white/5 shadow-inner">
                  {item.website.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-black text-white tracking-tight uppercase">{item.website}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-1 h-1 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-[10px] font-bold text-text-dim uppercase tracking-widest">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => handleDelete(item._id)} className="p-3 text-text-dim hover:text-secondary transition-all opacity-0 group-hover:opacity-100">
                  <FiTrash2 />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="group/field">
                <label className="text-[9px] font-black text-primary/40 uppercase tracking-[0.3em] ml-1 mb-2 block">Authorized Identity</label>
                <div className="flex items-center justify-between bg-white/[0.03] border border-white/5 px-5 py-4 rounded-2xl group-hover/field:border-primary/20 transition-all">
                  <span className="text-white truncate font-mono text-xs font-medium">{item.username}</span>
                  <button onClick={() => handleCopy(item.username)} className="text-primary/40 hover:text-primary transition-colors ml-4">
                    <FiCopy />
                  </button>
                </div>
              </div>

              <div className="group/field">
                <div className="flex justify-between items-center ml-1 mb-2">
                  <label className="text-[9px] font-black text-primary/40 uppercase tracking-[0.3em] block">Encryption Key</label>
                  <button onClick={() => toggleVisibility(item._id)} className="text-xs text-text-dim hover:text-white transition-all flex items-center gap-2">
                    {visiblePasswords[item._id] ? <FiEyeOff className="text-secondary" /> : <FiEye />}
                    <span className="text-[8px] font-bold tracking-widest uppercase">{visiblePasswords[item._id] ? 'Hide' : 'Reveal'}</span>
                  </button>
                </div>
                <div className="flex items-center justify-between bg-white/[0.03] border border-white/5 px-5 py-4 rounded-2xl group-hover/field:border-primary/20 transition-all">
                  <span className="text-white truncate font-mono text-xs font-medium tracking-[0.3em]">
                    {visiblePasswords[item._id] ? item.password : '••••••••••••'}
                  </span>
                  <button onClick={() => handleCopy(item.password)} className="text-primary/40 hover:text-primary transition-colors ml-4">
                    <FiCopy />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
               <span className="text-[8px] font-bold text-text-dim uppercase tracking-[0.3em]">Initialized: {new Date(item.createdAt || Date.now()).toLocaleDateString()}</span>
               <button className="text-[10px] font-black text-primary hover:text-accent flex items-center gap-2 uppercase tracking-widest transition-colors">
                 Launch Site <FiExternalLink />
               </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Password Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-2xl"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white/[0.02] rounded-[3rem] w-full max-w-lg shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-primary/20 overflow-hidden relative z-10"
            >
              <div className="p-10 border-b border-white/5 flex justify-between items-center relative">
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/20 rounded-full blur-3xl"></div>
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Initialize Node</h3>
                  <p className="text-[10px] font-bold text-primary tracking-[0.3em] uppercase mt-1">Append to Sovereign Vault</p>
                </div>
                <button onClick={() => setShowModal(false)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all">✕</button>
              </div>
              <div className="p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-text-dim uppercase tracking-widest ml-1">Platform / Asset Name</label>
                    <input 
                      type="text" required
                      value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/5 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/50 transition-all font-mono text-sm"
                      placeholder="e.g. SWISS_BANK"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-text-dim uppercase tracking-widest ml-1">Authorized ID</label>
                    <input 
                      type="text" required
                      value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/5 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/50 transition-all font-mono text-sm"
                      placeholder="e.g. PROXIMITY_USER"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1 mb-1">
                      <label className="text-[10px] font-black text-text-dim uppercase tracking-widest">Encryption Key</label>
                      {formData.password && (
                        <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${checkPasswordStrength(formData.password).color.replace('bg-', 'text-')}`}>
                          Entropy: {checkPasswordStrength(formData.password).label}
                        </span>
                      )}
                    </div>
                    <input 
                      type="password" required
                      value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/5 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/50 transition-all font-mono text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-text-dim uppercase tracking-widest ml-1">Classification</label>
                    <select 
                      value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/5 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/50 transition-all uppercase text-[10px] font-bold tracking-widest cursor-pointer"
                    >
                      <option className="bg-background">Social</option>
                      <option className="bg-background">Banking</option>
                      <option className="bg-background">Work</option>
                      <option className="bg-background">Entertainment</option>
                      <option className="bg-background">Education</option>
                      <option className="bg-background">Other</option>
                    </select>
                  </div>
                  <div className="pt-8 flex gap-6">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-text-dim hover:bg-white/5 transition-all">Abort</button>
                    <button type="submit" className="flex-1 bg-primary hover:bg-accent text-background py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/10 transition-all">Initialize Node</button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Vault;
