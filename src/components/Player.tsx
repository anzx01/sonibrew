import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoPlay, IoStop, IoMusicalNotes } from 'react-icons/io5';
import { Slider } from './ui/slider';
import { MIN_BPM, MAX_BPM } from '../constants';
import { logger } from '../utils/logger';

interface PlayerProps {
  bpm: number;
  isPlaying: boolean;
  currentCount: number;
  elapsedTime: number;
  remainingTime?: number;
  enableCount: boolean;
  countMax: number;
  onStart: () => void;
  onStop: () => void;
  onBpmChange: (bpm: number) => void;
}

export const Player: React.FC<PlayerProps> = ({
  bpm,
  isPlaying,
  currentCount,
  elapsedTime,
  remainingTime,
  enableCount,
  countMax,
  onStart,
  onStop,
  onBpmChange,
}) => {
  const { t } = useTranslation();

  logger.log('Player组件渲染，bpm:', bpm, 'isPlaying:', isPlaying);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-6">
      {/* BPM Section - Colorful with 3D depth */}
      <div className="w-full p-4 rounded-2xl" style={{
        background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)',
        boxShadow: `
          0 4px 6px rgba(0, 0, 0, 0.4),
          0 8px 16px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.1),
          inset 0 -1px 0 rgba(0, 0, 0, 0.5)
        `,
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div className="text-center mb-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <IoMusicalNotes className="text-2xl" style={{
              color: '#A78BFA',
              filter: 'drop-shadow(0 2px 4px rgba(167, 139, 250, 0.5))'
            }} />
            <p className="text-xs uppercase tracking-wider font-semibold" style={{
              background: 'linear-gradient(135deg, #A78BFA 0%, #EC4899 50%, #F59E0B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 4px rgba(167, 139, 250, 0.3))'
            }}>
              {t('currentBpm')}
            </p>
          </div>
          <p className="text-5xl font-bold" style={{
            background: 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 50%, #EC4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 4px 8px rgba(139, 92, 246, 0.4))'
          }}>
            {bpm || 0}
          </p>
        </div>
        <Slider
          value={[bpm]}
          onValueChange={(values) => {
            const newValue = values[0];
            logger.log('Player Slider onChange 被调用，新值:', newValue);
            onBpmChange(newValue);
          }}
          min={MIN_BPM}
          max={MAX_BPM}
          step={1}
        />
      </div>

      {/* Large Time Display - Colorful Gradient with 3D depth */}
      <div className="text-center p-6 rounded-2xl" style={{
        background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)',
        boxShadow: `
          0 8px 16px rgba(0, 0, 0, 0.5),
          0 16px 32px rgba(0, 0, 0, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.1),
          inset 0 -1px 0 rgba(0, 0, 0, 0.5)
        `,
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <p className="text-[7rem] font-bold tracking-tight leading-none font-mono" style={{
          background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 25%, #EC4899 50%, #F59E0B 75%, #10B981 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 8px 16px rgba(139, 92, 246, 0.5))'
        }}>
          {formatTime(elapsedTime)}
        </p>
        {remainingTime !== undefined && (
          <p className="text-xl mt-3 font-mono" style={{
            background: 'linear-gradient(90deg, #60A5FA 0%, #A78BFA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 4px rgba(96, 165, 250, 0.4))'
          }}>
            {t('remainingTime')}: {formatTime(remainingTime)}
          </p>
        )}
      </div>

      {/* Control Button - Start/Stop (Dynamic Gradient with 3D) */}
      <div className="flex justify-center items-center w-full -mt-4">
        <button
          onClick={() => {
            if (isPlaying) {
              onStop();
            } else {
              onStart();
            }
          }}
          className="w-48 h-14 rounded-full flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95 relative overflow-hidden group"
          style={{
            background: isPlaying
              ? 'linear-gradient(135deg, #EF4444 0%, #F97316 50%, #F59E0B 100%)'
              : 'linear-gradient(135deg, #10B981 0%, #14B8A6 50%, #06B6D4 100%)',
            boxShadow: isPlaying
              ? `
                0 8px 32px rgba(239, 68, 68, 0.6),
                0 4px 16px rgba(239, 68, 68, 0.5),
                0 0 0 1px rgba(255, 255, 255, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                inset 0 -2px 0 rgba(0, 0, 0, 0.3)
              `
              : `
                0 8px 32px rgba(16, 185, 129, 0.6),
                0 4px 16px rgba(16, 185, 129, 0.5),
                0 0 0 1px rgba(255, 255, 255, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                inset 0 -2px 0 rgba(0, 0, 0, 0.3)
              `,
          }}
        >
          {/* Animated pulse effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
            }}
          />
          {isPlaying ? (
            <IoStop className="text-2xl text-white relative z-10" style={{
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
            }} />
          ) : (
            <IoPlay className="text-2xl text-white relative z-10" style={{
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
            }} />
          )}
          <span className="text-white text-base font-semibold relative z-10" style={{
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            {isPlaying ? t('stop') : t('start')}
          </span>
        </button>
      </div>

      {/* Count Display - Colorful with 3D depth */}
      {enableCount && (
        <div className="w-full p-4 rounded-2xl" style={{
          background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)',
          boxShadow: `
            0 4px 6px rgba(0, 0, 0, 0.4),
            0 8px 16px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.5)
          `,
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <p className="text-xs uppercase tracking-wider mb-3 text-center font-semibold" style={{
            background: 'linear-gradient(90deg, #F59E0B 0%, #EC4899 50%, #8B5CF6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 4px rgba(245, 158, 11, 0.3))'
          }}>
            {t('count')}
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            {Array.from({ length: Math.min(countMax, 8) }, (_, i) => i + 1).map((num) => (
              <div
                key={num}
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-base transition-all duration-300 ${
                  num === currentCount ? 'scale-110' : ''
                }`}
                style={{
                  background: num === currentCount
                    ? 'linear-gradient(135deg, #10B981 0%, #14B8A6 50%, #06B6D4 100%)'
                    : num < currentCount
                    ? 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)'
                    : 'linear-gradient(135deg, #374151 0%, #1F2937 100%)',
                  color: '#FFFFFF',
                  boxShadow: num === currentCount
                    ? `
                      0 4px 16px rgba(16, 185, 129, 0.5),
                      0 2px 8px rgba(16, 185, 129, 0.4),
                      0 0 0 1px rgba(255, 255, 255, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.3)
                    `
                    : `
                      0 2px 8px rgba(0, 0, 0, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.05),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.3)
                    `,
                  border: num > currentCount ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                  opacity: num < currentCount ? 0.5 : 1,
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                }}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
