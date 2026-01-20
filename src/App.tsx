import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import { Player } from './components/Player';
import { Settings } from './components/Settings';
import { Button } from './components/Button';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { useBackgroundMusic } from './hooks/useBackgroundMusic';
import { AppSettings } from './types';
import { loadSettings, saveSettings } from './utils/storage';
import { resetBeatNumber } from './utils/audioEngine';
import { logger } from './utils/logger';
import './index.css';

function App() {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState<AppSettings>(loadSettings());

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
  }, [settings.backgroundMusicEnabled]);

  // Handle start
  const handleStart = () => {
    logger.log('开始播放节拍器', {
      bgMusicEnabled: settings.backgroundMusicEnabled,
    });

    audioPlayer.start();
  };

  // Handle stop
  const handleStop = () => {
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

  // Switch language
  const handleLanguageChange = (lang: 'zh' | 'en') => {
    logger.log('切换界面语言:', lang, '同时同步人声语言');
    i18n.changeLanguage(lang);
    // 自动同步人声语言
    setSettings(prev => ({ ...prev, voiceLanguage: lang }));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'radial-gradient(circle at 50% 0%, #2C2C2E 0%, #1C1C1E 50%, #000000 100%)',
      }}
    >
      {/* iPhone 16 Pro Max Frame with Titanium Effect */}
      <div className="relative" style={{ padding: '3px' }}>
        {/* Titanium Bezel with Gradient */}
        <div
          className="relative overflow-hidden"
          style={{
            width: '430px',
            height: '932px',
            maxWidth: '100vw',
            maxHeight: '100vh',
            borderRadius: '55px',
            background: 'linear-gradient(135deg, #4A4A4C 0%, #2C2C2E 25%, #1C1C1E 50%, #2C2C2E 75%, #4A4A4C 100%)',
            padding: '2px',
            boxShadow: `
              0 0 0 1px rgba(255, 255, 255, 0.1),
              0 2px 4px rgba(0, 0, 0, 0.3),
              0 8px 16px rgba(0, 0, 0, 0.4),
              0 16px 32px rgba(0, 0, 0, 0.5),
              inset 0 1px 0 rgba(255, 255, 255, 0.15),
              inset 0 -1px 0 rgba(0, 0, 0, 0.5)
            `,
          }}
        >
          {/* Screen with slight inset shadow */}
          <div
            className="relative bg-[var(--background-color)] overflow-hidden h-full"
            style={{
              borderRadius: '53px',
              boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.3), inset 0 2px 8px rgba(0, 0, 0, 0.4)',
            }}
          >
            {/* Dynamic Island */}
            <div className="absolute top-[20px] left-1/2 -translate-x-1/2 z-50">
              <div
                style={{
                  width: '126px',
                  height: '37px',
                  borderRadius: '19px',
                  background: '#000000',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.05)',
                }}
              />
            </div>

            {/* Status Bar Spacer */}
            <div className="h-[59px] bg-[var(--background-color)]" />

        {/* Header - Minimal */}
        <header className="border-b border-[var(--separator-color)] bg-[var(--surface-color)]">
          <div className="px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold text-[var(--text-primary)]">
                  {t('appTitle')}
                </h1>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleLanguageChange(i18n.language === 'zh' ? 'en' : 'zh')}
                className="!font-semibold"
              >
                {i18n.language === 'zh' ? 'EN' : '中文'}
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content - Single Column Centered */}
        <main className="px-4">
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
          />
        </main>

            {/* Settings - Bottom Drawer/Collapsible */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-[var(--separator-color)] bg-[var(--surface-color)] max-h-[40vh] overflow-y-auto pb-[34px]">
              <div className="px-4 py-4">
                <Settings
                  settings={settings}
                  onChange={setSettings}
                />
              </div>
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2">
              <div
                style={{
                  width: '134px',
                  height: '5px',
                  borderRadius: '100px',
                  background: 'rgba(255, 255, 255, 0.3)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
