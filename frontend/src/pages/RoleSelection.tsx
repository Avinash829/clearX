
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';

const RoleSelection = () => {
  const roles = [
    {
      type: 'retailer',
      title: 'Sign In as Retailer',
      description: 'Access your store dashboard to manage inventory and orders',
      icon: '🏪',
      bgColor: 'from-blue-50 to-blue-100',
      hoverColor: 'hover:from-blue-100 hover:to-blue-200'
    },
    {
      type: 'customer',
      title: 'Sign In as Customer',
      description: 'Browse products, place orders, and track deliveries',
      icon: '🛒',
      bgColor: 'from-green-50 to-green-100',
      hoverColor: 'hover:from-green-100 hover:to-green-200'
    },
    {
      type: 'agent',
      title: 'Sign In as Delivery Agent',
      description: 'Manage deliveries, track earnings, and optimize routes',
      icon: '🚴‍♂️',
      bgColor: 'from-purple-50 to-purple-100',
      hoverColor: 'hover:from-purple-100 hover:to-purple-200'
    }
  ];

  const handleRoleSelect = (roleType: string) => {
    localStorage.setItem('userRole', roleType);
  };

  return (
    <Layout>
      <section className="min-h-screen bg-gradient-to-br from-eco-lightest via-white to-eco-lightest flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-eco-green to-eco-dark rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome to ClearX</h2>
            <p className="mt-2 text-gray-600">Choose your role to sign in</p>
          </div>

          {/* Role Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role) => (
              <Link
                key={role.type}
                to="/login"
                onClick={() => handleRoleSelect(role.type)}
                className="transform transition-all duration-200 hover:scale-105"
              >
                <Card className={`h-full bg-gradient-to-br ${role.bgColor} ${role.hoverColor} border-0 shadow-lg cursor-pointer`}>
                  <CardHeader className="text-center pb-4">
                    <div className="text-4xl mb-3">{role.icon}</div>
                    <CardTitle className="text-xl text-gray-900">{role.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-gray-700">
                      {role.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

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

export default RoleSelection;
