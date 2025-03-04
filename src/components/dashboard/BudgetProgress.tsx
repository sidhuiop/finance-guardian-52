
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import FadeIn from '../animations/FadeIn';

type Budget = {
  id: string;
  name: string;
  category: string;
  allocated: number;
  spent: number;
};

// Mock data
const budgets: Budget[] = [
  {
    id: '1',
    name: 'Groceries',
    category: 'Food',
    allocated: 500,
    spent: 350
  },
  {
    id: '2',
    name: 'Entertainment',
    category: 'Leisure',
    allocated: 300,
    spent: 275
  },
  {
    id: '3',
    name: 'Transportation',
    category: 'Travel',
    allocated: 200,
    spent: 120
  }
];

const BudgetProgress = () => {
  return (
    <div className="bg-white rounded-xl shadow-soft border border-border/30 overflow-hidden">
      <div className="p-6">
        <FadeIn direction="up">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-medium text-lg">Budget Progress</h3>
              <p className="text-muted-foreground text-sm">Monthly budget tracking</p>
            </div>
            <Link 
              to="/budgets" 
              className="group flex items-center text-sm font-medium text-primary hover:text-primary/90 transition-colors"
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </FadeIn>
        
        <div className="space-y-5">
          {budgets.map((budget, index) => {
            const percentage = Math.round((budget.spent / budget.allocated) * 100);
            const isWarning = percentage >= 75 && percentage < 90;
            const isOverBudget = percentage >= 90;
            
            return (
              <FadeIn key={budget.id} direction="up" delay={100 + index * 50}>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <div>
                      <h4 className="font-medium">{budget.name}</h4>
                      <p className="text-xs text-muted-foreground">{budget.category}</p>
                    </div>
                    <div className={cn(
                      'text-sm font-medium',
                      isOverBudget ? 'text-red-600' : (isWarning ? 'text-amber-600' : 'text-primary')
                    )}>
                      ${budget.spent} / ${budget.allocated}
                    </div>
                  </div>
                  
                  <div className="relative h-2 bg-secondary/50 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        'absolute top-0 left-0 h-full rounded-full',
                        isOverBudget 
                          ? 'bg-red-500' 
                          : (isWarning ? 'bg-amber-500' : 'bg-primary')
                      )}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-muted-foreground">{percentage}% used</span>
                    <span className="text-xs text-muted-foreground">
                      ${budget.allocated - budget.spent} left
                    </span>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BudgetProgress;
