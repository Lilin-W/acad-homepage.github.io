import * as THREE from '../xiaoman-lamp/vendor/three.module.js';

// A small, fully modelled listening room. All of its surface textures are local
// album artwork or painted on canvas; the room makes no network requests.
export async function createRoom(container, { albums = [], onSelect, onToggle, onEject, onPortrait } = {}) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#e6d7bd');
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.className = 'listening-room-canvas';
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y;cursor:grab;';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  container.appendChild(renderer.domElement);

  const camera = new THREE.OrthographicCamera(-6, 6, 3.5, -3.5, .1, 80);
  const desktopTarget = new THREE.Vector3(.25, 2.69, -.3);
  const compactTarget = new THREE.Vector3(-.7, 2.70, -.3);
  let compactComposition = false;
  // A gentle side view keeps the cabinet's depth and opens up the foreground rug.
  // Share this pose with Reset so entry and return use the same composition.
  const defaultCameraAngles = { x: .075, y: .26 };
  const cameraAngles = { ...defaultCameraAngles, targetX: defaultCameraAngles.x, targetY: defaultCameraAngles.y };
  const materials = new Set();
  const textures = new Set();
  const geometries = new Set();
  const interactive = [];
  let selected = null;
  let playing = false;
  let night = false;
  let disposed = false;
  let visible = true;
  let dirty = true;
  let animationFrame = 0;
  let lastTime = 0;
  let movement = null;
  let dragged = false;
  let pointerStart = null;
  let desiredArm = 0;

  const canvasTexture = (w, h, draw) => {
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    draw(canvas.getContext('2d'), w, h);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
    textures.add(texture);
    return texture;
  };
  const material = (color, more = {}) => {
    const m = new THREE.MeshStandardMaterial({ color, roughness: .7, ...more });
    materials.add(m);
    return m;
  };
  const physical = options => {
    const m = new THREE.MeshPhysicalMaterial(options);
    materials.add(m);
    return m;
  };
  const mesh = (geometry, mat, parent = scene) => {
    geometries.add(geometry);
    const o = new THREE.Mesh(geometry, mat);
    o.castShadow = true; o.receiveShadow = true;
    parent.add(o);
    return o;
  };
  const box = (w, h, d, mat, x, y, z, parent = scene) => {
    const o = mesh(new THREE.BoxGeometry(w, h, d), mat, parent);
    o.position.set(x, y, z);
    return o;
  };
  const cylinder = (r1, r2, h, mat, x, y, z, parent = scene, segments = 64) => {
    const o = mesh(new THREE.CylinderGeometry(r1, r2, h, segments), mat, parent);
    o.position.set(x, y, z);
    return o;
  };
  const sphere = (r, mat, x, y, z, parent = scene) => {
    const o = mesh(new THREE.SphereGeometry(r, 20, 12), mat, parent);
    o.position.set(x, y, z);
    return o;
  };
  const tube = (points, radius, mat, parent = scene) => {
    const path = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
    return mesh(new THREE.TubeGeometry(path, 24, radius, 8, false), mat, parent);
  };
  const bind = (object, action, index) => {
    object.userData.action = action;
    object.userData.index = index;
    interactive.push(object);
  };
  let seed = 27;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const walnutTexture = canvasTexture(1024, 256, (ctx, w, h) => {
    ctx.fillStyle = '#66432c'; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 650; i++) {
      const y = random() * h;
      const light = random();
      ctx.strokeStyle = light > .45 ? `rgba(29,13,5,${random() * .15})` : `rgba(230,162,87,${random() * .13})`;
      ctx.lineWidth = random() * 2 + .35;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 12) {
        const yy = y + Math.sin(x * .011 + y * .06) * (3 + random() * 2) + Math.sin(x * .004 + y) * 3;
        if (!x) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }
  });
  const wallpaperTexture = canvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#e3d5bd'; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 12000; i++) {
      ctx.fillStyle = `rgba(117,99,66,${random() * .09})`;
      ctx.fillRect(random() * w, random() * h, 1, 1);
    }
    function leaf(x, y, angle, size) {
      ctx.save(); ctx.translate(x, y); ctx.rotate(angle);
      ctx.beginPath(); ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-size * .8, -size * .7, -size * .3, -size * 1.6, 0, -size * 2);
      ctx.bezierCurveTo(size * .6, -size * 1.25, size * .55, -size * .5, 0, 0);
      ctx.fillStyle = 'rgba(113,119,86,.21)'; ctx.fill();
      ctx.strokeStyle = 'rgba(110,107,72,.18)'; ctx.stroke(); ctx.restore();
    }
    for (let row = -1; row < 4; row++) for (let col = -1; col < 4; col++) {
      const x = col * 170 + (row % 2) * 85 + 38;
      const y = row * 170 + 65;
      ctx.strokeStyle = 'rgba(122,120,84,.19)'; ctx.lineWidth = 1.8;
      ctx.beginPath(); ctx.moveTo(x, y + 60);
      ctx.bezierCurveTo(x - 35, y + 17, x + 21, y - 8, x, y - 50); ctx.stroke();
      leaf(x - 6, y + 27, -1.1, 12); leaf(x + 1, y + 10, 1, 12);
      leaf(x + 3, y - 26, .95, 10); leaf(x - 4, y - 38, -.8, 9);
      for (let p = 0; p < 7; p++) {
        ctx.save(); ctx.translate(x, y - 10); ctx.rotate(p * Math.PI * 2 / 7);
        ctx.fillStyle = 'rgba(155,100,90,.19)'; ctx.beginPath();
        ctx.ellipse(0, -7, 6, 10, .2, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      }
      ctx.fillStyle = 'rgba(134,104,75,.28)'; ctx.beginPath(); ctx.arc(x, y - 10, 4, 0, Math.PI * 2); ctx.fill();
    }
  });
  wallpaperTexture.wrapS = wallpaperTexture.wrapT = THREE.RepeatWrapping;
  wallpaperTexture.repeat.set(5.7, 3.2);
  const floorTexture = canvasTexture(1024, 1024, (ctx, w, h) => {
    ctx.fillStyle = '#88644b'; ctx.fillRect(0, 0, w, h);
    for (let row = 0; row < 10; row++) {
      const yy = row * h / 10;
      ctx.fillStyle = `rgba(${random() > .5 ? '220,170,115' : '25,10,0'},${.06 + random() * .08})`;
      ctx.fillRect(0, yy, w, h / 10 - 2);
      ctx.strokeStyle = 'rgba(25,12,4,.24)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, yy); ctx.lineTo(w, yy); ctx.stroke();
      for (let j = 0; j < 80; j++) {
        ctx.strokeStyle = `rgba(40,18,3,${random() * .12})`; ctx.lineWidth = .6;
        const py = yy + random() * h / 10;
        ctx.beginPath(); ctx.moveTo(0, py); ctx.bezierCurveTo(w * .3, py + 8, w * .75, py - 5, w, py + 2); ctx.stroke();
      }
      for (let x = (row % 3) * 180; x < w; x += 520) {
        ctx.fillStyle = 'rgba(32,17,8,.25)'; ctx.fillRect(x, yy, 2, h / 10);
      }
    }
  });
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(1.5, 1.2);
  const cream = material('#e9dfc8', { roughness: .78 });
  const trim = material('#e7d8b9', { roughness: .65 });
  const walnut = material('#c8a888', { map: walnutTexture, roughness: .43 });
  const darkWood = material('#443020', { roughness: .5 });
  const brass = material('#c8a162', { roughness: .28, metalness: .74 });
  const darkBrass = material('#826344', { roughness: .45, metalness: .68 });
  const black = material('#141310', { roughness: .38 });
  const fabric = material('#b78266', { roughness: 1, side: THREE.DoubleSide });
  const ceramic = material('#e4d5b8', { roughness: .22 });

  // Wallpaper, chair rail and individually moulded panels catch the afternoon light.
  box(16, 9, .15, material('#ffffff', { map: wallpaperTexture, roughness: 1 }), 0, 4.5, -1.74);
  box(16, 1.66, .18, material('#aea38a'), 0, .83, -1.62);
  box(16, .105, .17, trim, 0, 1.69, -1.48);
  box(16, .035, .2, cream, 0, 1.76, -1.46);
  box(16, .14, .23, trim, 0, .1, -1.45);
  for (let i = -5; i < 6; i++) {
    const x = i * 1.48;
    box(1.25, .027, .045, trim, x, 1.43, -1.50);
    box(1.25, .027, .045, trim, x, .35, -1.50);
    box(.027, 1.1, .045, trim, x - .625, .89, -1.50);
    box(.027, 1.1, .045, trim, x + .625, .89, -1.50);
  }
  box(18, .15, 14, material('#ffffff', { map: floorTexture, roughness: .7 }), 0, -.13, 3.0);

  const rugTexture = canvasTexture(1024, 640, (ctx, w, h) => {
    ctx.fillStyle = '#624539'; ctx.fillRect(0, 0, w, h);
    const colors = ['#b5976f', '#563d32', '#a4745e', '#c1a47c', '#574739'];
    [20, 35, 49, 68, 86].forEach((inset, i) => {
      ctx.strokeStyle = colors[i]; ctx.lineWidth = i === 2 ? 18 : 7;
      ctx.strokeRect(inset, inset, w - inset * 2, h - inset * 2);
    });
    for (let y = 115; y < h - 90; y += 84) for (let x = 125; x < w - 100; x += 95) {
      ctx.save(); ctx.translate(x + (y % 2) * 16, y); ctx.rotate(Math.PI / 4);
      ctx.fillStyle = '#9e775b'; ctx.fillRect(-19, -19, 38, 38);
      ctx.fillStyle = '#665647'; ctx.fillRect(-12, -12, 24, 24);
      ctx.fillStyle = '#c0a280'; ctx.fillRect(-4, -4, 8, 8); ctx.restore();
    }
    for (let i = 0; i < 45000; i++) {
      ctx.fillStyle = `rgba(222,196,151,${random() * .13})`;
      ctx.fillRect(random() * w, random() * h, 1.5, .8);
    }
  });
  const rug = box(7.9, .017, 3.5, material('#ffffff', { map: rugTexture, roughness: 1 }), -.1, -.025, 1.75);
  rug.rotation.y = -.015;
  for (const x of [-4.10, 3.9]) for (let j = 0; j < 60; j++) {
    box(.13, .014, .01, material(j % 2 ? '#bdab8c' : '#a99576'), x, -.013, .06 + j * .056);
  }

  // Walnut cabinet: inset doors, warm woven speaker grilles, brass pulls and tapered legs.
  const cabinet = new THREE.Group(); scene.add(cabinet); cabinet.position.set(.0, 0, -.02);
  for (const x of [-2.7, 2.7]) for (const z of [-.7, .75]) {
    const leg = cylinder(.095, .055, .48, walnut, x, .24, z, cabinet, 24);
    leg.rotation.z = x < 0 ? -.09 : .09;
    cylinder(.059, .06, .1, brass, x + (x < 0 ? -.015 : .015), .06, z, cabinet, 24);
  }
  box(5.85, 1.44, 1.85, walnut, 0, 1.18, -.02, cabinet);
  box(6.00, .115, 1.99, walnut, 0, 1.958, -.02, cabinet);
  box(5.93, .035, 1.93, darkWood, 0, 1.887, -.02, cabinet);
  box(5.73, .052, .075, brass, 0, .50, .94, cabinet);
  const weaveTexture = canvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#594434'; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < w; i += 4) {
      ctx.fillStyle = i % 8 ? '#887358' : '#aa9471'; ctx.fillRect(i, 0, 1.3, h);
      ctx.fillStyle = 'rgba(220,193,142,.18)'; ctx.fillRect(0, i, w, 1);
    }
  });
  weaveTexture.wrapS = weaveTexture.wrapT = THREE.RepeatWrapping; weaveTexture.repeat.set(3, 2);
  const weave = material('#ffffff', { map: weaveTexture, roughness: 1 });
  for (const x of [-2.15, 2.15]) {
    box(1.27, 1.21, .055, darkWood, x, 1.18, .925, cabinet);
    box(1.15, 1.1, .063, weave, x, 1.18, .96, cabinet);
    for (const edge of [-1, 1]) {
      box(.046, 1.21, .055, walnut, x + edge * .628, 1.18, .97, cabinet);
      box(1.27, .045, .055, walnut, x, 1.18 + edge * .596, .97, cabinet);
    }
  }
  for (const x of [-.715, .715]) {
    box(1.36, 1.25, .06, walnut, x, 1.18, .945, cabinet);
    const handle = cylinder(.018, .018, .17, brass, x + (x < 0 ? .48 : -.48), 1.42, 1.003, cabinet, 20);
    handle.rotation.x = Math.PI / 2;
    box(.032, .2, .025, brass, x + (x < 0 ? .48 : -.48), 1.42, 1.085, cabinet);
  }

  // Turntable, including suspended feet, concentric grooves, cartridge and acrylic lid.
  const deck = new THREE.Group(); scene.add(deck); deck.position.set(-.35, 2.035, .04);
  for (const x of [-1.31, 1.31]) for (const z of [-.77, .77]) cylinder(.105, .1, .1, black, x, .008, z, deck, 32);
  box(3.05, .16, 2.0, walnut, 0, .135, 0, deck);
  box(3.01, .055, 1.97, material('#e0d3b8', { roughness: .32, metalness: .13 }), 0, .24, 0, deck);
  box(3.04, .024, 1.99, darkBrass, 0, .039, 0, deck);
  cylinder(.868, .87, .092, material('#8d8c82', { metalness: .87, roughness: .25 }), -.27, .308, .01, deck);
  const platter = cylinder(.84, .84, .033, black, -.27, .37, .01, deck);
  bind(platter, 'toggle');
  for (let j = 0; j < 92; j++) {
    const angle = j * Math.PI * 2 / 92;
    const dot = sphere(.009, cream, -.27 + Math.cos(angle) * .867, .305, .01 + Math.sin(angle) * .867, deck);
    dot.castShadow = false;
  }
  cylinder(.014, .014, .145, brass, -.27, .418, .01, deck, 20);
  const power = cylinder(.148, .16, .05, darkBrass, 1.18, .291, .72, deck);
  cylinder(.129, .137, .049, brass, 1.18, .34, .72, deck);
  bind(power, 'toggle');
  box(.012, .004, .031, cream, 1.18, .367, .638, deck);
  const ledMaterial = material('#a87739', { emissive: '#e5a758', emissiveIntensity: .4 });
  const led = sphere(.017, ledMaterial, .89, .285, .76, deck); led.scale.y = .35;
  const plateMap = canvasTexture(384, 70, (ctx, w, h) => {
    ctx.fillStyle = '#b99a66'; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#403727'; ctx.textAlign = 'center'; ctx.font = '21px Georgia'; ctx.fillText('H I G H   F I D E L I T Y', w / 2, 31);
    ctx.font = '10px Arial'; ctx.fillText('STEREOPHONIC  ·  33⅓ RPM', w / 2, 52);
  });
  const plaque = mesh(new THREE.PlaneGeometry(.65, .12), material('#ffffff', { map: plateMap, metalness: .3, roughness: .4 }), deck);
  plaque.position.set(-1.02, .135, 1.006);
  const eject = box(.1, .055, .09, brass, 1.29, .294, .35, deck); bind(eject, 'eject');

  const armBaseX = 1.04, armBaseZ = -.64;
  cylinder(.16, .16, .08, black, armBaseX, .306, armBaseZ, deck);
  cylinder(.125, .13, .28, brass, armBaseX, .45, armBaseZ, deck);
  const armPivot = new THREE.Group(); deck.add(armPivot); armPivot.position.set(armBaseX, .62, armBaseZ);
  const armMetal = material('#cabfa2', { metalness: .9, roughness: .22 });
  tube([[0, 0, -.17], [.015, .012, .12], [.1, .005, .48], [.07, -.02, .93], [-.035, -.05, 1.24]], .025, armMetal, armPivot);
  const weight = cylinder(.091, .091, .21, darkBrass, 0, .013, -.18, armPivot, 32); weight.rotation.x = Math.PI / 2;
  box(.12, .057, .19, black, -.035, -.08, 1.27, armPivot);
  const stylus = box(.044, .048, .08, material('#895039'), -.035, -.129, 1.31, armPivot);
  cylinder(.007, .007, .05, brass, -.035, -.161, 1.31, armPivot, 8);
  box(.03, .19, .03, darkBrass, 1.105, .36, .31, deck);
  const lid = new THREE.Group(); deck.add(lid); lid.position.set(0, .27, -.97); lid.rotation.x = -Math.PI * .28;
  const glass = physical({ color: '#d6c8a3', transparent: true, opacity: .13, roughness: .12, metalness: .05, side: THREE.DoubleSide, depthWrite: false });
  const glassEdge = material('#c8bc98', { transparent: true, opacity: .46, roughness: .25, metalness: .3 });
  box(3.05, .027, 2.0, glass, 0, .38, 1.0, lid).castShadow = false;
  box(3.05, .38, .021, glass, 0, .19, 2.0, lid).castShadow = false;
  for (const x of [-1.52, 1.52]) {
    box(.025, .38, 2.0, glass, x, .19, 1, lid).castShadow = false;
    box(.012, .012, 2.01, glassEdge, x, .4, 1, lid);
    box(.014, .39, .014, glassEdge, x, .195, 2, lid);
  }
  box(3.05, .012, .012, glassEdge, 0, .4, 2, lid);
  for (const x of [-1.1, 1.1]) box(.15, .065, .1, darkBrass, x, .285, -.96, deck);

  const grooveTexture = canvasTexture(1024, 1024, (ctx, w, h) => {
    ctx.fillStyle = '#131311'; ctx.fillRect(0, 0, w, h);
    for (let r = 140; r < 501; r += 2) {
      ctx.strokeStyle = r % 6 ? 'rgba(132,133,122,.14)' : 'rgba(212,210,193,.22)';
      ctx.lineWidth = .7; ctx.beginPath(); ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2); ctx.stroke();
    }
    const highlight = ctx.createConicGradient(.3, w / 2, h / 2);
    highlight.addColorStop(0, 'rgba(239,228,198,0)'); highlight.addColorStop(.17, 'rgba(239,228,198,.11)');
    highlight.addColorStop(.32, 'rgba(239,228,198,0)'); highlight.addColorStop(.68, 'rgba(239,228,198,.07)'); highlight.addColorStop(1, 'rgba(239,228,198,0)');
    ctx.fillStyle = highlight; ctx.fillRect(0, 0, w, h);
  });
  const recordMaterial = material('#ffffff', { map: grooveTexture, roughness: .34, metalness: .22 });
  const wallRecordCount = 4;
  const records = [];
  const recordHomes = [];
  const loader = new THREE.TextureLoader();
  const topRecord = new THREE.Vector3(-.62, 2.449, .05);
  const wallOrientation = new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0));
  const deckOrientation = new THREE.Quaternion();
  const loadedArtwork = [];
  albums.forEach((album, index) => {
    const onWall = index < wallRecordCount;
    const row = Math.floor(index / 2);
    const col = index % 2;
    const x = -3.83 + col * 1.38;
    const y = 4.87 - row * 1.59;
    const z = -1.34;
    // The wall stays a two-by-two still life; the rest of the collection lives below.
    if (onWall) {
      box(1.33, .049, .28, walnut, x, y - .66, z + .032);
      box(1.38, .025, .055, brass, x, y - .65, z + .175);
      box(.058, .13, .15, darkBrass, x - .5, y - .71, z - .05);
      box(.058, .13, .15, darkBrass, x + .5, y - .71, z - .05);
      const sleeve = box(1.18, 1.18, .047, cream, x, y, z);
      const fallbackMap = canvasTexture(512, 512, (ctx, w, h) => {
        ctx.fillStyle = album.color || '#7e5148'; ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = 'rgba(234,222,193,.55)'; ctx.lineWidth = 2; ctx.strokeRect(22, 22, w - 44, h - 44);
        ctx.fillStyle = '#f0dfbb'; ctx.textAlign = 'center'; ctx.font = '22px Georgia'; ctx.fillText('LANA DEL REY', w / 2, 89);
        ctx.font = 'italic 32px Georgia';
        const words = (album.title || 'A little daydream').split(' '); let line = ''; let yy = 256;
        words.forEach(word => { if (ctx.measureText(line + word).width > 425) { ctx.fillText(line, w / 2, yy); line = ''; yy += 39; } line += `${word} `; });
        ctx.fillText(line.trim(), w / 2, yy); ctx.font = '16px Georgia'; ctx.fillText(album.year || '33⅓ RPM', w / 2, 447);
      });
      const artMaterial = material('#ffffff', { map: fallbackMap, roughness: .72 });
      const art = mesh(new THREE.PlaneGeometry(1.174, 1.174), artMaterial);
      art.position.set(x, y, z + .0245); bind(art, 'select', index); bind(sleeve, 'select', index);
      if (album.image) {
        loadedArtwork.push(new Promise(resolve => {
          loader.load(album.image, texture => {
            if (disposed) { texture.dispose(); resolve(); return; }
            texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = 8;
            textures.add(texture); artMaterial.map = texture; artMaterial.needsUpdate = true; dirty = true; resolve();
          }, undefined, () => resolve());
        }));
      }
    }
    const record = new THREE.Group(); scene.add(record);
    const body = cylinder(.554, .554, .02, black, 0, 0, 0, record);
    const face = mesh(new THREE.CircleGeometry(.551, 96), recordMaterial, record);
    face.rotation.x = -Math.PI / 2; face.position.y = .0105;
    const labelMap = canvasTexture(256, 256, (ctx, w, h) => {
      ctx.fillStyle = album.color || '#aa775e'; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#efdfbc'; ctx.textAlign = 'center'; ctx.font = '19px Georgia'; ctx.fillText('LANA DEL REY', 128, 90);
      ctx.font = '12px Georgia'; ctx.fillText('SIDE A  •  STEREO', 128, 166); ctx.fillText(album.year || '33⅓', 128, 188);
      ctx.strokeStyle = 'rgba(237,219,183,.75)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(128, 128, 116, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#171712'; ctx.beginPath(); ctx.arc(128, 128, 7, 0, Math.PI * 2); ctx.fill();
    });
    const label = mesh(new THREE.CircleGeometry(.184, 64), material('#ffffff', { map: labelMap, roughness: .82 }), record);
    label.rotation.x = -Math.PI / 2; label.position.y = .012;
    if (onWall) record.position.set(x, y + .27, z - .035);
    else record.position.set(topRecord.x, -2.8, 3.6);
    record.visible = onWall;
    record.quaternion.copy(wallOrientation);
    recordHomes.push(record.position.clone()); records.push(record);
    bind(body, 'select', index); bind(face, 'select', index); bind(label, 'select', index);
  });

  // A pleated silk shade is real folded geometry, rather than a flat cone.
  const lamp = new THREE.Group(); scene.add(lamp); lamp.position.set(2.1, 2.01, -.15);
  cylinder(.34, .37, .065, darkBrass, 0, .04, 0, lamp);
  cylinder(.28, .33, .04, brass, 0, .09, 0, lamp);
  cylinder(.035, .05, .78, brass, 0, .51, 0, lamp, 24);
  sphere(.097, brass, 0, .81, 0, lamp);
  const shadeGeometry = new THREE.CylinderGeometry(.36, .64, .66, 96, 1, true);
  const shadePositions = shadeGeometry.attributes.position;
  for (let i = 0; i < shadePositions.count; i++) {
    const xx = shadePositions.getX(i), zz = shadePositions.getZ(i);
    const angle = Math.atan2(zz, xx);
    const radius = Math.sqrt(xx * xx + zz * zz) + Math.cos(angle * 48) * .017;
    shadePositions.setX(i, Math.cos(angle) * radius); shadePositions.setZ(i, Math.sin(angle) * radius);
  }
  shadeGeometry.computeVertexNormals();
  const shadeMaterial = material('#eed3a1', { roughness: .96, side: THREE.DoubleSide, emissive: '#d39a4a', emissiveIntensity: .16 });
  const shade = mesh(shadeGeometry, shadeMaterial, lamp); shade.position.y = 1.21;
  for (const [r, y] of [[.361, 1.54], [.643, .88]]) {
    const rim = mesh(new THREE.TorusGeometry(r, .015, 8, 96), darkBrass, lamp); rim.rotation.x = Math.PI / 2; rim.position.y = y;
  }
  sphere(.043, brass, 0, 1.59, 0, lamp);
  const lampLight = new THREE.PointLight('#ffc879', 6.5, 7, 2); lampLight.position.set(2.1, 3.1, -.15); scene.add(lampLight);
  const lampWallLight = new THREE.PointLight('#eeba72', 3, 5, 2); lampWallLight.position.set(2.1, 3.1, -1.05); scene.add(lampWallLight);

  // Tall linen drapes frame a hazy Pacific sunset and distant palms.
  const skyTexture = canvasTexture(640, 960, (ctx, w, h) => {
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#82969c'); sky.addColorStop(.46, '#e5b99a'); sky.addColorStop(.66, '#f5ca97'); sky.addColorStop(.71, '#a1958a'); sky.addColorStop(1, '#78796e');
    ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
    const glow = ctx.createRadialGradient(352, 556, 6, 352, 556, 210);
    glow.addColorStop(0, 'rgba(255,231,171,.8)'); glow.addColorStop(1, 'rgba(255,218,156,0)');
    ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#fbe0af'; ctx.beginPath(); ctx.arc(352, 556, 38, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(243,214,172,.3)'; ctx.lineWidth = 2;
    for (let i = 0; i < 90; i++) { const y = 695 + random() * 260; const x = random() * w; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + random() * 75 + 10, y); ctx.stroke(); }
    const palm = (x, bottom, height, tilt) => {
      const topX = x + tilt, topY = bottom - height;
      ctx.strokeStyle = '#5b6256'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x, bottom); ctx.quadraticCurveTo(x + tilt * .45, bottom - height * .52, topX, topY); ctx.stroke();
      ctx.lineWidth = 2;
      for (let p = 0; p < 10; p++) {
        const a = p * Math.PI * 2 / 10; const dx = Math.cos(a) * 85, dy = Math.sin(a) * 38;
        ctx.beginPath(); ctx.moveTo(topX, topY); ctx.quadraticCurveTo(topX + dx * .8, topY + dy - 20, topX + dx, topY + dy + 29); ctx.stroke();
        for (let k = 1; k < 12; k++) {
          const t = k / 12; const px = topX + dx * t, py = topY + dy * t - Math.sin(t * Math.PI) * 12;
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 9, py + 20 * Math.sin(t * Math.PI)); ctx.moveTo(px, py); ctx.lineTo(px + 9, py + 20 * Math.sin(t * Math.PI)); ctx.stroke();
        }
      }
    };
    palm(84, 980, 490, 27); palm(519, 980, 380, -12);
    for (let i = 0; i < 23000; i++) { ctx.fillStyle = `rgba(84,63,49,${random() * .055})`; ctx.fillRect(random() * w, random() * h, 1, 1); }
  });
  const windowX = 4.04, windowY = 3.74;
  box(2.4, 3.67, .1, darkWood, windowX, windowY, -1.605);
  const sky = mesh(new THREE.PlaneGeometry(2.22, 3.49), material('#ffffff', { map: skyTexture, emissive: '#c5a485', emissiveMap: skyTexture, emissiveIntensity: .28, roughness: 1 }));
  sky.position.set(windowX, windowY, -1.54);
  for (const x of [-1.19, 1.19]) {
    box(.14, 3.85, .19, trim, windowX + x, windowY, -1.47);
    box(.028, 3.88, .035, brass, windowX + x * 1.07, windowY, -1.35);
  }
  for (const y of [-1.87, 1.87]) box(2.56, .12, .2, trim, windowX, windowY + y, -1.47);
  box(.066, 3.55, .075, trim, windowX, windowY, -1.42);
  box(2.3, .065, .075, trim, windowX, windowY + .3, -1.42);
  box(2.71, .092, .37, cream, windowX, windowY - 1.9, -1.34);
  const curtainMaterial = material('#bc8f70', { roughness: 1, side: THREE.DoubleSide });
  for (const direction of [-1, 1]) {
    const curtainGeo = new THREE.PlaneGeometry(.94, 4.9, 32, 32);
    const pos = curtainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i);
      const narrow = .73 + .2 * Math.cos(y * .95);
      pos.setX(i, x * narrow + direction * Math.sin((y + 2.45) / 4.9 * Math.PI) * .14);
      pos.setZ(i, Math.sin((x + .47) * Math.PI * 12) * .082 + Math.sin(y * .65) * .028);
    }
    curtainGeo.computeVertexNormals();
    const curtain = mesh(curtainGeo, curtainMaterial); curtain.position.set(windowX + direction * 1.26, 2.93, -1.11);
    for (let r = 0; r < 7; r++) {
      const ring = mesh(new THREE.TorusGeometry(.046, .009, 8, 16), brass);
      ring.position.set(windowX + direction * 1.26 - .35 + r * .116, 5.44, -1.1);
    }
  }
  const curtainRod = cylinder(.024, .024, 3.62, brass, windowX, 5.46, -1.1, scene, 24); curtainRod.rotation.z = Math.PI / 2;
  sphere(.072, brass, windowX - 1.86, 5.46, -1.1); sphere(.072, brass, windowX + 1.86, 5.46, -1.1);

  // Quiet still-life details: a ceramic jug, dried pink roses and well-loved books.
  const stillLife = new THREE.Group(); scene.add(stillLife); stillLife.position.set(-2.5, 2.02, .05);
  const vaseProfile = [[0, 0], [.14, 0], [.20, .05], [.23, .2], [.20, .38], [.105, .52], [.09, .64], [.115, .67]].map(p => new THREE.Vector2(...p));
  const vase = mesh(new THREE.LatheGeometry(vaseProfile, 48), ceramic, stillLife);
  const handleCurve = [[.14, .14, 0], [.35, .22, 0], [.35, .47, 0], [.10, .55, 0]];
  tube(handleCurve, .035, ceramic, stillLife);
  const stemMaterial = material('#576048', { roughness: .95 });
  const roseMaterials = ['#b27c75', '#ce9b90', '#925952', '#d2a69b'].map(color => material(color, { roughness: .94, side: THREE.DoubleSide }));
  for (let i = 0; i < 5; i++) {
    const xx = (i - 2) * .126, yy = 1.00 + Math.sin(i * 1.7) * .13, zz = Math.cos(i * 2) * .11;
    tube([[0, .49, 0], [xx * .35, .75, zz * .5], [xx, yy, zz]], .012, stemMaterial, stillLife);
    for (let j = 0; j < 9; j++) {
      const angle = j * Math.PI * 2 / 9;
      const petal = sphere(.077, roseMaterials[(i + j) % 4], xx + Math.cos(angle) * .054, yy + Math.sin(j * 3) * .013, zz + Math.sin(angle) * .052, stillLife);
      petal.scale.set(1, .43, .7); petal.rotation.set(Math.sin(angle) * .6, angle, Math.cos(angle) * .55);
    }
    const bud = sphere(.058, roseMaterials[(i + 1) % 4], xx, yy + .025, zz, stillLife); bud.scale.y = .6;
    const leaf = sphere(.077, stemMaterial, xx * .65 + .06, yy - .19, zz, stillLife); leaf.scale.set(1.2, .16, .42); leaf.rotation.z = -.4;
  }
  const books = new THREE.Group(); scene.add(books); books.position.set(1.53, 2.025, .45); books.rotation.y = -.1;
  const paper = material('#cabe9f');
  [['#806452', .08, .69], ['#bbb294', .1, .75], ['#765f53', .068, .66]].forEach(([color, height, width], i) => {
    const yy = i * .105;
    const coverMaterial = material(color);
    box(width, height, .47, paper, 0, yy + height / 2, 0, books);
    box(width + .025, .014, .5, coverMaterial, 0, yy, 0, books);
    box(width + .025, .014, .5, coverMaterial, 0, yy + height, 0, books);
    box(width, height, .025, coverMaterial, 0, yy + height / 2, .243, books);
    box(width * .46, .006, .003, darkBrass, 0, yy + height * .5, .258, books);
  });
  const tumbler = cylinder(.105, .084, .15, ceramic, 1.57, 2.429, .46);
  cylinder(.087, .087, .003, material('#553c29'), 1.57, 2.506, .46);
  const mugHandle = mesh(new THREE.TorusGeometry(.067, .015, 10, 24), ceramic); mugHandle.position.set(1.7, 2.441, .46);

  // Xiaoman's restrained painted portrait sits in the existing oval brass frame.
  // A simple matching silhouette stays in place while the local artwork loads.
  const portraitMap = canvasTexture(256, 384, (ctx, w, h) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, h); gradient.addColorStop(0, '#a6987d'); gradient.addColorStop(1, '#55594a');
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#9b9983'; ctx.beginPath(); ctx.ellipse(128, 289, 83, 112, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#c1bca3'; ctx.beginPath(); ctx.moveTo(73, 143); ctx.lineTo(77, 77); ctx.lineTo(111, 111); ctx.lineTo(146, 110); ctx.lineTo(182, 76); ctx.lineTo(187, 145); ctx.fill();
    ctx.beginPath(); ctx.ellipse(130, 160, 67, 64, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#a29e87'; ctx.beginPath(); ctx.ellipse(130, 124, 37, 22, 0, Math.PI, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#6f725f';
    for (const x of [106, 151]) { ctx.beginPath(); ctx.ellipse(x, 160, 8, 6, 0, 0, Math.PI * 2); ctx.fill(); }
    ctx.fillStyle = '#937c68'; ctx.beginPath(); ctx.moveTo(125, 181); ctx.lineTo(136, 181); ctx.lineTo(131, 187); ctx.fill();
    ctx.strokeStyle = 'rgba(69,49,35,.23)';
    for (let i = 0; i < 900; i++) { ctx.beginPath(); const x = random() * w, y = random() * h; ctx.moveTo(x, y); ctx.lineTo(x + 3, y + 15); ctx.stroke(); }
  });
  const portrait = mesh(new THREE.CircleGeometry(.49, 64), material('#ffffff', { map: portraitMap, roughness: .9 })); portrait.scale.y = 1.4; portrait.position.set(.5, 4.49, -1.59);
  bind(portrait, 'portrait');
  loadedArtwork.push(new Promise(resolve => {
    loader.load(new URL('./xiaoman-portrait-v3.png', import.meta.url).href, texture => {
      if (disposed) { texture.dispose(); resolve(); return; }
      texture.colorSpace = THREE.SRGBColorSpace;
      // Preserve the painted face's proportions inside the 1:1.4 oval.
      const imageAspect = texture.image.width / texture.image.height;
      const portraitAspect = 1 / portrait.scale.y;
      if (imageAspect > portraitAspect) {
        texture.repeat.x = portraitAspect / imageAspect;
        texture.offset.x = (1 - texture.repeat.x) / 2;
      } else {
        texture.repeat.y = imageAspect / portraitAspect;
        texture.offset.y = (1 - texture.repeat.y) / 2;
      }
      textures.add(texture);
      portrait.material.map = texture;
      portrait.material.color.set('#ffffff');
      portrait.material.needsUpdate = true;
      dirty = true;
      resolve();
    }, undefined, () => resolve());
  }));
  for (let i = 0; i < 3; i++) {
    const frame = mesh(new THREE.TorusGeometry(.51 + i * .022, .014, 10, 80), i === 1 ? darkBrass : brass);
    frame.scale.y = 1.4; frame.position.set(.5, 4.49, -1.56 + i * .008);
    bind(frame, 'portrait');
  }

  const ambient = new THREE.HemisphereLight('#fff3dd', '#746955', 2.55); scene.add(ambient);
  const sunlight = new THREE.DirectionalLight('#ffe3b2', 3.5); sunlight.position.set(6.4, 7.0, 4.0); sunlight.target.position.set(-1, 1.3, -1); scene.add(sunlight, sunlight.target);
  sunlight.castShadow = true; sunlight.shadow.mapSize.set(2048, 2048); sunlight.shadow.bias = -.00035; sunlight.shadow.normalBias = .045;
  Object.assign(sunlight.shadow.camera, { left: -7, right: 7, top: 7, bottom: -4, near: .1, far: 24 });
  sunlight.shadow.radius = 3.5;
  const fill = new THREE.DirectionalLight('#fff5e4', .85); fill.position.set(-5, 4, 8); scene.add(fill);

  // Long window-shaped pools of light on the floor use a soft-edged canvas gobo.
  const sunPatchTexture = canvasTexture(256, 256, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, w, 0); g.addColorStop(0, 'rgba(255,220,151,0)'); g.addColorStop(.08, 'rgba(255,220,151,.19)'); g.addColorStop(.92, 'rgba(255,220,151,.19)'); g.addColorStop(1, 'rgba(255,220,151,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'destination-in'; const v = ctx.createLinearGradient(0, 0, 0, h); v.addColorStop(0, 'transparent'); v.addColorStop(.07, 'white'); v.addColorStop(.88, 'white'); v.addColorStop(1, 'transparent'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h);
  });
  const sunPatchMaterial = new THREE.MeshBasicMaterial({ map: sunPatchTexture, transparent: true, depthWrite: false, toneMapped: false, opacity: .67 }); materials.add(sunPatchMaterial);
  for (let i = 0; i < 2; i++) {
    const sunPatch = mesh(new THREE.PlaneGeometry(1.5, 4.6), sunPatchMaterial);
    sunPatch.rotation.set(-Math.PI / 2, 0, -.45); sunPatch.position.set(2.8 + i * 1.22, -.025, 1.8 + i * .1); sunPatch.castShadow = false; sunPatch.receiveShadow = false;
  }

  function updateCamera() {
    const target = compactComposition ? compactTarget : desktopTarget;
    camera.position.set(target.x + Math.sin(cameraAngles.x) * 19, target.y + Math.sin(cameraAngles.y) * 19, target.z + Math.cos(cameraAngles.x) * 19);
    camera.lookAt(target);
  }
  function resize() {
    if (disposed) return;
    const width = Math.max(container.clientWidth, 1), height = Math.max(container.clientHeight, 1);
    const aspect = width / height;
    // A portrait viewport frames the records and deck as the primary still life.
    // Fixed composition targets prevent repeated resizes from accumulating offsets.
    compactComposition = aspect < 1.2;
    const viewWidth = compactComposition ? 8 : Math.max(11.7, 6.7 * aspect);
    const viewHeight = viewWidth / aspect;
    camera.left = -viewWidth / 2; camera.right = viewWidth / 2;
    camera.top = viewHeight / 2; camera.bottom = -viewHeight / 2;
    camera.updateProjectionMatrix(); updateCamera(); renderer.setSize(width, height, false); dirty = true;
  }
  const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(container);
  const intersectionObserver = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? true; dirty = true; }, { rootMargin: '100px' }); intersectionObserver.observe(container);
  function settleRecords(index) {
    records.forEach((record, i) => {
      record.position.copy(i === index ? topRecord : recordHomes[i]);
      record.quaternion.copy(i === index ? deckOrientation : wallOrientation);
      record.scale.setScalar(i === index ? 1.46 : 1);
      record.visible = i < wallRecordCount || i === index;
      record.children.forEach(child => { child.userData.action = i === index ? 'toggle' : 'select'; });
    });
  }
  function setRecord(index) {
    if (disposed) return;
    if (index !== null && (!Number.isInteger(index) || !records[index])) return;
    if (index === selected && !movement) return;
    const previous = selected;
    if (movement) settleRecords(selected);
    movement = null; selected = index; playing = false; desiredArm = 0;
    if (reducedMotion) settleRecords(index);
    else {
      const steps = [];
      if (previous !== null) steps.push({ index: previous, ejecting: true });
      if (index !== null) steps.push({ index, ejecting: false });
      movement = steps.length ? { steps, elapsed: 0, duration: .94 } : null;
      if (movement) prepareStep();
    }
    dirty = true;
  }
  function prepareStep() {
    const step = movement.steps[0], record = records[step.index];
    record.visible = true;
    step.from = record.position.clone(); step.to = step.ejecting ? recordHomes[step.index].clone() : topRecord.clone();
    step.fromQuaternion = record.quaternion.clone(); step.toQuaternion = step.ejecting ? wallOrientation.clone() : deckOrientation.clone();
    step.fromScale = record.scale.x; step.toScale = step.ejecting ? 1 : 1.46;
    record.children.forEach(child => { child.userData.action = step.ejecting ? 'select' : 'toggle'; });
  }
  function animateRecord(delta) {
    if (!movement) return;
    movement.elapsed += delta;
    const step = movement.steps[0], record = records[step.index];
    const t = Math.min(movement.elapsed / movement.duration, 1), eased = t * t * (3 - 2 * t);
    record.position.lerpVectors(step.from, step.to, eased);
    record.position.y += Math.sin(Math.PI * t) * .72;
    record.position.z += Math.sin(Math.PI * t) * .55;
    record.quaternion.slerpQuaternions(step.fromQuaternion, step.toQuaternion, eased);
    record.scale.setScalar(THREE.MathUtils.lerp(step.fromScale, step.toScale, eased));
    if (t === 1) {
      if (step.ejecting && step.index >= wallRecordCount) record.visible = false;
      movement.steps.shift(); movement.elapsed = 0;
      if (movement.steps.length) prepareStep();
      else { movement = null; if (playing) desiredArm = -.41; }
    }
  }
  function setSpinning(value) { playing = Boolean(value) && selected !== null; desiredArm = playing && !movement ? -.41 : 0; dirty = true; }
  function setNight(value) {
    night = Boolean(value);
    ambient.intensity = night ? .93 : 2.55;
    ambient.color.set(night ? '#b3c0c9' : '#fff3dd');
    sunlight.color.set(night ? '#b9c1d0' : '#ffe3b2'); sunlight.intensity = night ? .65 : 3.5;
    lampLight.intensity = night ? 10 : 6.5; lampWallLight.intensity = night ? 5.6 : 3;
    shadeMaterial.emissiveIntensity = night ? .6 : .16; sunPatchMaterial.opacity = night ? .04 : .67;
    sky.material.emissiveIntensity = night ? .02 : .28; sky.material.color.set(night ? '#59677b' : '#ffffff');
    renderer.toneMappingExposure = night ? 1.08 : 1.18;
    scene.background.set(night ? '#827967' : '#e6d7bd'); dirty = true;
  }
  const raycaster = new THREE.Raycaster(), mouse = new THREE.Vector2();
  function hit(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
    raycaster.setFromCamera(mouse, camera);
    // Raycasting an explicit child list does not account for hidden parent groups.
    const visibleTargets = interactive.filter(object => {
      for (let parent = object; parent; parent = parent.parent) if (!parent.visible) return false;
      return true;
    });
    return raycaster.intersectObjects(visibleTargets, false)[0]?.object;
  }
  function onPointerDown(event) {
    if (event.button !== 0) return;
    pointerStart = { x: event.clientX, y: event.clientY, angleX: cameraAngles.targetX, angleY: cameraAngles.targetY };
    dragged = false; renderer.domElement.setPointerCapture(event.pointerId);
  }
  function onPointerMove(event) {
    if (pointerStart) {
      const dx = event.clientX - pointerStart.x, dy = event.clientY - pointerStart.y;
      if (Math.abs(dx) + Math.abs(dy) > 6) dragged = true;
      if (dragged && (event.pointerType !== 'touch' || Math.abs(dx) > Math.abs(dy) * 1.2)) {
        cameraAngles.targetX = THREE.MathUtils.clamp(pointerStart.angleX - dx * .0007, -.08, .26);
        if (event.pointerType !== 'touch') cameraAngles.targetY = THREE.MathUtils.clamp(pointerStart.angleY + dy * .0004, .14, .40);
        renderer.domElement.style.cursor = 'grabbing'; dirty = true;
      }
    } else renderer.domElement.style.cursor = hit(event) ? 'pointer' : 'grab';
  }
  function onPointerUp(event) {
    if (!pointerStart) return;
    const click = !dragged; pointerStart = null;
    if (renderer.domElement.hasPointerCapture(event.pointerId)) renderer.domElement.releasePointerCapture(event.pointerId);
    renderer.domElement.style.cursor = 'grab';
    if (!click) return;
    const object = hit(event);
    if (object?.userData.action === 'portrait') { onPortrait?.(); return; }
    if (movement) return;
    if (object?.userData.action === 'select') onSelect?.(object.userData.index);
    else if (object?.userData.action === 'toggle') onToggle?.();
    else if (object?.userData.action === 'eject') onEject?.();
  }
  function onPointerCancel() { pointerStart = null; dragged = false; }
  const canvas = renderer.domElement;
  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointercancel', onPointerCancel);
  const handleVisibility = () => { lastTime = 0; dirty = true; };
  document.addEventListener('visibilitychange', handleVisibility);

  function animate(time) {
    if (disposed) return;
    animationFrame = requestAnimationFrame(animate);
    if (!visible || document.hidden) { lastTime = 0; return; }
    const delta = lastTime ? Math.min((time - lastTime) / 1000, .05) : .016; lastTime = time;
    const cameraMoving = Math.abs(cameraAngles.targetX - cameraAngles.x) + Math.abs(cameraAngles.targetY - cameraAngles.y) > .0001;
    const armMoving = Math.abs(armPivot.rotation.y - desiredArm) > .001;
    if (cameraMoving) {
      const factor = reducedMotion ? 1 : Math.min(delta * 9, 1);
      cameraAngles.x += (cameraAngles.targetX - cameraAngles.x) * factor;
      cameraAngles.y += (cameraAngles.targetY - cameraAngles.y) * factor; updateCamera();
    }
    const recordMoving = Boolean(movement);
    if (recordMoving) animateRecord(delta);
    if (armMoving) armPivot.rotation.y += (desiredArm - armPivot.rotation.y) * (reducedMotion ? 1 : Math.min(delta * 5, 1));
    if (playing && selected !== null && !movement && !reducedMotion) records[selected].rotation.y += delta * (Math.PI * 2 * 33.33 / 60);
    ledMaterial.emissiveIntensity = playing ? 1.6 : .25;
    if (dirty || recordMoving || (playing && !reducedMotion) || cameraMoving || armMoving) { renderer.render(scene, camera); dirty = false; }
  }
  function reset() {
    cameraAngles.targetX = defaultCameraAngles.x; cameraAngles.targetY = defaultCameraAngles.y;
    dirty = true;
  }
  function dispose() {
    if (disposed) return; disposed = true;
    cancelAnimationFrame(animationFrame); resizeObserver.disconnect(); intersectionObserver.disconnect();
    document.removeEventListener('visibilitychange', handleVisibility);
    canvas.removeEventListener('pointerdown', onPointerDown); canvas.removeEventListener('pointermove', onPointerMove);
    canvas.removeEventListener('pointerup', onPointerUp); canvas.removeEventListener('pointercancel', onPointerCancel);
    geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); textures.forEach(t => t.dispose());
    renderer.dispose(); canvas.remove();
  }
  updateCamera(); resize(); renderer.render(scene, camera); animationFrame = requestAnimationFrame(animate);
  // Artwork finishes progressively so a missing cover never prevents the room opening.
  Promise.allSettled(loadedArtwork).then(() => { if (!disposed) dirty = true; });
  return { setRecord, setSpinning, setNight, reset, dispose };
}
