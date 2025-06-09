const express = require('express');
const router = express.Router();
const like = require('../models/like');
const Item = require('../models/item');
const authMiddleware = require('../middleware/authMiddleware');

// Like a item
router.post('/:itemId', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const itemId = req.params.itemId;

  try {
    const like = new Like({ userId, itemId });
    await like.save();
    res.status(201).json({ message: 'Item liked' });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: 'You already liked this item' });
    } else {
      res.status(500).json({ message: 'Failed to like item', error: err });
    }
  }
});

// Unlike a item
router.delete('/:itemId', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const itemId = req.params.itemId;

  try {
    await Like.findOneAndDelete({ userId, itemId });
    res.json({ message: 'Item unliked' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to unlike item' });
  }
});

// Get all items liked by current user
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const likes = await Like.find({ userId }).populate('itemId');
    const likedItems = likes.map(o => o.itemId);
    res.json(likedItems);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch liked items' });
  }
});

// Get like count for a specific item
router.get('/count/:itemId', async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const count = await Like.countDocuments({ itemId });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Failed to count likes' });
  }
});

module.exports = router;