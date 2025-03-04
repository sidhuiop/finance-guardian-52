
import { ArrowDownIcon, ArrowUpIcon, ShoppingCart, Coffee, Home, Utensils, CreditCard, GraduationCap, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import CategoryBadge from './CategoryBadge';

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
};

const categoryIcons = {
  'Salary': DollarSign,
  'Shopping': ShoppingCart,
  'Food': Utensils,
  'Coffee': Coffee,
  'Rent': Home,
  'Subscriptions': CreditCard,
  'Education': GraduationCap,
  'Gifts': Gift,
};

import { DollarSign } from 'lucide-react';

const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
  const isExpense = transaction.type === 'expense';
  
  // Dynamically get the icon based on the category, default to DollarSign
  const CategoryIcon = 
    categoryIcons[transaction.category as keyof typeof categoryIcons] || DollarSign;

  return (
    <div className="bg-white rounded-xl p-4 shadow-soft border border-border/30 hover:shadow-medium transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={cn(
            'p-2 rounded-full',
            isExpense ? 'bg-red-100' : 'bg-green-100'
          )}>
            {isExpense ? (
              <ArrowDownIcon className="h-4 w-4 text-red-700" />
            ) : (
              <ArrowUpIcon className="h-4 w-4 text-green-700" />
            )}
          </div>
          
          <div>
            <p className="font-medium">{transaction.title}</p>
            <div className="flex items-center space-x-2 mt-1">
              <CategoryBadge variant={isExpense ? 'expense' : 'income'}>
                <CategoryIcon className="h-3 w-3 mr-1" />
                {transaction.category}
              </CategoryBadge>
              <span className="text-xs text-muted-foreground">{transaction.date}</span>
            </div>
          </div>
        </div>
        
        <div className={cn(
          'font-medium',
          isExpense ? 'text-red-600' : 'text-green-600'
        )}>
          {isExpense ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
