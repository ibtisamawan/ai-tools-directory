const mongoose = require('mongoose');
const uri = 'mongodb://ibtisam097:Mibtisam097@aitool1.s2vetmr.mongodb.net:27017/ai-tools-directory?ssl=true&authSource=admin';
mongoose.connect(uri)
  .then(() => {
    console.log('Connected!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
