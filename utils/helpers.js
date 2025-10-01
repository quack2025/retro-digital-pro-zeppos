/**
 * Helper functions for Retro Digital Pro Watch Face
 * @module helpers
 */

import { DAYS, MONTHS } from './constants'

/**
 * Format number with K/M suffix for large values
 * @param {number} num - Number to format
 * @returns {string} Formatted string
 */
export function formatNumber(num) {
  if (!num || num < 0) return '0'
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

/**
 * Format time object to HH:MM:SS string
 * @param {Object} time - Time object from sensor
 * @returns {string} Formatted time string
 */
export function formatTime(time) {
  if (!time) return '00:00:00'

  const h = (time.hour || 0).toString().padStart(2, '0')
  const m = (time.minute || 0).toString().padStart(2, '0')
  const s = (time.second || 0).toString().padStart(2, '0')

  return `${h}:${m}:${s}`
}

/**
 * Format date object to DAY MON DATE string
 * @param {Object} time - Time object from sensor
 * @returns {string} Formatted date string
 */
export function formatDate(time) {
  if (!time) return 'MON JAN 1'

  const dayName = DAYS[time.week || 0]
  const monthName = MONTHS[(time.month || 1) - 1]
  const dayNum = time.day || 1

  return `${dayName} ${monthName} ${dayNum}`
}

/**
 * Get current timestamp for fallback
 * @returns {number} Current timestamp
 */
export function getCurrentTime() {
  try {
    return Date.now ? Date.now() : new Date().getTime()
  } catch (e) {
    // Fallback for Zepp OS environment
    return 0
  }
}

/**
 * Safe property update for widgets
 * @param {Widget} widget - Widget to update
 * @param {number} propType - Property type
 * @param {any} value - New value
 */
export function safeSetProperty(widget, propType, value) {
  try {
    if (widget && widget.setProperty) {
      widget.setProperty(propType, value)
    }
  } catch (e) {
    console.log('Property update error:', e)
  }
}

/**
 * Batch property update for widgets
 * @param {Widget} widget - Widget to update
 * @param {Object} props - Properties to update
 */
export function batchSetProperties(widget, props) {
  try {
    if (widget && widget.setProperty) {
      widget.setProperty(prop.MORE, props)
    }
  } catch (e) {
    console.log('Batch update error:', e)
  }
}

/**
 * Create responsive pixel value based on device width
 * @param {number} value - Base pixel value
 * @param {number} width - Device width
 * @param {number} baseWidth - Base design width
 * @returns {number} Scaled pixel value
 */
export function createPx(width, baseWidth) {
  return function px(value) {
    const scaleFactor = width / baseWidth
    return Math.round(value * scaleFactor)
  }
}