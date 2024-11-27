const router = require('express').Router();
const { addProduct, getMyProducts, manageOrder } = require('../Controllers/FarmerController');
const { authenticateToken } = require('../Middlewares/Auth');

// Add a new product
router.post('/add-product', authenticateToken, addProduct);

// View all products listed by the farmer
router.get('/my-products', authenticateToken, getMyProducts);

// Manage orders (accept/reject)
router.patch('/manage-order/:orderId', authenticateToken, manageOrder);

module.exports = router;
