import { VoiceLanguage, VoiceGender } from '../types';
import { logger } from './logger';

// Cache for available voices
let cachedVoices: SpeechSynthesisVoice[] | null = null;

/**
 * Gets available voices from the browser
 * Results are cached for performance
 * @returns Array of available speech synthesis voices
 */
export const getVoices = (): SpeechSynthesisVoice[] => {
  if (!cachedVoices || cachedVoices.length === 0) {
    cachedVoices = window.speechSynthesis.getVoices();
    logger.info('Voices loaded and cached:', cachedVoices.length);
  }
  return cachedVoices;
};

// Refresh voice cache when voices change
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
    logger.info('Voices cache refreshed:', cachedVoices.length);
  };
}

/**
 * Speaks a number or custom text using speech synthesis
 * @param number - Number to speak
 * @param language - Voice language (zh or en)
 * @param gender - Voice gender preference
 * @param volume - Volume level (0-1)
 * @param rate - Speech rate (0.1-10)
 * @param customText - Optional custom text to speak instead of number
 * @returns Promise that resolves when speech completes
 */
export const speakNumber = (
  number: number,
  language: VoiceLanguage,
  gender: VoiceGender,
  volume: number,
  rate: number,
  customText?: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Get the translated number text or use custom text
      const text = customText || getNumberText(number, language);

      logger.log('语音合成开始:', {
        text,
        language,
        gender,
        volume,
        rate,
        customText
      });

      // Check if speech synthesis is supported
      if (!('speechSynthesis' in window)) {
        const error = new Error('浏览器不支持语音合成');
        logger.error(error.message);
        reject(error);
        return;
      }

      // Create utterance
      const utterance = new SpeechSynthesisUtterance(text);

      // Set language
      utterance.lang = language === 'zh' ? 'zh-CN' : 'en-US';

      // Set volume
      utterance.volume = volume;

      // Set rate (adjust based on BPM)
      utterance.rate = rate;

      // Set pitch based on gender
      utterance.pitch = gender === 'male' ? 0.8 : 1.2;

      // Select appropriate voice
      const voices = getVoices();
      logger.log('可用语音数量:', voices.length);
      const suitableVoice = selectVoice(voices, language, gender);
      if (suitableVoice) {
        utterance.voice = suitableVoice;
        logger.log('选择的语音:', suitableVoice.name, suitableVoice.lang);
      } else {
        logger.warn('未找到合适的语音，使用默认语音');
      }

      // Event handlers
      utterance.onend = () => {
        logger.log('语音合成完成:', text);
        resolve();
      };
      utterance.onerror = (event) => {
        logger.error('语音合成错误:', {
          error: event.error,
          text,
          utterance: event.utterance?.text
        });
        // Don't reject on "interrupted" or "canceled" errors as they're expected
        // when rapidly playing beats
        if (event.error === 'interrupted' || event.error === 'canceled') {
          logger.log('语音被中断，视为正常');
          resolve();
        } else {
          reject(event);
        }
      };

      // Speak
      window.speechSynthesis.speak(utterance);
      logger.log('语音合成请求已发送');
    } catch (error) {
      logger.error('语音合成异常:', error);
      reject(error);
    }
  });
};

/**
 * Converts a number to its text representation in the specified language
 * @param number - Number to convert
 * @param language - Target language
 * @returns Text representation of the number
 */
const getNumberText = (number: number, language: VoiceLanguage): string => {
  if (language === 'zh') {
    return numberToChinese(number);
  } else {
    return numberToEnglish(number);
  }
};

/**
 * Converts a number to Chinese text
 * @param num - Number to convert (1-20 supported)
 * @returns Chinese text representation
 */
const numberToChinese = (num: number): string => {
  const chinese = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十'];

  if (num <= 20) {
    return chinese[num - 1];
  }

  // For numbers > 20, use basic conversion
  return num.toString();
};

/**
 * Converts a number to English text
 * @param num - Number to convert (1-20 supported)
 * @returns English text representation
 */
const numberToEnglish = (num: number): string => {
  const english = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight',
    'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen',
    'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty'];

  if (num <= 20) {
    return english[num - 1];
  }

  return num.toString();
};

/**
 * Selects an appropriate voice based on language and gender preference
 * @param voices - Available voices
 * @param language - Desired language
 * @param gender - Desired gender
 * @returns Selected voice or null if none found
 */
const selectVoice = (
  voices: SpeechSynthesisVoice[],
  language: VoiceLanguage,
  gender: VoiceGender
): SpeechSynthesisVoice | null => {
  const langCode = language === 'zh' ? 'zh' : 'en';

  // Filter voices by language
  const langVoices = voices.filter(v => v.lang.toLowerCase().startsWith(langCode));

  if (langVoices.length === 0) {
    return null;
  }

  // Try to find gender-specific voice
  // Note: Not all voices specify gender, so we use name hints
  const genderKeywords = gender === 'male'
    ? ['male', 'david', 'daniel', 'james', 'google male']
    : ['female', 'zira', 'karen', 'samantha', 'google female', 'huihui', 'yaoyao'];

  // Try to find a voice with gender keywords in the name
  for (const voice of langVoices) {
    const nameLower = voice.name.toLowerCase();
    if (genderKeywords.some(keyword => nameLower.includes(keyword))) {
      return voice;
    }
  }

  // Fallback: return first available voice for the language
  return langVoices[0];
};

/**
 * Cancels any ongoing speech synthesis
 */
export const cancelSpeech = (): void => {
  window.speechSynthesis.cancel();
};

/**
 * Checks if speech synthesis is supported by the browser
 * @returns true if supported, false otherwise
 */
export const isSpeechSupported = (): boolean => {
  return 'speechSynthesis' in window;
};

/**
 * Calculates speech rate based on BPM
 * Higher BPM results in faster speech
 * @param bpm - Beats per minute
 * @returns Speech rate (0.5-2.5)
 */
export const calculateSpeechRate = (bpm: number): number => {
  // Base rate is 1.0 at 60 BPM
  // As BPM increases, rate increases more noticeably
  const baseRate = 1.0;
  const rateMultiplier = bpm / 60;

  // Calculate rate with more noticeable range
  let rate = baseRate * rateMultiplier;

  // Allow wider range: 0.5 (slow) to 2.5 (fast)
  rate = Math.min(Math.max(rate, 0.5), 2.5);

  logger.log('计算语速:', { bpm, rate });

  return rate;
};
