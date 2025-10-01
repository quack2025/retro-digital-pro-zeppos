/**
 * Retro Digital Pro - GTR4 Implementation
 * Version 2.1.0 - Cleaned and Optimized
 * Professional watch face for Amazfit GTR4 (466x466 round display)
 */

import { getDeviceInfo } from '@zos/device'
import { createWidget, widget, align, prop, text_style } from '@zos/ui'
import { Time, HeartRate, Step, Calorie, Battery, Vibrator } from '@zos/sensor'
import { localStorage } from '@zos/storage'
import { createTimer, stopTimer } from '@zos/timer'

// ============================================================================
// CONSTANTS
// ============================================================================

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
const UPDATE_INTERVALS = { time: 1000, health: 30000, battery: 300000, date: 60000 }
const COLORS = {
  heartRed: 0xFF0000, heartBg: 0x440000, heartDim: 0xFF6666,
  batteryGood: 0x00FF00, batteryLow: 0xFF0000,
  batteryGoodBg: 0x004400, batteryLowBg: 0x440000,
  quickViewBg: 0x111111
}

// ============================================================================
// DEVICE & STATE
// ============================================================================

const deviceInfo = getDeviceInfo()
const { width, height } = deviceInfo
const px = (value) => Math.round(value * width / 466)

const state = {
  currentCollectionIndex: 0,
  currentThemeIndex: 0,
  currentTheme: null,
  lastTapTime: 0
}

const widgets = {}
const sensors = {}
const timers = {}
let vibrator = null

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function formatNumber(num) {
  if (!num || num < 0) return '0'
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  return num.toString()
}

function formatTime(time) {
  if (!time) return '00:00:00'
  return [time.hour || 0, time.minute || 0, time.second || 0]
    .map(n => n.toString().padStart(2, '0'))
    .join(':')
}

function formatDate(time) {
  if (!time) return 'MON JAN 1'
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  return `${days[time.week || 0]} ${months[(time.month || 1) - 1]} ${time.day || 1}`
}

function loadPreferences() {
  try {
    const savedCollection = localStorage.getItem('theme_collection')
    const savedTheme = localStorage.getItem('theme_index')

    if (savedCollection !== undefined && savedCollection !== null) {
      state.currentCollectionIndex = Math.abs(parseInt(savedCollection)) % COLLECTIONS.length
    }

    if (savedTheme !== undefined && savedTheme !== null) {
      const collection = THEME_COLLECTIONS[COLLECTIONS[state.currentCollectionIndex]]
      state.currentThemeIndex = Math.abs(parseInt(savedTheme)) % collection.length
    }

    state.currentTheme = THEME_COLLECTIONS[COLLECTIONS[state.currentCollectionIndex]][state.currentThemeIndex]
  } catch (e) {
    state.currentTheme = THEME_COLLECTIONS.classic[0]
  }
}

function savePreferences() {
  try {
    localStorage.setItem('theme_collection', state.currentCollectionIndex)
    localStorage.setItem('theme_index', state.currentThemeIndex)
  } catch (e) {}
}

function handleTap(callback) {
  const now = Date.now ? Date.now() : new Date().getTime()
  if (now - state.lastTapTime > 300) {
    state.lastTapTime = now
    callback()
  }
}

function haptic(pattern = 'single') {
  if (!vibrator) return
  try {
    vibrator.start()
    vibrator.stop()
    if (pattern === 'double') {
      vibrator.start()
      vibrator.stop()
    }
  } catch (e) {}
}

// ============================================================================
// WATCHFACE IMPLEMENTATION
// ============================================================================

