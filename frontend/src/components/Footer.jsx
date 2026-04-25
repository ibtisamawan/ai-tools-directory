import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FaTwitter, FaGithub, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  const { darkMode } = useTheme();

  const socialLinks = [
    { icon: <FaTwitter />, href: '#' },
    { icon: <FaGithub />, href: '#' },
    { icon: <FaLinkedinIn />, href: '#' },
  ];

  return (
    <footer className="bg-[#060A14] border-t border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Logo + Info */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-black premium-gradient-text">AI ToolsDir</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Discover the best AI tools for every task. Your curated directory of artificial intelligence solutions for productivity, creativity, and business growth.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[['/', 'Home'], ['/tools', 'Browse Tools'], ['/submit', 'Submit Tool'], ['/admin', 'Admin Panel']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-gray-500 text-sm hover:text-primary-light transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h3 className="text-white font-bold mb-6">Top Categories</h3>
            <ul className="space-y-4">
              {['Chatbots', 'Image Generation', 'Writing', 'Video', 'Coding'].map(cat => (
                <li key={cat}>
                  <Link to={`/category/${cat.toLowerCase().replace(/ /g, '-')}`} className="text-gray-500 text-sm hover:text-primary-light transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter Mini */}
          <div>
            <h3 className="text-white font-bold mb-6">Weekly Updates</h3>
            <p className="text-gray-500 text-sm mb-4">Get AI news & tools in your inbox.</p>
            <div className="flex bg-[#111827] rounded-lg overflow-hidden border border-gray-800 focus-within:border-primary transition-colors">
              <input 
                type="email" 
                placeholder="Email..."
                className="bg-transparent px-4 py-2 text-xs text-white outline-none w-full"
              />
              <button className="bg-primary px-4 py-2 text-white text-xs font-bold hover:bg-primary-dark transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#1F2937] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} AI ToolsDir. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Made with <span className="text-red-500">❤️</span> for AI enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
}
