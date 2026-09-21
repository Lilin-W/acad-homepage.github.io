import * as T from './vendor/three.module.js';
import { RoomEnvironment } from './vendor/RoomEnvironment.js';
import { buildGalleryRoom } from './gallery-bay-architecture.js';
import { buildHomeFurniture } from './gallery-bay-furniture.js';
import { GALLERY_SLOTS, fitArtwork } from './gallery-bay-layout.js';
import { fitOverviewDistance } from './gallery-bay-camera.js';
import { addRoomContactShadows } from './gallery-soft-shadows.js';

const stage = document.getElementById('gallery-room-stage');
const section = document.getElementById('xiaoman-gallery');
const status = document.getElementById('gallery-room-status');
const title = document.getElementById('gallery-room-art-title');
const description = document.getElementById('gallery-room-art-description');
const count = document.getElementById('gallery-room-count');
const choices = document.getElementById('gallery-room-choices');
const resetButton = document.getElementById('gallery-room-reset');
const viewButtons = Array.from(section.querySelectorAll('[data-gallery-view]'));
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const pad = n => String(n).padStart(2, '0');
const views = {
  overview: { title: 'Home is wherever she is', help: 'Sunlight through the bay window, little paintings on the walls, and her favourite place to dream.', range: 'at home' },
  keepsake: { title: 'A little cat, made with love', help: 'Cream stoneware, pink cheeks, and a tiny curled tail.', range: 'little keepsake' },
  sunny: { title: 'Her favourite sunny spot', help: 'Curled up on her scratcher, with nothing to do but dream.', range: 'slow days' },
  play: { title: 'A little kingdom of her own', help: 'Soft little beds, wooden steps, and a cosy place to hide.', range: 'play & rest' },
  main: { title: 'Afternoons by the window', help: 'A soft striped seat, a few favourite cushions, and a garden full of light.', range: 'window seat' },
  left: { title: 'Little paintings, collected with love', help: 'Five little portraits beside the dining table.', range: 'left wall' },
  right: { title: 'Every corner holds a little memory', help: 'Five more paintings beside her favourite things.', range: 'right wall' }
};

