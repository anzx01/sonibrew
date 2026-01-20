import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from './Card';
import { Button } from './Button';
import { WorkoutPreset, AppSettings } from '../types';
import { loadPresets, addPreset, deletePreset } from '../utils/storage';

interface PresetsProps {
  currentSettings: AppSettings;
  onApplyPreset: (settings: AppSettings) => void;
}

export const Presets: React.FC<PresetsProps> = ({ currentSettings, onApplyPreset }) => {
  const { t } = useTranslation();
  const [presets, setPresets] = useState<WorkoutPreset[]>([]);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [presetName, setPresetName] = useState('');

  useEffect(() => {
    setPresets(loadPresets());
  }, []);

  const handleSavePreset = () => {
    if (!presetName.trim()) {
      alert('Please enter a preset name');
      return;
    }

    const newPreset: WorkoutPreset = {
      id: Date.now().toString(),
      name: presetName,
      bpm: currentSettings.bpm,
      soundType: currentSettings.soundType,
      customSoundData: currentSettings.customSoundData,
      backgroundMusicEnabled: currentSettings.backgroundMusicEnabled,
      backgroundMusicFile: currentSettings.backgroundMusicFile,
      backgroundMusicVolume: currentSettings.backgroundMusicVolume,
      enableCount: currentSettings.enableCount,
      countMax: currentSettings.countMax,
      voiceLanguage: currentSettings.voiceLanguage,
      voiceGender: currentSettings.voiceGender,
      beatVolume: currentSettings.beatVolume,
      voiceVolume: currentSettings.voiceVolume,
      createdAt: Date.now(),
    };

    const success = addPreset(newPreset);
    if (success) {
      setPresets(loadPresets());
      setPresetName('');
      setShowSaveForm(false);
      alert(t('presetSaved'));
    } else {
      alert(t('maxPresets'));
    }
  };

  const handleDeletePreset = (id: string) => {
    if (confirm('Are you sure you want to delete this preset?')) {
      deletePreset(id);
      setPresets(loadPresets());
      alert(t('presetDeleted'));
    }
  };

  const handleApplyPreset = (preset: WorkoutPreset) => {
    const settings: AppSettings = {
      bpm: preset.bpm,
      soundType: preset.soundType,
      customSoundData: preset.customSoundData,
      backgroundMusicEnabled: preset.backgroundMusicEnabled,
      backgroundMusicFile: preset.backgroundMusicFile,
      backgroundMusicVolume: preset.backgroundMusicVolume,
      enableCount: preset.enableCount,
      countMax: preset.countMax,
      voiceLanguage: preset.voiceLanguage,
      voiceGender: preset.voiceGender,
      beatVolume: preset.beatVolume,
      voiceVolume: preset.voiceVolume,
      timerMode: currentSettings.timerMode,
      timerDuration: currentSettings.timerDuration,
    };
    onApplyPreset(settings);
    alert(t('presetApplied'));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Save New Preset */}
      <Card>
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
          {t('savePreset')}
        </h3>
        {!showSaveForm ? (
          <Button
            onClick={() => setShowSaveForm(true)}
            variant="primary"
            className="w-full"
          >
            {t('savePreset')}
          </Button>
        ) : (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder={t('presetName')}
              className="w-full px-4 py-2 rounded-lg bg-[var(--background-color)] border border-[var(--border-color)] text-[var(--text-primary)]"
              maxLength={30}
            />
            <div className="flex gap-2">
              <Button
                onClick={handleSavePreset}
                variant="success"
                className="flex-1"
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  setShowSaveForm(false);
                  setPresetName('');
                }}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Preset List */}
      <div>
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
          {t('presets')} ({presets.length}/5)
        </h3>
        {presets.length === 0 ? (
          <Card>
            <p className="text-center text-[var(--text-secondary)]">
              {t('noPresets')}
            </p>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {presets.map((preset) => (
              <Card key={preset.id} className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-[var(--text-primary)]">
                      {preset.name}
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      {preset.bpm} BPM
                      {preset.enableCount && ` • Count 1-${preset.countMax}`}
                      {preset.backgroundMusicEnabled && ' • Music'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleApplyPreset(preset)}
                      variant="primary"
                      size="sm"
                    >
                      {t('applyPreset')}
                    </Button>
                    <Button
                      onClick={() => handleDeletePreset(preset.id)}
                      variant="danger"
                      size="sm"
                    >
                      {t('deletePreset')}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
