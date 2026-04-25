import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0A0F1E] border-t border-gray-800 pt-16 pb-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Col 1 - Brand */}
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              AI ToolsDir
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Your trusted directory for finding the best AI tools to boost productivity, creativity, and growth.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'LinkedIn', 'GitHub'].map(social => (
                <button key={social} className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <span className="text-xs font-bold">{social[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Col 2 - Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-purple-400 transition-colors">Home</Link></li>
              <li><Link to="/tools" className="hover:text-purple-400 transition-colors">All Tools</Link></li>
              <li><Link to="/tools" className="hover:text-purple-400 transition-colors">Categories</Link></li>
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
              <li><Link to="/tools?category=Marketing" className="hover:text-purple-400 transition-colors">Marketing</Link></li>
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
