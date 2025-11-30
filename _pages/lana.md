---
layout: single
title: "Lana Del Rey"
permalink: /lana/
author_profile: true
toc: false
---

<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Monsieur+La+Doulaise&family=Special+Elite&display=swap" rel="stylesheet">

<style>
/* --- 0. 全局设置：电影胶片噪点背景 --- */
.lana-wrapper {
    font-family: 'Cormorant Garamond', serif; /* 核心字体升级 */
    background-color: #fdfbf7;
    color: #1a1a1a;
    overflow-x: hidden;
    padding: 60px 0;
    position: relative;
    font-size: 18px; /* 基础字号调大 */
}

/* 动态噪点层 (Film Grain Overlay) */
.lana-wrapper::after {
    content: "";
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none;
    z-index: 999;
    opacity: 0.08; /* 噪点透明度 */
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    animation: grain-flicker 1s infinite steps(5); /* 微微闪动 */
}

@keyframes grain-flicker {
    0%, 100% { transform: translate(0, 0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(2px, -2px); }
    60% { transform: translate(-2px, -2px); }
    80% { transform: translate(2px, 2px); }
}

/* --- 1. 标题区：极简文学风 --- */
.hero-header {
    text-align: center;
    margin-bottom: 70px;
    position: relative;
    padding: 20px;
    border-bottom: 1px solid rgba(0,0,0,0.1); /* 细线分割 */
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
}

.hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 5em;
    font-weight: 400; /* 极细字体，更高级 */
    letter-spacing: -1px; /* 紧凑排版 */
    text-transform: uppercase;
    color: #111;
    margin: 0;
    line-height: 0.9;
}

.hero-subtitle {
    font-family: 'Monsieur La Doulaise', cursive;
    font-size: 3em; /* 大号手写体 */
    color: #6a1b9a; /* 复古紫 */
    margin-top: -20px;
    transform: rotate(-3deg);
    text-shadow: 2px 2px 0px rgba(255,255,255,0.8);
    position: relative;
    z-index: 2;
}

