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

  // Create manifest.json for Zepp Console
  const appJson = JSON.parse(fs.readFileSync('app.json', 'utf8'))

  // Transform i18n to use appName instead of name
  const i18nTransformed = {}
  if (appJson.i18n) {
    Object.keys(appJson.i18n).forEach(lang => {
      i18nTransformed[lang] = {
        appName: appJson.i18n[lang].name || appJson.app.appName
      }
    })
  }

  const manifest = {
    configVersion: appJson.configVersion,
    app: appJson.app,
    permissions: appJson.permissions || [],
    runtime: {
      apiVersion: {
        compatible: "1.0.0",
        target: "1.0.1",
        minVersion: "1.0.0"
      }
    },
    targets: {},
    i18n: i18nTransformed
  }

  // Device source mapping for Zepp Console
  const deviceSourceMap = {
    'gtr4': 230,
    'gts4': 229,
    'gtr3': 226,
    'gts4mini': 246
  }

  // Adjust paths for manifest.json (remove 'assets/' prefix)
  BUILD_CONFIG.targets.forEach(target => {
    if (appJson.targets[target]) {
      manifest.targets[target] = {
        module: {
          watchface: {
            path: `${target}/index`,
            main: 1
          }
        },
        platforms: [
          {
            name: target,
            deviceSource: deviceSourceMap[target] || 230
          }
        ],
        designWidth: appJson.targets[target].designWidth,
        screenShape: appJson.targets[target].screenShape
      }
    }
  })

  // Add default language
  manifest.defaultLanguage = 'en-US'

  fs.writeFileSync(
    path.join(BUILD_CONFIG.outputDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  )
  console.log('✓ Created manifest.json')

  console.log('✅ Build completed successfully!')
}

if (require.main === module) {
  buildProject()
}

module.exports = { buildProject }