const express = require('express');
const router = express.Router();
const Meal = require('../models/meal');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/admin');

// Create meal (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  const { title, description, price, imageUrl } = req.body;
  try {
    const meal = new Meal({
      title,
      description,
      price,
      imageUrl,
      createdBy: req.user.id
    });
    await meal.save();
    res.status(201).json(meal);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create meal', error: err });
  }
});

// Get all meals (public or admin)
router.get('/', async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch meals' });
  }
});

// Delete meal (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Meal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Meal deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete meal' });
  }
});

// Edit meal (admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(meal);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update meal' });
  }
});

module.exports = router;
