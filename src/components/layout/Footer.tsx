
import { Link } from 'react-router-dom';
import { DollarSign, Github, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border/50 py-12 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <DollarSign className="h-6 w-6 text-primary" />
              <span className="text-lg font-display font-semibold">FinanceFlow</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Take control of your finances with intuitive tracking, budgeting, and goal setting.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/transactions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Transactions
                </Link>
              </li>
              <li>
                <Link to="/budgets" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Budgets
                </Link>
              </li>
              <li>
                <Link to="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Reports
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Contact Us</h3>
            <div className="space-y-2">
              <a 
                href="mailto:contact@financeflow.com" 
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                contact@financeflow.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} FinanceFlow. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
