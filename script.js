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
    setupBackToTop();
    setupOfflineDetection();
    setupSearchFunctionality();
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
    if (!themeToggle) return;
    
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
        showNotification(`Switched to ${newTheme} mode`, "info");
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
    
    if (!mobileMenuToggle || !mobileMenu) return;
    
    mobileMenuToggle.addEventListener("click", function() {
        const isHidden = mobileMenu.classList.toggle("hidden");
        mobileMenuToggle.setAttribute("aria-expanded", !isHidden);
        
        // Animate hamburger icon
        const icon = this.querySelector("i");
        if (icon) {
            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-times");
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener("click", function(e) {
        if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target) && !mobileMenu.classList.contains("hidden")) {
            mobileMenu.classList.add("hidden");
            mobileMenuToggle.setAttribute("aria-expanded", "false");
            const icon = mobileMenuToggle.querySelector("i");
            if (icon) {
                icon.classList.add("fa-bars");
                icon.classList.remove("fa-times");
            }
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(link => {
        link.addEventListener("click", function() {
            mobileMenu.classList.add("hidden");
            mobileMenuToggle.setAttribute("aria-expanded", "false");
            const icon = mobileMenuToggle.querySelector("i");
            if (icon) {
                icon.classList.add("fa-bars");
                icon.classList.remove("fa-times");
            }
        });
    });
}

// Enhanced Tasbeeh Counter with Multiple Dhikr Options
function setupTasbeehCounter() {
    const countDisplay = document.getElementById("tasbeeh-count");
    const incrementBtn = document.getElementById("tasbeeh-increment");
    const resetBtn = document.getElementById("tasbeeh-reset");
    
    if (!countDisplay || !incrementBtn || !resetBtn) return;
    
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
    if (!counterContainer) return;
    
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
    
    if (!enhancedDisplay || !dhikrSelector || !dhikrText) return;
    
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
            showNotification(`🎉 ${count} dhikr completed! MashaAllah!`, "celebration");
        } else if (count % 33 === 0) {
            colorClass = "scale-120 bg-gradient-to-r from-green-400 to-emerald-500";
            showNotification(`✅ ${count} dhikr! Barakallahu feeki!`, "success");
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
    
    if (!newDuaBtn || !duaContainer) return;
    
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
    // Enhanced Islamic calendar with proper conversion
    const nav = document.querySelector("nav .flex.items-center.space-x-2");
    if (!nav) return;
    
    // Get Islamic date using API
    async function getIslamicDate() {
        try {
            const today = new Date();
            const response = await fetch(`https://api.aladhan.com/v1/gToH/${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`);
            const data = await response.json();
            
            if (data.code === 200 && data.data) {
                const hijri = data.data.hijri;
                const islamicDate = document.createElement("div");
                islamicDate.className = "hidden md:block text-xs text-gray-500 dark:text-gray-400 ml-4";
                islamicDate.innerHTML = `
                    <div class="text-xs opacity-75">Islamic Date</div>
                    <div class="font-semibold font-amiri">${hijri.day} ${hijri.month.en} ${hijri.year}</div>
                `;
                nav.appendChild(islamicDate);
            } else {
                displayFallbackDate();
            }
        } catch (error) {
            console.log("Islamic date API error:", error);
            displayFallbackDate();
        }
    }
    
    function displayFallbackDate() {
        const today = new Date();
        const islamicMonths = [
            "Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-thani",
            "Jumada al-awwal", "Jumada al-thani", "Rajab", "Sha'ban",
            "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
        ];
        
        const islamicDate = document.createElement("div");
        islamicDate.className = "hidden md:block text-xs text-gray-500 dark:text-gray-400 ml-4";
        islamicDate.innerHTML = `
            <div class="text-xs opacity-75">Islamic Date</div>
            <div class="font-semibold font-amiri">${islamicMonths[today.getMonth()]} ${today.getDate()}</div>
        `;
        nav.appendChild(islamicDate);
    }
    
    getIslamicDate();
}

// Audio Recitations
function setupAudioRecitations() {
    // Add audio controls for Quran recitations
    const verseCards = document.querySelectorAll(".verse-card");
    verseCards.forEach((card, index) => {
        const audioBtn = document.createElement("button");
        audioBtn.className = "absolute top-2 right-2 text-gray-400 hover:text-emerald-500 transition-colors p-2 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/20";
        audioBtn.innerHTML = '<i class="fas fa-play text-sm" aria-hidden="true"></i>';
        audioBtn.setAttribute("aria-label", "Play Quranic recitation");
        audioBtn.title = "Play recitation";
        
        card.style.position = "relative";
        card.appendChild(audioBtn);
        
        let isPlaying = false;
        let audio = null;
        
        audioBtn.addEventListener("click", function() {
            if (isPlaying && audio) {
                audio.pause();
                audio = null;
                isPlaying = false;
                audioBtn.innerHTML = '<i class="fas fa-play text-sm" aria-hidden="true"></i>';
                showNotification("Recitation paused", "info");
            } else {
                // Using Quran.com API for audio recitation
                const verseReference = card.querySelector(".text-sm.text-gray-500")?.textContent || "";
                const surahNumber = extractSurahNumber(verseReference);
                
                if (surahNumber) {
                    playRecitation(surahNumber, audioBtn);
                } else {
                    showNotification("Audio recitation available for full surahs", "info");
                }
            }
        });
    });
    
    function extractSurahNumber(reference) {
        // Extract surah number from reference like "Quran 2:152"
        const match = reference.match(/Quran\s+(\d+)/);
        return match ? match[1] : null;
    }
    
    function playRecitation(surahNumber, button) {
        // Using Quran.com audio API
        const audioUrl = `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surahNumber}.mp3`;
        
        try {
            audio = new Audio(audioUrl);
            button.innerHTML = '<i class="fas fa-pause text-sm" aria-hidden="true"></i>';
            
            audio.play().then(() => {
                isPlaying = true;
                showNotification("Playing recitation...", "success");
            }).catch((error) => {
                console.log("Audio play error:", error);
                showNotification("Audio unavailable. Please try another recitation.", "error");
                button.innerHTML = '<i class="fas fa-play text-sm" aria-hidden="true"></i>';
            });
            
            audio.addEventListener("ended", () => {
                isPlaying = false;
                button.innerHTML = '<i class="fas fa-play text-sm" aria-hidden="true"></i>';
            });
            
            audio.addEventListener("error", () => {
                isPlaying = false;
                button.innerHTML = '<i class="fas fa-play text-sm" aria-hidden="true"></i>';
                showNotification("Audio unavailable", "error");
            });
        } catch (error) {
            console.log("Audio creation error:", error);
            showNotification("Audio playback not supported", "error");
        }
    }
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
            const contentElement = element.querySelector("p");
            if (contentElement) {
                const content = contentElement.textContent;
                shareContent("text", content);
            }
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
    // Enhanced prayer times with better styling and API integration
    const prayerTimesContainer = document.querySelector(".tool-card:nth-child(2) .space-y-2");
    if (!prayerTimesContainer) return;
    
    // Get user location for accurate prayer times
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                fetchPrayerTimes(position.coords.latitude, position.coords.longitude);
            },
            function(error) {
                // Fallback to default times if location access denied
                displayDefaultPrayerTimes();
            }
        );
    } else {
        displayDefaultPrayerTimes();
    }
    
    function displayDefaultPrayerTimes() {
        const now = new Date();
        const times = calculatePrayerTimes(now);
        
        prayerTimesContainer.innerHTML = `
            <div class="prayer-time">
                <span>Fajr:</span>
                <span class="font-semibold">${times.fajr}</span>
            </div>
            <div class="prayer-time">
                <span>Dhuhr:</span>
                <span class="font-semibold">${times.dhuhr}</span>
            </div>
            <div class="prayer-time">
                <span>Asr:</span>
                <span class="font-semibold">${times.asr}</span>
            </div>
            <div class="prayer-time">
                <span>Maghrib:</span>
                <span class="font-semibold">${times.maghrib}</span>
            </div>
            <div class="prayer-time">
                <span>Isha:</span>
                <span class="font-semibold">${times.isha}</span>
            </div>
        `;
    }
    
    function calculatePrayerTimes(date) {
        // Simplified calculation - in production, use proper Islamic prayer time calculation
        const hours = date.getHours();
        const minutes = date.getMinutes();
        
        return {
            fajr: "5:30 AM",
            dhuhr: "12:15 PM",
            asr: "3:45 PM",
            maghrib: "6:20 PM",
            isha: "7:45 PM"
        };
    }
    
    async function fetchPrayerTimes(lat, lng) {
        try {
            // Using Aladhan API (free Islamic prayer times API)
            const today = new Date();
            const response = await fetch(`https://api.aladhan.com/v1/timings/${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}?latitude=${lat}&longitude=${lng}&method=2`);
            const data = await response.json();
            
            if (data.code === 200 && data.data) {
                const timings = data.data.timings;
                prayerTimesContainer.innerHTML = `
                    <div class="prayer-time">
                        <span>Fajr:</span>
                        <span class="font-semibold">${formatTime(timings.Fajr)}</span>
                    </div>
                    <div class="prayer-time">
                        <span>Dhuhr:</span>
                        <span class="font-semibold">${formatTime(timings.Dhuhr)}</span>
                    </div>
                    <div class="prayer-time">
                        <span>Asr:</span>
                        <span class="font-semibold">${formatTime(timings.Asr)}</span>
                    </div>
                    <div class="prayer-time">
                        <span>Maghrib:</span>
                        <span class="font-semibold">${formatTime(timings.Maghrib)}</span>
                    </div>
                    <div class="prayer-time">
                        <span>Isha:</span>
                        <span class="font-semibold">${formatTime(timings.Isha)}</span>
                    </div>
                `;
            } else {
                displayDefaultPrayerTimes();
            }
        } catch (error) {
            console.log("Prayer times API error:", error);
            displayDefaultPrayerTimes();
        }
    }
    
    function formatTime(time24) {
        const [hours, minutes] = time24.split(":");
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    }
    
    // Display default times initially
    displayDefaultPrayerTimes();
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
            const verseElement = activeVerse.querySelector("p");
            if (verseElement) {
                const verse = verseElement.textContent;
                copyToClipboard(verse);
            }
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

// Back to Top Button
function setupBackToTop() {
    const backToTopBtn = document.getElementById("back-to-top");
    if (!backToTopBtn) return;
    
    window.addEventListener("scroll", function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.remove("opacity-0", "pointer-events-none");
            backToTopBtn.classList.add("opacity-100");
        } else {
            backToTopBtn.classList.add("opacity-0", "pointer-events-none");
            backToTopBtn.classList.remove("opacity-100");
        }
    });
    
    backToTopBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Offline Detection
