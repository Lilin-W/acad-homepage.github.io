---
layout: single
title: "Lana Del Rey"
permalink: /lana/
author_profile: true
toc: false
---

<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Dancing+Script:wght@700&family=Playfair+Display:ital,wght@0,400;1,400&family=Special+Elite&family=Abril+Fatface&display=swap" rel="stylesheet">

<style>
/* --- 全局容器与噪点背景 --- */
.lana-wrapper {
    font-family: 'Playfair Display', serif;
    background-color: #fdfbf7;
    color: #2c2c2c;
    overflow-x: hidden;
    padding: 40px 0;
    position: relative;
    /* 添加一种陈旧的纸张纹理感 */
    background-image: radial-gradient(#e6e6e6 1px, transparent 1px);
    background-size: 20px 20px;
}

/* 模拟老照片的噪点层 */
.lana-wrapper::before {
    content: "";
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 99;
    opacity: 0.4;
}

/* --- 1. 标题与紫色引言 --- */
.hero-section {
    text-align: center;
    margin-bottom: 60px;
    padding: 0 20px;
}

.hero-title h1 {
    font-family: 'Cinzel', serif;
    font-size: 3.8em;
    letter-spacing: 4px;
    color: #1a1a1a;
    margin: 0;
    text-transform: uppercase;
    text-shadow: 3px 3px 0px rgba(108, 92, 231, 0.2); /* 紫色阴影 */
}

/* 你想要的那句紫色的紫色 */
.hero-quote {
    font-family: 'Dancing Script', cursive;
    font-size: 2.2em;
    color: #6a1b9a; /* 深紫色 (Vintage Violet) */
    margin-top: 15px;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
    line-height: 1.4;
    transform: rotate(-2deg); /* 稍微倾斜，更像手写 */
}

.highlight-gold {
    color: #d4af37; /* 金色 */
    font-weight: bold;
    text-shadow: 1px 1px 0 #b7950b;
}

/* --- 2. 真实感胶片长廊 (Realistic Film Strip) --- */
.film-section {
    margin: 60px -20px; /* 撑满 */
    background: #111;
    padding: 20px 0;
    position: relative;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    transform: rotate(1deg); /* 整体稍微歪一点，更随性 */
}

/* 胶片上下穿孔 (CSS 绘制) */
.film-section::before, .film-section::after {
    content: "";
    position: absolute;
    left: 0; right: 0;
    height: 20px;
    background-image: radial-gradient(#fff 40%, transparent 45%);
    background-size: 30px 20px; /* 穿孔间距 */
    background-repeat: repeat-x;
    z-index: 2;
}
.film-section::before { top: 10px; }
.film-section::after { bottom: 10px; }

.film-scroller {
    display: flex;
    overflow-x: auto;
    gap: 0; /* 胶片紧挨着 */
    padding: 10px 0;
    background: #000;
}
/* 隐藏滚动条 */
.film-scroller::-webkit-scrollbar { display: none; }

.film-frame {
    flex: 0 0 auto;
    width: 300px;
    height: 200px;
    margin: 15px 2px;
    position: relative;
    border-left: 2px solid #333; /* 胶片分界线 */
    border-right: 2px solid #333;
}

.film-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: sepia(40%) contrast(1.1) brightness(0.9); /* 强烈的复古滤镜 */
    opacity: 0.9;
    transition: all 0.5s ease;
}

.film-frame:hover img {
    filter: none;
    opacity: 1;
}

/* --- 3. 关键词拼贴 (Moodboard Collage) --- */
/* 这是为了增加页面长度和丰富度 */
.moodboard-section {
    margin: 80px auto;
    max-width: 800px;
    text-align: center;
    position: relative;
}

.cutout-text {
    display: inline-block;
    background: #111;
    color: #fff;
    padding: 5px 15px;
    font-family: 'Abril Fatface', cursive; /* 杂志标题字体 */
    font-size: 1.5em;
    margin: 10px;
    transform: rotate(2deg);
    box-shadow: 3px 3px 10px rgba(0,0,0,0.3);
}

.cutout-text:nth-child(even) {
    background: #6a1b9a; /* 紫色背景块 */
    transform: rotate(-3deg);
    font-family: 'Special Elite', monospace;
}

.cutout-text:nth-child(3n) {
    background: #b76e79; /* 玫瑰色背景块 */
    transform: rotate(1deg);
    color: #111;
    font-weight: bold;
}

/* --- 4. 摄影作品展示 (Scattered Photos) --- */
.scatter-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    margin: 60px 20px;
}

