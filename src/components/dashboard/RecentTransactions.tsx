
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TransactionCard, { Transaction } from '../ui/TransactionCard';
import FadeIn from '../animations/FadeIn';

// Mock data
const recentTransactions: Transaction[] = [
  {
    id: '1',
    title: 'Salary Deposit',
    amount: 3200,
    type: 'income',
    category: 'Salary',
    date: 'Today'
  },
  {
    id: '2',
    title: 'Grocery Shopping',
    amount: 156.32,
    type: 'expense',
    category: 'Shopping',
    date: 'Yesterday'
  },
  {
    id: '3',
    title: 'Coffee Shop',
    amount: 5.75,
    type: 'expense',
    category: 'Coffee',
    date: 'Yesterday'
  },
  {
    id: '4',
    title: 'Monthly Rent',
    amount: 1200,
    type: 'expense',
    category: 'Rent',
    date: '3 days ago'
  }
];

const RecentTransactions = () => {
  return (
    <div className="bg-white rounded-xl shadow-soft border border-border/30 overflow-hidden">
      <div className="p-6">
        <FadeIn direction="up">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-medium text-lg">Recent Transactions</h3>
              <p className="text-muted-foreground text-sm">Your latest financial activity</p>
            </div>
            <Link 
              to="/transactions" 
              className="group flex items-center text-sm font-medium text-primary hover:text-primary/90 transition-colors"
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </FadeIn>
        
        <div className="space-y-4">
          {recentTransactions.map((transaction, index) => (
            <FadeIn key={transaction.id} direction="up" delay={100 + index * 50}>
              <TransactionCard transaction={transaction} />
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
