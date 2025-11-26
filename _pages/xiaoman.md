---
permalink: /xiaoman/
title: "Xiaoman Xia"
excerpt: "Meet my furry little boss"
author_profile: false
---

<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&family=Quicksand:wght@500;700&display=swap" rel="stylesheet">

<style>
/* --- 全局设置 --- */
body {
  background-color: #fffdf9 !important; /* 暖暖的米白色背景 */
  background-image: radial-gradient(#ffe4e1 1px, transparent 1px);
  background-size: 20px 20px; /* 细小的波点纹理 */
  font-family: 'Quicksand', 'Nunito', -apple-system, sans-serif !important;
  color: #5d4037 !important; /* 深棕色文字，比纯黑更柔和 */
}

/* 隐藏原有导航栏，给小猫一个沉浸式空间 */
.masthead { display: none !important; }

h1, h2, h3 {
  font-family: 'Quicksand', sans-serif !important;
  color: #d87093 !important; /* 甚至有点粉的标题色 */
}

a { color: #d87093; text-decoration: none; }
a:hover { color: #c71585; }

/* --- 容器与卡片 --- */
.cat-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.cat-card {
  background: white;
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 10px 25px rgba(216, 112, 147, 0.1);
  border: 2px solid #fff0f5;
}

/* --- 头部设计 --- */
.cat-header {
  text-align: center;
  margin-bottom: 40px;
  animation: fadeIn 1s ease-in;
}
.cat-avatar {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 6px solid white;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  object-fit: cover;
  transition: transform 0.3s;
}
.cat-avatar:hover {
  transform: rotate(-5deg) scale(1.05);
}

.main-title {
  font-size: 2.5em;
  margin: 15px 0 5px;
  font-weight: 800;
}
.sub-title {
  font-size: 1.1em;
  color: #8d6e63;
  font-style: italic;
}

/* --- 拍立得照片墙 (Portrait Gallery) --- */
.portrait-gallery {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin: 2em 0;
}
.polaroid {
  background: white;
  padding: 15px 15px 35px 15px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  transform: rotate(0deg);
  transition: all 0.3s ease;
  width: 300px;
}
.polaroid img {
  width: 100%;
  height: 300px;
  object-fit: contain;
  border: 1px solid #eee;
}
/* 给照片一点随机的角度，看起来更活泼 */
.polaroid:nth-child(1) { transform: rotate(-3deg); }
.polaroid:nth-child(2) { transform: rotate(2deg); margin-top: -10px; }
.polaroid:nth-child(3) { transform: rotate(-2deg); }

.polaroid:hover {
  transform: scale(1.05) rotate(0deg);
  z-index: 10;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

/* --- 列表与文字 --- */
.cute-list {
  list-style: none;
  padding-left: 0;
}
.cute-list li {
  margin-bottom: 12px;
  font-size: 1.05em;
  padding-left: 30px;
  position: relative;
}
.cute-list li::before {
  content: '🐾';
  position: absolute;
  left: 0;
  top: 2px;
}

/* --- 底部网格相册 --- */
.moments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
.moment-item {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}
.moment-item:hover {
  transform: translateY(-5px);
}
.moment-item img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
.caption-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  text-align: center;
  font-size: 0.9em;
  color: #555;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}
.moment-item:hover .caption-overlay {
  transform: translateY(0);
}

/* --- 动画 --- */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* --- 响应式调整 --- */
@media (max-width: 768px) {
  .polaroid { width: 100%; max-width: 280px; margin: 10px auto; transform: none !important; }
}
</style>

<div class="cat-container">

  <div class="portrait-gallery">
    <div class="polaroid">
      <img src="/images/xiaoman-portrait-1.png" alt="Xiaoman 1">
    </div>
    <div class="polaroid">
      <img src="/images/xiaoman-portrait-2.png" alt="Xiaoman 2">
    </div>
    <div class="polaroid">
      <img src="/images/xiaoman-portrait-3.png" alt="Xiaoman 3">
    </div>
  </div>

  <div class="cat-header" style="margin-top: 40px;">
    <h1 class="main-title">Xiaoman Xia (夏小满)</h1>
    <p class="sub-title">✨ The One Who Keeps My World Gentle ✨</p>
  </div>

  <div class="cat-card">
    <h2>🐱 About Xiaoman</h2>
    <p>Xiaoman Xia is not just a cat — she's the <strong>Chief Keyboard Supervisor</strong> and <strong>Chief Emotional Support Officer</strong> of my workspace.</p>
    
    <h3>Daily Responsibilities:</h3>
    <ul class="cute-list">
      <li>Sitting on keyboards at critical moments (Ctrl+Z won't save you)</li>
      <li>Supervising every Git commit (Code review via staring)</li>
      <li>Napping on research papers (Knowledge absorption via osmosis)</li>
      <li>Ensuring work-life balance is maintained</li>
      <li>Providing unconditional emotional support ❤️</li>
    </ul>
  </div>

  <div class="cat-card" style="background: #fff0f5; border-color: #ffc0cb;">
    <h2>🌿 The Story of Her Name</h2>
    <p>Her last name <strong>'Xia' (夏)</strong> comes from the day we first met - it was <strong>Lixia (立夏)</strong>, the Start of Summer.</p>
    <p>When she came home, it happened to be <strong>Xiaoman (小满)</strong> — a solar term meaning <strong>'just full enough'</strong>.</p>
    <hr style="border-top: 1px dashed #d87093; opacity: 0.3;">
    <p style="font-size: 1.1em; text-align: center; margin-top: 15px;">
      <em>"Xiaoman sheng wanquan" (小满胜万全)<br>
      Sometimes the happiest moments come from things that are simply, perfectly enough.</em>
    </p>
  </div>

  <h2 style="text-align: center; margin-top: 50px;">📸 Little Moments Gallery</h2>
  <div class="moments-grid">
    <div class="moment-item">
      <img src="/images/avatar_xiaoman.jpg" alt="Official Portrait">
      <div class="caption-overlay">The official portrait 📷</div>
    </div>
    <div class="moment-item">
      <img src="/images/keyboard.jpg" alt="Keyboard Guardian">
      <div class="caption-overlay">Chief Keyboard Guardian ⌨️</div>
    </div>
    <div class="moment-item">
      <img src="/images/wink.jpg" alt="Wink">
      <div class="caption-overlay">Happy wink moments 😉</div>
    </div>
    <div class="moment-item">
      <img src="/images/xiaoman.jpg" alt="Stubborn">
      <div class="caption-overlay">That stubborn look 😼</div>
    </div>
    <div class="moment-item">
      <img src="/images/cute.jpg" alt="Hunter Mode">
      <div class="caption-overlay">Hunter mode activated 🎯</div>
    </div>
    <div class="moment-item">
      <img src="/images/jump.jpg" alt="Jump">
      <div class="caption-overlay">360° mid-air rotation! 🤸‍♀️</div>
    </div>
  </div>

  <div style="text-align: center; margin-top: 60px; color: #8d6e63;">
    <p style="font-family: 'Courier New', monospace; font-size: 0.9em; opacity: 0.7;">
    🐱  mew meooow mew mew
        meooow meooow meooow
        mew mew mew meooow
        mew

    M.E.O.W. - Message Encoded, Obviously Whiskered.
    </p>
    <img src="/images/logo.png" style="width: 50px; opacity: 0.5; margin-top: 10px;">
    <p style="font-weight: bold; margin-top: 5px;">— Xiaoman Xia 🐾</p>
  </div>
