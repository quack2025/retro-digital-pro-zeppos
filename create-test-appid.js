const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('📦 Creating .zab with TEST App ID...\n')

// Use a different App ID for testing
const testAppId = 999999

// Read original manifest
const manifestPath = path.join(__dirname, 'dist', 'manifest.json')
if (!fs.existsSync(manifestPath)) {
  console.error('❌ dist/manifest.json not found. Run npm run build first!')
  process.exit(1)
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))

// Change App ID
const originalAppId = manifest.app.appId
manifest.app.appId = testAppId

console.log(`Changing App ID: ${originalAppId} → ${testAppId}`)

// Create test-dist folder
const testDir = path.join(__dirname, 'test-dist')
if (fs.existsSync(testDir)) {
  fs.rmSync(testDir, { recursive: true })
}
fs.mkdirSync(testDir, { recursive: true })

// Copy everything from dist manually
console.log('Copying files from dist...')

// Copy files
const filesToCopy = ['app.json', 'icon.png']
filesToCopy.forEach(file => {
  const src = path.join(__dirname, 'dist', file)
  const dest = path.join(testDir, file)
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest)
    console.log(`✓ Copied ${file}`)
  }
})

// Copy directories
const dirsToCopy = ['gtr4', 'gts4']
dirsToCopy.forEach(dir => {
  const src = path.join(__dirname, 'dist', dir)
  const dest = path.join(testDir, dir)
  if (fs.existsSync(src)) {
    fs.mkdirSync(dest, { recursive: true })
    const files = fs.readdirSync(src)
    files.forEach(file => {
      fs.copyFileSync(
        path.join(src, file),
        path.join(dest, file)
      )
    })
    console.log(`✓ Copied ${dir}/`)
  }
})

// Write modified manifest
fs.writeFileSync(
  path.join(testDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2)
)
console.log(`✓ Created manifest.json with App ID: ${testAppId}`)

// Create ZIP
console.log('\nCreating ZIP archive...')
const zipName = 'retro-80s-test-id.zip'
try {
  const cmd = `powershell -Command "Compress-Archive -Path test-dist\\* -DestinationPath ${zipName} -Force"`
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

console.log('\n✅ TEST .zab created!')
console.log('\n📦 Package info:')
console.log(`   File: ${path.join(__dirname, zabName)}`)
console.log(`   App ID: ${testAppId} (temporary for testing)`)
console.log(`   Original App ID was: ${originalAppId}`)
console.log('\n🎯 Purpose: Test if App ID 1091559 is causing the error')
console.log('\nIf this uploads successfully, the problem is the App ID.')
console.log('If this fails with same error, the problem is elsewhere.\n')
