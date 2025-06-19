
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/Layout';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Basic',
      monthlyPrice: 0,
      annualPrice: 0,
      description: 'Perfect for small retailers getting started',
      features: [
        'Up to 50 products',
        '18% commission on sales',
        'Basic analytics',
        'Email support',
        'Mobile app access'
      ],
      limitations: [
        'Limited to 50 active listings',
        'Standard commission rate',
        'Basic reporting only'
      ],
      popular: false
    },
    {
      name: 'Professional',
      monthlyPrice: 350,
      annualPrice: 3500, // 2 months free
      description: 'Ideal for growing businesses',
      features: [
        'Unlimited products',
        '15% commission on sales',
        'Advanced analytics',
        'Priority support',
        'Inventory management tools',
        'Bulk upload features',
        'Custom discount settings'
      ],
      limitations: [],
      popular: true
    },
    {
      name: 'Enterprise',
      monthlyPrice: 600,
      annualPrice: 6000, // 2 months free
      description: 'For large retailers with complex needs',
      features: [
        'Everything in Professional',
        '12% commission on sales',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
        'White-label options',
        'Advanced reporting & insights',
        '24/7 phone support'
      ],
      limitations: [],
      popular: false
    }
  ];

  const comparisonFeatures = [
    { feature: 'Product Listings', basic: '50', professional: 'Unlimited', enterprise: 'Unlimited' },
    { feature: 'Commission Rate', basic: '18%', professional: '15%', enterprise: '12%' },
    { feature: 'Analytics', basic: 'Basic', professional: 'Advanced', enterprise: 'Enterprise' },
    { feature: 'Support', basic: 'Email', professional: 'Priority', enterprise: '24/7 Phone' },
    { feature: 'API Access', basic: '✗', professional: '✗', enterprise: '✓' },
    { feature: 'Account Manager', basic: '✗', professional: '✗', enterprise: '✓' },
    { feature: 'Custom Integrations', basic: '✗', professional: 'Limited', enterprise: 'Full' },
    { feature: 'White-label', basic: '✗', professional: '✗', enterprise: '✓' }
  ];

  const faqs = [
    {
      question: "How does the commission structure work?",
      answer: "Commission is charged only on successful sales. We deduct our percentage from the total sale amount before transferring payment to your account."
    },
    {
      question: "Can I change my plan anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated."
    },
    {
      question: "Is there a setup fee?",
      answer: "No setup fees! You only pay the monthly subscription and commission on sales. The Basic plan is completely free to start."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI, and bank transfers. Payments are processed securely through our trusted payment partners."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll refund your subscription fee."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-eco-lightest via-white to-eco-lightest py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the plan that fits your business needs. Start free and scale as you grow.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-eco-green' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-eco-green' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-eco-green' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-eco-green text-white text-xs px-2 py-1 rounded-full">
                Save 2 months!
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative hover-lift ${plan.popular ? 'ring-2 ring-eco-green' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-eco-green text-white text-sm font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-eco-green">
                    ₹{isAnnual ? Math.floor(plan.annualPrice / 12) : plan.monthlyPrice}
                    <span className="text-sm text-gray-500 font-normal">/month</span>
                  </div>
                  {isAnnual && plan.annualPrice > 0 && (
                    <div className="text-sm text-gray-500">
                      Billed annually (₹{plan.annualPrice})
                    </div>
                  )}
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-eco-green mr-2 flex-shrink-0">✓</span>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.popular ? 'bg-eco-green hover:bg-eco-dark' : ''}`}>
                    {plan.monthlyPrice === 0 ? 'Get Started Free' : 'Choose Plan'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare Plans</h2>
            <p className="text-gray-600">See all features across our pricing tiers</p>
          </div>

          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Features</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Basic</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Professional</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comparisonFeatures.map((row, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.feature}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-center">{row.basic}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-center">{row.professional}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-center">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Money Back Guarantee */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-eco-lightest rounded-2xl p-8">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">30-Day Money Back Guarantee</h3>
            <p className="text-gray-600">
              Try ClearX risk-free. If you're not completely satisfied with our service 
              within the first 30 days, we'll refund your subscription fee—no questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Sales Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need a Custom Solution?</h2>
            <p className="text-gray-600">
              Get in touch with our sales team for enterprise pricing and custom features
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Contact Sales</CardTitle>
              <CardDescription>
                Tell us about your business and we'll create a custom plan for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <Input placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <Input placeholder="+91 9876543210" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <Textarea 
                    placeholder="Tell us about your business and requirements..."
                    rows={4}
                  />
                </div>
                <Button className="w-full bg-eco-green hover:bg-eco-dark">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Common questions about our pricing and plans</p>
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
    </Layout>
  );
};

export default Pricing;
