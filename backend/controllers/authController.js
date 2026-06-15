const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resetAdmin = async (req, res) => {
  const resetToken = process.env.ADMIN_RESET_TOKEN;
  const requestToken = req.headers['x-reset-token'];

  if (!resetToken) {
    return res.status(404).json({ message: 'Not found' });
  }

  if (requestToken !== resetToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const {
    email = 'admin@dadcons.com',
    password = 'Dad@2026',
    name = 'Admin DAD',
  } = req.body || {};

  try {
    let user = await User.findOne({ email });

    if (user) {
      user.name = user.name || name;
      user.password = password;
      user.role = 'admin';
      await user.save();
    } else {
      user = await User.create({
        name,
        email,
        password,
        role: 'admin',
      });
    }

    res.json({
      message: 'Admin user reset successfully',
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginUser, getMe, resetAdmin };
