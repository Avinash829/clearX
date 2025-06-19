
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, Smartphone, Truck, Tag, Shield } from 'lucide-react';
import Layout from '@/components/Layout';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state || {};
  
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');

  const { product, quantity, shippingDetails, totalAmount } = orderData;
  
  const couponDiscount = appliedCoupon ? 50 : 0;
  const finalAmount = (totalAmount || 0) - couponDiscount;

  const availableCoupons = [
    { code: 'SAVE50', discount: 50, description: 'Save ₹50 on orders above ₹500' },
    { code: 'FIRST10', discount: 10, description: '₹10 off on first order' }
  ];

  const handleApplyCoupon = () => {
    const validCoupon = availableCoupons.find(c => c.code === couponCode.toUpperCase());
    if (validCoupon) {
      setAppliedCoupon(validCoupon);
    } else {
      alert('Invalid coupon code');
    }
  };

  const handlePayment = () => {
    console.log('Processing payment:', {
      method: selectedPayment,
      amount: finalAmount,
      orderData,
      paymentDetails: selectedPayment === 'card' ? cardDetails : selectedPayment === 'upi' ? { upiId } : {}
    });
    
    // Simulate payment processing
    alert('Payment successful! Order placed.');
    navigate('/customer-dashboard');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Payment</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Options */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle>Choose Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                    {/* Cash on Delivery */}
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="cod" id="cod" />
                      <div className="flex items-center space-x-3 flex-1">
                        <Truck className="h-5 w-5 text-green-600" />
                        <div>
                          <label htmlFor="cod" className="font-medium cursor-pointer">Cash on Delivery</label>
                          <p className="text-sm text-gray-500">Pay when your order arrives</p>
                        </div>
                      </div>
                    </div>

                    {/* UPI Payment */}
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="upi" id="upi" />
                      <div className="flex items-center space-x-3 flex-1">
                        <Smartphone className="h-5 w-5 text-blue-600" />
                        <div>
                          <label htmlFor="upi" className="font-medium cursor-pointer">UPI Payment</label>
                          <p className="text-sm text-gray-500">Pay using Google Pay, PhonePe, Paytm</p>
                        </div>
                      </div>
                    </div>

                    {/* Credit/Debit Card */}
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="card" id="card" />
                      <div className="flex items-center space-x-3 flex-1">
                        <CreditCard className="h-5 w-5 text-purple-600" />
                        <div>
                          <label htmlFor="card" className="font-medium cursor-pointer">Credit/Debit Card</label>
                          <p className="text-sm text-gray-500">Visa, Mastercard, RuPay supported</p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>

                  {/* UPI Details */}
                  {selectedPayment === 'upi' && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter UPI ID
                      </label>
                      <Input
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        className="mb-3"
                      />
                      <div className="flex space-x-3">
                        <img src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=40&h=40&fit=crop" alt="GPay" className="w-10 h-6 object-contain" />
                        <img src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=40&h=40&fit=crop" alt="PhonePe" className="w-10 h-6 object-contain" />
                        <img src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=40&h=40&fit=crop" alt="Paytm" className="w-10 h-6 object-contain" />
                      </div>
                    </div>
                  )}

                  {/* Card Details */}
                  {selectedPayment === 'card' && (
                    <div className="mt-4 p-4 bg-purple-50 rounded-lg space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <Input
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cardholder Name
                        </label>
                        <Input
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <Input
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <Input
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                            placeholder="123"
                            type="password"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* COD Info */}
                  {selectedPayment === 'cod' && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Cash on Delivery Available</span>
                      </div>
                      <p className="text-sm text-green-600 mt-1">
                        Pay ₹{finalAmount} when your order is delivered to your doorstep.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Coupons */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Tag className="h-5 w-5 mr-2" />
                    Apply Coupon
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-3 mb-4">
                    <Input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1"
                    />
                    <Button onClick={handleApplyCoupon} variant="outline">
                      Apply
                    </Button>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-green-800 font-medium">{appliedCoupon.code} Applied!</span>
                        <span className="text-green-600">-₹{appliedCoupon.discount}</span>
                      </div>
                      <p className="text-sm text-green-600">{appliedCoupon.description}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700">Available Coupons:</h4>
                    {availableCoupons.map((coupon) => (
                      <div key={coupon.code} className="flex items-center justify-between p-3 border border-dashed border-gray-300 rounded-lg">
                        <div>
                          <span className="font-medium text-gray-900">{coupon.code}</span>
                          <p className="text-sm text-gray-500">{coupon.description}</p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setCouponCode(coupon.code)}
                        >
                          Apply
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  {product && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-gray-500">Qty: {quantity}</p>
                          <p className="font-medium text-eco-green">₹{product.price}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>₹{totalAmount - 40}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery Fee</span>
                          <span>₹40</span>
                        </div>
                        {appliedCoupon && (
                          <div className="flex justify-between text-green-600">
                            <span>Coupon Discount</span>
                            <span>-₹{couponDiscount}</span>
                          </div>
                        )}
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span className="text-eco-green">₹{finalAmount}</span>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={handlePayment}
                        className="w-full bg-eco-green hover:bg-eco-dark text-white"
                        disabled={
                          (selectedPayment === 'card' && (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv)) ||
                          (selectedPayment === 'upi' && !upiId)
                        }
                      >
                        {selectedPayment === 'cod' ? 'Place Order' : `Pay ₹${finalAmount}`}
                      </Button>
                      
                      <div className="flex items-center justify-center space-x-1 text-sm text-gray-500">
                        <Shield className="h-4 w-4" />
                        <span>Secure payment powered by SSL</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
