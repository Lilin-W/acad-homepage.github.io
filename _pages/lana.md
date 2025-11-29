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
    background-color: #fdfbf7; /* 米色纸张质感 */
    color: #2c2c2c;
    overflow: hidden; /* 防止旋转元素溢出 */
    padding: 20px 0;
}

/* --- 1. 标题区 (Hero Section) --- */
.hero-title {
    text-align: center;
    margin-bottom: 50px;
    position: relative;
}

.hero-title h1 {
    font-family: 'Cinzel', serif;
    font-size: 3.5em; /* 更大的标题 */
    letter-spacing: 5px;
    color: #111;
    margin: 0;
    text-transform: uppercase;
    text-shadow: 2px 2px 0px rgba(0,0,0,0.1);
}

.hero-subtitle {
    font-family: 'Dancing Script', cursive;
    font-size: 1.8em;
    color: #b76e79; /* 干燥玫瑰色 */
    margin-top: -10px;
    transform: rotate(-2deg);
    display: inline-block;
}

/* --- 2. 胶片长廊 (Film Strip) --- */
/* 模拟电影底片的黑色边框和穿孔效果 */
.film-strip-container {
    background-color: #1a1a1a;
    padding: 30px 0;
    margin: 40px -20px; /* 负边距让它撑满宽度 */
    overflow-x: auto; /* 允许横向滑动 */
    white-space: nowrap;
    box-shadow: inset 0 0 20px #000;
    
    /* 胶片上下穿孔效果 (用虚线模拟) */
    border-top: 2px dashed #555;
    border-bottom: 2px dashed #555;
}

/* 隐藏滚动条但保留功能 */
.film-strip-container::-webkit-scrollbar {
    height: 8px;
    background: #111;
}

.film-strip-container::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 4px;
}

.film-frame {
    display: inline-block;
    width: 280px;
    height: 200px;
    margin: 0 15px;
    background: #000;
    padding: 15px 5px; /* 上下留黑边 */
    box-sizing: border-box;
    vertical-align: middle;
    position: relative;
    transition: transform 0.3s;
}

.film-frame:hover {
    transform: scale(1.02); /* 悬停轻微放大 */
    z-index: 10;
}

.film-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(40%) contrast(110%); /* 略微黑白+高反差 */
    border-radius: 2px;
}

/* --- 3. 手账拼贴区 (Journal Collage) --- */
.journal-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 60px 20px;
    position: relative;
}

/* 左侧：打字机文字 */
.journal-text {
    flex: 1;
    min-width: 300px;
    padding-right: 40px;
    font-family: 'Special Elite', cursive; /* 打字机字体 */
    font-size: 1.1em;
    line-height: 1.8;
    color: #444;
    background: #fff;
    padding: 20px;
    box-shadow: 5px 5px 0px rgba(0,0,0,0.05);
    transform: rotate(1deg);
    border: 1px solid #eee;
    z-index: 2; /* 文字浮在最上层 */
}

/* 右侧：散落的照片堆 */
.journal-photos {
    flex: 1;
    min-width: 300px;
    position: relative;
    height: 400px; /* 预留高度给堆叠照片 */
    display: flex;
    justify-content: center;
    align-items: center;
}

.scattered-photo {
    position: absolute;
    border: 8px solid #fff;
    box-shadow: 10px 10px 30px rgba(0,0,0,0.25);
    width: 240px;
    transition: all 0.4s ease;
}

/* 第一张照片：向左歪，放在底层 */
.scattered-photo:nth-child(1) {
    transform: rotate(-10deg) translate(-30px, 10px);
    z-index: 1;
}

/* 第二张照片：向右歪，叠在上面 */
.scattered-photo:nth-child(2) {
    transform: rotate(8deg) translate(20px, -10px);
    z-index: 3;
}

/* 鼠标悬停时的动态效果：照片散开 */
.journal-photos:hover .scattered-photo:nth-child(1) {
    transform: rotate(-15deg) translate(-60px, 20px) scale(1.05);
}

.journal-photos:hover .scattered-photo:nth-child(2) {
    transform: rotate(10deg) translate(50px, -20px) scale(1.05);
}

.lyric-highlight {
    color: #a83f39; /* 深红色高亮 */
    font-weight: bold;
}

/* 装饰性分割线 */
.vintage-line {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
    margin: 40px 0;
}
</style>

<div class="lana-wrapper">
    <div class="hero-title">
        <h1>Lana Del Rey</h1>
        <div class="hero-subtitle">"I'm your little harlot, starlet."</div>
    </div>

    <div class="film-strip-container">
        
        <div class="film-frame">
            <img src="/images/xiaoman-portrait-1.png" alt="Film Shot 1">
        </div>
        
        <div class="film-frame">
            <img src="/images/xiaoman-portrait-2.png" alt="Film Shot 2">
        </div>

        <div class="film-frame">
            <img src="/images/xiaoman-portrait-3.png" alt="Lana Vibe">
        </div>

        <div class="film-frame">
            <img src="/images/cute.jpg" alt="Vintage Car">
        </div>

        <div class="film-frame">
            <img src="/images/wink.jpg" alt="Film Shot 5">
        </div>

        <div class="film-frame">
            <img src="/images/jump.jpg" alt="Film Shot 6">
        </div>
    </div>

    <hr class="vintage-line">

    <div class="journal-section">
        
        <div class="journal-text">
            <p>
                <strong>September 2025.</strong><br><br>
                Sitting on the porch, listening to <span class="lyric-highlight">Ultraviolence</span> on repeat. 
                The world feels like a grainy movie scene sometimes. 
                <br><br>
                I try to capture these fleeting moments—the light, the shadows, the melancholy beauty of everyday life. 
                It's not just about the picture; it's about the feeling of being <em>infinite</em>.
            </p>
        </div>

        <div class="journal-photos">
            <img class="scattered-photo" src="/images/xiaoman-portrait-4.png" alt="Memory 1">
            <img class="scattered-photo" src="/images/keyboard.jpg" alt="Memory 2">
        </div>
    </div>
    
    <div style="text-align:center; margin-top:50px; font-family:'Cinzel', serif; font-size:0.9em; opacity:0.6;">
        — EST. 2025 —
    </div>
</div>

