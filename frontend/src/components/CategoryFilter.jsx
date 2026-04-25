import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import API from '../api';

export default function CategoryFilter({ selected = 'All', onSelect }) {
  const { darkMode } = useTheme();
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

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 overflow-x-auto pb-4 hide-scrollbar">
        {categories.map(cat => (
          <button
            key={cat.name}
            onClick={() => onSelect && onSelect(cat.name)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border ${
              selected === cat.name
                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105'
                : 'bg-transparent border-[#374151] text-[#9CA3AF] hover:border-primary hover:text-white'
            }`}
          >
            <span className="text-base">{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