.photo-card {
    background: #fff;
    padding: 15px 15px 40px 15px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.15);
    transition: transform 0.3s ease;
    text-align: center;
}

.photo-card img {
    width: 100%;
    filter: grayscale(20%);
}

.photo-card:nth-child(1) { transform: rotate(-2deg); }
.photo-card:nth-child(2) { transform: rotate(3deg); margin-top: 40px; }
.photo-card:nth-child(3) { transform: rotate(-1deg); }

.photo-card:hover {
    transform: scale(1.05) rotate(0deg);
    z-index: 10;
}

.photo-caption {
    font-family: 'Dancing Script', cursive;
    color: #555;
    font-size: 1.3em;
    margin-top: 10px;
}

.lyric-footer {
    text-align: center;
    font-family: 'Special Elite', cursive;
    margin-top: 80px;
    border-top: 1px solid #ccc;
    padding-top: 30px;
    color: #777;
    font-size: 0.9em;
}
</style>

<div class="lana-wrapper">

    <div class="hero-section">
        <div class="hero-title">
            <h1>Lana Del Rey</h1>
        </div>
        <div class="hero-quote">
            "That's how the light gets in. Then you're <span class="highlight-gold">golden</span>."
        </div>
    </div>

    <div class="film-section">
        <div class="film-scroller">
            <div class="film-frame">
                <img src="/images/xiaoman-portrait-1.png" alt="Lana 1">
            </div>
            <div class="film-frame">
                <img src="/images/xiaoman-portrait-2.png" alt="Lana 2">
            </div>
            <div class="film-frame">
                 <img src="/images/xiaoman-portrait-3.png" alt="Lana 3">
            </div>
             <div class="film-frame">
                <img src="/images/cute.jpg" alt="Vintage Car">
            </div>
             <div class="film-frame">
                <img src="/images/wink.jpg" alt="Mood">
            </div>
             <div class="film-frame">
                <img src="/images/jump.jpg" alt="Film">
            </div>
        </div>
    </div>

    <div class="moodboard-section">
        <p style="font-family:'Special Elite'; margin-bottom:20px; color:#888;">// AESTHETICS //</p>
        
        <div class="cutout-text">Americana</div>
        <div class="cutout-text">Vintage Vinyl</div>
        <div class="cutout-text">Sadcore</div>
        <div class="cutout-text">Cherry Pie</div>
        <br>
        <div class="cutout-text">Born to Die</div>
        <div class="cutout-text">Old Money</div>
        <div class="cutout-text">Coquette</div>
        <div class="cutout-text">Ultraviolence</div>
    </div>

    <div class="scatter-grid">
        <div class="photo-card">
            <img src="/images/xiaoman-portrait-4.png" alt="Photo 1">
            <div class="photo-caption">Summertime Sadness</div>
        </div>

        <div class="photo-card">
            <img src="/images/keyboard.jpg" alt="Photo 2">
            <div class="photo-caption">High by the beach</div>
        </div>

        <div class="photo-card">
            <img src="/images/xiaoman.jpg" alt="Photo 3">
            <div class="photo-caption">Blue Jeans</div>
        </div>
    </div>

    <div class="lyric-footer">
        <p>Listening to 1960s music in a 2025 world.</p>
        <p style="letter-spacing: 2px;">★ ★ ★</p>
    </div>

</div>

