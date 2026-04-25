const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Hardcoded admin credentials (in production, use a database)
const ADMIN_USER = {
  username: process.env.ADMIN_USERNAME || 'admin',
  // Default password: admin123
  password: process.env.ADMIN_PASSWORD || 'admin123'
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    if (username !== ADMIN_USER.username || password !== ADMIN_USER.password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: { username, role: 'admin' }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.verifyToken = async (req, res) => {
  res.json({ success: true, user: req.admin });
};
