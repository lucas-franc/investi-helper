
import React from 'react';
import { cn } from '@/lib/utils';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  return (
    <div 
      className={cn(
        "glass-morphism p-6 md:p-8 rounded-2xl transition-all duration-300",
        "transform hover:translate-y-[-2px] hover:shadow-lg",
        "animate-enter",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
