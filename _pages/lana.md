---
layout: single
title: "Lana Del Rey"
permalink: /lana/
author_profile: true
toc: false
---

<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Monsieur+La+Doulaise&family=Special+Elite&family=Playfair+Display+SC:wght@700&family=Pinyon+Script&display=swap" rel="stylesheet">

<style>
/* --- 0. 全局设置 --- */
.lana-wrapper {
    font-family: 'Cormorant Garamond', serif;
    background-color: #fdfbf7;
    color: #1a1a1a;
    overflow-x: hidden;
    padding-bottom: 0; /* 底部由深色块接管 */
    position: relative;
    font-size: 19px;
}

/* 动态噪点层 */
.lana-wrapper::after {
    content: "";
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none;
    z-index: 999;
    opacity: 0.06;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    animation: grain-flicker 2s infinite steps(10);
}
@keyframes grain-flicker { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(-1px, 1px); } }

/* --- 1. 标题区 --- */
.hero-header {
    text-align: center;
    padding: 80px 20px 60px;
    border-bottom: 1px double #e0e0e0;
    margin: 0 40px;
}
.hero-title {
    font-family: 'Playfair Display SC', serif; /* 新的大写标题字 */
    font-size: 4.5em;
    letter-spacing: 5px;
    color: #111;
    margin: 0;
    line-height: 1;
}
.hero-subtitle {
    font-family: 'Monsieur La Doulaise', cursive;
    font-size: 3.2em;
    color: #8e44ad;
    margin-top: -15px;
    transform: rotate(-2deg);
}

