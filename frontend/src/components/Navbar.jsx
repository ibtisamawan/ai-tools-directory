import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]);

  // Close menu when link clicked
  const handleNavClick = () => {
    setMenuOpen(false);
  };

  // Close menu when outside clicked
  const handleOverlayClick = () => {
    setMenuOpen(false);
  };

  // Close on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('adminToken');
    setUser(null);
    navigate('/');
    handleNavClick();
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'Chatbots', path: '/tools?category=Chatbots' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Submit Tool', path: '/submit' },
  ];

  return (
    <nav className="sticky top-0 z-[1000] bg-[#0A0F1E]/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
          AI ToolsDir
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-purple-400 ${
                location.pathname === link.path ? 'text-purple-400' : 'text-gray-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">{user.username}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 text-sm hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-purple-400">
                Login
              </Link>
              <Link to="/register" className="px-5 py-2 rounded-lg bg-purple-600 text-white text-sm font-bold hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/20">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col space-y-1.5 p-2 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-purple-400 transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-purple-400 transition-opacity ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-purple-400 transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Sidebar System */}
      {menuOpen && (
        <div
          className="mobile-overlay fixed inset-0 bg-black/50 backdrop-blur-sm z-[998]"
          onClick={handleOverlayClick}
        />
      )}

      <div
        className={`mobile-sidebar fixed top-0 left-0 w-[280px] h-full bg-[#0A0F1E] border-r border-gray-800 z-[999] transform transition-transform duration-300 ease-in-out p-6 pt-24 overflow-y-auto ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-10">
          AI ToolsDir
        </div>
        
        <div className="flex flex-col space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={handleNavClick}
              className="block py-3 text-gray-300 hover:text-purple-400 border-b border-gray-800/50 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-6 space-y-3">
            {user ? (
              <>
                <div className="px-4 py-3 bg-gray-800/50 rounded-lg text-gray-300 text-sm">
                  Logged in as <span className="text-purple-400 font-bold">{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 border border-purple-500 text-purple-500 rounded-xl font-bold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={handleNavClick}
                  className="block w-full py-3 border border-purple-500 text-purple-500 rounded-xl text-center font-bold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={handleNavClick}
                  className="block w-full py-3 bg-purple-600 text-white rounded-xl text-center font-bold"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
