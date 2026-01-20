import { SoundType, VoiceLanguage, VoiceGender } from '../types';
import { speakNumber, calculateSpeechRate } from './voiceEngine';
import { logger } from './logger';

// Constants
const SOUND_COMPLETION_TIMEOUT = 200;
const MAX_BEAT_COUNT = 20;
const MAX_CUSTOM_SOUND_SIZE = 5 * 1024 * 1024; // 5MB

// Audio context singleton
let audioContext: AudioContext | null = null;

/**
 * Gets or creates the AudioContext singleton with error recovery
 * Automatically recreates context if it was closed
 * @returns AudioContext instance
 */
const getAudioContext = (): AudioContext => {
  if (!audioContext || audioContext.state === 'closed') {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      logger.info('AudioContext created/recreated');
    } catch (error) {
      logger.error('Failed to create AudioContext:', error);
      throw new Error('Web Audio API not supported');
    }
  }
  return audioContext;
};

/**
 * Validates custom sound data
 * @param soundData - Base64 or URL string
 * @returns true if valid, false otherwise
 */
const validateCustomSound = (soundData: string): boolean => {
  if (!soundData || typeof soundData !== 'string') {
    return false;
  }

  // Check size for base64 data
  if (soundData.startsWith('data:')) {
    const base64Length = soundData.split(',')[1]?.length || 0;
    const sizeInBytes = (base64Length * 3) / 4;
    if (sizeInBytes > MAX_CUSTOM_SOUND_SIZE) {
      logger.warn('Custom sound exceeds size limit:', sizeInBytes);
      return false;
    }
  }

  // Validate URL format
  if (soundData.startsWith('http')) {
    try {
      new URL(soundData);
    } catch {
      logger.warn('Invalid custom sound URL:', soundData);
      return false;
    }
  }

  return true;
};

/**
 * Plays a beat sound based on the specified type
 * @param soundType - Type of sound to play
 * @param volume - Volume level (0-1)
 * @param customSoundData - Optional custom sound data (base64 or URL)
 * @returns Promise that resolves when sound completes
 */
export const playBeatSound = (
  soundType: SoundType,
  volume: number,
  customSoundData?: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // If custom sound data is provided, validate and play it
      if (soundType === 'custom' && customSoundData) {
        if (!validateCustomSound(customSoundData)) {
          reject(new Error('Invalid custom sound data'));
          return;
        }
        playCustomSound(customSoundData, volume)
          .then(() => resolve())
          .catch(reject);
        return;
      }

      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // Create gain node for volume control
      const gainNode = ctx.createGain();
      gainNode.connect(ctx.destination);
      gainNode.gain.setValueAtTime(volume, now);

      switch (soundType) {
        case 'beep':
          playBeep(ctx, gainNode, now);
          break;
        case 'tick':
          playTick(ctx, gainNode, now);
          break;
        case 'clap':
          playClap(ctx, gainNode, now);
          break;
        case 'bell':
          playBell(ctx, gainNode, now);
          break;
        case 'voice':
          // Voice sound is handled by the caller through speakNumber
          resolve();
          return;
        default:
          playBeep(ctx, gainNode, now);
      }

      // Resolve after sound completes
      setTimeout(() => resolve(), SOUND_COMPLETION_TIMEOUT);
    } catch (error) {
      logger.error('Error playing beat sound:', error);
      reject(error);
    }
  });
};

// Speak a beat sound (for voice sound type) - speaks numbers as beats
let currentBeatNumber = 1;

/**
 * Speaks a beat number using voice synthesis
 * @param language - Voice language (zh or en)
 * @param gender - Voice gender preference
 * @param volume - Volume level (0-1)
 * @param bpm - Beats per minute (affects speech rate)
 * @returns Promise that resolves when speech completes
 */
export const speakBeatSound = (
  language: VoiceLanguage,
  gender: VoiceGender,
  volume: number,
  bpm: number
): Promise<void> => {
  logger.log('播放人声节拍:', { number: currentBeatNumber, language, gender, volume, bpm });

  // Speak the current beat number
  const numberToSpeak = currentBeatNumber;

  // Increment for next beat (reset after MAX_BEAT_COUNT)
  currentBeatNumber++;
  if (currentBeatNumber > MAX_BEAT_COUNT) {
    currentBeatNumber = 1;
  }

  // Calculate speech rate based on BPM
  const rate = calculateSpeechRate(bpm);
  logger.log('人声节拍语速:', rate, 'BPM:', bpm);

  return speakNumber(numberToSpeak, language, gender, volume, rate);
};

/**
 * Resets the beat counter to 1
 */
export const resetBeatNumber = (): void => {
  currentBeatNumber = 1;
};

// Simple beep sound
const playBeep = (ctx: AudioContext, gainNode: GainNode, now: number): void => {
  const oscillator = ctx.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(880, now); // A5
  oscillator.connect(gainNode);
  oscillator.start(now);
  oscillator.stop(now + 0.1);

  // Fade out
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
};

// Tick sound (shorter, higher pitch)
const playTick = (ctx: AudioContext, gainNode: GainNode, now: number): void => {
  const oscillator = ctx.createOscillator();
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(1200, now);
  oscillator.connect(gainNode);
  oscillator.start(now);
  oscillator.stop(now + 0.05);

  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
};

// Clap sound (noise burst)
const playClap = (ctx: AudioContext, gainNode: GainNode, now: number): void => {
  const bufferSize = ctx.sampleRate * 0.1; // 0.1 seconds
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Generate white noise
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  // Add filter to make it sound more like a clap
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1500;

  noise.connect(filter);
  filter.connect(gainNode);
  noise.start(now);

  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
};

// Bell sound (harmonics)
const playBell = (ctx: AudioContext, gainNode: GainNode, now: number): void => {
  const fundamental = 523.25; // C5
  const harmonics = [1, 2, 3, 4.2, 5.8];
  const amplitudes = [1, 0.6, 0.4, 0.25, 0.2];

  harmonics.forEach((harmonic, i) => {
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = fundamental * harmonic;
    osc.connect(oscGain);
    oscGain.connect(gainNode);

    oscGain.gain.setValueAtTime(amplitudes[i] * 0.3, now);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

    osc.start(now);
    osc.stop(now + 0.5);
  });

  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
};

/**
 * Plays a custom sound from base64 data or URL
 * @param soundData - Base64 encoded audio or URL
 * @param volume - Volume level (0-1)
 * @returns Promise that resolves when sound completes
 */
const playCustomSound = async (
  soundData: string,
  volume: number
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const audio = new Audio(soundData);
    audio.volume = volume;

    audio.onended = () => resolve();
    audio.onerror = (error) => {
      logger.error('Failed to load custom sound:', error);
      reject(new Error('Failed to load custom sound'));
    };

    audio.play().catch((error) => {
      logger.error('Failed to play custom sound:', error);
      reject(error);
    });
  });
};

/**
 * Resumes audio context if suspended (required by browser autoplay policy)
 * @returns Promise that resolves when context is resumed
 */
export const resumeAudioContext = async (): Promise<void> => {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
      logger.info('AudioContext resumed');
    }
  } catch (error) {
    logger.error('Failed to resume AudioContext:', error);
    throw error;
  }
};

/**
 * Cleans up audio resources
 */
export const cleanupAudio = (): void => {
  if (audioContext) {
    audioContext.close();
    audioContext = null;
    logger.info('AudioContext cleaned up');
  }
};
