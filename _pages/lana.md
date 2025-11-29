---
layout: single
title: "Vintage & Vinyl"
permalink: /lana/
author_profile: true
toc: false
---

<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@500&display=swap" rel="stylesheet">

<style>
/* --- 全局复古氛围设置 --- */
.lana-container {
    font-family: 'Playfair Display', serif;
    color: #4a4a4a;
    background-color: #fcfbf7; /* 米黄色复古纸张底色 */
    padding: 20px;
    border: 1px solid #e0e0e0;
    box-shadow: inset 0 0 50px rgba(0,0,0,0.05);
}

/* 标题风格 (类似 Born to Die/Ultraviolence 字体感) */
.lana-header {
    text-align: center;
    margin-bottom: 40px;
    border-bottom: 2px solid #d4af37; /* 金色分割线 */
    padding-bottom: 20px;
}

.lana-header h1 {
    font-family: 'Cinzel', serif; /* 罗马复古风格 */
    font-size: 2.5em;
    letter-spacing: 2px;
    color: #2c3e50; /* 深海军蓝 */
    text-transform: uppercase;
    margin: 0;
}

.lana-quote {
    font-family: 'Dancing Script', cursive;
    font-size: 1.5em;
    color: #8e44ad; /* 淡淡的紫色，致敬 Lana 的浪漫 */
    text-align: center;
    margin-top: 10px;
    opacity: 0.8;
}

/* --- 拍立得照片墙 (Polaroid Gallery) --- */
.polaroid-gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    margin: 40px 0;
}

.polaroid {
    background: #fff;
    padding: 10px 10px 30px 10px; /* 底部留白给手写字 */
    box-shadow: 5px 5px 15px rgba(0,0,0,0.2);
    transform: rotate(-2deg); /* 轻微倾斜 */
    transition: all 0.3s ease;
    width: 260px; /* 照片宽度 */
    position: relative;
    cursor: pointer;
}

/* 鼠标悬停特效 */
.polaroid:hover {
    transform: rotate(0deg) scale(1.05);
    box-shadow: 10px 10px 25px rgba(0,0,0,0.3);
    z-index: 10;
}

/* 偶数照片向反方向倾斜，制造随意感 */
.polaroid:nth-child(even) {
    transform: rotate(3deg);
}

.polaroid:nth-child(even):hover {
    transform: rotate(0deg) scale(1.05);
}

.polaroid img {
    width: 100%;
    height: 260px; /* 正方形裁剪 */
    object-fit: cover;
    filter: sepia(30%) contrast(90%); /* 复古滤镜：泛黄+低对比度 */
    border: 1px solid #eee;
}

.caption {
    font-family: 'Dancing Script', cursive;
    font-size: 1.2em;
    text-align: center;
    color: #333;
    margin-top: 10px;
}

/* --- 胶片纹理覆盖 (可选) --- */
.vintage-text-block {
    font-size: 1.1em;
    line-height: 1.8;
    margin: 30px auto;
    max-width: 80%;
    text-align: justify;
    border-left: 3px solid #d4af37;
    padding-left: 20px;
    font-style: italic;
}
</style>

<div class="lana-container">
    <div class="lana-header">
        <h1>Young & Beautiful</h1>
        <div class="lana-quote">"Live fast. Die young. Be wild. Have fun."</div>
    </div>

    <div class="vintage-text-block">
        <p>
            Welcome to my digital darkroom. Here fits my obsessions with vintage aesthetics, 
            Lana's melodies, and the moments I captured through my lens.
        </p>
    </div>

    <div class="polaroid-gallery">
        
        <div class="polaroid">
            <img src="/images/xiaoman-portrait-1.png" alt="Vintage Vibe">
            <div class="caption">Summer Bummer</div>
        </div>

        <div class="polaroid">
            <img src="/images/xiaoman-portrait-2.png" alt="Lana Style">
            <div class="caption">Ride</div>
        </div>

        <div class="polaroid">
            <img src="/images/xiaoman-portrait-3.png" alt="Vinyl">
            <div class="caption">Old Money</div>
        </div>

        <div class="polaroid">
            <img src="/images/cute.jpg" alt="Dreamy">
            <div class="caption">Video Games</div>
        </div>

        <div class="polaroid">
            <img src="/images/wink.jpg" alt="Retro">
            <div class="caption">Born to Die</div>
        </div>

        <div class="polaroid">
            <img src="/images/jump.jpg" alt="Wild">
            <div class="caption">West Coast</div>
        </div>

    </div>

    <div style="text-align: center; margin-top: 50px; font-family: 'Cinzel', serif;">
        <p>— 1989 —</p>
    </div>

</div>

