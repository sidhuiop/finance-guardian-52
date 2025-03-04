
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';

const Index = () => {
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
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
