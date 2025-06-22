const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id:{type:Number,unique:true},
  name: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  discount: { type: Number },
  expiry: { type: String },
  category: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5 },
  location: { type: String }
});

module.exports = mongoose.model('Product', productSchema);

