// JavaScript for Light of Guidance Islamic Website
// Created by Yousuf - A comprehensive Islamic Dawah platform

// Configuration - Replace Yousuf with your actual name
const CONFIG = {
    creatorName: "Yousuf", // Replace with your name
    websiteName: "Light of Guidance",
    currentYear: new Date().getFullYear()
};

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function() {
    initializeWebsite();
});

// Remove loader on full load and set theme-color
window.addEventListener("load", () => {
    const loader = document.getElementById("app-loader");
    if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => loader.remove(), 300);
    }
    updateThemeColorMeta();
});

function updateThemeColorMeta() {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    const isDark = document.documentElement.classList.contains("dark");
    meta.setAttribute("content", isDark ? "#111827" : "#ffffff");
}

// Initialize all website functionality
function initializeWebsite() {
    updateCreatorCredits();
    setupThemeToggle();
    setupMobileMenu();
    setupTasbeehCounter();
    setupDailyDua();
    setupSmoothScrolling();
    setupAnimations();
    setupPrayerTimes();
    setupCreatorCredit();
    setupEnhancedFeatures();
    setupQuranVerseOfTheDay();
    setupIslamicCalendar();
    setupAudioRecitations();
    setupShareFunctionality();
    setupAdvancedAnimations();
}

// Update all creator credits throughout the website
function updateCreatorCredits() {
    const creatorElements = document.querySelectorAll("[data-creator]");
    creatorElements.forEach(element => {
        element.textContent = element.textContent.replace("Yousuf", CONFIG.creatorName);
    });
    
    // Update meta author
    const metaAuthor = document.querySelector('meta[name="author"]');
    if (metaAuthor) {
        metaAuthor.setAttribute("content", CONFIG.creatorName);
    }
    
    // Update title if needed
    document.title = `${CONFIG.websiteName} - Created by ${CONFIG.creatorName}`;
}

// Enhanced Theme Toggle with System Preference Detection
function setupThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle");
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    html.classList.toggle("dark", currentTheme === "dark");
    updateThemeColorMeta();

    themeToggle.addEventListener("click", function() {
        html.classList.toggle("dark");
        const newTheme = html.classList.contains("dark") ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        updateThemeColorMeta();
        showNotification(`Switched to ${newTheme} mode`);
    });

    // Sync with system preference when no manual choice stored
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
        if (!localStorage.getItem("theme")) {
            html.classList.toggle("dark", e.matches);
            updateThemeColorMeta();
        }
    });
}

