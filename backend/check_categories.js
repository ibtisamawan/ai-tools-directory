const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const categorySchema = new mongoose.Schema({}, { strict: false });
const Category = mongoose.model('Category', categorySchema, 'categories');

async function check() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    const total = await Category.countDocuments();
    const categories = await Category.find();
    
    console.log('Total categories:', total);
    console.log('Categories:', JSON.stringify(categories, null, 2));

    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

check();
