const express = require('express');
const Comment = require('../models/Comment');
const { protect } = require('../middleware/auth.middleware');
const { memberOrAdmin } = require('../middleware/role.middleware');
const router = express.Router();

// GET /api/comments/:postId — Public: all comments for a post
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'name profilePic rank')
      .sort({ createdAt: 1 });
    res.json(comments);
  } catch (err) {
    console.error('GET comments error:', err);
    res.status(500).json({ message: err.message });
  }
});

// POST /api/comments/:postId — Member/Admin: add a comment
router.post('/:postId', protect, memberOrAdmin, async (req, res) => {
  try {
    const { body } = req.body;
    
    if (!body || body.trim() === '') {
      return res.status(400).json({ message: 'Comment cannot be empty' });
    }
    
    const comment = await Comment.create({
      post: req.params.postId,
      author: req.user._id,
      body: body.trim(),
    });
    
    await comment.populate('author', 'name profilePic rank');
    
    res.status(201).json({
      success: true,
      comment,
      message: '💬 Comment added!'
    });
  } catch (err) {
    console.error('POST comment error:', err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/comments/:id — Own comment OR admin
router.delete('/:id', protect, memberOrAdmin, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    const isOwner = comment.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }
    
    await comment.deleteOne();
    res.json({ success: true, message: 'Comment deleted successfully' });
  } catch (err) {
    console.error('DELETE comment error:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;