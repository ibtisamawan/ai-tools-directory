import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import FAQ from '../components/FAQ';

const About = () => {
  const stats = [
    { label: 'AI Tools Listed', value: '126+' },
    { label: 'Categories', value: '25' },
    { label: 'Free to Use', value: '100%' },
    { label: 'New Tools Added', value: 'Daily' },
  ];

  const features = [
    { icon: '🔍', title: 'Easy Discovery', desc: 'Find tools by category pricing or search' },
    { icon: '⭐', title: 'Trusted Reviews', desc: 'Real ratings from real users worldwide' },
    { icon: '🆕', title: 'Always Updated', desc: 'New tools added every week' },
    { icon: '💰', title: '100% Free', desc: 'No subscription needed ever' },
    { icon: '🌍', title: 'Global Coverage', desc: 'Tools from companies worldwide' },
    { icon: '📱', title: 'Mobile Friendly', desc: 'Works perfectly on all devices' },
  ];

  return (
    <div className="bg-[#0A0F1E] text-white">
      <Helmet>
        <title>About AI Tools Directory - Your Trusted AI Tools Guide</title>
        <meta name="description" content="Learn about AI Tools Directory - the free platform helping users discover the best AI tools. Our mission, story, and team." />
      </Helmet>
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden" style={{ background: 'radial-gradient(ellipse at top, #1a0533, #0A0F1E)' }}>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">AI Tools Directory</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto hero-subtitle">
            Your trusted guide to the best AI tools in the world
          </p>
          <div className="w-24 h-1.5 bg-purple-600 mx-auto mt-8 rounded-full shadow-lg shadow-purple-600/50"></div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-[#111827] border border-gray-800 hover:border-purple-500/50 transition-all">
              <div className="text-5xl mb-6">🎯</div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-400 leading-relaxed">
                We help individuals and businesses find the perfect AI tools to boost productivity, creativity, and growth. With 126+ tools across 25 categories, we make AI discovery simple and fast.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-[#111827] border border-gray-800 hover:border-purple-500/50 transition-all">
              <div className="text-5xl mb-6">💡</div>
              <h2 className="text-2xl font-bold mb-4">Why We Built This</h2>
              <p className="text-gray-400 leading-relaxed">
                AI tools are growing every day. Finding the right tool wastes hours. We built AI Tools Directory to solve this with one organized platform where you can discover, compare, and access all AI tools in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-purple-600/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="p-6 text-center rounded-2xl bg-[#111827] border border-purple-500/20">
                <div className="text-3xl md:text-4xl font-black text-purple-400 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#111827] border border-gray-800 hover:scale-105 transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="p-12 rounded-[2.5rem] text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0533, #0a1628)' }}>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 relative z-10">
              Ready to Find Your Perfect AI Tool?
            </h2>
            <Link
              to="/tools"
              className="inline-block px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-purple-600/30 relative z-10"
            >
              Explore All Tools
            </Link>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
          </div>
        </div>
      </section>

      <FAQ title="About Page FAQ" faqs={[
        { q: "Who runs AI Tools Directory?", a: "AI Tools Directory is run by a team of AI enthusiasts based in Pakistan dedicated to helping people discover the best AI tools." },
        { q: "How do you make money?", a: "We earn through Google AdSense advertising and featured tool listings. Using our website is completely free for visitors." }
      ]} />
    </div>
  );
};

export default About;
