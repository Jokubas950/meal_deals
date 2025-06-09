const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/admin');

// Create item (admin only)
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, price, imageUrl } = req.body;
  try {
    const item = new Item({
      title,
      description,
      price,
      imageUrl,
      createdBy: req.user.id
    });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create item', error: err });
  }
});

// Get all items (public or admin)
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch items' });
  }
});

// Delete item (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete item' });
  }
});

// Edit item (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update item' });
  }
});

module.exports = router;
