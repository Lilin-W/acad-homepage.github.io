---
layout: single
title: "Lana Del Rey"
permalink: /lana/
author_profile: true
toc: false
---

<link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Cinzel:wght@700&family=Monsieur+La+Doulaise&family=Special+Elite&family=Playfair+Display:ital,wght@1,500&family=Permanent+Marker&display=swap" rel="stylesheet">

<style>
/* --- 全局背景：粉色格纹 + 纸张纹理 --- */
.lana-wrapper {
    background-color: #fff0f5; /* 浅粉色底 */
    background-image: 
        linear-gradient(rgba(200, 0, 0, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(200, 0, 0, 0.05) 1px, transparent 1px);
    background-size: 30px 30px; /* 格纹信纸效果 */
    font-family: 'Special Elite', cursive;
    padding: 60px 20px;
    overflow-x: hidden;
    position: relative;
    color: #333;
}

/* 装饰：顶部悬挂的蕾丝边 (CSS模拟) */
.lana-wrapper::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; height: 15px;
    background: radial-gradient(circle, #fff 50%, transparent 60%);
    background-size: 20px 20px;
    background-position: bottom;
    opacity: 0.8;
}

/* --- 1. 标题区：杂志剪报风格 (Ransom Note) --- */
.collage-header {
    text-align: center;
    margin-bottom: 80px;
    position: relative;
    z-index: 10;
}

.cutout-letter {
    display: inline-block;
    padding: 5px 12px;
    margin: 2px;
    background: #111;
    color: #fff;
    font-family: 'Abril Fatface', serif;
    font-size: 3.5em;
    transform: rotate(-3deg);
    box-shadow: 3px 3px 0 rgba(0,0,0,0.2);
}
/* 给每个字母不同的样式，模拟剪报 */
.cutout-letter:nth-child(2n) { background: #d4af37; color: #000; font-family: 'Cinzel'; transform: rotate(2deg); }
.cutout-letter:nth-child(3n) { background: #b76e79; color: #fff; font-family: 'Permanent Marker'; transform: rotate(-5deg); }
.cutout-letter:nth-child(4n) { background: #fff; color: #000; border: 2px solid #000; transform: rotate(4deg); }

.subtitle-badge {
    display: inline-block;
    background: #e74c3c;
    color: #fff;
    padding: 5px 20px;
    border-radius: 20px;
    font-family: 'Monsieur La Doulaise', cursive;
    font-size: 2em;
    transform: rotate(-10deg) translate(20px, -20px);
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
}

/* --- 装饰贴纸 (Stickers) --- */
.sticker {
    position: absolute;
    font-size: 3em;
    filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.2));
    z-index: 20;
    pointer-events: none;
    animation: float 3s ease-in-out infinite alternate;
}
@keyframes float { from {transform: translateY(0) rotate(0);} to {transform: translateY(-5px) rotate(5deg);} }

/* --- 2. 核心内容：凌乱的桌面 (Messy Desk) --- */
.messy-desk {
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
    height: 1200px; /* 足够的高度来堆叠 */
}

/* 通用：所有元素都是绝对定位，随意摆放 */
.desk-item {
    position: absolute;
    transition: transform 0.3s;
    cursor: grab;
}
.desk-item:hover { transform: scale(1.05); z-index: 50 !important; }

/* 元素 A: 邮票 (Stamp) */
.stamp-box {
    width: 160px;
    height: 180px;
    background: #fff;
    padding: 10px;
    /* 邮票齿孔边框 */
    background-image: radial-gradient(transparent 50%, #fff 50%);
    background-size: 20px 20px;
    background-position: -10px -10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(-5deg);
    top: 50px; left: 5%;
    z-index: 5;
}
.stamp-box img { width: 90%; height: 90%; object-fit: cover; border: 1px solid #ddd; }

/* 元素 B: 拍立得照片 */
.polaroid-pic {
    background: #fff;
    padding: 10px 10px 40px 10px;
    box-shadow: 5px 10px 20px rgba(0,0,0,0.15);
    width: 240px;
    transform: rotate(8deg);
    top: 150px; left: 30%;
    z-index: 3;
}
.polaroid-pic img { width: 100%; filter: sepia(30%); }

/* 元素 C: 复古票根 (Ticket) */
.vintage-ticket {
    background: #f4d03f;
    color: #111;
    width: 200px;
    padding: 15px;
    text-align: center;
    border-left: 2px dashed rgba(0,0,0,0.5);
    border-right: 2px dashed rgba(0,0,0,0.5);
    font-family: 'Cinzel', serif;
    transform: rotate(-15deg);
    top: 80px; right: 10%;
    z-index: 4;
    box-shadow: 3px 3px 10px rgba(0,0,0,0.2);
}

/* 元素 D: 撕纸日记 (Torn Paper) */
.torn-paper {
    background: #fffdf0;
    width: 320px;
    padding: 30px;
    font-family: 'Monsieur La Doulaise', cursive;
    font-size: 1.8em;
    color: #111;
    top: 400px; left: 10%;
    z-index: 2;
    transform: rotate(2deg);
    box-shadow: 5px 5px 15px rgba(0,0,0,0.1);
    /* 撕裂效果 */
    clip-path: polygon(0% 10px, 5% 0px, 10% 10px, 15% 0px, 20% 10px, 25% 0px, 30% 10px, 35% 0px, 40% 10px, 45% 0px, 50% 10px, 55% 0px, 60% 10px, 65% 0px, 70% 10px, 75% 0px, 80% 10px, 85% 0px, 90% 10px, 95% 0px, 100% 10px, 100% 100%, 0% 100%);
}

/* 元素 E: 胶片条 (Film Strip Fragment) */
.film-fragment {
    background: #000;
    width: 120px;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    top: 300px; right: 20%;
    z-index: 6;
    transform: rotate(10deg);
    box-shadow: 5px 10px 20px rgba(0,0,0,0.3);
}
.film-fragment img { width: 100%; border: 2px solid #fff; }

/* 元素 F: 蝴蝶结装饰 */
.bow-decoration {
    font-size: 5em;
    position: absolute;
    color: #ffb7b2;
    top: -20px; left: 45%;
    z-index: 10;
    text-shadow: 2px 2px 5px rgba(0,0,0,0.2);
}

/* 元素 G: 磁带 (Cassette Tape CSS) */
.cassette-tape {
    width: 260px; height: 160px;
    background: #333;
    border-radius: 10px;
    position: absolute;
    top: 650px; right: 5%;
    transform: rotate(-5deg);
    z-index: 3;
    border: 3px solid #555;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}
.cassette-label {
    width: 220px; height: 100px;
    background: #f1c40f;
    border-radius: 5px;
    text-align: center;
    padding-top: 10px;
    font-family: 'Permanent Marker', cursive;
    color: #000;
    font-size: 1.2em;
}

/* 元素 H: 更多的照片散落 */
.scatter-photo-2 {
    width: 200px;
    border: 8px solid #fff;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    top: 600px; left: 20%;
    transform: rotate(-12deg);
    z-index: 4;
}

.scatter-photo-3 {
    width: 220px;
    border: 8px solid #fff;
    top: 850px; left: 45%;
    transform: rotate(6deg);
    z-index: 5;
}

/* 底部：手写签名 */
.footer-sign {
    position: absolute;
    bottom: 50px; width: 100%;
    text-align: center;
    font-family: 'Monsieur La Doulaise', cursive;
    font-size: 3em;
    color: #a83f39;
}
</style>

<div class="lana-wrapper">

    <div class="collage-header">
        <div>
            <span class="cutout-letter">L</span>
            <span class="cutout-letter">A</span>
            <span class="cutout-letter">N</span>
            <span class="cutout-letter">A</span>
            <br>
            <span class="cutout-letter">D</span>
            <span class="cutout-letter">E</span>
            <span class="cutout-letter">L</span>
            <br>
            <span class="cutout-letter">R</span>
            <span class="cutout-letter">E</span>
            <span class="cutout-letter">Y</span>
        </div>
        <div class="subtitle-badge">Coquette Aesthetic</div>
        <div class="bow-decoration">🎀</div>
    </div>

    <div class="sticker" style="top: 100px; left: 10%;">🍒</div>
    <div class="sticker" style="top: 200px; right: 5%;">💄</div>
    <div class="sticker" style="top: 500px; left: 5%;">🦢</div>
    <div class="sticker" style="top: 800px; right: 15%;">🩰</div>
    <div class="sticker" style="top: 1100px; left: 10%;">🕯️</div>

    <div class="messy-desk">

        <div class="desk-item vintage-ticket">
            ADMIT ONE<br>
            <span style="font-size:0.6em; color:#333;">LANA LIVE 2025</span>
            <hr style="border-top:1px dashed #000; margin:5px 0;">
            No. 082491
        </div>

        <div class="desk-item stamp-box">
            <img src="/images/xiaoman-portrait-1.png" alt="Stamp">
        </div>

        <div class="desk-item polaroid-pic">
            <img src="/images/xiaoman-portrait-4.png" alt="Polaroid">
            <div style="font-family:'Dancing Script'; text-align:center; font-size:1.5em; margin-top:10px; color:#555;">Pretty when you cry</div>
        </div>

        <div class="desk-item film-fragment">
            <img src="/images/cute.jpg">
            <img src="/images/wink.jpg">
            <img src="/images/jump.jpg">
        </div>

        <div class="desk-item torn-paper">
            <div style="position:absolute; top:-15px; left:40%; width:80px; height:30px; background:rgba(255,100,100,0.3); transform:rotate(-2deg);"></div> Dear Diary,<br>
            The world is a collage of beautiful, broken things.<br>
            <br>
            "Live fast. Die young."
        </div>

        <img class="desk-item scatter-photo-2" src="/images/keyboard.jpg">
        
        <div class="desk-item cassette-tape">
            <div class="cassette-label">
                Born to Die<br>
                <span style="font-size:0.6em;">SIDE A</span>
            </div>
        </div>

        <img class="desk-item scatter-photo-3" src="/images/xiaoman-portrait-2.png">

        <div class="footer-sign">
            Designed with Love & Cherry Pie
        </div>

    </div>

</div>