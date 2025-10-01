// Retro Digital Pro - Theme Configuration
// Professional color schemes for commercial watch face

export const THEME_COLLECTIONS = {
  classic: {
    name: 'Classic',
    themes: [
      {
        id: 'retro_green',
        name: 'Retro Green',
        primary: 0x00FF41,     // Classic green terminal
        secondary: 0x00CC33,   // Darker green
        accent: 0x66FF66,      // Light green
        background: 0x001100,  // Dark green tint
        text: 0x00FF41,
        dim: 0x004411
      },
      {
        id: 'ice_blue',
        name: 'Ice Blue', 
        primary: 0x00BFFF,     // Deep sky blue
        secondary: 0x0080FF,   // Medium blue
        accent: 0x40E0FF,      // Light blue
        background: 0x001122,  // Dark blue tint
        text: 0x00BFFF,
        dim: 0x004466
      },
      {
        id: 'amber_gold',
        name: 'Amber Gold',
        primary: 0xFFBF00,     // Amber/gold
        secondary: 0xCC9900,   // Darker gold
        accent: 0xFFD700,      // Bright gold
        background: 0x221100,  // Dark amber tint
        text: 0xFFBF00,
        dim: 0x664400
      }
    ]
  },
  gaming: {
    name: 'Gaming',
    themes: [
      {
        id: 'neon_pink',
        name: 'Neon Pink',
        primary: 0xFF1493,     // Deep pink
        secondary: 0xCC1177,   // Darker pink
        accent: 0xFF69B4,      // Hot pink
        background: 0x220011,  // Dark pink tint
        text: 0xFF1493,
        dim: 0x660033
      },
      {
        id: 'cyber_purple',
        name: 'Cyber Purple',
        primary: 0x8A2BE2,     // Blue violet
        secondary: 0x6A1B9A,   // Darker purple
        accent: 0xDA70D6,      // Orchid
        background: 0x110022,  // Dark purple tint
        text: 0x8A2BE2,
        dim: 0x330066
      },
      {
        id: 'matrix_green',
        name: 'Matrix Green',
        primary: 0x39FF14,     // Bright electric green
        secondary: 0x2BCC10,   // Medium green
        accent: 0x5FFF5F,      // Light electric green
        background: 0x001100,  // Dark matrix green
        text: 0x39FF14,
        dim: 0x116611
      }
    ]
  },
  luxury: {
    name: 'Luxury',
    themes: [
      {
        id: 'rose_gold',
        name: 'Rose Gold',
        primary: 0xFF9999,     // Rose gold
        secondary: 0xCC7777,   // Darker rose gold
        accent: 0xFFB3B3,      // Light rose gold
        background: 0x221111,  // Dark rose tint
        text: 0xFF9999,
        dim: 0x663333
      },
      {
        id: 'platinum',
        name: 'Platinum',
        primary: 0xC0C0C0,     // Silver/platinum
        secondary: 0x999999,   // Dark silver
        accent: 0xE0E0E0,      // Light silver
        background: 0x111111,  // Dark gray
        text: 0xC0C0C0,
        dim: 0x444444
      },
      {
        id: 'deep_blue',
        name: 'Deep Blue',
        primary: 0x4169E1,     // Royal blue
        secondary: 0x2E4BC6,   // Darker blue
        accent: 0x6495ED,      // Cornflower blue
        background: 0x001122,  // Dark navy
        text: 0x4169E1,
        dim: 0x224466
      }
    ]
  }
}

export const THEME_STORAGE_KEY = 'retro_digital_theme'
export const COLLECTION_STORAGE_KEY = 'retro_digital_collection'

export function getThemeByIndex(collectionId, themeIndex) {
  const collection = THEME_COLLECTIONS[collectionId]
  if (!collection || !collection.themes[themeIndex]) {
    // Fallback to first theme of classic collection
    return THEME_COLLECTIONS.classic.themes[0]
  }
  return collection.themes[themeIndex]
}

export function getNextTheme(currentCollectionId, currentThemeIndex) {
  const collection = THEME_COLLECTIONS[currentCollectionId]
  if (!collection) return { collectionId: 'classic', themeIndex: 0 }
  
  const nextIndex = (currentThemeIndex + 1) % collection.themes.length
  return { collectionId: currentCollectionId, themeIndex: nextIndex }
}

export function getNextCollection(currentCollectionId) {
  const collections = Object.keys(THEME_COLLECTIONS)
  const currentIndex = collections.indexOf(currentCollectionId)
  const nextIndex = (currentIndex + 1) % collections.length
  return { collectionId: collections[nextIndex], themeIndex: 0 }
}

export function formatThemeForDisplay(theme) {
  return {
    name: theme.name,
    colors: {
      primary: `#${theme.primary.toString(16).padStart(6, '0').toUpperCase()}`,
      secondary: `#${theme.secondary.toString(16).padStart(6, '0').toUpperCase()}`,
      accent: `#${theme.accent.toString(16).padStart(6, '0').toUpperCase()}`
    }
  }
}