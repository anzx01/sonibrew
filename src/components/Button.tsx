import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-[var(--radius-lg)] transition-all disabled:opacity-30 disabled:cursor-not-allowed relative overflow-hidden';

  const variantStyles = {
    primary: 'bg-[var(--primary-color)] text-white active:bg-[var(--primary-hover)] shadow-[var(--shadow-sm)]',
    secondary: 'bg-[var(--surface-color)] text-[var(--primary-color)] active:bg-[var(--surface-hover)] border border-[var(--separator-color)]',
    danger: 'bg-[var(--danger-color)] text-white active:opacity-80 shadow-[var(--shadow-sm)]',
    success: 'bg-[var(--success-color)] text-white active:opacity-80 shadow-[var(--shadow-sm)]',
    ghost: 'bg-transparent text-[var(--primary-color)] active:bg-[var(--primary-light)]',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-[15px] font-semibold',
    md: 'px-5 py-2.5 text-[17px] font-semibold',
    lg: 'px-6 py-3 text-[20px] font-semibold',
    xl: 'px-8 py-4 text-[22px] font-bold',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};
