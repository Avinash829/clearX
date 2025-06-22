import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import axios from 'axios';
const CustomerSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: 'buyer', // Explicitly setting the role as buyer (customer)
  });

  const getPasswordStrength = (password) => {
    if (password.length < 6) return { strength: 'weak', color: 'bg-red-500', width: '33%' };
    if (password.length < 10) return { strength: 'medium', color: 'bg-yellow-500', width: '66%' };
    return { strength: 'strong', color: 'bg-green-500', width: '100%' };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace with your FastAPI endpoint later
      const response = await axios.post('http://localhost:5000/auth/signup/customer',formData)

      if (response.status!=201) {
        
        alert('Signup failed:Unknown error');
        return;
      }

      
      navigate('/login');
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Something went wrong during signup. Please try again later.');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-eco-lightest py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">Buyer Registration</CardTitle>
              <CardDescription>
                Sign up to purchase fresh produce directly from farmers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullname">First Name</Label>
                    <Input
                      id="fullname"
                      required
                      value={formData.fullname}
                      onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Create a strong password"
                  />
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getPasswordStrength(formData.password).color} transition-all duration-300`}
                            style={{ width: getPasswordStrength(formData.password).width }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 capitalize">
                          {getPasswordStrength(formData.password).strength}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full bg-eco-green hover:bg-eco-dark text-white">
                  Register as Buyer
                </Button>

                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-eco-green hover:underline">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerSignup;
