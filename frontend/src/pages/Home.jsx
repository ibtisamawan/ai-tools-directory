import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ToolCard from '../components/ToolCard';
import Newsletter from '../components/Newsletter';
import { CardSkeleton } from '../components/LoadingSkeleton';
import API from '../api';
import { HiSparkles } from 'react-icons/hi';
import { Helmet } from 'react-helmet-async';
import FAQ from '../components/FAQ';

export default function Home() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [featured, setFeatured] = useState([]);
  const [recent, setRecent] = useState([]);
  const [toolOfDay, setToolOfDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const revealRefs = useRef([]);
  revealRefs.current = [];

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [featRes, recentRes, allRes] = await Promise.all([
          API.get('/tools?featured=true&limit=3'),
          API.get('/tools?limit=6&sort=newest'),
          API.get('/tools?limit=12&sort=newest')
        ]);
        setFeatured(featRes.data.data);
        setRecent(recentRes.data.data);
        if (allRes.data.data.length > 0) {
          const dayIndex = new Date().getDate() % allRes.data.data.length;
          setToolOfDay(allRes.data.data[dayIndex]);
        }
      } catch (err) {
        console.error('Failed to fetch initial tools:', err);
      }
      setLoading(false);
    };
    fetchInitialData();
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    revealRefs.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [loading]);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };


  return (
    <div className="min-h-screen">
      <Helmet>
        <title>AI Tools Directory - Find Best AI Tools 2026 | 120+ Tools Free</title>
        <meta name="description" content="Discover 120+ best AI tools across 25 categories. Find perfect AI tools for writing, coding, image generation, marketing and more. 100% free." />
        <meta name="keywords" content="AI tools, best AI tools 2026, artificial intelligence tools, free AI tools, AI tools directory, top AI tools" />
        <link rel="canonical" href="https://ai-tools-directory-orpin.vercel.app/" />
        <meta property="og:title" content="AI Tools Directory - Find Best AI Tools 2026 | 120+ Tools Free" />
        <meta property="og:description" content="Discover 120+ best AI tools across 25 categories. Find perfect AI tools for writing, coding, image generation, marketing and more. 100% free." />
        <meta property="og:url" content="https://ai-tools-directory-orpin.vercel.app/" />
        <meta name="twitter:title" content="AI Tools Directory - Find Best AI Tools 2026 | 120+ Tools Free" />
        <meta name="twitter:description" content="Discover 120+ best AI tools across 25 categories. Find perfect AI tools for writing, coding, image generation, marketing and more. 100% free." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative hero-radial-bg overflow-hidden min-h-[85vh] flex items-center">
        {/* Background Depth Circles */}
        <div className="blur-circle w-[500px] h-[500px] bg-primary -top-40 -left-40 opacity-[0.15]"></div>
        <div className="blur-circle w-[400px] h-[400px] bg-secondary -top-20 -right-20 opacity-[0.1]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-8 bg-white/5 text-primary-light border border-primary/20 backdrop-blur-md">
              <HiSparkles className="text-yellow-400" /> Discover 120+ AI Tools
            </span>
            
            <h1 className="font-extrabold tracking-tight mb-8 leading-[1.1] text-white">
              <span className="block text-[28px] sm:text-[36px] lg:text-[58px]">Find the Perfect</span>
              <span className="text-[28px] sm:text-[36px] lg:text-[58px]">
                <span className="premium-gradient-text">AI Tool</span> for Every Task
              </span>
            </h1>

            <p className="text-base sm:text-[18px] text-[#94A3B8] max-w-[600px] mx-auto mb-12 font-medium">
              Explore our curated collection of the best artificial intelligence tools for productivity, creativity, and business growth.
            </p>

            <div className="flex justify-center">
              <SearchBar large />
            </div>
          </div>
        </div>
      </section>

      {/* AdSense Slot: Home Top */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex justify-center">
        <div id="adsense-home-top" className="w-full h-[100px] bg-white/5 border border-dashed border-gray-700 flex items-center justify-center text-gray-600 text-xs uppercase tracking-widest rounded-xl">
          Advertisement
        </div>
      </div>

      {/* Stats Bar */}
      <section className="bg-primary/[0.05] border-y border-primary/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-x-0 md:divide-x divide-primary/10">
            {[
              { val: '120+', label: 'AI Tools' },
              { val: '28', label: 'Categories' },
              { val: '50K+', label: 'Users' },
              { val: '4.8★', label: 'Avg Rating' }
            ].map((s, i) => (
              <div key={i} className="text-center px-4">
                <div className="text-[28px] font-bold text-white mb-1">{s.val}</div>
                <div className="text-sm text-[#94A3B8] font-medium uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool of the Day Banner */}
      {toolOfDay && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 reveal" ref={addToRefs}>
          <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#1E1B4B] to-[#312E81] p-8 sm:p-12 border border-white/10 group">
            <div className="absolute inset-0 animate-shimmer opacity-30"></div>
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl shadow-inner">
                  🏆
                </div>
                <div>
                  <span className="text-xs font-black tracking-[0.2em] text-yellow-400 uppercase mb-2 block">Tool of the Day</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">{toolOfDay.name}</h3>
                  <p className="text-sm sm:text-base text-white/70 max-w-md">{toolOfDay.shortDescription}</p>
                </div>
              </div>
              <Link to={`/tools/${toolOfDay.slug || toolOfDay._id}`} className="px-8 py-3 rounded-xl border-2 border-white text-white font-bold hover:bg-white hover:text-primary-dark transition-all whitespace-nowrap">
                Explore →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 reveal" ref={addToRefs}>
        <div className="flex items-center justify-between mb-10 border-l-4 border-primary pl-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">⭐ Featured Tools</h2>
          <Link to="/tools" className="text-sm font-bold text-primary-light hover:underline">View all →</Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(tool => (
              <div key={tool._id} className="featured-glow">
                <ToolCard tool={tool} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Category Filter - clicking navigates to /tools?category=X */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 reveal" ref={addToRefs}>
        <div className="flex items-center justify-between mb-6 border-l-4 border-primary pl-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">🗂️ Browse by Category</h2>
          <Link to="/tools" className="text-sm font-bold text-primary-light hover:underline">View all tools →</Link>
        </div>
        <CategoryFilter />
      </section>

      {/* Recently Added */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 reveal" ref={addToRefs}>
        <div className="flex items-center justify-between mb-10 border-l-4 border-secondary pl-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">🕐 Recently Added</h2>
          <Link to="/tools" className="text-sm font-bold text-primary-light hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [...Array(6)].map((_, i) => <CardSkeleton key={i} />)
          ) : recent.length > 0 ? (
            recent.map(tool => <ToolCard key={tool._id} tool={tool} />)
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-500 font-bold">No tools found.</p>
            </div>
          )}
        </div>
      </section>

      <Newsletter />

      <FAQ faqs={[
        { q: "What is AI Tools Directory?", a: "AI Tools Directory is a free platform where you can discover compare and find the best artificial intelligence tools for any task. We list 126+ AI tools across 25 categories." },
        { q: "Is AI Tools Directory free to use?", a: "Yes! Our website is completely free. You can browse all tools compare features and visit any tool without paying anything." },
        { q: "How often are new tools added?", a: "We add new AI tools every week. The AI industry moves fast and we make sure our directory stays up to date." },
        { q: "How can I submit my AI tool?", a: "Click Submit Tool in the navigation menu and fill out the form. Our team reviews submissions within 48 hours." },
        { q: "How are tools rated?", a: "Tools are rated based on user reviews features pricing and overall usefulness. Ratings are updated regularly." },
        { q: "Can I advertise on AI Tools Directory?", a: "Yes we offer advertising opportunities. Contact us at mibtisam097@gmail.com" }
      ]} />
    </div>
  );
}
