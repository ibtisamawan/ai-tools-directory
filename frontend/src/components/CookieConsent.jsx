import React, { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay before showing banner for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    // Initialize tracking/ads here if needed
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1E293B] border-t border-gray-700 p-4 shadow-2xl z-50 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-gray-300 text-sm max-w-3xl">
        We use cookies to improve your experience, personalize content and ads, and analyze our traffic. 
        By clicking "Accept", you consent to our use of cookies. Read our <a href="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</a> to learn more.
      </div>
      <div className="flex shrink-0 gap-3">
        <button 
          onClick={handleReject}
          className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-600 rounded-md hover:bg-gray-700 transition-colors"
        >
          Decline
        </button>
        <button 
          onClick={handleAccept}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          Accept Cookies
        </button>
      </div>
    </div>
  );
}
