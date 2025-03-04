
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import FadeIn from '../animations/FadeIn';

const FinancialOverview = () => {
  // Mock data
  const overviewData = {
    totalBalance: 4750.86,
    income: 3200.00,
    expenses: 1850.42,
    savings: 1349.58,
    changePercent: 12.3,
  };
  
  const isPositiveChange = overviewData.changePercent > 0;

  return (
    <div className="bg-white rounded-xl shadow-soft border border-border/30 overflow-hidden">
      <div className="p-6">
        <FadeIn direction="up">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Balance</h3>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">${overviewData.totalBalance.toFixed(2)}</span>
                <div 
                  className={cn(
                    "flex items-center ml-3 px-2 py-0.5 rounded-full text-xs font-medium",
                    isPositiveChange 
                      ? "text-green-800 bg-green-100" 
                      : "text-red-800 bg-red-100"
                  )}
                >
                  {isPositiveChange ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(overviewData.changePercent)}%
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="text-xs font-medium text-muted-foreground px-3 py-1 rounded-full bg-secondary hover:bg-secondary/70 transition-colors">
                Week
              </button>
              <button className="text-xs font-medium text-white px-3 py-1 rounded-full bg-primary hover:bg-primary/90 transition-colors">
                Month
              </button>
              <button className="text-xs font-medium text-muted-foreground px-3 py-1 rounded-full bg-secondary hover:bg-secondary/70 transition-colors">
                Year
              </button>
            </div>
          </div>
        </FadeIn>
        
        <FadeIn direction="up" delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-muted-foreground">Income</h4>
                <div className="p-1.5 rounded-full bg-green-100">
                  <ArrowUpRight className="h-3.5 w-3.5 text-green-700" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-foreground">${overviewData.income.toFixed(2)}</p>
            </div>
            
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-muted-foreground">Expenses</h4>
                <div className="p-1.5 rounded-full bg-red-100">
                  <ArrowDownRight className="h-3.5 w-3.5 text-red-700" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-foreground">${overviewData.expenses.toFixed(2)}</p>
            </div>
            
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-muted-foreground">Savings</h4>
                <div className="p-1.5 rounded-full bg-primary/20">
                  <TrendingUp className="h-3.5 w-3.5 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-foreground">${overviewData.savings.toFixed(2)}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default FinancialOverview;
