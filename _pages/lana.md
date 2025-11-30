---
layout: single
title: "Lana Del Rey"
permalink: /lana/
author_profile: true
toc: false
---

<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Monsieur+La+Doulaise&family=Special+Elite&display=swap" rel="stylesheet">

<style>
/* --- 0. 全局设置 --- */
.lana-wrapper {
    font-family: 'Cormorant Garamond', serif;
    background-color: #fdfbf7;
    background-image: url('/images/bg.jpg'); /* 添加背景图 */
    background-size: cover; /* 覆盖整个区域 */
    background-position: center; /* 居中 */
    background-repeat: no-repeat; /* 不重复 */
    background-attachment: fixed; /* 固定背景，滚动时不动 */
    color: #1a1a1a;
    overflow-x: hidden;
    padding: 60px 0;
    position: relative;
    font-size: 18px;
}

/* 动态噪点层 */
.lana-wrapper::after {
    content: "";
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none;
    z-index: 999;
    opacity: 0.08;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    animation: grain-flicker 1s infinite steps(5);
}

@keyframes grain-flicker { 0%, 100% { transform: translate(0, 0); } 20% { transform: translate(-2px, 2px); } 80% { transform: translate(2px, 2px); } }

/* --- 1. 标题区 --- */
.hero-header {
    text-align: center;
    margin-bottom: 70px;
    position: relative;
    padding: 20px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
}

.hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 5em;
    font-weight: 400;
    letter-spacing: -1px;
    text-transform: uppercase;
    color: #111;
    margin: 0;
    line-height: 0.9;
}

.hero-subtitle {
    font-family: 'Monsieur La Doulaise', cursive;
    font-size: 3em;
    color: #6a1b9a;
    margin-top: -20px;
    transform: rotate(-3deg);
    text-shadow: 2px 2px 0px rgba(255,255,255,0.8);
    position: relative;
    z-index: 2;
}

/* --- 2. 胶片长廊 --- */
.film-strip-container {
    background-color: #0a0a0a;
    padding: 30px 0;
    margin: 60px -20px;
    overflow-x: auto;
    white-space: nowrap;
    position: relative;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    transform: rotate(-2deg);
    width: 105%;
    left: -2.5%;
    background-image: linear-gradient(90deg, #fdfbf7 50%, transparent 50%), linear-gradient(90deg, #fdfbf7 50%, transparent 50%);
    background-position: 0 10px, 0 calc(100% - 10px);
    background-size: 16px 10px;
    background-repeat: repeat-x;
    background-attachment: local;
}

.film-strip-container::-webkit-scrollbar { display: none; }

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
    filter: sepia(30%) contrast(110%) brightness(0.8);
    transition: all 0.6s ease;
    border-radius: 1px;
}

.film-frame:hover img { filter: none; opacity: 1; transform: scale(1.05); z-index: 10; box-shadow: 0 0 30px rgba(255,255,255,0.1); }

/* --- 3. 手账区 --- */
.journal-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin: 80px auto;
    max-width: 1200px;
    padding: 0 40px;
    align-items: center;
}

