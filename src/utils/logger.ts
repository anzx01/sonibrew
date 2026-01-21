/**
 * Logger utility for development and production environments
 * Automatically disables debug logs in production builds
 */

const isDevelopment = import.meta.env.DEV;

export const logger = {
  /**
   * Log debug information (only in development)
   */
  log: (...args: unknown[]): void => {
    if (isDevelopment) {
      console.log(...args);
    }
  },

  /**
   * Log warnings (always enabled)
   */
  warn: (...args: unknown[]): void => {
    console.warn(...args);
  },

  /**
   * Log errors (always enabled)
   */
  error: (...args: unknown[]): void => {
    console.error(...args);
  },

  /**
   * Log info messages (only in development)
   */
  info: (...args: unknown[]): void => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
};
