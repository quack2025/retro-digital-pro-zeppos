/**
 * Storage management for Retro Digital Pro Watch Face
 * @module storage
 */

import { localStorage } from '@zos/storage'

/**
 * Storage keys
 */
const STORAGE_KEYS = {
  COLLECTION: 'theme_collection',
  THEME: 'theme_index'
}

/**
 * Load saved preferences
 * @returns {Object} Saved preferences or defaults
 */
export function loadPreferences() {
  const preferences = {
    collectionIndex: 0,
    themeIndex: 0
  }

  try {
    const savedCollection = localStorage.getItem(STORAGE_KEYS.COLLECTION)
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME)

    if (savedCollection !== undefined && savedCollection !== null) {
      const index = parseInt(savedCollection)
      if (!isNaN(index) && index >= 0) {
        preferences.collectionIndex = index
      }
    }

    if (savedTheme !== undefined && savedTheme !== null) {
      const index = parseInt(savedTheme)
      if (!isNaN(index) && index >= 0) {
        preferences.themeIndex = index
      }
    }
  } catch (e) {
    console.log('Error loading preferences:', e)
  }

  return preferences
}

/**
 * Save preferences to storage
 * @param {number} collectionIndex - Collection index
 * @param {number} themeIndex - Theme index
 */
export function savePreferences(collectionIndex, themeIndex) {
  try {
    localStorage.setItem(STORAGE_KEYS.COLLECTION, collectionIndex)
    localStorage.setItem(STORAGE_KEYS.THEME, themeIndex)
  } catch (e) {
    console.log('Error saving preferences:', e)
  }
}

/**
 * Clear all saved preferences
 */
export function clearPreferences() {
  try {
    localStorage.removeItem(STORAGE_KEYS.COLLECTION)
    localStorage.removeItem(STORAGE_KEYS.THEME)
  } catch (e) {
    console.log('Error clearing preferences:', e)
  }
}