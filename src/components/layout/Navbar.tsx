
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart2, Home, DollarSign, PieChart, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
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

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: BarChart2 },
    { name: 'Transactions', path: '/transactions', icon: DollarSign },
    { name: 'Budgets', path: '/budgets', icon: PieChart },
  ];

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
            {navLinks.map((link) => {
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

          {/* User options - placeholder */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-1.5 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-medium">
              Sign In
            </button>
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
          {navLinks.map((link) => {
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
          <div className="pt-4">
            <button className="w-full px-4 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors text-base font-medium">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
