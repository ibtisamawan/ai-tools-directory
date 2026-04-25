const mongoose = require('mongoose');

// Constructed Standard URI based on DNS lookup
const uri = 'mongodb://ibtisam097:Mibtisam097@ac-daqqfwy-shard-00-00.s2vetmr.mongodb.net:27017,ac-daqqfwy-shard-00-01.s2vetmr.mongodb.net:27017,ac-daqqfwy-shard-00-02.s2vetmr.mongodb.net:27017/ai-tools-directory?ssl=true&replicaSet=atlas-daqqfwy-shard-0&authSource=admin&retryWrites=true&w=majority';

console.log('Attempting standard connection...');
mongoose.connect(uri)
  .then(() => {
    console.log('✅ Success! Standard connection works.');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  });
