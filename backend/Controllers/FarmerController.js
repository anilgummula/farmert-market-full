const Product = require('../models/Product');
const Order = require('../models/Order'); // Ensure Order model is required if used in manageOrder

// Fetch products listed by the farmer
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ farmer: req.user._id });
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch products!', error: err.message });
  }
};

// Get orders for the logged-in farmer
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ farmer: req.user._id }).populate('product');
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders!', error: err.message });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { productName, price, quantity, category } = req.body;

    const product = new Product({
      name: productName,
      price,
      quantity,
      category,
      farmer: req.user._id, // Assuming farmer ID is in the JWT token
    });

    await product.save();

    res.status(201).json({ success: true, message: 'Product added successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error in fc !', error: err });
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
