import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoMusicalNotes, IoVolumeHigh } from 'react-icons/io5';
import { Slider } from './Slider';
import { Toggle } from './Toggle';
import { AppSettings, SoundType } from '../types';

interface SettingsProps {
  settings: AppSettings;
  onChange: (settings: AppSettings) => void;
}

export const Settings: React.FC<SettingsProps> = ({ settings, onChange }) => {
  const { t } = useTranslation();

  const updateSetting = <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Background Music Settings */}
      <div className="space-y-3 p-4 rounded-2xl" style={{
        background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)',
        boxShadow: `
          0 4px 6px rgba(0, 0, 0, 0.4),
          0 8px 16px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.1),
          inset 0 -1px 0 rgba(0, 0, 0, 0.5)
        `,
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div className="flex items-center gap-2 mb-1">
          <IoMusicalNotes className="text-xl" style={{
            color: '#A78BFA',
            filter: 'drop-shadow(0 2px 4px rgba(167, 139, 250, 0.5))'
          }} />
          <h3 className="text-sm font-semibold uppercase tracking-wider" style={{
            background: 'linear-gradient(90deg, #A78BFA 0%, #EC4899 50%, #F59E0B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 4px rgba(167, 139, 250, 0.3))'
          }}>
            {t('backgroundMusic')}
          </h3>
        </div>

        <div className="flex items-center justify-between py-2">
          <label className="text-base font-medium" style={{
            background: 'linear-gradient(90deg, #60A5FA 0%, #A78BFA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 1px 2px rgba(96, 165, 250, 0.3))'
          }}>
            {t('backgroundMusic')}
          </label>
          <Toggle
            checked={settings.backgroundMusicEnabled}
            onChange={(checked) => updateSetting('backgroundMusicEnabled', checked)}
            label={settings.backgroundMusicEnabled ? t('on') : t('off')}
          />
        </div>

        <div className="py-2">
          <Slider
            label={t('backgroundMusicVolume')}
            value={settings.backgroundMusicVolume}
            onChange={(value) => updateSetting('backgroundMusicVolume', value)}
            min={0}
            max={1}
            step={0.05}
          />
        </div>
      </div>

      {/* Sound Settings */}
      <div className="space-y-3 p-4 rounded-2xl" style={{
        background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)',
        boxShadow: `
          0 4px 6px rgba(0, 0, 0, 0.4),
          0 8px 16px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.1),
          inset 0 -1px 0 rgba(0, 0, 0, 0.5)
        `,
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div className="flex items-center gap-2 mb-1">
          <IoVolumeHigh className="text-xl" style={{
            color: '#10B981',
            filter: 'drop-shadow(0 2px 4px rgba(16, 185, 129, 0.5))'
          }} />
          <h3 className="text-sm font-semibold uppercase tracking-wider" style={{
            background: 'linear-gradient(90deg, #10B981 0%, #14B8A6 50%, #06B6D4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 4px rgba(16, 185, 129, 0.3))'
          }}>
            {t('soundSettings')}
          </h3>
        </div>

        <div className="py-2">
          <label className="block text-sm font-medium mb-2" style={{
            background: 'linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 1px 2px rgba(139, 92, 246, 0.3))'
          }}>
            {t('soundType')}
          </label>
          <select
            value={settings.soundType}
            onChange={(e) => updateSetting('soundType', e.target.value as SoundType)}
            className="w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none"
            style={{
              background: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)',
              borderColor: 'rgba(139, 92, 246, 0.3)',
              color: '#FFFFFF',
              boxShadow: `
                0 2px 8px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.05),
                inset 0 -1px 0 rgba(0, 0, 0, 0.3)
              `
            }}
          >
            <option value="beep">{t('soundType_beep')}</option>
            <option value="tick">{t('soundType_tick')}</option>
            <option value="clap">{t('soundType_clap')}</option>
            <option value="bell">{t('soundType_bell')}</option>
            <option value="voice">{t('soundType_voice')}</option>
          </select>
        </div>
      </div>
    </div>
  );
};
