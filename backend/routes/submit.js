const express = require('express');
const router = express.Router();
const Tool = require('../models/Tool');

// Submit a tool for review (public)
router.post('/', async (req, res) => {
  try {
    const { name, website, shortDescription, fullDescription, category, pricing, logo, screenshots, tags } = req.body;

    if (!name || !website || !category) {
      return res.status(400).json({ success: false, message: 'Name, website, and category are required' });
    }

    const tool = new Tool({
      name, website, shortDescription, fullDescription, category, pricing: pricing || 'Free',
      logo: logo || '', screenshots: screenshots || [], tags: tags || [],
      approved: false, status: 'pending'
    });

    await tool.save();
    res.status(201).json({ success: true, message: 'Tool submitted for review!', data: tool });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
