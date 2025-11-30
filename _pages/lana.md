---
layout: single
title: "Lana Del Rey"
permalink: /lana/
author_profile: true
toc: false
---

<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Dancing+Script:wght@600&family=Playfair+Display:ital,wght@0,400;1,400&family=Special+Elite&display=swap" rel="stylesheet">

<style>
/* --- 全局容器 --- */
.lana-wrapper {
    font-family: 'Playfair Display', serif;
    background-color: #fdfbf7;
    color: #2c2c2c;
    overflow-x: hidden;
    padding: 40px 0;
}

/* --- 1. 标题区 --- */
.hero-title {
    text-align: center;
    margin-bottom: 50px;
    position: relative;
    z-index: 5;
}

.hero-title h1 {
    font-family: 'Cinzel', serif;
    font-size: 4.5em;
    letter-spacing: 5px;
    color: #111;
    margin: 0;
    text-transform: uppercase;
    text-shadow: 2px 2px 0px rgba(0,0,0,0.1);
    line-height: 1.2;
}

.hero-subtitle-text {
    font-family: 'Dancing Script', cursive;
    font-size: 1.8em;
    color: #6a1b9a; /* 复古紫 */
    margin-top: 15px;
    transform: rotate(-1deg);
    opacity: 0.9;
}

/* --- 2. 胶片长廊 (V9 版本：精致小方孔) --- */
.film-strip-container {
    background-color: #121212; /* 深黑底色 */
    padding: 35px 0; /* 内边距 */
    margin: 50px -20px;
    overflow-x: auto;
    white-space: nowrap;
    position: relative;
    box-shadow: 0 15px 40px rgba(0,0,0,0.4);

    /* V9 的精致小方孔设计 */
    background-image: 
        linear-gradient(90deg, #fdfbf7 55%, transparent 55%),
        linear-gradient(90deg, #fdfbf7 55%, transparent 55%);
    
    background-position: 0 10px, 0 calc(100% - 10px); 
    background-size: 20px 12px; /* 小巧的方孔 */
    background-repeat: repeat-x;
    background-attachment: local;
}

.film-strip-container::-webkit-scrollbar {
    display: none; 
}

.film-frame {
    display: inline-block;
    height: 240px; 
    margin: 0 1px;
    padding: 0 8px; /* 黑边 */
    vertical-align: middle;
    position: relative;
    border-left: 1px solid #2a2a2a; 
}

.film-frame img {
    height: 100%;
    width: auto;
    object-fit: cover;
    filter: sepia(20%) contrast(105%) brightness(0.95);
    transition: all 0.5s ease;
    border-radius: 1px;
}

.film-frame:hover img {
    filter: none;
    transform: scale(1.02);
    box-shadow: 0 0 20px rgba(255,255,255,0.15);
    opacity: 1;
    z-index: 10;
}

/* --- 3. 手账日记区 (回归左右并排) --- */
.journal-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 60px;
    margin: 80px 20px;
}

/* 左侧：日记便签 */
.torn-diary-entry {
    flex: 1.5;
    min-width: 380px;
    min-height: 400px;
    background: #fffdf0;
    padding: 45px 40px;
    position: relative;
    box-shadow: 5px 10px 25px rgba(0,0,0,0.1);
    transform: rotate(1deg);
    
    /* 撕纸边缘 */
    --mask: radial-gradient(10px at 50% 12.5px, #000 99%, #0000 101%) 50% -12.5px / 20px 25px repeat-x;
    -webkit-mask: var(--mask) bottom, var(--mask) top;
    mask: var(--mask) bottom, var(--mask) top;
}

.tape-fix {
    position: absolute;
    top: -18px;
    left: 50%;
    transform: translateX(-50%) rotate(-1deg);
    width: 140px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(2px);
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    border-left: 2px dotted rgba(255,255,255,0.5);
    border-right: 2px dotted rgba(255,255,255,0.5);
}

.diary-content {
    font-family: 'Special Elite', cursive;
    font-size: 1.1em;
    line-height: 2;
    color: #333;
}

.lyric-highlight {
    color: #a83f39;
    font-weight: bold;
    background: rgba(168, 63, 57, 0.05);
    padding: 0 4px;
}

/* 右侧：散落照片 */
.journal-photos {
    flex: 1;
    min-width: 300px;
    height: 400px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.scattered-photo {
    position: absolute;
    border: 12px solid #fff;
    border-bottom: 40px solid #fff; /* 拍立得宽底 */
    box-shadow: 10px 15px 30px rgba(0,0,0,0.2);
    width: 250px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.scattered-photo:nth-child(1) { transform: rotate(-6deg) translate(-20px, 20px); z-index: 1; }
.scattered-photo:nth-child(2) { transform: rotate(5deg) translate(30px, -20px); z-index: 2; }

/* 交互 */
.journal-photos:hover .scattered-photo:nth-child(1) {
    transform: rotate(-12deg) translate(-60px, 30px) scale(1.05);
}
.journal-photos:hover .scattered-photo:nth-child(2) {
    transform: rotate(10deg) translate(50px, -30px) scale(1.05);
}

.vintage-line {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0,0,0,0), #d4af37, rgba(0,0,0,0));
    opacity: 0.5;
    margin: 50px 0;
}
</style>

<div class="lana-wrapper">

    <div class="hero-title">
        <h1>Lana Del Rey</h1>
        <div class="hero-subtitle-text">
            "That's how the light gets in. Then you're <span style="color:#d4af37;">golden</span>."
        </div>
    </div>

    <div class="film-strip-container">
        <div class="film-frame"><img src="/images/xiaoman-portrait-1.png" alt="Shot 1"></div>
        <div class="film-frame"><img src="/images/xiaoman-portrait-2.png" alt="Shot 2"></div>
        <div class="film-frame"><img src="/images/xiaoman-portrait-3.png" alt="Shot 3"></div>
        <div class="film-frame"><img src="/images/cute.jpg" alt="Shot 4"></div>
        <div class="film-frame"><img src="/images/wink.jpg" alt="Shot 5"></div>
        <div class="film-frame"><img src="/images/jump.jpg" alt="Shot 6"></div>
        <div class="film-frame"><img src="/images/xiaoman-portrait-4.png" alt="Shot 7"></div>
        <div class="film-frame"><img src="/images/keyboard.jpg" alt="Shot 8"></div>
    </div>

    <hr class="vintage-line">

    <div class="journal-section">
        
        <div class="torn-diary-entry">
            <div class="tape-fix"></div>
            <div class="diary-content">
                <p>
                    <strong>September 2025.</strong><br><br>
                    Sitting on the porch, listening to <span class="lyric-highlight">Ultraviolence</span> on vinyl. 
                    The air smells like rain and old perfume.
                    <br><br>
                    Everything feels like a scene from a movie I haven't seen yet. 
                    Grainy textures, soft focus, and the melancholy beauty of everyday life.
                    <br><br>
                    I try to capture these fleeting moments—not just what they look like, but what they <em>feel</em> like.
                </p>
            </div>
        </div>

        <div class="journal-photos">
            <img class="scattered-photo" src="/images/xiaoman-portrait-4.png" alt="Memory 1">
            <img class="scattered-photo" src="/images/keyboard.jpg" alt="Memory 2">
        </div>

    </div>
    
    <div style="text-align:center; margin-top:60px; font-family:'Cinzel', serif; font-size:0.8em; color:#888;">
        — EST. 2025 —
    </div>

</div>
