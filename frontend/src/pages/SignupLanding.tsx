
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';

const SignupLanding = () => {
  const roles = [
    {
      title: 'Retailers',
      description: 'List your excess inventory and recover costs while reducing waste',
      icon: '🏪',
      benefits: [
        'Turn expiring inventory into revenue',
        'Reduce waste disposal costs',
        'Access to built-in customer base',
        'Automated pricing suggestions'
      ],
      ctaText: 'Join as Retailer',
      link: '/signup/retailer',
      gradient: 'from-blue-50 to-blue-100'
    },
    {
      title: 'Customers',
      description: 'Save money on quality products near you and help the environment',
      icon: '🛒',
      benefits: [
        'Save up to 50% on quality products',
        'Discover new local businesses',
        'Reduce environmental impact',
        'Convenient doorstep delivery'
      ],
      ctaText: 'Join as Customer',
      link: '/signup/customer',
      gradient: 'from-green-50 to-green-100'
    },
    {
      title: 'Delivery Agents',
      description: 'Earn money with flexible delivery work and make a positive impact',
      icon: '🚴‍♂️',
      benefits: [
        'Flexible working hours',
        'Competitive delivery rates',
        'Instant payment processing',
        'Route optimization tools'
      ],
      ctaText: 'Join as Agent',
      link: '/signup/agent',
      gradient: 'from-purple-50 to-purple-100'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-eco-lightest via-white to-eco-lightest py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
            Ready to Join the <span className="text-eco-green">ClearX Community?</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 animate-fade-in">
            Choose your role and start making a difference today. Together, we can reduce waste and save money.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 animate-scale-in">
            <span className="flex items-center">
              <span className="text-eco-green mr-1">✓</span>
              Free to join
            </span>
            <span className="flex items-center">
              <span className="text-eco-green mr-1">✓</span>
              Quick setup
            </span>
            <span className="flex items-center">
              <span className="text-eco-green mr-1">✓</span>
              Start earning immediately
            </span>
          </div>
        </div>
      </section>

      {/* Role Selection Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roles.map((role, index) => (
              <Card key={index} className={`hover-lift border-0 shadow-lg bg-gradient-to-br ${role.gradient} overflow-hidden`}>
                <CardHeader className="text-center pb-4">
                  <div className="text-5xl mb-4">{role.icon}</div>
                  <CardTitle className="text-2xl text-gray-900">{role.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-base">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Why join as {role.title.toLowerCase()}?</h4>
                    <ul className="space-y-2">
                      {role.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600">
                          <span className="text-eco-green mr-2 flex-shrink-0">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link to={role.link}>
                    <Button className="w-full bg-eco-green hover:bg-eco-dark text-white">
                      {role.ctaText}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-eco-lightest">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Growing Community</h2>
            <p className="text-gray-600">Thousands of users are already making a difference</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-eco-green mb-2">500+</div>
              <p className="text-gray-600">Active Retailers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-eco-green mb-2">10,000+</div>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-eco-green mb-2">250+</div>
              <p className="text-gray-600">Delivery Agents</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-eco-green mb-2">₹50L+</div>
              <p className="text-gray-600">Waste Prevented</p>
            </div>
          </div>
        </div>
      </section>

      {/* Already have account */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Already have an account?</h3>
            <p className="text-gray-600 mb-6">
              Sign in to access your dashboard and continue your sustainable journey with ClearX.
            </p>
            <Link to="/login">
              <Button variant="outline" size="lg" className="border-eco-green text-eco-green hover:bg-eco-green hover:text-white">
                Sign In to Your Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SignupLanding;