.poem-card {
    background: #fffdf0;
    padding: 45px 40px;
    font-family: 'Special Elite', cursive;
    font-size: 1.1em;
    line-height: 2.2;
    color: #333;
    position: relative;
    box-shadow: 5px 10px 25px rgba(0,0,0,0.15);
    transform: rotate(1deg);
    --mask: radial-gradient(10px at 50% 12.5px, #000 99%, #0000 101%) 50% -12.5px / 20px 25px repeat-x;
    -webkit-mask: var(--mask) bottom, var(--mask) top;
    mask: var(--mask) bottom, var(--mask) top;
}

.poem-card::before {
    content: "";
    position: absolute;
    top: -18px; left: 50%;
    transform: translateX(-50%) rotate(-1deg);
    width: 140px; height: 40px;
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(2px);
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    border-left: 2px dotted rgba(255,255,255,0.5);
    border-right: 2px dotted rgba(255,255,255,0.5);
    z-index: 10;
}

.visual-stack {
    position: relative;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
}

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

.vinyl-record {
    position: absolute;
    right: 0px; bottom: 20px;
    width: 200px; height: 200px;
    background: radial-gradient(circle, #111 20%, #333 21%, #111 22%, #111 30%, #333 31%, #111 32%, #111 40%, #333 41%, #111 42%, #000 70%);
    border-radius: 50%;
    z-index: 1;
    box-shadow: 0 10px 30px rgba(0,0,0,0.4);
    animation: spin 10s linear infinite;
}

.vinyl-label {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 70px; height: 70px;
    background: #b76e79;
    border-radius: 50%;
    border: 2px solid #fff;
}

@keyframes spin { 100% { transform: rotate(360deg); } }

.signature-text {
    font-family: 'Monsieur La Doulaise', cursive;
    font-size: 1.8em;
    color: #555;
    text-align: right;
    margin-top: 20px;
}

.lyric-highlight { color: #a83f39; font-weight: bold; }

/* --- 4. 复古电视机播放器 --- */
.vintage-tv-section {
    margin: 100px auto 60px;
    text-align: center;
    position: relative;
    z-index: 10;
    max-width: 650px;
}

/* 电视机外壳 */
.tv-set {
    background: #2b2b2b;
    padding: 20px 20px 35px 20px;
    border-radius: 20px;
    box-shadow: 
        0 20px 50px rgba(0,0,0,0.5), 
        inset 0 2px 5px rgba(255,255,255,0.1);
    border: 6px solid #111;
    position: relative;
}

/* 屏幕区域 */
.tv-screen {
    background: #000;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    border: 2px solid #333;
    box-shadow: inset 0 0 30px #000;
    height: 450px; /* 固定高度 */
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Instagram 嵌入容器 - 裁剪上下部分 */
.tv-screen blockquote {
    position: relative;
    top: -60px; /* 向上移动，裁掉头部 */
    margin: 0 !important;
}

/* 扫描线滤镜 */
.tv-screen-overlay {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 20;
    box-shadow: inset 0 0 80px rgba(0,0,0,0.6);
}

/* 电视标题 */
.tv-label {
    font-family: 'Special Elite', cursive;
    color: #888;
    margin-top: 15px;
    font-size: 0.9em;
    letter-spacing: 2px;
    text-shadow: 0 -1px 0 #000;
}

/* Instagram 嵌入样式 */
.tv-screen iframe {
    width: 100% !important;
    max-width: 540px;
    height: 650px !important; /* 加高，让裁剪后正好 */
    border: none;
}

/* 移动端适配 */
@media (max-width: 768px) {
    .journal-layout { grid-template-columns: 1fr; gap: 40px; }
    .vinyl-record { right: 20px; bottom: -40px; width: 150px; height: 150px; }
    .tv-screen { min-height: 350px; }
    .tv-screen iframe { height: 350px; }
}
</style>

<div class="lana-wrapper">

    <div class="hero-header">
        <h1 class="hero-title">Lana Del Rey</h1>
        <div class="hero-subtitle">The Honeymoon Era</div>
    </div>

    <div class="film-strip-container">
        <div class="film-frame"><img src="/images/lana4.png"></div>
        <div class="film-frame"><img src="/images/lana0.png"></div>
        <div class="film-frame"><img src="/images/lana3.png"></div>
        <div class="film-frame"><img src="/images/lana6.png"></div>
        <div class="film-frame"><img src="/images/lana1.jpg"></div>
        <div class="film-frame"><img src="/images/lana8.png"></div>
        <div class="film-frame"><img src="/images/lana7.jpg"></div>
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
            </p>
            <div class="signature-text">— Yours, L.</div>
        </div>

        <div class="visual-stack">
            <div class="vinyl-record">
                <div class="vinyl-label"></div>
            </div>
            <div class="framed-photo">
                <img src="/images/lana9.png" alt="Memory">
                <div style="font-family:'Monsieur La Doulaise'; font-size:1.8em; text-align:center; margin-top:10px; color:#444;">
                    Summertime Sadness
                </div>
            </div>
        </div>
    </div>

    <div class="vintage-tv-section">
        <div class="tv-set">
            <div class="tv-screen">
                <div class="tv-screen-overlay"></div>
                
                <!-- 在这里粘贴 Instagram 嵌入代码 -->
                <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DN_UxT6Ea_o/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>
                <script async src="//www.instagram.com/embed.js"></script>

            </div>
            <div class="tv-label">CHANNEL 1986 • NOW PLAYING</div>
        </div>
    </div>
    
    <div style="text-align:center; margin-top:80px; font-size:0.8em; letter-spacing:3px; opacity:0.6;">
        EST. 2025 • LOS ANGELES
    </div>

</div>
