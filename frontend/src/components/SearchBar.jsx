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
      className="w-full flex justify-center"
    >
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value === '' && onSearch) {
              onSearch('');
            }
          }}
          placeholder={window.innerWidth < 768 ? "Search AI tools..." : "Search for AI tools (e.g. video editor, chatbot)..."}
          className="search-input"
        />
        <button
          type="submit"
          className="search-button"
        >
          Search
        </button>
      </div>
    </form>
  );
}
