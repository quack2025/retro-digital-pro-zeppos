// Retro Digital Pro - Utility Functions
// Professional utility functions for commercial watch face

import { getDeviceInfo } from '@zos/device'

// Device detection and responsive utilities
export function getDeviceConfig() {
  const deviceInfo = getDeviceInfo()
  const { width, height, screenShape } = deviceInfo
  
  // Determine device type and responsive settings
  const isRound = screenShape === 'ROUND' || width === height
  const deviceType = isRound ? 'round' : 'rect'
  
  // Base scale factor based on design width
  const designWidth = isRound ? 466 : 390 // GTR4 vs GTS4 base
  const scaleFactor = width / designWidth
  
  return {
    width,
    height,
    screenShape,
    isRound,
    deviceType,
    scaleFactor,
    designWidth,
    // Touch zones for interactions
    touchZones: {
      top: { y: 0, height: Math.floor(height / 3) },
      middle: { y: Math.floor(height / 3), height: Math.floor(height / 3) },
      bottom: { y: Math.floor(height * 2 / 3), height: Math.floor(height / 3) }
    }
  }
}

// Responsive pixel calculation
export function px(value, config = null) {
  if (!config) config = getDeviceConfig()
  return Math.round(value * config.scaleFactor)
}

// Format numbers for display (12.5K format)
export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

// Format time with leading zeros
export function formatTime(hours, minutes, seconds = null, is24Hour = true) {
  let displayHours = hours
  let ampm = ''
  
  if (!is24Hour) {
    ampm = hours >= 12 ? 'PM' : 'AM'
    displayHours = hours % 12
    if (displayHours === 0) displayHours = 12
  }
  
  const timeStr = `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  
  if (seconds !== null) {
    return `${timeStr}:${seconds.toString().padStart(2, '0')}${ampm ? ' ' + ampm : ''}`
  }
  
  return timeStr + (ampm ? ' ' + ampm : '')
}

// Format date for display
export function formatDate(date) {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 
                  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  
  const dayName = days[date.getDay()]
  const monthName = months[date.getMonth()]
  const dayNum = date.getDate()
  
  return {
    dayName,
    dateStr: `${monthName} ${dayNum}`,
    fullStr: `${dayName} ${monthName} ${dayNum}`
  }
}

// Battery status utilities
export function getBatteryStatus(level) {
  return {
    level,
    isLow: level < 20,
    isCritical: level < 10,
    displayText: `${level}%`,
    color: level < 20 ? 0xFF0000 : level < 50 ? 0xFFAA00 : 0x00FF00
  }
}

// Heart rate status utilities
export function getHeartRateStatus(bpm) {
  if (bpm === 0 || !bpm) {
    return {
      bpm: 0,
      displayText: '--',
      status: 'inactive',
      color: 0x666666
    }
  }
  
  let status = 'normal'
  let color = 0x00FF00
  
  if (bpm > 100) {
    status = 'high'
    color = 0xFF6600
  } else if (bpm < 60) {
    status = 'low'  
    color = 0x00AAFF
  }
  
  return {
    bpm,
    displayText: bpm.toString(),
    status,
    color
  }
}

// Layout calculation for different screen shapes
export function calculateLayout(config) {
  const { width, height, isRound, scaleFactor } = config
  
  if (isRound) {
    // Round layout (GTR series)
    return {
      time: {
        x: px(50, config),
        y: px(120, config),
        w: px(366, config),
        h: px(100, config),
        fontSize: px(72, config)
      },
      date: {
        x: px(50, config),
        y: px(240, config),
        w: px(366, config),
        h: px(40, config),
        fontSize: px(24, config)
      },
      healthData: {
        steps: { x: px(40, config), y: px(320, config), w: px(120, config), fontSize: px(20, config) },
        heartRate: { x: px(173, config), y: px(320, config), w: px(120, config), fontSize: px(20, config) },
        calories: { x: px(306, config), y: px(320, config), w: px(120, config), fontSize: px(20, config) },
        battery: { x: px(173, config), y: px(380, config), w: px(120, config), fontSize: px(18, config) }
      },
      theme: {
        x: px(40, config),
        y: px(380, config),
        w: px(120, config),
        fontSize: px(16, config)
      }
    }
  } else {
    // Rectangular layout (GTS series)
    return {
      time: {
        x: px(40, config),
        y: px(100, config),
        w: px(310, config),
        h: px(80, config),
        fontSize: px(60, config)
      },
      date: {
        x: px(40, config),
        y: px(200, config),
        w: px(310, config),
        h: px(35, config),
        fontSize: px(20, config)
      },
      healthData: {
        steps: { x: px(30, config), y: px(280, config), w: px(100, config), fontSize: px(18, config) },
        heartRate: { x: px(145, config), y: px(280, config), w: px(100, config), fontSize: px(18, config) },
        calories: { x: px(260, config), y: px(280, config), w: px(100, config), fontSize: px(18, config) },
        battery: { x: px(145, config), y: px(330, config), w: px(100, config), fontSize: px(16, config) }
      },
      theme: {
        x: px(30, config),
        y: px(330, config),
        w: px(100, config),
        fontSize: px(14, config)
      }
    }
  }
}

// Performance optimization utilities
export function throttle(func, limit) {
  let lastFunc
  let lastRan
  return function() {
    const context = this
    const args = arguments
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}

// Storage utilities
export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (e) {
    console.log('Storage save failed:', e)
    return false
  }
}

export function loadFromStorage(key, defaultValue = null) {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  } catch (e) {
    console.log('Storage load failed:', e)
    return defaultValue
  }
}