---
layout: single
title: "Film Archive"
permalink: /film/
author_profile: true
toc: false
---

<link href="https://fonts.googleapis.com/css2?family=Prata&family=Courier+Prime&display=swap" rel="stylesheet">

<style>
/* --- 核心设定 (保持不变) --- */
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

/* 全局复古颗粒层 */
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
    padding: 80px 20px 60px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    margin-bottom: 40px;
}

.main-title {
    font-size: 3rem;
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

/* --- 事件块结构 --- */
.event-block {
    margin-top: 80px;
    margin-bottom: 120px;
    position: relative;
}

.event-header {
    padding-left: 5%;
    margin-bottom: 30px;
    border-left: 2px solid #111;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
    margin-top: 5px;
}

/* --- 切换按钮样式 --- */
.toggle-btn {
    background: none;
    border: 1px solid #ccc;
    color: #555;
    font-family: var(--font-meta);
    font-size: 0.7rem;
    padding: 8px 12px;
    margin-top: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 2px;
    outline: none;
}

.toggle-btn:hover {
    border-color: #111;
    color: #111;
    background: rgba(0,0,0,0.05);
}

/* --- 模式 A: 横向胶卷条 (Preview) --- */
.film-scroller {
    background-color: var(--film-black);
    width: 100vw;
    position: relative;
    left: 50%; right: 50%;
    margin-left: -50vw; margin-right: -50vw;
    padding: 40px 0;
    /* 齿孔背景 */
    background-image: 
        linear-gradient(to right, #fff 50%, transparent 50%),
        linear-gradient(to right, #fff 50%, transparent 50%);
    background-size: 20px 12px;
    background-repeat: repeat-x;
    background-position: 0 10px, 0 calc(100% - 10px);
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    align-items: center;
    -ms-overflow-style: none; scrollbar-width: none;
    box-shadow: inset 0 0 50px rgba(0,0,0,0.8);
}
.film-scroller::-webkit-scrollbar { display: none; }

.film-frame {
    flex: 0 0 auto;
    height: 350px;
    margin: 0 10px;
    position: relative;
    border: 8px solid #000;
    background: #000;
}
.film-frame:first-child { margin-left: 5vw; }
.film-frame:last-child { margin-right: 5vw; }
.film-frame img {
    height: 100%; width: auto; display: block;
    transition: filter 0.5s ease;
    cursor: pointer;
}
.film-frame:hover img { 
    filter: brightness(1.05);
}
.frame-number {
    position: absolute; bottom: -30px; right: 0;
    color: rgba(255,255,255,0.4);
    font-family: var(--font-meta); font-size: 10px;
}

/* --- 模式 B: 完整彩色归档墙 (Full Archive) --- */
.full-archive {
    /* 撑满全屏宽度 */
    width: 100vw;
    margin-left: -50vw;
    margin-right: -50vw;
    position: relative;
    left: 50%;
    right: 50%;
    
    padding: 60px 8%; /* 左右留白 */
    background-color: var(--bg-color); /* 保持背景一致，不要黑色 */
    box-sizing: border-box;
    
    /* 网格布局：自动适应一行放几张 */
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 30px; /* 照片间距 */
    
    /* 上下加一点微妙的阴影分割线 */
    box-shadow: inset 0 20px 20px -20px rgba(0,0,0,0.08), inset 0 -20px 20px -20px rgba(0,0,0,0.08);
    border-top: 1px solid rgba(0,0,0,0.05);
}

.archive-frame {
    position: relative;
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background: #fff;
    padding: 5px; /* 类似拍立得白边 */
    border-radius: 2px;
}

.archive-frame:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.12);
    z-index: 10;
}

.archive-frame img {
    width: 100%;
    height: auto;
    display: block;
    aspect-ratio: 3/2; /* 强制 3:2 比例，看起来整齐 */
    object-fit: cover;
    cursor: pointer;
}

.archive-num {
    position: absolute;
    bottom: -25px;
    right: 5px;
    font-family: var(--font-meta);
    font-size: 0.75rem;
    color: #999;
}

/* 响应式调整 */
@media (max-width: 768px) {
    .main-title { font-size: 2rem; }
    .film-frame { height: 250px; }
    .full-archive { 
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 15px;
        padding: 40px 4%;
    }
}

/* --- 灯箱效果 --- */
.lightbox {
    display: none;
    position: fixed;
    z-index: 99999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.95);
    align-items: center;
    justify-content: center;
}
.lightbox.active {
    display: flex;
}
.lightbox img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    animation: zoomIn 0.3s ease;
    box-shadow: 0 0 50px rgba(255,255,255,0.1);
}
.lightbox-close {
    position: absolute;
    top: 30px;
    right: 50px;
    color: #fff;
    font-size: 50px;
    font-weight: 300;
    cursor: pointer;
    transition: transform 0.2s ease;
    font-family: var(--font-meta);
}
.lightbox-close:hover {
    transform: scale(1.1);
}
@keyframes zoomIn {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}
</style>

