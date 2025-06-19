import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Layout from '@/components/Layout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get the selected role from localStorage
    const selectedRole = localStorage.getItem('userRole') || 'customer';
    setUserRole(selectedRole);
  }, []);

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'retailer': return 'Retailer';
      case 'agent': return 'Delivery Agent';
      default: return 'Customer';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'retailer': return '🏪';
      case 'agent': return '🚴‍♂️';
      default: return '🛒';
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      console.log('Setting login status to true for role:', userRole);
      
      // Set logged in status
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', userRole);
      
      // Dispatch custom event to notify navbar and other components
      window.dispatchEvent(new Event('loginStateChanged'));
      
      console.log('Login state changed event dispatched');
      
      // Role-based redirection to match App.tsx routes
      switch (userRole) {
        case 'retailer':
          navigate('/dashboard/retailer');
          break;
        case 'agent':
          navigate('/dashboard/agent');
          break;
        default:
          navigate('/dashboard/customer');
          break;
      }
    }, 1500);
  };

  const handleChangeRole = () => {
    localStorage.removeItem('userRole');
    navigate('/role-selection');
  };

  return (
    <Layout>
      <section className="min-h-screen bg-gradient-to-br from-eco-lightest via-white to-eco-lightest flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-eco-green to-eco-dark rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-gray-600">Sign in to your ClearX account</p>
          </div>

          {/* Role Indicator */}
          <div className="bg-white rounded-lg border p-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">{getRoleIcon(userRole)}</span>
              <span className="font-medium text-gray-900">Signing in as {getRoleDisplayName(userRole)}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleChangeRole}
              className="mt-2 text-sm"
            >
              Change Role
            </Button>
          </div>

          {/* Login Form */}
          <Card className="shadow-lg border-0">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Sign In</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your {getRoleDisplayName(userRole).toLowerCase()} account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-eco-green focus:ring-eco-green border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-eco-green hover:text-eco-dark">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-eco-green hover:bg-eco-dark text-white"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <Separator />

              {/* Social Login Placeholder */}
              <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  <span className="mr-2">🔍</span>
                  Continue with Google
                </Button>
                <Button variant="outline" className="w-full">
                  <span className="mr-2">📘</span>
                  Continue with Facebook
                </Button>
              </div>

              {/* Demo Accounts */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Demo Accounts (for testing):</h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>• retailer@demo.com - Retailer Dashboard</p>
                  <p>• customer@demo.com - Customer Dashboard</p>
                  <p>• agent@demo.com - Delivery Agent Dashboard</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-eco-green hover:text-eco-dark">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
