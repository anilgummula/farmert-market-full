const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Farmer who listed the product
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
