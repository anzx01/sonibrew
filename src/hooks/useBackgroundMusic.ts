import { useRef, useEffect, useState } from 'react';
import { logger } from '../utils/logger';

interface UseBackgroundMusicOptions {
  enabled: boolean;
  volume: number;
  musicFile?: string;
}

// List of background music files
const MUSIC_PLAYLIST = [
  '/xm2544.mp3',
  '/xm3242.mp3',
  '/xm3251.mp3',
  '/y1891.mp3'
];

export const useBackgroundMusic = ({ enabled, volume }: UseBackgroundMusicOptions) => {
  const audioElementsRef = useRef<HTMLAudioElement[]>([]);
  const currentTrackIndexRef = useRef<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize audio elements
  useEffect(() => {
    logger.log('🎵 初始化背景音乐，文件列表:', MUSIC_PLAYLIST);

    // Create audio elements for each track
    audioElementsRef.current = MUSIC_PLAYLIST.map((file) => {
      const audio = new Audio(file);
      audio.loop = false; // We'll handle looping manually
      audio.preload = 'auto';
      return audio;
    });

    return () => {
      // Cleanup on unmount
      audioElementsRef.current.forEach((audio) => {
        audio.pause();
        audio.src = '';
      });
      audioElementsRef.current = [];
    };
  }, []);

  // Update volume for all audio elements
  useEffect(() => {
    audioElementsRef.current.forEach((audio) => {
      audio.volume = volume;
    });
  }, [volume]);

  // Play next track in the playlist (defined as non-callback to avoid dependency issues)
  const playNextTrack = () => {
    if (!enabled) {
      logger.warn('⚠️ 背景音乐未启用，跳过播放');
      return;
    }

    if (audioElementsRef.current.length === 0) {
      logger.error('❌ 音频元素未初始化');
      return;
    }

    const currentIndex = currentTrackIndexRef.current;
    const currentAudio = audioElementsRef.current[currentIndex];

    logger.log(`🎵 尝试播放曲目 ${currentIndex + 1}/${MUSIC_PLAYLIST.length}:`, MUSIC_PLAYLIST[currentIndex]);
    logger.log('音频元素状态:', {
      src: currentAudio.src,
      readyState: currentAudio.readyState,
      volume: currentAudio.volume
    });

    // Setup ended event listener for current track
    currentAudio.onended = () => {
      logger.log('🎵 当前曲目结束，播放下一首');
      // Move to next track
      currentTrackIndexRef.current = (currentTrackIndexRef.current + 1) % MUSIC_PLAYLIST.length;
      playNextTrack();
    };

    // Setup error event listener
    currentAudio.onerror = (error) => {
      logger.error('❌ 音频播放错误:', error);
      setIsLoading(false);
    };

    currentAudio.play()
      .then(() => {
        setIsPlaying(true);
        setIsLoading(false);
        logger.log('✅ 背景音乐播放成功! 当前曲目:', MUSIC_PLAYLIST[currentIndex]);
      })
      .catch((error) => {
        logger.error('❌ 背景音乐播放失败:', error);
        setIsLoading(false);
      });
  };

  // Play music
  const play = async (): Promise<void> => {
    logger.log('🎵 播放背景音乐请求', { enabled, volume, isPlaying: audioElementsRef.current.length > 0 });

    if (!enabled) {
      logger.warn('⚠️ 背景音乐未启用');
      return;
    }

    if (audioElementsRef.current.length === 0) {
      logger.error('❌ 背景音乐文件未加载');
      return;
    }

    setIsLoading(true);

    // Play current track
    playNextTrack();
  };

  // Pause music
  const pause = (): void => {
    logger.log('⏸️ 暂停背景音乐');
    audioElementsRef.current.forEach((audio) => {
      audio.pause();
    });
    setIsPlaying(false);
  };

  // Stop music
  const stop = (): void => {
    logger.log('⏹️ 停止背景音乐');
    audioElementsRef.current.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    currentTrackIndexRef.current = 0;
    setIsPlaying(false);
  };

  return {
    isPlaying,
    isLoading,
    play,
    pause,
    stop,
    updateMusicFile: () => {},
  };
};