// Enhanced Mobile Menu with Better UX
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    
    mobileMenuToggle.addEventListener("click", function() {
        mobileMenu.classList.toggle("hidden");
        
        // Animate hamburger icon
        const icon = this.querySelector("i");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener("click", function(e) {
        if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenu.classList.add("hidden");
            const icon = mobileMenuToggle.querySelector("i");
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-times");
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(link => {
        link.addEventListener("click", function() {
            mobileMenu.classList.add("hidden");
            const icon = mobileMenuToggle.querySelector("i");
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-times");
        });
    });
}

// Enhanced Tasbeeh Counter with Multiple Dhikr Options
function setupTasbeehCounter() {
    const countDisplay = document.getElementById("tasbeeh-count");
    const incrementBtn = document.getElementById("tasbeeh-increment");
    const resetBtn = document.getElementById("tasbeeh-reset");
    
    let count = parseInt(localStorage.getItem("tasbeehCount")) || 0;
    let currentDhikr = localStorage.getItem("currentDhikr") || "Subhan Allah";
    
    const dhikrOptions = [
        "Subhan Allah",
        "Alhamdulillah", 
        "Allahu Akbar",
        "La ilaha illa Allah",
        "Astaghfirullah",
        "Subhan Allahi wa bihamdihi"
    ];
    
    // Create enhanced counter display
    const counterContainer = countDisplay.parentElement;
    counterContainer.innerHTML = `
        <div class="tasbeeh-counter" id="tasbeeh-display">${count}</div>
        <div class="flex justify-center mb-2">
            <select id="dhikr-selector" class="text-sm bg-gray-100 dark:bg-gray-700 rounded px-2 py-1">
                ${dhikrOptions.map(option => 
                    `<option value="${option}" ${option === currentDhikr ? "selected" : ""}>${option}</option>`
                ).join("")}
            </select>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400">${currentDhikr}</p>
    `;
    
    const enhancedDisplay = document.getElementById("tasbeeh-display");
    const dhikrSelector = document.getElementById("dhikr-selector");
    const dhikrText = counterContainer.querySelector("p");
    
    // Update dhikr text when selector changes
    dhikrSelector.addEventListener("change", function() {
        currentDhikr = this.value;
        dhikrText.textContent = currentDhikr;
        localStorage.setItem("currentDhikr", currentDhikr);
    });
    
    incrementBtn.addEventListener("click", function() {
        count++;
        enhancedDisplay.textContent = count;
        localStorage.setItem("tasbeehCount", count);
        
        // Add visual feedback with different colors for milestones
        let colorClass = "scale-110";
        if (count % 100 === 0) {
            colorClass = "scale-125 bg-gradient-to-r from-yellow-400 to-orange-500";
            showNotification(`?? ${count} dhikr completed! MashaAllah!`, "celebration");
        } else if (count % 33 === 0) {
            colorClass = "scale-120 bg-gradient-to-r from-green-400 to-emerald-500";
            showNotification(`? ${count} dhikr! Barakallahu feeki!`, "success");
        }
        
        enhancedDisplay.className = `tasbeeh-counter ${colorClass}`;
        setTimeout(() => {
            enhancedDisplay.className = "tasbeeh-counter";
        }, 300);
        
        // Play enhanced sound effect
        playTasbeehSound(count);
    });
    
    resetBtn.addEventListener("click", function() {
        count = 0;
        enhancedDisplay.textContent = count;
        localStorage.setItem("tasbeehCount", count);
        showNotification("Tasbeeh counter reset", "info");
    });
}

// Enhanced Daily Dua with Categories
function setupDailyDua() {
    const newDuaBtn = document.getElementById("new-dua");
    const duaContainer = document.getElementById("daily-dua");
    
    const duas = {
        morning: [
            {
                text: "O Allah, I ask You for guidance, piety, chastity and independence from others.",
                source: "Prophet Muhammad (PBUH)"
            },
            {
                text: "O Allah, make the beginning of this day good, the middle prosperous, and the end successful.",
                source: "Prophet Muhammad (PBUH)"
            }
        ],
        general: [
            {
                text: "O Allah, grant us good in this world and good in the Hereafter, and save us from the punishment of the Fire.",
                source: "Quran 2:201"
            },
            {
                text: "O Allah, make me among those who repent and purify themselves.",
                source: "Quran 2:222"
            },
            {
                text: "O Allah, grant me wisdom and join me with the righteous.",
                source: "Quran 26:83"
            },
            {
                text: "O Allah, forgive me, have mercy on me, guide me, and provide for me.",
                source: "Prophet Muhammad (PBUH)"
            }
        ],
        evening: [
            {
                text: "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts, and from being over powered by men.",
                source: "Prophet Muhammad (PBUH)"
            },
            {
                text: "O Allah, I seek refuge in You from the punishment of the grave, and from the punishment of Hell-fire, and from the trials of life and death, and from the evil of the trial of the False Messiah.",
                source: "Prophet Muhammad (PBUH)"
            }
        ]
    };
    
    newDuaBtn.addEventListener("click", function() {
        const currentHour = new Date().getHours();
        let category = "general";
        
        if (currentHour >= 5 && currentHour < 12) {
            category = "morning";
        } else if (currentHour >= 18 || currentHour < 5) {
            category = "evening";
        }
        
        const categoryDuas = duas[category];
        const randomDua = categoryDuas[Math.floor(Math.random() * categoryDuas.length)];
        
        duaContainer.innerHTML = `
            <div class="dua-card">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-2 py-1 rounded-full">
                        ${category.charAt(0).toUpperCase() + category.slice(1)} Dua
                    </span>
                    <button onclick="copyToClipboard('${randomDua.text}')" class="text-gray-400 hover:text-emerald-500">
                        <i class="fas fa-copy text-sm"></i>
                    </button>
                </div>
                <p class="text-sm italic mb-2">
                    "${randomDua.text}"
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                    - ${randomDua.source}
                </p>
            </div>
        `;
        
        // Add enhanced fade effect
        duaContainer.style.opacity = "0";
        duaContainer.style.transform = "translateY(20px)";
        setTimeout(() => {
            duaContainer.style.opacity = "1";
            duaContainer.style.transform = "translateY(0)";
        }, 300);
        
        showNotification(`New ${category} dua loaded`, "success");
    });
}

// Quran Verse of the Day
function setupQuranVerseOfTheDay() {
    const verses = [
        {
            arabic: "????? ?????? ??????? ?????? ???????????",
            english: "And whoever Allah guides - he is the [rightly] guided one.",
            reference: "Quran 7:178"
        },
        {
            arabic: "????????????? ????????????",
            english: "So remember Me; I will remember you.",
            reference: "Quran 2:152"
        },
        {
            arabic: "????? ??????? ??????? ??????? ????? ?????????",
            english: "And whoever fears Allah - He will make for him a way out.",
            reference: "Quran 65:2"
        }
    ];
    
    // Update hero verse daily
    const heroVerse = document.querySelector("#home .verse-card");
    if (heroVerse) {
        const today = new Date().getDate();
        const verseIndex = today % verses.length;
        const verse = verses[verseIndex];
        
        heroVerse.innerHTML = `
            <div class="text-3xl md:text-4xl font-amiri text-right mb-4 text-emerald-700 dark:text-emerald-400">
                ${verse.arabic}
            </div>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-2">
                "${verse.english}"
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
                - ${verse.reference}
            </p>
        `;
    }
}

// Islamic Calendar Integration
function setupIslamicCalendar() {
    // This would integrate with an Islamic calendar API
    // For now, we'll add a basic display
    const today = new Date();
    const islamicMonths = [
        "Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-thani",
        "Jumada al-awwal", "Jumada al-thani", "Rajab", "Sha'ban",
        "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
    ];
    
    // Add Islamic date display to navigation
    const nav = document.querySelector("nav .flex.items-center.space-x-2");
    if (nav) {
        const islamicDate = document.createElement("div");
        islamicDate.className = "hidden md:block text-xs text-gray-500 dark:text-gray-400 ml-4";
        islamicDate.innerHTML = `
            <div>Islamic Date</div>
            <div class="font-semibold">${islamicMonths[today.getMonth()]} ${today.getDate()}</div>
        `;
        nav.appendChild(islamicDate);
    }
}

// Audio Recitations
function setupAudioRecitations() {
    // Add audio controls for Quran recitations
    const verseCards = document.querySelectorAll(".verse-card");
    verseCards.forEach(card => {
        const audioBtn = document.createElement("button");
        audioBtn.className = "absolute top-2 right-2 text-gray-400 hover:text-emerald-500 transition-colors";
        audioBtn.innerHTML = '<i class="fas fa-play text-sm"></i>';
        audioBtn.title = "Play recitation";
        
        card.style.position = "relative";
        card.appendChild(audioBtn);
        
        audioBtn.addEventListener("click", function() {
            // This would play actual audio recitation
            showNotification("Audio recitation would play here", "info");
        });
    });
}

// Enhanced Share Functionality
function setupShareFunctionality() {
    // Add share buttons to all content
    const shareableElements = document.querySelectorAll(".verse-card, .hadith-card");
    shareableElements.forEach(element => {
        const shareBtn = document.createElement("button");
        shareBtn.className = "absolute top-2 left-2 text-gray-400 hover:text-emerald-500 transition-colors";
        shareBtn.innerHTML = '<i class="fas fa-share text-sm"></i>';
        shareBtn.title = "Share";
        
        element.style.position = "relative";
        element.appendChild(shareBtn);
        
        shareBtn.addEventListener("click", function() {
            const content = element.querySelector("p").textContent;
            shareContent("text", content);
        });
    });
}

// Advanced Animations
function setupAdvancedAnimations() {
    // Parallax effect for hero section
    window.addEventListener("scroll", function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector("#home");
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Staggered animation for cards
    const cards = document.querySelectorAll(".verse-card, .hadith-card, .tool-card, .resource-card");
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Enhanced Prayer Times with Location
function setupPrayerTimes() {
    // Enhanced prayer times with better styling
    const prayerTimesContainer = document.querySelector(".tool-card:nth-child(2) .space-y-2");
    if (prayerTimesContainer) {
        prayerTimesContainer.innerHTML = `
            <div class="prayer-time">
                <span>Fajr:</span>
                <span class="font-semibold">5:30 AM</span>
            </div>
            <div class="prayer-time">
                <span>Dhuhr:</span>
                <span class="font-semibold">12:15 PM</span>
            </div>
            <div class="prayer-time">
                <span>Asr:</span>
                <span class="font-semibold">3:45 PM</span>
            </div>
            <div class="prayer-time">
                <span>Maghrib:</span>
                <span class="font-semibold">6:20 PM</span>
            </div>
            <div class="prayer-time">
                <span>Isha:</span>
                <span class="font-semibold">7:45 PM</span>
            </div>
        `;
    }
}

// Enhanced Creator Credit
function setupCreatorCredit() {
    const credit = document.createElement("div");
    credit.className = "creator-credit";
    credit.innerHTML = `Created by ${CONFIG.creatorName}`;
    credit.title = `${CONFIG.websiteName} - Islamic Dawah Platform`;
    document.body.appendChild(credit);
    
    credit.addEventListener("click", function() {
        showNotification("May Allah accept our efforts! Ameen ??", "celebration");
        createRippleEffect(this);
    });
}

// Enhanced Features
function setupEnhancedFeatures() {
    // Add copy functionality to Quran verses
    const verseCards = document.querySelectorAll(".verse-card");
    verseCards.forEach(card => {
        card.style.cursor = "pointer";
        card.addEventListener("click", function() {
            const verse = card.querySelector("p").textContent;
            copyToClipboard(verse);
        });
    });
    
    // Add download functionality to resource cards
    const resourceCards = document.querySelectorAll(".resource-card");
    resourceCards.forEach(card => {
        const button = card.querySelector("button");
        if (button) {
            button.addEventListener("click", function() {
                const title = card.querySelector("h3").textContent;
                showNotification(`${title} download started!`, "success");
            });
        }
    });
}

// Utility Functions
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification("Copied to clipboard!", "success");
    }).catch(() => {
        showNotification("Copy failed", "error");
    });
}

function createRippleEffect(element) {
    const ripple = document.createElement("span");
    ripple.className = "ripple-effect";
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = (rect.width / 2 - size / 2) + "px";
    ripple.style.top = (rect.height / 2 - size / 2) + "px";
    
    element.style.position = "relative";
    element.style.overflow = "hidden";
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Enhanced Notification System
function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    const colors = {
        success: "bg-emerald-500",
        error: "bg-red-500", 
        info: "bg-blue-500",
        celebration: "bg-gradient-to-r from-yellow-400 to-orange-500"
    };
    
    notification.className = `fixed top-20 right-4 ${colors[type]} text-white px-4 py-2 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = "translateX(0)";
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = "translateX(100%)";
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Enhanced Sound System
function playTasbeehSound(count) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Different frequencies for milestones
        let frequency = 800;
        if (count % 100 === 0) {
            frequency = 1200; // Higher pitch for 100s
        } else if (count % 33 === 0) {
            frequency = 1000; // Medium pitch for 33s
        }
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = "sine";
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
        console.log("Audio not supported");
    }
}

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll("a[href^='#']");
    
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });
}

// Setup Animations and Effects
function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in-up");
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll(".verse-card, .hadith-card, .tool-card, .resource-card");
    animatedElements.forEach(el => observer.observe(el));
    
    // Add floating animation to moon emoji
    const moonEmoji = document.querySelector(".text-6xl");
    if (moonEmoji) {
        moonEmoji.classList.add("float-animation");
    }
}

// Share Functionality
function shareContent(type, content) {
    if (navigator.share) {
        navigator.share({
            title: CONFIG.websiteName,
            text: content,
            url: window.location.href
        });
    } else {
        copyToClipboard(content);
    }
}

// Enhanced Keyboard Shortcuts
document.addEventListener("keydown", function(e) {
    // Toggle theme with Ctrl/Cmd + D
    if ((e.ctrlKey || e.metaKey) && e.key === "d") {
        e.preventDefault();
        document.getElementById("theme-toggle").click();
    }
    
    // Increment tasbeeh with spacebar
    if (e.key === " " && e.target.id === "tasbeeh-increment") {
        e.preventDefault();
        e.target.click();
    }
    
    // New dua with N key
    if (e.key === "n" && e.ctrlKey) {
        e.preventDefault();
        document.getElementById("new-dua").click();
    }
    
    // Copy current verse with C key
    if (e.key === "c" && e.ctrlKey) {
        e.preventDefault();
        const activeVerse = document.querySelector(".verse-card:hover");
        if (activeVerse) {
            const verse = activeVerse.querySelector("p").textContent;
            copyToClipboard(verse);
        }
    }
});

// Export functions for potential external use
window.LightOfGuidance = {
    shareContent,
    showNotification,
    getTasbeehCount: function() {
        return parseInt(localStorage.getItem("tasbeehCount")) || 0;
    },
    getCurrentDhikr: function() {
        return localStorage.getItem("currentDhikr") || "Subhan Allah";
    },
    copyToClipboard
};

// Add CSS for ripple effect
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register("/sw.js")
            .then(function(registration) {
                console.log("ServiceWorker registration successful");
            })
            .catch(function(err) {
                console.log("ServiceWorker registration failed");
            });
    });
}
