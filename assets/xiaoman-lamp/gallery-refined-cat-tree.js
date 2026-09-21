// The asymmetric plywood tower follows Xiaoman's real cat tree.
// All coordinates are local; callers choose the room placement.
export function buildCatTree(T, parent) {
  const tree = new T.Group(); tree.name = 'Xiaoman’s finely modelled oak cat tree'; parent.add(tree);
  const geometries = new Set(), materials = new Set(), textures = new Set();
  let seed = 407;
  const random = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const mat = (color, options = {}) => {
    const m = new T.MeshStandardMaterial({ color, roughness: .64, ...options }); materials.add(m); return m;
  };
  const mesh = (g, m, owner = tree) => {
    geometries.add(g); const o = new T.Mesh(g, m); o.castShadow = true; o.receiveShadow = true; owner.add(o); return o;
  };
  const texture = (w, h, draw) => {
    const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
    const map = new T.CanvasTexture(c); map.colorSpace = T.SRGBColorSpace;
    map.wrapS = map.wrapT = T.RepeatWrapping; textures.add(map); return map;
  };
  const grain = texture(512, 512, (c, w, h) => {
    c.fillStyle = '#debca5'; c.fillRect(0, 0, w, h);
    for (let i = 0; i < 170; i++) {
      const x = random() * w;
      c.strokeStyle = `rgba(128,90,63,${.025 + random() * .08})`; c.lineWidth = .35 + random() * 1.5;
      c.beginPath(); c.moveTo(x, 0); c.bezierCurveTo(x + 13, h * .3, x - 11, h * .7, x + 4, h); c.stroke();
    }
    for (let i = 0; i < 2500; i++) {
      c.fillStyle = `rgba(255,239,214,${random() * .13})`; c.fillRect(random() * w, random() * h, 1, 3 + random() * 5);
    }
  });
  const ply = texture(128, 128, (c, w, h) => {
    c.fillStyle = '#d6af91'; c.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 16) {
      c.fillStyle = '#bd9375'; c.fillRect(0, y, w, 1);
      c.fillStyle = 'rgba(246,217,185,.55)'; c.fillRect(0, y + 2, w, 2);
    }
  });
  const fabric = texture(256, 256, (c, w, h) => {
    c.fillStyle = '#faf6ee'; c.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 3) for (let x = 0; x < w; x += 3) {
      c.fillStyle = (x + y) % 6 ? 'rgba(218,208,191,.14)' : 'rgba(255,255,252,.8)';
      c.fillRect(x, y, 1, 2);
    }
    for (let i = 0; i < 2700; i++) {
      c.fillStyle = `rgba(194,177,149,${random() * .08})`; c.fillRect(random() * w, random() * h, .75, .75);
    }
  });
  fabric.repeat.set(3, 3);
  const ropeMap = texture(128, 256, (c, w, h) => {
    c.fillStyle = '#f1eadd'; c.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 8) {
      c.fillStyle = '#d5c9b7'; c.fillRect(0, y, w, 1);
      c.fillStyle = '#fffaf0'; c.fillRect(0, y + 2, w, 2);
      for (let x = 0; x < w; x += 6) {
        c.strokeStyle = 'rgba(163,145,116,.16)'; c.beginPath(); c.moveTo(x, y + 2); c.lineTo(x + 4, y + 6); c.stroke();
      }
    }
  });
  const oak = mat('#ffffff', { map: grain, roughness: .5 });
  const edge = mat('#ffffff', { map: ply, roughness: .63 });
  const woodPost = mat('#ddbaa1', { map: grain, roughness: .56 });
  const cream = mat('#fffaf1', { map: fabric, bumpMap: fabric, bumpScale: .0025, roughness: .98 });
  const stitch = mat('#e7dece', { roughness: 1 });
  const rope = mat('#fffaf3', { map: ropeMap, bumpMap: ropeMap, bumpScale: .0016, roughness: .96 });
  const hardware = mat('#b1987d', { metalness: .35, roughness: .5 });
  const clear = new T.MeshPhysicalMaterial({ color: '#f3f4f0', metalness: 0, roughness: .08, transmission: .72, thickness: .035, ior: 1.46, transparent: true, opacity: .35, side: T.DoubleSide, depthWrite: false, clearcoat: 1, clearcoatRoughness: .07 }); materials.add(clear);
  const clearLip = new T.MeshPhysicalMaterial({ color: '#f8faf5', metalness: 0, roughness: .16, transparent: true, opacity: .53, depthWrite: false, clearcoat: 1 }); materials.add(clearLip);
  const roundedRect = (w, d, r, x = 0, z = 0) => {
    const s = new T.Shape(), l = x - w / 2, right = x + w / 2, b = -z - d / 2, t = -z + d / 2;
    s.moveTo(l + r, b); s.lineTo(right - r, b); s.quadraticCurveTo(right, b, right, b + r);
    s.lineTo(right, t - r); s.quadraticCurveTo(right, t, right - r, t); s.lineTo(l + r, t);
    s.quadraticCurveTo(l, t, l, t - r); s.lineTo(l, b + r); s.quadraticCurveTo(l, b, l + r, b); return s;
  };
  const ellipse = (x, z, rx, rz) => {
    const s = new T.Shape(); s.absellipse(x, -z, rx, rz, 0, Math.PI * 2, false, 0); return s;
  };
  const slab = (shape, y, h = .038, material = [oak, edge], bevel = .008) => {
    const g = new T.ExtrudeGeometry(shape, { depth: h, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3, curveSegments: 32 });
    g.rotateX(-Math.PI / 2); const object = mesh(g, material); object.position.y = y; return object;
  };
  const cylinder = (r, h, m, x, y, z, segments = 28) => {
    const o = mesh(new T.CylinderGeometry(r, r, h, segments), m); o.position.set(x, y, z); return o;
  };
  const tube = (points, radius, material, segments = 32) => {
    const curve = new T.CatmullRomCurve3(points.map(p => new T.Vector3(...p)));
    return mesh(new T.TubeGeometry(curve, segments, radius, 6, false), material);
  };
  const post = (x, z, low, high, wrapped = true, radius = .073) => {
    const h = high - low, profile = [];
    if (wrapped) {
      const turns = Math.max(8, Math.round(h / .013));
      profile.push(new T.Vector2(radius - .004, 0));
      for (let i = 0; i < turns; i++) {
        profile.push(new T.Vector2(radius, (i + .24) / turns * h));
        profile.push(new T.Vector2(radius + .0015, (i + .58) / turns * h));
        profile.push(new T.Vector2(radius - .004, (i + 1) / turns * h));
      }
    } else {
      profile.push(new T.Vector2(radius - .008, 0), new T.Vector2(radius, .012), new T.Vector2(radius, h - .012), new T.Vector2(radius - .008, h));
    }
    const o = mesh(new T.LatheGeometry(profile, wrapped ? 24 : 32), wrapped ? rope : woodPost); o.position.set(x, low, z);
    cylinder(radius - .004, .008, woodPost, x, low + .004, z);
    cylinder(radius - .004, .008, woodPost, x, high - .004, z);
    return o;
  };
  const pad = (x, y, z, rx, rz) => {
    const s = ellipse(x, z, rx, rz); slab(s, y, .013, cream, .021);
    const points = Array.from({ length: 65 }, (_, i) => {
      const a = i / 64 * Math.PI * 2; return [x + Math.cos(a) * (rx - .014), y + .012, z + Math.sin(a) * (rz - .014)];
    });
    tube(points, .0035, stitch, 80);
  };
  const screw = (x, y, z) => {
    cylinder(.0075, .002, hardware, x, y, z, 16);
    const o = mesh(new T.BoxGeometry(.008, .001, .0015), edge); o.position.set(x, y + .0013, z);
  };
  // Fences are flat, gently rounded plywood bands, separated by climbing openings.
  const fence = (x, z, rx, rz, platformY, small = false) => {
    const railLow = platformY + (small ? .105 : .155), railH = small ? .033 : .044;
    const arcs = small ? [[.10, 2.35], [2.72, 5.84]] : [[.12, 1.87], [2.31, 4.12], [4.58, 6.08]];
    for (const [a, b] of arcs) {
      const s = new T.Shape(); s.absellipse(x, -z, rx, rz, a, b, false, 0);
      s.absellipse(x, -z, rx - .027, rz - .027, b, a, true, 0); s.closePath();
      slab(s, railLow, railH, [oak, edge], .008);
      const n = small ? 3 : 4;
      for (let i = 0; i < n; i++) {
        const angle = a + .13 + (b - a - .26) * i / (n - 1);
        post(x + Math.cos(angle) * (rx - .013), z - Math.sin(angle) * (rz - .013), platformY + .04, railLow, false, .011);
      }
    }
  };

  // A wide base and staggered load-bearing columns support every landing.
  slab(roundedRect(1.11, .82, .16, -.02, .005), .066, .048);
  for (const x of [-.39, .35]) for (const z of [-.25, .27]) cylinder(.036, .052, edge, x, .03, z, 18);
  post(-.40, .20, .12, .566, false, .072);
  post(.25, -.11, .12, .904, true, .077);
  // The first broad kidney-shaped step reaches from its front pad to the rear white post.
  const lowStep = new T.Shape(); lowStep.moveTo(-.73, -.21);
  lowStep.bezierCurveTo(-.80, -.02, -.72, .23, -.52, .28);
  lowStep.bezierCurveTo(-.30, .32, -.11, .23, -.12, .08);
  lowStep.bezierCurveTo(-.12, -.09, -.34, -.16, -.35, -.34);
  lowStep.bezierCurveTo(-.45, -.49, -.68, -.43, -.73, -.21); lowStep.closePath();
  slab(lowStep, .568); pad(-.47, .624, .265, .24, .225);
  post(-.26, -.10, .612, .914, true, .071);
  // A petite front-right resting pad has the same curved plywood construction.
  const lowRight = ellipse(.30, .16, .282, .252); slab(lowRight, .295); pad(.33, .351, .20, .224, .193);
  // The lower main landing is one connected organic platform under the den.
  const lower = new T.Shape(); lower.moveTo(-.67, .24);
  lower.bezierCurveTo(-.88, .12, -.70, -.20, -.45, -.19);
  lower.bezierCurveTo(-.22, -.18, -.14, -.42, .21, -.43);
  lower.bezierCurveTo(.65, -.50, .81, -.18, .71, .19);
  lower.bezierCurveTo(.65, .49, .26, .49, .04, .37);
  lower.bezierCurveTo(-.19, .24, -.47, .36, -.67, .24); lower.closePath();
  slab(lower, .916); pad(-.35, .972, .015, .22, .16);
  post(-.26, -.10, .959, 1.387, true, .071);

  // A circular den with a soft floor, open entrance and a real roof peephole.
  const den = { x: .30, z: -.015, rx: .414, rz: .407, low: .96, roof: 1.471 };
  pad(den.x, .979, den.z, .332, .32);
  for (let i = 0; i < 36; i++) {
    const a = i / 36 * Math.PI * 2;
    if (Math.abs(a - Math.PI / 2) < .59) continue;
    post(den.x + Math.cos(a) * .386, den.z + Math.sin(a) * .378, den.low, den.roof, false, .0158);
  }
  const roof = ellipse(den.x, den.z, den.rx, den.rz);
  const roofOpening = new T.Path(); roofOpening.absellipse(.285, .055, .143, .133, 0, Math.PI * 2, true, 0); roof.holes.push(roofOpening);
  slab(roof, den.roof, .036);
  for (const a of [0, Math.PI, Math.PI * 1.5]) screw(den.x + Math.cos(a) * .359, 1.516, den.z + Math.sin(a) * .353);
  // An outboard middle step is connected to the left load-bearing column.
  const middle = new T.Shape(); middle.moveTo(-.74, -.20);
  middle.bezierCurveTo(-.88, -.03, -.73, .17, -.46, .21);
  middle.bezierCurveTo(-.24, .24, -.04, .14, -.085, -.015);
  middle.bezierCurveTo(-.12, -.19, -.48, -.34, -.74, -.20); middle.closePath();
  slab(middle, 1.395); pad(-.515, 1.452, .04, .242, .192);
  post(-.26, -.10, 1.438, 2.039, true, .071);

  // The small fenced landing is on its own oak column beside the den's roof opening.
  post(.30, .258, 1.515, 1.784, false, .061);
  slab(ellipse(.30, .23, .257, .22), 1.788); pad(.30, 1.841, .23, .208, .17);
  fence(.30, .23, .251, .214, 1.79, true);

  // Upper deck bends around both columns, like the reference's connected figure-eight shelf.
  const upper = new T.Shape(); upper.moveTo(-.67, .24);
  upper.bezierCurveTo(-.84, .13, -.70, -.15, -.47, -.20);
  upper.bezierCurveTo(-.22, -.25, -.03, -.38, .25, -.38);
  upper.bezierCurveTo(.61, -.40, .69, -.15, .60, .08);
  upper.bezierCurveTo(.54, .29, .16, .38, -.05, .27);
  upper.bezierCurveTo(-.31, .20, -.47, .36, -.67, .24); upper.closePath();
  slab(upper, 2.045); pad(.23, 2.10, .19, .165, .10);
  post(-.28, -.10, 2.09, 2.699, false, .068);
  post(.055, -.10, 2.09, 2.416, true, .075);
  // Tall, open three-part bed, upholstered rather than a solid white dish.
  slab(ellipse(-.30, -.10, .395, .368), 2.704); pad(-.30, 2.759, -.10, .336, .309);
  fence(-.30, -.10, .389, .362, 2.705);

  // The offset upper shelf holds a transparent concave acrylic hammock.
  const bowlDeck = ellipse(.35, -.015, .455, .353);
  const bowlHole = new T.Path(); bowlHole.absellipse(.465, .015, .297, .284, 0, Math.PI * 2, true, 0); bowlDeck.holes.push(bowlHole);
  slab(bowlDeck, 2.422, .034);
  const bowlPoints = [];
  // The floor remains gently rounded instead of ending in a sharp conical tip.
  for (let i = 0; i <= 32; i++) {
    const a = (i / 32) * Math.PI / 2;
    bowlPoints.push(new T.Vector2(.294 * Math.sin(a), -.223 * Math.cos(a)));
  }
  const bowl = mesh(new T.LatheGeometry(bowlPoints, 64), clear); bowl.position.set(.465, 2.435, -.015); bowl.scale.z = .962;
  bowl.castShadow = false; bowl.receiveShadow = false; bowl.renderOrder = 2;
  const rim = mesh(new T.TorusGeometry(.296, .009, 8, 64), clearLip); rim.rotation.x = Math.PI / 2;
  rim.position.set(.465, 2.447, -.015); rim.scale.y = .962; rim.castShadow = false; rim.renderOrder = 3;
  for (const [x, z] of [[.025, -.10], [.34, -.31], [.68, -.17]]) screw(x, 2.466, z);

  // A small wool toy hangs beneath the middle shelf, tucked clear of the climb route.
  const blush = mat('#d9b7ac', { roughness: 1 });
  tube([[-.57, 1.39, -.10], [-.58, 1.28, -.10], [-.56, 1.17, -.10]], .004, cream, 18);
  const pom = mesh(new T.SphereGeometry(.047, 24, 16), blush); pom.position.set(-.56, 1.128, -.10);
  tree.updateMatrixWorld(true);
  return { tree, focus: new T.Vector3(0, 1.46, 0), dispose() {
    tree.removeFromParent(); geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); textures.forEach(t => t.dispose());
  } };
}
