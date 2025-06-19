
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import Layout from '@/components/Layout';

const DeliveryAgentSignup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    city: '',
    password: '',
    confirmPassword: '',
    vehicleType: '',
    licensePlate: '',
    drivingLicense: null,
    aadharId: null,
    bankAccount: '',
    workingHours: []
  });

  const vehicleTypes = ['Bike', 'Scooter', 'Car', 'Van'];
  const workingHourOptions = ['Morning (6AM - 12PM)', 'Afternoon (12PM - 6PM)', 'Evening (6PM - 12AM)'];

  const getPasswordStrength = (password) => {
    if (password.length < 6) return { strength: 'weak', color: 'bg-red-500' };
    if (password.length < 10) return { strength: 'medium', color: 'bg-yellow-500' };
    return { strength: 'strong', color: 'bg-green-500' };
  };

  const handleSubmit = () => {
    console.log('Delivery agent signup completed:', formData);
    navigate('/login');
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  return (
    <Layout>
      <div className="min-h-screen bg-eco-lightest py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Step {currentStep} of 3</span>
              <span className="text-sm text-gray-500">{Math.round((currentStep / 3) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-eco-green h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">Join as Delivery Agent</CardTitle>
              <CardDescription>
                {currentStep === 1 && "Let's start with your personal information"}
                {currentStep === 2 && "Tell us about your vehicle"}
                {currentStep === 3 && "Complete verification process"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        placeholder="Your city"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="Create a strong password"
                    />
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className={`h-2 rounded-full ${getPasswordStrength(formData.password).color} transition-all duration-300`} 
                                 style={{ width: formData.password.length < 6 ? '33%' : formData.password.length < 10 ? '66%' : '100%' }}></div>
                          </div>
                          <span className="text-sm text-gray-600 capitalize">{getPasswordStrength(formData.password).strength}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      placeholder="Confirm your password"
                    />
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Vehicle Info */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="vehicleType">Vehicle Type</Label>
                    <select
                      id="vehicleType"
                      className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md"
                      value={formData.vehicleType}
                      onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
                    >
                      <option value="">Select vehicle type</option>
                      {vehicleTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="licensePlate">License Plate Number</Label>
                    <Input
                      id="licensePlate"
                      value={formData.licensePlate}
                      onChange={(e) => setFormData({...formData, licensePlate: e.target.value})}
                      placeholder="e.g., MH01AB1234"
                    />
                  </div>

                  <div>
                    <Label>Upload Driving License</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <div className="text-gray-500">
                        <p>Upload a clear photo of your driving license</p>
                        <Button variant="outline" className="mt-2">Choose File</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Verification */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label>Upload Aadhar Card / ID Proof</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <div className="text-gray-500">
                        <p>Upload a clear photo of your Aadhar card or government ID</p>
                        <Button variant="outline" className="mt-2">Choose File</Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bankAccount">Bank Account Number</Label>
                    <Input
                      id="bankAccount"
                      value={formData.bankAccount}
                      onChange={(e) => setFormData({...formData, bankAccount: e.target.value})}
                      placeholder="Your bank account number"
                    />
                  </div>

                  <div>
                    <Label>Preferred Working Hours</Label>
                    <div className="space-y-2 mt-2">
                      {workingHourOptions.map(hour => (
                        <div key={hour} className="flex items-center space-x-2">
                          <Checkbox
                            id={hour}
                            checked={formData.workingHours.includes(hour)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({...formData, workingHours: [...formData.workingHours, hour]});
                              } else {
                                setFormData({...formData, workingHours: formData.workingHours.filter(h => h !== hour)});
                              }
                            }}
                          />
                          <Label htmlFor={hour} className="text-sm">{hour}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">Important:</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• All documents will be verified within 24-48 hours</li>
                      <li>• You'll receive an email confirmation once approved</li>
                      <li>• Ensure all documents are clear and readable</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                <div className="ml-auto">
                  {currentStep < 3 ? (
                    <Button onClick={nextStep} className="bg-eco-green hover:bg-eco-dark">
                      Next Step
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} className="bg-eco-green hover:bg-eco-dark">
                      Complete Registration
                    </Button>
                  )}
                </div>
              </div>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-eco-green hover:underline">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DeliveryAgentSignup;
