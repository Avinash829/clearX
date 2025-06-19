
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, Heart, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    discount: '',
    price: '',
    expiry: '',
    location: ''
  });
  
  const products = [
    { 
      id: 1, 
      name: 'Fresh Apples', 
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop', 
      price: 120, 
      originalPrice: 150, 
      discount: 20, 
      expiry: '2 days', 
      category: 'Fresh Produce', 
      rating: 4.5,
      location: 'Mumbai Central'
    },
    { 
      id: 2, 
      name: 'Fresh Bread Loaves', 
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop', 
      price: 25, 
      originalPrice: 35, 
      discount: 29, 
      expiry: '1 day', 
      category: 'Bakery', 
      rating: 4.2,
      location: 'Andheri West'
    },
    { 
      id: 3, 
      name: 'Fresh Milk Packets', 
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop', 
      price: 45, 
      originalPrice: 55, 
      discount: 18, 
      expiry: '2 days', 
      category: 'Dairy', 
      rating: 4.8,
      location: 'Bandra East'
    },
    { 
      id: 4, 
      name: 'Ripe Bananas', 
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop', 
      price: 60, 
      originalPrice: 80, 
      discount: 25, 
      expiry: '3 days', 
      category: 'Fresh Produce', 
      rating: 4.3,
      location: 'Powai'
    },
    { 
      id: 5, 
      name: 'Chocolate Cookies', 
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=300&fit=crop', 
      price: 80, 
      originalPrice: 100, 
      discount: 20, 
      expiry: '5 days', 
      category: 'Bakery', 
      rating: 4.6,
      location: 'Thane West'
    },
    { 
      id: 6, 
      name: 'Greek Yogurt', 
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=300&fit=crop', 
      price: 35, 
      originalPrice: 45, 
      discount: 22, 
      expiry: '2 days', 
      category: 'Dairy', 
      rating: 4.4,
      location: 'Borivali West'
    }
  ];

  const cartItems = [
    { id: 1, name: 'Fresh Apples', price: 120, quantity: 2, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=100&h=100&fit=crop' },
    { id: 3, name: 'Fresh Milk Packets', price: 45, quantity: 1, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100&h=100&fit=crop' }
  ];

  const wishlistItems = [
    { id: 2, name: 'Fresh Bread Loaves', price: 25, originalPrice: 35, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop' },
    { id: 4, name: 'Ripe Bananas', price: 60, originalPrice: 80, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=100&h=100&fit=crop' }
  ];

  const categories = ['Fresh Produce', 'Bakery', 'Dairy', 'Packaged Foods'];
  const locations = ['Mumbai Central', 'Andheri West', 'Bandra East', 'Powai', 'Thane West', 'Borivali West'];
  
  const orderStatus = [
    { step: 'Order Placed', completed: true, time: '10:30 AM' },
    { step: 'Confirmed', completed: true, time: '10:45 AM' },
    { step: 'Preparing', completed: true, time: '11:00 AM' },
    { step: 'Out for Delivery', completed: false, time: '' },
    { step: 'Delivered', completed: false, time: '' }
  ];

  const loyaltyPoints = 1250;
  const totalSavings = 2380;

  const handleBuyNow = (productId) => {
    navigate(`/buy-now/${productId}`);
  };

  const handleAddToWishlist = (productId) => {
    console.log('Added to wishlist:', productId);
    // Add wishlist logic here
  };

  const handleAddToCart = (productId) => {
    console.log('Added to cart:', productId);
    // Add cart logic here
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Dashboard</h1>
              <p className="text-gray-600">Discover great deals and save money</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => setWishlistOpen(true)}
                variant="outline"
                className="relative"
              >
                <Heart className="h-4 w-4 mr-2" />
                Wishlist ({wishlistItems.length})
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Button>
              <Button 
                onClick={() => setCartOpen(true)}
                className="bg-eco-green hover:bg-eco-dark relative"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart ({cartItems.length})
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Loyalty Points</p>
                    <p className="text-2xl font-bold text-eco-green">{loyaltyPoints}</p>
                  </div>
                  <div className="text-3xl">
                    <img src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=40&h=40&fit=crop" alt="trophy" className="w-8 h-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Savings</p>
                    <p className="text-2xl font-bold text-green-600">₹{totalSavings}</p>
                  </div>
                  <div className="text-3xl">
                    <img src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=40&h=40&fit=crop" alt="money" className="w-8 h-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Orders This Month</p>
                    <p className="text-2xl font-bold text-blue-600">12</p>
                  </div>
                  <div className="text-3xl">
                    <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=40&h=40&fit=crop" alt="package" className="w-8 h-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Location Filter */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      Nearby Location
                    </h4>
                    <div className="space-y-2">
                      <Input 
                        placeholder="Search locations..." 
                        value={selectedFilters.location}
                        onChange={(e) => setSelectedFilters({
                          ...selectedFilters,
                          location: e.target.value
                        })}
                        className="mb-3"
                      />
                      <div className="max-h-32 overflow-y-auto space-y-2">
                        {locations
                          .filter(location => 
                            location.toLowerCase().includes(selectedFilters.location.toLowerCase())
                          )
                          .map(location => (
                            <div key={location} className="flex items-center space-x-2">
                              <Checkbox
                                id={location}
                                checked={selectedFilters.location === location}
                                onCheckedChange={(checked) => {
                                  setSelectedFilters({
                                    ...selectedFilters,
                                    location: checked ? location : ''
                                  });
                                }}
                              />
                              <label htmlFor={location} className="text-sm cursor-pointer">{location}</label>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Category</h4>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={category}
                            checked={selectedFilters.category.includes(category)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedFilters({
                                  ...selectedFilters,
                                  category: [...selectedFilters.category, category]
                                });
                              } else {
                                setSelectedFilters({
                                  ...selectedFilters,
                                  category: selectedFilters.category.filter(c => c !== category)
                                });
                              }
                            }}
                          />
                          <label htmlFor={category} className="text-sm">{category}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Discount</h4>
                    <select className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md">
                      <option value="">Any discount</option>
                      <option value="10">10% or more</option>
                      <option value="20">20% or more</option>
                      <option value="30">30% or more</option>
                    </select>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <select className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md">
                      <option value="">Any price</option>
                      <option value="0-50">₹0 - ₹50</option>
                      <option value="50-100">₹50 - ₹100</option>
                      <option value="100+">₹100+</option>
                    </select>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Expiry</h4>
                    <select className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md">
                      <option value="">Any expiry</option>
                      <option value="1">Expires in 1 day</option>
                      <option value="3">Expires in 3 days</option>
                      <option value="7">Expires in 1 week</option>
                    </select>
                  </div>

                  <Button variant="outline" className="w-full">
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Available Products</h2>
                <div className="flex items-center space-x-4">
                  <Input placeholder="Search products..." className="w-64" />
                  <select className="h-10 px-3 py-2 text-sm bg-background border border-input rounded-md">
                    <option value="discount">Sort by Discount</option>
                    <option value="price">Sort by Price</option>
                    <option value="rating">Sort by Rating</option>
                    <option value="expiry">Sort by Expiry</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {products.map(product => (
                  <Card key={product.id} className="hover-lift">
                    <CardContent className="p-4">
                      <div className="relative mb-4">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-32 object-cover rounded-lg mb-2"
                        />
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                          {product.discount}% OFF
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg font-bold text-eco-green">₹{product.price}</span>
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Expires in {product.expiry}</span>
                        <div className="flex items-center">
                          <span>⭐ {product.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{product.location}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex space-x-2">
                          <Button 
                            onClick={() => handleAddToCart(product.id)}
                            className="flex-1 bg-eco-green hover:bg-eco-dark text-white"
                          >
                            Add to Cart
                          </Button>
                          <Button 
                            onClick={() => handleAddToWishlist(product.id)}
                            variant="outline"
                            size="icon"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button 
                          onClick={() => handleBuyNow(product.id)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Buy Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Order Tracking Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Current Order Tracking</CardTitle>
              <CardDescription>Order #ORD123 • Estimated delivery: 2:30 PM</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                {orderStatus.map((status, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      status.completed ? 'bg-eco-green text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {status.completed ? '✓' : index + 1}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{status.step}</p>
                      {status.time && <p className="text-xs text-gray-500">{status.time}</p>}
                    </div>
                    {index < orderStatus.length - 1 && (
                      <div className={`w-16 h-1 ${status.completed ? 'bg-eco-green' : 'bg-gray-200'}`}></div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cart Sidebar */}
        {cartOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Shopping Cart</h3>
                  <Button variant="outline" size="sm" onClick={() => setCartOpen(false)}>
                    ✕
                  </Button>
                </div>
                <div className="space-y-4 mb-6">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">₹{item.price} × {item.quantity}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold">Total: ₹285</span>
                  </div>
                  <Button className="w-full bg-eco-green hover:bg-eco-dark text-white">
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wishlist Sidebar */}
        {wishlistOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Wishlist</h3>
                  <Button variant="outline" size="sm" onClick={() => setWishlistOpen(false)}>
                    ✕
                  </Button>
                </div>
                <div className="space-y-4 mb-6">
                  {wishlistItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold text-eco-green">₹{item.price}</span>
                            <span className="text-xs text-gray-500 line-through">₹{item.originalPrice}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Button variant="outline" size="sm" onClick={() => handleAddToCart(item.id)}>
                          Add to Cart
                        </Button>
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                {wishlistItems.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Your wishlist is empty</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CustomerDashboard;
