
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FinancialOverview from '@/components/dashboard/FinancialOverview';
import IncomeExpenseChart from '@/components/dashboard/IncomeExpenseChart';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import BudgetProgress from '@/components/dashboard/BudgetProgress';

const Dashboard = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard | FinanceFlow</title>
        <meta name="description" content="View your financial overview, track recent transactions, and monitor your budget progress." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-20 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            
            <div className="grid grid-cols-1 gap-8">
              <FinancialOverview />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <IncomeExpenseChart />
                <BudgetProgress />
              </div>
              
              <RecentTransactions />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
