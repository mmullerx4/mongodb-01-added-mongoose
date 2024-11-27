const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // For handling cross-origin requests

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// MongoDB connection (change the URL as needed)
mongoose.connect('mongodb://127.0.0.1:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if the connection fails
  });

// Example route for testing
app.get('/api/posts', (req, res) => {
  res.status(200).json({ message: 'Posts fetched successfully!' });
});

// Start the server
const PORT = 3000; // Port to listen on
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
