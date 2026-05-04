import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import API from '../api';

export default function CategoryFilter({ selected = '', onSelect }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState([{ name: 'All', icon: '🔥' }]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get('/categories');
        if (res.data.success) {
          setCategories([{ name: 'All', icon: '🔥' }, ...res.data.data]);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleClick = (catName) => {
    // If a local onSelect handler is provided (e.g. Tools page), use it
    if (onSelect) {
      onSelect(catName);
      return;
    }
    // Otherwise navigate to /tools with the category filter
    if (catName === 'All') {
      navigate('/tools');
    } else {
      navigate(`/tools?category=${encodeURIComponent(catName)}`);
    }
  };

  // Determine active category from URL or prop. If on Home (no onSelect/selected), don't default to 'All' for styling
  const activeCategory = selected || searchParams.get('category') || (selected === 'All' ? 'All' : '');

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 overflow-x-auto pb-4 hide-scrollbar">
        {categories.map(cat => (
          <button
            key={cat.name}
            onClick={() => handleClick(cat.name)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border ${
              activeCategory === cat.name
                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105'
                : 'bg-transparent border-[#374151] text-[#9CA3AF] hover:border-primary hover:text-white hover:bg-primary/15'
            }`}
          >
            <span className="text-sm">{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
