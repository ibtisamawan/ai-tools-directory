import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const categoriesData = [
  { icon: '🤖', name: 'Chatbots', count: 8, desc: 'AI conversational agents and assistants' },
  { icon: '🎨', name: 'Image Generation', count: 4, desc: 'Create AI-generated images and art' },
  { icon: '✍️', name: 'Writing', count: 4, desc: 'AI tools for copywriting and editing' },
  { icon: '🎬', name: 'Video', count: 3, desc: 'Generate and edit videos with AI' },
  { icon: '🎵', name: 'Audio', count: 2, desc: 'Voice synthesis and audio generation' },
  { icon: '💻', name: 'Coding', count: 11, desc: 'AI programming assistants and code generators' },
  { icon: '⚡', name: 'Productivity', count: 1, desc: 'Tools to boost your daily workflow' },
  { icon: '🖌️', name: 'Design', count: 1, desc: 'AI graphic design and UI/UX tools' },
  { icon: '🎓', name: 'Education', count: 10, desc: 'Learning and teaching with AI' },
  { icon: '📈', name: 'Marketing', count: 10, desc: 'SEO, ads, and digital marketing AI' },
  { icon: '🏥', name: 'Healthcare', count: 8, desc: 'Medical and diagnostic AI applications' },
  { icon: '💰', name: 'Finance', count: 8, desc: 'AI for trading, accounting, and analytics' },
  { icon: '🎧', name: 'Customer Service', count: 6, desc: 'Automate support and customer interactions' },
  { icon: '🎶', name: 'Music', count: 6, desc: 'Compose and produce music with AI' },
  { icon: '📊', name: 'Data Analytics', count: 6, desc: 'Analyze and visualize data easily' },
  { icon: '👥', name: 'HR & Recruiting', count: 5, desc: 'Streamline hiring and employee management' },
  { icon: '🛒', name: 'E-commerce', count: 5, desc: 'AI solutions for online retail' },
  { icon: '📱', name: 'Social Media', count: 5, desc: 'Manage and grow your social presence' },
  { icon: '⚖️', name: 'Legal', count: 4, desc: 'Contract analysis and legal research AI' },
  { icon: '🏠', name: 'Real Estate', count: 4, desc: 'Property management and valuation tools' },
  { icon: '🔒', name: 'Cybersecurity', count: 4, desc: 'AI-powered threat detection and security' },
  { icon: '✈️', name: 'Travel', count: 4, desc: 'Trip planning and hospitality AI' },
  { icon: '🎮', name: '3D & Animation', count: 3, desc: 'Generate 3D models and animations' },
  { icon: '🍎', name: 'Food & Nutrition', count: 2, desc: 'Diet planning and recipe generation' },
  { icon: '💪', name: 'Sports & Fitness', count: 2, desc: 'Workout planning and performance tracking' },
];

export default function Categories() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pb-20">
      <Helmet>
        <title>AI Tools Categories - Browse 25 AI Tool Categories | AI Tools Directory</title>
        <meta name="description" content="Explore 25 AI tool categories including chatbots, image generation, coding, marketing, education, healthcare and more. Find the best AI tools by category." />
        <meta name="keywords" content="AI tool categories, AI chatbots, AI image tools, AI coding tools, AI marketing tools" />
        <link rel="canonical" href="https://ai-tools-directory-orpin.vercel.app/categories" />
        <meta property="og:title" content="AI Tools Categories - Browse 25 AI Tool Categories | AI Tools Directory" />
        <meta property="og:description" content="Explore 25 AI tool categories including chatbots, image generation, coding, marketing, education, healthcare and more. Find the best AI tools by category." />
        <meta property="og:url" content="https://ai-tools-directory-orpin.vercel.app/categories" />
        <meta name="twitter:title" content="AI Tools Categories - Browse 25 AI Tool Categories | AI Tools Directory" />
        <meta name="twitter:description" content="Explore 25 AI tool categories including chatbots, image generation, coding, marketing, education, healthcare and more. Find the best AI tools by category." />
      </Helmet>

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1a0533] to-dark-bg border-b border-primary/10 mb-12">
        <div className="blur-circle w-[400px] h-[400px] bg-primary/10 top-0 left-0"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            📂 Browse by Category
          </h1>
          <p className="text-[#94A3B8] font-medium text-lg max-w-2xl mx-auto">
            Explore 25 AI tool categories. Find exactly what you need to supercharge your workflow.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoriesData.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/tools?category=${encodeURIComponent(cat.name)}`)}
              className="group relative bg-[#111827] border border-[#1F2937] rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-primary hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 flex flex-col items-center text-center"
            >
              {/* Emoji Icon */}
              <div className="text-[64px] leading-none mb-4 transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110">
                {cat.icon}
              </div>

              {/* Category Name */}
              <h3 className="text-[18px] font-bold text-white mb-2">
                {cat.name}
              </h3>

              {/* Tool Count Badge */}
              <div className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs font-semibold text-primary-light mb-3">
                {cat.count} tools
              </div>

              {/* Description */}
              <p className="text-sm text-gray-400 mb-6 flex-grow">
                {cat.desc}
              </p>

              {/* Button */}
              <button className="text-sm font-bold text-white bg-white/5 border border-white/10 px-4 py-2 rounded-lg transition-colors group-hover:bg-primary group-hover:border-primary w-full">
                Browse Tools →
              </button>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Add bouncing animation to emoji on hover */
        .group:hover .text-\\[64px\\] {
          animation: bounce-emoji 0.5s cubic-bezier(0.28, 0.84, 0.42, 1);
        }
        @keyframes bounce-emoji {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
          100% { transform: translateY(-8px) scale(1.1); } /* End slightly translated up as per hover state */
        }
      `}</style>
    </div>
  );
}
