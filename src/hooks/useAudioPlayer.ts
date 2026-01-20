import { useState, useEffect, useRef, useCallback } from 'react';
import { AppSettings, PlayerState, ExerciseLog } from '../types';
import { playBeatSound, speakBeatSound, resumeAudioContext, resetBeatNumber } from '../utils/audioEngine';
import {
  speakNumber,
  cancelSpeech,
  isSpeechSupported,
  calculateSpeechRate
} from '../utils/voiceEngine';
import { addExerciseLog } from '../utils/storage';
import { logger } from '../utils/logger';

interface UseAudioPlayerOptions {
  settings: AppSettings;
  onTimerComplete?: () => void;
}

export const useAudioPlayer = ({ settings, onTimerComplete }: UseAudioPlayerOptions) => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    isPaused: false,
    currentBPM: settings.bpm,
    currentCount: 0,
    elapsedTime: 0,
    remainingTime: settings.timerMode ? settings.timerDuration * 60 : undefined,
  });

  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const currentBPMRef = useRef<number>(settings.bpm); // Store current BPM in ref
  const isPlayingRef = useRef<boolean>(false); // Track playing state in ref

  // Keep ref in sync with state
  useEffect(() => {
    currentBPMRef.current = playerState.currentBPM;
    isPlayingRef.current = playerState.isPlaying;
  }, [playerState.currentBPM, playerState.isPlaying]);

  // Play a single beat
  const playBeat = useCallback(async () => {
    try {
      await resumeAudioContext();

      // Play beat sound
      try {
        if (settings.soundType === 'voice') {
          // Use voice for beat sound
          logger.log('使用人声节拍:', settings.soundType, 'BPM:', currentBPMRef.current);
          await speakBeatSound(
            settings.voiceLanguage,
            settings.voiceGender,
            settings.beatVolume,
            currentBPMRef.current  // Pass current BPM for speech rate calculation
          );
          logger.log('人声节拍播放完成');
        } else {
          // Use standard beat sounds
          await playBeatSound(
            settings.soundType,
            settings.beatVolume,
            settings.customSoundData
          );
        }
      } catch (soundError) {
        // Log all errors to help debug
        logger.error('播放节拍声音错误:', soundError);
        if (settings.soundType === 'voice') {
          logger.log('人声节拍错误详情:', {
            error: soundError,
            language: settings.voiceLanguage,
            gender: settings.voiceGender,
            volume: settings.beatVolume,
            bpm: currentBPMRef.current
          });
        }
      }
    } catch (error) {
      logger.error('Error in beat playback:', error);
    }
  }, [settings.soundType, settings.voiceLanguage, settings.voiceGender, settings.beatVolume, settings.customSoundData]);

  // Helper function to play a beat and update state
  // Returns true if playback should continue, false if it should stop
  const playAndScheduleNext = useCallback(() => {
    logger.log('🔔 节拍触发，BPM:', currentBPMRef.current);

    let shouldContinue = true;

    setPlayerState(prev => {
      const newElapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);

      // Update count
      let newCount = prev.currentCount + 1;
      if (settings.enableCount && newCount > settings.countMax) {
        newCount = 1; // Reset to 1
      }

      // Check if timer mode is enabled
      if (settings.timerMode && prev.remainingTime !== undefined) {
        const newRemainingTime = prev.remainingTime - 1;

        if (newRemainingTime <= 0) {
          // Timer complete - don't call stop here, just signal it
          shouldContinue = false;
          // Note: The actual stop will be handled by the caller
          onTimerComplete?.();
          return prev;
        }

        // Play beat sound
        playBeat();

        // If voice counting is enabled, speak the number
        if (settings.enableCount && isSpeechSupported() && newCount <= settings.countMax) {
          const rate = calculateSpeechRate(prev.currentBPM);
          speakNumber(
            newCount,
            settings.voiceLanguage,
            settings.voiceGender,
            settings.voiceVolume,
            rate
          ).catch(() => {});
        }

        return {
          ...prev,
          currentCount: newCount,
          elapsedTime: newElapsedTime,
          remainingTime: newRemainingTime,
        };
      }

      // Normal mode - play beat and update elapsed time
      playBeat();

      // If voice counting is enabled, speak the number
      if (settings.enableCount && isSpeechSupported() && newCount <= settings.countMax) {
        const rate = calculateSpeechRate(prev.currentBPM);
        speakNumber(
          newCount,
          settings.voiceLanguage,
          settings.voiceGender,
          settings.voiceVolume,
          rate
        ).catch(() => {});
      }

      return {
        ...prev,
        currentCount: newCount,
        elapsedTime: newElapsedTime,
      };
    });

    return shouldContinue;
  }, [settings.timerMode, settings.timerDuration, onTimerComplete, playBeat, settings.enableCount, settings.countMax, settings.voiceLanguage, settings.voiceGender, settings.voiceVolume]);

  // Schedule the next beat
  const scheduleNextBeat = useCallback(() => {
    const currentBPM = currentBPMRef.current;
    const delayMs = (60 / currentBPM) * 1000;

    logger.log('⏰ 调度下一次节拍，BPM:', currentBPM, '延迟:', delayMs, 'ms', 'isPlaying:', isPlayingRef.current);

    // Clear any existing timeout before creating a new one
    if (intervalRef.current) {
      logger.log('🧹 清除现有timeout');
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }

    const timeoutId = setTimeout(() => {
      // Check if still playing (use ref to get latest value)
      if (!isPlayingRef.current) {
        logger.log('⏸️ 已停止播放，取消调度');
        return;
      }

      // Play beat and update state, check if should continue
      const shouldContinue = playAndScheduleNext();

      if (!shouldContinue) {
        logger.log('⏹️ 定时器完成，停止播放');
        // Stop playback
        if (intervalRef.current) {
          clearTimeout(intervalRef.current);
          intervalRef.current = null;
        }
        isPlayingRef.current = false;
        cancelSpeech();
        setPlayerState({
          isPlaying: false,
          isPaused: false,
          currentBPM: settings.bpm,
          currentCount: 0,
          elapsedTime: 0,
          remainingTime: settings.timerMode ? settings.timerDuration * 60 : undefined,
        });
        return;
      }

      // Schedule next beat recursively
      if (isPlayingRef.current) {
        scheduleNextBeat();
      }
    }, delayMs);

    intervalRef.current = timeoutId as unknown as number;
  }, [playAndScheduleNext, settings.bpm, settings.timerMode, settings.timerDuration]);

  // Start playing
  const start = useCallback(() => {
    if (playerState.isPlaying) {
      logger.log('start() 被调用但已经在播放，忽略');
      return;
    }

    logger.log('start() 被调用，当前BPM:', playerState.currentBPM);

    startTimeRef.current = Date.now();

    // Reset beat number when starting
    resetBeatNumber();

    // Update ref immediately (don't wait for useEffect)
    isPlayingRef.current = true;

    setPlayerState(prev => {
      logger.log('设置isPlaying = true，当前state:', prev);
      return {
        ...prev,
        isPlaying: true,
        isPaused: false,
      };
    });

    // Play first beat immediately
    playBeat();

    // Start the scheduling loop
    scheduleNextBeat();
  }, [playerState.isPlaying, playBeat, scheduleNextBeat]);

  // Pause playing
  const pause = useCallback(() => {
    logger.log('pause() 被调用，当前state:', playerState);
    if (!playerState.isPlaying || playerState.isPaused) {
      logger.log('pause() 被忽略，不是在播放状态');
      return;
    }

    logger.log('执行pause()，清除timeout');
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }

    // Update ref immediately
    isPlayingRef.current = false;

    cancelSpeech();

    setPlayerState(prev => ({
      ...prev,
      isPlaying: false,
      isPaused: true,
    }));
  }, [playerState.isPlaying, playerState.isPaused]);

  // Stop playing and reset
  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }

    // Update ref immediately
    isPlayingRef.current = false;

    cancelSpeech();

    // Log exercise if it was played
    if (playerState.elapsedTime > 0) {
      const log: ExerciseLog = {
        id: Date.now().toString(),
        startTime: startTimeRef.current,
        endTime: Date.now(),
        duration: playerState.elapsedTime,
        bpm: playerState.currentBPM,
        soundType: settings.soundType,
        enableCount: settings.enableCount,
        countMax: settings.countMax,
      };
      addExerciseLog(log);
    }

    setPlayerState({
      isPlaying: false,
      isPaused: false,
      currentBPM: settings.bpm,
      currentCount: 0,
      elapsedTime: 0,
      remainingTime: settings.timerMode ? settings.timerDuration * 60 : undefined,
    });
  }, [playerState, settings]);

  // Update BPM in real-time
  const updateBPM = useCallback((newBPM: number) => {
    logger.log('updateBPM() 被调用，新BPM:', newBPM, '当前 ref BPM:', currentBPMRef.current);

    // Update ref (will be used by next beat scheduling)
    currentBPMRef.current = newBPM;

    // Update state for UI
    setPlayerState(prev => ({
      ...prev,
      currentBPM: newBPM,
    }));

    // If using voice beats, cancel current speech immediately for real-time speed change
    if (settings.soundType === 'voice' && isPlayingRef.current) {
      logger.log('🎤 人声节拍实时调速，取消当前语音');
      cancelSpeech();
    }

    // If currently playing, reschedule next beat with new BPM immediately
    if (isPlayingRef.current && intervalRef.current) {
      logger.log('🔄 正在播放，立即重新调度节拍');

      // Clear existing timeout
      clearTimeout(intervalRef.current);
      intervalRef.current = null;

      // Schedule next beat with new BPM
      scheduleNextBeat();
      logger.log('✅ BPM已更新，节拍已重新调度');
    } else {
      logger.log('ℹ️ 未在播放，只更新BPM值');
    }
  }, [scheduleNextBeat, settings.soundType]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      cancelSpeech();
    };
  }, []);

  return {
    playerState,
    start,
    pause,
    stop,
    updateBPM,
  };
};
