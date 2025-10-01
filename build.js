const fs = require('fs')
const path = require('path')

const BUILD_CONFIG = {
  targets: ['gtr4', 'gts4'],
  outputDir: 'dist'
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function copyAssets(target) {
  const sourceDir = path.join('assets', target)
  const targetDir = path.join(BUILD_CONFIG.outputDir, target)
  
  ensureDir(targetDir)
  
  if (fs.existsSync(sourceDir)) {
    const files = fs.readdirSync(sourceDir)
    files.forEach(file => {
      const source = path.join(sourceDir, file)
      const dest = path.join(targetDir, file)
      fs.copyFileSync(source, dest)
      console.log(`✓ Copied ${source} to ${dest}`)
    })
  }
}

function buildProject() {
  console.log('🔨 Building Zepp OS project...')
  
  ensureDir(BUILD_CONFIG.outputDir)
  
  BUILD_CONFIG.targets.forEach(target => {
    console.log(`📱 Building for ${target}...`)
    copyAssets(target)
  })
  
  // Copy app.json
  fs.copyFileSync('app.json', path.join(BUILD_CONFIG.outputDir, 'app.json'))
  console.log('✓ Copied app.json')
  
  console.log('✅ Build completed successfully!')
}

if (require.main === module) {
  buildProject()
}

module.exports = { buildProject }