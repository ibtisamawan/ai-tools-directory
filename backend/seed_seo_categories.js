const mongoose = require('mongoose');
const Category = require('./models/Category');
require('dotenv').config();

const categories = [
  // GROUP 1: CREATIVE & DESIGN
  {
    name: 'AI Tools for Design',
    icon: '🎨',
    seoTitle: 'Best AI Tools for Design 2026 - Create Visuals Faster',
    metaDescription: 'Discover the top AI tools for design. Create professional graphics, logos, and UI layouts in seconds with these powerful AI assistants.',
    h1: 'AI Tools for Design',
    intro: 'AI tools for design are changing how we create visuals. You no longer need to be a professional artist to make great graphics. These smart tools help you generate ideas, edit photos, and design layouts in minutes. Whether you are a small business owner or a professional designer, AI helps you work faster and better. From removing backgrounds to creating whole new images from text, the possibilities are endless. This guide will show you the best AI design tools to boost your creativity and save you hours of manual work every single day.',
    faqs: [
      { question: 'Can AI replace human designers?', answer: 'No, AI is a tool that helps humans work faster. It handles repetitive tasks so designers can focus on creative ideas.' },
      { question: 'Are AI-generated designs legal to use?', answer: 'Most tools allow commercial use, but you must check the license for the specific tool you choose.' }
    ]
  },
  {
    name: 'AI Tools for Logo Design',
    icon: '🏷️',
    seoTitle: 'Best AI Logo Design Tools 2026 - Create Logos Instantly',
    metaDescription: 'Build your brand with the best AI logo design tools. Generate professional logos in minutes without hiring a designer.',
    h1: 'AI Tools for Logo Design',
    intro: 'Starting a new business is exciting, but getting a logo can be expensive. AI tools for logo design make it easy to create a professional brand identity in minutes. You just enter your business name and choose your style, and the AI generates hundreds of options for you. These tools understand color theory and font pairings to ensure your logo looks great on business cards, websites, and social media. This category helps you find the right tool to launch your brand quickly without spending thousands on a graphic designer.'
  },
  {
    name: 'AI Tools for Graphic Design',
    icon: '🖼️',
    seoTitle: 'Top AI Graphic Design Tools 2026 - Automate Your Art',
    metaDescription: 'Scale your content with AI graphic design tools. Automate social media posts, ad creatives, and marketing visuals with ease.',
    h1: 'AI Tools for Graphic Design',
    intro: 'Graphic design used to take hours of pixel-pushing, but AI tools are changing the game. These tools are designed to help you create social media posts, advertising banners, and marketing materials in seconds. Instead of starting from scratch, you can use AI to generate layouts, suggest color themes, and even resize designs for different platforms automatically. This category is perfect for social media managers and marketers who need to produce a high volume of quality visuals without a large design team.'
  },
  {
    name: 'AI Tools for UI/UX Design',
    icon: '📱',
    seoTitle: 'Best AI UI/UX Design Tools 2026 - Prototype Faster',
    metaDescription: 'Streamline your design workflow with the best AI UI/UX tools. Generate wireframes, user flows, and prototypes in minutes.',
    h1: 'AI Tools for UI/UX Design',
    intro: 'UI and UX design are the heart of any great app or website. AI tools for UI/UX design help you skip the boring parts of the process. Instead of drawing every button from scratch, you can use AI to generate wireframes, suggest user flows, and even turn text into high-fidelity prototypes. These tools are built to help designers focus on the user experience rather than just the pixels. Whether you are building a new startup or fixing an old website, AI helps you test ideas faster and create designs that users will love.'
  },
  
  // WRITING
  {
    name: 'AI Tools for Writing',
    icon: '✍️',
    seoTitle: 'Best AI Writing Tools 2026 - Write Better and Faster',
    metaDescription: 'Improve your writing with the best AI assistants. Generate blogs, essays, and emails in seconds with the top AI writing tools.',
    h1: 'AI Tools for Writing',
    intro: 'AI tools for writing are like having a smart assistant for your words. They help you brainstorm ideas, fix grammar, and even write entire articles from a simple prompt. If you ever feel stuck looking at a blank page, these tools are for you. They make writing easier for students, bloggers, and business owners. You can use them to write better emails, faster blog posts, or clear school essays. These tools don\'t just write for you; they help you improve your own style and find the right tone for any audience.'
  },

  // MARKETING
  {
    name: 'AI Tools for Marketing',
    icon: '📈',
    seoTitle: 'Best AI Marketing Tools 2026 - Grow Your Business',
    metaDescription: 'Scale your growth with the best AI marketing tools. Automate your social media, ads, and content strategy with top AI platforms.',
    h1: 'AI Tools for Marketing',
    intro: 'Marketing your business used to be a full-time job for a whole team. AI tools for marketing now allow a single person to handle everything from social media to advertising. These tools can analyze your audience, generate high-converting ad copy, and even schedule your posts for the best times. They are designed to help you spend less money while reaching more customers. Whether you are running a small online shop or a large company, AI helps you work smarter and see better results.'
  },

  // CODING
  {
    name: 'AI Tools for Coding',
    icon: '💻',
    seoTitle: 'Best AI Coding Tools 2026 - Write Code Faster',
    metaDescription: 'Supercharge your development with the best AI coding assistants. Generate code, fix bugs, and learn faster with top AI for 2026.',
    h1: 'AI Tools for Coding',
    intro: 'Coding is becoming more about solving problems and less about typing syntax, thanks to AI tools for coding. These smart assistants live right in your code editor and suggest lines of code as you type. They can help you write entire functions, fix complex bugs, and even explain how a piece of code works. They are perfect for both professional developers who want to work faster and beginners who are just learning to build. Instead of spending hours on Stack Overflow, you can ask your AI assistant for the answer instantly.'
  },

  // VIDEO
  {
    name: 'AI Tools for Video Editing',
    icon: '🎬',
    seoTitle: 'Best AI Video Editing Tools 2026 - Edit Pro Videos Fast',
    metaDescription: 'Create professional videos in minutes with the best AI video editing tools. Automate cutting, captions, and effects with top AI.',
    h1: 'AI Tools for Video Editing',
    intro: 'Making high-quality videos used to take years of practice and expensive software. AI tools for video editing have changed everything, allowing anyone to create professional-looking content in minutes. These tools can automatically add captions, remove boring silences, and even swap out backgrounds without a green screen. They are perfect for YouTubers, social media managers, and business owners who need to produce a lot of video content quickly.'
  }
];

