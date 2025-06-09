const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/items');
const likeRoutes = require('./routes/likes');
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/likes', likeRoutes);


// Connect to MongoDB (updated, no deprecated options)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Optional: exit process on DB connection error
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
