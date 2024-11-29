const router = require('express').Router();
const { addProduct, getMyProducts, manageOrder, getMyOrders } = require('../Controllers/FarmerController');
const ensureAuthenticated = require('../Middlewares/Auth');

// Add a new product
router.post('/add-product', ensureAuthenticated, addProduct);

// View all products listed by the farmer
router.get('/my-products', ensureAuthenticated, getMyProducts);

// Manage orders (accept/reject)
router.patch('/manage-order/:orderId', ensureAuthenticated, manageOrder);

// Get orders for the logged-in farmer
router.get('/my-orders', ensureAuthenticated, getMyOrders);

module.exports = router;
