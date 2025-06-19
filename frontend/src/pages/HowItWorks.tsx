
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('retailer');

  const workflows = {
    retailer: [
      { step: 1, title: 'Sign Up', description: 'Create your retailer account and verify your business' },
      { step: 2, title: 'List Inventory', description: 'Add products with details, photos, and expiry dates' },
      { step: 3, title: 'Set Discounts', description: 'Our AI suggests optimal pricing for quick sales' },
      { step: 4, title: 'Receive Orders', description: 'Get instant notifications when customers place orders' },
      { step: 5, title: 'Get Paid', description: 'Receive payments directly to your account after delivery' }
    ],
    customer: [
      { step: 1, title: 'Browse Products', description: 'Search for discounted items near you using smart filters' },
      { step: 2, title: 'Add to Cart', description: 'Select products and add them to your shopping cart' },
      { step: 3, title: 'Checkout', description: 'Choose delivery time and complete secure payment' },
      { step: 4, title: 'Track Order', description: 'Follow your order in real-time with live updates' },
      { step: 5, title: 'Confirm & Rate', description: 'Confirm delivery and rate your experience' }
    ],
    agent: [
      { step: 1, title: 'Sign Up', description: 'Register as a delivery agent and verify your documents' },
      { step: 2, title: 'Accept Orders', description: 'Choose delivery requests that fit your schedule' },
      { step: 3, title: 'Pickup Items', description: 'Collect products from retailers using the app' },
      { step: 4, title: 'Optimized Route', description: 'Follow AI-generated routes for efficient delivery' },
      { step: 5, title: 'Complete Delivery', description: 'Deliver to customers and earn instant payment' }
    ]
  };

  const faqs = [
    {
      question: "How does ClearX help reduce food waste?",
      answer: "ClearX connects retailers with customers to sell near-expiry products at discounted prices, preventing perfectly good food from going to landfills."
    },
    {
      question: "What types of products are available?",
      answer: "We offer fresh produce, bakery items, dairy products, packaged foods, and even non-food items like clothing and electronics that are close to expiry or need quick clearance."
    },
    {
      question: "How do you ensure food safety?",
      answer: "All products are still within their safe consumption window. We clearly display expiry dates and only allow items that are safe for consumption."
    },
    {
      question: "What are the delivery fees?",
      answer: "Delivery fees vary by distance and order size. Many orders qualify for free delivery, and you'll see the exact cost before checkout."
    },
    {
      question: "How do delivery agents earn money?",
      answer: "Agents earn money per delivery based on distance and complexity. They can work flexible hours and receive instant payments after successful deliveries."
    },
    {
      question: "What happens if I'm not satisfied with my order?",
      answer: "We have a customer satisfaction guarantee. If you're not happy with your order, contact our support team for a refund or replacement."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-eco-lightest via-white to-eco-lightest py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How ClearX Works
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Our three-way ecosystem connects retailers, customers, and delivery agents 
            to create a sustainable marketplace that reduces waste and saves money.
          </p>
        </div>
      </section>

      {/* Ecosystem Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The ClearX Ecosystem</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how our platform brings together all stakeholders for maximum impact
            </p>
          </div>
          
          {/* Process Flow Diagram */}
          <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto">
                🏪
              </div>
              <h3 className="font-semibold text-gray-900">Retailers</h3>
              <p className="text-sm text-gray-600">List excess inventory</p>
            </div>
            
            <div className="hidden lg:block">
              <div className="text-eco-green text-2xl">→</div>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto">
                📱
              </div>
              <h3 className="font-semibold text-gray-900">ClearX Platform</h3>
              <p className="text-sm text-gray-600">Smart matching & pricing</p>
            </div>
            
            <div className="hidden lg:block">
              <div className="text-eco-green text-2xl">→</div>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto">
                🛒
              </div>
              <h3 className="font-semibold text-gray-900">Customers</h3>
              <p className="text-sm text-gray-600">Purchase discounted items</p>
            </div>
            
            <div className="hidden lg:block">
              <div className="text-eco-green text-2xl">→</div>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto">
                🚴‍♂️
              </div>
              <h3 className="font-semibold text-gray-900">Delivery Agents</h3>
              <p className="text-sm text-gray-600">Efficient delivery service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Tabs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Step-by-Step Process</h2>
            <p className="text-gray-600">Choose a role to see how ClearX works for them</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-white rounded-lg p-1 shadow-sm">
              {Object.keys(workflows).map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveTab(role)}
                  className={`px-6 py-3 rounded-md font-medium transition-colors ${
                    activeTab === role
                      ? 'bg-eco-green text-white'
                      : 'text-gray-600 hover:text-eco-green'
                  }`}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Workflow Steps */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {workflows[activeTab as keyof typeof workflows].map((step, index) => (
              <Card key={index} className="text-center hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 bg-eco-green text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-2">
                    {step.step}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Everything you need to know about ClearX</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-16 bg-eco-green">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join our community and start making a positive impact today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-eco-green hover:bg-gray-100">
                Join as Retailer
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-eco-green">
                Join as Customer
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-eco-green">
                Join as Agent
              </Button>
            </Link>
          </div>
        </div>
      </section> */}
    </Layout>
  );
};

export default HowItWorks;
