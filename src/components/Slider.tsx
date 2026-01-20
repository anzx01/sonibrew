import React from 'react';
import { logger } from '../utils/logger';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  showValue = true,
  disabled = false,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    logger.log('Slider handleChange被触发，新值:', newValue, 'label:', label);
    onChange(newValue);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {label && (
        <div className="flex justify-between items-center">
          <label className="text-[15px] font-medium" style={{
            background: 'linear-gradient(90deg, #A78BFA 0%, #EC4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 1px 2px rgba(167, 139, 250, 0.3))'
          }}>
            {label}
          </label>
          {showValue && (
            <span className="text-[17px] font-semibold px-3 py-1.5 rounded-lg" style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
              color: '#FFFFFF',
              boxShadow: `
                0 4px 12px rgba(139, 92, 246, 0.4),
                0 2px 6px rgba(139, 92, 246, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                inset 0 -1px 0 rgba(0, 0, 0, 0.3)
              `,
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
            }}>
              {value}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-1.5 rounded-full -translate-y-1/2 overflow-hidden" style={{
          background: 'linear-gradient(90deg, #374151 0%, #1F2937 100%)',
          boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.5)'
        }}>
          <div
            className="h-full transition-all duration-200"
            style={{
              width: `${percentage}%`,
              background: 'linear-gradient(90deg, #10B981 0%, #14B8A6 50%, #06B6D4 100%)',
              boxShadow: `
                0 0 12px rgba(16, 185, 129, 0.6),
                0 0 6px rgba(16, 185, 129, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `
            }}
          />
        </div>
        <input
          type="range"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className="relative w-full h-2 appearance-none bg-transparent cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:duration-200 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:h-7
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:transition-all
            [&::-moz-range-thumb]:duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            ['--thumb-bg' as any]: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
          }}
        />
        <style>{`
          input[type="range"]::-webkit-slider-thumb {
            background: linear-gradient(135deg, #10B981 0%, #06B6D4 100%);
            box-shadow:
              0 4px 16px rgba(16, 185, 129, 0.6),
              0 2px 8px rgba(16, 185, 129, 0.5),
              0 0 0 2px rgba(255, 255, 255, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.3),
              inset 0 -2px 0 rgba(0, 0, 0, 0.3);
          }
          input[type="range"]::-moz-range-thumb {
            background: linear-gradient(135deg, #10B981 0%, #06B6D4 100%);
            box-shadow:
              0 4px 16px rgba(16, 185, 129, 0.6),
              0 2px 8px rgba(16, 185, 129, 0.5),
              0 0 0 2px rgba(255, 255, 255, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.3),
              inset 0 -2px 0 rgba(0, 0, 0, 0.3);
          }
          input[type="range"]:hover::-webkit-slider-thumb {
            transform: scale(1.15);
            box-shadow:
              0 6px 20px rgba(16, 185, 129, 0.7),
              0 3px 10px rgba(16, 185, 129, 0.6),
              0 0 0 3px rgba(255, 255, 255, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.4),
              inset 0 -2px 0 rgba(0, 0, 0, 0.3);
          }
          input[type="range"]:hover::-moz-range-thumb {
            transform: scale(1.15);
            box-shadow:
              0 6px 20px rgba(16, 185, 129, 0.7),
              0 3px 10px rgba(16, 185, 129, 0.6),
              0 0 0 3px rgba(255, 255, 255, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.4),
              inset 0 -2px 0 rgba(0, 0, 0, 0.3);
          }
        `}</style>
      </div>
    </div>
  );
};
