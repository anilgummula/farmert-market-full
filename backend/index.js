const express = require('express');
const cors = require('cors');
// const fs = require('fs');
// const path = require('path');
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthRouter');
const FarmerRouter = require('./Routes/farmer'); // Add farmer routes
const RetailerRouter = require('./Routes/retailer'); // Add retailer routes

require('dotenv').config();
require('./models/db.js'); // Initialize database connection

const app = express();
const PORT = process.env.PORT || 5000;


// Ensure 'uploads/products' directory exists
// const uploadDir = path.join(__dirname, 'uploads/products');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
//   console.log(`Directory ${uploadDir} created.`);
// }

// Serve static files from 'uploads' directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Middleware setup
app.use(express.json())
app.use(bodyParser.json());
// app.use(
//   cors({
//     origin: 'https://farmarket.netlify.app', // Allow requests from Netlify domain
//     methods: 'GET,POST,PUT,DELETE', // Allow these methods
//     allowedHeaders: 'Content-Type,authorization,Authorization', // Allow these headers
//     credentials: true, // Allow cookies and credentials
//   })
// );
app.use(cors());

// Routes
app.use('/auth', AuthRouter); // Authentication routes
app.use('/farmer', FarmerRouter); // Farmer-specific routes
app.use('/retailer', RetailerRouter); // Retailer-specific routes

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
