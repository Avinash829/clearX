
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const userRole = localStorage.getItem('userRole');
      
      // Auto-login logic for dashboard, buy-now, and payment pages
      const protectedPaths = ['/dashboard/', '/buy-now/', '/payment', '/retailer-profile', '/customer-profile', '/delivery-profile', '/settings'];
      const isOnProtectedPage = protectedPaths.some(path => location.pathname.startsWith(path));
      
      if (isOnProtectedPage && (!loggedIn || !userRole)) {
        // Auto-login for demo purposes - detect role from URL
        let detectedRole = 'customer'; // default
        if (location.pathname.includes('retailer')) {
          detectedRole = 'retailer';
        } else if (location.pathname.includes('agent') || location.pathname.includes('delivery')) {
          detectedRole = 'agent';
        }
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', detectedRole);
        setIsLoggedIn(true);
        
        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event('loginStateChanged'));
      } else {
        console.log('Navbar - checking login status:', loggedIn);
        setIsLoggedIn(loggedIn);
      }
    };

    // Check initial state
    checkLoginStatus();

    // Listen for storage changes and custom events
    window.addEventListener('storage', checkLoginStatus);
    window.addEventListener('loginStateChanged', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('loginStateChanged', checkLoginStatus);
    };
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-eco-light/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-eco-green to-eco-dark rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-eco-dark">ClearX</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-eco-green ${
                isActive('/') ? 'text-eco-green' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/how-it-works" 
              className={`text-sm font-medium transition-colors hover:text-eco-green ${
                isActive('/how-it-works') ? 'text-eco-green' : 'text-gray-700'
              }`}
            >
              How It Works
            </Link>
            
            {/* <Link 
              to="/pricing" 
              className={`text-sm font-medium transition-colors hover:text-eco-green ${
                isActive('/pricing') ? 'text-eco-green' : 'text-gray-700'
              }`}
            >
              Pricing
            </Link> */}
            
            {/* Conditional rendering based on login state */}
            {isLoggedIn ? (
              <ProfileDropdown />
            ) : (
              <>
                <Link to="/role-selection">
                  <Button variant="outline" className="text-sm font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-eco-green hover:bg-eco-dark text-white">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-eco-green focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-eco-light/20">
              <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-eco-green">
                Home
              </Link>
              <Link to="/how-it-works" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-eco-green">
                How It Works
              </Link>
              <Link to="/pricing" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-eco-green">
                Pricing
              </Link>
              
              {/* Mobile conditional rendering */}
              {isLoggedIn ? (
                <div className="px-3 py-2">
                  <ProfileDropdown />
                </div>
              ) : (
                <>
                  <Link to="/role-selection" className="block px-3 py-2">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup" className="block px-3 py-2">
                    <Button className="w-full bg-eco-green hover:bg-eco-dark text-white">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
