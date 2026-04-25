import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { HiMenu, HiX, HiMoon, HiSun, HiUserCircle } from 'react-icons/hi';

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Simulated user state - in a real app this would come from AuthContext
  const [user, setUser] = useState(null); 
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/tools', label: 'Tools' },
    { to: '/category/chatbots', label: 'Categories' }, // Simplification for nav
    { to: '/submit', label: 'Submit Tool' },
  ];

  const isActive = (path) => location.pathname === path;

  const userInitials = user ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'JD';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black tracking-tighter premium-gradient-text">
              AI ToolsDir
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-semibold transition-all duration-200 ${
                  isActive(link.to)
                    ? 'text-primary-light'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
            >
              {darkMode ? <HiSun size={22} /> : <HiMoon size={22} />}
            </button>

            {!user ? (
              <div className="flex items-center gap-3">
                <Link 
                  to="/login" 
                  className="px-5 py-2 text-sm font-bold text-primary-light border border-primary-light/40 rounded-xl hover:bg-primary/10 transition-all"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-5 py-2 text-sm font-bold text-white bg-primary rounded-xl hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm border-2 border-white/10"
                >
                  {userInitials}
                </button>
                {showUserDropdown && (
                  <div className="absolute right-0 mt-3 w-48 premium-card p-2 shadow-2xl">
                    <Link to="/admin" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg">My Dashboard</Link>
                    <Link to="/tools" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg">Saved Tools</Link>
                    <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg">Logout</button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-300"
          >
            {mobileOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-40 bg-dark-bg/95 backdrop-blur-xl lg:hidden transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-8 pt-24">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="text-3xl font-bold text-white mb-8"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-auto space-y-4">
            <Link to="/login" className="block w-full py-4 text-center font-bold text-primary-light border border-primary-light/40 rounded-2xl">Login</Link>
            <Link to="/register" className="block w-full py-4 text-center font-bold text-white bg-primary rounded-2xl">Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
