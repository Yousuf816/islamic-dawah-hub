#!/usr/bin/env node
/**
 * Link Checker Script
 * Checks for broken links and 404s in the website
 */

const fs = require('fs');
const https = require('https');
const http = require('http');

const BASE_URL = 'https://yousuf816.github.io/islamic-dawah-hub/';
const htmlFile = 'index.html';

console.log('🔍 Checking links...\n');

// Read HTML file
const html = fs.readFileSync(htmlFile, 'utf8');

// Extract all links
const linkRegex = /href=["']([^"']+)["']/g;
const links = [];
let match;

while ((match = linkRegex.exec(html)) !== null) {
    const url = match[1];
    if (url && !url.startsWith('#') && !url.startsWith('javascript:') && !url.startsWith('mailto:')) {
        links.push(url);
    }
}

// Extract image sources
const imgRegex = /src=["']([^"']+)["']/g;
while ((match = imgRegex.exec(html)) !== null) {
    const url = match[1];
    if (url && !url.startsWith('data:') && !url.startsWith('#')) {
        links.push(url);
    }
}

// Remove duplicates
const uniqueLinks = [...new Set(links)];

console.log(`Found ${uniqueLinks.length} unique links to check\n`);

const results = {
    ok: [],
    broken: [],
    skipped: []
};

let checked = 0;

function checkLink(url) {
    return new Promise((resolve) => {
        // Skip external CDN links (they're reliable)
        if (url.includes('cdn.tailwindcss.com') || 
            url.includes('fonts.googleapis.com') || 
            url.includes('cdnjs.cloudflare.com') ||
            url.includes('api.aladhan.com')) {
            results.skipped.push(url);
            resolve();
            return;
        }

        // Resolve relative URLs
        let fullUrl = url;
        if (url.startsWith('/')) {
            fullUrl = BASE_URL.replace(/\/$/, '') + url;
        } else if (!url.startsWith('http')) {
            fullUrl = BASE_URL + url;
        }

        const client = fullUrl.startsWith('https') ? https : http;
        
        const req = client.get(fullUrl, { timeout: 5000 }, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 400) {
                results.ok.push(url);
            } else {
                results.broken.push({ url, status: res.statusCode });
            }
            resolve();
        });

        req.on('error', (err) => {
            if (err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED') {
                results.broken.push({ url, error: err.code });
            } else {
                results.skipped.push(url);
            }
            resolve();
        });

        req.on('timeout', () => {
            req.destroy();
            results.skipped.push(url);
            resolve();
        });
    });
}

async function checkAllLinks() {
    for (const link of uniqueLinks) {
        await checkLink(link);
        checked++;
        process.stdout.write(`\rChecked ${checked}/${uniqueLinks.length} links...`);
    }
    console.log('\n');

    // Report results
    console.log('✅ Working links:', results.ok.length);
    console.log('❌ Broken links:', results.broken.length);
    console.log('⏭️  Skipped (external CDN):', results.skipped.length);

    if (results.broken.length > 0) {
        console.log('\n❌ Broken Links:');
        results.broken.forEach(({ url, status, error }) => {
            console.log(`  - ${url} ${status ? `(${status})` : `(${error})`}`);
        });
        process.exit(1);
    } else {
        console.log('\n✅ All links are working!');
        process.exit(0);
    }
}

checkAllLinks();




