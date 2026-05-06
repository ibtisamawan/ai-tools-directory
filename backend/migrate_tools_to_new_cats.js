const mongoose = require('mongoose');
const Tool = require('./models/Tool');
const Category = require('./models/Category');
require('dotenv').config();

const mapping = {
  '3D & Animation': 'AI Tools for Animation',
  'Audio': 'AI Tools for Audio Editing',
  'Chatbots': 'AI Tools for Chatbots',
  'Coding': 'AI Tools for Coding',
  'Customer Service': 'AI Tools for Chatbots',
  'Cybersecurity': 'AI Tools for Automation',
  'Data Analytics': 'AI Tools for Data Analysis',
  'Design': 'AI Tools for Design',
  'E-commerce': 'AI Tools for E-commerce',
  'Education': 'AI Tools for Students',
  'Finance': 'AI Tools for Personal Use',
  'Food & Nutrition': 'AI Tools for Personal Use',
  'HR & Recruiting': 'AI Tools for Productivity',
  'Healthcare': 'AI Tools for Research',
  'Image Generation': 'AI Tools for Image Generation',
  'Legal': 'AI Tools for Personal Use',
  'Marketing': 'AI Tools for Marketing',
  'Music': 'AI Tools for Audio Editing',
  'Productivity': 'AI Tools for Productivity',
  'Real Estate': 'AI Tools for Interior Design',
  'Social Media': 'AI Tools for Social Media',
  'Sports & Fitness': 'AI Tools for Personal Use',
  'Travel': 'AI Tools for Personal Use',
  'Video': 'AI Tools for Video Editing',
  'Writing': 'AI Tools for Writing'
};

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB for tool re-categorization...');

  const tools = await Tool.find({});
  console.log(`Processing ${tools.length} tools...`);

  let updatedCount = 0;
  for (let tool of tools) {
    const newCat = mapping[tool.category];
    if (newCat) {
      tool.category = newCat;
      await tool.save();
      updatedCount++;
    }
  }

  console.log(`Updated ${updatedCount} tools to use the new Programmatic SEO category names.`);
  
  // Now trigger count update
  console.log('Updating category tool counts...');
  const categories = await Category.find({});
  for (let cat of categories) {
    const count = await Tool.countDocuments({ category: cat.name, approved: true });
    cat.toolCount = count;
    await cat.save();
  }
  
  console.log('All tool counts updated successfully!');
  process.exit();
}

migrate().catch(err => {
  console.error(err);
  process.exit(1);
});