// Master list of 56 categories from the user's prompt
const masterListNames = [
  "AI Tools for Design", "AI Tools for Logo Design", "AI Tools for Graphic Design", "AI Tools for UI/UX Design", 
  "AI Tools for Interior Design", "AI Tools for Fashion Design", "AI Tools for Presentation Design",
  "AI Tools for Writing", "AI Tools for Copywriting", "AI Tools for Blogging", "AI Tools for Story Writing", 
  "AI Tools for Script Writing", "AI Tools for Resume Writing", "AI Tools for Email Writing",
  "AI Tools for Marketing", "AI Tools for Social Media", "AI Tools for Ads (Facebook/Google Ads)", 
  "AI Tools for Email Marketing", "AI Tools for Lead Generation", "AI Tools for Branding", "AI Tools for E-commerce",
  "AI Tools for SEO", "AI Tools for Keyword Research", "AI Tools for Content Optimization", 
  "AI Tools for Link Building", "AI Tools for Technical SEO",
  "AI Tools for Coding", "AI Tools for Web Development", "AI Tools for App Development", 
  "AI Tools for Debugging", "AI Tools for API Generation",
  "AI Tools for Video Editing", "AI Tools for Video Generation", "AI Tools for Animation", 
  "AI Tools for Voice Generation", "AI Tools for Audio Editing", "AI Tools for Image Generation", "AI Tools for Photo Editing",
  "AI Tools for Productivity", "AI Tools for Task Management", "AI Tools for Note Taking", 
  "AI Tools for Document Automation", "AI Tools for Meeting Summaries",
  "AI Tools for Students", "AI Tools for Teachers", "AI Tools for Homework Help", 
  "AI Tools for Language Learning", "AI Tools for Research",
  "AI Tools for Automation", "AI Tools for Chatbots", "AI Tools for Data Analysis", "AI Tools for Workflow Automation",
  "AI Tools for Gaming", "AI Tools for Memes", "AI Tools for Dating", "AI Tools for Personal Use"
];

const icons = {
  "Creative": "🎨", "Writing": "✍️", "Marketing": "📈", "SEO": "🔍", "Coding": "💻", 
  "Media": "🎬", "Productivity": "📊", "Education": "🎓", "Automation": "🤖", "Fun": "🎮"
};

// Auto-fill the rest with SEO patterns
const finalCategories = masterListNames.map(name => {
  const existing = categories.find(c => c.name === name);
  if (existing) return existing;

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const baseCategory = name.replace('AI Tools for ', '');

  return {
    name,
    slug,
    icon: icons[Object.keys(icons).find(k => name.includes(k))] || '🔧',
    seoTitle: `Best ${name} 2026 - Top AI Tools for ${baseCategory}`,
    metaDescription: `Discover the top ${name} to boost your productivity. Compare features, pricing, and ratings for the best AI tools in 2026.`,
    h1: name,
    intro: `Welcome to our comprehensive guide on ${name}. In 2026, artificial intelligence is revolutionizing the ${baseCategory} industry by making complex tasks simple and fast. These tools are designed to help you work smarter, save time, and achieve professional results without needing years of experience. Whether you are a beginner or an expert, our curated list of AI tools for ${baseCategory} will provide everything you need to succeed in the digital age. Explore the latest innovations and find the perfect AI assistant for your specific needs today.`,
    faqs: [
      { question: `What are the best ${name}?`, answer: `The best tools for ${baseCategory} include a mix of popular platforms and specialized AI assistants tailored for your specific goals.` },
      { question: `Are there free ${name}?`, answer: `Yes, many tools in this category offer free plans or trial versions to help you get started without any upfront cost.` }
    ]
  };
});

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Starting Programmatic SEO Category Seed...');
    
    // Clear existing and insert 56 categories
    await Category.deleteMany({});
    await Category.insertMany(finalCategories);
    
    console.log(`Successfully seeded ${finalCategories.length}/56 SEO Category Pages!`);
    process.exit();
  })
  .catch(err => {
    console.error('Seed error:', err);
    process.exit(1);
  });
