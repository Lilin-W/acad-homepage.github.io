---
layout: single
title: "Lana's Journal"
permalink: /lana/
author_profile: true
toc: false
---

<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Dancing+Script:wght@600&family=Special+Elite&family=UnifrakturMaguntia&display=swap" rel="stylesheet">

<style>
/* --- 全局背景：蕾丝纹理 + 皱纸感 --- */
.journal-wrapper {
    /* 模拟复杂的蕾丝/桌布背景 */
    background-color: #f4e4d4;
    background-image: 
        radial-gradient(circle at 100% 50%, transparent 20%, rgba(255,255,255,0.3) 21%, rgba(255,255,255,0.3) 34%, transparent 35%, transparent),
        radial-gradient(circle at 0% 50%, transparent 20%, rgba(255,255,255,0.3) 21%, rgba(255,255,255,0.3) 34%, transparent 35%, transparent) !important;
    background-size: 50px 50px;
    padding: 40px 10px;
    font-family: 'Playfair Display', serif;
    overflow-x: hidden;
    color: #2b2b2b;
}

/* --- 特效组件：透明胶带 (Scotch Tape) --- */
.tape {
    position: absolute;
    width: 120px;
    height: 35px;
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    transform: rotate(-3deg);
    z-index: 10;
    backdrop-filter: blur(2px); /* 磨砂感 */
    border-left: 1px dashed rgba(255,255,255,0.3);
    border-right: 1px dashed rgba(255,255,255,0.3);
    opacity: 0.7;
}

/* --- 特效组件：撕裂的纸张边缘 (Torn Paper) --- */
.torn-paper-box {
    background: #fffdf5;
    padding: 30px;
    margin: 40px auto;
    position: relative;
    box-shadow: 5px 10px 15px rgba(0,0,0,0.1);
    max-width: 90%;
    /* CSS 锯齿边缘模拟撕裂效果 */
    --mask: radial-gradient(10px at 50% 12.5px, #000 99%, #0000 101%) 50% -12.5px / 20px 25px repeat-x;
    -webkit-mask: var(--mask) bottom, var(--mask) top;
     mask: var(--mask) bottom, var(--mask) top;
}

/* --- 1. 顶部旧报纸头条区 --- */
.newspaper-clipping {
    background-color: #f7f1e3; /* 泛黄旧报纸色 */
    padding: 20px;
    border: 1px solid #dcdcdc;
    margin-bottom: 50px;
    transform: rotate(1deg);
    box-shadow: 3px 3px 10px rgba(0,0,0,0.15);
}

.newspaper-header {
    border-bottom: 2px solid #333;
    border-top: 4px double #333;
    padding: 10px 0;
    text-align: center;
    margin-bottom: 20px;
}

.newspaper-title {
    font-family: 'UnifrakturMaguntia', cursive; /* 哥特式报纸标题字 */
    font-size: 3em;
    margin: 0;
    color: #111;
    letter-spacing: 2px;
}

.newspaper-date {
    font-family: 'Special Elite', monospace;
    font-size: 0.8em;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #555;
    padding: 5px 0;
    margin-top: 5px;
}

/* 报纸正文分栏 */
.newspaper-body {
    column-count: 2;
    column-gap: 20px;
    font-size: 0.95em;
    text-align: justify;
    line-height: 1.6;
}

.drop-cap {
    float: left;
    font-size: 3.5em;
    line-height: 0.8;
    padding-right: 5px;
    font-family: 'Cinzel', serif;
    color: #6a1b9a; /* 紫色首字母 */
}

/* --- 2. 拍立得散乱拼贴区 --- */
.scrapbook-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
    margin: 60px 0;
    position: relative;
}

.polaroid-frame {
    background: #fff;
    padding: 12px 12px 40px 12px;
    box-shadow: 2px 5px 15px rgba(0,0,0,0.2);
    width: 280px;
    transition: transform 0.3s ease;
    position: relative;
}

/* 胶带位置微调 */
.tape.top-center { top: -15px; left: 35%; transform: rotate(2deg); }
.tape.corner-left { top: -10px; left: -20px; transform: rotate(-35deg); }
.tape.corner-right { bottom: 10px; right: -20px; transform: rotate(-35deg); }

.polaroid-frame img {
    width: 100%;
    height: 280px; /* 正方形裁剪 */
    object-fit: cover;
    filter: sepia(20%) contrast(95%);
}

