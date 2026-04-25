import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { HiArrowLeft } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Login() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsLoading(true);
        const res = await axios.post('/api/auth/google', { 
          access_token: tokenResponse.access_token 
        });
        
        if (res.data.success) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          toast.success('Logged in with Google!');
          navigate('/');
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'Google Login failed');
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => toast.error('Google Login was canceled or failed')
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post('/api/auth/login', {
        username: formData.email, // Frontend uses email as username for now
        password: formData.password
      });

      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        toast.success('Logged in successfully!');
        navigate('/');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = `w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-xl text-white text-sm outline-none focus:border-primary transition-all disabled:opacity-50`;

  return (
    <div className="min-h-screen hero-radial-bg flex flex-col items-center justify-center px-4 pt-20">
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-medium">
        <HiArrowLeft /> Back to home
      </Link>

      <div className="w-full max-w-[420px] premium-card p-8 sm:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-[28px] font-black text-white mb-2">Welcome Back 👋</h1>
          <p className="text-gray-500 text-sm">Sign in to access your saved tools</p>
        </div>

        {/* Google Login */}
        <button 
          onClick={() => googleLogin()}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-100 transition-all mb-6 disabled:opacity-70">
          <FcGoogle size={22} /> {isLoading ? 'Please wait...' : 'Login with Google'}
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-px bg-[#1F2937] flex-1"></div>
          <span className="text-gray-600 text-xs font-bold uppercase tracking-widest">or continue with email</span>
          <div className="h-px bg-[#1F2937] flex-1"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
            <input 
              type="email" 
              required
              className={inputClass}
              placeholder="name@company.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Password</label>
              <Link to="#" className="text-xs text-primary-light hover:underline">Forgot?</Link>
            </div>
            <input 
              type="password" 
              required
              className={inputClass}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button type="submit" disabled={isLoading} className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-black rounded-xl hover:shadow-xl hover:shadow-primary/20 transition-all disabled:opacity-60">
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-500">
          Don't have an account? <Link to="/register" className="text-primary-light font-bold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
