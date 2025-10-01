// Retro Digital Pro - GTS4 Implementation
// Professional commercial watch face for square displays
// Version 2.0.0 - Fixed and optimized

import { getDeviceInfo } from '@zos/device'
import { createWidget, widget, align, prop, text_style, event } from '@zos/ui'
import { Time, HeartRate, Step, Calorie, Battery, Vibrator } from '@zos/sensor'
import { getLanguage } from '@zos/settings'
import { localStorage } from '@zos/storage'
import { createTimer, stopTimer } from '@zos/timer'

// Theme Collections (same as GTR4)
const THEME_COLLECTIONS = {
  classic: [
    { name: 'Retro Green', primary: 0x00FF41, secondary: 0x00CC33, accent: 0x66FF66, background: 0x000000, dim: 0x004411 },
    { name: 'Ice Blue', primary: 0x00BFFF, secondary: 0x0080FF, accent: 0x40E0FF, background: 0x000000, dim: 0x004466 },
    { name: 'Amber Gold', primary: 0xFFBF00, secondary: 0xCC9900, accent: 0xFFD700, background: 0x000000, dim: 0x664400 }
  ],
  gaming: [
    { name: 'Neon Pink', primary: 0xFF1493, secondary: 0xCC1177, accent: 0xFF69B4, background: 0x000000, dim: 0x660033 },
    { name: 'Cyber Purple', primary: 0x8A2BE2, secondary: 0x6A1B9A, accent: 0xDA70D6, background: 0x000000, dim: 0x330066 },
    { name: 'Matrix Green', primary: 0x39FF14, secondary: 0x2BCC10, accent: 0x5FFF5F, background: 0x000000, dim: 0x116611 }
  ],
  luxury: [
    { name: 'Rose Gold', primary: 0xFF9999, secondary: 0xCC7777, accent: 0xFFB3B3, background: 0x000000, dim: 0x663333 },
    { name: 'Platinum', primary: 0xC0C0C0, secondary: 0x999999, accent: 0xE0E0E0, background: 0x000000, dim: 0x444444 },
    { name: 'Deep Blue', primary: 0x4169E1, secondary: 0x2E4BC6, accent: 0x6495ED, background: 0x000000, dim: 0x224466 }
  ]
}

const COLLECTIONS = ['classic', 'gaming', 'luxury']

// Update intervals for battery optimization
const UPDATE_INTERVALS = {
  time: 1000,      // Update seconds
  health: 30000,   // Update health data every 30 seconds
  battery: 300000, // Update battery every 5 minutes
  date: 60000     // Update date every minute
}

// Global state
let currentCollectionIndex = 0
let currentThemeIndex = 0
let currentTheme = THEME_COLLECTIONS.classic[0]
let is24Hour = true
let widgets = {}
let sensors = {}
let timers = {}
let vibrator = null
let lastTapTime = 0

// Device info
const deviceInfo = getDeviceInfo()
const { width, height } = deviceInfo

// Responsive pixel function for GTS4
function px(value) {
  const scaleFactor = width / 390 // GTS4 base width
  return Math.round(value * scaleFactor)
}

// Format numbers with K/M suffix
function formatNumber(num) {
  if (!num || num < 0) return '0'
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  return num.toString()
}

// Format time using Time sensor
function formatTime(time) {
  if (!time) return is24Hour ? '00:00:00' : '12:00:00 AM'

  let hour = time.hour || 0
  let period = ''

  if (!is24Hour) {
    period = hour >= 12 ? ' PM' : ' AM'
    hour = hour % 12
    if (hour === 0) hour = 12
  }

  const minute = (time.minute || 0).toString().padStart(2, '0')
  const second = (time.second || 0).toString().padStart(2, '0')

  if (is24Hour) {
    return `${hour.toString().padStart(2, '0')}:${minute}:${second}`
  } else {
    return `${hour}:${minute}:${second}${period}`
  }
}

// Format date using Time sensor
function formatDate(time) {
  if (!time) return 'MON JAN 1'
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

  const dayName = days[time.week || 0]
  const monthName = months[(time.month || 1) - 1]
  const dayNum = time.day || 1

  return `${dayName} ${monthName} ${dayNum}`
}

