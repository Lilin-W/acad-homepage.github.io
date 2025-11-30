---
layout: single
title: "Lana Del Rey"
permalink: /lana/
author_profile: true
toc: false
---

<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Dancing+Script:wght@600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Special+Elite&family=Bodoni+Moda:ital,wght@1,500&display=swap" rel="stylesheet">

<style>
/* --- 0. 全局氛围与动态光效 --- */
.lana-wrapper {
    font-family: 'Playfair Display', serif;
    background-color: #fdfbf7;
    color: #1a1a1a;
    overflow: hidden;
    padding: 60px 0 100px 0;
    position: relative;
    /* 背景噪点 */
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
}

/* 动态漏光层 (Light Leaks) - 增加文艺感的神器 */
.light-leak-overlay {
    position: absolute;
    top: -50%; left: -50%; width: 200%; height: 200%;
    background: radial-gradient(circle at 50% 50%, rgba(255, 200, 150, 0.15), transparent 60%),
                radial-gradient(circle at 80% 20%, rgba(180, 100, 255, 0.08), transparent 40%);
    animation: floatingLight 20s infinite alternate ease-in-out;
    pointer-events: none;
    z-index: 0;
}

@keyframes floatingLight {
    0% { transform: translate(0, 0) rotate(0deg); }
    100% { transform: translate(-20px, -20px) rotate(5deg); }
}

/* --- 1. 标题区：更复杂的排版 --- */
.hero-complex {
    text-align: center;
    position: relative;
    z-index: 10;
    margin-bottom: -40px; /* 让标题和下方内容重叠 */
}

.hero-main {
    font-family: 'Cinzel', serif;
    font-size: 5.5em; /* 巨大 */
    line-height: 0.9;
    color: #111;
    text-transform: uppercase;
    letter-spacing: -2px;
    position: relative;
    display: inline-block;
    mix-blend-mode: multiply; /* 正片叠底，像印在纸上 */
}

.hero-signature {
    font-family: 'Dancing Script', cursive;
    font-size: 2.5em;
    color: #d4af37; /* 金色签名 */
    position: absolute;
    bottom: 10px;
    right: -20px;
    transform: rotate(-10deg);
    text-shadow: 2px 2px 0px rgba(0,0,0,0.1);
    z-index: 12;
}

.hero-sub {
    font-family: 'Bodoni Moda', serif;
    font-style: italic;
    font-size: 1.2em;
    letter-spacing: 5px;
    margin-top: 10px;
    color: #555;
}

/* --- 2. 核心布局：穿插结构 (Interwoven Layout) --- */
.interwoven-layout {
    position: relative;
    width: 100%;
    min-height: 800px; /* 给足够的空间让它们层叠 */
    margin-top: 50px;
}

/* --- 层 1: 胶片长廊 (背景层，倾斜贯穿) --- */
.film-strip-wrapper {
    position: absolute;
    top: 100px;
    left: -5%;
    width: 110%; /* 宽于屏幕 */
    transform: rotate(-3deg); /* 整体倾斜 */
    z-index: 2;
    filter: drop-shadow(0 20px 30px rgba(0,0,0,0.3));
}

