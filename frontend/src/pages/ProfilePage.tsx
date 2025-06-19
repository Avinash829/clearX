
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Edit, Settings, LogOut, Save, X } from 'lucide-react';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const [userRole, setUserRole] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    // Role-specific fields
    businessName: '',
    storeAddress: '',
    storeType: '',
    deliveryAddress: '',
    loyaltyPoints: 0,
    vehicleType: '',
    preferredTimeSlots: '',
    // Settings
    notifications: true,
    inventoryAlerts: true,
    paymentMethods: 'Credit Card',
    preferences: 'Standard Delivery',
    availableTimeSlots: '9 AM - 6 PM',
    vehicleInfo: ''
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const role = localStorage.getItem('userRole') || 'customer';
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      navigate('/role-selection');
      return;
    }
    
    setUserRole(role);
    
    // Mock data based on role
    const mockData = {
      customer: {
        fullName: 'John Customer',
        email: 'john@customer.com',
        phone: '+1 234 567 8900',
        deliveryAddress: '123 Main St, City, State 12345',
        loyaltyPoints: 1250
      },
      retailer: {
        fullName: 'Jane Retailer',
        email: 'jane@retailer.com',
        phone: '+1 234 567 8901',
        businessName: 'Green Grocery Store',
        storeAddress: '456 Business Ave, City, State 12345',
        storeType: 'Grocery & Fresh Produce'
      },
      agent: {
        fullName: 'Mike Agent',
        email: 'mike@agent.com',
        phone: '+1 234 567 8902',
        vehicleType: 'Electric Bike',
        preferredTimeSlots: '9 AM - 5 PM',
        vehicleInfo: 'Eco-friendly electric bike, capacity: 50kg'
      }
    };
    
    setProfileData(prev => ({ ...prev, ...mockData[role as keyof typeof mockData] }));
  }, [navigate]);

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'retailer': return 'Retailer';
      case 'agent': return 'Delivery Agent';
      case 'customer': return 'Customer';
      default: return 'User';
    }
  };

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    // Mock save operation
    setTimeout(() => {
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
    window.dispatchEvent(new Event('loginStateChanged'));
    navigate('/');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const renderRoleSpecificInfo = () => {
    switch (userRole) {
      case 'retailer':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                {isEditing ? (
                  <Input
                    value={profileData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-900">{profileData.businessName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Store Type</label>
                {isEditing ? (
                  <Input
                    value={profileData.storeType}
                    onChange={(e) => handleInputChange('storeType', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-900">{profileData.storeType}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Store Address</label>
              {isEditing ? (
                <Textarea
                  value={profileData.storeAddress}
                  onChange={(e) => handleInputChange('storeAddress', e.target.value)}
                />
              ) : (
                <p className="text-gray-900">{profileData.storeAddress}</p>
              )}
            </div>
          </>
        );
      
      case 'customer':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                {isEditing ? (
                  <Textarea
                    value={profileData.deliveryAddress}
                    onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-900">{profileData.deliveryAddress}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loyalty Points</label>
                <p className="text-eco-green font-semibold text-lg">{profileData.loyaltyPoints} points</p>
              </div>
            </div>
          </>
        );
      
      case 'agent':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                {isEditing ? (
                  <Input
                    value={profileData.vehicleType}
                    onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-900">{profileData.vehicleType}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time Slots</label>
                {isEditing ? (
                  <Input
                    value={profileData.preferredTimeSlots}
                    onChange={(e) => handleInputChange('preferredTimeSlots', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-900">{profileData.preferredTimeSlots}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Information</label>
              {isEditing ? (
                <Textarea
                  value={profileData.vehicleInfo}
                  onChange={(e) => handleInputChange('vehicleInfo', e.target.value)}
                />
              ) : (
                <p className="text-gray-900">{profileData.vehicleInfo}</p>
              )}
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  const renderRoleSpecificSettings = () => {
    switch (userRole) {
      case 'retailer':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Notifications</h4>
                <p className="text-sm text-gray-500">Receive email notifications for new orders</p>
              </div>
              <Switch
                checked={profileData.notifications}
                onCheckedChange={(checked) => handleInputChange('notifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Inventory Alerts</h4>
                <p className="text-sm text-gray-500">Get notified when stock is low</p>
              </div>
              <Switch
                checked={profileData.inventoryAlerts}
                onCheckedChange={(checked) => handleInputChange('inventoryAlerts', checked)}
              />
            </div>
          </div>
        );
      
      case 'customer':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Methods</label>
              <Input
                value={profileData.paymentMethods}
                onChange={(e) => handleInputChange('paymentMethods', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Preferences</label>
              <Input
                value={profileData.preferences}
                onChange={(e) => handleInputChange('preferences', e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'agent':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Available Time Slots</label>
              <Input
                value={profileData.availableTimeSlots}
                onChange={(e) => handleInputChange('availableTimeSlots', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Information</label>
              <Textarea
                value={profileData.vehicleInfo}
                onChange={(e) => handleInputChange('vehicleInfo', e.target.value)}
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-eco-lightest via-white to-eco-lightest py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Account</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Your profile information as a {getRoleDisplayName(userRole)}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      {isEditing ? (
                        <>
                          <Button 
                            onClick={handleSaveProfile}
                            className="bg-eco-green hover:bg-eco-dark"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setIsEditing(false)}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button 
                          onClick={() => setIsEditing(true)}
                          variant="outline"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      {isEditing ? (
                        <Input
                          value={profileData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.fullName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <p className="text-gray-900">{profileData.email}</p>
                      <p className="text-xs text-gray-500">Email cannot be changed</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      {isEditing ? (
                        <Input
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                      <p className="text-eco-green font-medium">{getRoleDisplayName(userRole)}</p>
                      <p className="text-xs text-gray-500">Role cannot be changed</p>
                    </div>
                  </div>

                  {/* Role-specific Information */}
                  {renderRoleSpecificInfo()}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>
                    Manage your {getRoleDisplayName(userRole).toLowerCase()} preferences and settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderRoleSpecificSettings()}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Management</CardTitle>
                  <CardDescription>
                    Manage your account security and session
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <h4 className="text-lg font-medium text-red-900 mb-2">Logout</h4>
                    <p className="text-red-700 mb-4">
                      This will end your current session and redirect you to the home page.
                    </p>
                    <Button 
                      onClick={handleLogout}
                      variant="destructive"
                      className="flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
