
import React from 'react';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'green' | 'blue' | 'purple' | 'orange';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: CardVariant;
};

const Card = ({ children, className, variant = 'default' }: CardProps) => {
  const variantClasses = {
    default: 'bg-white/80',
    green: 'bg-green-50/90 hover:bg-green-50/100 border-green-100',
    blue: 'bg-blue-50/90 hover:bg-blue-50/100 border-blue-100',
    purple: 'bg-purple-50/90 hover:bg-purple-50/100 border-purple-100',
    orange: 'bg-orange-50/90 hover:bg-orange-50/100 border-orange-100'
  };

  return (
    <div 
      className={cn(
        "glass-morphism p-6 md:p-8 rounded-2xl transition-all duration-300",
        "transform hover:translate-y-[-2px] hover:shadow-lg",
        "animate-enter border-2",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
