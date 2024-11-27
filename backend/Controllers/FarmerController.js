const Product = require('../models/Product');

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { productName, price, quantity, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Product image is required!' });
    }

    const imageUrl = req.file.path; // Assuming you're using multer for file uploads

    const product = new Product({
      name: productName,
      price,
      quantity,
      category,
      image: imageUrl,
    });

    await product.save();

    res.status(201).json({ success: true, message: 'Product added successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error!', error: err.message });
  }
};

// Fetch all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error!', error: err.message });
  }
};




// Fetch products listed by the farmer
exports.getMyProducts = async (req, res) => {
    try {
      const products = await Product.find({ farmer: req.user.id }); // Assuming farmer ID is in the JWT token
      res.status(200).json({ success: true, products });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to fetch products!', error: err.message });
    }
};
  
  // Accept or reject an order
exports.manageOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body; // 'accepted' or 'rejected'
  
      const order = await Order.findById(orderId);
      if (!order) return res.status(404).json({ success: false, message: 'Order not found!' });
  
      order.status = status;
      await order.save();
  
      res.status(200).json({ success: true, message: `Order ${status} successfully!` });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to update order status!', error: err.message });
    }
};
