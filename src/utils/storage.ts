import { AppSettings, WorkoutPreset, ExerciseLog } from '../types';
import { STORAGE_KEYS, DEFAULT_SETTINGS } from '../constants';
import { logger } from './logger';

// Constants
const MAX_PRESETS = 5;
const MAX_HISTORY_ENTRIES = 100;

/**
 * Checks if localStorage is available and has space
 * @returns true if localStorage is available
 */
const isStorageAvailable = (): boolean => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    logger.error('localStorage is not available:', e);
    return false;
  }
};

/**
 * Safely saves data to localStorage with quota handling
 * @param key - Storage key
 * @param data - Data to save
 * @returns true if successful, false otherwise
 */
const safeSetItem = (key: string, data: string): boolean => {
  if (!isStorageAvailable()) {
    return false;
  }

  try {
    localStorage.setItem(key, data);
    return true;
  } catch (e: unknown) {
    if (e instanceof Error && e.name === 'QuotaExceededError') {
      logger.error('localStorage quota exceeded');
      // Try to free up space by removing old history
      try {
        localStorage.removeItem(STORAGE_KEYS.HISTORY);
        localStorage.setItem(key, data);
        logger.info('Freed up space by removing history');
        return true;
      } catch {
        logger.error('Failed to free up space');
        return false;
      }
    }
    logger.error('Failed to save to localStorage:', e);
    return false;
  }
};

/**
 * Saves app settings to localStorage
 * @param settings - Settings to save
 */
export const saveSettings = (settings: AppSettings): void => {
  // Don't save audio files to localStorage (they're too large)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { backgroundMusicFile, customSoundData, ...settingsToSave } = settings;
  const success = safeSetItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settingsToSave));
  if (!success) {
    logger.warn('Failed to save settings');
  }
};

/**
 * Loads app settings from localStorage
 * @returns Loaded settings or default settings
 */
export const loadSettings = (): AppSettings => {
  if (!isStorageAvailable()) {
    return DEFAULT_SETTINGS;
  }

  const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return { ...DEFAULT_SETTINGS, ...parsed };
    } catch (e) {
      logger.error('Failed to parse settings:', e);
      return DEFAULT_SETTINGS;
    }
  }
  return DEFAULT_SETTINGS;
};

/**
 * Saves presets to localStorage
 * @param presets - Array of presets to save
 */
export const savePresets = (presets: WorkoutPreset[]): void => {
  const success = safeSetItem(STORAGE_KEYS.PRESETS, JSON.stringify(presets));
  if (!success) {
    logger.warn('Failed to save presets');
  }
};

/**
 * Loads presets from localStorage
 * @returns Array of presets
 */
export const loadPresets = (): WorkoutPreset[] => {
  if (!isStorageAvailable()) {
    return [];
  }

  const stored = localStorage.getItem(STORAGE_KEYS.PRESETS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      logger.error('Failed to parse presets:', e);
      return [];
    }
  }
  return [];
};

/**
 * Adds a new preset
 * @param preset - Preset to add
 * @returns true if successful, false if max presets reached
 */
export const addPreset = (preset: WorkoutPreset): boolean => {
  const presets = loadPresets();
  if (presets.length >= MAX_PRESETS) {
    logger.warn('Maximum presets reached:', MAX_PRESETS);
    return false;
  }
  presets.push(preset);
  savePresets(presets);
  return true;
};

/**
 * Updates an existing preset
 * @param id - Preset ID
 * @param updatedPreset - Updated preset data
 */
export const updatePreset = (id: string, updatedPreset: WorkoutPreset): void => {
  const presets = loadPresets();
  const index = presets.findIndex(p => p.id === id);
  if (index !== -1) {
    presets[index] = updatedPreset;
    savePresets(presets);
  } else {
    logger.warn('Preset not found for update:', id);
  }
};

/**
 * Deletes a preset
 * @param id - Preset ID to delete
 */
export const deletePreset = (id: string): void => {
  const presets = loadPresets();
  const filtered = presets.filter(p => p.id !== id);
  if (filtered.length === presets.length) {
    logger.warn('Preset not found for deletion:', id);
  }
  savePresets(filtered);
};

/**
 * Saves exercise history to localStorage
 * @param history - Array of exercise logs
 */
export const saveHistory = (history: ExerciseLog[]): void => {
  const success = safeSetItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  if (!success) {
    logger.warn('Failed to save history');
  }
};

/**
 * Loads exercise history from localStorage
 * @returns Array of exercise logs
 */
export const loadHistory = (): ExerciseLog[] => {
  if (!isStorageAvailable()) {
    return [];
  }

  const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      logger.error('Failed to parse history:', e);
      return [];
    }
  }
  return [];
};

/**
 * Adds an exercise log to history
 * @param log - Exercise log to add
 */
export const addExerciseLog = (log: ExerciseLog): void => {
  const history = loadHistory();
  history.unshift(log); // Add to beginning
  // Keep only last MAX_HISTORY_ENTRIES entries
  if (history.length > MAX_HISTORY_ENTRIES) {
    history.pop();
  }
  saveHistory(history);
};

/**
 * Clears all exercise history
 */
export const clearHistory = (): void => {
  if (isStorageAvailable()) {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    logger.info('History cleared');
  }
};

/**
 * Exports history as JSON string
 * @returns JSON string of history
 */
export const exportHistory = (): string => {
  const history = loadHistory();
  return JSON.stringify(history, null, 2);
};

/**
 * Imports settings from JSON string
 * @param jsonString - JSON string containing settings
 * @returns Imported settings or null if invalid
 */
export const importSettings = (jsonString: string): AppSettings | null => {
  try {
    const imported = JSON.parse(jsonString);
    // Validate basic structure
    if (typeof imported.bpm === 'number') {
      return { ...DEFAULT_SETTINGS, ...imported };
    }
    logger.warn('Invalid settings format');
    return null;
  } catch (e) {
    logger.error('Failed to import settings:', e);
    return null;
  }
};
