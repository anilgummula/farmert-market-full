const router = require('express').Router();
const { addProduct, getMyProducts, manageOrder } = require('../Controllers/FarmerController');
const ensureAuthenticated = require('../Middlewares/Auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Temporary directory for image uploads

// Add a new product
router.post('/add-product', ensureAuthenticated, upload.single('image'), addProduct);

// View all products listed by the farmer
router.get('/my-products', ensureAuthenticated, getMyProducts);

// Manage orders (accept/reject)
router.patch('/manage-order/:orderId', ensureAuthenticated, manageOrder);

module.exports = router;
