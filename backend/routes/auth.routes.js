const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload');

const router = express.Router();

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// Register new member
router.post('/register', async (req, res) => {
  console.log('📝 Register request received:', req.body);
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) {
      console.log('❌ Email already exists:', email);
      return res.status(400).json({ message: '❌ Email is already registered' });
    }

    const user = await User.create({ name, email, password });
    console.log('✅ User created:', user.email);
    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: '🎉 Welcome to MobaFolio!'
    });
  } catch (err) {
    console.error('❌ Register error:', err);
    res.status(500).json({ message: err.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  console.log('🔐 Login request received:', req.body);
  const { email, password } = req.body;
  
  if (!email || !password) {
    console.log('❌ Missing email or password');
    return res.status(400).json({ message: '❌ Email and password are required' });
  }
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(400).json({ message: '❌ Invalid email or password' });
    }

    console.log('✅ User found:', user.email, 'Role:', user.role);

    if (user.status === 'inactive') {
      console.log('❌ Account deactivated:', email);
      return res.status(403).json({ 
        message: '⛔ Your account is deactivated. Please contact the admin.' 
      });
    }

    const match = await user.matchPassword(password);
    console.log('🔑 Password match:', match);
    
    if (!match) {
      console.log('❌ Invalid password for:', email);
      return res.status(400).json({ message: '❌ Invalid email or password' });
    }

    console.log('✅ Login successful:', email);
    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
        bio: user.bio,
        favoriteHero: user.favoriteHero,
        rank: user.rank,
      },
      message: `🎮 Welcome back, ${user.name}!`
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get current user profile
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update profile
router.put('/profile', protect, upload.single('profilePic'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (req.body.name) user.name = req.body.name;
    if (req.body.bio) user.bio = req.body.bio;
    if (req.body.favoriteHero) user.favoriteHero = req.body.favoriteHero;
    if (req.body.rank) user.rank = req.body.rank;
    if (req.file) user.profilePic = req.file.filename;
    await user.save();
    const updated = await User.findById(user._id).select('-password');
    res.json({
      success: true,
      user: updated,
      message: '✅ Profile updated successfully!'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Change password
router.put('/change-password', protect, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user._id);
    const match = await user.matchPassword(currentPassword);
    if (!match) return res.status(400).json({ message: '❌ Current password is incorrect' });

    user.password = newPassword;
    await user.save();
    res.json({ message: '✅ Password updated successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// IMPORTANT: Make sure router is exported correctly
module.exports = router;