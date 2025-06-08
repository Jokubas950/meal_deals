const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mealId: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal', required: true },
}, { timestamps: true });

// Prevent duplicate likes (user can like a meal only once)
orderSchema.index({ userId: 1, mealId: 1 }, { unique: true });

module.exports = mongoose.model('Order', orderSchema);