const express = require('express');
const router = express.Router();
const Product = require('./productmodel');
const Cart = require('./cartmodel');
const Order = require('./cartmodel');
const Wishlist = require('./wishlistmodel')


// === PRODUCTS ===
router.post('/products', async (req, res) => {
  try {
    const {
      name, image, price, originalPrice, discount,
      expiry, category, rating, location
    } = req.body;

    const newProduct = new Product({
      name,
      image,
      price,
      originalPrice,
      discount,
      expiry,
      category,
      rating,
      location
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/getproducts', async (req, res) => {
  try {
    const products = await Product.find(); 
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// === CART ===
router.post('/cart', async (req, res) => {
  try {
    const { userId, items } = req.body;

    const newCart = new Cart({
      userId,
      items
    });

    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/getcart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const userCart = await Cart.find({ userId });
    console.log(userCart)
    if (!userCart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    const detailedItems = [];
for(const usercart of userCart)
  
   { 
    console.log(usercart)
    
    for (const item of usercart.items) {
      const product = await Product.findOne({ id: item.productId }); 
      if (product) {
        detailedItems.push({
          product,
          quantity: item.quantity
        });
      }
    }}

    res.status(200).json({
      userId: userCart.userId,
      items: detailedItems
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.delete('/cart/:id', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cart deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// === ORDERS ===
router.post('/orders', async (req, res) => {
  try {
    const { userId, items, totalAmount, orderStatus } = req.body;

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      orderStatus
    });
    await Cart.deleteMany({userId:userId})
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/orders/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// === WISHLIST ===
router.post('/wishlist', async (req, res) => {
  try {
    const { userId, product } = req.body;

    const wishlist = await Wishlist.findOne({ userId });

    if (wishlist) {
      // Just push the product to the existing wishlist
      wishlist.items.push(product);
      const updatedWishlist = await wishlist.save();
      return res.status(200).json(updatedWishlist);
    } else {
      // Create new wishlist if not found
      const newWishlist = new Wishlist({
        userId,
        items: [product],
      });

      const savedWishlist = await newWishlist.save();
      return res.status(201).json(savedWishlist);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get('/wishlist/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found for this user.' });
    }

    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/wishlist/:id', async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Wishlist deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
