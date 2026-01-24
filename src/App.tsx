import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import { Player } from './components/Player';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { useBackgroundMusic } from './hooks/useBackgroundMusic';
import { AppSettings } from './types';
import { loadSettings, saveSettings, addExerciseLog } from './utils/storage';
import { resetBeatNumber } from './utils/audioEngine';
import { logger } from './utils/logger';
import './index.css';

function App() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<AppSettings>(loadSettings());
  const sessionStartTime = useRef<number | null>(null);

  // Background music hook
  const bgMusic = useBackgroundMusic({
    enabled: settings.backgroundMusicEnabled,
    volume: settings.backgroundMusicVolume,
    musicFile: settings.backgroundMusicFile,
  });

  // Audio player hook
  const audioPlayer = useAudioPlayer({
    settings,
    onTimerComplete: () => {
      stopAll();
      // Show browser notification if permitted
      if (Notification.permission === 'granted') {
        new Notification(t('timerComplete'), {
          body: t('exerciseLogged'),
          icon: '/vite.svg',
        });
      }
    },
  });

  // Load settings on mount
  useEffect(() => {
    const loaded = loadSettings();
    setSettings(loaded);
  }, []);

  // Save settings when they change
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Auto-play background music when enabled
  useEffect(() => {
    logger.log('背景音乐状态变化:', settings.backgroundMusicEnabled);
    if (settings.backgroundMusicEnabled) {
      logger.log('自动播放背景音乐...');
      bgMusic.play()
        .then(() => logger.log('✅ 背景音乐自动播放成功'))
        .catch((error) => logger.error('❌ 背景音乐自动播放失败:', error));
    } else {
      logger.log('停止背景音乐...');
      bgMusic.stop();
    }
  }, [settings.backgroundMusicEnabled, bgMusic]);

  // Handle start
  const handleStart = () => {
    logger.log('开始播放节拍器', {
      bgMusicEnabled: settings.backgroundMusicEnabled,
    });

    // Record session start time
    sessionStartTime.current = Date.now();
    audioPlayer.start();
  };

  // Handle stop
  const handleStop = () => {
    // Save exercise log if session was active
    if (sessionStartTime.current && audioPlayer.playerState.elapsedTime > 0) {
      const log = {
        id: Date.now().toString(),
        startTime: sessionStartTime.current,
        endTime: Date.now(),
        duration: audioPlayer.playerState.elapsedTime,
        bpm: settings.bpm,
        soundType: settings.soundType,
        enableCount: settings.enableCount,
        countMax: settings.countMax,
      };
      addExerciseLog(log);
      logger.log('Exercise log saved:', log);
    }

    sessionStartTime.current = null;
    stopAll();
  };

  // Stop all audio
  const stopAll = () => {
    audioPlayer.stop();
    bgMusic.stop();
    // Reset beat number when stopping
    resetBeatNumber();
  };

  // Handle BPM change
  const handleBpmChange = (bpm: number) => {
    logger.log('=== handleBpmChange 被调用，新BPM:', bpm, '当前settings.bpm:', settings.bpm);
    setSettings(prev => ({ ...prev, bpm }));
    logger.log('调用 audioPlayer.updateBPM...');
    audioPlayer.updateBPM(bpm);
    logger.log('=== handleBpmChange 完成');
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8F8F8' }}>
      {/* Mobile Screen Container */}
      <div className="relative w-full max-w-[402px] h-[874px] bg-white overflow-hidden flex flex-col">
        {/* Status Bar */}
        <div className="flex items-center justify-between px-6 py-5 h-[62px]">
          <span className="text-[17px] font-semibold text-black">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="w-[18px] h-[18px]" />
            <div className="w-[18px] h-[18px]" />
            <div className="w-[24px] h-[18px]" />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <Player
            bpm={audioPlayer.playerState.currentBPM}
            isPlaying={audioPlayer.playerState.isPlaying}
            currentCount={audioPlayer.playerState.currentCount}
            elapsedTime={audioPlayer.playerState.elapsedTime}
            remainingTime={audioPlayer.playerState.remainingTime}
            enableCount={settings.enableCount}
            countMax={settings.countMax}
            onStart={handleStart}
            onStop={handleStop}
            onBpmChange={handleBpmChange}
            settings={settings}
            onSettingsChange={setSettings}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
