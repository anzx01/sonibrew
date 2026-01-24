import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Pause, Volume2 } from 'lucide-react';
import { Slider } from './ui/slider';
import { MIN_BPM, MAX_BPM } from '../constants';
import { AppSettings, SoundType } from '../types';

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
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
}

export const Player: React.FC<PlayerProps> = ({
  bpm,
  isPlaying,
  currentCount,
  elapsedTime,
  onStart,
  onStop,
  onBpmChange,
  settings,
  onSettingsChange,
}) => {
  const { t, i18n } = useTranslation();
  const [totalBeats, setTotalBeats] = useState(0);

  // Update total beats when count changes
  React.useEffect(() => {
    if (isPlaying) {
      setTotalBeats(currentCount);
    }
  }, [currentCount, isPlaying]);

  // Reset total beats when stopped
  React.useEffect(() => {
    if (!isPlaying) {
      setTotalBeats(0);
    }
  }, [isPlaying]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
    // Sync voice language with UI language
    updateSetting('voiceLanguage', lang as 'zh' | 'en');
  };

  return (
    <div className="h-full px-5 pt-3 pb-5 flex flex-col gap-5">
      {/* Header with Language Switcher */}
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-bold text-[#18181B] leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          SoniBrew
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => handleLanguageChange('zh')}
            className={`px-2.5 py-1 rounded-full text-[12px] font-semibold transition-colors ${
              i18n.language === 'zh'
                ? 'bg-[#8B5CF6] text-white'
                : 'bg-[#F4F4F5] text-[#71717A]'
            }`}
          >
            中文
          </button>
          <button
            onClick={() => handleLanguageChange('en')}
            className={`px-2.5 py-1 rounded-full text-[12px] font-semibold transition-colors ${
              i18n.language === 'en'
                ? 'bg-[#8B5CF6] text-white'
                : 'bg-[#F4F4F5] text-[#71717A]'
            }`}
          >
            EN
          </button>
        </div>
      </div>

      {/* Player Card */}
      <div className="bg-[#8B5CF6] rounded-3xl p-5 flex flex-col gap-3">
        {/* BPM Display */}
        <div className="flex flex-col items-center gap-1">
          <div className="text-[40px] font-extrabold text-white leading-none" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {bpm}
          </div>
          <div className="text-sm font-semibold text-white/70">BPM</div>
        </div>

        {/* Count Display */}
        <div className="flex flex-col items-center gap-1">
          <div className="text-[56px] font-extrabold text-white leading-none" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {currentCount}
          </div>
          <div className="text-xs font-semibold text-white/70">Count</div>
        </div>

        {/* Play Button */}
        <div className="flex justify-center">
          <button
            onClick={isPlaying ? onStop : onStart}
            className="w-16 h-16 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 text-[#8B5CF6] fill-[#8B5CF6]" />
            ) : (
              <Play className="w-7 h-7 text-[#8B5CF6] fill-[#8B5CF6]" />
            )}
          </button>
        </div>
      </div>

      {/* BPM Slider */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#18181B]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {t('bpm')}
          </span>
          <span className="text-sm font-semibold text-[#8B5CF6]">{bpm}</span>
        </div>
        <div className="relative">
          <div className="h-1.5 bg-[#F4F4F5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#8B5CF6] rounded-full"
              style={{ width: `${((bpm - MIN_BPM) / (MAX_BPM - MIN_BPM)) * 100}%` }}
            />
          </div>
          <Slider
            value={[bpm]}
            onValueChange={(values) => onBpmChange(values[0])}
            min={MIN_BPM}
            max={MAX_BPM}
            step={1}
            className="absolute inset-0 opacity-0"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-3">
        <div className="flex-1 bg-[#F4F4F5] rounded-2xl p-3 flex flex-col gap-0.5">
          <div className="text-[20px] font-extrabold text-[#18181B] leading-none" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {formatTime(elapsedTime)}
          </div>
          <div className="text-[10px] font-semibold text-[#71717A]">{t('duration')}</div>
        </div>
        <div className="flex-1 bg-[#F4F4F5] rounded-2xl p-3 flex flex-col gap-0.5">
          <div className="text-[20px] font-extrabold text-[#18181B] leading-none" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {totalBeats}
          </div>
          <div className="text-[10px] font-semibold text-[#71717A]">{t('count')}</div>
        </div>
      </div>

      {/* Sound Type */}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-bold text-[#18181B]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          {t('soundType')}
        </h3>
        <div className="flex gap-1.5">
          {(['beep', 'tick', 'clap'] as SoundType[]).map((type) => (
            <button
              key={type}
              onClick={() => updateSetting('soundType', type)}
              className={`flex-1 rounded-2xl p-2.5 flex flex-col items-center gap-1 ${
                settings.soundType === type ? 'bg-[#8B5CF6]' : 'bg-[#F4F4F5]'
              }`}
            >
              <Volume2 className={`w-4.5 h-4.5 ${settings.soundType === type ? 'text-white' : 'text-[#71717A]'}`} />
              <span className={`text-[11px] font-semibold ${settings.soundType === type ? 'text-white' : 'text-[#71717A]'}`}>
                {t(`soundType_${type}`)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Voice Count */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#18181B]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {t('enableCount')}
          </h3>
          <button
            onClick={() => updateSetting('enableCount', !settings.enableCount)}
            className={`w-[51px] h-[31px] rounded-full p-0.5 flex items-center ${
              settings.enableCount ? 'bg-[#8B5CF6] justify-end' : 'bg-[#E4E4E7] justify-start'
            }`}
          >
            <div className="w-[27px] h-[27px] rounded-full bg-white" />
          </button>
        </div>
      </div>

      {/* Background Music */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#18181B]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {t('backgroundMusic')}
          </h3>
          <button
            onClick={() => updateSetting('backgroundMusicEnabled', !settings.backgroundMusicEnabled)}
            className={`w-[51px] h-[31px] rounded-full p-0.5 flex items-center ${
              settings.backgroundMusicEnabled ? 'bg-[#14B8A6] justify-end' : 'bg-[#E4E4E7] justify-start'
            }`}
          >
            <div className="w-[27px] h-[27px] rounded-full bg-white" />
          </button>
        </div>
        {settings.backgroundMusicEnabled && (
          <div className="bg-[#F4F4F5] rounded-2xl p-3 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#18181B]">{t('backgroundMusicVolume')}</span>
              <span className="text-[11px] font-semibold text-[#14B8A6]">
                {Math.round(settings.backgroundMusicVolume * 100)}%
              </span>
            </div>
            <div className="relative">
              <div className="h-1 bg-[#E4E4E7] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#14B8A6] rounded-full"
                  style={{ width: `${settings.backgroundMusicVolume * 100}%` }}
                />
              </div>
              <Slider
                value={[settings.backgroundMusicVolume]}
                onValueChange={(values) => updateSetting('backgroundMusicVolume', values[0])}
                min={0}
                max={1}
                step={0.01}
                className="absolute inset-0 opacity-0"
              />
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
