import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  gradient?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, title, className = '', gradient = false }) => {
  const bgStyle = gradient ? 'bg-[var(--gradient-surface)]' : 'bg-[var(--surface-color)]';

  return (
    <div className={`${bgStyle} rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] transition-all duration-250 p-5 border border-[var(--separator-color)] ${className}`}>
      {title && (
        <h3 className="text-[20px] font-semibold text-[var(--text-primary)] mb-4 pb-3 border-b border-[var(--separator-color)] leading-tight">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};
