import { ReactNode } from 'react';

interface BubbleCardProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function BubbleCard({ children, className = '', size = 'md' }: BubbleCardProps) {
  const sizeClasses = {
    sm: 'bubble-sm',
    md: 'bubble-container',
    lg: 'bubble-container p-8',
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
}
