#!/usr/bin/env node
/**
 * Lighthouse Score Checker
 * Validates that Lighthouse scores meet minimum thresholds
 */

const fs = require('fs');

const MIN_SCORES = {
    performance: 90,
    accessibility: 90,
    'best-practices': 90,
    seo: 90
};

console.log('🔍 Checking Lighthouse scores...\n');

let allPassed = true;

['desktop', 'mobile'].forEach(type => {
    const file = `lighthouse-${type}.json`;
    
    if (!fs.existsSync(file)) {
        console.log(`⚠️  ${type} report not found: ${file}`);
        return;
    }

    const report = JSON.parse(fs.readFileSync(file, 'utf8'));
    const categories = report.categories || {};

    console.log(`\n📊 ${type.toUpperCase()} Scores:`);
    
    Object.keys(MIN_SCORES).forEach(category => {
        const score = categories[category]?.score * 100 || 0;
        const minScore = MIN_SCORES[category];
        const passed = score >= minScore;
        const icon = passed ? '✅' : '❌';
        
        console.log(`  ${icon} ${category}: ${score.toFixed(0)}/100 (min: ${minScore})`);
        
        if (!passed) {
            allPassed = false;
        }
    });
});

console.log('');

if (allPassed) {
    console.log('✅ All Lighthouse scores meet requirements!');
    process.exit(0);
} else {
    console.log('❌ Some scores are below minimum thresholds');
    process.exit(1);
}

