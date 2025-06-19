import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin, Star, ArrowLeft } from 'lucide-react';
import Layout from '@/components/Layout';

const BuyNow = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    state: ''
  });

  // Mock product data - in real app, fetch based on productId
  const products = [
    { 
      id: 1, 
      name: 'Fresh Apples', 
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop', 
      price: 120, 
      originalPrice: 150, 
      discount: 20, 
      expiry: '2 days', 
      category: 'Fresh Produce', 
      rating: 4.5,
      location: 'Mumbai Central',
      description: 'Fresh, crispy apples sourced directly from farms. Perfect for snacking or cooking.',
      seller: 'Fresh Farm Store'
    },
    { 
      id: 2, 
      name: 'Fresh Bread Loaves', 
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop', 
      price: 25, 
      originalPrice: 35, 
      discount: 29, 
      expiry: '1 day', 
      category: 'Bakery', 
      rating: 4.2,
      location: 'Andheri West',
      description: 'Freshly baked bread loaves, soft and perfect for breakfast or sandwiches.',
      seller: 'City Bakery'
    }
  ];

  const product = products.find(p => p.id === parseInt(productId)) || products[0];

  const handleInputChange = (field, value) => {
    setShippingDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePlaceOrder = () => {
    const orderData = {
      product,
      quantity,
      shippingDetails,
      totalAmount: totalPrice + deliveryFee
    };
    
    navigate('/payment', { state: orderData });
  };

  const totalPrice = product.price * quantity;
  const deliveryFee = totalPrice > 500 ? 0 : 40;
  const finalTotal = totalPrice + deliveryFee;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard/customer')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Buy Now</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Details */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                      <p className="text-gray-600 mt-2">{product.description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-eco-green">₹{product.price}</span>
                        <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                          {product.discount}% OFF
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Expires in {product.expiry}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>Sold by {product.seller} • {product.location}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <label className="font-medium">Quantity:</label>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                          -
                        </Button>
                        <span className="w-12 text-center">{quantity}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Shipping Details & Order Summary */}
            <div className="space-y-6">
              {/* Shipping Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <Input
                          value={shippingDetails.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <Input
                          value={shippingDetails.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <Input
                        value={shippingDetails.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Enter your address"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <Input
                          value={shippingDetails.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pincode
                        </label>
                        <Input
                          value={shippingDetails.pincode}
                          onChange={(e) => handleInputChange('pincode', e.target.value)}
                          placeholder="Pincode"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <Input
                          value={shippingDetails.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          placeholder="State"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Item Total ({quantity} item{quantity > 1 ? 's' : ''})</span>
                      <span>₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                    </div>
                    {deliveryFee === 0 && (
                      <p className="text-sm text-green-600">Free delivery on orders above ₹500</p>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Amount</span>
                      <span className="text-eco-green">₹{finalTotal}</span>
                    </div>
                    <div className="mt-6">
                      <Button 
                        onClick={handlePlaceOrder}
                        className="w-full bg-eco-green hover:bg-eco-dark text-white text-lg py-3"
                        disabled={!shippingDetails.fullName || !shippingDetails.phone || !shippingDetails.address}
                      >
                        Proceed to Payment
                      </Button>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        By placing your order, you agree to our terms and conditions
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BuyNow;