// Load saved preferences
function loadPreferences() {
  try {
    const savedCollection = localStorage.getItem('theme_collection')
    const savedTheme = localStorage.getItem('theme_index')
    const saved24Hour = localStorage.getItem('is_24_hour')

    if (savedCollection !== undefined && savedCollection !== null) {
      currentCollectionIndex = parseInt(savedCollection)
      if (currentCollectionIndex < 0 || currentCollectionIndex >= COLLECTIONS.length) {
        currentCollectionIndex = 0
      }
    }

    if (savedTheme !== undefined && savedTheme !== null) {
      currentThemeIndex = parseInt(savedTheme)
      const collection = THEME_COLLECTIONS[COLLECTIONS[currentCollectionIndex]]
      if (currentThemeIndex < 0 || currentThemeIndex >= collection.length) {
        currentThemeIndex = 0
      }
    }

    // Load 24h preference or default to true
    if (saved24Hour !== undefined && saved24Hour !== null) {
      is24Hour = parseInt(saved24Hour) === 1
    }

    currentTheme = THEME_COLLECTIONS[COLLECTIONS[currentCollectionIndex]][currentThemeIndex]
  } catch (e) {
    console.log('Error loading preferences:', e)
    // Use defaults if loading fails
    currentCollectionIndex = 0
    currentThemeIndex = 0
    currentTheme = THEME_COLLECTIONS.classic[0]
  }
}

// Save preferences
function savePreferences() {
  try {
    localStorage.setItem('theme_collection', currentCollectionIndex)
    localStorage.setItem('theme_index', currentThemeIndex)
    localStorage.setItem('is_24_hour', is24Hour ? 1 : 0)
  } catch (e) {
    console.log('Error saving preferences:', e)
  }
}

// Anti-spam protection for touch events
function handleTap(callback) {
  const now = Date.now ? Date.now() : new Date().getTime()
  if (now - lastTapTime > 300) { // 300ms debounce
    lastTapTime = now
    callback()
  }
}

