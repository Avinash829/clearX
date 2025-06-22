const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type:Number,required:true},
  quantity: { type: Number, default: 1 },
});

const cartSchema = new mongoose.Schema({
  userId: { type:Number, required: true },
  items: [cartItemSchema]
});

module.exports = mongoose.model('Cart', cartSchema);
