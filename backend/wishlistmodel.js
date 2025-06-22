const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
  id: {
    type: Number, 
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
}, { _id: false }); 

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: Number, // assuming users are stored with ObjectId
    required: true,
  },
  items: [wishlistItemSchema],
}, { timestamps: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);
