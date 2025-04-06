const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Order', orderSchema);