/* --- 2. 胶片区 (保留) --- */
.film-strip-container {
    background-color: #050505;
    padding: 30px 0;
    margin: 60px -20px;
    overflow-x: auto;
    white-space: nowrap;
    position: relative;
    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
    /* 方孔 */
    background-image: linear-gradient(90deg, #fdfbf7 50%, transparent 50%), linear-gradient(90deg, #fdfbf7 50%, transparent 50%);
    background-position: 0 10px, 0 calc(100% - 10px);
    background-size: 16px 10px;
    background-repeat: repeat-x;
    background-attachment: local;
}
.film-strip-container::-webkit-scrollbar { display: none; }
.film-frame {
    display: inline-block;
    height: 240px;
    padding: 0 12px;
    border-right: 1px solid #333;
}
.film-frame img {
    height: 100%;
    width: auto;
    filter: sepia(20%) contrast(110%) brightness(0.9);
    transition: all 0.5s;
}
.film-frame:hover img { filter: none; opacity: 1; transform: scale(1.02); }

/* --- 3. 关键词词典 (The Vocabulary) - 新增 --- */
.keywords-section {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 40px;
    margin: 80px auto;
    max-width: 900px;
    text-align: center;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 40px 0;
}

.keyword-item {
    flex: 1;
    min-width: 200px;
}

.kw-title {
    font-family: 'Playfair Display SC', serif;
    font-size: 1.4em;
    font-weight: bold;
    color: #111;
    margin-bottom: 5px;
    letter-spacing: 1px;
}

.kw-def {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    color: #666;
    font-size: 1.1em;
}

/* --- 4. 杂志手账区 (Journal) --- */
.journal-layout {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 60px;
    margin: 80px 20px;
    align-items: center;
}

.poem-card {
    background: #fff;
    padding: 40px;
    border: 1px solid #eee;
    box-shadow: 10px 10px 0px rgba(0,0,0,0.03); /* 硬阴影，像杂志排版 */
    font-family: 'Special Elite', monospace;
    line-height: 2;
    position: relative;
}
/* 装饰：右上角的樱桃 */
.poem-card::after {
    content: "🍒";
    font-size: 2em;
    position: absolute;
    top: 10px; right: 20px;
    opacity: 0.8;
}

.visual-stack {
    position: relative;
    height: 450px;
}
.vinyl-record {
    position: absolute;
    right: 20px; bottom: 0;
    width: 220px; height: 220px;
    background: radial-gradient(circle, #111 20%, #222 21%, #111 22%, #000 70%);
    border-radius: 50%;
    z-index: 1;
    animation: spin 12s linear infinite;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
.vinyl-label {
    position: absolute;
    top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 80px; height: 80px;
    background: #a93226; border-radius: 50%; border: 3px solid #fff;
}
@keyframes spin { 100% { transform: rotate(360deg); } }

.framed-photo {
    position: absolute;
    top: 0; left: 0;
    width: 300px;
    background: #fff;
    padding: 15px 15px 50px 15px;
    box-shadow: 0 15px 40px rgba(0,0,0,0.2);
    transform: rotate(-5deg);
    z-index: 2;
    transition: transform 0.3s;
}
.framed-photo:hover { transform: rotate(0deg) scale(1.02); z-index: 10; }
.framed-photo img { width: 100%; filter: grayscale(10%); }

/* --- 5. 暗房区 (The Dark Room) - 新增底部深色区 --- */
.dark-section {
    background-color: #111;
    color: #ddd;
    margin: 80px -50vw -60px -50vw; /* 全宽背景 */
    padding: 80px 50vw;
    position: relative;
    text-align: center;
    border-top: 3px solid #d4af37; /* 金边 */
}

.dark-quote {
    font-family: 'Pinyon Script', cursive;
    font-size: 2.5em;
    color: #fff;
    margin-bottom: 40px;
    text-shadow: 0 0 10px rgba(255,255,255,0.3);
}

.dark-gallery {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
}

.mini-polaroid {
    width: 180px;
    background: #fff;
    padding: 8px 8px 25px 8px;
    transform: rotate(3deg);
    transition: transform 0.3s;
    color: #000;
}
.mini-polaroid:hover { transform: scale(1.1) rotate(0deg); }
.mini-polaroid img { width: 100%; height: 180px; object-fit: cover; filter: sepia(50%); }
.mini-caption { font-family: 'Special Elite'; font-size: 0.8em; text-align: center; margin-top: 5px; }

</style>

<div class="lana-wrapper">

    <div class="hero-header">
        <h1 class="hero-title">Lana Del Rey</h1>
        <div class="hero-subtitle">The Honeymoon Era</div>
    </div>

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

    <div class="keywords-section">
        <div class="keyword-item">
            <div class="kw-title">COQUETTE</div>
            <div class="kw-def">adj. Flirtatious, playful, charming.</div>
            <div style="font-size:1.5em; margin-top:5px;">🎀</div>
        </div>
        <div class="keyword-item">
            <div class="kw-title">AMERICANA</div>
            <div class="kw-def">n. Vintage cultural artifacts of the U.S.</div>
            <div style="font-size:1.5em; margin-top:5px;">🇺🇸</div>
        </div>
        <div class="keyword-item">
            <div class="kw-title">SADCORE</div>
            <div class="kw-def">n. Melancholic alternative rock.</div>
            <div style="font-size:1.5em; margin-top:5px;">🚬</div>
        </div>
        <div class="keyword-item">
            <div class="kw-title">OLD MONEY</div>
            <div class="kw-def">n. Inherited wealth, classic elegance.</div>
            <div style="font-size:1.5em; margin-top:5px;">🥂</div>
        </div>
    </div>

    <div class="journal-layout">
        <div class="poem-card">
            <p>
                <strong>September 2025.</strong><br><br>
                Sitting on the porch, listening to <span class="lyric-highlight">Ultraviolence</span>. 
                The world feels like a grainy movie scene.
                <br><br>
                "That's how the light gets in. <br>
                Then you're <strong style="color:#d4af37;">golden</strong>."
                <br><br>
                It's not just about the picture; it's about the feeling of being <em>infinite</em>.
            </p>
            <div style="text-align:right; margin-top:20px; font-family:'Monsieur La Doulaise'; font-size:1.5em; color:#888;">— L.</div>
        </div>

        <div class="visual-stack">
            <div class="vinyl-record">
                <div class="vinyl-label"></div>
            </div>
            <div class="framed-photo">
                <img src="/images/xiaoman-portrait-4.png" alt="Memory">
                <div style="font-family:'Monsieur La Doulaise'; font-size:1.8em; text-align:center; margin-top:10px; color:#444;">
                    Summertime Sadness
                </div>
            </div>
        </div>
    </div>

    <div class="dark-section">
        <div class="dark-quote">"Live fast. Die young. Be wild. Have fun."</div>
        
        <div class="dark-gallery">
            <div class="mini-polaroid">
                <img src="/images/87548e0c9ae86ef457b731266c6413bf.jpg" alt="Vintage">
                <div class="mini-caption">Vintage</div>
            </div>
            <div class="mini-polaroid" style="transform: rotate(-3deg);">
                <img src="/images/a80dc8e60f983566d2ac8fbbc990884d.jpg" alt="Mood">
                <div class="mini-caption">Mood</div>
            </div>
            <div class="mini-polaroid">
                <img src="/images/b4601eb8b32e7a6281897e1f6385b73c.jpg" alt="Style">
                <div class="mini-caption">Style</div>
            </div>
        </div>
        
        <div style="margin-top:50px; font-size:0.8em; letter-spacing:2px; color:#666;">
            © 2025 THE VINTAGE ARCHIVE
        </div>
    </div>

</div>