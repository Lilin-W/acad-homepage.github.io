---
layout: single
title: "Lana Del Rey"
permalink: /lana/
author_profile: true
toc: false
---

<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">

<style>
/* --- 全局重置：纯白、极简 --- */
.lana-wrapper {
    background-color: #ffffff;
    color: #111;
    font-family: 'Lato', sans-serif;
    padding: 0;
    max-width: 100%;
    margin: 0;
    box-sizing: border-box;
}

/* --- 核心布局：双栏 (左固定，右滚动) --- */
.split-container {
    display: flex;
    flex-wrap: wrap;
    min-height: 100vh;
}

/* 左侧：固定区域 (Sticky) */
.left-pane {
    width: 35%; /* 左侧宽度 */
    padding: 80px 50px;
    height: 100vh;
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center; /* 垂直居中 */
    border-right: 1px solid #f0f0f0; /* 极淡的分割线 */
    background: #fff;
    z-index: 10;
}

/* 右侧：滚动区域 */
.right-pane {
    width: 65%; /* 右侧宽度 */
    padding: 80px 60px;
    background: #fff;
}

/* --- 字体排版 --- */
.brand-title {
    font-family: 'Playfair Display', serif;
    font-size: 3.5em;
    font-weight: 400;
    line-height: 1.1;
    margin-bottom: 30px;
    letter-spacing: -1px;
    color: #000;
}

.intro-text {
    font-size: 1em;
    line-height: 1.8;
    color: #666;
    font-weight: 300;
    max-width: 90%;
    margin-bottom: 40px;
}

.meta-info {
    font-size: 0.75em;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #aaa;
    margin-top: auto; /* 推到底部 */
}

/* 装饰性短线 */
.separator {
    width: 40px;
    height: 1px;
    background: #000;
    margin-bottom: 30px;
}

/* --- 图片流列表 --- */
.work-list {
    display: flex;
    flex-direction: column;
    gap: 100px; /* 图片之间的大间距 */
}

.work-item {
    width: 100%;
    opacity: 0;
    animation: fadeIn 1s ease forwards; /* 淡入动画 */
}

/* 图片样式：无滤镜，可能有微弱阴影 */
.work-item img {
    width: 100%;
    height: auto;
    display: block;
    box-shadow: 0 10px 30px rgba(0,0,0,0.03); /* 极轻的阴影，增加离地感 */
    transition: transform 0.5s ease;
}

.work-item:hover img {
    transform: translateY(-5px); /* 悬停轻微上浮 */
}

.work-caption {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #f5f5f5;
    padding-top: 15px;
}

.caption-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.2em;
    color: #222;
}

.caption-date {
    font-size: 0.8em;
    color: #999;
    letter-spacing: 1px;
}

/* 动画 */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

/* 延迟动画，让图片依次出现 */
.work-item:nth-child(1) { animation-delay: 0.1s; }
.work-item:nth-child(2) { animation-delay: 0.3s; }
.work-item:nth-child(3) { animation-delay: 0.5s; }
.work-item:nth-child(4) { animation-delay: 0.7s; }

/* 移动端适配：取消分屏，改为上下排列 */
@media (max-width: 900px) {
    .split-container { flex-direction: column; }
    .left-pane { 
        width: 100%; 
        height: auto; 
        position: relative; 
        padding: 60px 30px; 
        border-right: none;
        border-bottom: 1px solid #f0f0f0;
    }
    .right-pane { width: 100%; padding: 40px 20px; }
    .work-list { gap: 60px; }
}
</style>

<div class="lana-wrapper">
    <div class="split-container">
        
        <div class="left-pane">
            <div class="separator"></div>
            <h1 class="brand-title">Lana<br>Del Rey</h1>
            <div class="intro-text">
                <p>
                    A visual archive exploring the aesthetics of nostalgia, glamour, and melancholia. 
                    Capturing moments that feel like a faded memory from a different era.
                </p>
                <p>
                    <em>"That's how the light gets in."</em>
                </p>
            </div>
            
            <div class="meta-info">
                <span>Est. 2025</span> &nbsp;—&nbsp; <span>Los Angeles</span>
            </div>
        </div>

        <div class="right-pane">
            <div class="work-list">
                
                <div class="work-item">
                    <img src="/images/xiaoman-portrait-4.png" alt="Portrait">
                    <div class="work-caption">
                        <span class="caption-title">Summertime Sadness</span>
                        <span class="caption-date">01 / 25</span>
                    </div>
                </div>

                <div class="work-item">
                    <img src="/images/xiaoman-portrait-1.png" alt="Detail">
                    <div class="work-caption">
                        <span class="caption-title">Blue Jeans</span>
                        <span class="caption-date">02 / 25</span>
                    </div>
                </div>

                <div class="work-item">
                    <img src="/images/cute.jpg" alt="Vibe">
                    <div class="work-caption">
                        <span class="caption-title">Young & Beautiful</span>
                        <span class="caption-date">03 / 25</span>
                    </div>
                </div>

                <div class="work-item">
                    <img src="/images/keyboard.jpg" alt="Object">
                    <div class="work-caption">
                        <span class="caption-title">Ultraviolence</span>
                        <span class="caption-date">04 / 25</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>