const express = require('express');
const router = express.Router();
const Tool = require('../models/Tool');
const Blog = require('../models/Blog');
const Category = require('../models/Category');

router.get('/', async (req, res) => {
  try {
    const baseUrl = 'https://ai-tools-directory-orpin.vercel.app'; // Update this to your real domain
    
    // Fetch all dynamic data
    const tools = await Tool.find({ approved: true }).select('slug updatedAt');
    const blogs = await Blog.find().select('slug updatedAt');
    const categories = await Category.find().select('name updatedAt');

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // 1. Static Pages
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/tools', priority: '0.9', changefreq: 'weekly' },
      { url: '/blog', priority: '0.8', changefreq: 'weekly' },
      { url: '/submit', priority: '0.7', changefreq: 'monthly' }
    ];

    staticPages.forEach(page => {
      xml += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    });

    // 2. Category Pages (Programmatic SEO)
    categories.forEach(cat => {
      xml += `
  <url>
    <loc>${baseUrl}/tools?category=${encodeURIComponent(cat.name)}</loc>
    <lastmod>${cat.updatedAt.toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    });

    // 3. Blog Posts
    blogs.forEach(post => {
      xml += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt.toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    // 4. Individual Tool Pages
    tools.forEach(tool => {
      xml += `
  <url>
    <loc>${baseUrl}/tool/${tool.slug}</loc>
    <lastmod>${tool.updatedAt.toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    xml += '\n</urlset>';

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    res.status(500).send('Error generating sitemap');
  }
});

module.exports = router;
