const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthRouter');
const FarmerRouter = require('./Routes/farmer'); // Add farmer routes
const RetailerRouter = require('./Routes/retailer'); // Add retailer routes
const ProfileRouter = require('./Routes/user'); // Add retailer routes


require('dotenv').config();
require('./models/db.js'); // Initialize database connection

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json())
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/auth', AuthRouter); // Authentication routes
app.use('/farmer', FarmerRouter); // Farmer-specific routes
app.use('/retailer', RetailerRouter); // Retailer-specific routes
app.use('/farmer/profile', ProfileRouter); // Retailer-specific routes
app.use('/retailer/profile', ProfileRouter); // Retailer-specific routes

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
