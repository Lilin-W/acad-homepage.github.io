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
  max-width: 1400px;
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
  gap: 3%;
  flex-wrap: nowrap;
  margin: 2em auto;
  max-width: 100%;
  padding: 0 40px;
}
.polaroid {
  background: white;
  padding: 20px 20px 40px 20px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  transform: rotate(0deg);
  transition: all 0.3s ease;
  flex: 1 1 0;
  max-width: 400px;
  min-width: 0;
  cursor: pointer;
}
.polaroid img {
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: contain;
  border: 1px solid #eee;
}
/* 给照片一点随机的角度，看起来更活泼 */
.polaroid:nth-child(1) { transform: rotate(-3deg); }
.polaroid:nth-child(2) { transform: rotate(2deg); margin-top: -10px; }
.polaroid:nth-child(3) { transform: rotate(-2deg); }

.polaroid:hover {
  transform: scale(1.05) rotate(0deg) !important;
  z-index: 10;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

/* 响应式：平板 */
@media (max-width: 1024px) {
  .portrait-gallery { 
    gap: 2%;
    padding: 0 20px;
  }
  .polaroid { 
    flex: 1 1 0;
    max-width: 350px;
    padding: 15px 15px 30px 15px;
  }
}

/* 响应式：手机 */
@media (max-width: 768px) {
  .cat-container { max-width: 100%; }
  .portrait-gallery { 
    gap: 1.5%;
    padding: 0 15px;
  }
  .polaroid { 
    flex: 1 1 0;
    padding: 10px 10px 25px 10px;
    max-width: none;
  }
  .polaroid:nth-child(2) { margin-top: 0; }
}

/* 灯箱效果 */
.lightbox {
  display: none;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
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
}
.lightbox-close {
  position: absolute;
  top: 20px;
  right: 40px;
  color: #fff;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
}
@keyframes zoomIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
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

/* --- 底部照片墙 --- */
.moments-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 20px;
  max-width: 100%;
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
  aspect-ratio: 1 / 1;
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

/* 响应式：照片墙 */
@media (max-width: 768px) {
  .moments-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}
@media (max-width: 480px) {
  .moments-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}

/* --- 动画 --- */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

</style>

<div class="cat-container">

  <div class="portrait-gallery">
    <div class="polaroid" onclick="openLightbox('/images/xiaoman-portrait-1.png')">
      <img src="/images/xiaoman-portrait-1.png" alt="Xiaoman 1">
    </div>
    <div class="polaroid" onclick="openLightbox('/images/xiaoman-portrait-2.png')">
      <img src="/images/xiaoman-portrait-2.png" alt="Xiaoman 2">
    </div>
    <div class="polaroid" onclick="openLightbox('/images/xiaoman-portrait-3.png')">
      <img src="/images/xiaoman-portrait-3.png" alt="Xiaoman 3">
    </div>
  </div>

  <!-- Lightbox -->
  <div class="lightbox" id="lightbox" onclick="closeLightbox()">
    <span class="lightbox-close">&times;</span>
    <img id="lightbox-img" src="" alt="Enlarged view">
  </div>

  <script>
    function openLightbox(imgSrc) {
      document.getElementById('lightbox').classList.add('active');
      document.getElementById('lightbox-img').src = imgSrc;
      document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
      document.getElementById('lightbox').classList.remove('active');
      document.body.style.overflow = 'auto';
    }
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeLightbox();
    });
  </script>

  <div class="cat-header" style="margin-top: 40px;">
    <h1 class="main-title">Xiaoman Xia (夏小满)</h1>
    <p class="sub-title">✨ The One Who Keeps My World Gentle ✨</p>
  </div>

  <div class="cat-card">
    <h2>🐱 About Xiaoman</h2>
    <p>Xiaoman Xia is not just a cat — she's the <strong>Chief Keyboard Supervisor</strong> and <strong>Chief Emotional Support Officer</strong> of my workspace.</p>
    
    <p>Her daily responsibilities include:</p>
    <ul>
      <li>🐾 Sitting on keyboards at critical moments</li>
      <li>💻 Supervising every Git commit</li>
      <li>😴 Napping on research papers</li>
      <li>🎯 Ensuring work-life balance is maintained</li>
      <li>❤️ Providing unconditional emotional support</li>
    </ul>
  </div>

  <div class="cat-card" style="background: #fff0f5; border-color: #ffc0cb;">
    <h2>🌿 The Story of Her Name</h2>
    <p>Her last name <strong>'Xia' (夏)</strong> comes from the day we first met - it was <strong>Lixia (立夏)</strong>, the Start of Summer in the traditional Chinese calendar.</p>
    <p>A few days later, when she came home, it happened to be <strong>Xiaoman (小满)</strong> — a solar term meaning <strong>'just full enough'</strong>.</p>
    <hr style="border-top: 1px dashed #d87093; opacity: 0.3;">
    <p style="font-size: 1.1em; text-align: center; margin-top: 15px;">
      <em>There's an old saying, "Xiaoman sheng wanquan" (小满胜万全)<br>
      Sometimes the happiest moments come from things that are simply, perfectly enough.</em>
    </p>
  </div>

  <hr style="border: 0; border-top: 1px solid #e8e8e8; margin: 2em 0;">

  <h2>📸 Little Moments with Xiaoman</h2>

  <div style="overflow-x: auto; padding: 20px 0; margin: 2em 0;">
    <div style="display: flex; gap: 20px; padding: 10px; min-width: min-content;">
      
      <!-- Photo 1 -->
      <div style="flex: 0 0 250px; text-align: center;">
        <img src="/images/avatar_xiaoman.jpg" style="width: 100%; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
        <p class="photo-caption" style="margin-top: 10px; color: #555; font-size: 0.9em; font-style: italic;">The official portrait 📷</p>
      </div>

      <!-- Photo 2 -->
      <div style="flex: 0 0 250px; text-align: center;">
        <img src="/images/keyboard.jpg" style="width: 100%; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
        <p class="photo-caption" style="margin-top: 10px; color: #555; font-size: 0.9em; font-style: italic;">Chief Keyboard Guardian ⌨️ Sometimes she rests her head on my hands to stop me from working</p>
      </div>

      <!-- Photo 3 -->
      <div style="flex: 0 0 250px; text-align: center;">
        <img src="/images/wink.jpg" style="width: 100%; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
        <p class="photo-caption" style="margin-top: 10px; color: #555; font-size: 0.9em; font-style: italic;">Happy wink moments 😉</p>
      </div>

      <!-- Photo 4 -->
      <div style="flex: 0 0 250px; text-align: center;">
        <img src="/images/xiaoman.jpg" style="width: 100%; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
        <p class="photo-caption" style="margin-top: 10px; color: #555; font-size: 0.9em; font-style: italic;">That stubborn look 😼<br>When she knows exactly what she wants</p>
      </div>

      <!-- Photo 5 -->
      <div style="flex: 0 0 250px; text-align: center;">
        <img src="/images/cute.jpg" style="width: 100%; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
        <p class="photo-caption" style="margin-top: 10px; color: #555; font-size: 0.9em; font-style: italic;">Hunter mode activated 🎯</p>
      </div>

      <!-- Photo 6 -->
      <div style="flex: 0 0 250px; text-align: center;">
        <img src="/images/jump.jpg" style="width: 100%; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
        <p class="photo-caption" style="margin-top: 10px; color: #555; font-size: 0.9em; font-style: italic;">360° mid-air rotation in action! 🤸‍♀️<br>Yes, she can actually do backflips!</p>
      </div>

    </div>
  </div>

  <style>
  div[style*="overflow-x: auto"]::-webkit-scrollbar {
    height: 8px;
  }
  div[style*="overflow-x: auto"]::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  div[style*="overflow-x: auto"]::-webkit-scrollbar-thumb {
    background: #ffc0cb;
    border-radius: 10px;
  }
  div[style*="overflow-x: auto"]::-webkit-scrollbar-thumb:hover {
    background: #ffb6c1;
  }
  </style>

  <hr style="border: 0; border-top: 1px solid #e8e8e8; margin: 2em 0;">

  <div style="text-align: center; margin-top: 40px; margin-bottom: 40px;">
    <p style="font-size: 0.95em; color: #8d6e63; font-family: 'Courier New', monospace; white-space: pre; line-height: 1.6;">
🐱  mew meooow mew mew
    meooow meooow meooow
    mew mew mew meooow
    mew

M.E.O.W. - Message Encoded, Obviously Whiskered.

--- Xiaoman Xia 🐾
    </p>
  </div>
