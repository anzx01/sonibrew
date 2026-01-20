import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoMusicalNotes, IoVolumeHigh } from 'react-icons/io5';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
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
          <div className="flex items-center gap-2">
            <Switch
              checked={settings.backgroundMusicEnabled}
              onCheckedChange={(checked) => updateSetting('backgroundMusicEnabled', checked)}
            />
            <span className="text-sm text-[var(--text-secondary)]">
              {settings.backgroundMusicEnabled ? t('on') : t('off')}
            </span>
          </div>
        </div>

        <div className="py-2">
          <label className="block text-sm font-medium mb-2" style={{
            background: 'linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 1px 2px rgba(139, 92, 246, 0.3))'
          }}>
            {t('backgroundMusicVolume')}
          </label>
          <Slider
            value={[settings.backgroundMusicVolume]}
            onValueChange={(values) => updateSetting('backgroundMusicVolume', values[0])}
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
          <Select
            value={settings.soundType}
            onValueChange={(value) => updateSetting('soundType', value as SoundType)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beep">{t('soundType_beep')}</SelectItem>
              <SelectItem value="tick">{t('soundType_tick')}</SelectItem>
              <SelectItem value="clap">{t('soundType_clap')}</SelectItem>
              <SelectItem value="bell">{t('soundType_bell')}</SelectItem>
              <SelectItem value="voice">{t('soundType_voice')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
