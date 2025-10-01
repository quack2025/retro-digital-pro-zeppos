const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('📦 Creating .zab package for Zepp Console submission...\n')

// Step 1: Build the project
console.log('Step 1: Building project...')
try {
  execSync('node build.js', { stdio: 'inherit' })
} catch (error) {
  console.error('❌ Build failed!')
  process.exit(1)
}

// Step 2: Verify dist folder
console.log('\nStep 2: Verifying dist folder...')
const distPath = path.join(__dirname, 'dist')
const requiredFiles = ['manifest.json', 'app.json', 'icon.png', 'gtr4', 'gts4']

for (const file of requiredFiles) {
  const filePath = path.join(distPath, file)
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing required file/folder: ${file}`)
    process.exit(1)
  }
}
console.log('✓ All required files present')

// Step 3: Create ZIP
console.log('\nStep 3: Creating ZIP archive...')
const outputName = 'retro-80s-v2-fixed.zip'
try {
  // Use PowerShell to create the ZIP on Windows
  const cmd = `powershell -Command "Compress-Archive -Path dist\\* -DestinationPath ${outputName} -Force"`
  execSync(cmd, { stdio: 'inherit' })
  console.log(`✓ Created ${outputName}`)
} catch (error) {
  console.error('❌ Failed to create ZIP!')
  process.exit(1)
}

// Step 4: Rename to .zab
console.log('\nStep 4: Renaming to .zab...')
const zabName = outputName.replace('.zip', '.zab')
try {
  if (fs.existsSync(zabName)) {
    fs.unlinkSync(zabName)
  }
  fs.renameSync(outputName, zabName)
  console.log(`✓ Created ${zabName}`)
} catch (error) {
  console.error('❌ Failed to rename to .zab!')
  process.exit(1)
}

// Step 5: Verify .zab
console.log('\nStep 5: Verifying .zab package...')
const stats = fs.statSync(zabName)
const sizeKB = (stats.size / 1024).toFixed(2)
console.log(`✓ Package size: ${sizeKB} KB`)

// Success!
console.log('\n✅ SUCCESS! Package ready for Zepp Console submission!')
console.log(`\n📦 Upload this file to Zepp Console:`)
console.log(`   ${path.join(__dirname, zabName)}`)
console.log('\n🎯 Next steps:')
console.log('   1. Go to https://console.zepp.com/')
console.log('   2. Create new application')
console.log(`   3. Upload: ${zabName}`)
console.log('   4. Follow ZEPP_CONSOLE_SUBMISSION_STEPS.md\n')
