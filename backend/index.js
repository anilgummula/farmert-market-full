const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthRouter');
const FarmerRouter = require('./Routes/farmer'); // Add farmer routes
const RetailerRouter = require('./Routes/retailer'); // Add retailer routes

require('dotenv').config();
require('./models/db.js'); // Initialize database connection

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(bodyParser.json());
app.use(
  cors({
    origin: 'https://farmarket.netlify.app/', // Allow requests from Netlify domain
    methods: 'GET,POST,PUT,DELETE', // Allow these methods
    allowedHeaders: 'Content-Type,authorization,Authorization', // Allow these headers
    credentials: true, // Allow cookies and credentials
  })
);

// Routes
app.use('/auth', AuthRouter); // Authentication routes
app.use('/farmer', FarmerRouter); // Farmer-specific routes
app.use('/retailer', RetailerRouter); // Retailer-specific routes

// Health check endpoint
app.get('/ping', (req, res) => {
  res.send('Server is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
