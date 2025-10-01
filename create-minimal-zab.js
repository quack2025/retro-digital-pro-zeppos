const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('📦 Creating MINIMAL .zab for testing...\n')

// Create minimal manifest with only GTR4
const minimalManifest = {
  "configVersion": "v2",
  "app": {
    "appId": 1091559,
    "appName": "Retro 80's",
    "appType": "watchface",
    "version": {
      "code": 2,
      "name": "2.0.0"
    },
    "icon": "icon.png",
    "vender": "jorgealejandro.rosales",
    "description": "Premium retro 80s digital watch face"
  },
  "permissions": [],
  "runtime": {
    "apiVersion": {
      "compatible": "1.0.0",
      "target": "1.0.1",
      "minVersion": "1.0.0"
    }
  },
  "targets": {
    "gtr4": {
      "module": {
        "watchface": {
          "path": "gtr4/index",
          "main": 1
        }
      },
      "platforms": [
        {
          "name": "gtr4",
          "deviceSource": 230
        }
      ],
      "designWidth": 466
    }
  },
  "i18n": {
    "en-US": {
      "appName": "Retro 80's"
    }
  },
  "defaultLanguage": "en-US"
}

// Create minimal-dist folder
const minimalDir = path.join(__dirname, 'minimal-dist')
if (fs.existsSync(minimalDir)) {
  fs.rmSync(minimalDir, { recursive: true })
}
fs.mkdirSync(minimalDir, { recursive: true })

// Create gtr4 folder
const gtr4Dir = path.join(minimalDir, 'gtr4')
fs.mkdirSync(gtr4Dir, { recursive: true })

// Copy files
console.log('Copying files...')
fs.copyFileSync(
  path.join(__dirname, 'assets/gtr4/index.js'),
  path.join(gtr4Dir, 'index.js')
)
console.log('✓ Copied gtr4/index.js')

fs.copyFileSync(
  path.join(__dirname, 'dist/icon.png'),
  path.join(minimalDir, 'icon.png')
)
console.log('✓ Copied icon.png')

// Write minimal manifest
fs.writeFileSync(
  path.join(minimalDir, 'manifest.json'),
  JSON.stringify(minimalManifest, null, 2)
)
console.log('✓ Created minimal manifest.json')

// Create ZIP
console.log('\nCreating ZIP...')
const zipName = 'retro-80s-minimal.zip'
try {
  const cmd = `powershell -Command "Compress-Archive -Path minimal-dist\\* -DestinationPath ${zipName} -Force"`
  execSync(cmd, { stdio: 'inherit' })
  console.log(`✓ Created ${zipName}`)
} catch (error) {
  console.error('❌ Failed to create ZIP!')
  process.exit(1)
}

// Rename to .zab
console.log('\nRenaming to .zab...')
const zabName = zipName.replace('.zip', '.zab')
try {
  if (fs.existsSync(zabName)) {
    fs.unlinkSync(zabName)
  }
  fs.renameSync(zipName, zabName)
  console.log(`✓ Created ${zabName}`)
} catch (error) {
  console.error('❌ Failed to rename!')
  process.exit(1)
}

// Verify
const stats = fs.statSync(zabName)
const sizeKB = (stats.size / 1024).toFixed(2)
console.log(`✓ Package size: ${sizeKB} KB`)

console.log('\n✅ MINIMAL .zab created!')
console.log('\n📦 This is a SIMPLIFIED version with:')
console.log('   - Only GTR4 target (not GTS4)')
console.log('   - No permissions')
console.log('   - Minimal i18n (only en-US)')
console.log('   - Same manifest structure')
console.log('\n🎯 Try uploading this to see if the error persists:')
console.log(`   ${path.join(__dirname, zabName)}`)
console.log('\nIf this works, the problem is with multi-target or permissions.')
console.log('If this fails too, the problem is more fundamental.\n')
