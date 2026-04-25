import { useTheme } from '../context/ThemeContext';

const categories = [
  { name: 'All', icon: '🔥' },
  { name: 'Writing', icon: '✍️' },
  { name: 'Image Generation', icon: '🎨' },
  { name: 'Video', icon: '🎬' },
  { name: 'Coding', icon: '💻' },
  { name: 'Chatbots', icon: '💬' },
  { name: 'Audio', icon: '🎵' },
  { name: 'Productivity', icon: '⚡' },
  { name: 'Marketing', icon: '📈' },
  { name: 'Education', icon: '📚' },
  { name: 'Design', icon: '🎯' },
];

export default function CategoryFilter({ selected = 'All', onSelect }) {
  const { darkMode } = useTheme();

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
