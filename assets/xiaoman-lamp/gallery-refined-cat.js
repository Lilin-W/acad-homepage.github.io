// A small, softly sculpted silver-white cat, asleep on her real infinity scratcher.
// The fur is continuous coloured geometry: no painted forehead stripes or stacked cheek balls.
export function buildSleepingCat(T, parent) {
  const cat = new T.Group(); cat.name = 'Xiaoman curled up on her infinity scratcher';
  cat.userData.homeView = 'sunny'; parent.add(cat);
  const geometries = new Set(), materials = new Set(), textures = new Set();
  let seed = 619;
  const random = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const mat = (color, extra = {}) => {
    const m = new T.MeshStandardMaterial({ color, roughness: .92, ...extra });
    materials.add(m); return m;
  };
  const add = (geometry, material, group = cat, name = '') => {
    geometries.add(geometry);
    const m = new T.Mesh(geometry, material); m.name = name;
    m.castShadow = true; m.receiveShadow = true; group.add(m); return m;
  };
  const texture = (size, draw) => {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = size;
    draw(canvas.getContext('2d'), size);
    const t = new T.CanvasTexture(canvas); t.colorSpace = T.SRGBColorSpace;
    t.wrapS = t.wrapT = T.RepeatWrapping; textures.add(t); return t;
  };
  const kraftMap = texture(512, (c, size) => {
    c.fillStyle = '#bb9870'; c.fillRect(0, 0, size, size);
    for (let y = 0; y < size; y += 5) {
      c.fillStyle = y % 10 ? '#d2b38a' : '#c7a57c'; c.fillRect(0, y, size, 3);
      c.fillStyle = 'rgba(99,74,43,.27)'; c.fillRect(0, y + 3, size, 1);
      for (let x = 0; x < size; x += 6) {
        c.strokeStyle = 'rgba(116,86,48,.24)'; c.lineWidth = .65; c.beginPath();
        c.moveTo(x, y + 3); c.quadraticCurveTo(x + 3, y - 1, x + 6, y + 3); c.stroke();
      }
    }
    for (let i = 0; i < 6000; i++) {
      c.fillStyle = random() < .5 ? 'rgba(252,228,188,.15)' : 'rgba(97,69,36,.13)';
      c.fillRect(random() * size, random() * size, .6 + random() * 1.2, .6);
    }
  });
  kraftMap.repeat.set(1.75, 1.2);
  const cardboard = mat('#fff3dc', { map: kraftMap, bumpMap: kraftMap, bumpScale: .0016, roughness: .97 });
  const whiteRim = mat('#f8f5ed', { roughness: .53 });
  const furHeight = texture(512, (c,n) => {
    c.fillStyle='#909090'; c.fillRect(0,0,n,n);
    for(let i=0;i<3200;i++){
      const x=random()*n,y=random()*n,length=3+random()*14;
      c.strokeStyle=`rgba(214,214,214,${.12+random()*.22})`;c.lineWidth=.45+random()*.55;
      c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+random()*3-1.5,y+length*.45,x+random()*2-1,y+length);c.stroke();
    }
  });
  const fur = mat('#ffffff', { vertexColors: true, roughness: 1, bumpMap:furHeight,bumpScale:.0012 });
  const warmWhite = mat('#f9f6ed', { roughness: 1 });
  const whiskerWhite = mat('#eee8dc', { roughness: .95 });
  const lidMat = mat('#8c8176', { roughness: 1 });
  const noseMat = mat('#d7a09a', { roughness: .74 });
  const paleNose = mat('#eed3c9', { roughness: .9 });
  const white = new T.Color('#fcfaf4'), silver = new T.Color('#b7b5b0');
  const clamp = (n, low = 0, high = 1) => Math.min(high, Math.max(low, n));
  const smooth = (low, high, v) => { const x = clamp((v - low) / (high - low)); return x * x * (3 - 2 * x); };

  // The actual two openings pass all the way through the board. Broad white rims are separate
  // bevelled pieces, leaving the fluted kraft paper visible across the curved sleeping surface.
  const boardProfile = () => {
    const shape = new T.Shape();
    shape.moveTo(-.835, .075);
    shape.bezierCurveTo(-.955, .23, -.875, .49, -.66, .452);
    shape.bezierCurveTo(-.39, .405, -.285, .285, 0, .282);
    shape.bezierCurveTo(.285, .285, .39, .405, .66, .452);
    shape.bezierCurveTo(.875, .49, .955, .23, .835, .075);
    shape.bezierCurveTo(.701, -.021, .482, .017, .272, .115);
    shape.bezierCurveTo(.092, .202, -.092, .202, -.272, .115);
    shape.bezierCurveTo(-.482, .017, -.701, -.021, -.835, .075); shape.closePath();
    const left = new T.Path(); left.moveTo(-.746, .121);
    left.bezierCurveTo(-.591, .065, -.42, .17, -.205, .235);
    left.bezierCurveTo(-.43, .27, -.609, .403, -.735, .334);
    left.bezierCurveTo(-.826, .285, -.824, .174, -.746, .121); left.closePath();
    const right = new T.Path(); right.moveTo(.746, .121);
    right.bezierCurveTo(.824, .174, .826, .285, .735, .334);
    right.bezierCurveTo(.609, .403, .43, .27, .205, .235);
    right.bezierCurveTo(.42, .17, .591, .065, .746, .121); right.closePath();
    shape.holes.push(left, right); return shape;
  };
  const board = new T.Group(); board.name = 'rounded white infinity scratcher with corrugated kraft core'; cat.add(board);
  const core = add(new T.ExtrudeGeometry(boardProfile(), { depth: .626, bevelEnabled: true,
    bevelSize: .008, bevelThickness: .008, bevelSegments: 3, curveSegments: 40 }), cardboard, board);
  core.position.z = -.313;
  const rimGeometry = new T.ExtrudeGeometry(boardProfile(), { depth: .028, bevelEnabled: true,
    bevelSize: .010, bevelThickness: .008, bevelSegments: 4, curveSegments: 40 });
  for (const z of [-.349, .321]) { const rim = add(rimGeometry, whiteRim, board); rim.position.z = z; }
  const footMat = mat('#c8b9a4', { roughness: 1 });
  const footGeo = new T.SphereGeometry(1, 16, 10);
  for (const x of [-.696, .696]) {
    const foot = add(footGeo, footMat, board); foot.position.set(x, .018, 0); foot.scale.set(.098, .017, .274);
  }

  // A compact, continuous sleeping silhouette with a flattened belly and rounded haunch.
  const kitty = new T.Group(); kitty.name = 'softly sleeping silver-white Xiaoman'; cat.add(kitty);
  const sculpt = (name, radii, position, shaper, tint, group = kitty, detail = [64, 44]) => {
    const geo = new T.SphereGeometry(1, ...detail), p = geo.attributes.position, colors = [];
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      const theta = Math.atan2(z, x), phi = Math.acos(clamp(y, -1, 1));
      const longFur = .004 * Math.sin(theta * 17 + phi * 7) * Math.sin(phi) + .003 * Math.sin(theta * 29 - phi * 11) * Math.sin(phi) + .002 * Math.sin(theta * 11 + phi * 19) * Math.sin(phi);
      const v = shaper ? shaper(x, y, z) : [x, y, z];
      p.setXYZ(i, v[0] * radii[0] * (1 + longFur), v[1] * radii[1] * (1 + longFur), v[2] * radii[2] * (1 + longFur));
      const c = white.clone().lerp(silver, clamp(tint ? tint(x, y, z, theta, phi) : 0, 0, .7));
      colors.push(c.r, c.g, c.b);
    }
    geo.setAttribute('color', new T.Float32BufferAttribute(colors, 3)); geo.computeVertexNormals();
    const m = add(geo, fur, group, name); m.position.set(...position); return m;
  };
  sculpt('compact relaxed haunch and curved back', [.456, .251, .269], [.133, .558, -.048],
    (x, y, z) => [x * (1 + .03 * x), (y < -.55 ? -.55 + (y + .55) * .46 : y) * (1 + .035 * x), z * (1 - .06 * x)],
    (x, y, z) => .44 * smooth(.10, .85, y) * smooth(-.1, .5, -z) + .19 * smooth(.35, .9, x));
  sculpt('continuous chest beneath the soft ruff',[.245,.195,.225],[-.177,.516,.087],(x,y,z)=>[x,y<-.5?-.5+(y+.5)*.6:y,z],(x,y,z)=>.045+.11*smooth(.0,.9,-z),kitty,[48,32]);

  // Tapered tail loft: a single soft crescent wraps around the outside of the hindquarters.
  const loft = (points, radiusAt, material, name, group = kitty, along = 54, around = 12, tintAt = null) => {
    const curve = new T.CatmullRomCurve3(points.map(p => new T.Vector3(...p)));
    const frames = curve.computeFrenetFrames(along, false), positions = [], normals = [], uvs = [], indices = [], colors = [];
    for (let i = 0; i <= along; i++) {
      const t = i / along, center = curve.getPointAt(t), rr = radiusAt(t);
      for (let j = 0; j <= around; j++) {
        const a = j / around * Math.PI * 2;
        const n = frames.normals[i].clone().multiplyScalar(Math.cos(a)).addScaledVector(frames.binormals[i], Math.sin(a));
        const pp = center.clone().addScaledVector(n, rr);
        positions.push(pp.x, pp.y, pp.z); normals.push(n.x, n.y, n.z); uvs.push(t, j / around);
        const color = white.clone().lerp(silver, tintAt ? tintAt(t, a) : .08); colors.push(color.r, color.g, color.b);
        if (i < along && j < around) { const k = i * (around + 1) + j; indices.push(k, k + 1, k + around + 1, k + 1, k + around + 2, k + around + 1); }
      }
    }
    const geo = new T.BufferGeometry(); geo.setAttribute('position', new T.Float32BufferAttribute(positions, 3));
    geo.setAttribute('normal', new T.Float32BufferAttribute(normals, 3)); geo.setAttribute('uv', new T.Float32BufferAttribute(uvs, 2));
    geo.setAttribute('color', new T.Float32BufferAttribute(colors, 3)); geo.setIndex(indices);
    return add(geo, material, group, name);
  };
  loft([[.374,.553,-.135],[.550,.485,-.08],[.586,.423,.120],[.428,.383,.280],[.202,.359,.310],[.056,.375,.282]],
    t => (.128 - .082 * smooth(.46, 1, t)) * Math.pow(Math.sin(Math.PI * (.05 + t * .90)), .13),
    fur, 'one plume of tail curled beside her paws', kitty, 64, 16,
    (t,a) => .20 + .34 * smooth(.38, .98, t) + .05 * Math.sin(a * 3 + t * 8));
  loft([[-.205,.530,.112],[-.278,.458,.189],[-.365,.420,.257]],t=>.079-.015*t,fur,'near foreleg naturally tucked beneath the head',kitty,24,12,()=>.04);
  loft([[-.098,.498,.139],[-.106,.443,.208],[-.174,.412,.262]],t=>.070-.012*t,fur,'far foreleg joining its mitten',kitty,24,12,()=>.025);

  // Two broad front mittens touch the board, with shallow toe divisions. The legs blend into
  // the chest; their ends sit beside each other instead of pointing in unrelated directions.
  const pawTint = (x,y,z) => .07 * smooth(.1,.8,y) * smooth(.0,.8,-z);
  sculpt('near front paw', [.178, .070, .105], [-.388,.397,.272],
    (x,y,z) => [x, y < -.4 ? -.4 + (y+.4)*.4 : y, z], pawTint, kitty, [40,26]);
  sculpt('far front paw', [.165, .064, .097], [-.171,.386,.266],
    (x,y,z) => [x, y < -.4 ? -.4 + (y+.4)*.4 : y, z], pawTint, kitty, [40,26]);
  const strand = (points, radius, material, group, name = '') => {
    const curve = new T.CatmullRomCurve3(points.map(p => new T.Vector3(...p)));
    const m = add(new T.TubeGeometry(curve, 16, radius, 5, false), material, group, name); m.castShadow = false; return m;
  };
  const toeMat = mat('#d3c9bb', { roughness: 1 });
  for (const [cx, cy, cz] of [[-.388,.397,.272],[-.171,.386,.266]]) {
    for (const x of [-.037,.026]) strand([[cx+x,cy+.008,cz+.102],[cx+x-.003,cy+.027,cz+.098],[cx+x-.005,cy+.035,cz+.088]], .00115, toeMat, kitty);
  }

  const head = new T.Group(); head.name = 'broad fluffy cheeks and a sleepy little face';
  head.position.set(-.304,.606,.084); head.rotation.set(-.035,-.095,-.075); head.scale.set(1.20,1.10,1.12); kitty.add(head);
  // Cheek width, eye plane, nose bridge and paired muzzle pads belong to this one sculpt.
  // The low forehead and partly hidden ears give her a round long-haired outline.
  sculpt('continuous round face and ruff', [.263,.207,.190], [0,0,0], (x,y,z) => {
    const cheekBand = Math.exp(-Math.pow((y+.14)/.54,2));
    const front = smooth(.05,.80,z);
    const muzzle = .080 * Math.exp(-Math.pow((Math.abs(x)-.235)/.27,2)-Math.pow((y+.31)/.25,2));
    return [x*(1+.10*cheekBand), y*(y<0 ? .94 : 1), z*(1-.045*front) + front*muzzle];
  }, (x,y,z,a,p) => {
    const crown = smooth(.20,.92,y) * (.43 + .23 * smooth(.05,.65,-z));
    const feathering = .76+.24*Math.sin(a*9+p*3)*Math.sin(a*7-p*2);
    return crown*feathering + .09*smooth(.52,.9,Math.abs(x))*smooth(.2,.7,-z);
  }, head, [80,56]);

  // Small rounded sculpted ears. Most of each base disappears into the fur crown.
  for (const side of [-1,1]) {
    const ear = new T.Group(); ear.position.set(side*.160,.129,-.069); ear.scale.set(.85,.61,.96); ear.rotation.z = side*-.20; head.add(ear);
    const shape = new T.Shape(); shape.moveTo(-.075,0);
    shape.bezierCurveTo(-.071,.063,-.038,.161,-.013,.170);
    shape.bezierCurveTo(.018,.184,.054,.073,.073,.008);
    shape.quadraticCurveTo(0,-.027,-.075,0);
    const earGeometry = new T.ExtrudeGeometry(shape,{depth:.043,bevelEnabled:true,bevelSize:.017,bevelThickness:.016,bevelSegments:5,curveSegments:24});
    const ep = earGeometry.attributes.position, ec = [];
    for(let i=0;i<ep.count;i++) { const c=white.clone().lerp(silver,.10+.38*smooth(.02,.17,ep.getY(i))); ec.push(c.r,c.g,c.b); }
    earGeometry.setAttribute('color',new T.Float32BufferAttribute(ec,3));
    const e=add(earGeometry,fur,ear,'small silver tipped ear'); e.position.z=-.028;
    const innerGeometry = new T.ShapeGeometry(shape,24);
    const inner=add(innerGeometry,paleNose,ear);inner.scale.set(.52,.64,1);inner.position.set(0,.024,.033);
    sculpt('soft fur over ear base',[.073,.048,.045],[0,.027,.032],null,()=>.05,ear,[32,22]);
  }

  // Short three-dimensional locks drape over the coat. Every lock is a tapered sweep
  // rooted within the underlying sculpt, with a soft flattened cross-section and no flat cards.
  const furLock=(start,mid,end,radius,shade,group=kitty)=>{
    const lock=loft([start,mid,end],t=>radius*(1-.96*Math.pow(t,.85)),fur,'a soft lock of long fur',group,8,6,
      t=>shade*(.38+.62*t));
    lock.castShadow=false; return lock;
  };
  // Two nested rows at each cheek form a broad ruff, and fall down rather than spike sideways.
  for(const side of [-1,1]) for(let row=0;row<2;row++) for(let i=0;i<10;i++) {
    const t=i/9, a=.04+t*.88, x=Math.cos(a)*(.257-row*.016), y=.098-Math.sin(a)*.233;
    const z=.053+row*.031, len=.022+random()*.013;
    furLock([side*(x-.016),y+.030,z-.020],[side*(x+.008),y+.008,z+.004],
      [side*(x+.010),y-len,z+.012],.004+random()*.002,.025+row*.008,head);
  }
  // Fine swept temple/crown strands leave the white central forehead uninterrupted.
  for(let side of [-1,1])for(let i=0;i<13;i++) {
    const t=i/12,x=side*(.032+t*.193),y=.183-.029*t,z=-.023+.039*t;
    furLock([x,y-.019,z-.012],[x+side*.008,y+.006,z],[x+side*.019,y-.009,z+.018],.003,.16+.07*t,head);
  }
  // Keep the coat continuous; fine surface fibres provide texture without rows of protruding locks.
  sculpt('rounded end of her silver tail',[.039,.040,.039],[.056,.375,.282],null,()=>.46,kitty,[24,16]);

  // A barely curved pair of lids, a tiny coral nose, and a short unobtrusive philtrum.
  // Everything is deliberately small relative to the wide soft face.
  for(const side of [-1,1]) {
    strand([[side*.052,.030,.176],[side*.098,.017,.178],[side*.151,.032,.157]],.0035,lidMat,head,'gently closed eyelid');
    strand([[side*.056,.035,.176],[side*.104,.026,.176],[side*.145,.039,.157]],.0021,warmWhite,head);
  }
  const noseShape=new T.Shape();noseShape.moveTo(-.023,.008);
  noseShape.bezierCurveTo(-.019,.017,.020,.017,.023,.008);
  noseShape.quadraticCurveTo(.016,-.008,0,-.014);noseShape.quadraticCurveTo(-.016,-.008,-.023,.008);
  const nose=add(new T.ExtrudeGeometry(noseShape,{depth:.004,bevelEnabled:true,bevelSize:.0035,bevelThickness:.003,bevelSegments:3,curveSegments:16}),noseMat,head,'tiny rose pink nose');
  nose.position.set(0,-.045,.195);
  strand([[0,-.058,.198],[0,-.071,.197],[.011,-.075,.193]],.00135,lidMat,head);
  for(const side of [-1,1]) for(let i=0;i<3;i++) {
    const yy=-.072-i*.013;
    strand([[side*.062,yy,.189],[side*.162,yy+.008-i*.003,.213],[side*.290,yy+.032-i*.025,.174]],.00105,whiskerWhite,head,'fine relaxed whisker');
  }

  // Very soft local contact shades make the belly, board and floor meet without heavy outlines.
  const shadowMap=texture(128,(c,n)=>{const g=c.createRadialGradient(n/2,n/2,0,n/2,n/2,n/2);g.addColorStop(0,'rgba(99,74,51,.34)');g.addColorStop(.55,'rgba(99,74,51,.15)');g.addColorStop(1,'rgba(99,74,51,0)');c.fillStyle=g;c.fillRect(0,0,n,n);});
  const shadowMat=new T.MeshBasicMaterial({map:shadowMap,transparent:true,depthWrite:false,opacity:.52});materials.add(shadowMat);
  const floorShade=add(new T.PlaneGeometry(1.9,.82),shadowMat,cat,'soft contact with the floor');floorShade.rotation.x=-Math.PI/2;floorShade.position.y=.004;floorShade.castShadow=false;floorShade.receiveShadow=false;
  const bellyShade=add(new T.PlaneGeometry(1.14,.49),shadowMat,cat,'soft contact below the sleeping coat');bellyShade.rotation.x=-Math.PI/2;bellyShade.position.set(.02,.298,.018);bellyShade.castShadow=false;bellyShade.receiveShadow=false;

  cat.updateMatrixWorld(true);
  const focus=new T.Vector3(-.035,.49,.025);
  return {cat,focus,dispose(){cat.removeFromParent();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());}};
}