.film-strip-container {
    background-color: #121212;
    padding: 28px 0; /* 紧凑的高度 */
    overflow-x: auto;
    white-space: nowrap;
    /* V9 精致小方孔 */
    background-image: 
        linear-gradient(90deg, #fdfbf7 50%, transparent 50%),
        linear-gradient(90deg, #fdfbf7 50%, transparent 50%);
    background-position: 0 8px, 0 calc(100% - 8px);
    background-size: 18px 10px; /* 极小孔 */
    background-repeat: repeat-x;
    background-attachment: local;
}

.film-strip-container::-webkit-scrollbar { display: none; }

.film-frame {
    display: inline-block;
    height: 180px; /* 稍微调小一点，为了整体比例 */
    margin: 0 1px;
    padding: 0 6px;
    vertical-align: middle;
    border-left: 1px solid #333;
}

.film-frame img {
    height: 100%;
    width: auto;
    object-fit: cover;
    filter: sepia(40%) grayscale(20%) contrast(110%);
    opacity: 0.8;
    transition: all 0.5s;
}

.film-frame:hover img { filter: none; opacity: 1; transform: scale(1.1); z-index:99;}

/* --- 层 2: 撕页日记 (前景层，压住胶片) --- */
.torn-diary-entry {
    position: absolute;
    top: 20px;
    right: 5%; /* 靠右放置 */
    width: 40%;
    min-width: 350px;
    background: #fffdf5;
    padding: 50px 40px;
    z-index: 5; /* 压在胶片上 */
    transform: rotate(2deg);
    box-shadow: 10px 20px 40px rgba(0,0,0,0.15);
    
    /* 撕裂边缘 */
    --mask: radial-gradient(10px at 50% 12.5px, #000 99%, #0000 101%) 50% -12.5px / 20px 25px repeat-x;
    -webkit-mask: var(--mask) bottom, var(--mask) top;
    mask: var(--mask) bottom, var(--mask) top;
}

/* 装饰：日记上的回形针或胶带 */
.paper-clip {
    position: absolute;
    top: -15px;
    right: 30%;
    width: 20px;
    height: 50px;
    border: 4px solid #aaa;
    border-radius: 20px;
    z-index: 6;
    transform: rotate(15deg);
}

.diary-content {
    font-family: 'Special Elite', cursive;
    font-size: 1.1em;
    line-height: 1.9;
    color: #2a2a2a;
    text-align: justify; /* 两端对齐，更像报纸/书 */
}

/* 首字下沉 */
.drop-cap {
    float: left;
    font-family: 'Cinzel', serif;
    font-size: 4.5em;
    line-height: 0.7;
    margin-right: 10px;
    color: #6a1b9a;
    text-shadow: 2px 2px 0 #eee;
}

/* --- 层 3: 散落的照片 (穿插层) --- */
/* 照片 A: 在左下，压住胶片 */
.photo-scatter-1 {
    position: absolute;
    top: 350px;
    left: 8%;
    width: 240px;
    z-index: 6; /* 最高层 */
    transform: rotate(-8deg);
    border: 10px solid #fff;
    border-bottom: 40px solid #fff;
    box-shadow: 15px 15px 35px rgba(0,0,0,0.25);
    transition: transform 0.4s;
}

/* 照片 B: 在胶片下面，露出一角 */
.photo-scatter-2 {
    position: absolute;
    top: 280px;
    left: 40%;
    width: 200px;
    z-index: 1; /* 最底层 */
    transform: rotate(15deg);
    filter: brightness(0.8); /* 暗一点，表示在下面 */
    border: 8px solid #fff;
    box-shadow: 5px 5px 15px rgba(0,0,0,0.3);
}

.photo-scatter-1:hover { transform: scale(1.1) rotate(0deg) !important; z-index: 20; }
.photo-scatter-2:hover { transform: scale(1.1) rotate(0deg); z-index: 20; filter:brightness(1); }

/* --- 3. 装饰元素 (Artistic Decors) --- */
/* 竖排的"侧标"文字 */
.vertical-label {
    position: absolute;
    left: 20px;
    top: 100px;
    font-family: 'Cinzel', serif;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    font-size: 14px;
    letter-spacing: 5px;
    color: #bbb;
    border-right: 1px solid #ddd;
    padding-right: 10px;
    height: 400px;
    z-index: 0;
}

/* 底部引言 */
.footer-quote {
    position: relative;
    margin-top: 450px; /* 把它推到最下面 */
    text-align: center;
    font-family: 'Bodoni Moda', serif;
    font-size: 1.5em;
    color: #444;
    z-index: 10;
}
</style>

<div class="lana-wrapper">
    <div class="light-leak-overlay"></div>
    
    <div class="vertical-label">THE VINTAGE COLLECTION • EST 2025</div>

    <div class="hero-complex">
        <div class="hero-main">
            Lana Del Rey
            <div class="hero-signature">Golden Age</div>
        </div>
        <div class="hero-sub">- MORE THAN WORK -</div>
    </div>

    <div class="interwoven-layout">
        <div class="torn-diary-entry">
            <div class="paper-clip"></div>
            
            <div class="diary-content">
                <span class="drop-cap">S</span>eptember 2025. 
                Sitting on the porch, listening to <em>Ultraviolence</em> on vinyl. 
                The air smells like rain, old books, and faded perfume.
                <br><br>
                It feels like a scene from a noir movie. 
                Grainy textures, soft focus, and the melancholy beauty of everyday life. 
                <br><br>
                I collect these moments like pressed flowers—fragile, beautiful, and infinite.
                <br><br>
                <span style="font-family:'Dancing Script'; color:#6a1b9a; font-size:1.3em; float:right;">— Yours, L.</span>
            </div>
        </div>

        <div class="film-strip-wrapper">
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
        </div>

        <img class="photo-scatter-1" src="/images/xiaoman-portrait-4.png" alt="Polaroid 1">
        
        <img class="photo-scatter-2" src="/images/keyboard.jpg" alt="Polaroid 2">
    </div>

    <div class="footer-quote">
        "That's how the light gets in."
    </div>
</div>
