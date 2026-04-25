const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });
const Tool = require('./models/Tool');

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  const catCount = await Tool.countDocuments({ category: 'Chatbots' });
  console.log('Total tools in Chatbots category:', catCount);
  
  const searchMatch = await Tool.countDocuments({ 
    $or: [
      { name: /chatbot/i }, 
      { shortDescription: /chatbot/i }, 
      { fullDescription: /chatbot/i }, 
      { tags: /chatbot/i },
      { category: /chatbot/i }
    ] 
  });
  console.log('Total tools matching search "chatbot":', searchMatch);
  
  const tools = await Tool.find({ category: 'Chatbots' }).select('name category');
  console.log('Tools in Chatbots category:', tools.map(t => t.name));

  const mismatches = await Tool.find({ 
    $or: [{ name: /chatbot/i }, { tags: /chatbot/i }],
    category: { $ne: 'Chatbots' }
  }).select('name category');
  console.log('Tools matching "chatbot" but NOT in Chatbots category:', mismatches.map(m => `${m.name} (${m.category})`));

  process.exit();
}
check();