.handwritten-caption {
    font-family: 'Dancing Script', cursive;
    font-size: 1.4em;
    color: #444;
    text-align: center;
    margin-top: 15px;
    transform: rotate(-2deg);
}

/* 让照片乱一点 */
.polaroid-frame:nth-child(1) { transform: rotate(-4deg); z-index: 1; }
.polaroid-frame:nth-child(2) { transform: rotate(3deg); margin-top: 40px; z-index: 2; }
.polaroid-frame:nth-child(3) { transform: rotate(-2deg); z-index: 3; }
.polaroid-frame:nth-child(4) { transform: rotate(5deg); margin-top: -20px; z-index: 1; }
.polaroid-frame:nth-child(5) { transform: rotate(-3deg); margin-top: 30px; z-index: 2; }
.polaroid-frame:nth-child(6) { transform: rotate(2deg); z-index: 3; }

.polaroid-frame:hover {
    transform: scale(1.05) rotate(0deg) !important;
    z-index: 100;
    box-shadow: 10px 20px 30px rgba(0,0,0,0.3);
}

/* --- 3. 撕页诗歌 (Torn Note) --- */
.torn-note {
    background: #fdf6e3;
    width: 300px;
    padding: 20px;
    margin: 0 auto;
    text-align: center;
    font-family: 'Dancing Script', cursive;
    font-size: 1.5em;
    color: #6a1b9a;
    position: relative;
    /* 顶部参差不齐 */
    clip-path: polygon(0% 0%, 5% 5%, 10% 0%, 15% 5%, 20% 0%, 25% 5%, 30% 0%, 35% 5%, 40% 0%, 45% 5%, 50% 0%, 55% 5%, 60% 0%, 65% 5%, 70% 0%, 75% 5%, 80% 0%, 85% 5%, 90% 0%, 95% 5%, 100% 0%, 100% 100%, 0% 100%);
    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
}
</style>

<div class="journal-wrapper">

    <div class="newspaper-clipping">
        <div class="newspaper-header">
            <h1 class="newspaper-title">The Daily Lana</h1>
            <div class="newspaper-date">
                <span>VOL. I</span>
                <span>EST. 2025</span>
                <span>$0.25</span>
            </div>
        </div>
        
        <div class="newspaper-body">
            <p>
                <span class="drop-cap">S</span>he wears her heart on her sleeve like a badge of honor. 
                The world is chaotic, but in these frames, time stands still. 
                We are capturing the fleeting moments of youth, the summertime sadness, and the golden hour glow.
            </p>
            <p>
                Everything is a collage of memories. Old tickets, dried roses, and the sound of a vinyl spinning in an empty room.
                <br><br>
                <em>"I'm your national anthem."</em>
            </p>
        </div>
    </div>

    <div class="torn-note">
        <div class="tape top-center" style="opacity:0.5;"></div>
        <p>
            "That's how the light gets in.<br>
            Then you're <strong style="color:#d4af37;">golden</strong>."
        </p>
    </div>

    <div class="scrapbook-grid">
        <div class="polaroid-frame">
            <div class="tape top-center"></div>
            <img src="/images/xiaoman-portrait-1.png" alt="Lana 1">
            <div class="handwritten-caption">Vintage Soul</div>
        </div>

        <div class="polaroid-frame">
            <div class="tape corner-left"></div>
            <img src="/images/xiaoman-portrait-2.png" alt="Lana 2">
            <div class="handwritten-caption">Soft Grunge</div>
        </div>

        <div class="polaroid-frame">
            <div class="tape top-center"></div>
            <img src="/images/xiaoman-portrait-3.png" alt="Lana 3">
            <div class="handwritten-caption">Art Deco</div>
        </div>

        <div class="polaroid-frame">
             <div class="tape corner-right"></div>
            <img src="/images/cute.jpg" alt="Lana 4">
            <div class="handwritten-caption">Cherry</div>
        </div>

        <div class="polaroid-frame">
            <div class="tape top-center"></div>
            <img src="/images/wink.jpg" alt="Lana 5">
            <div class="handwritten-caption">West Coast</div>
        </div>

        <div class="polaroid-frame">
            <div class="tape corner-left"></div>
            <img src="/images/jump.jpg" alt="Lana 6">
            <div class="handwritten-caption">Ultraviolence</div>
        </div>
    </div>

    <div class="torn-paper-box">
        <p style="text-align:center; font-style:italic; color:#555;">
           More than work. Just vibes. <br>
           Designed with love & tears.
        </p>
    </div>

</div>

