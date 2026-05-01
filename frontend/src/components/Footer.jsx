import React from 'react';
import { Link } from 'react-router-dom';

// Instagram Icon SVG:
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// LinkedIn Icon SVG:
const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// GitHub Icon SVG:
const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const Footer = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/i.awannn/',
      icon: <InstagramIcon />,
      color: '#E1306C'
    },
    {
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/malik-ibtisam-awan-458b93265/',
      icon: <LinkedInIcon />,
      color: '#0A66C2'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/ibtisamawan',
      icon: <GitHubIcon />,
      color: '#333'
    }
  ];

  return (
    <footer className="bg-[#0A0F1E] border-t border-gray-800 pt-16 pb-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Col 1 - Brand */}
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              AI ToolsDir
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Your trusted directory for finding the best AI tools to boost productivity, creativity, and growth.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-all duration-300 group"
                  style={{ color: '#9CA3AF' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = social.color;
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#1F2937';
                    e.currentTarget.style.color = '#9CA3AF';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 - Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-purple-400 transition-colors">Home</Link></li>
              <li><Link to="/tools" className="hover:text-purple-400 transition-colors">All Tools</Link></li>
              <li><Link to="/categories" className="hover:text-purple-400 transition-colors">Categories</Link></li>
              <li><Link to="/submit" className="hover:text-purple-400 transition-colors">Submit Tool</Link></li>
              <li><Link to="/admin" className="hover:text-purple-400 transition-colors">Admin Panel</Link></li>
            </ul>
          </div>
 
          {/* Col 3 - Company */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-purple-400 transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-purple-400 transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-purple-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-purple-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Col 4 - Top Categories */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Top Categories</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/tools?category=Chatbots" className="hover:text-purple-400 transition-colors">Chatbots</Link></li>
              <li><Link to="/tools?category=Image Generation" className="hover:text-purple-400 transition-colors">Image Generation</Link></li>
              <li><Link to="/tools?category=Coding" className="hover:text-purple-400 transition-colors">Coding Tools</Link></li>
              <li><Link to="/tools?category=Education" className="hover:text-purple-400 transition-colors">Education</Link></li>
            </ul>
          </div>

          {/* Col 5 - Recent Blog Posts */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Recent Posts</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/blog/ai-tools-to-make-money-2026" className="hover:text-purple-400 transition-colors">10 AI Tools to Make Money</Link></li>
              <li><Link to="/blog/best-ai-writing-tools-comparison" className="hover:text-purple-400 transition-colors">Best AI Writing Tools</Link></li>
              <li><Link to="/blog/build-website-fast-with-ai" className="hover:text-purple-400 transition-colors">Build Website with AI</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-xs">
            © 2026 AI Tools Directory. All rights reserved. Made with ❤️ in Pakistan 🇵🇰
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
