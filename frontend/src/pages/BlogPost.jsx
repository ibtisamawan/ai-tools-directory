import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const BlogPost = () => {
  const { slug } = useParams();

  // Data for all blog posts
  const allContent = {
    'top-10-ai-tools-2026': {
      title: 'Top 10 AI Tools You Must Try in 2026',
      category: 'AI Tools',
      date: 'April 20, 2026',
      time: '10 min',
      image: '/blog/top-10-ai.png',
      description: 'The ultimate guide to the most transformative AI tools of 2026. From generative video to autonomous coding agents.',
      body: `
        <p>AI tools are transforming how we work in 2026. From writing to image generation, here are the top 10 tools everyone must try to stay ahead in their career and creative pursuits.</p>
        
        <h2>1. ChatGPT (OpenAI)</h2>
        <p>Still the gold standard for conversational AI, the 2026 version offers deeper multimodal understanding and real-time world synchronization. It can now act as a full personal agent, managing your calendar, emails, and even complex project planning with ease.</p>
        
        <h2>2. Claude (Anthropic)</h2>
        <p>Claude remains the safest and most reliable assistant for complex document analysis and long-form writing. Its "Constitutional AI" approach ensures that outputs are not only high-quality but also ethically aligned.</p>
        
        <h2>3. Midjourney v7</h2>
        <p>With its v7 release, Midjourney now generates near-photorealistic video from simple text prompts, setting a new bar for digital art. The level of detail and artistic control is unprecedented.</p>
        
        <h2>4. GitHub Copilot Workspace</h2>
        <p>The developer's best friend has evolved into a full autonomous coding agent that can build entire features from natural language specs. It doesn't just suggest lines of code anymore; it plans, writes, and tests full applications.</p>

        <h2>5. Perplexity AI</h2>
        <p>The definitive search engine for the AI age, providing cited answers and real-time research in seconds. It has replaced traditional search for millions of students and professionals.</p>
      `
    },
    'mastering-ai-tool-seo-2026': {
      title: 'Mastering AI Tool SEO in 2026: How to Rank Your Directory',
      category: 'SEO',
      date: 'April 25, 2026',
      time: '12 min',
      image: '/blog/ai-seo.png',
      description: 'Learn the secret strategies to rank your AI tool directory on the first page of Google. From structured data to content clusters.',
      body: `
        <p>Building an AI tool directory is easy, but getting it to rank in 2026 is a massive challenge. Here is how you dominate the rankings.</p>
        
        <h2>1. Structured Data is No Longer Optional</h2>
        <p>In 2026, search engines rely heavily on <strong>JSON-LD</strong> to understand the entities on your page. For an AI directory, you MUST use <em>SoftwareApplication</em> schema for tools.</p>
        
        <h2>2. Content Velocity vs. Content Quality</h2>
        <p>Don't just auto-generate descriptions. Search engines now detect "low-effort" AI content. To rank, you need to add unique human value—real user reviews and expert analysis.</p>
        
        <h2>3. Technical Performance</h2>
        <p>Your site must be blazing fast. In 2026, Google prioritizes "Interaction to Next Paint" (INP). Using frameworks like <strong>Vite</strong> and <strong>React</strong> with proper code splitting is essential.</p>
      `
    },
    'ai-tools-make-money-pakistan': {
      title: 'How to Use AI Tools to Make Money Online in Pakistan',
      category: 'Make Money',
      date: 'April 15, 2026',
      time: '12 min',
      image: '/blog/ai-pakistan.png',
      description: 'A comprehensive guide for Pakistani freelancers and entrepreneurs on how to use AI tools to earn dollars on Fiverr, Upwork, and more.',
      body: `
        <p>The digital landscape in Pakistan is shifting rapidly. Pakistani freelancers are using AI tools to increase their output by 5x to 10x and earn significantly more in dollars.</p>
        
        <h2>1. Freelance Content Writing with AI</h2>
        <p>Tools like <strong>ChatGPT</strong> and <strong>Jasper</strong> can help you generate ideas, outlines, and first drafts. The key is to add your "human touch"—fact-checking and localizing the content.</p>
        
        <h2>2. Graphic Design & Social Media</h2>
        <p>Using <strong>Canva Magic Studio</strong> and <strong>Midjourney</strong>, you can create stunning visuals for international clients. You can offer services like "AI Brand Identity Design."</p>
      `
    },
    'ai-tools-for-students': {
      title: 'AI Tools for Students: Study Smarter Not Harder in 2026',
      category: 'Education',
      date: 'April 10, 2026',
      time: '8 min',
      image: '/blog/ai-students.png',
      description: 'The best AI tools for students to help with homework, research, writing, and language learning. Study more effectively in 2026.',
      body: `
        <p>Education is being redefined by artificial intelligence. Students who know how to use these tools responsibly are seeing massive improvements in their grades.</p>
        
        <h2>1. Perplexity: The Research Partner</h2>
        <p>Forget scrolling through pages of Google results. Perplexity gives you direct, cited answers to your questions. It's perfect for finding reliable sources for your essays.</p>
        
        <h2>2. Khanmigo: Your Personal AI Tutor</h2>
        <p>Developed by Khan Academy, Khanmigo doesn't just give you the answers; it guides you through the process of solving math problems or understanding scientific concepts.</p>
      `
    }
  };

  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const extractHeaders = (html) => {
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

  const post = allContent[slug] || {
    title: 'Post Not Found',
    category: 'Unknown',
    date: 'Unknown',
    time: 'Unknown',
    description: 'The article you are looking for does not exist.',
    body: '<p>The article you are looking for does not exist or has been moved.</p>'
  };

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
        <meta name="description" content={post.description} />
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
