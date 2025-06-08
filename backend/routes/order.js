const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Meal = require('../models/meal');
const authMiddleware = require('../middleware/authMiddleware');

// Like a meal
router.post('/:mealId', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const mealId = req.params.mealId;

  try {
    const order = new Order({ userId, mealId });
    await order.save();
    res.status(201).json({ message: 'Meal liked' });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: 'You already liked this meal' });
    } else {
      res.status(500).json({ message: 'Failed to like meal', error: err });
    }
  }
});

// Unlike a meal
router.delete('/:mealId', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const mealId = req.params.mealId;

  try {
    await Order.findOneAndDelete({ userId, mealId });
    res.json({ message: 'Meal unliked' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to unlike meal' });
  }
});

// Get all meals liked by current user
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.find({ userId }).populate('mealId');
    const likedMeals = orders.map(o => o.mealId);
    res.json(likedMeals);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch liked meals' });
  }
});

// Get like count for a specific meal
router.get('/count/:mealId', async (req, res) => {
  const mealId = req.params.mealId;

  try {
    const count = await Order.countDocuments({ mealId });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Failed to count likes' });
  }
});

module.exports = router;