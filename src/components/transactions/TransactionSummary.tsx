
import { ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

interface TransactionSummaryProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

const TransactionSummary = ({ 
  totalIncome, 
  totalExpenses, 
  balance 
}: TransactionSummaryProps) => {
  return (
    <div className="bg-white rounded-xl shadow-soft border border-border/30 overflow-hidden mb-8">
      <div className="p-6">
        <FadeIn direction="up">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-medium">Your Financial Summary</h3>
              <p className="text-muted-foreground text-sm">Track your income and expenses</p>
            </div>
          </div>
        </FadeIn>
        
        <FadeIn direction="up" delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-muted-foreground">Total Income</h4>
                <div className="p-1.5 rounded-full bg-green-100">
                  <ArrowUpRight className="h-3.5 w-3.5 text-green-700" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-foreground">${totalIncome.toFixed(2)}</p>
            </div>
            
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-muted-foreground">Total Expenses</h4>
                <div className="p-1.5 rounded-full bg-red-100">
                  <ArrowDownRight className="h-3.5 w-3.5 text-red-700" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-foreground">${totalExpenses.toFixed(2)}</p>
            </div>
            
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-muted-foreground">Current Balance</h4>
                <div className="p-1.5 rounded-full bg-primary/20">
                  <Wallet className="h-3.5 w-3.5 text-primary" />
                </div>
              </div>
              <p className={`text-2xl font-semibold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(balance).toFixed(2)}
                <span className="text-sm font-normal ml-1">{balance >= 0 ? 'surplus' : 'deficit'}</span>
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default TransactionSummary;
