import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ToolCard from '../components/ToolCard';
import { DetailSkeleton } from '../components/LoadingSkeleton';
import API from '../api';
import toast from 'react-hot-toast';
import { HiStar, HiExternalLink, HiShare, HiClipboardCopy } from 'react-icons/hi';

export default function ToolDetail() {
  const { slug } = useParams();
  const { darkMode } = useTheme();
  const [tool, setTool] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({ userName: '', rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTool();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchTool = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/tools/${slug}`);
      setTool(res.data.data);
      setReviews(res.data.data.reviews || []);
      setSimilar(res.data.data.similarTools || []);
    } catch (err) {
      toast.error('Failed to load tool');
    }
    setLoading(false);
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!reviewForm.userName || !reviewForm.comment) return toast.error('Please fill all fields');
    setSubmitting(true);
    try {
      await API.post('/tools/reviews', { ...reviewForm, toolId: tool._id });
      toast.success('Review submitted!');
      setReviewForm({ userName: '', rating: 5, comment: '' });
      fetchTool();
    } catch (err) {
      toast.error('Failed to submit review');
    }
    setSubmitting(false);
  };

  const shareTool = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied!');
  };

  if (loading) return <DetailSkeleton />;
  if (!tool) return <div className="text-center py-20"><p className="text-xl">Tool not found</p><Link to="/tools" className="text-primary mt-4 inline-block">← Back to Tools</Link></div>;

  const cardClass = `rounded-2xl border p-6 ${darkMode ? 'bg-dark-card border-dark-border' : 'bg-white border-gray-200'}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className={`flex items-center gap-2 text-sm mb-6 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link to="/tools" className="hover:text-primary transition-colors">Tools</Link>
        <span>/</span>
        <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{tool.name}</span>
      </nav>

      {/* Header */}
      <div className={`${cardClass} mb-6`}>
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0 ${darkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
            {tool.logo ? <img src={tool.logo} alt={tool.name} className="w-12 h-12 object-contain" onError={e => e.target.style.display='none'} /> : null}
            <span className={`text-3xl font-bold ${tool.logo ? 'hidden' : ''} text-primary`}>{tool.name?.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{tool.name}</h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${darkMode ? 'bg-primary/20 text-primary-light' : 'bg-primary/10 text-primary'}`}>{tool.category}</span>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${tool.pricing === 'Free' ? (darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700') : tool.pricing === 'Paid' ? (darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700') : (darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700')}`}>{tool.pricing}</span>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => <HiStar key={s} className={`w-4 h-4 ${s <= Math.round(tool.rating) ? 'text-amber-400' : 'text-gray-500'}`} />)}
                    <span className={`text-sm ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tool.rating} ({tool.totalReviews} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={shareTool} className={`p-2.5 rounded-xl border transition-all ${darkMode ? 'border-dark-border text-gray-400 hover:text-white hover:border-primary' : 'border-gray-200 text-gray-400 hover:text-gray-700 hover:border-primary'}`}><HiShare className="w-5 h-5" /></button>
                <button onClick={() => { navigator.clipboard.writeText(tool.website); toast.success('URL copied!'); }} className={`p-2.5 rounded-xl border transition-all ${darkMode ? 'border-dark-border text-gray-400 hover:text-white hover:border-primary' : 'border-gray-200 text-gray-400 hover:text-gray-700 hover:border-primary'}`}><HiClipboardCopy className="w-5 h-5" /></button>
                <a href={tool.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-primary/25 transition-all">
                  Visit Tool <HiExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className={cardClass}>
            <h2 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>About {tool.name}</h2>
            <p className={`text-sm leading-relaxed whitespace-pre-line ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{tool.fullDescription}</p>
          </div>

          {/* Features */}
          {tool.features?.length > 0 && (
            <div className={cardClass}>
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Key Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tool.features.map((f, i) => (
                  <li key={i} className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Reviews */}
          <div className={cardClass}>
            <h2 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Reviews ({reviews.length})</h2>
            {reviews.length > 0 ? (
              <div className="space-y-4 mb-6">
                {reviews.map(r => (
                  <div key={r._id} className={`p-4 rounded-xl ${darkMode ? 'bg-dark-bg' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{r.userName}</span>
                      <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <HiStar key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? 'text-amber-400' : 'text-gray-500'}`} />)}</div>
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{r.comment}</p>
                  </div>
                ))}
              </div>
            ) : <p className={`text-sm mb-6 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>No reviews yet. Be the first!</p>}

            <form onSubmit={submitReview} className="space-y-4">
              <h3 className={`font-semibold text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Write a Review</h3>
              <input type="text" placeholder="Your name" value={reviewForm.userName} onChange={e => setReviewForm({...reviewForm, userName: e.target.value})}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none ${darkMode ? 'bg-dark-bg border-dark-border text-white focus:border-primary' : 'bg-white border-gray-200 focus:border-primary'}`} />
              <div className="flex items-center gap-2">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Rating:</span>
                {[1,2,3,4,5].map(s => <button key={s} type="button" onClick={() => setReviewForm({...reviewForm, rating: s})}><HiStar className={`w-6 h-6 ${s <= reviewForm.rating ? 'text-amber-400' : 'text-gray-500'}`} /></button>)}
              </div>
              <textarea placeholder="Your review..." rows="3" value={reviewForm.comment} onChange={e => setReviewForm({...reviewForm, comment: e.target.value})}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none ${darkMode ? 'bg-dark-bg border-dark-border text-white focus:border-primary' : 'bg-white border-gray-200 focus:border-primary'}`} />
              <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all disabled:opacity-50">
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className={cardClass}>
            <h3 className={`font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Pricing</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tool.pricingDetails || 'Contact for pricing'}</p>
          </div>
          {tool.tags?.length > 0 && (
            <div className={cardClass}>
              <h3 className={`font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map(t => <span key={t} className={`px-3 py-1 rounded-full text-xs ${darkMode ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>#{t}</span>)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Similar Tools */}
      {similar.length > 0 && (
        <div className="mt-12">
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Similar Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {similar.map(t => <ToolCard key={t._id} tool={t} />)}
          </div>
        </div>
      )}
    </div>
  );
}