<div class="ldr-wrapper">

    <div class="header-section">
        <h1 class="main-title">Film Archive</h1>
        <div class="sub-title">Moments captured on analog</div>
    </div>

    <div class="event-block" id="event-rainier">
        <div class="event-header">
            <h2 class="event-name">Mount Rainier</h2>
            <div class="event-date">Late July • Kodak Gold 200</div>
            
            <button class="toggle-btn" onclick="toggleView('event-rainier')">
                [ View Full Roll ]
            </button>
        </div>

        <div class="film-scroller view-teaser">
            <div class="film-frame"><img src="/images/rainier1.jpg" alt="Highlights" onclick="openLightbox('/images/rainier1.jpg')"><span class="frame-number">03</span></div>
            <div class="film-frame"><img src="/images/rainier2.jpg" alt="Highlights" onclick="openLightbox('/images/rainier2.jpg')"><span class="frame-number">07</span></div>
            <div class="film-frame"><img src="/images/rainier3.jpg" alt="Highlights" onclick="openLightbox('/images/rainier3.jpg')"><span class="frame-number">12</span></div>
            <div class="film-frame"><img src="/images/rainier5.jpg" alt="Highlights" onclick="openLightbox('/images/rainier5.jpg')"><span class="frame-number">18</span></div>
        </div>

        <div class="full-archive view-full" style="display: none;">
            <div class="archive-frame"><img src="/images/rainier1.jpg" alt="Full Roll" onclick="openLightbox('/images/rainier1.jpg')"><span class="archive-num">01</span></div>
            <div class="archive-frame"><img src="/images/rainier2.jpg" alt="Full Roll" onclick="openLightbox('/images/rainier2.jpg')"><span class="archive-num">02</span></div>
            <div class="archive-frame"><img src="/images/rainier3.jpg" alt="Full Roll" onclick="openLightbox('/images/rainier3.jpg')"><span class="archive-num">03</span></div>
            <div class="archive-frame"><img src="/images/rainier4.jpg" alt="Full Roll" onclick="openLightbox('/images/rainier4.jpg')"><span class="archive-num">04</span></div>
            <div class="archive-frame"><img src="/images/rainier5.jpg" alt="Full Roll" onclick="openLightbox('/images/rainier5.jpg')"><span class="archive-num">05</span></div>
            <div class="archive-frame"><img src="/images/rainier6.jpg" alt="Full Roll" onclick="openLightbox('/images/rainier6.jpg')"><span class="archive-num">06</span></div>
        </div>
    </div>

    <!-- Hasselblad 区块 -->
    <div class="event-block" id="event-rainier-hasselblad" style="margin-top: 40px;">
        <div class="event-header">
            <div class="event-date">Late July • Hasselblad 500C • Portra 400</div>
            
            <button class="toggle-btn" onclick="toggleView('event-rainier-hasselblad')">
                [ View Full Roll ]
            </button>
        </div>

        <div class="film-scroller view-teaser">
            <div class="film-frame"><img src="/images/rainierH1.jpg" alt="Highlights" onclick="openLightbox('/images/rainierH1.jpg')"><span class="frame-number">01</span></div>
            <div class="film-frame"><img src="/images/rainierH2.jpg" alt="Highlights" onclick="openLightbox('/images/rainierH2.jpg')"><span class="frame-number">02</span></div>
            <div class="film-frame"><img src="/images/rainierH4.jpg" alt="Highlights" onclick="openLightbox('/images/rainierH3.jpg')"><span class="frame-number">04</span></div>
            <div class="film-frame"><img src="/images/rainierH6.jpg" alt="Highlights" onclick="openLightbox('/images/rainierH4.jpg')"><span class="frame-number">06</span></div>
        </div>

        <div class="full-archive view-full" style="display: none;">
            <div class="archive-frame"><img src="/images/rainierH1.jpg" alt="Full Roll" onclick="openLightbox('/images/rainierH1.jpg')"><span class="archive-num">01</span></div>
            <div class="archive-frame"><img src="/images/rainierH2.jpg" alt="Full Roll" onclick="openLightbox('/images/rainierH2.jpg')"><span class="archive-num">02</span></div>
            <div class="archive-frame"><img src="/images/rainierH3.jpg" alt="Full Roll" onclick="openLightbox('/images/rainierH3.jpg')"><span class="archive-num">03</span></div>
            <div class="archive-frame"><img src="/images/rainierH4.jpg" alt="Full Roll" onclick="openLightbox('/images/rainierH4.jpg')"><span class="archive-num">04</span></div>
            <div class="archive-frame"><img src="/images/rainierH5.jpg" alt="Full Roll" onclick="openLightbox('/images/rainierH5.jpg')"><span class="archive-num">05</span></div>
            <div class="archive-frame"><img src="/images/rainierH6.jpg" alt="Full Roll" onclick="openLightbox('/images/rainierH6.jpg')"><span class="archive-num">06</span></div>
        </div>
    </div>


    <div style="text-align:center; font-family:var(--font-meta); font-size:12px; margin-top:80px; opacity:0.5; letter-spacing: 2px;">
        END OF ROLL
    </div>

