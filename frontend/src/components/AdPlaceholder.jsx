import React, { useEffect } from 'react';

export default function AdPlaceholder({ slot, format = 'auto', layoutKey, style, className }) {
  useEffect(() => {
    try {
      // Only push ads if consent is given or if we want non-personalized ads
      const consent = localStorage.getItem('cookieConsent');
      if (consent === 'accepted' || consent === null) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  // Replace this with the actual AdSense Publisher ID when available
  const client = 'ca-pub-XXXXXXXXXXXXXXXX'; 

  if (process.env.NODE_ENV === 'development') {
    return (
      <div 
        className={`bg-gray-800 border border-dashed border-gray-600 flex items-center justify-center text-gray-500 text-sm rounded ${className}`}
        style={{ minHeight: '100px', ...style }}
      >
        AdSense Placeholder ({slot})
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`} style={{ overflow: 'hidden', ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout-key={layoutKey}
        data-full-width-responsive="true"
      />
    </div>
  );
}
