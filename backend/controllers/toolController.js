const Tool = require('../models/Tool');
const Review = require('../models/Review');

// Get all tools with pagination, filter, sort
exports.getTools = async (req, res) => {
  try {
    const { page = 1, limit = 12, category, pricing, sort, featured, approved = 'true', minRating } = req.query;
    const query = {};

    if (approved === 'true') query.approved = true;
    if (approved === 'false') query.approved = false;
    if (approved === 'all') { /* no filter */ }
    if (category && category !== 'All') query.category = category;
    if (pricing) query.pricing = pricing;
    if (featured === 'true') query.featured = true;
    if (minRating) query.rating = { $gte: Number(minRating) };

    let sortOption = { createdAt: -1 };
    switch (sort) {
      case 'newest': sortOption = { createdAt: -1 }; break;
      case 'popular': sortOption = { views: -1 }; break;
      case 'top-rated': sortOption = { rating: -1 }; break;
      case 'alphabetical': sortOption = { name: 1 }; break;
    }

    const total = await Tool.countDocuments(query);
    const tools = await Tool.find(query)
      .sort(sortOption)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.json({
      success: true,
      data: tools,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        limit: Number(limit)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single tool by ID or slug
exports.getToolById = async (req, res) => {
  try {
    const { id } = req.params;
    let tool;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      tool = await Tool.findById(id);
    } else {
      tool = await Tool.findOne({ slug: id });
    }

    if (!tool) {
      return res.status(404).json({ success: false, message: 'Tool not found' });
    }

    // Increment views
    tool.views += 1;
    await tool.save();

    // Get reviews
    const reviews = await Review.find({ toolId: tool._id }).sort({ createdAt: -1 });

    // Get similar tools
    const similar = await Tool.find({
      category: tool.category,
      _id: { $ne: tool._id },
      approved: true
    }).limit(4);

    res.json({ success: true, data: { ...tool.toObject(), reviews, similarTools: similar } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Search tools
exports.searchTools = async (req, res) => {
  try {
    const { q, limit = 12 } = req.query;
    if (!q) return res.json({ success: true, data: [] });

    const tools = await Tool.find({
      approved: true,
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { shortDescription: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } },
        { category: { $regex: q, $options: 'i' } }
      ]
    }).limit(Number(limit));

    res.json({ success: true, data: tools });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get tools by category
exports.getToolsByCategory = async (req, res) => {
  try {
    const { name } = req.params;
    const { page = 1, limit = 12, sort } = req.query;

    const categoryName = name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const query = { approved: true };

    // Try exact match first, then case-insensitive
    query.category = { $regex: new RegExp(`^${categoryName}$`, 'i') };

    let sortOption = { createdAt: -1 };
    switch (sort) {
      case 'newest': sortOption = { createdAt: -1 }; break;
      case 'popular': sortOption = { views: -1 }; break;
      case 'top-rated': sortOption = { rating: -1 }; break;
      case 'alphabetical': sortOption = { name: 1 }; break;
    }

    const total = await Tool.countDocuments(query);
    const tools = await Tool.find(query)
      .sort(sortOption)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.json({
      success: true,
      data: tools,
      category: categoryName,
      pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)), limit: Number(limit) }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create tool (admin)
exports.createTool = async (req, res) => {
  try {
    const tool = new Tool({ ...req.body, approved: true });
    await tool.save();
    res.status(201).json({ success: true, data: tool });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update tool (admin)
exports.updateTool = async (req, res) => {
  try {
    const tool = await Tool.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tool) return res.status(404).json({ success: false, message: 'Tool not found' });
    res.json({ success: true, data: tool });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete tool (admin)
exports.deleteTool = async (req, res) => {
  try {
    const tool = await Tool.findByIdAndDelete(req.params.id);
    if (!tool) return res.status(404).json({ success: false, message: 'Tool not found' });
    await Review.deleteMany({ toolId: req.params.id });
    res.json({ success: true, message: 'Tool deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Submit tool for review
exports.submitTool = async (req, res) => {
  try {
    const tool = new Tool({ ...req.body, approved: false, status: 'pending' });
    await tool.save();
    res.status(201).json({ success: true, message: 'Tool submitted for review!', data: tool });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Add review
exports.addReview = async (req, res) => {
  try {
    const { toolId, userName, rating, comment } = req.body;
    const review = new Review({ toolId, userName, rating, comment });
    await review.save();

    // Update tool rating
    const reviews = await Review.find({ toolId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Tool.findByIdAndUpdate(toolId, { rating: Math.round(avgRating * 10) / 10, totalReviews: reviews.length });

    res.status(201).json({ success: true, data: review });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get admin stats
exports.getStats = async (req, res) => {
  try {
    const totalTools = await Tool.countDocuments({ approved: true });
    const pendingTools = await Tool.countDocuments({ approved: false });
    const totalReviews = await Review.countDocuments();
    const Category = require('../models/Category');
    const totalCategories = await Category.countDocuments();
    const featuredTools = await Tool.countDocuments({ featured: true });

    res.json({
      success: true,
      data: { totalTools, pendingTools, totalReviews, totalCategories, featuredTools }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
