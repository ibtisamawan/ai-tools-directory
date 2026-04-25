import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { HiArrowLeft } from 'react-icons/hi';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Register() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }
    if (formData.password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }
    setIsLoading(true);
    try {
      await axios.post('/api/auth/register', {
        username: formData.name.replace(/\s+/g, '').toLowerCase(),
        email: formData.email,
        password: formData.password,
      });
      toast.success('Account created! Please log in.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Try a different username/email.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = `w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-xl text-white text-sm outline-none focus:border-primary transition-all`;

  return (
    <div className="min-h-screen hero-radial-bg flex flex-col items-center justify-center px-4 pt-20">
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-medium">
        <HiArrowLeft /> Back to home
      </Link>

      <div className="w-full max-w-[420px] premium-card p-8 sm:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-[28px] font-black text-white mb-2">Create Account 🚀</h1>
          <p className="text-gray-500 text-sm">Join the AI revolution today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
            <input 
              type="text" 
              required
              className={inputClass}
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
            <input 
              type="email" 
              required
              className={inputClass}
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password" 
              required
              className={inputClass}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            {/* Password strength bar */}
            {formData.password && (
              <div className="mt-2 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-500 ${formData.password.length > 8 ? 'w-full bg-green-500' : 'w-1/2 bg-yellow-500'}`}></div>
              </div>
            )}
          </div>
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Confirm Password</label>
            <input 
              type="password" 
              required
              className={inputClass}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          <div className="flex items-center gap-2 py-2">
            <input type="checkbox" required className="w-4 h-4 rounded accent-primary" id="terms" />
            <label htmlFor="terms" className="text-xs text-gray-500">I agree to the <Link to="#" className="text-primary-light hover:underline">Terms & Conditions</Link></label>
          </div>

          <button type="submit" disabled={isLoading} className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-black rounded-xl hover:shadow-xl hover:shadow-primary/20 transition-all disabled:opacity-60">
            {isLoading ? 'Creating Account...' : 'Get Started'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-primary-light font-bold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
