import { AppSettings } from './types';

// BPM range
export const MIN_BPM = 30;
export const MAX_BPM = 200;
export const DEFAULT_BPM = 60;

// Timer settings
export const MIN_TIMER_DURATION = 5; // minutes
export const MAX_TIMER_DURATION = 60; // minutes
export const DEFAULT_TIMER_DURATION = 10; // minutes

// Count range options
export const COUNT_OPTIONS = [8, 10, 20];

// Default settings
export const DEFAULT_SETTINGS: AppSettings = {
  bpm: DEFAULT_BPM,
  soundType: 'beep',
  backgroundMusicEnabled: false,
  backgroundMusicVolume: 0.5,
  enableCount: false,
  countMax: 8,
  voiceLanguage: 'zh',
  voiceGender: 'female',
  beatVolume: 0.7,
  voiceVolume: 0.8,
  timerMode: false,
  timerDuration: DEFAULT_TIMER_DURATION,
};

// Preset storage keys
export const STORAGE_KEYS = {
  SETTINGS: 'workoutbeat_settings',
  PRESETS: 'workoutbeat_presets',
  HISTORY: 'workoutbeat_history',
  LANGUAGE: 'workoutbeat_language',
} as const;

// Audio file URLs (free resources)
export const AUDIO_RESOURCES = {
  // Free sound libraries
  freesound: 'https://freesound.org/',
  pixabay: 'https://pixabay.com/music/sound-effects/',
  zapsplat: 'https://www.zapsplat.com/sound-effect-category/',

  // Built-in sounds will be generated using Web Audio API oscillators
  // No external files needed for basic sounds
} as const;

// BPM presets
export const BPM_PRESETS = {
  slow: 45,
  medium: 60,
  fast: 90,
} as const;
