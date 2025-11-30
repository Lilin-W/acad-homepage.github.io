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
    padding: 30px 0;
}

/* --- 1. 标题区 --- */
.hero-title {
    text-align: center;
    margin-bottom: 40px;
    position: relative;
    z-index: 5;
}

.hero-title h1 {
    font-family: 'Cinzel', serif;
    font-size: 4.5em;
    letter-spacing: 4px;
    color: #111;
    margin: 0;
    text-transform: uppercase;
    text-shadow: 3px 3px 0px rgba(0,0,0,0.1);
    line-height: 1.2;
}

.hero-subtitle-text {
    font-family: 'Dancing Script', cursive;
    font-size: 2em;
    color: #6a1b9a;
    margin-top: 10px;
    transform: rotate(-2deg);
    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

/* --- 2. 胶片长廊 (Film Strip) - 齿孔精细化 V9.0 --- */
.film-strip-container {
    background-color: #121212; /* 深黑底色 */
    padding: 35px 0; /* 稍微减小内边距，匹配更小的孔 */
    margin: 50px -20px;
    overflow-x: auto;
    white-space: nowrap;
    position: relative;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    /* --- 关键修改：更小、更密的长方形齿孔 --- */
    background-image: 
        /* 55% 的比例，让白孔稍微比黑间隙宽一点点，更像真胶片 */
        linear-gradient(90deg, #fdfbf7 55%, transparent 55%),
        linear-gradient(90deg, #fdfbf7 55%, transparent 55%);
    
    /* 位置调整：离边缘 10px */
    background-position: 0 10px, 0 calc(100% - 10px); 
    
    /* 尺寸大幅缩小：20px 宽 (含间隙), 12px 高 */
    /* 这样单个孔大约是 11px * 12px 的小方块 */
    background-size: 20px 12px; 
    
    background-repeat: repeat-x;
    background-attachment: local;
}

.film-strip-container::-webkit-scrollbar {
    display: none;
}

.film-frame {
    display: inline-block;
    height: 240px; /* 内容高度 */
    margin: 0 1px;
    padding: 0 8px; /* 左右黑边也稍微收窄 */
    vertical-align: middle;
    position: relative;
    border-left: 1px solid #2a2a2a; /* 稍微明显的分割线 */
}

.film-frame img {
    height: 100%;
    width: auto;
    object-fit: cover;
    filter: sepia(20%) contrast(100%) brightness(0.9);
    transition: all 0.5s ease;
    border-radius: 1px;
}

.film-frame:hover img {
    filter: none;
    transform: scale(1.02);
    box-shadow: 0 0 25px rgba(255,255,255,0.15);
    opacity: 1;
    z-index: 10;
}

/* --- 3. 手账日记区 --- */
.journal-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 60px;
    margin: 80px 20px;
}

/* 左侧：撕页便签 (保持加长版) */
.torn-diary-entry {
    flex: 1.5;
    min-width: 400px;
    min-height: 400px;
    background: #fffdf0;
    padding: 40px 35px;
    position: relative;
    box-shadow: 5px 10px 20px rgba(0,0,0,0.15);
    transform: rotate(1deg);
    
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
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    border-left: 2px dotted rgba(255,255,255,0.6);
    border-right: 2px dotted rgba(255,255,255,0.6);
    z-index: 10;
}

.diary-content {
    font-family: 'Special Elite', cursive;
    font-size: 1.15em;
    line-height: 2;
    color: #333;
}

.lyric-highlight {
    color: #a83f39;
    font-weight: bold;
    background: rgba(168, 63, 57, 0.1);
    padding: 0 5px;
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
    border-bottom: 35px solid #fff;
    box-shadow: 10px 15px 30px rgba(0,0,0,0.25);
    width: 260px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.scattered-photo:nth-child(1) { transform: rotate(-8deg) translate(-20px, 20px); z-index: 1; }
.scattered-photo:nth-child(2) { transform: rotate(5deg) translate(30px, -20px); z-index: 2; }

/* 交互特效 */
.journal-photos:hover .scattered-photo:nth-child(1) {
    transform: rotate(-15deg) translate(-70px, 30px) scale(1.05);
}

.journal-photos:hover .scattered-photo:nth-child(2) {
    transform: rotate(10deg) translate(60px, -30px) scale(1.05);
}

.vintage-line {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0,0,0,0), #d4af37, rgba(0,0,0,0));
    opacity: 0.6;
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
