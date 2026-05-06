import { useState } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    regNo: '',
    marks: '',
    address: '',
    email: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.regNo) newErrors.regNo = 'Registration number is required';
    if (!formData.marks || isNaN(formData.marks)) newErrors.marks = 'Marks must be a valid number';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone || formData.phone.length !== 10) newErrors.phone = 'Phone must be exactly 10 digits';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await api.post('/students', formData);
      toast.success('Student registered successfully!');
      setFormData({ name: '', regNo: '', marks: '', address: '', email: '', phone: '' });
      setErrors({});
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to register student');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for field
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Student Registration</h1>
        <p className="text-gray-400">Register a new student entity into the analytics engine.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface rounded-2xl border border-gray-700 p-8 shadow-2xl"
      >
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Full Name</label>
            <input 
              name="name" value={formData.name} onChange={handleChange}
              className={`w-full bg-background border ${errors.name ? 'border-red-500' : 'border-gray-700'} text-white rounded-xl py-3 px-4 focus:outline-none focus:border-primary`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Registration Number</label>
            <input 
              name="regNo" value={formData.regNo} onChange={handleChange}
              className={`w-full bg-background border ${errors.regNo ? 'border-red-500' : 'border-gray-700'} text-white rounded-xl py-3 px-4 focus:outline-none focus:border-primary`}
            />
            {errors.regNo && <p className="text-red-500 text-xs mt-1">{errors.regNo}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Marks (0-100)</label>
            <input 
              name="marks" type="number" value={formData.marks} onChange={handleChange}
              className={`w-full bg-background border ${errors.marks ? 'border-red-500' : 'border-gray-700'} text-white rounded-xl py-3 px-4 focus:outline-none focus:border-primary`}
            />
            {errors.marks && <p className="text-red-500 text-xs mt-1">{errors.marks}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Phone Number</label>
            <input 
              name="phone" type="tel" value={formData.phone} onChange={handleChange}
              className={`w-full bg-background border ${errors.phone ? 'border-red-500' : 'border-gray-700'} text-white rounded-xl py-3 px-4 focus:outline-none focus:border-primary`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-300">Email Address</label>
            <input 
              name="email" type="email" value={formData.email} onChange={handleChange}
              className={`w-full bg-background border ${errors.email ? 'border-red-500' : 'border-gray-700'} text-white rounded-xl py-3 px-4 focus:outline-none focus:border-primary`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-300">Address</label>
            <textarea 
              name="address" rows="3" value={formData.address} onChange={handleChange}
              className={`w-full bg-background border ${errors.address ? 'border-red-500' : 'border-gray-700'} text-white rounded-xl py-3 px-4 focus:outline-none focus:border-primary resize-none`}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          <div className="md:col-span-2 pt-4">
            <button 
              type="submit" disabled={loading}
              className="w-full md:w-auto px-8 bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
            >
              {loading ? 'Processing...' : 'Register Student'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default StudentRegistration;
