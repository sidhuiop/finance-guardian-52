
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  once?: boolean;
};

const FadeIn = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 500,
  once = true,
}: FadeInProps) => {
  // Map direction to animation class
  const getAnimationClass = () => {
    switch (direction) {
      case 'up':
        return 'animate-fade-in';
      case 'down':
        return 'animate-fade-in';
      case 'left':
        return 'animate-slide-in-right';
      case 'right':
        return 'animate-slide-in-left';
      case 'none':
        return 'animate-scale-in';
      default:
        return 'animate-fade-in';
    }
  };

  return (
    <div
      className={cn(
        'opacity-0',
        getAnimationClass(),
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
