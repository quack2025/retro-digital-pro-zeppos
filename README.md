# Retro Digital Pro - Zepp OS Watch Face

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Zepp OS](https://img.shields.io/badge/Zepp%20OS-3.0+-green.svg)
![License](https://img.shields.io/badge/license-MIT-red.svg)

A premium digital watch face for Zepp OS smartwatches featuring 9 stunning color themes, real-time health monitoring, and persistent user preferences.

## 📱 Supported Devices

- **Amazfit GTR 4** (466x466 round display)
- **Amazfit GTS 4** (390x390 square display)
- **Amazfit GTR 3** (454x454 round display)
- **Amazfit GTS 4 Mini** (336x336 square display)

## ✨ Features

### Core Functionality
- **Real-time Display**: Hours, minutes, seconds with high-precision updates
- **Smart Date**: Day of week, month, and date
- **Health Monitoring**: Steps, heart rate, calories burned
- **Battery Indicator**: Visual battery percentage with color-coded alerts
- **Persistent Settings**: Your theme choice is saved between sessions

### Theme System
**9 Professional Themes across 3 Collections:**

#### Classic Collection
- **Retro Green**: Classic terminal-inspired green phosphor
- **Ice Blue**: Cool arctic blue tones
- **Amber Gold**: Warm vintage amber display

#### Gaming Collection
- **Neon Pink**: Cyberpunk-inspired hot pink
- **Cyber Purple**: Deep ultraviolet aesthetics
- **Matrix Green**: Digital rain green

#### Luxury Collection
- **Rose Gold**: Elegant metallic rose
- **Platinum**: Premium silver tones
- **Deep Blue**: Royal sapphire blue

### Interactive Zones
The watch face features intuitive touch interactions:
- **Tap on Time**: Toggle between 12-hour and 24-hour format
- **Top Third**: Cycle through themes within current collection
- **Middle Third**: Switch between collections (Classic/Gaming/Luxury)
- **Bottom Third**: Quick view with temporary backlight boost

### Performance Optimizations
- **Smart Update Intervals**:
  - Time: Every second
  - Health data: Every 30 seconds
  - Battery: Every 5 minutes
  - Date: Every minute
- **OLED Optimization**: Pure black background to save battery
- **Memory Management**: Proper resource cleanup and sensor management
- **Debounced Touch**: 300ms anti-spam protection

## 🚀 Installation

### For Users

1. **Via Zepp App Store** (Recommended):
   - Open Zepp app on your phone
   - Navigate to Profile → Watch Faces
   - Search for "Retro Digital Pro"
   - Tap Install

2. **Manual Installation**:
   - Download `retro-80s.zab` from releases
   - Open Zepp app
   - Go to Profile → Developer Mode
   - Install the .zab file

### For Developers

1. **Prerequisites**:
   ```bash
   # Install Node.js (v14+)
   # Install Zeus CLI globally
   npm install -g @zeppos/zeus-cli
   ```

2. **Setup**:
   ```bash
   # Clone repository
   git clone https://github.com/yourusername/retro-digital-pro.git
   cd retro-digital-pro

   # Install dependencies
   npm install
   ```

3. **Development**:
   ```bash
   # Start development server for GTR4
   npm run dev

   # For GTS4
   npm run dev:gts4

   # Preview in simulator
   npm run preview
   ```

4. **Build**:
   ```bash
   # Build for all devices
   npm run build

   # Package will be created in dist/
   ```

## 📁 Project Structure

```
retro-digital-pro/
├── assets/
│   ├── gtr4/
│   │   └── index.js        # GTR4 watch face code
│   ├── gts4/
│   │   └── index.js        # GTS4 watch face code
│   ├── gtr3/
│   │   └── index.js        # GTR3 watch face code
│   └── gts4mini/
│       └── index.js        # GTS4 Mini watch face code
├── dist/                   # Build output
├── app.json               # App configuration
├── package.json           # Dependencies
├── README.md             # This file
├── COMPLIANCE.md         # Store compliance checklist
├── API.md               # API documentation
├── USER_MANUAL.md       # User guide
└── CHANGELOG.md         # Version history
```

## ⚙️ Configuration

### app.json Structure
```json
{
  "configVersion": "v2",
  "app": {
    "appId": 1091559,
    "appName": "Retro 80's",
    "appType": "watchface",
    "version": {
      "code": 1,
      "name": "2.0.0"
    }
  }
}
```

### Required Permissions
- `data:user.hd.step` - Step counting
- `data:user.hd.calorie` - Calorie tracking
- `data:user.hd.heart_rate` - Heart rate monitoring
- `data:user.hd.battery` - Battery status

## 🛠️ Development Guide

### Creating New Themes

Add new themes to the `THEME_COLLECTIONS` object:

```javascript
const THEME_COLLECTIONS = {
  yourCollection: [
    {
      name: 'Theme Name',
      primary: 0xRRGGBB,    // Main text color
      secondary: 0xRRGGBB,  // Glow effect color
      accent: 0xRRGGBB,     // Date and labels
      background: 0x000000, // Keep black for OLED
      dim: 0xRRGGBB        // Subtle elements
    }
  ]
}
```

### Modifying Update Intervals

Adjust the `UPDATE_INTERVALS` constant for battery optimization:

```javascript
const UPDATE_INTERVALS = {
  time: 1000,      // Milliseconds
  health: 30000,
  battery: 300000,
  date: 60000
}
```

### Adding New Sensors

```javascript
// Import sensor
import { NewSensor } from '@zos/sensor'

// Initialize in initSensors()
sensors.newSensor = new NewSensor()

// Read data
const value = sensors.newSensor.getCurrent()
```

## 🐛 Debugging

### Zeus CLI Commands
```bash
# View logs
zeus dev --log

# Clear cache
zeus dev --clear

# Specific device testing
zeus dev -t gtr4
zeus dev -t gts4
```

### Common Issues

1. **Timer not updating**: Check timer imports and initialization
2. **Sensors returning null**: Ensure permissions in app.json
3. **Theme not persisting**: Verify localStorage implementation
4. **Touch zones not working**: Check button widget boundaries

## 📊 Performance Metrics

- **Memory Usage**: ~2MB average
- **Battery Impact**: <5% daily with default settings
- **Update Latency**: <16ms per frame
- **Storage**: <100KB for preferences

## 🔒 Security & Privacy

- **No Network Access**: Completely offline operation
- **No Data Collection**: All data stays on device
- **Local Storage Only**: Theme preferences stored locally
- **No Third-Party Libraries**: Pure Zepp OS implementation

## 📝 License

MIT License - See [LICENSE](LICENSE) file for details

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/retro-digital-pro/issues)
- **Email**: support@yourdomain.com
- **Zepp Forum**: [Discussion Thread](#)

## 🙏 Acknowledgments

- Zepp OS Development Team
- Amazfit Community
- Beta Testers

## 📈 Version History

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

---

**Made with ❤️ for Zepp OS**