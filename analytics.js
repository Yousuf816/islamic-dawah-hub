/**
 * Privacy-Friendly Analytics
 * Only tracks essential metrics without compromising user privacy
 * GDPR/CCPA compliant - no personal data collection
 */

(function() {
    'use strict';
    
    // Only load if user hasn't opted out
    if (localStorage.getItem('analytics-opt-out') === 'true') {
        return;
    }
    
    // Simple, privacy-friendly analytics
    // Tracks: page views, basic device info (no IP, no cookies, no fingerprinting)
    
    const analytics = {
        // Track page view
        trackPageView: function() {
            // Only send minimal data
            const data = {
                url: window.location.pathname + window.location.search,
                referrer: document.referrer || 'direct',
                timestamp: Date.now(),
                screen: {
                    width: window.screen.width,
                    height: window.screen.height
                },
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            };
            
            // In production, send to your analytics endpoint
            // For now, just log (replace with your endpoint)
            if (typeof console !== 'undefined' && console.log) {
                console.log('[Analytics] Page view:', data);
            }
            
            // Example: Send to your own analytics server
            // fetch('/api/analytics', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // }).catch(() => {}); // Fail silently
        },
        
        // Track custom events (optional)
        trackEvent: function(eventName, eventData) {
            const data = {
                event: eventName,
                data: eventData || {},
                timestamp: Date.now()
            };
            
            if (typeof console !== 'undefined' && console.log) {
                console.log('[Analytics] Event:', data);
            }
            
            // Example: Send to your analytics server
            // fetch('/api/analytics/event', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // }).catch(() => {});
        }
    };
    
    // Track initial page view
    if (document.readyState === 'complete') {
        analytics.trackPageView();
    } else {
        window.addEventListener('load', function() {
            analytics.trackPageView();
        });
    }
    
    // Track navigation (for SPAs)
    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            analytics.trackPageView();
        }
    }).observe(document, { subtree: true, childList: true });
    
    // Expose analytics object globally (optional)
    window.analytics = analytics;
})();

