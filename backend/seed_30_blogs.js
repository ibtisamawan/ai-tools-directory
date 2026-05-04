const mongoose = require('mongoose');
const Blog = require('./models/Blog');
require('dotenv').config();

// List of 30 unique high-quality AI-related images from Unsplash
const unsplashImages = [
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80', // AI Brain
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80', // Robot
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80', // Cyber
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80', // Tech
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80', // Circuit
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80', // Laptop
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80', // Data
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80', // AI Chip
  'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80', // Science
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80', // Code
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80', // Digital
  'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80', // Network
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80', // Matrix
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80', // Collaboration
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', // Workplace
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80', // Education
  'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=800&q=80', // Futuristic
  'https://images.unsplash.com/photo-1496065187959-7f07b8353c55?auto=format&fit=crop&w=800&q=80', // Abstract Tech
  'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&w=800&q=80', // Communication
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', // Analysis
  'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=800&q=80', // Smart City
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80', // Coding 2
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80', // Business 2
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80', // Meeting
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', // Finance
  'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80', // Customer Success
  'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80', // Marketing
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80', // Health 2
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80', // Lab
  'https://images.unsplash.com/photo-1504164996022-09080787b6b3?auto=format&fit=crop&w=800&q=80'  // Construction/Architecture
];

const blogData = [
  {
    title: 'The Rise of Autonomous Workplace AI Agents',
    slug: 'autonomous-workplace-ai-agents',
    category: 'Productivity',
    summary: 'Moving beyond simple chatbots, AI agents are now proactively managing complex business workflows.',
    body: '<h2>What are AI Agents?</h2><p>Unlike standard chatbots that wait for a prompt, AI agents can take a high-level goal and break it down into actionable steps. In 2026, these agents are managing everything from scheduling across multiple time zones to complex project procurement.</p><h2>The Productivity Shift</h2><p>Companies using autonomous agents report a 40% increase in operational efficiency. The human role is shifting from doing the work to supervising the output of these digital workers.</p>',
    date: 'May 04, 2026',
    time: '8 min',
    tags: ['AI Agents', 'Productivity', 'Automation'],
    color: 'purple'
  },
  {
    title: 'AI in Healthcare: Beyond Simple Diagnosis',
    slug: 'ai-healthcare-advancements-2026',
    category: 'Healthcare',
    summary: 'How predictive AI models are identifying life-threatening conditions before symptoms even appear.',
    body: '<h2>Predictive Health Models</h2><p>By analyzing subtle changes in biometric data over years, AI models can now predict heart events or neurological declines with 95% accuracy. This shift from reactive to proactive care is saving millions of lives annually.</p><h2>The Surgeon\'s Co-pilot</h2><p>AI-integrated robotics are assisting in complex surgeries, providing real-time data overlays and minimizing human tremor, making once-risky procedures routine.</p>',
    date: 'May 03, 2026',
    time: '12 min',
    tags: ['Healthcare', 'MedTech', 'AI'],
    color: 'blue'
  },
  {
    title: 'Generative Art: Democratizing the Creative Process',
    slug: 'generative-art-democratizing-creativity',
    category: 'Design',
    summary: 'How AI image generators are empowering non-designers to create professional-grade visual content.',
    body: '<h2>From Prompt to Masterpiece</h2><p>Tools like Midjourney v7 have reached a point where the distinction between human-made and AI-assisted art is purely academic. For businesses, this means high-end brand assets are now affordable for even the smallest startups.</p><h2>The Evolution of the Designer</h2><p>Professional designers are evolving into "Creative Directors," using AI to explore thousands of variations before polishing the final choice with their unique human perspective.</p>',
    date: 'May 02, 2026',
    time: '10 min',
    tags: ['Design', 'Art', 'Generative AI'],
    color: 'pink'
  },
  {
    title: 'Mastering AI SEO: Ranking Your Directory in 2026',
    slug: 'mastering-ai-seo-directory-ranking',
    category: 'SEO',
    summary: 'Secret strategies to outrank the competition by leveraging structured data and content clusters.',
    body: '<h2>The Power of Entity-Based SEO</h2><p>Search engines no longer just look for keywords; they look for entities. By properly marking up your tools with SoftwareApplication schema, you signal to Google exactly what your content is about.</p><h2>Technical Speed Matters</h2><p>In 2026, page load speed is a top-tier ranking factor. Using a fast stack like Vite and React ensures your users stay engaged and your bounce rates stay low.</p>',
    date: 'May 01, 2026',
    time: '15 min',
    tags: ['SEO', 'Marketing', 'Ranking'],
    color: 'green'
  },
  {
    title: 'AI for Developers: The End of Boilerplate Code?',
    slug: 'ai-developers-end-of-boilerplate',
    category: 'Development',
    summary: 'How tools like GitHub Copilot Workspace are changing the day-to-day life of a software engineer.',
    body: '<h2>Coding at the Speed of Thought</h2><p>With natural language to code transformation, developers are focusing on architecture and system design rather than syntax. Boilerplate code is now generated instantly, allowing for rapid prototyping of complex features.</p><h2>The Importance of Code Review</h2><p>As AI writes more code, the skill of reviewing and debugging AI-generated logic becomes the most critical asset a developer can have.</p>',
    date: 'April 30, 2026',
    time: '9 min',
    tags: ['Coding', 'Development', 'GitHub'],
    color: 'blue'
  }
];

// Fill up to 30 unique topics
const niches = [
  'E-commerce', 'Security', 'Climate', 'Education', 'Video', 'Finance', 'Marketing', 'Ethics', 'Legal', 'Music',
  'Travel', 'Real Estate', 'HR', 'BioTech', 'Gaming', 'Architecture', 'Logistics', 'Fitness', 'Retail', 'Mental Health',
  'Sustainability', 'Hospitality', 'Non-Profit', 'Research', 'Space'
];

niches.forEach((niche, index) => {
  if (blogData.length < 30) {
    blogData.push({
      title: `The Future of AI in ${niche}: Innovation Trends for 2026`,
      slug: `future-ai-${niche.toLowerCase().replace(' ', '-')}-2026`,
      category: niche,
      summary: `How artificial intelligence is solving the most complex challenges in the ${niche} industry today.`,
      body: `<h2>Revolutionizing ${niche}</h2><p>In 2026, the ${niche} sector has been completely reimagined through AI integration. Professionals are using advanced algorithms to optimize their daily operations and provide better services to their clients.</p><h2>Key Use Cases</h2><p>From predictive analytics to automated reporting, the tools available for ${niche} experts are more powerful than ever. Staying ahead of these trends is no longer optional for those who want to succeed.</p>`,
      date: 'April ' + (29 - index) + ', 2026',
      time: (6 + (index % 6)) + ' min',
      tags: ['AI', niche, 'Trends'],
      color: index % 2 === 0 ? 'purple' : 'blue'
    });
  }
});

// Assign unique images to each blog post
const finalBlogs = blogData.map((blog, index) => ({
  ...blog,
  image: unsplashImages[index] || unsplashImages[0]
}));

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB for UNIQUE IMAGE blog seeding...');
    await Blog.deleteMany({});
    await Blog.insertMany(finalBlogs);
    console.log('Successfully seeded 30 UNIQUE AI blogs with 30 DIFFERENT IMAGES!');
    process.exit();
  })
  .catch(err => {
    console.error('Seed error:', err);
    process.exit(1);
  });
