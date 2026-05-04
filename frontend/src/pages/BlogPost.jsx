import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import API from '../api';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/blogs/${slug}`);
        if (res.data.success) {
          setPost(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch blog post:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const extractHeaders = (html) => {
    if (!html) return [];
    const regex = /<h2>(.*?)<\/h2>/g;
    const headers = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      const cleanText = match[1].replace(/<[^>]*>?/gm, '');
      const id = cleanText.toLowerCase().replace(/\s+/g, '-');
      headers.push({ text: cleanText, id });
    }
    return headers;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-black mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-purple-400 hover:underline">Back to Blog</Link>
      </div>
    );
  }

  const headers = extractHeaders(post.body);
  const bodyWithIds = post.body.replace(/<h2>(.*?)<\/h2>/g, (match, p1) => {
    const id = p1.replace(/<[^>]*>?/gm, '').toLowerCase().replace(/\s+/g, '-');
    return `<h2 id="${id}">${p1}</h2>`;
  });

  return (
    <div className="bg-[#0A0F1E] text-white py-12 px-4 md:py-20">
      <div 
        className="fixed top-0 left-0 h-1 bg-primary z-[100] transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
      <Helmet>
        <title>{post.title} | AI Tools Blog</title>
        <meta name="description" content={post.summary} />
      </Helmet>
      <article className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <span className="px-4 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs font-bold uppercase tracking-widest">
              {post.category}
            </span>
            <span className="text-gray-500 text-sm">{post.date}</span>
            <span className="text-gray-500 text-sm">• {post.time} read</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
            {post.title}
          </h1>
        </div>

        <div className="h-64 md:h-96 rounded-[2.5rem] mb-12 bg-gray-900 flex items-center justify-center relative overflow-hidden shadow-2xl border border-gray-800">
          {post.image ? (
            <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-indigo-900 opacity-50"></div>
              <span className="text-8xl font-black text-white/5 uppercase select-none tracking-tighter">READING</span>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs border-l-2 border-purple-500 pl-4">Table of Contents</h4>
              <nav className="space-y-4">
                {headers.map((header) => (
                  <a 
                    key={header.id} 
                    href={`#${header.id}`}
                    className="block text-gray-500 hover:text-purple-400 text-sm font-medium transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(header.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {header.text}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-[#111827] border border-gray-800 p-8 md:p-12 rounded-[2.5rem] mb-12 shadow-2xl">
              <div 
                className="prose prose-invert max-w-none prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:text-purple-400 prose-h2:font-black prose-h2:mt-10 prose-h2:mb-6 prose-p:text-gray-400 prose-p:leading-relaxed prose-p:mb-6 prose-strong:text-white prose-p:text-lg"
                dangerouslySetInnerHTML={{ __html: bodyWithIds }}
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <Link to="/blog" className="inline-flex items-center gap-2 text-purple-400 font-black hover:text-white transition-all text-lg group">
            <span className="group-hover:-translate-x-2 transition-transform">←</span> Back to Blog Articles
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
