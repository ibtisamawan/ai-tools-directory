import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ToolCard from '../components/ToolCard';
import SearchBar from '../components/SearchBar';
import { CardSkeleton } from '../components/LoadingSkeleton';
import API from '../api';
import { HiAdjustments } from 'react-icons/hi';
import { Helmet } from 'react-helmet-async';
import FAQ from '../components/FAQ';

export default function Tools() {
  const { darkMode } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState('');
  const [pricing, setPricing] = useState('');
  const [sort, setSort] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [totalTools, setTotalTools] = useState(0);
  const [categories, setCategories] = useState([{ name: 'All', toolCount: 0 }]);
  const revealRefs = useRef([]);
  revealRefs.current = [];
  const pricingOpts = ['All', 'Free', 'Paid', 'Freemium'];
  const sortOpts = [
    { value: 'newest', label: 'Newest' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'top-rated', label: 'Top Rated' },
    { value: 'alphabetical', label: 'A-Z' },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get('/categories');
        if (res.data.success) {
          // Calculate total tools for "All" category
          const total = res.data.data.reduce((sum, c) => sum + (c.toolCount || 0), 0);
          setCategories([{ name: 'All', toolCount: total }, ...res.data.data]);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const q = searchParams.get('q');
    fetchTools(q);
  }, [page, category, pricing, sort, searchParams]);

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

  const fetchTools = async (searchQuery) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 12, sort });
      if (category && category !== 'All') params.append('category', category);
      if (pricing && pricing !== 'All') params.append('pricing', pricing);
      if (searchQuery) params.append('search', searchQuery);
      const url = `/tools?${params}`;
      
      const res = await API.get(url);
      setTools(res.data.data);
      if (res.data.pagination) {
        setTotalPages(res.data.pagination.pages);
        setTotalTools(res.data.pagination.total);
      }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleSearch = (q) => {
    if (q) {
      setSearchParams({ q });
    } else {
      searchParams.delete('q');
      setSearchParams(searchParams);
    }
    setPage(1);
  };

  const filterItemClass = (active) => `block w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
    active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-white hover:bg-primary/15 hover:border-primary/30 border border-transparent'
  }`;

  return (
    <div className="min-h-screen pb-20">
      <Helmet>
        <title>All AI Tools - Browse 126+ AI Tools by Category | AI Tools Directory</title>
        <meta name="description" content="Browse our complete collection of 126+ AI tools. Filter by category, pricing, and rating to find the perfect AI tool for your needs." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-white mb-4">All AI Tools</h1>
          <p className="text-gray-500 font-medium max-w-xl">Browse our complete collection of artificial intelligence tools across all categories and pricing models.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-10">
            <div>
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Category</h3>
                 <button className="lg:hidden text-primary-light" onClick={() => setShowFilters(!showFilters)}>
                    <HiAdjustments size={20} />
                 </button>
              </div>
              <div className={`${showFilters ? 'block' : 'hidden lg:block'} space-y-1`}>
                {categories.map(c => (
                  <button key={c.name} onClick={() => { 
                    setCategory(c.name); 
                    setPage(1);
                  }}
                    className={filterItemClass(c.name === category)}>
                    <span className="flex justify-between items-center w-full">
                      <span>{c.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${c.name === category ? 'bg-white/20' : 'bg-white/5'}`}>
                        {c.toolCount || 0}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-6">Pricing</h3>
              <div className="space-y-1">
                {pricingOpts.map(p => (
                  <button key={p} onClick={() => { setPricing(p); setPage(1); }}
                    className={filterItemClass(p === pricing)}>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-6">Sort By</h3>
              <select 
                value={sort} 
                onChange={(e) => { setSort(e.target.value); setPage(1); }} 
                className="w-full px-4 py-3 bg-[#111827] border border-[#1F2937] rounded-xl text-white text-sm font-bold outline-none focus:border-primary transition-all appearance-none"
              >
                {sortOpts.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="mb-8 flex justify-between items-center">
               <SearchBar 
                 key={searchParams.get('q') || 'default'} 
                 initialValue={searchParams.get('q') || ''}
                 onSearch={handleSearch} 
               />
               <div className="hidden sm:block text-xs font-bold text-gray-600">
                  {searchParams.get('q') ? (
                    <>Showing <span className="text-gray-400">{totalTools}</span> results for "{searchParams.get('q')}"</>
                  ) : category ? (
                    <>Showing <span className="text-gray-400">{totalTools}</span> tools in {category}</>
                  ) : (
                    <>Showing <span className="text-gray-400">{totalTools}</span> tools</>
                  )}
               </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
              </div>
            ) : tools.length === 0 ? (
              <div className="text-center py-32 premium-card">
                <p className="text-4xl mb-6">🔍</p>
                <h3 className="text-xl font-bold text-white mb-2">No tools found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {tools.map(tool => (
                    <div key={tool._id} className="reveal" ref={el => revealRefs.current.push(el)}>
                      <ToolCard tool={tool} />
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-16">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                      className="px-6 py-2.5 rounded-xl border border-[#1F2937] text-gray-400 font-bold hover:border-primary transition-all disabled:opacity-30">
                      Prev
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button key={i} onClick={() => setPage(i + 1)}
                        className={`w-12 h-12 rounded-xl font-black transition-all ${page === i + 1 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
                        {i + 1}
                      </button>
                    ))}
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                      className="px-6 py-2.5 rounded-xl border border-[#1F2937] text-gray-400 font-bold hover:border-primary transition-all disabled:opacity-30">
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <FAQ title="Tools Page FAQ" faqs={[
        { q: "How do I find the right AI tool?", a: "Use our search bar to search by name or use case. Or filter by category to browse tools in your specific area of interest." },
        { q: "What do the pricing badges mean?", a: "Free = always free, no credit card needed. Freemium = free plan with paid upgrades. Paid = requires subscription to use." },
        { q: "Are all tools safe to use?", a: "We only list established legitimate AI tools from trusted companies. Always read each tool privacy policy before signing up." }
      ]} />
    </div>
  );
}
