const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Tool = require('../models/Tool');
const authMiddleware = require('../middleware/authMiddleware');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });

    // Update tool counts
    const escapeRegex = (string) => string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    for (let cat of categories) {
      const count = await Tool.countDocuments({ 
        category: { $regex: new RegExp(escapeRegex(cat.name), 'i') }, 
        approved: true 
      });
      if (cat.toolCount !== count) {
        cat.toolCount = count;
        await cat.save();
      }
    }

    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create category (admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Update category (admin)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.json({ success: true, data: category });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Delete category (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
