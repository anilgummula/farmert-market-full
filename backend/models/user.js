const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, enum: ['Farmer', 'Retailer'], required: true }, // Farmer or Retailer
});

module.exports = mongoose.model('user', UserSchema);
