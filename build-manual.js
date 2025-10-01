const fs = require('fs')
const path = require('path')

// Manual build script for ZAB package creation
console.log('🔨 Building Retro 80s Watch Face...')

// Create dist directory
const distDir = path.join(__dirname, 'dist')
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}

// Copy app.json
console.log('📄 Copying app.json...')
fs.copyFileSync(
  path.join(__dirname, 'app.json'),
  path.join(distDir, 'app.json')
)

// Copy assets
console.log('📱 Copying device assets...')
const devices = ['gtr4', 'gts4']

devices.forEach(device => {
  const deviceDir = path.join(distDir, device)
  if (!fs.existsSync(deviceDir)) {
    fs.mkdirSync(deviceDir, { recursive: true })
  }
  
  // Copy index.js for each device
  const sourceFile = path.join(__dirname, 'assets', device, 'index.js')
  const destFile = path.join(deviceDir, 'index.js')
  
  if (fs.existsSync(sourceFile)) {
    fs.copyFileSync(sourceFile, destFile)
    console.log(`✅ Copied ${device}/index.js`)
  }
})

// Copy icon if exists
const iconSource = path.join(__dirname, 'assets', 'icon.png')
const iconDest = path.join(distDir, 'icon.png')
if (fs.existsSync(iconSource)) {
  fs.copyFileSync(iconSource, iconDest)
  console.log('🎨 Copied icon.png')
}

console.log('✅ Manual build completed!')
console.log(`📁 Build output: ${distDir}`)
console.log('')
console.log('📋 Next steps:')
console.log('1. Create icon.png (192x192px)')
console.log('2. Take preview screenshots')
console.log('3. Use Zeus CLI or manual ZIP to create .zab file')
console.log('4. Upload to Zepp Console')