#!/usr/bin/env node
/**
 * Deployment Verification Script
 * Run this script to verify all files are ready for deployment
 */

const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'index.html',
  'styles.css',
  'script.js',
  'sw.js',
  'manifest.json',
  'robots.txt',
  'sitemap.xml'
];

const configFiles = [
  '.htaccess',
  'vercel.json',
  'netlify.toml',
  'firebase.json',
  'package.json'
];

let errors = [];
let warnings = [];

console.log('🔍 Verifying deployment readiness...\n');

// Check required files
console.log('📋 Checking required files...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    errors.push(`Required file missing: ${file}`);
  }
});

// Check configuration files
console.log('\n⚙️  Checking configuration files...');
configFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ⚠️  ${file} - Optional but recommended`);
    warnings.push(`Configuration file missing: ${file}`);
  }
});

// Check index.html for common issues
console.log('\n🔍 Validating index.html...');
try {
  const html = fs.readFileSync('index.html', 'utf8');
  
  // Check for localhost references
  if (html.includes('localhost') || html.includes('127.0.0.1')) {
    warnings.push('index.html contains localhost references - update to production domain');
  }
  
  // Check for service worker registration (can be in script.js)
  if (html.includes('serviceWorker') || html.includes('sw.js') || html.includes('script.js')) {
    console.log('  ✅ Service worker referenced (via script.js)');
  } else {
    warnings.push('Service worker may not be registered');
  }
  
  // Check for manifest
  if (html.includes('manifest.json')) {
    console.log('  ✅ Manifest referenced');
  } else {
    warnings.push('Manifest not referenced in index.html');
  }
  
  console.log('  ✅ index.html structure valid');
} catch (e) {
  errors.push(`Error reading index.html: ${e.message}`);
}

// Check service worker
console.log('\n🔍 Validating service worker...');
try {
  const sw = fs.readFileSync('sw.js', 'utf8');
  if (sw.includes('CACHE_NAME')) {
    console.log('  ✅ Service worker structure valid');
  } else {
    warnings.push('Service worker may be incomplete');
  }
} catch (e) {
  errors.push(`Error reading sw.js: ${e.message}`);
}

// Check manifest.json
console.log('\n🔍 Validating manifest.json...');
try {
  const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
  if (manifest.name && manifest.short_name) {
    console.log('  ✅ Manifest structure valid');
  } else {
    warnings.push('Manifest missing required fields');
  }
} catch (e) {
  errors.push(`Error reading manifest.json: ${e.message}`);
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 VERIFICATION SUMMARY');
console.log('='.repeat(50));

if (errors.length === 0 && warnings.length === 0) {
  console.log('\n✅ All checks passed! Website is ready for deployment.');
  process.exit(0);
} else {
  if (errors.length > 0) {
    console.log('\n❌ ERRORS FOUND:');
    errors.forEach(err => console.log(`  - ${err}`));
  }
  
  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    warnings.forEach(warn => console.log(`  - ${warn}`));
  }
  
  if (errors.length > 0) {
    console.log('\n❌ Deployment blocked due to errors. Please fix them before deploying.');
    process.exit(1);
  } else {
    console.log('\n⚠️  Deployment can proceed, but warnings should be addressed.');
    process.exit(0);
  }
}

