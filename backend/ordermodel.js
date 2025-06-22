const mongoose = require('mongoose');

const orderStatusSchema = new mongoose.Schema({
  step: { type: String, required: true },
  completed: { type: Boolean, default: false },
  time: { type: String }
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number }  // Final price at time of order
  }],
  totalAmount: { type: Number },
  orderStatus: [orderStatusSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
