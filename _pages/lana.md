---
layout: single
title: "Lana Del Rey"
permalink: /lana/
author_profile: true
toc: false
---

<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Monsieur+La+Doulaise&family=Special+Elite&family=Monoton&family=VT323&family=Bebas+Neue&display=swap" rel="stylesheet">

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
    box-shadow: inset 0 0 150px rgba(0,0,0,0.08);
}
.lana-wrapper::after {
    content: ""; position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 999; opacity: 0.06;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    animation: grain-flicker 1s infinite steps(5);
}
@keyframes grain-flicker { 0%, 100% { transform: translate(0, 0); } 20% { transform: translate(-2px, 2px); } 80% { transform: translate(2px, 2px); } }

/* 漂浮尘埃 */
.dust-particle {
    position: fixed; width: 2px; height: 2px; background: rgba(100, 100, 100, 0.4); border-radius: 50%; pointer-events: none; z-index: 998; animation: float-dust linear infinite;
}
@keyframes float-dust {
    0% { transform: translateY(0) translateX(0); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
}

/* --- 1. 标题区 --- */
.hero-header {
    text-align: center; margin-bottom: 70px; position: relative; padding: 20px; border-bottom: 1px solid rgba(0,0,0,0.1); max-width: 80%; margin-left: auto; margin-right: auto; z-index: 10;
}
.hero-title {
    font-family: 'Cormorant Garamond', serif; font-size: 5em; font-weight: 400; letter-spacing: -1px; text-transform: uppercase; color: #111; margin: 0; line-height: 0.9;
}
.hero-subtitle {
    font-family: 'Monsieur La Doulaise', cursive; font-size: 3em; color: #6a1b9a; margin-top: -20px; transform: rotate(-3deg); text-shadow: 2px 2px 0px rgba(255,255,255,0.8); position: relative; z-index: 2;
}

/* --- 2. 胶片长廊 --- */
.film-strip-container {
    background-color: #0a0a0a; padding: 30px 0; margin: 60px -20px; overflow-x: auto; white-space: nowrap; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.3); transform: rotate(-2deg); width: 105%; left: -2.5%; z-index: 10;
    background-image: linear-gradient(90deg, #fdfbf7 50%, transparent 50%), linear-gradient(90deg, #fdfbf7 50%, transparent 50%);
    background-position: 0 10px, 0 calc(100% - 10px); background-size: 16px 10px; background-repeat: repeat-x; background-attachment: local;
}
.film-strip-container::-webkit-scrollbar { display: none; }
.film-frame { display: inline-block; height: 220px; padding: 0 10px; vertical-align: middle; border-right: 1px solid #222; }
.film-frame img { height: 100%; width: auto; object-fit: cover; filter: sepia(30%) contrast(110%) brightness(0.8); transition: all 0.6s ease; border-radius: 1px; }
.film-frame:hover img { filter: none; opacity: 1; transform: scale(1.05); z-index: 10; box-shadow: 0 0 30px rgba(255,255,255,0.1); }

/* --- 3. 手账区 --- */
.journal-layout {
    display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin: 80px auto; max-width: 1200px; padding: 0 40px; align-items: center; position: relative; z-index: 10;
}
.poem-card {
    background: #fffdf0; padding: 45px 40px; font-family: 'Special Elite', cursive; font-size: 1.1em; line-height: 2.2; color: #333; position: relative; box-shadow: 5px 10px 25px rgba(0,0,0,0.15); transform: rotate(1deg); z-index: 2;
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

/* --- 4. 极致复古场景区 (The Living Room) --- */
.vintage-scene-container {
    display: flex;
    justify-content: flex-start; /* 改为左对齐 */
    align-items: flex-end;
    gap: 40px; /* 增加间距 */
    margin: 100px auto 80px;
    padding: 0 20px;
    flex-wrap: wrap;
    position: relative;
    max-width: 1300px; /* 增加最大宽度 */
    z-index: 10;
}

/* 电视+柜子组 */
.tv-vhs-group {
    display: flex;
    align-items: flex-end;
    gap: 0px;
    position: relative;
    margin-right: auto; /* 推到左边 */
}

/* 霓虹灯 */
.neon-sign {
    position: absolute; top: -120px; left: 50%; transform: translateX(-50%); font-family: 'Monoton', cursive; font-size: 3.5em; color: #fff;
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #e056fd, 0 0 40px #e056fd; animation: neon-flicker 5s infinite alternate; z-index: 20;
}
@keyframes neon-flicker { 0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; } 20%, 24%, 55% { opacity: 0.7; } }

/* --- A. 木质电视机 (Wood Grain TV) --- */
.tv-unit {
    /* 木纹质感背景 */
    background-color: #5d4037;
    background-image: repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 10px),
                      repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 20px);
    
    padding: 30px;
    border-radius: 20px;
    /* 强烈的立体阴影 */
    box-shadow: 
        0 40px 80px rgba(0,0,0,0.6), 
        inset 2px 2px 5px rgba(255,255,255,0.2),
        inset -2px -2px 5px rgba(0,0,0,0.3);
    border-bottom: 10px solid #3e2723; /* 底部加厚 */
    display: flex;
    align-items: center;
    position: relative;
    z-index: 5;
}

/* 电视屏幕区 - 4:3 比例 */
.tv-screen-bezel {
    width: 480px; /* 4:3 比例: 360 * 4/3 = 480 */
    background: #111;
    border-radius: 30px; /* CRT 的大圆角 */
    border: 8px solid #dcdcdc; /* 银色镀铬边框 */
    box-shadow: 
        0 0 0 2px #555, /* 外圈黑线 */
        inset 0 0 20px #000;
    overflow: hidden;
    position: relative;
    height: 360px; /* 4:3 比例 */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

/* 屏幕玻璃反光层 */
.tv-screen-bezel::before {
    content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
    background: radial-gradient(circle at 70% 30%, rgba(255,255,255,0.15), transparent 30%);
    pointer-events: none; z-index: 30;
}

.tv-screen-overlay {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background: repeating-linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 1px, transparent 1px, transparent 3px);
    pointer-events: none; z-index: 20;
    box-shadow: inset 0 0 80px rgba(0,0,0,0.8);
}

/* 电视右侧控制面板 */
.tv-control-panel {
    width: 100px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-left: 2px solid rgba(0,0,0,0.2); /* 分割线 */
    padding-left: 10px;
    flex-shrink: 0;
}

/* 巨大的镀铬旋钮 */
.knob {
    width: 70px; height: 70px;
    background: radial-gradient(circle, #e0e0e0 0%, #999 40%, #444 100%); /* 金属质感 */
    border-radius: 50%;
    margin: 15px 0;
    border: 3px solid #333;
    box-shadow: 0 5px 10px rgba(0,0,0,0.4);
    position: relative;
    cursor: pointer;
    transition: transform 0.3s;
}
.knob::after { content: ""; position: absolute; top: 8px; left: 50%; width: 6px; height: 25px; background: #333; transform: translateX(-50%); border-radius: 3px;}
.knob.channel { transform: rotate(45deg); }
.knob.channel:hover { transform: rotate(90deg); }
.knob.volume { width: 50px; height: 50px; transform: rotate(-20deg); }

/* 复古扬声器 */
.speaker-grille {
    width: 100%;
    height: 120px;
    background-color: #222;
    /* 横条纹格栅 */
    background-image: repeating-linear-gradient(0deg, #333, #333 4px, #111 4px, #111 8px);
    margin-top: 20px;
    border-radius: 4px;
    box-shadow: inset 0 0 10px #000;
    border: 1px solid #444;
}

/* --- B. 录像带收纳箱 (VHS Crate) --- */
.vhs-crate {
    background: #8e6e54; /* 浅木色 */
    padding: 10px 10px 0 10px;
    border: 4px solid #5d4037;
    border-bottom: 15px solid #5d4037;
    box-shadow: 5px 10px 20px rgba(0,0,0,0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: perspective(800px) rotateY(-5deg) translateX(-10px); /* 稍微侧一点，靠着电视 */
    z-index: 4;
}

.vhs-tape {
    width: 220px;
    height: 45px;
    background: #1a1a1a;
    border-bottom: 1px solid #333;
    margin-bottom: -1px; /* 紧挨着 */
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 0 5px #000;
}

/* 录像带脊背标签 */
.vhs-spine {
    width: 200px;
    height: 32px;
    background: #f0f0f0;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.2em;
    letter-spacing: 1px;
    color: #111;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
    /* 纸张纹理 */
    background-image: linear-gradient(rgba(0,0,0,0.05), transparent);
}

/* 不同颜色的脊背 */
.vhs-tape:nth-child(1) .vhs-spine { border-left: 15px solid #c0392b; }
.vhs-tape:nth-child(2) .vhs-spine { border-left: 15px solid #2980b9; }
.vhs-tape:nth-child(3) .vhs-spine { border-left: 15px solid #27ae60; background: #ffecb3; }
.vhs-tape:nth-child(4) .vhs-spine { border-left: 15px solid #8e44ad; }

/* --- C. 超市小票 (独立放置) --- */
.receipt-paper {
    width: 240px;
    background: #fff;
    padding: 20px 15px;
    font-family: 'VT323', monospace;
    font-size: 1em;
    color: #333;
    box-shadow: 5px 10px 20px rgba(0,0,0,0.2);
    transform: rotate(3deg) translateY(20px);
    z-index: 6;
    border-top: 1px solid #eee;
    align-self: flex-end;
    margin-bottom: 40px;
    position: relative;
}
/* 贴纸胶带 */
.receipt-paper::before {
    content: ""; position: absolute; top: -10px; left: 50%; transform: translateX(-50%); width: 60px; height: 20px; background: rgba(255,255,255,0.5); border: 1px solid #ddd;
}

.receipt-header { text-align: center; border-bottom: 1px dashed #333; padding-bottom: 5px; margin-bottom: 5px; font-weight: bold; }
.receipt-item { display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 3px; }
.receipt-end { text-align: center; margin-top: 10px; font-size: 0.8em; font-weight: bold; }

/* 移动端适配 */
@media (max-width: 900px) {
    .vintage-scene-container { flex-direction: column; align-items: center; gap: 40px; }
    .tv-vhs-group { flex-direction: column; align-items: center; }
    .tv-unit { width: 100%; flex-direction: column; }
    .tv-screen-bezel { width: 100%; max-width: 360px; height: 270px; } /* 保持 4:3 比例 */
    .tv-control-panel { flex-direction: row; height: auto; margin-left: 0; margin-top: 20px; width: 100%; border-left: none; border-top: 2px solid rgba(0,0,0,0.2); }
    .knob { width: 50px; height: 50px; margin: 0 10px; }
    .speaker-grille { height: 50px; margin-top: 0; flex: 1; margin-left: 10px; }
    .vhs-crate { transform: none; margin-top: 30px; width: 280px; }
    .receipt-paper { transform: rotate(-2deg); margin-bottom: 0; }
}
</style>

<div class="lana-wrapper">

    <div class="dust-particle" style="top: 20%; left: 30%; animation-duration: 10s;"></div>
    <div class="dust-particle" style="top: 60%; left: 80%; animation-duration: 15s; animation-delay: 2s;"></div>
    <div class="dust-particle" style="top: 40%; left: 10%; animation-duration: 12s; animation-delay: 5s;"></div>

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

        <div class="tv-vhs-group">
            <div class="tv-unit">
                
                <div class="tv-screen-bezel">
                    <div class="tv-screen-overlay"></div>
                    <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DN_UxT6Ea_o/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>
                    <script async src="//www.instagram.com/embed.js"></script>
                </div>
                
                <div class="tv-control-panel">
                    <div class="knob channel"></div>
                    <div class="knob volume"></div>
                    <div class="speaker-grille"></div>
                </div>
            </div>

            <div class="vhs-crate">
                <div class="vhs-tape">
                    <div class="vhs-spine">
                        <span>BORN TO DIE</span>
                        <small>'12</small>
                    </div>
                </div>
                <div class="vhs-tape">
                    <div class="vhs-spine">
                        <span>ULTRAVIOLENCE</span>
                        <small>'14</small>
                    </div>
                </div>
                <div class="vhs-tape">
                    <div class="vhs-spine">
                        <span>HONEYMOON</span>
                        <small>'15</small>
                    </div>
                </div>
                <div class="vhs-tape">
                    <div class="vhs-spine">
                        <span>LUST FOR LIFE</span>
                        <small>'17</small>
                    </div>
                </div>
            </div>
        </div>

        <div class="receipt-paper">
            <div class="receipt-header">LANA'S PLAYLIST</div>
            <div class="receipt-item"><span>01. BORN TO DIE</span></div>
            <div class="receipt-item"><span>02. BLUE JEANS</span></div>
            <div class="receipt-item"><span>03. VIDEO GAMES</span></div>
            <div class="receipt-end">TOTAL MOOD: SAD</div>
        </div>

    </div>
    
    <div style="text-align:center; margin-top:80px; font-size:0.8em; letter-spacing:3px; opacity:0.6;">
        EST. 2025 • LOS ANGELES
    </div>

</div>
