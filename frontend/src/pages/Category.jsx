import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ToolCard from '../components/ToolCard';
import { CardSkeleton } from '../components/LoadingSkeleton';
import API from '../api';

export default function Category() {
  const { name } = useParams();
  const { darkMode } = useTheme();
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('newest');
  const [meta, setMeta] = useState({ icon: '🔧', desc: 'Browse tools in this category' });
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const displayName = name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  useEffect(() => {
    const fetchCategoryMeta = async () => {
      try {
        const res = await API.get('/categories');
        if (res.data.success) {
          const found = res.data.data.find(c => 
            c.name.toLowerCase().replace(/ /g, '-') === name.toLowerCase() ||
            c.name.toLowerCase() === name.toLowerCase()
          );
          if (found) {
            setMeta({ icon: found.icon, desc: found.description });
          }
        }
      } catch (err) {
        console.error('Failed to fetch category meta:', err);
      }
    };
    fetchCategoryMeta();
    fetchTools();
  }, [name, sort]);

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    revealRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, [tools, loading]);

  const fetchTools = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/tools/category/${name}?sort=${sort}&limit=50`);
      setTools(res.data.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1a0533] to-dark-bg border-b border-primary/10">
        <div className="blur-circle w-[400px] h-[400px] bg-primary/10 top-0 left-0"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <nav className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/tools" className="hover:text-primary transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-white">{displayName}</span>
          </nav>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center text-4xl shadow-2xl">
              {meta.icon}
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">{displayName}</h1>
              <p className="text-[#94A3B8] font-medium mt-2 max-w-xl">{meta.desc}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-12">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
             Showing <span className="text-white">{tools.length}</span> tools
          </p>
          <select 
            value={sort} 
            onChange={e => setSort(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-[#111827] border border-[#1F2937] text-white text-sm font-bold outline-none focus:border-primary transition-all appearance-none"
          >
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="top-rated">Top Rated</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : tools.length === 0 ? (
          <div className="text-center py-32 premium-card">
            <p className="text-5xl mb-6">{meta.icon}</p>
            <h3 className="text-xl font-bold text-white mb-2">No tools in this category</h3>
            <p className="text-gray-500">Be the first to submit a tool for this category!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map(tool => (
              <div key={tool._id} className="reveal" ref={el => revealRefs.current.push(el)}>
                <ToolCard tool={tool} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
