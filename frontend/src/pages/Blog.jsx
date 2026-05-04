import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import API from '../api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get('/blogs');
        if (res.data.success) {
          setPosts(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const featuredPost = posts.find(p => p.featured) || posts[0];
  const regularPosts = posts.filter(p => p._id !== (featuredPost?._id));

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0F1E] text-white py-12 px-4 md:py-20">
      <Helmet>
        <title>AI Tools Blog - Latest Reviews, Guides and News 2026 | AI Tools Directory</title>
        <meta name="description" content="Read the latest AI tool reviews, comparisons, and guides. Stay updated on the best artificial intelligence tools and learn how to use them effectively in 2026." />
        <link rel="canonical" href="https://ai-tools-directory-orpin.vercel.app/blog" />
      </Helmet>
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
            Latest <span className="text-purple-400">Insights</span>
          </h1>
          <p className="text-gray-400 text-lg">Discover 30+ unique guides, trends, and insights in the world of AI.</p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Link to={`/blog/${featuredPost.slug}`} className="group block mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#111827] border border-gray-800 rounded-[2.5rem] overflow-hidden p-6 md:p-10 hover:border-purple-500/50 transition-all">
              <div className="h-64 md:h-[400px] rounded-[2rem] flex items-center justify-center relative overflow-hidden bg-gray-900 shadow-2xl">
                {featuredPost.image ? (
                  <img src={featuredPost.image} alt={featuredPost.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-indigo-900 opacity-50"></div>
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
                <p className="text-gray-400 text-lg leading-relaxed line-clamp-3">
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