async function startRoom() {
  let renderer;
  try { renderer = new T.WebGLRenderer({ antialias: true, powerPreference: 'low-power' }); }
  catch { status.textContent = 'The room needs WebGL. Please enable hardware acceleration.'; return; }
  renderer.setPixelRatio(Math.min(Math.max(devicePixelRatio, 1.5), 2));
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  const canvas = renderer.domElement;
  canvas.setAttribute('role', 'img');
  stage.prepend(canvas);
  const scene = new T.Scene(); scene.background = new T.Color('#eee5d9');
  const pmrem = new T.PMREMGenerator(renderer), environment = new RoomEnvironment();
  scene.environment = pmrem.fromScene(environment, .03).texture;
  scene.environmentIntensity = .38; environment.dispose(); pmrem.dispose();
  const room = buildGalleryRoom(T, scene);
  const home = buildHomeFurniture(T, scene);
  addRoomContactShadows(T, scene, room, home);
  room.ceramicCat.userData.homeView = 'keepsake';
  home.cat.userData.homeView = 'sunny';
  home.tree.userData.homeView = 'play';
  scene.add(new T.HemisphereLight('#fff5e8', '#c9ac85', 1.05));
  const sun = new T.DirectionalLight('#ffe5b7', 3.5);
  sun.position.set(5, 6.8, -8); sun.target.position.set(-2, 0, 3);
  sun.castShadow = true; sun.shadow.mapSize.set(4096, 4096);
  Object.assign(sun.shadow.camera, { left: -10, right: 10, top: 10, bottom: -7, near: .2, far: 30 });
  sun.shadow.bias = -.00008; sun.shadow.normalBias = .002; sun.shadow.radius = 3;
  scene.add(sun, sun.target);
  const fill = new T.DirectionalLight('#fff0d9', .64); fill.position.set(-2, 5, 8); scene.add(fill);
  // Gentle local pools of light keep the linen lamps warm in daylight.
  for (const table of [room.lampTable, room.rightLampTable]) {
    const glow = new T.PointLight('#ffcf91', 1.1, 3.0, 2);
    glow.position.set(0, 1.40, 0); table.add(glow);
  }
  const pendantGlow=new T.PointLight('#ffe1ad',2.0,7,2);
  pendantGlow.position.fromArray(room.pendant.userData.lightPosition);room.pendant.add(pendantGlow);
  const camera = new T.PerspectiveCamera(64, 1, .1, 90);
  const destination = new T.Vector3(), desiredTarget = new T.Vector3();
  const destinationQuaternion = new T.Quaternion();
  const orientation = new T.Matrix4();
  const up = new T.Vector3(0, 1, 0);
  let aspect = 1.5, activeView = 'overview', selected = -1;
  let yaw = 0, elevation = .28, dirty = true, visible = true, frame = 0, lastTime = 0, pointer = null;
  let settled = false, ready = false, actualCount = 0;
  const exhibits = [], hitMeshes = [], buttons = [];
  const loader = new T.TextureLoader(), raycaster = new T.Raycaster(), pointerNdc = new T.Vector2();

  function requestRender() { dirty = true; if (!frame) frame = requestAnimationFrame(render); }
  function orientDestination() {
    orientation.lookAt(destination, desiredTarget, up);
    destinationQuaternion.setFromRotationMatrix(orientation);
  }
  function overviewPose() {
    // Fit all ten complete frame envelopes before adding the gentle look-around motion.
    const distance = fitOverviewDistance(T, GALLERY_SLOTS, aspect, camera.fov);
    destination.set(Math.sin(yaw) * .7, 2.8 + (elevation - .28) * 1.4, distance);
    desiredTarget.set(Math.sin(yaw) * 6.2, 2.8 + (elevation - .28) * 6, -3);
    orientDestination();
  }
  function wallPose(wall) {
    const tan = Math.tan(T.MathUtils.degToRad(camera.fov) / 2);
    if (wall === 'main') {
      const d = Math.max(6.4 / (2 * tan * aspect), 5.25 / (2 * tan));
      desiredTarget.set(0, 2.8, -4.15); destination.set(.08, 2.7, -4.15 + d);
    } else {
      const sign = wall === 'left' ? -1 : 1;
      const d = Math.min(7.1, Math.max(7.3 / (2 * tan * aspect), 4.8 / (2 * tan)));
      desiredTarget.set(sign * 3.90, 3.1, .05);
      destination.set(sign * (3.90 - d), 3.1, .05);
    }
    orientDestination();
  }
  function artPose(exhibit) {
    const tan = Math.tan(T.MathUtils.degToRad(camera.fov) / 2);
    const distance = Math.max((exhibit.width + .55) / (2 * tan * aspect), (exhibit.height + .75) / (2 * tan));
    desiredTarget.copy(exhibit.anchor);
    destination.copy(exhibit.anchor).addScaledVector(exhibit.normal, Math.min(distance, 10.5));
    orientDestination();
  }
  function homePose(view) {
    const tan = Math.tan(T.MathUtils.degToRad(camera.fov) / 2);
    const isCat = view === 'sunny', isKeepsake = view === 'keepsake';
    const subject = isKeepsake ? room.ceramicCat : isCat ? home.cat : home.tree;
    const bounds = new T.Box3().setFromObject(subject);
    if (isKeepsake) bounds.getCenter(desiredTarget);
    else desiredTarget.copy(isCat ? home.catFocus : home.treeFocus);
    const direction = (isKeepsake ? new T.Vector3(.12, .20, 1) : isCat ? new T.Vector3(-.2, .40, 1) : new T.Vector3(-.9, .18, .38)).normalize();
    const right = new T.Vector3().crossVectors(up, direction).normalize();
    const modelUp = new T.Vector3().crossVectors(direction, right).normalize();
    let distance = isKeepsake ? .78 : 1;
    for (const x of [bounds.min.x, bounds.max.x]) for (const y of [bounds.min.y, bounds.max.y]) for (const z of [bounds.min.z, bounds.max.z]) {
      const offset = new T.Vector3(x,y,z).sub(desiredTarget), depth = offset.dot(direction);
      distance = Math.max(distance, depth + Math.abs(offset.dot(right)) / (tan * aspect * .84),
        depth + Math.abs(offset.dot(modelUp)) / (tan * .84));
    }
    destination.copy(desiredTarget).addScaledVector(direction, distance);
    orientDestination();
  }
  function viewPose() {
    if (activeView === 'overview') overviewPose();
    else if (activeView === 'sunny' || activeView === 'play' || activeView === 'keepsake') homePose(activeView);
    else wallPose(activeView);
  }
  function updateUI() {
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === selected)));
    viewButtons.forEach(button => button.setAttribute('aria-pressed', String(selected < 0 && button.dataset.galleryView === activeView)));
    if (selected >= 0) {
      const exhibit = exhibits[selected];
      title.textContent = exhibit.title;
      description.textContent = exhibit.description;
      count.textContent = `${pad(selected + 1)} / 10`;
      canvas.setAttribute('aria-label', `${exhibit.title}. ${exhibit.alt}`);
    } else {
      const view = views[activeView];
      title.textContent = view.title; description.textContent = view.help;
      count.textContent = view.range || '10 spaces';
      canvas.setAttribute('aria-label', `${view.title}. A cosy three-dimensional home with sleeping Xiaoman on a curved scratcher, a wooden cat tree, a dining table, soft armchair, high plaster ceiling, and leafy trees beyond a deep bay window. ${actualCount} commissioned artworks and ${10 - actualCount} reserved painting spaces on the walls.`);
    }
    resetButton.disabled = selected < 0 && activeView === 'overview' && Math.abs(yaw) < .01 && Math.abs(elevation - .28) < .01;
  }
  function revealRoom() {
    const bounds = stage.getBoundingClientRect();
    if (bounds.top < -24 || bounds.top > innerHeight * .6) {
      stage.scrollIntoView({ block: 'center', behavior: reduced ? 'instant' : 'smooth' });
    }
  }
  function showView(view) {
    selected = -1; activeView = view; yaw = 0; elevation = .28;
    viewPose();
    updateUI(); requestRender(); revealRoom();
  }
  function focusArtwork(index) {
    if (!ready) return;
    selected = (index + 10) % 10;
    activeView = exhibits[selected].wall;
    artPose(exhibits[selected]); updateUI(); requestRender(); revealRoom();
  }
  viewButtons.forEach(button => button.addEventListener('click', () => showView(button.dataset.galleryView)));
  resetButton.addEventListener('click', () => showView('overview'));
  document.getElementById('gallery-room-prev').addEventListener('click', () => focusArtwork(selected < 0 ? 9 : selected - 1));
  document.getElementById('gallery-room-next').addEventListener('click', () => focusArtwork(selected + 1));
  section.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'Escape') showView('overview');
    if (event.key === 'ArrowLeft') { event.preventDefault(); focusArtwork(selected < 0 ? 9 : selected - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); focusArtwork(selected + 1); }
  });
  function render(time) {
    frame = 0;
    if (!visible || document.hidden) { lastTime = 0; return; }
    const moving = camera.position.distanceToSquared(destination) > .000001 || camera.quaternion.angleTo(destinationQuaternion) > .0001;
    if (!dirty && !moving) { lastTime = 0; return; }
    const delta = lastTime ? Math.min((time - lastTime) / 1000, .05) : 1 / 60;
    const step = reduced || !settled ? 1 : 1 - Math.exp(-5.5 * delta);
    camera.position.lerp(destination, step);
    // Quaternion interpolation avoids a 180-degree flip when crossing between side walls.
    camera.quaternion.slerp(destinationQuaternion, step);
    renderer.render(scene, camera); dirty = false; settled = true; lastTime = time;
    if (moving) frame = requestAnimationFrame(render);
  }
  new ResizeObserver(() => {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    aspect = w / h; camera.aspect = aspect; camera.fov = T.MathUtils.clamp(64 + (.92 - aspect) * 24, 58, 70); camera.updateProjectionMatrix(); renderer.setSize(w, h, false);
    if (selected >= 0) artPose(exhibits[selected]); else viewPose();
    requestRender();
  }).observe(stage);
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) requestRender(); }, { rootMargin: '80px' }).observe(stage);
  document.addEventListener('visibilitychange', requestRender);
  function pick(event) {
    const rect = canvas.getBoundingClientRect();
    pointerNdc.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
    raycaster.setFromCamera(pointerNdc, camera);
    const hit = raycaster.intersectObjects(scene.children, true)[0];
    if (!hit) return null;
    if (hit.object.userData.index !== undefined) return { index: hit.object.userData.index };
    for (let object = hit.object; object; object = object.parent) {
      if (object.userData.homeView) return { view: object.userData.homeView };
    }
    return null;
  }
  canvas.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, lastX: event.clientX, lastY: event.clientY, moved: false };
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove', event => {
    if (!pointer || pointer.id !== event.pointerId) return;
    if (event.pointerType !== 'touch' && event.buttons === 0) {
      pointer = null;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      return;
    }
    const dx = event.clientX - pointer.x, dy = event.clientY - pointer.y;
    if (event.pointerType === 'touch' && !pointer.moved && Math.abs(dy) > 7 && Math.abs(dy) > Math.abs(dx)) {
      pointer = null;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      return;
    }
    if (Math.hypot(dx, dy) > 7) pointer.moved = true;
    if (pointer.moved) {
      selected = -1; activeView = 'overview';
      yaw = T.MathUtils.clamp(yaw - (event.clientX - pointer.lastX) * .0025, -.32, .32);
      if (event.pointerType !== 'touch') elevation = T.MathUtils.clamp(elevation + (event.clientY - pointer.lastY) * .0015, .19, .40);
      overviewPose(); updateUI(); requestRender();
    }
    pointer.lastX = event.clientX; pointer.lastY = event.clientY;
  });
  canvas.addEventListener('pointerup', event => {
    if (!pointer || pointer.id !== event.pointerId) return;
    if (!pointer.moved) {
      const hit = pick(event);
      if (hit?.view) showView(hit.view);
      else if (hit?.index !== undefined) focusArtwork(hit.index);
    }
    pointer = null; if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointercancel', () => { pointer = null; });
  canvas.addEventListener('lostpointercapture', () => { pointer = null; });

  function canvasTexture(w, h, draw) {
    const image = document.createElement('canvas'); image.width = w; image.height = h;
    draw(image.getContext('2d'), w, h);
    const texture = new T.CanvasTexture(image); texture.colorSpace = T.SRGBColorSpace;
    texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8); return texture;
  }
  function reservedTexture(index, ratio) {
    return canvasTexture(Math.round(768 * ratio), 768, (ctx, w, h) => {
      ctx.fillStyle = index % 2 ? '#f2e7dd' : '#efe6de'; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#cfbbab'; ctx.lineWidth = 1.5; ctx.strokeRect(26, 26, w - 52, h - 52);
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = '#b79b88'; ctx.font = '500 76px Quicksand, sans-serif'; ctx.fillText(pad(index + 1), w / 2, h * .43);
      ctx.strokeStyle = '#cbb4a1'; ctx.beginPath(); ctx.moveTo(w / 2 - 23, h * .55); ctx.lineTo(w / 2 + 23, h * .55); ctx.stroke();
      ctx.fillStyle = '#aa9180'; ctx.font = '500 21px Quicksand, sans-serif'; ctx.fillText('a little memory to come', w / 2, h * .64, w - 65);
    });
  }
  const cream = new T.MeshStandardMaterial({ color: '#fffaf0', roughness: .85 });
  const gold = new T.MeshStandardMaterial({ color: '#bfa078', roughness: .46, metalness: .42 });
  const frameInner = new T.MeshStandardMaterial({color:'#dbc69f',roughness:.56,metalness:.15});
  function block(group, w, h, d, x, y, z, material) {
    const mesh = new T.Mesh(new T.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z); mesh.castShadow = mesh.receiveShadow = true; group.add(mesh); return mesh;
  }
  let loaded = [], loadFailed = false;
  try {
    const response = await fetch('/assets/xiaoman-lamp/gallery.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error('Gallery data unavailable');
    const data = await response.json();
    if (!Array.isArray(data.artworks)) throw new Error('Invalid gallery data');
    const results = await Promise.allSettled(data.artworks.slice(0, 10).map(async item => ({ ...item, texture: await loader.loadAsync(item.src) })));
    loaded = results.map(result => result.status === 'fulfilled' ? result.value : null);
    loadFailed = results.some(result => result.status === 'rejected');
  } catch (error) { loadFailed = true; console.warn('Gallery artworks:', error); }
  GALLERY_SLOTS.forEach((slot, index) => {
    const artwork = loaded[index];
    const reserved = !artwork;
    if (artwork) actualCount++;
    const texture = artwork?.texture || reservedTexture(index, slot.ratio);
    texture.colorSpace = T.SRGBColorSpace; texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
    const { width, height } = fitArtwork(slot, texture.image.width / texture.image.height);
    const exhibit = {
      ...slot, width, height, reserved,
      title: artwork?.title || `Space ${pad(index + 1)}`,
      description: artwork?.description || 'Reserved for one of Xiaoman’s framed paintings. This is a layout placeholder.',
      alt: artwork?.alt || `Reserved painting space ${pad(index + 1)}, marked A little memory to come.`,
    };
    const group = new T.Group(); group.position.fromArray(slot.position); group.rotation.y = slot.yaw; scene.add(group);
    exhibit.anchor = group.position.clone().add(new T.Vector3(0, 0, .08).applyQuaternion(group.quaternion));
    exhibit.normal = new T.Vector3(0, 0, 1).applyQuaternion(group.quaternion);
    exhibits.push(exhibit);
    const border = artwork?.framed ? 0 : .075;
    block(group, width + border * 2, height + border * 2, .055, 0, 0, 0, cream);
    if (!artwork?.framed) {
      const frameRing=(w,h,rail,depth,z,material)=>{
        const shape=new T.Shape();shape.moveTo(-w/2,-h/2);shape.lineTo(w/2,-h/2);shape.lineTo(w/2,h/2);shape.lineTo(-w/2,h/2);shape.closePath();
        const hole=new T.Path();hole.moveTo(-w/2+rail,-h/2+rail);hole.lineTo(-w/2+rail,h/2-rail);hole.lineTo(w/2-rail,h/2-rail);hole.lineTo(w/2-rail,-h/2+rail);hole.closePath();shape.holes.push(hole);
        const geo=new T.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelThickness:.004,bevelSize:.004,bevelSegments:2,curveSegments:1});
        const frame=new T.Mesh(geo,material);frame.position.z=z;frame.castShadow=frame.receiveShadow=true;group.add(frame);
      };
      frameRing(width+border*2+.025,height+border*2+.025,.030,.031,.027,gold);
      frameRing(width+.012,height+.012,.009,.004,.029,frameInner);
    }
    const frameShadow=canvasTexture(192,192,(ctx,w,h)=>{
      ctx.shadowColor='rgba(61,43,25,.40)';ctx.shadowBlur=10;ctx.shadowOffsetX=3;ctx.shadowOffsetY=6;
      ctx.fillStyle='rgba(61,43,25,.22)';ctx.fillRect(15,15,w-30,h-30);
    });
    const shadow=new T.Mesh(new T.PlaneGeometry(width+.31,height+.31),new T.MeshBasicMaterial({map:frameShadow,transparent:true,depthWrite:false,toneMapped:false,opacity:.30}));
    shadow.position.set(.006,-.012,-.094);shadow.raycast=()=>{};group.add(shadow);
    // Match the untone-mapped artwork with a warm ivory paper backing.
    // Keeping it separate preserves the original transparent illustration files.
    if (artwork?.background) {
      const paper = new T.Mesh(new T.PlaneGeometry(width, height), new T.MeshBasicMaterial({ color: artwork.background, toneMapped: false }));
      paper.position.z = .030;
      paper.raycast = () => {};
      group.add(paper);
    }
    const artMesh = new T.Mesh(new T.PlaneGeometry(width, height), new T.MeshBasicMaterial({ map: texture, transparent: true, toneMapped: false }));
    artMesh.position.z = .031; artMesh.userData.index = index; group.add(artMesh); hitMeshes.push(artMesh);
    const button = document.createElement('button'); button.type = 'button'; button.textContent = pad(index + 1);
    button.title = exhibit.title; button.setAttribute('aria-label', `${pad(index + 1)} ${reserved ? 'Reserved space' : exhibit.title}`);
    button.className = reserved ? 'is-reserved' : 'has-artwork'; button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => focusArtwork(index)); buttons.push(button);
  });
  choices.replaceChildren(...buttons);
  document.getElementById('gallery-room-plan-note').textContent = `${pad(actualCount)} artworks · ${pad(10 - actualCount)} reserved spaces`;
  renderer.shadowMap.needsUpdate = true; ready = true; updateUI(); status.hidden = true;
  if (loadFailed) {
    status.hidden = false; status.textContent = 'Some paintings could not load. Their places are marked so you can still explore the room.';
  }
  viewPose();
  requestRender();
}

if (stage) {
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    startRoom().catch(error => { status.textContent = 'The gallery room could not open. Please refresh to try again.'; console.warn(error); });
  }, { rootMargin: '250px' });
  observer.observe(stage);
}
