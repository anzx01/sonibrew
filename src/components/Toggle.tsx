import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`
        relative w-16 h-8 rounded-full transition-all duration-300 shadow-md
        ${checked
          ? 'bg-gradient-to-r from-[var(--primary-color)] to-[#667eea]'
          : 'bg-[var(--border-color)]'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'}
      `}
      aria-pressed={checked}
      role="switch"
    >
      <div
        className={`
          absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300
          ${checked ? 'translate-x-9' : 'translate-x-1'}
          ${checked ? 'shadow-[var(--shadow-primary)]' : ''}
        `}
      />
      {label && (
        <span className="sr-only">{label}</span>
      )}
    </button>
  );
};
