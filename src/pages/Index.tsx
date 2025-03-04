
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>FinanceFlow | Personal Finance Assistant</title>
        <meta name="description" content="Take control of your finances with FinanceFlow - track expenses, set budgets, and achieve your financial goals with ease." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Hero />
          <Features />
          
          {!isAuthenticated && (
            <section className="py-16 bg-secondary/50">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to take control of your finances?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Create your account today and start your journey to financial freedom.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/signin" className="px-6 py-3 rounded-full border-2 border-primary text-primary font-medium hover:bg-primary/10 transition-colors">
                    Sign In
                  </Link>
                  <Link to="/signup" className="px-6 py-3 rounded-full bg-primary border-2 border-primary text-white font-medium hover:bg-primary/90 transition-colors">
                    Create Free Account
                  </Link>
                </div>
              </div>
            </section>
          )}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
