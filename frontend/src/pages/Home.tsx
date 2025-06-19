
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';

const Home = () => {
  const stats = [
    { number: '30%', text: 'of food in India is wasted annually' },
    { number: '₹92,000 Cr', text: 'food wasted each year' },
    { number: '77%', text: 'of unsold fashion ends in landfills' }
  ];

  const stakeholders = [
    {
      title: 'Retailer',
      description: 'List your excess inventory and recover costs while reducing waste',
      icon: '🏪',
      features: ['Inventory Management', 'Auto Pricing', 'Sales Analytics']
    },
    {
      title: 'Customer',
      description: 'Save money on quality products near you and help the environment',
      icon: '🛒',
      features: ['Smart Search', 'Secure Checkout', 'Real-time Tracking']
    },
    {
      title: 'Delivery Agent',
      description: 'Earn money with flexible delivery work and make a positive impact',
      icon: '🚴‍♂️',
      features: ['Route Optimization', 'Flexible Hours', 'Instant Payments']
    }
  ];

  const features = [
    { icon: '📦', title: 'Inventory Management', description: 'Smart tools for retailers to manage stock' },
    { icon: '💰', title: 'Auto Pricing', description: 'Dynamic pricing based on expiry dates' },
    { icon: '🔍', title: 'Smart Search & Filters', description: 'Find exactly what you need quickly' },
    { icon: '🔒', title: 'Secure Checkout', description: 'Safe and encrypted payment processing' },
    { icon: '🗺️', title: 'Route Optimization', description: 'Efficient delivery routes for agents' },
    { icon: '🔔', title: 'Real-time Notifications', description: 'Stay updated on orders and deliveries' }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-eco-lightest via-white to-eco-lightest py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-eco-green/5 bg-[radial-gradient(circle_at_50%_50%,rgba(76,175,80,0.1),transparent_70%)]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Sustainability — <br />
            <span className="text-eco-green">Shop Smart, Save the Planet</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in">
            ClearX helps reduce waste by connecting consumers with clearance items from retailers. 
            Join our eco-friendly marketplace and make a difference with every purchase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Link to="/signup">
              <Button size="lg" className="bg-eco-green hover:bg-eco-dark text-white px-8 py-3 text-lg">
                Get Started Today
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="outline" size="lg" className="border-eco-green text-eco-green hover:bg-eco-green hover:text-white px-8 py-3 text-lg">
                Learn How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Problem We're Solving</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Food and product waste is a massive global problem. Here's the reality in India:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-eco-lightest to-white rounded-xl hover-lift">
                <div className="text-4xl font-bold text-eco-green mb-2">{stat.number}</div>
                <p className="text-gray-600">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stakeholders Section */}
      <section className="py-16 bg-eco-lightest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Three-Way Ecosystem</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ClearX connects retailers, customers, and delivery agents in a sustainable marketplace
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stakeholders.map((stakeholder, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg bg-white">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">{stakeholder.icon}</div>
                  <CardTitle className="text-xl text-gray-900">{stakeholder.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {stakeholder.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {stakeholder.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <span className="text-eco-green mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/how-it-works">
                    <Button variant="outline" className="w-full border-eco-green text-eco-green hover:bg-eco-green hover:text-white">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Dashboards for Every Role</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each user type gets a tailored dashboard experience designed for their specific needs
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🏪 Retailer Dashboard</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Product inventory management</li>
                <li>• Sales analytics & reports</li>
                <li>• Order tracking & fulfillment</li>
                <li>• Revenue & commission tracking</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🛒 Customer Dashboard</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Browse products with smart filters</li>
                <li>• Shopping cart & wishlist</li>
                <li>• Order tracking with live updates</li>
                <li>• Loyalty points & savings tracker</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🚴‍♂️ Delivery Dashboard</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Live delivery map & routes</li>
                <li>• Earnings & performance metrics</li>
                <li>• Order pickup & delivery tracking</li>
                <li>• Real-time notifications</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to buy, sell, and deliver in our sustainable marketplace
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover-lift">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-eco-green to-eco-dark">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of users who are already saving money and reducing waste with ClearX
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-eco-green hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Join ClearX Today
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
