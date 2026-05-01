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

  // Close on any link click
  const handleNavClick = () => setMenuOpen(false);

  // Close on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  // Prevent body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
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
    { name: '🏠 Home', path: '/' },
    { name: '🔧 All Tools', path: '/tools' },
    { name: '📂 Categories', path: '/categories' },
    { name: '📝 Blog', path: '/blog' },
    { name: 'ℹ️ About', path: '/about' },
    { name: '📞 Contact', path: '/contact' },
    { name: '➕ Submit Tool', path: '/submit' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        background: 'rgba(10,15,30,0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(139,92,246,0.2)',
        padding: '0 20px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          fontSize: '22px',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textDecoration: 'none'
        }}>
          AI ToolsDir
        </Link>

        {/* Desktop Nav */}
        <div className="desktop-nav" style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'center'
        }}>
          {navLinks.map(link => (
            <Link key={link.path} to={link.path}
              style={{
                color: location.pathname === link.path ? '#8B5CF6' : '#CBD5E1',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'color 0.2s'
              }}>
              {link.name.includes(' ') ? link.name.split(' ')[1] : link.name}
            </Link>
          ))}
          
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ color: '#CBD5E1', fontSize: '14px' }}>{user.username}</span>
              <button onClick={handleLogout} style={{
                padding: '8px 16px',
                border: '1px solid #8B5CF6',
                borderRadius: '8px',
                color: '#8B5CF6',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: '14px'
              }}>Logout</button>
            </div>
          ) : (
            <>
              <Link to="/login" style={{
                padding: '8px 16px',
                border: '1px solid #8B5CF6',
                borderRadius: '8px',
                color: '#8B5CF6',
                textDecoration: 'none',
                fontSize: '14px'
              }}>Login</Link>
              <Link to="/register" style={{
                padding: '8px 16px',
                background: '#8B5CF6',
                borderRadius: '8px',
                color: 'white',
                textDecoration: 'none',
                fontSize: '14px'
              }}>Register</Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px'
          }}>
          <span style={{
            display: 'block',
            width: '24px',
            height: '2px',
            background: menuOpen ? '#8B5CF6' : '#CBD5E1',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
          }}/>
          <span style={{
            display: 'block',
            width: '24px',
            height: '2px',
            background: '#CBD5E1',
            opacity: menuOpen ? 0 : 1,
            transition: 'all 0.3s'
          }}/>
          <span style={{
            display: 'block',
            width: '24px',
            height: '2px',
            background: menuOpen ? '#8B5CF6' : '#CBD5E1',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
          }}/>
        </button>
      </nav>

      {/* Dark Overlay - click to close */}
      {menuOpen && (
        <div
          onClick={handleNavClick}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            zIndex: 1001,
            backdropFilter: 'blur(4px)'
          }}
        />
      )}

      {/* Sidebar - slides from LEFT */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '280px',
        height: '100vh',
        background: '#0A0F1E',
        borderRight: '1px solid rgba(139,92,246,0.3)',
        zIndex: 1002,
        transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        overflowY: 'auto',
        paddingTop: '80px',
        paddingBottom: '40px'
      }}>
        {/* Sidebar Logo */}
        <div style={{
          padding: '0 24px 24px',
          borderBottom: '1px solid #1F2937',
          marginBottom: '16px'
        }}>
          <div style={{
            fontSize: '20px',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            AI ToolsDir
          </div>
          <div style={{
            fontSize: '12px',
            color: '#6B7280',
            marginTop: '4px'
          }}>
            Find the best AI tools
          </div>
        </div>

        {/* Nav Links */}
        {navLinks.map(link => (
          <Link
            key={link.path}
            to={link.path}
            onClick={handleNavClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 24px',
              color: location.pathname === link.path ? '#8B5CF6' : '#CBD5E1',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 500,
              borderBottom: '1px solid rgba(31,41,55,0.5)',
              transition: 'all 0.2s',
              background: location.pathname === link.path ? 'rgba(139,92,246,0.05)' : 'transparent'
            }}
          >
            <span>{link.name}</span>
          </Link>
        ))}

        {/* Login/Register */}
        <div style={{padding: '24px'}}>
          {user ? (
            <button
              onClick={handleLogout}
              style={{
                display: 'block',
                width: '100%',
                padding: '12px',
                border: '1px solid #8B5CF6',
                borderRadius: '10px',
                color: '#8B5CF6',
                background: 'transparent',
                textAlign: 'center',
                textDecoration: 'none',
                fontWeight: 600,
                cursor: 'pointer'
              }}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login"
                onClick={handleNavClick}
                style={{
                  display: 'block',
                  padding: '12px',
                  border: '1px solid #8B5CF6',
                  borderRadius: '10px',
                  color: '#8B5CF6',
                  textAlign: 'center',
                  marginBottom: '12px',
                  textDecoration: 'none',
                  fontWeight: 600
                }}>
                Login
              </Link>
              <Link to="/register"
                onClick={handleNavClick}
                style={{
                  display: 'block',
                  padding: '12px',
                  background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
                  borderRadius: '10px',
                  color: 'white',
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontWeight: 600
                }}>
                Register Free
              </Link>
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
