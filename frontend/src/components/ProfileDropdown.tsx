
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LayoutDashboard, Settings, LogOut } from 'lucide-react';

const ProfileDropdown = () => {
  const [userRole, setUserRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const role = localStorage.getItem('userRole');
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      
      console.log('ProfileDropdown - checking login status:', { role, loggedIn });
      
      if (role && loggedIn) {
        setUserRole(role);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUserRole('');
      }
    };

    // Check initial state
    checkLoginStatus();

    // Listen for storage changes (useful for multiple tabs)
    window.addEventListener('storage', checkLoginStatus);
    
    // Custom event listener for login/logout within the same tab
    window.addEventListener('loginStateChanged', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('loginStateChanged', checkLoginStatus);
    };
  }, []);

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'retailer': return 'Retailer';
      case 'agent': return 'Delivery Agent';
      case 'customer': return 'Customer';
      default: return 'User';
    }
  };

  const getRoleRoutes = (role: string) => {
    switch (role) {
      case 'retailer':
        return {
          dashboard: '/dashboard/retailer',
          profile: '/retailer-profile'
        };
      case 'agent':
        return {
          dashboard: '/dashboard/agent',
          profile: '/delivery-profile'
        };
      case 'customer':
        return {
          dashboard: '/dashboard/customer',
          profile: '/customer-profile'
        };
      default:
        return {
          dashboard: '/dashboard/customer',
          profile: '/customer-profile'
        };
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setUserRole('');
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('loginStateChanged'));
    
    navigate('/');
  };

  const getUserInitials = (role: string) => {
    switch (role) {
      case 'retailer': return 'R';
      case 'agent': return 'DA';
      case 'customer': return 'C';
      default: return 'U';
    }
  };

  if (!isLoggedIn) {
    console.log('ProfileDropdown - user not logged in, returning null');
    return null;
  }

  const routes = getRoleRoutes(userRole);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 focus:outline-none">
          <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-eco-green/20 hover:ring-eco-green/40 transition-all">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback className="bg-eco-green text-white text-sm font-medium">
              {getUserInitials(userRole)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white border shadow-lg z-50" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Welcome!</p>
            <p className="text-xs leading-none text-muted-foreground">
              Role: {getRoleDisplayName(userRole)}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={routes.profile} className="flex items-center cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>View Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={routes.dashboard} className="flex items-center cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings" className="flex items-center cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
