import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogPost = () => {
  const { slug } = useParams();

  // Mock data for content
  const content = {
    'top-10-ai-tools-2026': {
      title: 'Top 10 AI Tools You Must Try in 2026',
      category: 'AI Tools',
      date: 'April 20, 2026',
      time: '5 min',
      body: `
        <p>AI tools are transforming how we work in 2026. From writing to image generation, here are the top 10 tools everyone must try to stay ahead in their career and creative pursuits.</p>
        
        <h2>1. ChatGPT (OpenAI)</h2>
        <p>Still the gold standard for conversational AI, the 2026 version offers deeper multimodal understanding and real-time world synchronization.</p>
        
        <h2>2. Claude (Anthropic)</h2>
        <p>Claude remains the safest and most reliable assistant for complex document analysis and long-form writing.</p>
        
        <h2>3. Midjourney</h2>
        <p>With its v7 release, Midjourney now generates near-photorealistic video from simple text prompts, setting a new bar for digital art.</p>
        
        <h2>4. GitHub Copilot</h2>
        <p>The developer's best friend has evolved into a full autonomous coding agent that can build entire features from natural language specs.</p>

        <h2>5. Perplexity</h2>
        <p>The definitive search engine for the AI age, providing cited answers and real-time research in seconds.</p>
      `
    },
    // Add more mock content here as needed
  };

  const post = content[slug] || {
    title: 'Post Not Found',
    category: 'Unknown',
    date: 'Unknown',
    time: 'Unknown',
    body: '<p>The article you are looking for does not exist or has been moved.</p>'
  };

  return (
    <div className="bg-[#0A0F1E] text-white py-12 px-4 md:py-20">
      <article className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <span className="px-4 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs font-bold uppercase tracking-widest">
              {post.category}
            </span>
            <span className="text-gray-500 text-sm">{post.date}</span>
            <span className="text-gray-500 text-sm">• {post.time} read</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center space-x-3">
             <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold">AT</div>
             <div className="text-left">
               <div className="font-bold">AI Tools Team</div>
               <div className="text-xs text-gray-500">Expert Curators</div>
             </div>
          </div>
        </div>

        {/* Hero Image / Gradient */}
        <div className="h-64 md:h-96 rounded-[2.5rem] mb-12 bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
          <span className="text-8xl font-black text-white/5 uppercase select-none">READING</span>
        </div>

        {/* Content */}
        <div className="bg-[#111827] border border-gray-800 p-8 md:p-12 rounded-[2.5rem] mb-12">
          <div 
            className="prose prose-invert max-w-none prose-h2:text-2xl prose-h2:text-purple-400 prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-p:text-gray-400 prose-p:leading-relaxed prose-p:mb-6 prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          <div className="mt-12 pt-12 border-t border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {['AI', 'Technology', 'Future', 'Tools'].map(tag => (
                <span key={tag} className="px-4 py-1.5 bg-gray-800 rounded-lg text-sm text-gray-400">#{tag}</span>
              ))}
            </div>
            <div className="flex space-x-4">
               <button className="flex-1 md:flex-none px-6 py-2 border border-gray-800 rounded-xl hover:border-purple-500 transition-colors text-sm">Share on Twitter</button>
               <button className="flex-1 md:flex-none px-6 py-2 border border-gray-800 rounded-xl hover:border-purple-500 transition-colors text-sm">Share on LinkedIn</button>
            </div>
          </div>
        </div>

        {/* Author Footer */}
        <div className="p-8 rounded-[2.5rem] bg-[#111827] border border-gray-800 flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full bg-purple-600 flex-shrink-0 flex items-center justify-center text-2xl font-bold">AT</div>
          <div>
            <h3 className="text-xl font-bold mb-2">AI Tools Team</h3>
            <p className="text-gray-400 text-sm">We review and curate the best AI tools for everyone. Our team of experts tests hundreds of tools to ensure you get the best recommendations.</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/blog" className="text-purple-400 font-bold hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
