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

/* --- 1. 标题区 (Hero Section) --- */
.hero-title {
    text-align: center;
    margin-bottom: 40px;
    position: relative;
    z-index: 5;
}

.hero-title h1 {
    font-family: 'Cinzel', serif;
    font-size: 4.5em; /* 保持大气 */
    letter-spacing: 4px;
    color: #111;
    margin: 0;
    text-transform: uppercase;
    text-shadow: 3px 3px 0px rgba(0,0,0,0.1);
    line-height: 1.2;
}

/* 副标题：纯文字形式 (原便签内容) */
.hero-subtitle-text {
    font-family: 'Dancing Script', cursive;
    font-size: 2em; /* 字号够大才显眼 */
    color: #6a1b9a; /* 复古紫 */
    margin-top: 10px;
    transform: rotate(-2deg); /* 微微倾斜的手写感 */
    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

/* --- 2. 撕页便签日记 (Torn Note Journal) - 用来包裹 September 文字 --- */
.journal-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* 居中对齐 */
    align-items: center;
    gap: 50px;
    margin: 60px 20px;
}

.torn-diary-entry {
    flex: 1;
    min-width: 300px;
    max-width: 450px; /* 限制宽度，让它更像一张便签纸 */
    background: #fffdf0; /* 略黄的纸张色 */
    padding: 30px 25px;
    position: relative;
    box-shadow: 5px 10px 20px rgba(0,0,0,0.15);
    transform: rotate(1deg);
    
    /* 撕裂边缘特效 */
    --mask: radial-gradient(10px at 50% 12.5px, #000 99%, #0000 101%) 50% -12.5px / 20px 25px repeat-x;
    -webkit-mask: var(--mask) bottom, var(--mask) top;
    mask: var(--mask) bottom, var(--mask) top;
}

/* 胶带 (Tape) */
.tape-fix {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%) rotate(-2deg);
    width: 120px;
    height: 35px;
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(2px);
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    border-left: 1px dashed rgba(255,255,255,0.5);
    border-right: 1px dashed rgba(255,255,255,0.5);
    z-index: 10;
}

.diary-content {
    font-family: 'Special Elite', cursive; /* 打字机字体 */
    font-size: 1.1em;
    line-height: 1.8;
    color: #333;
}

.lyric-highlight {
    color: #a83f39; /* 深红 */
    font-weight: bold;
    border-bottom: 2px solid rgba(168, 63, 57, 0.2);
}

/* --- 3. 精致胶片长廊 (Film Strip) --- */
.film-strip-container {
    background-color: #111;
    padding: 35px 0;
    margin: 50px -20px;
    overflow-x: auto;
    white-space: nowrap;
    position: relative;
    box-shadow: 0 15px 40px rgba(0,0,0,0.4);
    /* 真实的胶片穿孔 */
    background-image: 
        radial-gradient(circle, #fdfbf7 30%, transparent 35%),
        radial-gradient(circle, #fdfbf7 30%, transparent 35%);
    background-position: 0 10px, 0 calc(100% - 10px);
    background-size: 30px 20px;
    background-repeat: repeat-x;
    background-attachment: local;
}

.film-strip-container::-webkit-scrollbar {
    height: 0px; /* 完全隐藏滚动条，保持沉浸感 */
}

.film-frame {
    display: inline-block;
    height: 240px; /* 加高一点 */
    margin: 0 2px;
    padding: 0 12px; /* 黑边宽度 */
    vertical-align: middle;
    position: relative;
    border-left: 1px solid #222;
}

.film-frame img {
    height: 100%;
    width: auto;
    object-fit: cover;
    filter: sepia(20%) contrast(95%) brightness(0.9);
    transition: all 0.5s ease;
    border-radius: 2px;
}

.film-frame:hover img {
    filter: none;
    transform: scale(1.02);
    box-shadow: 0 0 20px rgba(255,255,255,0.1);
    opacity: 1;
}

/* --- 4. 散落照片 (Journal Photos) --- */
.journal-photos {
    flex: 1;
    min-width: 300px;
    height: 350px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.scattered-photo {
    position: absolute;
    border: 10px solid #fff;
    border-bottom: 30px solid #fff; /* 拍立得底部宽边 */
    box-shadow: 8px 8px 25px rgba(0,0,0,0.2);
    width: 240px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.scattered-photo:nth-child(1) { transform: rotate(-6deg) translate(-20px, 10px); z-index: 1; }
.scattered-photo:nth-child(2) { transform: rotate(4deg) translate(20px, -10px); z-index: 2; }

/* 悬停交互：照片飞开 */
.journal-photos:hover .scattered-photo:nth-child(1) {
    transform: rotate(-15deg) translate(-80px, 10px) scale(1.05);
}

.journal-photos:hover .scattered-photo:nth-child(2) {
    transform: rotate(10deg) translate(60px, -10px) scale(1.05);
}

.vintage-line {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0,0,0,0), #d4af37, rgba(0,0,0,0));
    opacity: 0.5;
    margin: 40px 0;
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
            <div class="tape-fix"></div> <div class="diary-content">
                <p>
                    <strong>September 2025.</strong><br><br>
                    Sitting on the porch, listening to <span class="lyric-highlight">Ultraviolence</span>. 
                    The world feels like a grainy movie scene sometimes. 
                    <br><br>
                    I try to capture these fleeting moments—the light, the shadows, the melancholy beauty of everyday life. 
                    It's not just about the picture; it's about the feeling of being <em>infinite</em>.
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
