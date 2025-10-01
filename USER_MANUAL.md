# User Manual - Retro Digital Pro Watch Face

## Quick Start Guide

Welcome to Retro Digital Pro! This manual will help you get the most out of your new watch face.

## Installation

### Method 1: Zepp App Store (Easiest)
1. Open the **Zepp app** on your smartphone
2. Tap the **Profile** tab at the bottom
3. Select **My Devices** and choose your watch
4. Tap **Watch Faces** → **Watch Face Store**
5. Search for **"Retro Digital Pro"**
6. Tap **Download** and wait for installation

### Method 2: Manual Installation
1. Download the `retro-80s.zab` file
2. Open the **Zepp app**
3. Go to **Profile** → **Settings** → **Developer Mode**
4. Enable Developer Mode
5. Select **Install App** and choose the `.zab` file

## First Time Setup

When you first activate Retro Digital Pro:

1. The watch face will start with the **Classic Retro Green** theme
2. All health sensors will initialize and begin tracking
3. Your preferences will be automatically saved

## Understanding the Display

### Layout Overview

```
┌─────────────────────────┐
│                         │
│      12:45:30          │  ← Time (HH:MM:SS)
│                         │
│     MON MAR 15         │  ← Date (Day Month Date)
│                         │
│  STEPS    HEART        │
│  5,234     72          │  ← Health Data Row 1
│                         │
│  KCAL    BATTERY       │
│  425      85%          │  ← Health Data Row 2
│                         │
│  CLASSIC • Retro Green │  ← Current Theme
└─────────────────────────┘
```

### Display Elements

| Element | Description | Update Frequency |
|---------|-------------|------------------|
| Time | Hours:Minutes:Seconds | Every second |
| Date | Day of week, Month, Date | Every minute |
| Steps | Daily step count | Every 30 seconds |
| Heart | Current heart rate (BPM) | Every 30 seconds |
| KCAL | Calories burned today | Every 30 seconds |
| Battery | Watch battery percentage | Every 5 minutes |
| Theme | Current collection and theme name | On change |

## Using Touch Controls

The watch face has **three invisible touch zones**:

### Top Third - Change Theme
- **Tap** the upper portion of the screen
- Cycles through themes in current collection
- Single vibration confirms change
- Example: Retro Green → Ice Blue → Amber Gold → Retro Green

### Middle Third - Change Collection
- **Tap** the middle portion of the screen
- Switches between theme collections
- Double vibration confirms change
- Collections: Classic → Gaming → Luxury → Classic

### Bottom Third - Quick View
- **Tap** the lower portion of the screen
- Temporarily brightens the display
- Updates all health data immediately
- Single vibration feedback
- Display returns to normal after 2 seconds

## Theme Collections

### Classic Collection
Perfect for everyday use with timeless colors:
- **Retro Green**: Terminal-style phosphor green
- **Ice Blue**: Cool, professional blue
- **Amber Gold**: Warm, vintage computing amber

### Gaming Collection
Bold colors for gaming enthusiasts:
- **Neon Pink**: Bright cyberpunk pink
- **Cyber Purple**: Deep ultraviolet
- **Matrix Green**: Iconic digital rain green

### Luxury Collection
Sophisticated colors for formal occasions:
- **Rose Gold**: Elegant metallic rose
- **Platinum**: Premium silver tones
- **Deep Blue**: Royal sapphire blue

## Health Data

### Steps
- Shows your daily step count
- Automatically formats with K (thousands) suffix
- Example: 10,500 steps shows as "10.5K"
- Resets at midnight

### Heart Rate
- Displays current heart rate in BPM
- Shows "--" when not wearing watch
- Red color for easy visibility
- Updates every 30 seconds

### Calories
- Total calories burned today
- Includes basal metabolic rate + activity
- Formatted with K suffix if over 1000
- Resets at midnight

### Battery
- Watch battery percentage
- Color coded:
  - **Green**: Above 20%
  - **Red**: 20% or below
- Updates every 5 minutes

## Tips & Tricks

### Battery Optimization
1. The watch face is already optimized with:
   - Pure black background (OLED power saving)
   - Smart update intervals
   - Efficient resource management

2. For maximum battery life:
   - Avoid frequent theme changes
   - Use darker themes (less pixel illumination)
   - Quick View sparingly (brightens display)

### Best Visibility
- **Bright sunlight**: Use high-contrast themes (Retro Green, Matrix Green)
- **Dark environments**: Any theme works well
- **Professional settings**: Luxury collection themes
- **Night time**: Classic collection with lower brightness

### Theme Memory
- Your selected theme is automatically saved
- Persists through:
  - Watch face switches
  - Watch restarts
  - Software updates
- No need to reconfigure

## Troubleshooting

### Issue: Heart rate shows "--"
**Solution**:
- Ensure watch is worn properly (snug, not loose)
- Clean the sensor on the back of the watch
- Wait 30 seconds for next update

### Issue: Steps not updating
**Solution**:
- Move your arm naturally while walking
- Steps update every 30 seconds
- Check if step tracking is enabled in Zepp app

### Issue: Theme won't change
**Solution**:
- Tap firmly in the correct zone
- Wait for vibration feedback
- If no vibration, try tapping again after 1 second

### Issue: Display too dim/bright
**Solution**:
- Use Quick View (bottom tap) for temporary brightness
- Adjust watch brightness in system settings
- Choose appropriate theme for lighting conditions

### Issue: Battery draining quickly
**Solution**:
- Reduce frequency of Quick View usage
- Check if other apps are running
- Restart watch if unusual drain

## Gestures Summary

| Gesture | Zone | Action | Feedback |
|---------|------|--------|----------|
| Single Tap | Top | Next theme in collection | Single vibration |
| Single Tap | Middle | Next collection | Double vibration |
| Single Tap | Bottom | Quick View (2 seconds) | Single vibration |

## Data Accuracy

- **Steps**: ±5% typical accuracy
- **Heart Rate**: ±3 BPM when still
- **Calories**: Estimate based on activity and profile
- **Time**: Synced with phone time
- **Battery**: ±1% accuracy

## Frequently Asked Questions

**Q: How do I go back to a previous theme?**
A: Keep tapping the top zone to cycle through all themes in the collection.

**Q: Can I customize the colors?**
A: The 9 pre-designed themes are optimized for visibility and battery life. Custom themes require modifying the source code.

**Q: Why does the heart rate sometimes show "--"?**
A: This happens when the sensor can't get a reading. Ensure proper watch fit.

**Q: How often does the watch face update?**
A: Time updates every second, health data every 30 seconds, battery every 5 minutes.

**Q: Will my theme choice be saved?**
A: Yes, your theme selection is automatically saved and restored.

**Q: Does this watch face work offline?**
A: Yes, it's completely offline. No internet connection required.

**Q: How much battery does it use?**
A: Typically less than 5% per day with normal use.

**Q: Can I use this with Always-On Display?**
A: Yes, the pure black background is optimized for AOD mode.

## Privacy & Security

- **No data collection**: All data stays on your watch
- **No internet access**: Completely offline operation
- **Local storage only**: Theme preferences saved locally
- **No third-party services**: Pure Zepp OS implementation

## Support

For additional help:
- Check the [README.md](README.md) for technical details
- Visit the [API Documentation](API.md) for developers
- Report issues on GitHub
- Contact support via the Zepp app

## Version Information

- **Current Version**: 2.0.0
- **Zepp OS Required**: 3.0 or higher
- **Last Updated**: 2024

---

Enjoy your Retro Digital Pro watch face!