/* --- 2. 胶片长廊：保留 V9 的精致方孔，但加深色调 --- */
.film-strip-container {
    background-color: #0a0a0a; /* 接近纯黑 */
    padding: 30px 0;
    margin: 60px -20px;
    overflow-x: auto;
    white-space: nowrap;
    position: relative;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    transform: rotate(-2deg); /* 胶片倾斜效果 */
    width: 105%; /* 稍微加宽让倾斜后不留白 */
    left: -2.5%;

    /* 精致的小方孔 */
    background-image: 
        linear-gradient(90deg, #fdfbf7 50%, transparent 50%),
        linear-gradient(90deg, #fdfbf7 50%, transparent 50%);
    background-position: 0 10px, 0 calc(100% - 10px);
    background-size: 16px 10px; /* 更小更密 */
    background-repeat: repeat-x;
    background-attachment: local;
}

.film-strip-container::-webkit-scrollbar { display: none; }

.film-frame {
    display: inline-block;
    height: 220px;
    margin: 0 0px; /* 无缝连接 */
    padding: 0 10px;
    vertical-align: middle;
    border-right: 1px solid #222; /* 隐约的分割线 */
}

.film-frame img {
    height: 100%;
    width: auto;
    object-fit: cover;
    filter: sepia(30%) contrast(110%) brightness(0.8); /* 稍微暗一点，显质感 */
    transition: all 0.6s ease;
    border-radius: 1px;
}

.film-frame:hover img {
    filter: none;
    opacity: 1;
    transform: scale(1.05);
    z-index: 10;
    box-shadow: 0 0 30px rgba(255,255,255,0.1);
}

/* --- 3. 文艺手账区 (Editorial Layout) --- */
.journal-layout {
    display: grid;
    grid-template-columns: 1fr 1fr; /* 左右分栏 */
    gap: 60px;
    margin: 80px 20px;
    align-items: center;
}

/* 左侧：便签样式 */
.poem-card {
    background: #fffdf0; /* 米黄色便签纸 */
    padding: 45px 40px;
    font-family: 'Special Elite', cursive;
    font-size: 1.1em;
    line-height: 2.2; /* 宽行距 */
    color: #333;
    position: relative;
    box-shadow: 5px 10px 25px rgba(0,0,0,0.15);
    transform: rotate(1deg);
    
    /* 撕裂边缘效果 */
    --mask: radial-gradient(10px at 50% 12.5px, #000 99%, #0000 101%) 50% -12.5px / 20px 25px repeat-x;
    -webkit-mask: var(--mask) bottom, var(--mask) top;
    mask: var(--mask) bottom, var(--mask) top;
}

/* 透明胶带 */
.poem-card::before {
    content: "";
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
    z-index: 10;
}

/* 右侧：堆叠的相片 + 黑胶唱片 */
.visual-stack {
    position: relative;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 相片相框 */
.framed-photo {
    position: absolute;
    width: 280px;
    padding: 15px 15px 50px 15px;
    background: #fff;
    box-shadow: 0 15px 35px rgba(0,0,0,0.2);
    transform: rotate(-3deg);
    z-index: 2;
    transition: transform 0.4s;
}
.framed-photo img { width: 100%; filter: grayscale(20%); }
.framed-photo:hover { transform: rotate(0deg) scale(1.02); z-index: 5; }

/* 黑胶唱片 (Vinyl) 装饰 */
.vinyl-record {
    position: absolute;
    right: 0px;
    bottom: 20px;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, #111 20%, #333 21%, #111 22%, #111 30%, #333 31%, #111 32%, #111 40%, #333 41%, #111 42%, #000 70%);
    border-radius: 50%;
    z-index: 1; /* 在照片下面 */
    box-shadow: 0 10px 30px rgba(0,0,0,0.4);
    animation: spin 10s linear infinite; /* 缓慢旋转 */
}

/* 唱片中间的标签 */
.vinyl-label {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 70px; height: 70px;
    background: #b76e79; /* 玫瑰色 */
    border-radius: 50%;
    border: 2px solid #fff;
}

@keyframes spin { 100% { transform: rotate(360deg); } }

/* --- 装饰性细节 --- */
.signature-text {
    font-family: 'Monsieur La Doulaise', cursive;
    font-size: 1.8em;
    color: #555;
    text-align: right;
    margin-top: 20px;
}

.lyric-highlight {
    color: #a83f39; /* 深红 */
    font-weight: bold;
}

/* 移动端适配 */
@media (max-width: 768px) {
    .journal-layout { grid-template-columns: 1fr; gap: 40px; }
    .vinyl-record { right: 20px; bottom: -40px; width: 150px; height: 150px; }
}
</style>

<div class="lana-wrapper">

    <div class="hero-header">
        <h1 class="hero-title">Lana Del Rey</h1>
        <div class="hero-subtitle">The Honeymoon Era</div>
    </div>

    <div class="film-strip-container">
        <div class="film-frame"><img src="/images/xiaoman-portrait-1.png"></div>
        <div class="film-frame"><img src="/images/xiaoman-portrait-2.png"></div>
        <div class="film-frame"><img src="/images/xiaoman-portrait-3.png"></div>
        <div class="film-frame"><img src="/images/cute.jpg"></div>
        <div class="film-frame"><img src="/images/wink.jpg"></div>
        <div class="film-frame"><img src="/images/jump.jpg"></div>
        <div class="film-frame"><img src="/images/xiaoman-portrait-4.png"></div>
        <div class="film-frame"><img src="/images/keyboard.jpg"></div>
    </div>

    <div class="journal-layout">
        
        <div class="poem-card">
            <p>
                <strong>September 2025.</strong><br><br>
                Sitting on the porch, listening to <span class="lyric-highlight">Ultraviolence</span>. 
                The world feels like a grainy movie scene.
                <br><br>
                "That's how the light gets in. <br>
                Then you're <strong style="color:#d4af37;">golden</strong>."
                <br><br>
                Capturing the melancholy beauty of everyday life. 
                It's not just about the picture; it's about the feeling of being <em>infinite</em>.
            </p>
            <div class="signature-text">— Yours, L.</div>
        </div>

        <div class="visual-stack">
            <div class="vinyl-record">
                <div class="vinyl-label"></div>
            </div>
            
            <div class="framed-photo">
                <img src="/images/xiaoman-portrait-4.png" alt="Memory">
                <div style="font-family:'Monsieur La Doulaise'; font-size:1.8em; text-align:center; margin-top:10px; color:#444;">
                    Summertime Sadness
                </div>
            </div>
        </div>

    </div>
    
    <div style="text-align:center; margin-top:80px; font-size:0.8em; letter-spacing:3px; opacity:0.6;">
        EST. 2025 
    </div>

</div>