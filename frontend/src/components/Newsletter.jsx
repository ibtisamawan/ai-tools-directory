import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';
import API from '../api';

export default function Newsletter() {
  const { darkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await API.post('/newsletter', { email });
      toast.success('Successfully subscribed to updates!');
      setEmail('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to subscribe');
    }
    setLoading(false);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#1a0533] to-[#0a1628] border border-primary/30 p-8 sm:p-16 text-center">
        {/* Floating background blur */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-[36px] font-black text-white mb-4 leading-tight">
            Stay Updated with Latest AI Tools
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mb-10 font-medium">
            Join 50,000+ AI enthusiasts and get a curated list of the newest AI breakthroughs delivered to your inbox every week.
          </p>
          
          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto group">
            <div className="flex flex-col sm:flex-row items-stretch gap-0 sm:gap-0 bg-dark-bg/50 border border-primary/20 rounded-2xl sm:rounded-full p-1 focus-within:border-primary transition-colors">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your professional email"
                required
                className="flex-1 px-6 py-4 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl sm:rounded-full font-bold text-sm hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