WatchFace({
  onInit() {
    loadPreferences()
  },

  build() {
    try {
      this.initSensors()
      this.initUI()
      this.startTimers()
    } catch (e) {
      console.log('Build error:', e)
    }
  },

  initSensors() {
    sensors.time = new Time()
    sensors.heartRate = new HeartRate()
    sensors.step = new Step()
    sensors.calorie = new Calorie()
    sensors.battery = new Battery()
    vibrator = new Vibrator()
  },

  initUI() {
    this.createBackground()
    this.createTimeDisplay()
    this.createDateDisplay()
    this.createHealthGrid()
    this.createThemeInfo()
    this.createTouchZones()
  },

  createBackground() {
    widgets.bg = createWidget(widget.FILL_RECT, {
      x: 0, y: 0, w: width, h: height,
      color: state.currentTheme.background
    })

    widgets.frame = createWidget(widget.STROKE_RECT, {
      x: px(10), y: px(10),
      w: width - px(20), h: height - px(20),
      line_width: px(2),
      color: state.currentTheme.dim
    })
  },

  createTimeDisplay() {
    widgets.timeGlow = createWidget(widget.FILL_RECT, {
      x: px(40), y: px(140), w: px(386), h: px(90),
      radius: px(10), color: state.currentTheme.secondary, alpha: 50
    })

    widgets.time = createWidget(widget.TEXT, {
      x: px(50), y: px(145), w: px(366), h: px(80),
      text: formatTime(sensors.time.getTime()),
      text_size: px(64), color: state.currentTheme.primary,
      align_h: align.CENTER_H, align_v: align.CENTER_V
    })
  },

  createDateDisplay() {
    widgets.date = createWidget(widget.TEXT, {
      x: px(50), y: px(245), w: px(366), h: px(35),
      text: formatDate(sensors.time.getTime()),
      text_size: px(22), color: state.currentTheme.accent,
      align_h: align.CENTER_H, align_v: align.CENTER_V
    })
  },

  createHealthGrid() {
    // Steps
    this.createHealthItem('steps', px(40), px(300),
      'STEPS', formatNumber(sensors.step.getCurrent()),
      state.currentTheme.dim, state.currentTheme.accent, state.currentTheme.primary)

    // Heart Rate
    const hr = sensors.heartRate.getCurrent()
    this.createHealthItem('heart', px(173), px(300),
      'HEART', hr > 0 ? hr.toString() : '--',
      COLORS.heartBg, COLORS.heartDim, COLORS.heartRed)

    // Calories
    this.createHealthItem('cal', px(306), px(300),
      'KCAL', formatNumber(sensors.calorie.getCurrent()),
      state.currentTheme.dim, state.currentTheme.accent, state.currentTheme.primary)

    // Battery
    const bat = sensors.battery.getCurrent()
    const batColor = bat > 20 ? COLORS.batteryGood : COLORS.batteryLow
    const batBg = bat > 20 ? COLORS.batteryGoodBg : COLORS.batteryLowBg
    this.createHealthItem('bat', px(173), px(365),
      'BATTERY', `${bat}%`, batBg, batColor, batColor)
  },

  createHealthItem(id, x, y, label, value, bgColor, labelColor, valueColor) {
    widgets[`${id}Bg`] = createWidget(widget.FILL_RECT, {
      x, y, w: px(120), h: px(50),
      radius: px(5), color: bgColor, alpha: 30
    })

    widgets[`${id}Label`] = createWidget(widget.TEXT, {
      x, y: y + px(5), w: px(120), h: px(20),
      text: label, text_size: px(12), color: labelColor,
      align_h: align.CENTER_H
    })

    widgets[`${id}Val`] = createWidget(widget.TEXT, {
      x, y: y + px(25), w: px(120), h: px(20),
      text: value, text_size: px(18), color: valueColor,
      align_h: align.CENTER_H
    })
  },

  createThemeInfo() {
    const collection = COLLECTIONS[state.currentCollectionIndex]

    widgets.themeBg = createWidget(widget.FILL_RECT, {
      x: px(40), y: px(365), w: px(120), h: px(40),
      radius: px(5), color: state.currentTheme.dim, alpha: 20
    })

    widgets.themeText = createWidget(widget.TEXT, {
      x: px(40), y: px(370), w: px(120), h: px(30),
      text: `${collection.toUpperCase()}\n${state.currentTheme.name}`,
      text_size: px(11), color: state.currentTheme.dim,
      align_h: align.CENTER_H, text_style: text_style.WRAP
    })
  },

  createTouchZones() {
    const h3 = Math.floor(height / 3)

    widgets.topBtn = createWidget(widget.BUTTON, {
      x: 0, y: 0, w: width, h: h3,
      normal_color: 0x000000, press_color: 0x000000, alpha: 0,
      click_func: () => handleTap(() => this.changeTheme())
    })

    widgets.midBtn = createWidget(widget.BUTTON, {
      x: 0, y: h3, w: width, h: h3,
      normal_color: 0x000000, press_color: 0x000000, alpha: 0,
      click_func: () => handleTap(() => this.changeCollection())
    })

    widgets.botBtn = createWidget(widget.BUTTON, {
      x: 0, y: h3 * 2, w: width, h: h3,
      normal_color: 0x000000, press_color: 0x000000, alpha: 0,
      click_func: () => handleTap(() => this.quickView())
    })
  },

  changeTheme() {
    const collection = THEME_COLLECTIONS[COLLECTIONS[state.currentCollectionIndex]]
    state.currentThemeIndex = (state.currentThemeIndex + 1) % collection.length
    state.currentTheme = collection[state.currentThemeIndex]
    this.updateThemeColors()
    savePreferences()
    haptic('single')
  },

  changeCollection() {
    state.currentCollectionIndex = (state.currentCollectionIndex + 1) % COLLECTIONS.length
    state.currentThemeIndex = 0
    state.currentTheme = THEME_COLLECTIONS[COLLECTIONS[state.currentCollectionIndex]][0]
    this.updateThemeColors()
    savePreferences()
    haptic('double')
  },

  quickView() {
    haptic('single')
    widgets.bg.setProperty(prop.COLOR, COLORS.quickViewBg)

    if (timers.quickView) stopTimer(timers.quickView)
    timers.quickView = createTimer(2000, 0, () => {
      widgets.bg.setProperty(prop.COLOR, state.currentTheme.background)
    })

    this.updateHealthData()
  },

  updateThemeColors() {
    const t = state.currentTheme
    const collection = COLLECTIONS[state.currentCollectionIndex]

    widgets.bg.setProperty(prop.COLOR, t.background)
    widgets.frame.setProperty(prop.COLOR, t.dim)
    widgets.timeGlow.setProperty(prop.COLOR, t.secondary)
    widgets.time.setProperty(prop.COLOR, t.primary)
    widgets.date.setProperty(prop.COLOR, t.accent)

    widgets.stepsBg.setProperty(prop.COLOR, t.dim)
    widgets.stepsLabel.setProperty(prop.COLOR, t.accent)
    widgets.stepsVal.setProperty(prop.COLOR, t.primary)

    widgets.calBg.setProperty(prop.COLOR, t.dim)
    widgets.calLabel.setProperty(prop.COLOR, t.accent)
    widgets.calVal.setProperty(prop.COLOR, t.primary)

    widgets.themeBg.setProperty(prop.COLOR, t.dim)
    widgets.themeText.setProperty(prop.MORE, {
      color: t.dim,
      text: `${collection.toUpperCase()}\n${t.name}`
    })
  },

  updateTime() {
    try {
      widgets.time.setProperty(prop.TEXT, formatTime(sensors.time.getTime()))
    } catch (e) {}
  },

  updateDate() {
    try {
      widgets.date.setProperty(prop.TEXT, formatDate(sensors.time.getTime()))
    } catch (e) {}
  },

  updateHealthData() {
    try {
      widgets.stepsVal.setProperty(prop.TEXT, formatNumber(sensors.step.getCurrent()))

      const hr = sensors.heartRate.getCurrent()
      widgets.heartVal.setProperty(prop.TEXT, hr > 0 ? hr.toString() : '--')

      widgets.calVal.setProperty(prop.TEXT, formatNumber(sensors.calorie.getCurrent()))

      const bat = sensors.battery.getCurrent()
      const batColor = bat > 20 ? COLORS.batteryGood : COLORS.batteryLow
      const batBg = bat > 20 ? COLORS.batteryGoodBg : COLORS.batteryLowBg

      widgets.batVal.setProperty(prop.MORE, {
        text: `${bat}%`, color: batColor
      })
      widgets.batLabel.setProperty(prop.COLOR, batColor)
      widgets.batBg.setProperty(prop.COLOR, batBg)
    } catch (e) {}
  },

  startTimers() {
    timers.time = createTimer(UPDATE_INTERVALS.time, UPDATE_INTERVALS.time, () => this.updateTime())
    timers.date = createTimer(UPDATE_INTERVALS.date, UPDATE_INTERVALS.date, () => this.updateDate())
    timers.health = createTimer(UPDATE_INTERVALS.health, UPDATE_INTERVALS.health, () => this.updateHealthData())
    timers.battery = createTimer(UPDATE_INTERVALS.battery, UPDATE_INTERVALS.battery, () => this.updateHealthData())
  },

  onDestroy() {
    Object.values(timers).forEach(timer => timer && stopTimer(timer))
    sensors.heartRate && sensors.heartRate.stop && sensors.heartRate.stop()
    savePreferences()
  }
})