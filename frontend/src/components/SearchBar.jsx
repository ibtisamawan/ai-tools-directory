import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { HiSearch } from 'react-icons/hi';

export default function SearchBar({ large = false, onSearch, initialValue = '' }) {
  const { darkMode } = useTheme();
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query.trim());
    } else {
      if (query.trim()) {
        navigate(`/tools?q=${encodeURIComponent(query.trim())}`);
      } else {
        navigate('/tools');
      }
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative w-full ${large ? 'max-w-[700px]' : 'max-w-md'} transition-all duration-300`}
    >
      <div className="search-input-container group flex items-center p-1 sm:p-1.5">
        <HiSearch className="ml-4 text-gray-500 group-focus-within:text-primary-light transition-colors" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for AI tools (e.g. video editor, chatbot)..."
          className="flex-1 bg-transparent py-3 sm:py-4 px-4 text-white text-sm sm:text-base outline-none placeholder-gray-500 font-medium"
        />
        <button
          type="submit"
          className={`px-6 sm:px-8 py-2.5 sm:py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-black text-sm rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all active:scale-95`}
        >
          Search
        </button>
      </div>
    </form>
  );
}
