const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tool = require('./models/Tool');
const Category = require('./models/Category');

dotenv.config();

async function viewData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const toolsCount = await Tool.countDocuments();
    const categoriesCount = await Category.countDocuments();

    console.log('\n--- DATABASE SUMMARY ---');
    console.log(`Database: ${process.env.MONGODB_URI}`);
    console.log(`Total Tools: ${toolsCount}`);
    console.log(`Total Categories: ${categoriesCount}`);

    console.log('\n--- RECENT TOOLS ---');
    const tools = await Tool.find().sort({ createdAt: -1 }).limit(5);
    tools.forEach(t => {
      console.log(`[${t.pricing}] ${t.name} - ${t.category} (Rating: ${t.rating})`);
    });

    console.log('\n--- CATEGORIES ---');
    const categories = await Category.find();
    console.log(categories.map(c => c.name).join(', '));

    console.log('\n--- LOGIN INFO ---');
    console.log(`Admin Username: ${process.env.ADMIN_USERNAME}`);
    console.log(`Admin Password: ${process.env.ADMIN_PASSWORD}`);
    console.log(`JWT Secret: ${process.env.JWT_SECRET}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
}

viewData();