function setupOfflineDetection() {
    const offlineIndicator = document.getElementById("offline-indicator");
    if (!offlineIndicator) return;
    
    function updateOnlineStatus() {
        if (navigator.onLine) {
            offlineIndicator.classList.add("hidden");
        } else {
            offlineIndicator.classList.remove("hidden");
        }
    }
    
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    updateOnlineStatus();
}

// Search Functionality
function setupSearchFunctionality() {
    // Add search input to navigation (optional enhancement)
    const nav = document.querySelector("nav .max-w-7xl");
    if (!nav) return;
    
    // Create search button
    const searchBtn = document.createElement("button");
    searchBtn.className = "hidden md:block p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors";
    searchBtn.innerHTML = '<i class="fas fa-search" aria-hidden="true"></i>';
    searchBtn.setAttribute("aria-label", "Search");
    searchBtn.setAttribute("title", "Search (Ctrl+K)");
    
    const navContainer = nav.querySelector(".flex.justify-between");
    if (navContainer) {
        const themeToggleContainer = navContainer.querySelector(".flex.items-center.space-x-4");
        if (themeToggleContainer) {
            themeToggleContainer.insertBefore(searchBtn, themeToggleContainer.firstChild);
        }
    }
    
    // Search modal
    const searchModal = document.createElement("div");
    searchModal.id = "search-modal";
    searchModal.className = "fixed inset-0 bg-black bg-opacity-50 z-50 hidden items-center justify-center";
    searchModal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 relative">
            <button id="close-search" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" aria-label="Close search">
                <i class="fas fa-times text-xl"></i>
            </button>
            <input type="text" id="search-input" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="Search verses, hadith, duas..." autocomplete="off">
            <div id="search-results" class="mt-4 max-h-96 overflow-y-auto"></div>
        </div>
    `;
    document.body.appendChild(searchModal);
    
    searchBtn.addEventListener("click", function() {
        searchModal.classList.remove("hidden");
        searchModal.classList.add("flex");
        document.getElementById("search-input").focus();
    });
    
    document.getElementById("close-search").addEventListener("click", function() {
        searchModal.classList.add("hidden");
        searchModal.classList.remove("flex");
    });
    
    searchModal.addEventListener("click", function(e) {
        if (e.target === searchModal) {
            searchModal.classList.add("hidden");
            searchModal.classList.remove("flex");
        }
    });
    
    // Search functionality
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");
    
    searchInput.addEventListener("input", function(e) {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            searchResults.innerHTML = "";
            return;
        }
        
        const results = performSearch(query);
        displaySearchResults(results);
    });
    
    // Keyboard shortcut
    document.addEventListener("keydown", function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "k") {
            e.preventDefault();
            searchBtn.click();
        }
        if (e.key === "Escape" && !searchModal.classList.contains("hidden")) {
            document.getElementById("close-search").click();
        }
    });
}

function performSearch(query) {
    const results = [];
    
    // Search verses
    document.querySelectorAll(".verse-card").forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
            const verseText = card.querySelector("p")?.textContent || "";
            results.push({
                type: "Verse",
                text: verseText.substring(0, 100) + "...",
                element: card
            });
        }
    });
    
    // Search hadith
    document.querySelectorAll(".hadith-card").forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
            const hadithText = card.querySelector("blockquote")?.textContent || "";
            results.push({
                type: "Hadith",
                text: hadithText.substring(0, 100) + "...",
                element: card
            });
        }
    });
    
    return results;
}

function displaySearchResults(results) {
    const searchResults = document.getElementById("search-results");
    if (results.length === 0) {
        searchResults.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center py-4">No results found</p>';
        return;
    }
    
    searchResults.innerHTML = results.map((result, index) => `
        <div class="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer border-b border-gray-200 dark:border-gray-600" data-index="${index}">
            <div class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mb-1">${result.type}</div>
            <div class="text-sm text-gray-700 dark:text-gray-300">${result.text}</div>
        </div>
    `).join("");
    
    // Add click handlers
    searchResults.querySelectorAll("[data-index]").forEach((item, index) => {
        item.addEventListener("click", function() {
            const result = results[index];
            result.element.scrollIntoView({ behavior: "smooth", block: "center" });
            result.element.style.animation = "pulse 1s";
            setTimeout(() => {
                result.element.style.animation = "";
            }, 1000);
            document.getElementById("close-search").click();
        });
    });
}

// Performance optimization - Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register("/sw.js")
            .then(function(registration) {
                console.log("ServiceWorker registration successful", registration.scope);
            })
            .catch(function(err) {
                console.log("ServiceWorker registration failed:", err);
            });
    });
}
