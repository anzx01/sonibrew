// Sound types
export type SoundType = 'beep' | 'tick' | 'clap' | 'bell' | 'voice' | 'custom';

// Voice language
export type VoiceLanguage = 'zh' | 'en';

// Voice gender preference
export type VoiceGender = 'male' | 'female';

// Workout preset interface
export interface WorkoutPreset {
  id: string;
  name: string;
  bpm: number;
  soundType: SoundType;
  customSoundData?: string; // Base64 encoded custom audio
  backgroundMusicEnabled: boolean;
  backgroundMusicFile?: string; // Base64 or URL
  backgroundMusicVolume: number;
  enableCount: boolean;
  countMax: number;
  voiceLanguage: VoiceLanguage;
  voiceGender: VoiceGender;
  beatVolume: number;
  voiceVolume: number;
  createdAt: number;
}

// Exercise history log
export interface ExerciseLog {
  id: string;
  startTime: number;
  endTime?: number;
  duration: number; // in seconds
  bpm: number;
  soundType: SoundType;
  enableCount: boolean;
  countMax: number;
  presetUsed?: string; // preset ID or name
}

// App settings
export interface AppSettings {
  bpm: number;
  soundType: SoundType;
  customSoundData?: string;
  backgroundMusicEnabled: boolean;
  backgroundMusicFile?: string;
  backgroundMusicVolume: number;
  enableCount: boolean;
  countMax: number;
  voiceLanguage: VoiceLanguage;
  voiceGender: VoiceGender;
  beatVolume: number;
  voiceVolume: number;
  timerMode: boolean;
  timerDuration: number; // in minutes
}

// Player state
export interface PlayerState {
  isPlaying: boolean;
  isPaused: boolean;
  currentBPM: number;
  currentCount: number;
  elapsedTime: number; // in seconds
  remainingTime?: number; // for timer mode
}
