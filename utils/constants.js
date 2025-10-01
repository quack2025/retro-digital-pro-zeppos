/**
 * Constants for Retro Digital Pro Watch Face
 * @module constants
 */

/**
 * Theme Collections
 * 9 themes across 3 collections
 */
export const THEME_COLLECTIONS = {
  classic: [
    {
      name: 'Retro Green',
      primary: 0x00FF41,
      secondary: 0x00CC33,
      accent: 0x66FF66,
      background: 0x000000,
      dim: 0x004411
    },
    {
      name: 'Ice Blue',
      primary: 0x00BFFF,
      secondary: 0x0080FF,
      accent: 0x40E0FF,
      background: 0x000000,
      dim: 0x004466
    },
    {
      name: 'Amber Gold',
      primary: 0xFFBF00,
      secondary: 0xCC9900,
      accent: 0xFFD700,
      background: 0x000000,
      dim: 0x664400
    }
  ],
  gaming: [
    {
      name: 'Neon Pink',
      primary: 0xFF1493,
      secondary: 0xCC1177,
      accent: 0xFF69B4,
      background: 0x000000,
      dim: 0x660033
    },
    {
      name: 'Cyber Purple',
      primary: 0x8A2BE2,
      secondary: 0x6A1B9A,
      accent: 0xDA70D6,
      background: 0x000000,
      dim: 0x330066
    },
    {
      name: 'Matrix Green',
      primary: 0x39FF14,
      secondary: 0x2BCC10,
      accent: 0x5FFF5F,
      background: 0x000000,
      dim: 0x116611
    }
  ],
  luxury: [
    {
      name: 'Rose Gold',
      primary: 0xFF9999,
      secondary: 0xCC7777,
      accent: 0xFFB3B3,
      background: 0x000000,
      dim: 0x663333
    },
    {
      name: 'Platinum',
      primary: 0xC0C0C0,
      secondary: 0x999999,
      accent: 0xE0E0E0,
      background: 0x000000,
      dim: 0x444444
    },
    {
      name: 'Deep Blue',
      primary: 0x4169E1,
      secondary: 0x2E4BC6,
      accent: 0x6495ED,
      background: 0x000000,
      dim: 0x224466
    }
  ]
}

/**
 * Collection names
 */
export const COLLECTIONS = ['classic', 'gaming', 'luxury']

/**
 * Update intervals in milliseconds
 * Optimized for battery life
 */
export const UPDATE_INTERVALS = {
  time: 1000,      // 1 second
  health: 30000,   // 30 seconds
  battery: 300000, // 5 minutes
  date: 60000      // 1 minute
}

/**
 * Touch debounce delay
 */
export const TOUCH_DEBOUNCE = 300 // milliseconds

/**
 * Quick view duration
 */
export const QUICK_VIEW_DURATION = 2000 // milliseconds

/**
 * Color codes for special elements
 */
export const COLORS = {
  heartRed: 0xFF0000,
  heartBg: 0x440000,
  heartDim: 0xFF6666,
  batteryGood: 0x00FF00,
  batteryLow: 0xFF0000,
  batteryGoodBg: 0x004400,
  batteryLowBg: 0x440000,
  quickViewBg: 0x111111
}

/**
 * Battery threshold for color change
 */
export const BATTERY_THRESHOLD = 20 // percent

/**
 * Date/time formatting arrays
 */
export const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
export const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']