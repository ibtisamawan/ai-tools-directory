import React, { useState, useEffect } from 'react';
import { HiX, HiMail } from 'react-icons/hi';
import API from '../api';
import toast from 'react-hot-toast';

const NewsletterBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasClosed = localStorage.getItem('newsletter_banner_closed');
      if (!hasClosed) setIsVisible(true);
    }, 5000); // Show after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await API.post('/newsletter', { email });
      toast.success('Successfully subscribed!');
      handleClose();
    } catch (err) {
      toast.error('Failed to subscribe');
    }
    setLoading(false);
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('newsletter_banner_closed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-dark-card border-t border-primary/20 p-4 shadow-2xl animate-slide-up">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <HiMail className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-white font-bold text-sm">Join the AI Revolution</h4>
            <p className="text-gray-400 text-xs">Get weekly updates on the best AI tools.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 max-w-md flex items-center gap-2">
          <input 
            type="email" 
            placeholder="your@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-dark-bg border border-gray-800 rounded-lg px-4 py-2 text-sm text-white outline-none focus:border-primary"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-secondary transition-all disabled:opacity-50"
          >
            {loading ? '...' : 'Subscribe'}
          </button>
        </form>
        <button onClick={handleClose} className="p-2 text-gray-500 hover:text-white">
          <HiX className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default NewsletterBanner;
