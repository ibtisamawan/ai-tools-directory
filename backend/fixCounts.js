const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

const Tool = require('./models/Tool');
const Category = require('./models/Category');

const fixAll = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // 1. Fix Slugs
    const toolsForSlugs = await Tool.find();
    for (const tool of toolsForSlugs) {
      if (!tool.slug) {
        tool.slug = tool.name.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        await tool.save();
        console.log(`Generated slug for: ${tool.name}`);
      }
    }

    // 2. Fix Category Counts
    const categories = await Category.find();
    for (const cat of categories) {
      const count = await Tool.countDocuments({
        category: { $regex: new RegExp(cat.name, 'i') },
        approved: true
      });
      await Category.findByIdAndUpdate(cat._id, { toolCount: count });
      console.log(`${cat.name}: ${count} tools`);
    }

    console.log('✅ All fixes applied!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
};

fixAll();
