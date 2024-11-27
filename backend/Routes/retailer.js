const router = require('express').Router();
const { getAllProducts, buyProduct, getMyOrders } = require('../Controllers/RetailerController');
const { authenticateToken } = require('../Middlewares/Auth');

// Get all products listed by farmers
router.get('/products', authenticateToken, getAllProducts);

// Buy a product
router.post('/buy-product/:productId', authenticateToken, buyProduct);

// View retailer's orders
router.get('/my-orders', authenticateToken, getMyOrders);

module.exports = router;