WatchFace({
  onInit() {
    console.log('Retro Digital Pro v2.0 - GTS4 initialized')
    loadPreferences()
  },

  build() {
    try {
      this.initSensors()
      this.initBackground()
      this.initTime()
      this.initDate()
      this.initHealthData()
      this.initBattery()
      this.initThemeInfo()
      this.initTouchZones()
      this.startTimers()
    } catch (e) {
      console.log('Build error:', e)
    }
  },

  initSensors() {
    // Initialize all sensors
    sensors.time = new Time()
    sensors.heartRate = new HeartRate()
    sensors.step = new Step()
    sensors.calorie = new Calorie()
    sensors.battery = new Battery()
    vibrator = new Vibrator()
  },

  initBackground() {
    // Main background
    widgets.background = createWidget(widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: width,
      h: height,
      color: currentTheme.background
    })

    // Square border design for GTS4
    widgets.outerFrame = createWidget(widget.STROKE_RECT, {
      x: px(8),
      y: px(8),
      w: width - px(16),
      h: height - px(16),
      line_width: px(2),
      color: currentTheme.dim
    })

    // Inner decorative frame
    widgets.innerFrame = createWidget(widget.STROKE_RECT, {
      x: px(12),
      y: px(12),
      w: width - px(24),
      h: height - px(24),
      line_width: px(1),
      color: currentTheme.secondary,
      alpha: 30
    })
  },

  initTime() {
    const timeData = sensors.time.getTime()
    const timeStr = formatTime(timeData)

    // Time background for square display
    widgets.timeGlow = createWidget(widget.FILL_RECT, {
      x: px(30),
      y: px(110),
      w: px(330),
      h: px(80),
      radius: px(8),
      color: currentTheme.secondary,
      alpha: 50
    })

    // Main time display - optimized for square
    widgets.timeText = createWidget(widget.TEXT, {
      x: px(35),
      y: px(115),
      w: px(320),
      h: px(70),
      text: timeStr,
      text_size: is24Hour ? px(56) : px(42),
      color: currentTheme.primary,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE
    })

    // Add invisible button over time to toggle 12/24h format
    widgets.timeBtn = createWidget(widget.BUTTON, {
      x: px(30),
      y: px(110),
      w: px(330),
      h: px(80),
      normal_color: 0x000000,
      press_color: 0x000000,
      alpha: 0,
      click_func: () => handleTap(() => this.toggle24Hour())
    })
  },

  initDate() {
    const timeData = sensors.time.getTime()
    const dateStr = formatDate(timeData)

    widgets.dateText = createWidget(widget.TEXT, {
      x: px(35),
      y: px(200),
      w: px(320),
      h: px(30),
      text: dateStr,
      text_size: px(20),
      color: currentTheme.accent,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE
    })
  },

  initHealthData() {
    // Adjusted layout for square display - 2x2 grid

    // Steps - Top Left
    widgets.stepsContainer = createWidget(widget.FILL_RECT, {
      x: px(30),
      y: px(245),
      w: px(165),
      h: px(45),
      radius: px(5),
      color: currentTheme.dim,
      alpha: 30
    })

    widgets.stepsText = createWidget(widget.TEXT, {
      x: px(30),
      y: px(248),
      w: px(165),
      h: px(18),
      text: 'STEPS',
      text_size: px(11),
      color: currentTheme.accent,
      align_h: align.CENTER_H,
      text_style: text_style.NONE
    })

    widgets.stepsValue = createWidget(widget.TEXT, {
      x: px(30),
      y: px(266),
      w: px(165),
      h: px(20),
      text: formatNumber(sensors.step.getCurrent()),
      text_size: px(16),
      color: currentTheme.primary,
      align_h: align.CENTER_H,
      text_style: text_style.NONE
    })

    // Heart Rate - Top Right
    widgets.heartContainer = createWidget(widget.FILL_RECT, {
      x: px(195),
      y: px(245),
      w: px(165),
      h: px(45),
      radius: px(5),
      color: 0x440000,
      alpha: 50
    })

    widgets.heartText = createWidget(widget.TEXT, {
      x: px(195),
      y: px(248),
      w: px(165),
      h: px(18),
      text: 'HEART',
      text_size: px(11),
      color: 0xFF6666,
      align_h: align.CENTER_H,
      text_style: text_style.NONE
    })

    const heartValue = sensors.heartRate.getCurrent()
    widgets.heartValue = createWidget(widget.TEXT, {
      x: px(195),
      y: px(266),
      w: px(165),
      h: px(20),
      text: heartValue > 0 ? heartValue.toString() : '--',
      text_size: px(16),
      color: 0xFF0000,
      align_h: align.CENTER_H,
      text_style: text_style.NONE
    })

    // Calories - Bottom Left
    widgets.caloriesContainer = createWidget(widget.FILL_RECT, {
      x: px(30),
      y: px(295),
      w: px(165),
      h: px(45),
      radius: px(5),
      color: currentTheme.dim,
      alpha: 30
    })

    widgets.caloriesText = createWidget(widget.TEXT, {
      x: px(30),
      y: px(298),
      w: px(165),
      h: px(18),
      text: 'KCAL',
      text_size: px(11),
      color: currentTheme.accent,
      align_h: align.CENTER_H,
      text_style: text_style.NONE
    })

    widgets.caloriesValue = createWidget(widget.TEXT, {
      x: px(30),
      y: px(316),
      w: px(165),
      h: px(20),
      text: formatNumber(sensors.calorie.getCurrent()),
      text_size: px(16),
      color: currentTheme.primary,
      align_h: align.CENTER_H,
      text_style: text_style.NONE
    })

    // Battery - Bottom Right
    const batteryValue = sensors.battery.getCurrent()
    const batteryColor = batteryValue > 20 ? 0x00FF00 : 0xFF0000

    widgets.batteryContainer = createWidget(widget.FILL_RECT, {
      x: px(195),
      y: px(295),
      w: px(165),
      h: px(45),
      radius: px(5),
      color: batteryValue > 20 ? 0x004400 : 0x440000,
      alpha: 50
    })

    widgets.batteryText = createWidget(widget.TEXT, {
      x: px(195),
      y: px(298),
      w: px(165),
      h: px(18),
      text: 'BATTERY',
      text_size: px(11),
      color: batteryColor,
      align_h: align.CENTER_H,
      text_style: text_style.NONE
    })

    widgets.batteryValue = createWidget(widget.TEXT, {
      x: px(195),
      y: px(316),
      w: px(165),
      h: px(20),
      text: `${batteryValue}%`,
      text_size: px(16),
      color: batteryColor,
      align_h: align.CENTER_H,
      text_style: text_style.NONE
    })
  },

  initBattery() {
    // Battery is integrated into health data grid for GTS4
    // No separate battery section needed
  },

  initThemeInfo() {
    const collection = COLLECTIONS[currentCollectionIndex]

    // Theme info at bottom - full width for square display
    widgets.themeContainer = createWidget(widget.FILL_RECT, {
      x: px(30),
      y: px(350),
      w: px(330),
      h: px(30),
      radius: px(5),
      color: currentTheme.dim,
      alpha: 20
    })

    widgets.themeText = createWidget(widget.TEXT, {
      x: px(30),
      y: px(355),
      w: px(330),
      h: px(20),
      text: `${collection.toUpperCase()} • ${currentTheme.name}`,
      text_size: px(12),
      color: currentTheme.dim,
      align_h: align.CENTER_H,
      text_style: text_style.NONE
    })
  },

  initTouchZones() {
    // Top zone - Change theme within collection
    widgets.topTouch = createWidget(widget.BUTTON, {
      x: 0,
      y: 0,
      w: width,
      h: Math.floor(height / 3),
      normal_color: 0x000000,
      press_color: 0x000000,
      alpha: 0,
      click_func: () => handleTap(() => this.changeTheme())
    })

    // Middle zone - Change collection
    widgets.middleTouch = createWidget(widget.BUTTON, {
      x: 0,
      y: Math.floor(height / 3),
      w: width,
      h: Math.floor(height / 3),
      normal_color: 0x000000,
      press_color: 0x000000,
      alpha: 0,
      click_func: () => handleTap(() => this.changeCollection())
    })

    // Bottom zone - Quick view with haptic feedback
    widgets.bottomTouch = createWidget(widget.BUTTON, {
      x: 0,
      y: Math.floor(height * 2 / 3),
      w: width,
      h: Math.floor(height / 3),
      normal_color: 0x000000,
      press_color: 0x000000,
      alpha: 0,
      click_func: () => handleTap(() => this.quickView())
    })
  },

  changeTheme() {
    const currentCollection = THEME_COLLECTIONS[COLLECTIONS[currentCollectionIndex]]
    currentThemeIndex = (currentThemeIndex + 1) % currentCollection.length
    currentTheme = currentCollection[currentThemeIndex]
    this.updateThemeColors()
    this.updateThemeInfo()
    savePreferences()

    // Haptic feedback
    if (vibrator) {
      vibrator.start()
      vibrator.stop()
    }
  },

  changeCollection() {
    currentCollectionIndex = (currentCollectionIndex + 1) % COLLECTIONS.length
    currentThemeIndex = 0
    currentTheme = THEME_COLLECTIONS[COLLECTIONS[currentCollectionIndex]][0]
    this.updateThemeColors()
    this.updateThemeInfo()
    savePreferences()

    // Double haptic for collection change
    if (vibrator) {
      vibrator.start()
      vibrator.stop()
      vibrator.start()
      vibrator.stop()
    }
  },

  toggle24Hour() {
    is24Hour = !is24Hour
    savePreferences()

    // Single haptic feedback
    if (vibrator) {
      vibrator.start()
      vibrator.stop()
    }

    // Update time text size for 12h format (needs more space for AM/PM)
    widgets.timeText.setProperty(prop.MORE, {
      text_size: is24Hour ? px(56) : px(42)
    })

    this.updateTime()
  },

  quickView() {
    // Show all data with highlight effect
    if (vibrator) {
      vibrator.start()
      vibrator.stop()
    }

    // Temporarily brighten display
    widgets.background.setProperty(prop.MORE, {
      color: 0x111111
    })

    // Restore after 2 seconds
    if (timers.quickView) {
      stopTimer(timers.quickView)
    }
    timers.quickView = createTimer(2000, 0, () => {
      widgets.background.setProperty(prop.MORE, {
        color: currentTheme.background
      })
    })

    // Force update all data
    this.updateHealthData()
  },

  updateThemeColors() {
    // Update all theme-dependent colors
    widgets.background.setProperty(prop.MORE, {
      color: currentTheme.background
    })
    widgets.outerFrame.setProperty(prop.MORE, {
      color: currentTheme.dim
    })
    widgets.innerFrame.setProperty(prop.MORE, {
      color: currentTheme.secondary
    })
    widgets.timeGlow.setProperty(prop.MORE, {
      color: currentTheme.secondary
    })
    widgets.timeText.setProperty(prop.MORE, {
      color: currentTheme.primary
    })
    widgets.dateText.setProperty(prop.MORE, {
      color: currentTheme.accent
    })

    // Update health data colors
    widgets.stepsContainer.setProperty(prop.MORE, {
      color: currentTheme.dim
    })
    widgets.stepsText.setProperty(prop.MORE, {
      color: currentTheme.accent
    })
    widgets.stepsValue.setProperty(prop.MORE, {
      color: currentTheme.primary
    })

    widgets.caloriesContainer.setProperty(prop.MORE, {
      color: currentTheme.dim
    })
    widgets.caloriesText.setProperty(prop.MORE, {
      color: currentTheme.accent
    })
    widgets.caloriesValue.setProperty(prop.MORE, {
      color: currentTheme.primary
    })

    widgets.themeContainer.setProperty(prop.MORE, {
      color: currentTheme.dim
    })
    widgets.themeText.setProperty(prop.MORE, {
      color: currentTheme.dim
    })
  },

  updateThemeInfo() {
    const collection = COLLECTIONS[currentCollectionIndex]
    widgets.themeText.setProperty(prop.MORE, {
      text: `${collection.toUpperCase()} • ${currentTheme.name}`
    })
  },

  updateTime() {
    try {
      const timeData = sensors.time.getTime()
      const timeStr = formatTime(timeData)
      widgets.timeText.setProperty(prop.MORE, {
        text: timeStr
      })
    } catch (e) {
      console.log('Error updating time:', e)
    }
  },

  updateDate() {
    try {
      const timeData = sensors.time.getTime()
      const dateStr = formatDate(timeData)
      widgets.dateText.setProperty(prop.MORE, {
        text: dateStr
      })
    } catch (e) {
      console.log('Error updating date:', e)
    }
  },

  updateHealthData() {
    try {
      // Update steps
      const steps = sensors.step.getCurrent()
      widgets.stepsValue.setProperty(prop.MORE, {
        text: formatNumber(steps)
      })

      // Update heart rate
      const heartRate = sensors.heartRate.getCurrent()
      widgets.heartValue.setProperty(prop.MORE, {
        text: heartRate > 0 ? heartRate.toString() : '--'
      })

      // Update calories
      const calories = sensors.calorie.getCurrent()
      widgets.caloriesValue.setProperty(prop.MORE, {
        text: formatNumber(calories)
      })

      // Update battery
      const batteryValue = sensors.battery.getCurrent()
      const batteryColor = batteryValue > 20 ? 0x00FF00 : 0xFF0000

      widgets.batteryValue.setProperty(prop.MORE, {
        text: `${batteryValue}%`,
        color: batteryColor
      })

      widgets.batteryText.setProperty(prop.MORE, {
        color: batteryColor
      })

      widgets.batteryContainer.setProperty(prop.MORE, {
        color: batteryValue > 20 ? 0x004400 : 0x440000
      })
    } catch (e) {
      console.log('Error updating health data:', e)
    }
  },

  startTimers() {
    // Time update timer (every second)
    timers.time = createTimer(UPDATE_INTERVALS.time, UPDATE_INTERVALS.time, () => {
      this.updateTime()
    })

    // Date update timer (every minute)
    timers.date = createTimer(UPDATE_INTERVALS.date, UPDATE_INTERVALS.date, () => {
      this.updateDate()
    })

    // Health data update timer (every 30 seconds)
    timers.health = createTimer(UPDATE_INTERVALS.health, UPDATE_INTERVALS.health, () => {
      this.updateHealthData()
    })
  },

  onDestroy() {
    console.log('Cleaning up resources...')

    // Stop all timers
    for (const timerKey in timers) {
      if (timers[timerKey]) {
        stopTimer(timers[timerKey])
      }
    }

    // Clean up sensors
    if (sensors.heartRate && sensors.heartRate.stop) {
      sensors.heartRate.stop()
    }

    // Save preferences before exit
    savePreferences()
  }
})