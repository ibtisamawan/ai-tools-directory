const express = require('express');
const router = express.Router();

// In-memory newsletter storage (use a database in production)
const subscribers = [];

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Valid email is required' });
    }

    if (subscribers.includes(email)) {
      return res.status(400).json({ success: false, message: 'Email already subscribed' });
    }

    subscribers.push(email);
    res.json({ success: true, message: 'Successfully subscribed to newsletter!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
