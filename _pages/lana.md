---
layout: single
title: "Lana Del Rey"
permalink: /lana/
author_profile: true
toc: false
---

<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@200;300;400&display=swap" rel="stylesheet">

<style>
/* --- 全局设置：揉皱纸张背景 --- */
.lana-wrapper {
    /* 1. 设置纸张底色 */
    background-color: #f3eada; 
    color: #222;
    font-family: 'Cormorant Garamond', serif;
    padding: 80px 40px;
    max-width: 1100px;
    margin: 0 auto;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    
    /* 2. 加入揉皱纸张纹理图片 */
    /* 这是一个模拟皱纸和纤维的纹理图案 */
    background-image: url("https://www.transparenttextures.com/patterns/criss-cross.png"), 
                      linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(0,0,0,0.05));
    background-blend-mode: overlay; /* 混合模式让纹理更自然 */
    box-shadow: inset 0 0 100px rgba(0,0,0,0.1); /* 内阴影增加立体感 */
}

/* 装饰线条：颜色加深一点以适应纸张 */
.vertical-line {
    position: absolute;
    top: 0; bottom: 0; left: 15%;
    width: 1px;
    background: rgba(0,0,0,0.15);
    z-index: 0;
}

/* --- 1. 标题区 --- */
.header-section {
    position: relative;
    margin-bottom: 100px;
    padding-left: 15%;
    z-index: 2;
}

.big-title {
    font-size: 6em;
    font-weight: 300;
    line-height: 0.9;
    letter-spacing: -2px;
    margin: 0;
    margin-left: -5px;
    color: #111;
    /* 文字也带一点纹理感 */
    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

.sub-meta {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75em;
    letter-spacing: 4px;
    text-transform: uppercase;
    margin-top: 20px;
    color: #666;
    display: flex;
    gap: 40px;
}

/* --- 2. 核心视觉区 --- */
.feature-layout {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 150px;
    position: relative;
    z-index: 2;
}

.left-col {
    width: 35%;
    padding-top: 60px;
}

.intro-text {
    font-size: 1.4em;
    font-style: italic;
    line-height: 1.6;
    color: #333;
    margin-bottom: 40px;
    text-shadow: 0 1px 0 rgba(255,255,255,0.5);
}

.small-img-wrapper {
    width: 80%;
    margin-left: auto;
    position: relative;
}

/* 小图也同步变黑白 */
.small-img {
    width: 100%;
    display: block;
    transition: all 0.5s;
    filter: grayscale(100%) contrast(110%);
    box-shadow: 5px 5px 15px rgba(0,0,0,0.2);
}
.small-img:hover { filter: grayscale(0%) contrast(100%); }

.right-col {
    width: 55%;
    position: relative;
    margin-top: -40px;
}

/* --- 重点修改：大图黑白印刷效果 --- */
.large-img {
    width: 100%;
    display: block;
    /* 1. 强烈的黑白高对比滤镜 */
    filter: grayscale(100%) contrast(120%) brightness(0.9);
    /* 2. 正片叠底模式：让纸张纹理透上来，像印在纸上一样 */
    mix-blend-mode: multiply; 
    /* 3. 柔和的阴影，不再是硬卡片 */
    box-shadow: 15px 20px 40px rgba(0,0,0,0.3);
    transition: all 0.5s ease;
}

/* 悬停时稍微恢复一点色彩（可选，如果不喜欢可以删掉下面这行）*/
.large-img:hover {
     filter: grayscale(50%) contrast(110%) brightness(1);
}

.img-caption-vertical {
    position: absolute;
    right: -30px; bottom: 0;
    transform: rotate(-90deg);
    transform-origin: bottom right;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7em;
    letter-spacing: 3px;
    color: #777;
    text-transform: uppercase;
    white-space: nowrap;
}

/* --- 3. 底部画廊 --- */
.gallery-section {
    padding-left: 15%;
    position: relative;
    z-index: 2;
}

.section-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7em;
    letter-spacing: 3px;
    text-transform: uppercase;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    margin-bottom: 40px;
    color: #555;
}

.minimal-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.grid-item {
    aspect-ratio: 3/4;
    overflow: hidden;
    position: relative;
    background: #e0e0e0;
    box-shadow: 5px 5px 15px rgba(0,0,0,0.1);
}

.grid-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    /* 底部网格图也默认黑白 */
    filter: grayscale(100%) contrast(110%);
}

.grid-item:hover img {
    transform: scale(1.1);
    filter: grayscale(0%); /* 悬停恢复彩色 */
}

/* 移动端适配 */
@media (max-width: 768px) {
    .lana-wrapper { padding: 40px 20px; }
    .vertical-line { display: none; }
    .header-section, .gallery-section { padding-left: 0; }
    .feature-layout { flex-direction: column-reverse; }
    .left-col, .right-col { width: 100%; }
    .right-col { margin-top: 0; margin-bottom: 40px; }
    .big-title { font-size: 4em; }
    .minimal-grid { grid-template-columns: 1fr 1fr; }
}
</style>

<div class="lana-wrapper">
    
    <div class="vertical-line"></div>

    <div class="header-section">
        <h1 class="big-title">Lana<br>Del Rey</h1>
        <div class="sub-meta">
            <span>Vol. 2025</span>
            <span>Est. Los Angeles</span>
            <span>Archive</span>
        </div>
    </div>

    <div class="feature-layout">
        
        <div class="left-col">
            <div class="intro-text">
                "That's how the light gets in. <br>
                Then you're golden."
                <br><br>
                <span style="font-size:0.7em; font-family:'Montserrat'; color:#777; text-transform:uppercase; letter-spacing:2px;">
                    — The Philosophy
                </span>
            </div>

            <div class="small-img-wrapper">
                <img src="/images/xiaoman-portrait-2.png" alt="Detail Shot" class="small-img">
            </div>
        </div>

        <div class="right-col">
            <img src="/images/xiaoman-portrait-4.png" alt="Main Visual" class="large-img">
            <div class="img-caption-vertical">Figure 01. Ultraviolence Era</div>
        </div>

    </div>

    <div class="gallery-section">
        <div class="section-label">Selected Works / Print Archive</div>
        
        <div class="minimal-grid">
            <div class="grid-item">
                <img src="/images/xiaoman-portrait-1.png" alt="Gallery 1">
            </div>
            <div class="grid-item">
                <img src="/images/cute.jpg" alt="Gallery 2">
            </div>
            <div class="grid-item">
                <img src="/images/keyboard.jpg" alt="Gallery 3">
            </div>
        </div>
    </div>

</div>