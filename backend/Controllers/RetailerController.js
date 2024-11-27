const Product = require('../models/Product');
const Order = require('../models/Order');

// Get all products listed by farmers
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('farmer', 'username');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Buy a product
exports.buyProduct = async (req, res) => {
  if (req.user.type !== 'Retailer') {
    return res.status(403).json({ error: 'Access denied' });
  }

  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product || product.quantity < quantity) {
      return res.status(400).json({ error: 'Insufficient stock or product not found' });
    }

    const totalAmount = product.price * quantity;

    // Create an order
    const order = new Order({
      buyer: req.user.id,
      product: productId,
      quantity,
      totalAmount,
    });
    await order.save();

    // Deduct quantity from the product
    product.quantity -= quantity;
    await product.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
};

// View retailer's orders
exports.getMyOrders = async (req, res) => {
  if (req.user.type !== 'Retailer') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const orders = await Order.find({ buyer: req.user.id }).populate('product', 'name price');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
