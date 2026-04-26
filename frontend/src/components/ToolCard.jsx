import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { HiStar, HiBookmark, HiOutlineBookmark, HiExternalLink } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function ToolCard({ tool }) {
  const { darkMode } = useTheme();
  const [bookmarked, setBookmarked] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    return saved.includes(tool._id);
  });

  const toggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const saved = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    let updated;
    if (bookmarked) {
      updated = saved.filter(id => id !== tool._id);
      toast.success('Removed from bookmarks');
    } else {
      updated = [...saved, tool._id];
      toast.success('Saved to bookmarks!');
    }
    localStorage.setItem('bookmarks', JSON.stringify(updated));
    setBookmarked(!bookmarked);
  };

  // Pricing badge logic
  const getPricingBadge = (pricing) => {
    switch (pricing) {
      case 'Free': return 'bg-[#064E3B] text-[#34D399] border-[#065F46]';
      case 'Freemium': return 'bg-[#451A03] text-[#FCD34D] border-[#92400E]';
      case 'Paid': return 'bg-[#450A0A] text-[#FCA5A5] border-[#991B1B]';
      default: return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  };

  // Domain extraction for Clearbit
  const getDomain = (url) => {
    if (!url) return '';
    try {
      // Ensure url has a protocol for URL constructor
      const absoluteUrl = url.startsWith('http') ? url : `https://${url}`;
      const domain = new URL(absoluteUrl).hostname.replace('www.', '');
      return domain;
    } catch (e) {
      return url.replace('www.', ''); // Fallback for simple strings
    }
  };

  return (
    <Link
      to={`/tools/${tool.slug || tool._id}`}
      className="premium-card block group"
    >
      <div className="p-5">
        {/* Top Section: Logo + Name + Save */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-[52px] h-[52px] rounded-lg bg-white p-2 flex items-center justify-center shadow-md flex-shrink-0">
              <img 
                src={`https://logo.clearbit.com/${getDomain(tool.website)}`} 
                alt={tool.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full rounded-md bg-primary/20 items-center justify-center text-primary font-bold text-xl uppercase">
                {tool.name?.charAt(0)}
              </div>
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-white text-[17px] truncate group-hover:text-primary-light transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-gray-500 font-medium">{tool.category}</p>
            </div>
          </div>
          <button 
            onClick={toggleBookmark}
            className={`p-1.5 rounded-lg transition-colors ${bookmarked ? 'text-primary' : 'text-gray-600 hover:text-gray-400'}`}
          >
            {bookmarked ? <HiBookmark size={20} /> : <HiOutlineBookmark size={20} />}
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#1F2937] w-full mb-4"></div>

        {/* Description */}
        <div className="h-12 mb-4 overflow-hidden">
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
            {tool.shortDescription}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#1F2937] w-full mb-4"></div>

        {/* Bottom Section: Badges + Rating + Visit */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded border ${getPricingBadge(tool.pricing)}`}>
              {tool.pricing}
            </span>
            <div className="flex items-center gap-1">
              <HiStar className="text-yellow-400" size={14} />
              <span className="text-xs font-bold text-white">{tool.rating}</span>
              <span className="text-[11px] text-gray-500">({tool.totalReviews})</span>
            </div>
          </div>
          
          <a 
            href={tool.website.startsWith('http') ? tool.website : `https://${tool.website}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-xs font-bold text-primary-light group-hover:gap-2.5 transition-all hover:text-white"
          >
            Explore <HiExternalLink size={14} />
          </a>
        </div>

        {/* Featured Badge (Optional overlay) */}
        {tool.featured && (
          <div className="absolute top-2 right-12">
             <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#312E81] text-[#A5B4FC] text-[9px] font-bold border border-white/5 shadow-lg">
               <HiStar size={10} /> FEATURED
             </span>
          </div>
        )}
      </div>
    </Link>
  );
}
