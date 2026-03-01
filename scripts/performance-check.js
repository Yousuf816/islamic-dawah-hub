#!/usr/bin/env node
/**
 * Performance Check Script
 * Validates performance metrics and provides recommendations
 */

const fs = require('fs');
const https = require('https');

const SITE_URL = 'https://yousuf816.github.io/islamic-dawah-hub/';

console.log('🔍 Checking performance metrics...\n');

// Check file sizes
const files = ['index.html', 'styles.css', 'script.js', 'sw.js', 'manifest.json'];
const maxSizes = {
    'index.html': 100 * 1024, // 100KB
    'styles.css': 50 * 1024,   // 50KB
    'script.js': 100 * 1024,   // 100KB
    'sw.js': 20 * 1024,        // 20KB
    'manifest.json': 5 * 1024  // 5KB
};

console.log('📊 File Size Check:');
let allGood = true;

files.forEach(file => {
    if (fs.existsSync(file)) {
        const stats = fs.statSync(file);
        const sizeKB = (stats.size / 1024).toFixed(2);
        const maxKB = (maxSizes[file] / 1024).toFixed(2);
        const status = stats.size <= maxSizes[file] ? '✅' : '⚠️';
        
        console.log(`  ${status} ${file}: ${sizeKB}KB / ${maxKB}KB max`);
        
        if (stats.size > maxSizes[file]) {
            allGood = false;
            console.log(`    ⚠️  Consider optimizing ${file}`);
        }
    }
});

console.log('\n📋 Performance Recommendations:');
console.log('  ✅ Use service worker for caching');
console.log('  ✅ Defer non-critical JavaScript');
console.log('  ✅ Use font-display: swap');
console.log('  ✅ Minimize external dependencies');
console.log('  ✅ Optimize images (if any)');

console.log('\n🔍 Resource Loading:');
const html = fs.readFileSync('index.html', 'utf8');

// Check for blocking resources
const blockingScripts = html.match(/<script[^>]*src[^>]*(?!defer|async)[^>]*>/gi);
if (blockingScripts && blockingScripts.length > 0) {
    console.log('  ⚠️  Found blocking scripts (consider adding defer/async)');
    blockingScripts.forEach(script => {
        console.log(`    - ${script.substring(0, 80)}...`);
    });
} else {
    console.log('  ✅ No blocking scripts found');
}

// Check for preload hints
const preloads = html.match(/<link[^>]*rel=["']preload["']/gi);
if (preloads) {
    console.log(`  ✅ Found ${preloads.length} preload hints`);
} else {
    console.log('  ⚠️  Consider adding preload hints for critical resources');
}

console.log('\n✅ Performance check completed');
process.exit(allGood ? 0 : 1);

