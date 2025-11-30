---
layout: single
title: "Lana Del Rey"
permalink: /lana/
author_profile: true
toc: false
---

<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Monsieur+La+Doulaise&family=Special+Elite&family=Monoton&family=VT323&display=swap" rel="stylesheet">

<style>
/* --- 0. 全局设置 --- */
.lana-wrapper {
    font-family: 'Cormorant Garamond', serif;
    background-color: #fdfbf7;
    background-image: url('/images/bg.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    color: #1a1a1a;
    overflow-x: hidden;
    padding: 60px 0;
    position: relative;
    font-size: 18px;
}
.lana-wrapper::after {
    content: ""; position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 999; opacity: 0.08;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    animation: grain-flicker 1s infinite steps(5);
}
@keyframes grain-flicker { 0%, 100% { transform: translate(0, 0); } 20% { transform: translate(-2px, 2px); } 80% { transform: translate(2px, 2px); } }

/* --- 1. 标题区 --- */
.hero-header {
    text-align: center; margin-bottom: 70px; position: relative; padding: 20px; border-bottom: 1px solid rgba(0,0,0,0.1); max-width: 80%; margin-left: auto; margin-right: auto;
}
.hero-title {
    font-family: 'Cormorant Garamond', serif; font-size: 5em; font-weight: 400; letter-spacing: -1px; text-transform: uppercase; color: #111; margin: 0; line-height: 0.9;
}
.hero-subtitle {
    font-family: 'Monsieur La Doulaise', cursive; font-size: 3em; color: #6a1b9a; margin-top: -20px; transform: rotate(-3deg); text-shadow: 2px 2px 0px rgba(255,255,255,0.8); position: relative; z-index: 2;
}

/* --- 2. 胶片长廊 --- */
.film-strip-container {
    background-color: #0a0a0a; padding: 30px 0; margin: 60px -20px; overflow-x: auto; white-space: nowrap; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.3); transform: rotate(-2deg); width: 105%; left: -2.5%;
    background-image: linear-gradient(90deg, #fdfbf7 50%, transparent 50%), linear-gradient(90deg, #fdfbf7 50%, transparent 50%);
    background-position: 0 10px, 0 calc(100% - 10px); background-size: 16px 10px; background-repeat: repeat-x; background-attachment: local;
}
.film-strip-container::-webkit-scrollbar { display: none; }
.film-frame { display: inline-block; height: 220px; padding: 0 10px; vertical-align: middle; border-right: 1px solid #222; }
.film-frame img { height: 100%; width: auto; object-fit: cover; filter: sepia(30%) contrast(110%) brightness(0.8); transition: all 0.6s ease; border-radius: 1px; }
.film-frame:hover img { filter: none; opacity: 1; transform: scale(1.05); z-index: 10; box-shadow: 0 0 30px rgba(255,255,255,0.1); }

/* --- 3. 手账区 --- */
.journal-layout {
    display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin: 80px auto; max-width: 1200px; padding: 0 40px; align-items: center;
}
.poem-card {
    background: #fffdf0; padding: 45px 40px; font-family: 'Special Elite', cursive; font-size: 1.1em; line-height: 2.2; color: #333; position: relative; box-shadow: 5px 10px 25px rgba(0,0,0,0.15); transform: rotate(1deg);
    --mask: radial-gradient(10px at 50% 12.5px, #000 99%, #0000 101%) 50% -12.5px / 20px 25px repeat-x; -webkit-mask: var(--mask) bottom, var(--mask) top; mask: var(--mask) bottom, var(--mask) top;
}
.poem-card::before {
    content: ""; position: absolute; top: -18px; left: 50%; transform: translateX(-50%) rotate(-1deg); width: 140px; height: 40px; background-color: rgba(255, 255, 255, 0.4); backdrop-filter: blur(2px); box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 2px dotted rgba(255,255,255,0.5); border-right: 2px dotted rgba(255,255,255,0.5); z-index: 10;
}
.visual-stack { position: relative; height: 400px; display: flex; justify-content: center; align-items: center; }
.framed-photo {
    position: absolute; width: 280px; padding: 15px 15px 50px 15px; background: #fff; box-shadow: 0 15px 35px rgba(0,0,0,0.2); transform: rotate(-3deg); z-index: 2; transition: transform 0.4s;
}
.framed-photo img { width: 100%; filter: grayscale(20%); }
.framed-photo:hover { transform: rotate(0deg) scale(1.02); z-index: 5; }
.vinyl-record {
    position: absolute; right: 0px; bottom: 20px; width: 200px; height: 200px; background: radial-gradient(circle, #111 20%, #333 21%, #111 22%, #111 30%, #333 31%, #111 32%, #111 40%, #333 41%, #111 42%, #000 70%); border-radius: 50%; z-index: 1; box-shadow: 0 10px 30px rgba(0,0,0,0.4); animation: spin 10s linear infinite;
}
.vinyl-label { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 70px; height: 70px; background: #b76e79; border-radius: 50%; border: 2px solid #fff; }
@keyframes spin { 100% { transform: rotate(360deg); } }
.signature-text { font-family: 'Monsieur La Doulaise', cursive; font-size: 1.8em; color: #555; text-align: right; margin-top: 20px; }
.lyric-highlight { color: #a83f39; font-weight: bold; }

/* --- 4. 极致复古场景区 (The Lounge) --- */
.vintage-scene-container {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 20px;
    margin: 120px auto 80px;
    padding: 0 20px;
    flex-wrap: wrap;
    position: relative;
}

/* 霓虹灯标志 */
.neon-sign {
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Monoton', cursive;
    font-size: 3em;
    color: #fff;
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #ff00de, 0 0 40px #ff00de;
    animation: neon-flicker 4s infinite alternate;
    z-index: 20;
}
@keyframes neon-flicker {
    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
    20%, 24%, 55% { opacity: 0.6; }
}

/* --- A. 改进的复古电视 (Old TV with Right Panel) --- */
.tv-unit {
    background: #2a2a2a;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.6), inset 0 2px 5px rgba(255,255,255,0.15);
    border: 8px solid #1a1a1a;
    display: flex;
    align-items: stretch; /* 左右等高 */
    max-width: 800px;
    min-width: 500px;
    flex: 2;
    position: relative;
}

/* 左侧屏幕 */
.tv-screen-bezel {
    flex: 3;
    background: #000;
    border-radius: 12px; /* 屏幕圆角 */
    border: 4px solid #444; /* 屏幕边框 */
    box-shadow: inset 0 0 20px #000;
    overflow: hidden;
    position: relative;
    height: 320px; /* 改成矮宽的 4:3 比例 */
    display: flex;
    align-items: center;
    justify-content: center;
}

.tv-screen-overlay {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%); background-size: 100% 4px; /* 扫描线 */
    pointer-events: none; z-index: 20;
    box-shadow: inset 0 0 80px rgba(0,0,0,0.7); /* 暗角 */
}

/* 视频居中显示 */
.tv-screen-bezel blockquote {
    position: relative;
    margin: 0 !important;
    max-width: 100% !important;
    min-width: auto !important;
}
.tv-screen-bezel iframe {
    width: 100% !important;
    height: 100% !important;
    max-width: none !important;
}

/* 右侧控制面板 (The Side Box) */
.tv-control-panel {
    flex: 1;
    background: #222;
    margin-left: 15px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    padding: 20px 10px;
    border: 2px solid #111;
    position: relative;
    /* 木纹质感模拟 */
    background-image: linear-gradient(90deg, #2a2a2a 0%, #222 10%, #2a2a2a 20%, #222 30%); 
    background-size: 20px 100%;
}

/* 扬声器栅格 */
.speaker-grille {
    flex: 1; /* 占据剩余空间 */
    background-image: repeating-linear-gradient(0deg, #111, #111 2px, #333 3px, #333 4px);
    border-radius: 4px;
    margin-top: 20px;
    box-shadow: inset 0 0 5px #000;
}

/* 旋钮 (Knobs) */
.knob {
    width: 50px; height: 50px;
    background: #111;
    border-radius: 50%;
    margin: 10px auto;
    border: 2px solid #444;
    box-shadow: 0 3px 5px rgba(0,0,0,0.5);
    position: relative;
}
.knob::after {
    content: ""; position: absolute; top: 5px; left: 50%; width: 4px; height: 15px; background: #fff; transform: translateX(-50%);
}
.knob.channel { transform: rotate(45deg); }
.knob.volume { transform: rotate(-15deg); }

/* 电源灯 */
.power-led {
    width: 10px; height: 10px; background: #f00; border-radius: 50%; margin: 0 auto 10px;
    box-shadow: 0 0 5px #f00; animation: blink 3s infinite;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.6} }


/* --- B. VHS 收纳架 (Wire Rack Organizer) --- */
.vhs-rack {
    flex: 0 0 auto;
    background: #dcdcdc; /* 金属架颜色 */
    padding: 10px;
    border: 2px solid #bbb;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    box-shadow: 5px 10px 20px rgba(0,0,0,0.2);
    transform: rotate(2deg) translateY(20px); /* 稍微随意一点 */
}

.vhs-case {
    width: 180px; height: 35px;
    background: #111;
    border-left: 4px solid #333;
    color: #fff;
    font-family: 'VT323', monospace; /* 像素字体 */
    font-size: 1.2em;
    display: flex;
    align-items: center;
    padding-left: 10px;
    position: relative;
    box-shadow: 0 2px 3px rgba(0,0,0,0.3);
    cursor: pointer;
    transition: transform 0.2s;
}
.vhs-case:hover { transform: translateX(-10px); }

/* 侧标贴纸 */
.vhs-case::after {
    content: ""; position: absolute; right: 10px; width: 100px; height: 20px; background: #fff; opacity: 0.9;
}
.vhs-case span { z-index: 2; color: #aaa; text-shadow: 1px 1px 0 #000; }


/* --- C. 超市小票歌单 (The Receipt) --- */
.receipt-paper {
    background: #fff;
    width: 260px;
    padding: 20px 20px 40px 20px;
    font-family: 'VT323', monospace; /* 收据点阵字 */
    font-size: 1.1em;
    color: #333;
    box-shadow: 0 5px 15px rgba(0,0,0,0.15);
    transform: rotate(-3deg) translateY(40px);
    position: relative;
    
    /* 锯齿边缘 (Zigzag Bottom) */
    --r: 5px; /* 锯齿大小 */
    background: 
        radial-gradient(circle at 0% 100%, transparent var(--r), #fff calc(var(--r) + 0.5px)) bottom left,
        radial-gradient(circle at 100% 100%, transparent var(--r), #fff calc(var(--r) + 0.5px)) bottom right;
    background-size: 50% 100%;
    background-repeat: no-repeat;
    /* 使用mask实现底部锯齿更通用，这里用 clip-path 简单模拟 */
    clip-path: polygon(
        0% 0%, 100% 0%, 100% 100%, 
        95% 98%, 90% 100%, 85% 98%, 80% 100%, 75% 98%, 70% 100%, 65% 98%, 60% 100%, 55% 98%, 50% 100%, 
        45% 98%, 40% 100%, 35% 98%, 30% 100%, 25% 98%, 20% 100%, 15% 98%, 10% 100%, 5% 98%, 0% 100%
    );
}

.receipt-header { text-align: center; border-bottom: 1px dashed #333; padding-bottom: 10px; margin-bottom: 10px; }
.receipt-item { display: flex; justify-content: space-between; margin-bottom: 5px; }
.receipt-total { border-top: 1px dashed #333; margin-top: 10px; padding-top: 10px; font-weight: bold; display: flex; justify-content: space-between; font-size: 1.2em; }
.barcode { height: 30px; background: repeating-linear-gradient(90deg, #000, #000 2px, #fff 2px, #fff 4px); margin-top: 20px; opacity: 0.8; }

/* 移动端适配 */
@media (max-width: 900px) {
    .vintage-scene-container { flex-direction: column; align-items: center; }
    .tv-unit { width: 100%; min-width: auto; flex-direction: column; }
    .tv-screen-bezel { height: 280px; } /* 移动端稍微矮一点 */
    .tv-control-panel { flex-direction: row; height: 80px; margin-left: 0; margin-top: 10px; }
    .speaker-grille { margin-top: 0; margin-left: 20px; }
    .knob { margin: 5px 10px; }
    .receipt-paper { transform: rotate(0); margin-top: 30px; }
    .vhs-rack { transform: rotate(0); margin-top: 30px; }
}
</style>

<div class="lana-wrapper">

    <div class="hero-header">
        <h1 class="hero-title">Lana Del Rey</h1>
        <div class="hero-subtitle">The Honeymoon Era</div>
    </div>

    <div class="film-strip-container">
        <div class="film-frame"><img src="/images/lana4.png"></div>
        <div class="film-frame"><img src="/images/lana0.png"></div>
        <div class="film-frame"><img src="/images/lana3.png"></div>
        <div class="film-frame"><img src="/images/lana6.png"></div>
        <div class="film-frame"><img src="/images/lana1.jpg"></div>
        <div class="film-frame"><img src="/images/lana8.png"></div>
        <div class="film-frame"><img src="/images/lana7.jpg"></div>
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
            </p>
            <div class="signature-text">— Yours, L.</div>
        </div>

        <div class="visual-stack">
            <div class="vinyl-record">
                <div class="vinyl-label"></div>
            </div>
            <div class="framed-photo">
                <img src="/images/lana9.png" alt="Memory">
                <div style="font-family:'Monsieur La Doulaise'; font-size:1.8em; text-align:center; margin-top:10px; color:#444;">
                    Summertime Sadness
                </div>
            </div>
        </div>
    </div>

    <div class="vintage-scene-container">
        
        <div class="neon-sign">LDR • TV</div>

        <div class="tv-unit">
            <div class="tv-screen-bezel">
                <div class="tv-screen-overlay"></div>
                <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DN_UxT6Ea_o/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>
                <script async src="//www.instagram.com/embed.js"></script>
            </div>
            
            <div class="tv-control-panel">
                <div class="power-led"></div>
                <div class="knob channel"></div> <div class="knob volume"></div> <div class="speaker-grille"></div> </div>
        </div>

        <div class="receipt-paper">
            <div class="receipt-header">
                LANA'S MARKET<br>
                <small>LOS ANGELES, CA</small><br>
                <small>DATE: 2025-09-21</small>
            </div>
            
            <div class="receipt-item"><span>01. BORN TO DIE</span> <span>4:46</span></div>
            <div class="receipt-item"><span>02. BLUE JEANS</span> <span>3:30</span></div>
            <div class="receipt-item"><span>03. VIDEO GAMES</span> <span>4:42</span></div>
            <div class="receipt-item"><span>04. RIDE</span> <span>4:49</span></div>
            <div class="receipt-item"><span>05. CHERRY</span> <span>3:00</span></div>
            
            <div class="receipt-total">
                <span>TOTAL MOOD:</span>
                <span>SAD</span>
            </div>
            
            <div class="barcode"></div>
            <div style="text-align:center; margin-top:10px; font-size:0.8em;">THANK YOU FOR CRYING</div>
        </div>

        <div class="vhs-rack">
            <div class="vhs-case"><span>Born to Die</span></div>
            <div class="vhs-case"><span>Ultraviolence</span></div>
            <div class="vhs-case"><span>Honeymoon</span></div>
            <div class="vhs-case"><span>Lana's Cut</span></div>
        </div>

    </div>
    
    <div style="text-align:center; margin-top:80px; font-size:0.8em; letter-spacing:3px; opacity:0.6;">
        EST. 2025 • LOS ANGELES
    </div>

</div>
