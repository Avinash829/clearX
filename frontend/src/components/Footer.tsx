
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-eco-green to-eco-dark rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold">ClearX</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Reducing waste by connecting customers with near-expiry and clearance items from retailers. 
              Shop smart, save the planet.
            </p>
            <div className="text-sm text-gray-400">
              <p>📍 123 Green Street, Eco City, India 110001</p>
              <p>📞 +91 9876543210</p>
              <p>✉️ hello@clearx.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/how-it-works" className="hover:text-eco-light transition-colors">How It Works</Link></li>
              <li><Link to="/pricing" className="hover:text-eco-light transition-colors">Pricing</Link></li>
              <li><Link to="/signup" className="hover:text-eco-light transition-colors">Sign Up</Link></li>
              <li><Link to="/login" className="hover:text-eco-light transition-colors">Login</Link></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-eco-light transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-eco-light transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-eco-light transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-eco-light transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* App Store Links & Newsletter */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">
                📱 App Store
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">
                🤖 Google Play
              </a>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Follow us:</span>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-400 hover:text-eco-light transition-colors">📘</a>
                <a href="#" className="text-gray-400 hover:text-eco-light transition-colors">🐦</a>
                <a href="#" className="text-gray-400 hover:text-eco-light transition-colors">📷</a>
                <a href="#" className="text-gray-400 hover:text-eco-light transition-colors">💼</a>
              </div>
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 mb-2">Subscribe to our newsletter for sustainability tips and updates</p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
              />
              <button className="w-full sm:w-auto px-6 py-2 bg-eco-green hover:bg-eco-dark text-white rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; 2024 ClearX. All rights reserved. Made with 💚 for a sustainable future.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
