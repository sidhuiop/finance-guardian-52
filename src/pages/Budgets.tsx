import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import { Home, ShoppingCart, Utensils, CreditCard, PiggyBank, Briefcase, Heart, Plane, Plus } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';
import AddBudgetDialog from '@/components/budgets/AddBudgetDialog';

type Budget = {
  id: string;
  name: string;
  icon: any;
  category: string;
  allocated: number;
  spent: number;
  color: string;
};

// Icon mapping for dynamic rendering
const iconMap: Record<string, any> = {
  'Home': Home,
  'ShoppingCart': ShoppingCart,
  'Utensils': Utensils,
  'CreditCard': CreditCard,
  'PiggyBank': PiggyBank,
  'Briefcase': Briefcase,
  'Heart': Heart,
  'Plane': Plane,
};

// Mock data
const initialBudgets: Budget[] = [
  {
    id: '1',
    name: 'Housing',
    icon: Home,
    category: 'Essentials',
    allocated: 1500,
    spent: 1200,
    color: 'bg-blue-500'
  },
  {
    id: '2',
    name: 'Groceries',
    icon: ShoppingCart,
    category: 'Essentials',
    allocated: 500,
    spent: 320,
    color: 'bg-green-500'
  },
  {
    id: '3',
    name: 'Dining Out',
    icon: Utensils,
    category: 'Lifestyle',
    allocated: 300,
    spent: 275,
    color: 'bg-amber-500'
  },
  {
    id: '4',
    name: 'Subscriptions',
    icon: CreditCard,
    category: 'Entertainment',
    allocated: 100,
    spent: 85,
    color: 'bg-red-500'
  },
  {
    id: '5',
    name: 'Savings',
    icon: PiggyBank,
    category: 'Financial Goals',
    allocated: 800,
    spent: 800,
    color: 'bg-purple-500'
  },
  {
    id: '6',
    name: 'Work Expenses',
    icon: Briefcase,
    category: 'Professional',
    allocated: 200,
    spent: 150,
    color: 'bg-gray-600'
  },
  {
    id: '7',
    name: 'Health & Wellness',
    icon: Heart,
    category: 'Lifestyle',
    allocated: 250,
    spent: 120,
    color: 'bg-pink-500'
  },
  {
    id: '8',
    name: 'Travel',
    icon: Plane,
    category: 'Leisure',
    allocated: 400,
    spent: 0,
    color: 'bg-cyan-500'
  }
];

const Budgets = () => {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  
  // Calculate totals
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.allocated, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalRemaining = totalBudget - totalSpent;
  const spentPercentage = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Add a new budget
  const handleAddBudget = (newBudget: Budget) => {
    setBudgets([...budgets, newBudget]);
  };

  return (
    <>
      <Helmet>
        <title>Budgets | FinanceFlow</title>
        <meta name="description" content="Set and manage your monthly budgets to keep your spending on track." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-20 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <h1 className="text-3xl font-bold mb-4 sm:mb-0">Monthly Budgets</h1>
              
              <AddBudgetDialog onAddBudget={handleAddBudget} />
            </div>
            
            <FadeIn>
              <div className="bg-white rounded-xl shadow-soft border border-border/30 p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-primary/10 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Budget</h3>
                    <p className="text-2xl font-semibold">${totalBudget.toFixed(2)}</p>
                  </div>
                  
                  <div className="bg-green-500/10 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Spent So Far</h3>
                    <p className="text-2xl font-semibold">${totalSpent.toFixed(2)}</p>
                  </div>
                  
                  <div className="bg-blue-500/10 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Remaining</h3>
                    <p className="text-2xl font-semibold">${totalRemaining.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="relative h-4 bg-secondary/50 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-primary rounded-full"
                      style={{ width: `${spentPercentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-muted-foreground">{spentPercentage}% spent</span>
                    <span className="text-sm text-muted-foreground">12 days left</span>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {budgets.map((budget, index) => {
                // Dynamic icon selection based on budget.icon value
                const Icon = iconMap[budget.icon as keyof typeof iconMap] || Home;
                const percentage = Math.round((budget.spent / budget.allocated) * 100);
                const isWarning = percentage >= 75 && percentage < 90;
                const isOverBudget = percentage >= 90;
                
                return (
                  <FadeIn key={budget.id} direction="up" delay={index * 50}>
                    <div className="bg-white rounded-xl shadow-soft border border-border/30 p-5 hover:shadow-medium transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className={`p-2.5 rounded-lg ${budget.color} bg-opacity-20 mr-3`}>
                            <Icon className={`h-5 w-5 ${budget.color.replace('bg-', 'text-')}`} />
                          </div>
                          <div>
                            <h3 className="font-medium text-lg leading-tight">{budget.name}</h3>
                            <p className="text-xs text-muted-foreground">{budget.category}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className={cn(
                        'text-2xl font-semibold mb-2',
                        isOverBudget ? 'text-red-600' : 'text-foreground'
                      )}>
                        ${budget.spent} <span className="text-muted-foreground text-sm font-normal">/ ${budget.allocated}</span>
                      </div>
                      
                      <div className="relative h-2 bg-secondary/50 rounded-full overflow-hidden mb-2">
                        <div 
                          className={cn(
                            'absolute top-0 left-0 h-full rounded-full',
                            isOverBudget 
                              ? 'bg-red-500' 
                              : (isWarning ? 'bg-amber-500' : budget.color)
                          )}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{percentage}% used</span>
                        <span className="text-xs text-muted-foreground">
                          ${budget.allocated - budget.spent} left
                        </span>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
              
              <FadeIn direction="up" delay={budgets.length * 50}>
                <div onClick={() => document.querySelector<HTMLButtonElement>('[data-dialog-trigger="add-budget"]')?.click()} className="bg-secondary/50 rounded-xl border border-dashed border-border/60 p-5 flex flex-col items-center justify-center min-h-[220px] hover:bg-secondary/70 transition-colors cursor-pointer">
                  <div className="p-3 rounded-full bg-primary/10 mb-3">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">Create New Budget</h3>
                  <p className="text-sm text-muted-foreground text-center">Add a new category to track your spending</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Budgets;
