const mongoose = require('mongoose');
const Category = require('./models/Category');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const cats = await Category.find({ toolCount: { $gt: 0 } }).select('name toolCount').sort({ toolCount: -1 });
  console.log('Categories with tools:');
  cats.forEach(c => console.log(`${c.name}: ${c.toolCount}`));
  process.exit();
});
