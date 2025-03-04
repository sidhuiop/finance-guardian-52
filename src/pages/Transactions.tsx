
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import { Search, Filter, Plus, ArrowDown, ArrowUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TransactionCard, { Transaction } from '@/components/ui/TransactionCard';
import CategoryBadge from '@/components/ui/CategoryBadge';
import FadeIn from '@/components/animations/FadeIn';

// Mock data - expanded transactions list
const allTransactions: Transaction[] = [
  {
    id: '1',
    title: 'Salary Deposit',
    amount: 3200,
    type: 'income',
    category: 'Salary',
    date: 'May 01, 2023'
  },
  {
    id: '2',
    title: 'Grocery Shopping',
    amount: 156.32,
    type: 'expense',
    category: 'Shopping',
    date: 'May 03, 2023'
  },
  {
    id: '3',
    title: 'Coffee Shop',
    amount: 5.75,
    type: 'expense',
    category: 'Coffee',
    date: 'May 05, 2023'
  },
  {
    id: '4',
    title: 'Monthly Rent',
    amount: 1200,
    type: 'expense',
    category: 'Rent',
    date: 'May 05, 2023'
  },
  {
    id: '5',
    title: 'Freelance Payment',
    amount: 650,
    type: 'income',
    category: 'Salary',
    date: 'May 07, 2023'
  },
  {
    id: '6',
    title: 'Restaurant Dinner',
    amount: 86.50,
    type: 'expense',
    category: 'Food',
    date: 'May 08, 2023'
  },
  {
    id: '7',
    title: 'Subscription - Netflix',
    amount: 12.99,
    type: 'expense',
    category: 'Subscriptions',
    date: 'May 10, 2023'
  },
  {
    id: '8',
    title: 'Online Course',
    amount: 49.99,
    type: 'expense',
    category: 'Education',
    date: 'May 12, 2023'
  },
  {
    id: '9',
    title: 'Birthday Gift',
    amount: 35.00,
    type: 'expense',
    category: 'Gifts',
    date: 'May 15, 2023'
  },
];

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Filter transactions based on search and type filter
  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === null || transaction.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <>
      <Helmet>
        <title>Transactions | FinanceFlow</title>
        <meta name="description" content="View and manage all your income and expense transactions in one place." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-20 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <h1 className="text-3xl font-bold mb-4 sm:mb-0">Transactions</h1>
              
              <button className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-full shadow-soft hover:bg-primary/90 transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </button>
            </div>
            
            <FadeIn>
              <div className="bg-white rounded-xl shadow-soft border border-border/30 p-4 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedType(null)}
                      className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                        selectedType === null
                          ? 'bg-primary text-white border-primary'
                          : 'bg-secondary border-border/60 text-foreground hover:bg-secondary/70'
                      }`}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      All
                    </button>
                    
                    <button
                      onClick={() => setSelectedType('income')}
                      className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                        selectedType === 'income'
                          ? 'bg-green-500 text-white border-green-500'
                          : 'bg-secondary border-border/60 text-foreground hover:bg-secondary/70'
                      }`}
                    >
                      <ArrowUp className="h-4 w-4 mr-2" />
                      Income
                    </button>
                    
                    <button
                      onClick={() => setSelectedType('expense')}
                      className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                        selectedType === 'expense'
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-secondary border-border/60 text-foreground hover:bg-secondary/70'
                      }`}
                    >
                      <ArrowDown className="h-4 w-4 mr-2" />
                      Expense
                    </button>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <div className="space-y-4">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction, index) => (
                  <FadeIn key={transaction.id} direction="up" delay={index * 50}>
                    <TransactionCard transaction={transaction} />
                  </FadeIn>
                ))
              ) : (
                <FadeIn direction="up">
                  <div className="bg-white rounded-xl shadow-soft border border-border/30 p-8 text-center">
                    <p className="text-muted-foreground">No transactions found matching your criteria.</p>
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Transactions;
