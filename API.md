# API Documentation - Retro Digital Pro

## Table of Contents
- [Core Functions](#core-functions)
- [Sensor APIs](#sensor-apis)
- [Widget System](#widget-system)
- [Storage API](#storage-api)
- [Timer Management](#timer-management)
- [Theme System](#theme-system)
- [Touch Handling](#touch-handling)

## Core Functions

### WatchFace Object

The main watch face lifecycle object:

```javascript
WatchFace({
  onInit() {
    // Called when watch face initializes
    // Load preferences, setup initial state
  },

  build() {
    // Called to build the UI
    // Create all widgets and start timers
  },

  onDestroy() {
    // Called when watch face is destroyed
    // Clean up resources, save state
  }
})
```

### Device Information

```javascript
import { getDeviceInfo } from '@zos/device'

const deviceInfo = getDeviceInfo()
const { width, height } = deviceInfo
// width: 466 (GTR4) or 390 (GTS4)
// height: 466 (GTR4) or 390 (GTS4)
```

### Responsive Scaling

```javascript
function px(value) {
  const scaleFactor = width / baseWidth
  return Math.round(value * scaleFactor)
}
```

## Sensor APIs

### Time Sensor

```javascript
import { Time } from '@zos/sensor'

const timeSensor = new Time()
const timeData = timeSensor.getTime()

// Returns object:
{
  hour: 14,        // 0-23
  minute: 30,      // 0-59
  second: 45,      // 0-59
  week: 2,         // 0-6 (Sunday = 0)
  month: 3,        // 1-12
  day: 15,         // 1-31
  year: 2024
}
```

### Heart Rate Sensor

```javascript
import { HeartRate } from '@zos/sensor'

const heartSensor = new HeartRate()
const bpm = heartSensor.getCurrent() // Returns beats per minute or 0 if not available

// Optional: Listen for changes
heartSensor.onChange((value) => {
  console.log('Heart rate:', value)
})

// Clean up
heartSensor.stop()
```

### Step Counter

```javascript
import { Step } from '@zos/sensor'

const stepSensor = new Step()
const steps = stepSensor.getCurrent() // Returns step count for today
const target = stepSensor.getTarget()  // Returns daily step goal
```

### Calorie Sensor

```javascript
import { Calorie } from '@zos/sensor'

const calorieSensor = new Calorie()
const burned = calorieSensor.getCurrent() // Returns calories burned today
```

### Battery Sensor

```javascript
import { Battery } from '@zos/sensor'

const batterySensor = new Battery()
const level = batterySensor.getCurrent() // Returns 0-100 percentage
```

### Vibrator

```javascript
import { Vibrator } from '@zos/sensor'

const vibrator = new Vibrator()
vibrator.start()  // Start vibration
vibrator.stop()   // Stop vibration

// Vibration patterns
vibrator.start()
setTimeout(() => vibrator.stop(), 100) // 100ms vibration
```

## Widget System

### Text Widget

```javascript
import { createWidget, widget, align, text_style } from '@zos/ui'

const textWidget = createWidget(widget.TEXT, {
  x: 100,                        // X position
  y: 100,                        // Y position
  w: 200,                        // Width
  h: 50,                         // Height
  text: 'Hello World',           // Text content
  text_size: 24,                 // Font size
  color: 0xFFFFFF,              // Color (0xRRGGBB)
  align_h: align.CENTER_H,      // Horizontal alignment
  align_v: align.CENTER_V,      // Vertical alignment
  text_style: text_style.WRAP   // Text wrapping
})

// Update text
textWidget.setProperty(prop.MORE, {
  text: 'New Text',
  color: 0xFF0000
})
```

### Rectangle Widget

```javascript
const rect = createWidget(widget.FILL_RECT, {
  x: 0,
  y: 0,
  w: 100,
  h: 100,
  color: 0xFF0000,    // Fill color
  radius: 10,         // Corner radius
  alpha: 255          // Opacity (0-255)
})
```

### Stroke Rectangle

```javascript
const frame = createWidget(widget.STROKE_RECT, {
  x: 10,
  y: 10,
  w: 100,
  h: 100,
  line_width: 2,      // Stroke width
  color: 0xFFFFFF     // Stroke color
})
```

### Button Widget

```javascript
const button = createWidget(widget.BUTTON, {
  x: 0,
  y: 0,
  w: 100,
  h: 100,
  normal_color: 0x000000,   // Normal state color
  press_color: 0x333333,    // Pressed state color
  alpha: 0,                 // Transparency (0 = invisible)
  click_func: () => {
    // Handle click event
    console.log('Button clicked')
  }
})
```

### Updating Widget Properties

```javascript
import { prop } from '@zos/ui'

// Update single property
widget.setProperty(prop.COLOR, 0xFF0000)

// Update multiple properties
widget.setProperty(prop.MORE, {
  x: 100,
  y: 200,
  color: 0x00FF00,
  text: 'Updated'
})
```

## Storage API

### Local Storage

```javascript
import { localStorage } from '@zos/storage'

// Save data
localStorage.setItem('key', 'value')
localStorage.setItem('theme_index', 2)

// Load data
const value = localStorage.getItem('key')
const theme = localStorage.getItem('theme_index')

// Remove data
localStorage.removeItem('key')

// Clear all data
localStorage.clear()
```

### Error Handling

```javascript
try {
  localStorage.setItem('data', JSON.stringify(object))
} catch (e) {
  console.log('Storage error:', e)
}
```

## Timer Management

### Creating Timers

```javascript
import { createTimer, stopTimer } from '@zos/timer'

// Create repeating timer
const timer = createTimer(
  1000,     // Initial delay (ms)
  1000,     // Repeat interval (ms)
  () => {
    // Callback function
    updateTime()
  }
)

// Create one-time timer
const onceTimer = createTimer(
  2000,     // Delay (ms)
  0,        // No repeat
  () => {
    console.log('Executed once')
  }
)
```

### Stopping Timers

```javascript
stopTimer(timer)

// Stop all timers
for (const key in timers) {
  if (timers[key]) {
    stopTimer(timers[key])
  }
}
```

## Theme System

### Theme Structure

```javascript
const theme = {
  name: 'Retro Green',
  primary: 0x00FF41,    // Main text color
  secondary: 0x00CC33,  // Glow effects
  accent: 0x66FF66,     // Date and labels
  background: 0x000000, // Background (black for OLED)
  dim: 0x004411        // Subtle UI elements
}
```

### Theme Collections

```javascript
const THEME_COLLECTIONS = {
  classic: [...themes],
  gaming: [...themes],
  luxury: [...themes]
}
```

### Theme Switching

```javascript
function changeTheme() {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length
  currentTheme = themes[currentThemeIndex]
  updateThemeColors()
  savePreferences()
}

function updateThemeColors() {
  widgets.text.setProperty(prop.MORE, {
    color: currentTheme.primary
  })
  // Update all themed widgets...
}
```

## Touch Handling

### Zone Detection

```javascript
// Divide screen into three zones
const zones = {
  top: {
    y: 0,
    h: height / 3,
    action: changeTheme
  },
  middle: {
    y: height / 3,
    h: height / 3,
    action: changeCollection
  },
  bottom: {
    y: (height * 2) / 3,
    h: height / 3,
    action: quickView
  }
}
```

### Debouncing

```javascript
let lastTapTime = 0

function handleTap(callback) {
  const now = Date.now()
  if (now - lastTapTime > 300) { // 300ms debounce
    lastTapTime = now
    callback()
  }
}
```

## Best Practices

### Memory Management

1. **Clean up sensors on destroy**:
```javascript
onDestroy() {
  if (sensors.heartRate) {
    sensors.heartRate.stop()
  }
}
```

2. **Reuse widgets when possible**:
```javascript
// Instead of creating new widgets, update existing ones
widget.setProperty(prop.MORE, { text: newValue })
```

3. **Batch updates**:
```javascript
// Good - single update
widget.setProperty(prop.MORE, {
  text: 'New',
  color: 0xFF0000,
  x: 100
})

// Bad - multiple updates
widget.setProperty(prop.TEXT, 'New')
widget.setProperty(prop.COLOR, 0xFF0000)
widget.setProperty(prop.X, 100)
```

### Performance Optimization

1. **Use appropriate update intervals**:
```javascript
const UPDATE_INTERVALS = {
  time: 1000,      // 1 second for time
  health: 30000,   // 30 seconds for health
  battery: 300000  // 5 minutes for battery
}
```

2. **Minimize sensor reads**:
```javascript
// Cache sensor values
let cachedSteps = 0

function updateSteps() {
  cachedSteps = stepSensor.getCurrent()
  widget.setProperty(prop.TEXT, cachedSteps)
}
```

3. **Use try-catch for stability**:
```javascript
try {
  const value = sensor.getCurrent()
  updateWidget(value)
} catch (e) {
  console.log('Sensor error:', e)
  // Use fallback value
}
```

## Error Codes

| Code | Description | Solution |
|------|-------------|----------|
| E001 | Timer not imported | Import from '@zos/timer' |
| E002 | Sensor not available | Check permissions in app.json |
| E003 | Storage full | Clear unused data |
| E004 | Widget creation failed | Check parameters |
| E005 | Invalid color format | Use 0xRRGGBB format |

## Debugging

### Console Logging

```javascript
console.log('Debug message')
console.error('Error message')
console.warn('Warning message')
```

### View logs with Zeus CLI:
```bash
zeus dev --log
```

---

For more information, visit the [Zepp OS Documentation](https://docs.zepp.com/)