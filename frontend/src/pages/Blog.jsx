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
      featured: true,
      image: '/blog/top-10-ai.png'
    },
    {
      slug: 'mastering-ai-tool-seo-2026',
      title: 'Mastering AI Tool SEO in 2026: How to Rank Your Directory',
      category: 'SEO',
      color: 'green',
      time: '12 min',
      date: 'April 25, 2026',
      summary: 'Learn the secret strategies to rank your AI tool directory on the first page of Google. From structured data to content clusters.',
      image: '/blog/ai-seo.png'
    },
    {
      slug: 'ai-tools-make-money-pakistan',
      title: 'How to Use AI Tools to Make Money Online in Pakistan',
      category: 'Make Money',
      color: 'green',
      time: '6 min',
      date: 'April 15, 2026',
      summary: 'Pakistani freelancers are using AI to earn dollars online. Here is how you can do the same on Fiverr and Upwork.',
      image: '/blog/ai-pakistan.png'
    },
    {
      slug: 'ai-tools-for-students',
      title: 'AI Tools for Students: Study Smarter Not Harder in 2026',
      category: 'Education',
      color: 'orange',
      time: '4 min',
      date: 'April 10, 2026',
      summary: 'Students worldwide use AI to study more effectively. Here are the best AI tools for homework and learning.',
      image: '/blog/ai-students.png'
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
      slug: 'best-free-ai-image-generators',
      title: 'Best Free AI Image Generators Compared for 2026',
      category: 'Image AI',
      color: 'pink',
      time: '5 min',
      date: 'April 12, 2026',
      summary: 'We tested all top free AI image generators so you do not have to. Midjourney vs DALL-E vs Stable Diffusion.',
    },
    { slug: 'ai-tools-to-make-money-2026', title: '10 AI Tools to Make Money Online in 2026', category: 'Make Money', color: 'green', time: '8 min', date: 'April 08, 2026', summary: 'Learn how to use the latest AI tools to create multiple income streams online this year.' },
    { slug: 'best-ai-writing-tools-comparison', title: 'Best AI Writing Tools: ChatGPT vs Claude vs Jasper', category: 'Writing', color: 'purple', time: '7 min', date: 'April 05, 2026', summary: 'We compare the top AI writing assistants to help you choose the best one for your content needs.' },
    { slug: 'build-website-fast-with-ai', title: 'How to Build a Website in 10 Minutes with AI', category: 'Coding', color: 'blue', time: '6 min', date: 'April 02, 2026', summary: 'No coding skills? No problem. Use AI website builders to launch your site in record time.' },
    { slug: 'top-ai-image-generators-designers', title: 'Top 7 AI Image Generators for Designers', category: 'Design', color: 'pink', time: '5 min', date: 'March 30, 2026', summary: 'From logos to complex illustrations, these AI image tools are a must for every designer.' },
    { slug: 'ai-study-tips-for-students', title: 'AI for Students: How to Study Smarter with AI', category: 'Education', color: 'orange', time: '6 min', date: 'March 28, 2026', summary: 'Unlock your academic potential with these essential AI tools and study hacks.' },
    { slug: 'will-ai-replace-programmers', title: 'Will AI Replace Programmers? The Future of Coding', category: 'Coding', color: 'green', time: '10 min', date: 'March 25, 2026', summary: 'An honest look at how AI is changing software development and what it means for your career.' },
    { slug: 'free-ai-tools-for-business', title: 'Best Free AI Tools for Small Business Owners', category: 'Business', color: 'blue', time: '7 min', date: 'March 22, 2026', summary: 'Grow your business without breaking the bank using these powerful free AI resources.' },
    { slug: 'create-ai-videos-for-youtube', title: 'How to Create AI-Generated Videos for YouTube', category: 'Video', color: 'purple', time: '9 min', date: 'March 20, 2026', summary: 'Step-by-step guide to creating high-quality YouTube content using AI video and voice tools.' },
    { slug: 'midjourney-pro-tips-tricks', title: 'Mastering Midjourney: Tips and Tricks for Pro Art', category: 'Design', color: 'pink', time: '8 min', date: 'March 18, 2026', summary: 'Take your AI art to the next level with advanced Midjourney prompting techniques.' },
    { slug: 'future-of-ai-2026-predictions', title: 'AI in 2026: What to Expect Next?', category: 'AI News', color: 'orange', time: '6 min', date: 'March 15, 2026', summary: 'A look into the near future of artificial intelligence and how it will impact our daily lives.' },
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
        <title>AI Tools Blog - Latest Reviews, Guides and News 2026 | AI Tools Directory</title>
        <meta name="description" content="Read the latest AI tool reviews, comparisons, and guides. Stay updated on the best artificial intelligence tools and learn how to use them effectively in 2026." />
        <meta name="keywords" content="AI tools blog, AI tools review, AI tools guide, best AI tools 2026, AI news" />
        <link rel="canonical" href="https://ai-tools-directory-orpin.vercel.app/blog" />
        <meta property="og:title" content="AI Tools Blog - Latest Reviews, Guides and News 2026 | AI Tools Directory" />
        <meta property="og:description" content="Read the latest AI tool reviews, comparisons, and guides. Stay updated on the best artificial intelligence tools and learn how to use them effectively in 2026." />
        <meta property="og:url" content="https://ai-tools-directory-orpin.vercel.app/blog" />
        <meta name="twitter:title" content="AI Tools Blog - Latest Reviews, Guides and News 2026 | AI Tools Directory" />
        <meta name="twitter:description" content="Read the latest AI tool reviews, comparisons, and guides. Stay updated on the best artificial intelligence tools and learn how to use them effectively in 2026." />
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
              <div className="h-64 md:h-[400px] rounded-[2rem] flex items-center justify-center relative overflow-hidden bg-gray-900">
                {featuredPost.image ? (
                  <img src={featuredPost.image} alt={featuredPost.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-indigo-900 opacity-50"></div>
                    <span className="text-6xl font-black text-white/10 uppercase tracking-tighter select-none">AI TOOLS</span>
                  </>
                )}
                <div className="absolute top-4 left-4 z-10">
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
                <div className="h-48 flex items-center justify-center relative overflow-hidden bg-gray-900">
                  {post.image ? (
                    <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-purple-900/20"></div>
                  )}
                   <span className="relative z-10 text-4xl font-black text-white/5 uppercase tracking-tighter">{post.category}</span>
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
