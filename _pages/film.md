---
layout: single
title: "Film Archive"
permalink: /film/
author_profile: true
toc: false
---

<link href="https://fonts.googleapis.com/css2?family=Prata&family=Courier+Prime&display=swap" rel="stylesheet">

<style>
/* --- 核心设定 --- */
:root {
    --bg-color: #fdfbf7; /* 象牙白，复古信纸色 */
    --film-black: #111111; /* 胶卷黑 */
    --font-title: 'Prata', serif;
    --font-meta: 'Courier Prime', monospace;
}

body {
    background-color: var(--bg-color);
}

.ldr-wrapper {
    font-family: var(--font-title);
    color: #222;
    overflow-x: hidden;
    padding-bottom: 100px;
    position: relative;
}

/* 全局复古颗粒层 (Grain) */
.ldr-wrapper::after {
    content: "";
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.08;
    pointer-events: none;
    z-index: 9999;
}

/* --- 标题区域 --- */
.header-section {
    text-align: center;
    padding: 80px 20px 40px;
}

.main-title {
    font-size: 3.5rem;
    text-transform: uppercase;
    letter-spacing: 5px;
    margin: 0;
    color: #111;
}

.sub-title {
    font-family: var(--font-meta);
    font-size: 0.9rem;
    color: #666;
    margin-top: 15px;
    letter-spacing: 2px;
    font-style: italic;
}

/* --- 事件块 --- */
.event-block {
    margin-top: 60px;
    margin-bottom: 100px;
}

.event-header {
    padding-left: 5%; /* 左侧对齐，更有杂志感 */
    margin-bottom: 20px;
    border-left: 2px solid #111;
    padding-left: 20px;
}

.event-name {
    font-size: 2rem;
    margin: 0;
}

.event-date {
    font-family: var(--font-meta);
    font-size: 0.8rem;
    color: #555;
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* --- 胶卷条核心代码 (The Film Strip) --- */
.film-scroller {
    background-color: var(--film-black);
    width: 100vw; /* 占据全屏宽度 */
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    padding: 40px 0; /* 上下给齿孔留出空间 */
    
    /* 核心：用 CSS 渐变画出逼真的齿孔，而不是简单的方块 */
    background-image: 
        linear-gradient(to right, #fff 50%, transparent 50%), /* 上排齿孔 */
        linear-gradient(to right, #fff 50%, transparent 50%); /* 下排齿孔 */
    background-size: 20px 12px; /* 齿孔大小 */
    background-repeat: repeat-x;
    background-position: 0 10px, 0 calc(100% - 10px); /* 上下位置 */
    
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    align-items: center;
    
    /* 隐藏滚动条但保留功能 */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    box-shadow: inset 0 0 50px rgba(0,0,0,0.8); /* 内阴影，增加深邃感 */
}

.film-scroller::-webkit-scrollbar {
    display: none;
}

/* 胶卷内的照片容器 */
.film-frame {
    flex: 0 0 auto;
    height: 350px; /* 胶卷高度 */
    margin: 0 10px; /* 照片间距 */
    position: relative;
    border: 8px solid #000; /* 照片黑边 */
    background: #000;
}

.film-frame:first-child {
    margin-left: 5vw; /* 让第一张图不贴边 */
}
.film-frame:last-child {
    margin-right: 5vw;
}

.film-frame img {
    height: 100%;
    width: auto;
    display: block;
    transition: filter 0.5s ease;
}

.film-frame:hover img {
    filter: brightness(1.05);
}

/* 胶卷编号 (像真实底片那样) */
.frame-number {
    position: absolute;
    bottom: -30px;
    right: 0;
    color: rgba(255,255,255,0.4);
    font-family: var(--font-meta);
    font-size: 10px;
}

</style>

<div class="ldr-wrapper">

    <div class="header-section">
        <h1 class="main-title">Film Archive</h1>
        <div class="sub-title">Moments captured on analog</div>
    </div>

    <div class="event-block">
        <div class="event-header">
            <h2 class="event-name">Mount Rainier</h2>
            <div class="event-date">Late July • Kodak Gold 200</div>
        </div>

        <div class="film-scroller">
            
            <div class="film-frame">
                <img src="/images/rainier1.jpg" alt="Rainier">
                <span class="frame-number">01</span>
            </div>

            <div class="film-frame">
                <img src="/images/rainier2.jpg" alt="Rainier">
                <span class="frame-number">02</span>
            </div>

            <div class="film-frame">
                <img src="/images/rainier3.jpg" alt="Rainier">
                <span class="frame-number">03</span>
            </div>
            
            <div class="film-frame">
                <img src="/images/rainier4.jpg" alt="Rainier">
                <span class="frame-number">04</span>
            </div>
            
             <div class="film-frame">
                <img src="/images/rainier5.jpg" alt="Rainier">
                <span class="frame-number">05</span>
            </div>

        </div>
    </div>

    <div style="text-align:center; font-family:var(--font-meta); font-size:12px; margin-top:80px; opacity:0.5;">
        END OF ROLL
    </div>

</div>

<script>
    const scrollers = document.querySelectorAll('.film-scroller');
    scrollers.forEach(scroller => {
        scroller.addEventListener('wheel', (evt) => {
            evt.preventDefault();
            scroller.scrollLeft += evt.deltaY;
        });
    });
</script>
