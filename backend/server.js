const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'https://ai-tools-directory-orpin.vercel.app',
  'http://localhost:5173',
];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (server-to-server, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
const toolRoutes = require('./routes/tools');
const categoryRoutes = require('./routes/categories');
const blogRoutes = require('./routes/blogs');
const authRoutes = require('./routes/auth');
const newsletterRoutes = require('./routes/newsletter');
const submitRoutes = require('./routes/submit');

app.use('/api/tools', toolRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/submit', submitRoutes);

// Comprehensive Dynamic XML Sitemap
const SITE_URL = 'https://ai-tools-directory-orpin.vercel.app';
app.get('/api/sitemap', async (req, res) => {
  try {
    const Tool = require('./models/Tool');
    const Blog = require('./models/Blog');
    const Category = require('./models/Category');

    const [tools, blogs, categories] = await Promise.all([
      Tool.find({ approved: true }, 'slug updatedAt').lean(),
      Blog.find({}, 'slug updatedAt').lean(),
      Category.find({}, 'name updatedAt').lean()
    ]);

    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/tools', priority: '0.9', changefreq: 'daily' },
      { url: '/blog', priority: '0.8', changefreq: 'weekly' },
      { url: '/submit', priority: '0.7', changefreq: 'monthly' },
    ];

    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // 1. Static Pages
    staticPages.forEach(page => {
      xml += `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    });

    // 2. Category Hubs (Programmatic SEO)
    categories.forEach(cat => {
      const lastmod = cat.updatedAt ? cat.updatedAt.toISOString().split('T')[0] : today;
      xml += `
  <url>
    <loc>${SITE_URL}/tools?category=${encodeURIComponent(cat.name)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    });

    // 3. Blog Posts
    blogs.forEach(post => {
      const lastmod = post.updatedAt ? post.updatedAt.toISOString().split('T')[0] : today;
      xml += `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    // 4. Tool Details
    tools.forEach(tool => {
      const lastmod = tool.updatedAt ? tool.updatedAt.toISOString().split('T')[0] : today;
      xml += `
  <url>
    <loc>${SITE_URL}/tools/${tool.slug || tool._id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    xml += '\n</urlset>';

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(xml);
  } catch (err) {
    console.error('Sitemap error:', err.message);
    res.status(500).send('Error generating sitemap');
  }
});

// Standard Sitemap location for Search Engines
app.get('/sitemap.xml', (req, res) => {
  res.redirect('/api/sitemap');
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

module.exports = app;
