/**
 * Error Tracking & Monitoring
 * Captures and reports JavaScript errors without compromising privacy
 */

(function() {
    'use strict';
    
    // Error handler
    window.addEventListener('error', function(event) {
        const errorData = {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            stack: event.error ? event.error.stack : null,
            userAgent: navigator.userAgent,
            url: window.location.href,
            timestamp: new Date().toISOString()
        };
        
        // Log to console in development
        if (typeof console !== 'undefined' && console.error) {
            console.error('[Error Tracking]', errorData);
        }
        
        // In production, send to your error tracking service
        // Example: Send to your own endpoint
        // fetch('/api/errors', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(errorData)
        // }).catch(() => {}); // Fail silently
        
        // Or use a service like Sentry (privacy-friendly configuration)
        // if (typeof Sentry !== 'undefined') {
        //     Sentry.captureException(event.error);
        // }
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', function(event) {
        const errorData = {
            message: event.reason ? event.reason.toString() : 'Unhandled Promise Rejection',
            stack: event.reason && event.reason.stack ? event.reason.stack : null,
            url: window.location.href,
            timestamp: new Date().toISOString()
        };
        
        if (typeof console !== 'undefined' && console.error) {
            console.error('[Error Tracking] Promise Rejection:', errorData);
        }
        
        // Send to error tracking service
        // fetch('/api/errors', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(errorData)
        // }).catch(() => {});
    });
    
    // Service Worker error handling
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('message', function(event) {
            if (event.data && event.data.type === 'ERROR') {
                const errorData = {
                    message: 'Service Worker Error',
                    details: event.data.error,
                    url: window.location.href,
                    timestamp: new Date().toISOString()
                };
                
                if (typeof console !== 'undefined' && console.error) {
                    console.error('[Error Tracking] Service Worker:', errorData);
                }
            }
        });
    }
})();

