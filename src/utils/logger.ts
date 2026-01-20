/**
 * Logger utility for development and production environments
 * Automatically disables debug logs in production builds
 */

const isDevelopment = import.meta.env.DEV;

export const logger = {
  /**
   * Log debug information (only in development)
   */
  log: (...args: any[]): void => {
    if (isDevelopment) {
      console.log(...args);
    }
  },

  /**
   * Log warnings (always enabled)
   */
  warn: (...args: any[]): void => {
    console.warn(...args);
  },

  /**
   * Log errors (always enabled)
   */
  error: (...args: any[]): void => {
    console.error(...args);
  },

  /**
   * Log info messages (only in development)
   */
  info: (...args: any[]): void => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
};
