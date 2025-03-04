
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart2, Home, DollarSign, PieChart, Settings, User, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Define navigation links based on authentication status
  const navLinks = [
    { name: 'Home', path: '/', icon: Home, requiresAuth: false },
    { name: 'Dashboard', path: '/dashboard', icon: BarChart2, requiresAuth: true },
    { name: 'Transactions', path: '/transactions', icon: DollarSign, requiresAuth: true },
    { name: 'Budgets', path: '/budgets', icon: PieChart, requiresAuth: true },
  ];

  // Filter links based on auth status
  const filteredNavLinks = navLinks.filter(link => 
    !link.requiresAuth || (link.requiresAuth && isAuthenticated)
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/80 backdrop-blur-lg shadow-soft' : 'bg-transparent',
        location.pathname !== '/' && 'bg-white/80 backdrop-blur-lg shadow-soft'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-primary" />
              <span className="text-xl font-display font-semibold">FinanceFlow</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {filteredNavLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={cn(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:bg-secondary',
                    isActive(link.path) 
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/80 hover:text-foreground'
                  )}
                >
                  <Icon className="mr-1.5 h-4 w-4" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* User options */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile"
                  className={cn(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:bg-secondary',
                    isActive('/profile') 
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/80 hover:text-foreground'
                  )}
                >
                  <User className="mr-1.5 h-4 w-4" />
                  {user?.name}
                </Link>
              </div>
            ) : (
              <>
                <Link to="/signin" className="text-sm font-medium hover:text-primary transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="px-4 py-1.5 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen bg-white/90 backdrop-blur-md shadow-md' : 'max-h-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2">
          {filteredNavLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors',
                  isActive(link.path)
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground/80 hover:bg-secondary'
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                {link.name}
              </Link>
            );
          })}
          
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className={cn(
                  'flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors',
                  isActive('/profile')
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground/80 hover:bg-secondary'
                )}
              >
                <User className="mr-3 h-5 w-5" />
                Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center px-4 py-3 text-base font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogIn className="mr-3 h-5 w-5" />
                Sign Out
              </button>
            </>
          ) : (
            <div className="pt-4 space-y-2">
              <Link to="/signin" className="flex items-center px-4 py-3 text-base font-medium rounded-lg hover:bg-secondary transition-colors">
                <LogIn className="mr-3 h-5 w-5" />
                Sign In
              </Link>
              <Link to="/signup" className="w-full block px-4 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors text-center text-base font-medium">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
