---
layout: single
title: "Film Photography"
permalink: /film/
author_profile: true
toc: false
---

<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Inconsolata:wght@400;500&display=swap" rel="stylesheet">

<style>
/* --- VARIABLES --- */
:root {
    --bg-color: #f4f1ea; /* 暖米色，像旧纸张 */
    --text-main: #2b2b2b; /* 柔和的黑 */
    --text-meta: #6e6e6e;
    --accent-red: #cc4e4e; /* 模仿莱卡标或柯达红 */
}

/* --- GLOBAL WRAPPER --- */
.film-wrapper {
    font-family: 'Cormorant Garamond', serif;
    background-color: var(--bg-color);
    color: var(--text-main);
    padding: 80px 40px;
    position: relative;
    font-size: 18px;
    line-height: 1.6;
    overflow-x: hidden;
}

/* 全局噪点层 - 调整得更细腻 */
.film-wrapper::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 999;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* --- TYPOGRAPHY --- */
.header-section {
    text-align: center;
    margin-bottom: 100px;
    position: relative;
    z-index: 10;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    padding-bottom: 60px;
}

.main-title {
    font-size: clamp(3rem, 8vw, 6rem); /* 响应式大标题 */
    font-weight: 300;
    letter-spacing: -1px;
    margin: 0;
    line-height: 1;
    text-transform: uppercase;
}

.sub-title {
    font-family: 'Inconsolata', monospace;
    font-size: 1rem;
    color: var(--text-meta);
    margin-top: 20px;
    letter-spacing: 2px;
    text-transform: uppercase;
    display: inline-block;
    position: relative;
}

.sub-title::after {
    content: "";
    display: block;
    width: 40px;
    height: 1px;
    background: var(--accent-red);
    margin: 10px auto 0;
}

/* --- EVENT SECTION --- */
.event-container {
    max-width: 1200px;
    margin: 0 auto 120px;
}

.event-info {
    text-align: center;
    margin-bottom: 50px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.event-name {
    font-size: 2.5rem;
    font-weight: 400;
    font-style: italic;
    margin-bottom: 10px;
}

.event-meta {
    font-family: 'Inconsolata', monospace;
    font-size: 0.85rem;
    color: var(--text-meta);
    margin-bottom: 25px;
    letter-spacing: 1px;
}

.event-desc {
    font-size: 1.1rem;
    color: #4a4a4a;
}

/* --- PHOTO GRID (THE CONTACT SHEET LOOK) --- */
.photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px; /* 宽间距 */
    padding: 20px;
}

/* 每一张照片的容器 */
.photo-card {
    background: #fff;
    padding: 15px 15px 40px 15px; /* 底部留白像拍立得 */
    box-shadow: 0 10px 30px rgba(0,0,0,0.05); /* 柔和阴影 */
    transition: all 0.4s ease;
    transform: rotate(0deg);
    position: relative;
    cursor: pointer;
}

/* 让照片稍微有些随机的角度，更自然 */
.photo-card:nth-child(odd) { transform: rotate(-1deg); }
.photo-card:nth-child(even) { transform: rotate(1deg); }
.photo-card:nth-child(3n) { transform: rotate(0.5deg); }

/* Hover 效果 */
.photo-card:hover {
    transform: scale(1.02) rotate(0deg) translateY(-5px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.12);
    z-index: 10;
}

.photo-card img {
    width: 100%;
    height: auto;
    display: block;
    filter: sepia(10%) contrast(1.1); /* 轻微胶片滤镜 */
    transition: filter 0.3s ease;
}

.photo-card:hover img {
    filter: sepia(0%) contrast(1.0); /* Hover时还原 */
}

/* 照片下方的元数据 */
.photo-meta {
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
    text-align: center;
    font-family: 'Inconsolata', monospace;
    font-size: 0.7rem;
    color: #ccc;
    opacity: 0; /* 默认隐藏 */
    transition: opacity 0.3s ease;
}

.photo-card:hover .photo-meta {
    opacity: 1;
    color: #999;
}

/* --- RESPONSIVE --- */
@media (max-width: 768px) {
    .film-wrapper { padding: 40px 20px; }
    .photo-grid { gap: 20px; }
    .photo-card { padding: 10px 10px 30px 10px; }
    /* 手机端取消旋转，保持整洁 */
    .photo-card:nth-child(n) { transform: rotate(0deg); } 
}
</style>

<div class="film-wrapper">

    <div class="header-section">
        <h1 class="main-title">Analog Journal</h1>
        <div class="sub-title">Light, Shadow & Time</div>
    </div>

    <div class="event-container">
        <div class="event-info">
            <h2 class="event-name">Mount Rainier</h2>
            <div class="event-meta">KODAK PORTRA 400 • PENTAX K1000</div>
            <p class="event-desc">
                The morning mist, the play of light through the mountains, and those unexpected moments of serendipity.
            </p>
        </div>

        <div class="photo-grid">
            <div class="photo-card">
                <img src="/images/rainier1.jpg" alt="Rainier 1" loading="lazy">
                <div class="photo-meta">f/8 • 1/250</div>
            </div>
            
            <div class="photo-card">
                <img src="/images/rainier2.jpg" alt="Rainier 2" loading="lazy">
                <div class="photo-meta">f/5.6 • 1/125</div>
            </div>

            <div class="photo-card">
                <img src="/images/rainier3.jpg" alt="Rainier 3" loading="lazy">
                <div class="photo-meta">f/11 • 1/500</div>
            </div>
            
            <div class="photo-card">
                <img src="/images/rainier4.jpg" alt="Rainier 4" loading="lazy">
                <div class="photo-meta">Double Exposure</div>
            </div>
            
            <div class="photo-card">
                <img src="/images/rainier5.jpg" alt="Rainier 5" loading="lazy">
                <div class="photo-meta">f/2.8 • 1/60</div>
            </div>

            <div class="photo-card">
                <img src="/images/rainier6.jpg" alt="Rainier 6" loading="lazy">
                <div class="photo-meta">f/4 • 1/125</div>
            </div>
        </div>
    </div>

    <div style="text-align: center; margin: 80px 0; opacity: 0.3;">
        <span style="font-family: 'Inconsolata'; letter-spacing: 5px;">* * *</span>
    </div>

</div>
