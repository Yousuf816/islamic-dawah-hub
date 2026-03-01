#!/usr/bin/env node
/**
 * HTML Validation Script
 * Basic validation for HTML structure and common issues
 */

const fs = require('fs');

console.log('🔍 Validating HTML...\n');

const html = fs.readFileSync('index.html', 'utf8');
const errors = [];
const warnings = [];

// Check for required elements
const checks = [
    {
        name: 'DOCTYPE declaration',
        test: /<!DOCTYPE\s+html>/i,
        error: 'Missing DOCTYPE declaration'
    },
    {
        name: 'HTML lang attribute',
        test: /<html[^>]*lang=["']/i,
        error: 'Missing lang attribute on <html> tag'
    },
    {
        name: 'Viewport meta tag',
        test: /<meta[^>]*name=["']viewport["']/i,
        error: 'Missing viewport meta tag'
    },
    {
        name: 'Title tag',
        test: /<title>/i,
        error: 'Missing <title> tag'
    },
    {
        name: 'Meta description',
        test: /<meta[^>]*name=["']description["']/i,
        error: 'Missing meta description'
    },
    {
        name: 'Canonical URL',
        test: /<link[^>]*rel=["']canonical["']/i,
        error: 'Missing canonical URL'
    },
    {
        name: 'Main content landmark',
        test: /<main|role=["']main["']/i,
        error: 'Missing <main> or role="main" landmark'
    },
    {
        name: 'Skip to content link',
        test: /skip.*content|sr-only/i,
        warning: 'Consider adding skip-to-content link for accessibility'
    }
];

checks.forEach(({ name, test, error, warning }) => {
    if (!test.test(html)) {
        if (error) {
            errors.push({ name, message: error });
        } else if (warning) {
            warnings.push({ name, message: warning });
        }
    }
});

// Check for common issues
if (html.includes('http://')) {
    warnings.push({ name: 'HTTP links', message: 'Found HTTP links - should use HTTPS' });
}

if (html.match(/<script[^>]*src[^>]*>/gi)?.length > 5) {
    warnings.push({ name: 'Script count', message: 'Many script tags - consider bundling' });
}

// Report results
if (errors.length > 0) {
    console.log('❌ Errors found:');
    errors.forEach(({ name, message }) => {
        console.log(`  - ${name}: ${message}`);
    });
    console.log('');
}

if (warnings.length > 0) {
    console.log('⚠️  Warnings:');
    warnings.forEach(({ name, message }) => {
        console.log(`  - ${name}: ${message}`);
    });
    console.log('');
}

if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ HTML validation passed!');
    process.exit(0);
} else if (errors.length > 0) {
    console.log('❌ HTML validation failed');
    process.exit(1);
} else {
    console.log('✅ HTML validation passed with warnings');
    process.exit(0);
}