</div>

<!-- Lightbox -->
<div class="lightbox" id="lightbox" onclick="closeLightbox()">
    <span class="lightbox-close">&times;</span>
    <img id="lightbox-img" src="" alt="Enlarged view">
</div>

<script>
// 1. 切换视图的函数
function toggleView(eventId) {
    const block = document.getElementById(eventId);
    // 获取该 block 下的两个视图和按钮
    const teaser = block.querySelector('.view-teaser');
    const full = block.querySelector('.view-full');
    const btn = block.querySelector('.toggle-btn');
    
    if (full.style.display === 'none') {
        // 展开完整版
        teaser.style.display = 'none';
        full.style.display = 'grid'; // 注意这里用 grid
        btn.textContent = "[ Close Roll ]"; // 改变按钮文字
        btn.style.borderColor = "#111";
    } else {
        // 收起回到精选
        teaser.style.display = 'flex';
        full.style.display = 'none';
        btn.textContent = "[ View Full Roll ]"; // 恢复按钮文字
        btn.style.borderColor = "#ccc";
        // 可选：收起时滚动回该事件顶部
        block.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
}

// 2. 鼠标滚轮横向滚动脚本
const scrollers = document.querySelectorAll('.film-scroller');
scrollers.forEach(scroller => {
    scroller.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        scroller.scrollLeft += evt.deltaY;
    });
});

// 3. 灯箱功能
function openLightbox(imgSrc) {
    document.getElementById('lightbox').classList.add('active');
    document.getElementById('lightbox-img').src = imgSrc;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ESC键关闭灯箱
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
});
</script>
