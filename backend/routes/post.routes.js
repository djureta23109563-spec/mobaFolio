const express = require('express');
const Post = require('../models/Post');
const { protect } = require('../middleware/auth.middleware');
const { memberOrAdmin } = require('../middleware/role.middleware');
const upload = require('../middleware/upload');
const router = express.Router();

// Get all published posts (for homepage)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({ status: 'published' })
      .populate('author', 'name profilePic rank')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name profilePic rank favoriteHero');
    if (!post || post.status === 'removed')
      return res.status(404).json({ message: '❌ Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new post (achievement share)
router.post('/', protect, memberOrAdmin, upload.single('image'), async (req, res) => {
  try {
    const { title, body, heroName, gameMode, achievement } = req.body;
    const image = req.file ? req.file.filename : '';
    const post = await Post.create({
      title,
      body,
      image,
      heroName,
      gameMode,
      achievement,
      author: req.user._id,
    });
    await post.populate('author', 'name profilePic rank');
    res.status(201).json({
      success: true,
      post,
      message: '🎮 Achievement shared successfully!'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Edit post
router.put('/:id', protect, memberOrAdmin, upload.single('image'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: '❌ Post not found' });

    const isOwner = post.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin)
      return res.status(403).json({ message: '⛔ Not authorized' });

    if (req.body.title) post.title = req.body.title;
    if (req.body.body) post.body = req.body.body;
    if (req.body.heroName) post.heroName = req.body.heroName;
    if (req.body.gameMode) post.gameMode = req.body.gameMode;
    if (req.body.achievement) post.achievement = req.body.achievement;
    if (req.file) post.image = req.file.filename;
    await post.save();
    res.json({
      success: true,
      post,
      message: '✅ Post updated successfully!'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete post
router.delete('/:id', protect, memberOrAdmin, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: '❌ Post not found' });

    const isOwner = post.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin)
      return res.status(403).json({ message: '⛔ Not authorized' });

    await post.deleteOne();
    res.json({ message: '✅ Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;