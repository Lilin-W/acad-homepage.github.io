// A small handmade stoneware cat: one sculpted body with integrated short ears.
// The figurine faces +Z and rests on y=0. Placement belongs to the room.
export function buildCeramicCat(T) {
  const root = new T.Group(); root.name = 'handmade stoneware Xiaoman'; root.scale.set(1.15,.90,1.02);
  const geometries = new Set(), materials = new Set(), textures = new Set();
  let seed = 8274;
  const random = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const canvasMap = (draw, color = true) => {
    const c = document.createElement('canvas'); c.width = c.height = 1024;
    draw(c.getContext('2d'), c.width, c.height);
    const t = new T.CanvasTexture(c); if (color) t.colorSpace = T.SRGBColorSpace;
    t.wrapS = T.RepeatWrapping; t.wrapT = T.ClampToEdgeWrapping; textures.add(t); return t;
  };
  const incisions = (c,w,h,relief=false) => {
    let strokeSeed=137;
    const rnd=()=>((strokeSeed=(strokeSeed*1664525+1013904223)>>>0)/4294967296);
    c.lineCap='round';
    for(let row=0;row<7;row++)for(let col=0;col<28;col++){
      const x=(col+.45*(row%2))/28*w+(rnd()-.5)*14;
      const y=h*.43+row*h*.073+(rnd()-.5)*24;
      const len=22+rnd()*29,drift=9+rnd()*18;
      c.strokeStyle=relief?'rgba(55,55,55,.65)':'rgba(134,120,96,.19)';c.lineWidth=relief?3:2.3;
      c.beginPath();c.moveTo(x,y);c.bezierCurveTo(x-drift*.12,y+len*.28,x+drift*.72,y+len*.57,x+drift,y+len);c.stroke();
      c.strokeStyle=relief?'rgba(235,235,235,.65)':'rgba(255,252,238,.4)';c.lineWidth=relief?1.8:1.5;
      c.beginPath();c.moveTo(x+2.7,y+1);c.bezierCurveTo(x-drift*.12+2.7,y+len*.28,x+drift*.72+2.7,y+len*.57,x+drift+2.7,y+len);c.stroke();
    }
  };
  const surfaceMap = canvasMap((c, w, h) => {
    c.fillStyle = '#f4efe2'; c.fillRect(0, 0, w, h);
    // Mottled pale clay, with infrequent tiny mineral grains, not a grey fur coat.
    for (let i = 0; i < 2200; i++) {
      c.fillStyle = `rgba(${i % 3 ? '224,212,191' : '255,253,243'},${.04 + random() * .10})`;
      c.beginPath(); c.ellipse(random() * w, random() * h, 1 + random() * 5, .6 + random() * 3, random() * 3, 0, Math.PI * 2); c.fill();
    }
    for (let i = 0; i < 850; i++) {
      c.fillStyle = `rgba(111,104,92,${.17 + random() * .28})`;
      c.beginPath(); c.ellipse(random() * w, random() * h, .6 + random() * 1.9, .5 + random() * 1.2, random() * 3, 0, Math.PI * 2); c.fill();
    }
    for (let i = 0; i < 90; i++) {
      c.fillStyle = 'rgba(163,128,102,.16)'; c.fillRect(random() * w, random() * h, 1 + random() * 2, 1 + random() * 2);
    }
    incisions(c,w,h);
  });
  const reliefMap = canvasMap((c, w, h) => {
    c.fillStyle = '#aaa'; c.fillRect(0, 0, w, h);
    for (let i = 0; i < 4500; i++) {
      c.fillStyle = `rgba(${random() < .5 ? '80,80,80' : '240,240,240'},${.08 + random() * .12})`;
      c.beginPath(); c.ellipse(random() * w, random() * h, 1 + random() * 3, 1 + random() * 2, 0, 0, Math.PI * 2); c.fill();
    }
    incisions(c,w,h,true);
  }, false);
  const ceramic = new T.MeshStandardMaterial({ color: '#ffffff', map: surfaceMap, bumpMap: reliefMap, bumpScale: .0045, roughness: .91, metalness: 0 }); materials.add(ceramic);
  const paint = color => { const m = new T.MeshStandardMaterial({ color, roughness: .96, metalness: 0, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }); materials.add(m); return m; };
  const dark = paint('#423a35'), rose = paint('#dca4a1'), fadedRose = paint('#e5b7af');
  const makeMesh = (g, m, name) => {
    geometries.add(g); const o = new T.Mesh(g, m); o.name = name;
    o.castShadow = true; o.receiveShadow = true; root.add(o); return o;
  };
  const profile = [[0, .103], [.010, .120], [.042, .138], [.086, .149], [.141, .147], [.198, .133], [.253, .114], [.307, .103], [.344, .096], [.366, .095]];
  const radiusAt = y => {
    let i = 0; while (i < profile.length - 2 && y > profile[i + 1][0]) i++;
    const a = profile[i], b = profile[i + 1], span = b[0] - a[0];
    const t = T.MathUtils.clamp((y - a[0]) / span, 0, 1), t2 = t * t, t3 = t2 * t;
    const before = profile[Math.max(0, i - 1)], after = profile[Math.min(profile.length - 1, i + 2)];
    const ma = (b[1] - before[1]) / (b[0] - before[0]);
    const mb = (after[1] - a[1]) / (after[0] - a[0]);
    return (2 * t3 - 3 * t2 + 1) * a[1] + (t3 - 2 * t2 + t) * ma * span + (-2 * t3 + 3 * t2) * b[1] + (t3 - t2) * mb * span;
  };
  const grainOffset = (a, y) => {
    const fade = Math.sin(Math.PI * T.MathUtils.clamp(y / .366, 0, 1));
    const lowerFur = Math.max(0, Math.min(1, (.280 - y) / .09));
    const grooves = Math.pow(Math.max(0, Math.cos(a * 25 + y * 21 + .75 * Math.sin(y * 32))), 12);
    return fade * (.0007 * Math.sin(a * 7 + y * 19) + .00035 * Math.sin(a * 31 - y * 47) - .00115 * grooves * lowerFur);
  };
  const capHeight = (x, z) => {
    const r2 = (x / .095) ** 2 + (z / .078) ** 2;
    const ear = side => Math.exp(-(((x - side * .068) / .023) ** 2) - (z / .031) ** 2);
    return .366 + .007 * Math.max(0, 1 - r2) + .036 * (ear(-1) + ear(1));
  };
  const vertices = [], uv = [], indices = [], segments = 128, bodyRings = 84, capRings = 22;
  const appendRing = (y, radialFraction, cap = false) => {
    for (let i = 0; i <= segments; i++) {
      const a = i / segments * Math.PI * 2;
      let x, z, height;
      if (cap) {
        x = .095 * radialFraction * Math.cos(a); z = .078 * radialFraction * Math.sin(a); height = capHeight(x, z);
      } else {
        const r = radiusAt(y) + grainOffset(a, y);
        x = r * Math.cos(a); z = r * Math.sin(a) * (.81 + .011 * Math.sin(y * 9)); height = y;
      }
      vertices.push(x, height, z); uv.push(i / segments, height / .425);
    }
  };
  for (let i = 0; i < bodyRings; i++) appendRing(i / bodyRings * .366, 1);
  for (let i = 0; i <= capRings; i++) appendRing(0, 1 - i / capRings, true);
  const ringCount = bodyRings + capRings + 1;
  for (let row = 0; row < ringCount - 1; row++) for (let i = 0; i < segments; i++) {
    const a = row * (segments + 1) + i, b = a + segments + 1;
    indices.push(a, b, a + 1, b, b + 1, a + 1);
  }
  const bottomIndex = vertices.length / 3; vertices.push(0, 0, 0); uv.push(.5, 0);
  for (let i = 0; i < segments; i++) indices.push(bottomIndex, i, i + 1);
  const bodyGeometry = new T.BufferGeometry(); bodyGeometry.setAttribute('position', new T.Float32BufferAttribute(vertices, 3)); bodyGeometry.setAttribute('uv', new T.Float32BufferAttribute(uv, 2));
  bodyGeometry.setIndex(indices); bodyGeometry.computeVertexNormals(); makeMesh(bodyGeometry, ceramic, 'continuous pear-shaped stoneware body and ears');

  const frontSurface = (x, y) => {
    const r = radiusAt(y), a = Math.acos(T.MathUtils.clamp(x / r, -1, 1));
    return (r + grainOffset(a, y)) * Math.sin(a) * (.81 + .011 * Math.sin(y * 9)) + .0006;
  };
  const frontPatch = (x, y, rx, ry, material, name, phase = 0) => {
    const points = [x, y, frontSurface(x, y)], faces = [], count = 28;
    for (let i = 0; i <= count; i++) {
      const a = i / count * Math.PI * 2, irregular = 1 + .07 * Math.sin(a * 5 + phase) + .035 * Math.sin(a * 9);
      const px = x + Math.cos(a) * rx * irregular, py = y + Math.sin(a) * ry * irregular;
      points.push(px, py, frontSurface(px, py)); if (i) faces.push(0, i, i + 1);
    }
    const g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(points, 3)); g.setIndex(faces); g.computeVertexNormals();
    const o = makeMesh(g, material, name); o.castShadow = false; return o;
  };
  frontPatch(-.034, .317, .0039, .0047, dark, 'left tiny painted eye', 2);
  frontPatch(.034, .317, .0038, .0046, dark, 'right tiny painted eye', 4);
  frontPatch(-.079, .294, .0106, .0102, rose, 'left faded pink cheek', 1);
  frontPatch(.079, .294, .0109, .0103, rose, 'right faded pink cheek', 3);
  frontPatch(-.086, .300, .0034, .0039, fadedRose, 'left dry-brush cheek edge', 3);
  frontPatch(.087, .299, .0032, .0043, fadedRose, 'right dry-brush cheek edge', 2);
  const noseXY = [[0, .308], [-.0063, .305], [-.005, .302], [-.0015, .300], [0, .2955], [.0018, .300], [.0052, .302], [.006, .305]];
  const nosePositions = noseXY.flatMap(([x, y]) => [x, y, frontSurface(x, y) + .00025]);
  const noseIndices = []; for (let i = 1; i < noseXY.length - 1; i++) noseIndices.push(0, i, i + 1);
  const noseGeometry = new T.BufferGeometry(); noseGeometry.setAttribute('position', new T.Float32BufferAttribute(nosePositions, 3)); noseGeometry.setIndex(noseIndices); noseGeometry.computeVertexNormals();
  const nose = makeMesh(noseGeometry, dark, 'little painted triangular nose'); nose.castShadow = false;

  // Rose glaze follows the sloping front of each integrated ear.
  for (const side of [-1, 1]) {
    const center = side * .068, pos = [], faces = [], rows = 9, cols = 12;
    for (let row = 0; row <= rows; row++) {
      const v = row / rows, z = .028 - v * .022, half = .0105 * (1 - v * .74);
      for (let col = 0; col <= cols; col++) {
        const x = center + (col / cols * 2 - 1) * half;
        pos.push(x, capHeight(x, z) + .00065, z);
      }
    }
    for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
      const a = row * (cols + 1) + col, b = a + cols + 1;
      faces.push(a, a + 1, b, a + 1, b + 1, b);
    }
    const g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setIndex(faces); g.computeVertexNormals();
    const o = makeMesh(g, rose, `${side < 0 ? 'left' : 'right'} pink ear interior`); o.castShadow = false;
  }

  // A hand-formed curled tail sits behind the right flank, visibly joined to it.
  const path = new T.CatmullRomCurve3([
    new T.Vector3(.104, .238, -.060), new T.Vector3(.143, .242, -.065),
    new T.Vector3(.164, .214, -.070), new T.Vector3(.171, .174, -.056),
    new T.Vector3(.156, .157, -.035), new T.Vector3(.142, .170, -.006)
  ]);
  const tailGeometry = new T.TubeGeometry(path, 64, .031, 14, false), tailP = tailGeometry.attributes.position;
  for (let i = 0; i < tailP.count; i++) {
    const t = Math.floor(i / 15) / 64, center = path.getPointAt(t), taper = 1 - .57 * t + .028 * Math.sin(t * 32);
    const p = new T.Vector3().fromBufferAttribute(tailP, i).sub(center).multiplyScalar(taper).add(center); tailP.setXYZ(i, p.x, p.y, p.z);
  }
  tailGeometry.computeVertexNormals(); makeMesh(tailGeometry, ceramic, 'curled stoneware tail');
  const tip = makeMesh(new T.SphereGeometry(.0103, 24, 16), ceramic, 'rounded tail tip'); tip.position.copy(path.getPointAt(1));
  root.updateMatrixWorld(true);
  return { root, dispose() { root.removeFromParent(); geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); textures.forEach(t => t.dispose()); } };
}
