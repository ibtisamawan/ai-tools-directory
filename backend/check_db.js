const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const toolSchema = new mongoose.Schema({}, { strict: false });
const Tool = mongoose.model('Tool', toolSchema, 'tools');

async function check() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    const total = await Tool.countDocuments();
    const approved = await Tool.countDocuments({ approved: true });
    const unapproved = await Tool.countDocuments({ approved: false });
    
    console.log('Total tools:', total);
    console.log('Approved tools:', approved);
    console.log('Unapproved tools:', unapproved);

    if (total > 0) {
      const sample = await Tool.findOne();
      console.log('Sample tool data:', JSON.stringify(sample, null, 2));
    }

    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

check();
