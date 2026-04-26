import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
  const posts = [
    {
      slug: 'top-10-ai-tools-2026',
      title: 'Top 10 AI Tools You Must Try in 2026',
      category: 'AI Tools',
      color: 'purple',
      time: '5 min',
      date: 'April 20, 2026',
      summary: 'AI tools are transforming how we work in 2026. From writing to image generation here are the top 10 tools everyone must try.',
      featured: true
    },
    {
      slug: 'chatgpt-vs-claude-vs-gemini',
      title: 'ChatGPT vs Claude vs Gemini: Which AI is Best in 2026?',
      category: 'Comparison',
      color: 'blue',
      time: '8 min',
      date: 'April 18, 2026',
      summary: 'We compared the three biggest AI chatbots to help you choose right. Detailed analysis of features and pricing.',
    },
    {
      slug: 'ai-tools-make-money-pakistan',
      title: 'How to Use AI Tools to Make Money Online in Pakistan',
      category: 'Make Money',
      color: 'green',
      time: '6 min',
      date: 'April 15, 2026',
      summary: 'Pakistani freelancers are using AI to earn dollars online. Here is how you can do the same on Fiverr and Upwork.',
    },
    {
      slug: 'best-free-ai-image-generators',
      title: 'Best Free AI Image Generators Compared for 2026',
      category: 'Image AI',
      color: 'pink',
      time: '5 min',
      date: 'April 12, 2026',
      summary: 'We tested all top free AI image generators so you do not have to. Midjourney vs DALL-E vs Stable Diffusion.',
    },
    {
      slug: 'ai-tools-for-students',
      title: 'AI Tools for Students: Study Smarter Not Harder in 2026',
      category: 'Education',
      color: 'orange',
      time: '4 min',
      date: 'April 10, 2026',
      summary: 'Students worldwide use AI to study more effectively. Here are the best AI tools for homework and learning.',
    },
    // 15 New Blog Post Ideas (Placeholders)
    { slug: 'ai-for-small-business', title: 'How Small Businesses Can Leverage AI in 2026', category: 'Business', color: 'blue', time: '6 min', date: 'April 08, 2026', summary: 'AI is no longer just for big corporations. See how small businesses can thrive with AI.' },
    { slug: 'ai-video-editing-tools', title: 'Top 5 AI Video Editors for YouTube & Reels', category: 'Video', color: 'purple', time: '5 min', date: 'April 05, 2026', summary: 'Edit videos 10x faster with these amazing AI-powered editing tools.' },
    { slug: 'ai-ethics-2026', title: 'The Ethics of AI in 2026: What You Need to Know', category: 'AI News', color: 'pink', time: '7 min', date: 'April 02, 2026', summary: 'As AI becomes more human-like, ethical considerations are more important than ever.' },
    { slug: 'ai-coding-for-beginners', title: 'Start Coding with AI: A Guide for Beginners', category: 'Coding', color: 'green', time: '10 min', date: 'March 30, 2026', summary: 'You don\'t need to be an expert to code. AI tools can help you build your first app today.' },
    { slug: 'future-of-ai-jobs', title: 'Future of Jobs: Will AI Replace Your Career?', category: 'Career', color: 'orange', time: '8 min', date: 'March 28, 2026', summary: 'A deep dive into how AI is reshaping the job market and which skills will be in demand.' },
    { slug: 'ai-in-healthcare-breakthroughs', title: 'AI Breakthroughs in Healthcare: Saving Lives in 2026', category: 'Healthcare', color: 'blue', time: '6 min', date: 'March 25, 2026', summary: 'How AI is helping doctors diagnose diseases faster and more accurately than ever.' },
    { slug: 'ai-social-media-marketing', title: 'Master Social Media Marketing with AI Tools', category: 'Marketing', color: 'purple', time: '5 min', date: 'March 22, 2026', summary: 'Automate your social media presence and grow your following with AI automation.' },
    { slug: 'ai-content-writing-tips', title: 'How to Write Better Content with AI Assistance', category: 'Writing', color: 'pink', time: '4 min', date: 'March 20, 2026', summary: 'Stop staring at a blank screen. Use AI to brainstorm, outline, and polish your writing.' },
    { slug: 'best-ai-productivity-apps', title: 'Best AI Productivity Apps to Save 2 Hours Daily', category: 'Productivity', color: 'green', time: '5 min', date: 'March 18, 2026', summary: 'Streamline your workflow and get more done with these essential AI tools.' },
    { slug: 'ai-data-analysis-for-everyone', title: 'AI Data Analysis: No Technical Skills Required', category: 'Data', color: 'orange', time: '6 min', date: 'March 15, 2026', summary: 'Analyze complex data sets and get actionable insights using simple AI tools.' },
    { slug: 'ai-translation-tools-2026', title: 'Top AI Translation Tools for Global Business', category: 'Business', color: 'blue', time: '4 min', date: 'March 12, 2026', summary: 'Break language barriers and expand your business globally with real-time AI translation.' },
    { slug: 'ai-personal-finance-managers', title: 'Manage Your Money Smarter with AI Finance Tools', category: 'Finance', color: 'purple', time: '5 min', date: 'March 10, 2026', summary: 'Take control of your budget and investments with personalized AI financial advice.' },
    { slug: 'ai-cybersecurity-trends', title: 'AI in Cybersecurity: Protecting Your Data in 2026', category: 'Security', color: 'pink', time: '7 min', date: 'March 08, 2026', summary: 'Stay ahead of cyber threats with AI-powered security systems and tools.' },
    { slug: 'best-ai-tools-for-graphic-design', title: 'Best AI Tools for Graphic Designers in 2026', category: 'Design', color: 'green', time: '6 min', date: 'March 05, 2026', summary: 'From logos to layouts, see how AI is helping designers create stunning visuals.' },
    { slug: 'ai-for-real-estate-agents', title: 'How AI is Transforming the Real Estate Industry', category: 'Real Estate', color: 'orange', time: '5 min', date: 'March 02, 2026', summary: 'Sell properties faster and manage listings more efficiently with AI real estate tools.' },
  ];

  const featuredPost = posts.find(p => p.featured);
  const regularPosts = posts.filter(p => !p.featured);

  const getTagColor = (color) => {
    const colors = {
      purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      pink: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    };
    return colors[color] || colors.purple;
  };

  return (
    <div className="bg-[#0A0F1E] text-white py-12 px-4 md:py-20">
      <Helmet>
        <title>AI Blog - Latest Trends, Guides & Tools 2026 | AI Tools Directory</title>
        <meta name="description" content="Stay updated with the latest AI trends, tutorials, and tool reviews. Learn how to use AI to boost productivity and earn money online." />
      </Helmet>
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
            Latest <span className="text-purple-400">Insights</span>
          </h1>
          <p className="text-gray-400 text-lg">Discover the latest trends, insights, and guides in the world of AI.</p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Link to={`/blog/${featuredPost.slug}`} className="group block mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#111827] border border-gray-800 rounded-[2.5rem] overflow-hidden p-6 md:p-10 hover:border-purple-500/50 transition-all">
              <div className="h-64 md:h-[400px] bg-gradient-to-br from-purple-900 to-indigo-900 rounded-[2rem] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                <span className="text-6xl font-black text-white/10 uppercase tracking-tighter select-none">AI TOOLS</span>
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${getTagColor(featuredPost.color)}`}>
                    ★ FEATURED
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className={`px-4 py-1 rounded-full text-xs font-bold border ${getTagColor(featuredPost.color)}`}>
                    {featuredPost.category}
                  </span>
                  <span>{featuredPost.date}</span>
                  <span>• {featuredPost.time}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight group-hover:text-purple-400 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {featuredPost.summary}
                </p>
                <div className="flex items-center text-purple-400 font-bold">
                  Read More <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group block h-full">
              <div className="flex flex-col h-full bg-[#111827] border border-gray-800 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all">
                <div className="h-48 bg-gradient-to-br from-gray-800 to-purple-900/20 flex items-center justify-center">
                   <span className="text-4xl font-black text-white/5 uppercase tracking-tighter">{post.category}</span>
                </div>
                <div className="p-6 flex flex-col flex-1 space-y-4">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className={`px-3 py-1 rounded-full font-bold border ${getTagColor(post.color)}`}>
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold line-clamp-2 group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed flex-1">
                    {post.summary}
                  </p>
                  <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium tracking-wider">{post.time} read</span>
                    <span className="text-purple-400 font-bold text-sm">Read More →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
