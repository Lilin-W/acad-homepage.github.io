---
layout: single
title: "Film Photography"
permalink: /film/
author_profile: true
toc: false
---

<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Courier+Prime&display=swap" rel="stylesheet">

<style>
/* Global settings */
.film-wrapper {
    font-family: 'Cormorant Garamond', serif;
    background-color: #fdfbf7;
    background-image: url('/images/bg.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    color: #1a1a1a;
    overflow-x: hidden;
    padding: 60px 0;
    position: relative;
    font-size: 18px;
    box-shadow: inset 0 0 150px rgba(0,0,0,0.08);
}

/* Film grain overlay */
.film-wrapper::after {
    content: ""; 
    position: fixed; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%; 
    pointer-events: none; 
    z-index: 999; 
    opacity: 0.06;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    animation: grain-flicker 1s infinite steps(5);
}

@keyframes grain-flicker { 
    0%, 100% { transform: translate(0, 0); } 
    20% { transform: translate(-2px, 2px); } 
    80% { transform: translate(2px, 2px); } 
}

/* Header section */
.hero-header {
    text-align: center; 
    margin-bottom: 70px; 
    position: relative; 
    padding: 20px; 
    border-bottom: 1px solid rgba(0,0,0,0.1); 
    max-width: 80%; 
    margin-left: auto; 
    margin-right: auto; 
    z-index: 10;
}

.hero-title {
    font-family: 'Cormorant Garamond', serif; 
    font-size: 4em; 
    font-weight: 400; 
    letter-spacing: 2px; 
    text-transform: uppercase; 
    color: #111; 
    margin: 0; 
    line-height: 1.2;
}

.hero-subtitle {
    font-family: 'Courier Prime', monospace; 
    font-size: 1.2em; 
    color: #666; 
    margin-top: 15px; 
    letter-spacing: 3px;
}

/* Event container */
.event-section {
    margin: 100px auto;
    max-width: 1400px;
    padding: 0 20px;
    position: relative;
    z-index: 10;
}

/* Event title */
.event-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3em;
    font-weight: 600;
    color: #2c2c2c;
    margin-bottom: 10px;
    letter-spacing: 1px;
}

.event-date {
    font-family: 'Courier Prime', monospace;
    font-size: 1em;
    color: #888;
    margin-bottom: 30px;
    letter-spacing: 2px;
}

.event-description {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3em;
    line-height: 1.8;
    color: #444;
    margin-bottom: 40px;
    max-width: 800px;
}

/* Film strip gallery */
.film-strip-container {
    background-color: #0a0a0a; 
    padding: 30px 0; 
    margin: 40px -20px; 
    overflow-x: auto; 
    white-space: nowrap; 
    position: relative; 
    box-shadow: 0 20px 40px rgba(0,0,0,0.3); 
    transform: rotate(-1deg); 
    width: 105%; 
    left: -2.5%; 
    z-index: 5;
    background-image: linear-gradient(90deg, #fdfbf7 50%, transparent 50%), linear-gradient(90deg, #fdfbf7 50%, transparent 50%);
    background-position: 0 10px, 0 calc(100% - 10px); 
    background-size: 16px 10px; 
    background-repeat: repeat-x; 
    background-attachment: local;
}

.film-strip-container::-webkit-scrollbar { 
    display: none; 
}

.film-frame { 
    display: inline-block; 
    height: 220px; 
    padding: 0 10px; 
    vertical-align: middle; 
    border-right: 1px solid #222; 
}

.film-frame img { 
    height: 100%; 
    width: auto; 
    object-fit: cover; 
    transition: all 0.6s ease; 
    border-radius: 1px; 
    cursor: pointer;
}

.film-frame:hover img { 
    transform: scale(1.05); 
    z-index: 10; 
    box-shadow: 0 0 30px rgba(255,255,255,0.1); 
}

/* Divider */
.event-divider {
    width: 60%;
    height: 2px;
    background: linear-gradient(to right, transparent, #ccc 20%, #ccc 80%, transparent);
    margin: 120px auto;
}

/* Footer text */
.footer-text {
    text-align: center; 
    margin-top: 100px; 
    font-size: 0.8em; 
    letter-spacing: 3px; 
    opacity: 0.6;
    font-family: 'Courier Prime', monospace;
}

/* Responsive design */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2.5em;
    }
    
    .event-title {
        font-size: 2em;
    }
    
    .film-strip-container {
        transform: rotate(0deg);
        width: 100%;
        left: 0;
    }
}
</style>

<div class="film-wrapper">

    <div class="hero-header">
        <h1 class="hero-title">Film Photography</h1>
        <div class="hero-subtitle">Capturing Moments on Analog</div>
    </div>

    <!-- Event 1: Mount Rainier -->
    <div class="event-section">
        <h2 class="event-title">Mount Rainier</h2>
        <p class="event-date">MOUNT RAINIER • 2024</p>
        <div class="event-description">
            During my trip to Mount Rainier, I truly experienced the magic of film photography for the first time.
            The morning mist, the play of light through the mountains, and those unexpected moments of serendipity—all captured in these frames.
        </div>
        
        <div class="film-strip-container">
            <div class="film-frame"><img src="/images/rainier1.jpg" alt="Mount Rainier 1"></div>
            <div class="film-frame"><img src="/images/rainier2.jpg" alt="Mount Rainier 2"></div>
            <div class="film-frame"><img src="/images/rainier3.jpg" alt="Mount Rainier 3"></div>
            <div class="film-frame"><img src="/images/rainier4.jpg" alt="Mount Rainier 4"></div>
            <div class="film-frame"><img src="/images/rainier5.jpg" alt="Mount Rainier 5"></div>
            <div class="film-frame"><img src="/images/rainier6.jpg" alt="Mount Rainier 6"></div>
        </div>
    </div>

    <div class="event-divider"></div>

    <!-- More events can be added here -->
    <!-- Event 2 placeholder -->

    <div class="footer-text">
        FILM PHOTOGRAPHY JOURNAL • EST. 2024
    </div>

</div>

<script>
// Image click functionality (optional)
document.addEventListener('DOMContentLoaded', function() {
    const filmFrames = document.querySelectorAll('.film-frame img');
    
    filmFrames.forEach(img => {
        img.addEventListener('click', function() {
            // Can add lightbox effect or other interactions
            console.log('Image clicked:', this.src);
        });
    });
});
</script>

