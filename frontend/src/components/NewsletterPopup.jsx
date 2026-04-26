import React, { useState, useEffect, useRef } from 'react';
import API from '../api';
import toast from 'react-hot-toast';

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    // Check if already subscribed or recently dismissed
    const hasBeenShown = localStorage.getItem('newsletter_popup_shown');
    if (hasBeenShown) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      document.body.style.overflow = 'hidden'; // Prevent scroll when open
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    document.body.style.overflow = 'auto';
    localStorage.setItem('newsletter_popup_shown', 'true');
  };

  const handleOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      closePopup();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/newsletter/subscribe', { email });
      toast.success('Successfully subscribed!');
      setIsSubscribed(true);
      setTimeout(closePopup, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Subscription failed');
    }
    setLoading(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md px-4"
      onClick={handleOutsideClick}
    >
      <div 
        ref={popupRef}
        className="relative w-full max-w-md bg-[#111827] border border-purple-500/30 rounded-[3rem] p-10 md:p-12 shadow-[0_0_50px_rgba(139,92,246,0.3)] overflow-hidden"
      >
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 blur-3xl -mr-10 -mt-10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600/20 blur-3xl -ml-10 -mb-10 rounded-full"></div>

        <div className="relative z-10 text-center">
          <div className="w-20 h-20 bg-purple-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-purple-500/30 rotate-12">
            <span className="text-4xl -rotate-12">💌</span>
          </div>
          
          <h2 className="text-3xl font-black text-white mb-3 tracking-tight uppercase">Don't Miss <span className="text-purple-400">Out!</span></h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Get the latest AI tools and trends delivered straight to your inbox every week. Join 5,000+ AI enthusiasts.
          </p>

          {isSubscribed ? (
            <div className="py-4 text-green-400 font-bold text-lg animate-bounce">
              ✅ You're on the list!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-2xl focus:border-purple-500 focus:outline-none transition-all text-center"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-purple-600/30 disabled:opacity-50 uppercase tracking-widest"
              >
                {loading ? 'Subscribing...' : 'Subscribe Now'}
              </button>
            </form>
          )}

          <p className="mt-6 text-xs text-gray-500 uppercase tracking-widest font-bold">
            Click anywhere outside to dismiss
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
