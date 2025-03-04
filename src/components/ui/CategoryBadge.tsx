
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CategoryBadgeProps = {
  children: ReactNode;
  variant?: 'default' | 'income' | 'expense' | 'transfer' | 'investment';
  className?: string;
};

const variantClassMap = {
  default: 'bg-secondary text-foreground',
  income: 'bg-green-100 text-green-800',
  expense: 'bg-red-100 text-red-800',
  transfer: 'bg-blue-100 text-blue-800',
  investment: 'bg-purple-100 text-purple-800',
};

const CategoryBadge = ({ 
  children, 
  variant = 'default',
  className 
}: CategoryBadgeProps) => {
  return (
    <span 
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClassMap[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export default CategoryBadge;
