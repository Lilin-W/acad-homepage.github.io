import { buildRefinedPendant } from './gallery-refined-pendant.js';
import { createParquetTextures } from './gallery-parquet.js';
import { buildCeramicCat } from './gallery-ceramic-cat.js';

// Architecture only. Lighting, camera and the artwork collection belong to the viewer.
export function buildGalleryRoom(T, scene) {
  const root = new T.Group();
  root.name = 'Xiaoman — the bay window sitting room';
  scene.add(root);
  const geometries = new Set(), materials = new Set(), textures = new Set();
  let seed = 197;
  const random = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const material = (color, options = {}) => {
    const value = new T.MeshStandardMaterial({ color, roughness: .76, ...options });
    materials.add(value); return value;
  };
  const mesh = (geometry, mat, parent = root) => {
    geometries.add(geometry);
    const object = new T.Mesh(geometry, mat);
    object.castShadow = true; object.receiveShadow = true;
    parent.add(object); return object;
  };
  const box = (w, h, d, mat, x, y, z, parent = root) => {
    const object = mesh(new T.BoxGeometry(w, h, d), mat, parent);
    object.position.set(x, y, z); return object;
  };
  const sphere = (r, mat, x, y, z, parent = root) => {
    const object = mesh(new T.SphereGeometry(r, 20, 12), mat, parent);
    object.position.set(x, y, z); return object;
  };
  const cylinder = (top, bottom, h, mat, x, y, z, parent = root) => {
    const object = mesh(new T.CylinderGeometry(top, bottom, h, 32), mat, parent);
    object.position.set(x, y, z); return object;
  };
  const line = (points, radius, mat, parent = root) => {
    const curve = new T.CatmullRomCurve3(points.map(p => new T.Vector3(...p)));
    return mesh(new T.TubeGeometry(curve, Math.max(16, points.length * 4), radius, 8, false), mat, parent);
  };
  const rod = (a, b, radius, mat, parent = root) => {
    const start = new T.Vector3(...a), end = new T.Vector3(...b);
    const object = mesh(new T.CylinderGeometry(radius, radius, start.distanceTo(end), 12), mat, parent);
    object.position.copy(start).add(end).multiplyScalar(.5);
    object.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), end.sub(start).normalize());
    return object;
  };
  const canvasTexture = (w, h, draw) => {
    const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h;
    draw(canvas.getContext('2d'), w, h);
    const texture = new T.CanvasTexture(canvas); texture.colorSpace = T.SRGBColorSpace;
    textures.add(texture); return texture;
  };

  const plasterGrain=canvasTexture(256,256,(ctx,w,h)=>{
    let n=907;const rnd=()=>((n=(n*1664525+1013904223)>>>0)/4294967296);
    ctx.fillStyle='#999';ctx.fillRect(0,0,w,h);
    for(let i=0;i<10000;i++){ctx.fillStyle=rnd()>.5?'rgba(236,236,236,.13)':'rgba(37,37,37,.09)';ctx.fillRect(rnd()*w,rnd()*h,.7+rnd(),.7+rnd());}
  });plasterGrain.colorSpace=T.NoColorSpace;plasterGrain.wrapS=plasterGrain.wrapT=T.RepeatWrapping;plasterGrain.repeat.set(8,8);
  const ivory = material('#fff5e5', { roughness: .75 });
  const plaster = material('#f4e9d8', { roughness: .94, bumpMap:plasterGrain, bumpScale:.0008 });
  const panel = material('#ede0cc', { roughness: .82 });
  const champagne = material('#c8a778', { roughness: .43, metalness: .38 });
  const oakEdge = material('#b3916f');
  const cushion = material('#e6c1b6', { roughness: .96 });
  const cushionPiping = material('#f2d9d1', { roughness: .75 });
  const upholstery = material('#efe6d8', { roughness: .99 });
  const linen = material('#b9c3a7', { roughness: 1 });
  const blanketMat = material('#cfa89a', { roughness: 1, side: T.DoubleSide });
  const wood = material('#a5815c', { roughness: .66 });
  const porcelain = material('#f4ede3', { roughness: .24 });
  const stemMat = material('#87977b');
  const mustard = material('#c9b590', { roughness: .99 });
  const lampRed = material('#e5ceb0', { roughness: .91, side: T.DoubleSide, emissive:'#e7bd82', emissiveIntensity:.055 });
  const petalMats = ['#ead3ce', '#f4e2d5', '#d8c8df'].map(c => material(c, { roughness: .89 }));


  const parquet=createParquetTextures(T);
  const floorMat=material('#ffffff',{map:parquet.map,bumpMap:parquet.bumpMap,bumpScale:.0018,roughness:.67});
  const plan=[[-4,12],[4,12],[4,-3.5],[2.7,-3.5],[1.8,-5],[-1.8,-5],[-2.7,-3.5],[-4,-3.5]];
  const floorShape=new T.Shape();plan.forEach(([x,z],i)=>i?floorShape.lineTo(x,-z):floorShape.moveTo(x,-z));floorShape.closePath();
  const floorGeo=new T.ExtrudeGeometry(floorShape,{depth:.15,bevelEnabled:false});floorGeo.rotateX(-Math.PI/2);
  const floor=mesh(floorGeo,oakEdge);floor.position.y=-.15;
  const floorSurface=new T.ShapeGeometry(floorShape);floorSurface.rotateX(-Math.PI/2);
  const fpos=floorSurface.attributes.position,fuv=floorSurface.attributes.uv;
  for(let i=0;i<fpos.count;i++)fuv.setXY(i,(fpos.getX(i)+4)/8,(fpos.getZ(i)+5)/17);
  const floorTop=mesh(floorSurface,floorMat);floorTop.position.y=.002;
  const backWall=new T.Group();backWall.name='elliptical opening into a deep bay';root.add(backWall);
  const leftWall=new T.Group();leftWall.name='left sitting-room wall';root.add(leftWall);
  const rightWall=new T.Group();rightWall.name='right sitting-room wall';root.add(rightWall);
  box(.18,5.9,15.5,plaster,-4.09,2.95,4.25,leftWall);box(.18,5.9,15.5,plaster,4.09,2.95,4.25,rightWall);
  box(1.3,5.9,.2,plaster,-3.35,2.95,-3.60,backWall);box(1.3,5.9,.2,plaster,3.35,2.95,-3.60,backWall);
  const archShape=new T.Shape();archShape.moveTo(-2.7,5.90);archShape.lineTo(-2.7,4.75);
  for(let i=0;i<=56;i++){const a=Math.PI-i/56*Math.PI;archShape.lineTo(Math.cos(a)*2.7,4.75+Math.sin(a)*.76);}
  archShape.lineTo(2.7,5.9);archShape.closePath();
  const arch=mesh(new T.ExtrudeGeometry(archShape,{depth:.24,bevelEnabled:false}),plaster,backWall);arch.position.z=-3.65;
  for(const [r,dy,z] of [[.072,0,-3.365],[.023,.11,-3.36],[.022,-.08,-3.395]]){
    const points=[];for(let i=0;i<=56;i++){const a=Math.PI-i/56*Math.PI;points.push([Math.cos(a)*2.7,4.75+Math.sin(a)*.76+dy,z]);}line(points,r,ivory,backWall);
  }
  for(const x of [-2.735,2.735]){box(.105,4.77,.125,ivory,x,2.385,-3.40,backWall);box(.15,.12,.17,ivory,x,4.74,-3.365,backWall);}
  const ceiling=box(8.19,.15,15.5,ivory,0,5.975,4.25);ceiling.name='full high plaster ceiling';
  const bay=new T.Group();bay.name='deep three-sided bay window';root.add(bay);
  const facets=[{a:[-2.7,-3.5],b:[-1.8,-5],parts:1},{a:[-1.8,-5],b:[1.8,-5],parts:3},{a:[1.8,-5],b:[2.7,-3.5],parts:1}];
  const windowGlass=new T.MeshPhysicalMaterial({color:'#e5efdf',roughness:.12,transparent:true,opacity:.035,depthWrite:false,side:T.DoubleSide});materials.add(windowGlass);
  const facetSlab=(a,b,y,h,depth,mat,parent=bay)=>{
    const dx=b[0]-a[0],dz=b[1]-a[1],length=Math.hypot(dx,dz);
    const o=box(length,h,depth,mat,(a[0]+b[0])/2,y,(a[1]+b[1])/2,parent);o.rotation.y=-Math.atan2(dz,dx);return o;
  };
  for(const f of facets){
    facetSlab(f.a,f.b,.53,1.06,.17,panel);facetSlab(f.a,f.b,5.5,.7,.17,plaster);facetSlab(f.a,f.b,5.81,.16,.29,ivory);
    for(const y of [1.09,1.18,5.17,5.255])facetSlab(f.a,f.b,y,y===1.18?.075:.058,.19,ivory);
    for(let part=0;part<f.parts;part++){
      const l=part/f.parts,r=(part+1)/f.parts;
      const a=[f.a[0]+(f.b[0]-f.a[0])*l,f.a[1]+(f.b[1]-f.a[1])*l],b=[f.a[0]+(f.b[0]-f.a[0])*r,f.a[1]+(f.b[1]-f.a[1])*r];
      const glazed=facetSlab(a,b,3.16,3.94,.012,windowGlass);glazed.castShadow=false;glazed.receiveShadow=false;
      for(const p of [a,b]){box(.065,4.13,.105,ivory,p[0],3.185,p[1]);box(.031,4.03,.132,ivory,p[0],3.18,p[1]+.015);}
      facetSlab(a,b,2.96,.065,.10,ivory);facetSlab(a,b,3.005,.025,.13,champagne);
      const lock=new T.Group();lock.name='small brass sash latch';
      lock.position.set((a[0]+b[0])/2,3.025,(a[1]+b[1])/2+.075);
      lock.rotation.y=-Math.atan2(b[1]-a[1],b[0]-a[0]);bay.add(lock);
      box(.105,.022,.045,champagne,0,0,0,lock);
      const catchArm=mesh(new T.TorusGeometry(.030,.006,6,20,Math.PI),champagne,lock);catchArm.position.set(0,.021,.010);catchArm.rotation.x=-.45;
      for(const x of [-.035,.035]){const screw=sphere(.006,champagne,x,.013,0,lock);screw.scale.y=.30;}

      const inset=(y)=>facetSlab([a[0]+(b[0]-a[0])*.08,a[1]+(b[1]-a[1])*.08],[b[0]-(b[0]-a[0])*.08,b[1]-(b[1]-a[1])*.08],y,.023,.2,ivory);inset(.22);inset(.85);
    }
  }
  const bayCeiling=new T.Shape();bayCeiling.moveTo(-2.7,3.5);bayCeiling.lineTo(-1.8,5);bayCeiling.lineTo(1.8,5);bayCeiling.lineTo(2.7,3.5);bayCeiling.closePath();
  const bayRoofGeo=new T.ExtrudeGeometry(bayCeiling,{depth:.1,bevelEnabled:false});bayRoofGeo.rotateX(-Math.PI/2);const bayRoof=mesh(bayRoofGeo,ivory);bayRoof.position.y=5.84;
  const levels=[[.14,.11,5.78],[.10,.19,5.665],[.09,.25,5.57],[.042,.31,5.50]];
  for(const [side,wall] of [[-1,leftWall],[1,rightWall]]){
    box(.064,1.24,15.5,panel,side*3.965,.62,4.25,wall);box(.10,.115,15.5,ivory,side*3.925,1.25,4.25,wall);
    box(.13,.032,15.5,champagne,side*3.91,1.322,4.25,wall);box(.16,.20,15.5,ivory,side*3.90,.10,4.25,wall);
    for(let i=0;i<12;i++){const z=-3.5+(i+.5)*15.5/12;for(const y of [.37,.99])box(.08,.026,1.05,ivory,side*3.91,y,z,wall);for(const edge of [-1,1])box(.08,.65,.026,ivory,side*3.91,.68,z+edge*.525,wall);}
    const recessed=material('#c9bba5',{roughness:1});
    for(let i=0;i<12;i++){
      const z=-3.5+(i+.5)*15.5/12;
      for(const y of [.397,.963])box(.004,.010,1.006,recessed,side*3.959,y,z,wall);
      for(const edge of [-1,1])box(.004,.556,.010,recessed,side*3.959,.68,z+edge*.501,wall);
    }
    for(const [h,d,y] of levels)box(d,h,15.5,ivory,side*(4-d/2),y,4.25,wall);
    for(let i=0;i<77;i++)box(.055,.06,.035,ivory,side*3.74,5.47,-3.35+i*.20,wall);
    box(.05,.035,15.5,ivory,side*3.96,4.76,4.25,wall);
  }
  for(const x of [-3.35,3.35]){
    box(1.3,1.24,.08,panel,x,.62,-3.455,backWall);box(1.3,.115,.13,ivory,x,1.25,-3.425,backWall);box(1.3,.20,.15,ivory,x,.10,-3.42,backWall);
    for(const [h,d,y] of levels)box(1.3,h,d,ivory,x,y,-3.5+d/2,backWall);
  }
  const petalGeo=new T.SphereGeometry(1,8,6);geometries.add(petalGeo);
  const plasterLeaves=new T.InstancedMesh(petalGeo,ivory,480);root.add(plasterLeaves);plasterLeaves.castShadow=true;plasterLeaves.receiveShadow=true;
  let leafIndex=0;const deco=new T.Object3D();
  for(const side of [-1,1])for(let i=0;i<40;i++)for(const flip of [-1,1])for(const tier of [0,1,2]){
    deco.position.set(side*(3.78-tier*.005),5.57+Math.sin(tier*.8)*.047,-3.15+i*.385+flip*.042);deco.scale.set(.022,.075-tier*.007,.025);deco.rotation.set(flip*(.52+tier*.28),0,side*.20);deco.updateMatrix();plasterLeaves.setMatrixAt(leafIndex++,deco.matrix);
  }plasterLeaves.instanceMatrix.needsUpdate=true;
  const garden=new T.Group();garden.name='layered leafy garden outside the bay';root.add(garden);
  const skyMap=canvasTexture(64,256,(ctx,w,h)=>{const g=ctx.createLinearGradient(0,0,0,h);g.addColorStop(0,'#bdd8e7');g.addColorStop(.55,'#eef0db');g.addColorStop(1,'#c2cca5');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);});
  const skyMat=new T.MeshBasicMaterial({map:skyMap,toneMapped:false});materials.add(skyMat);
  const sky=mesh(new T.PlaneGeometry(10,8.1),skyMat,garden);sky.position.set(0,3.65,-9.2);sky.castShadow=false;sky.receiveShadow=false;
  const bark=material('#726a4c',{roughness:1});
  const treePaths=[
    [[-2.4,.1,-6.25],[-2.15,1.8,-6.24],[-2.23,3.3,-6.20],[-1.85,4.65,-6.18],[-2.02,6,-6.12]],
    [[-2.2,2.7,-6.2],[-1.4,3.6,-6.03],[-.7,4.0,-5.9],[.2,4.6,-5.9]],
    [[-2.0,4,-6.2],[-2.8,4.7,-6.2],[-3.15,5.55,-6.25]],
    [[2.5,.1,-6.0],[2.2,1.7,-6.05],[2.4,3.2,-6.15],[1.95,4.5,-6.05],[1.7,5.95,-6.15]],
    [[2.33,2.8,-6.0],[1.6,3.5,-5.82],[.9,4.15,-5.7],[.4,4.8,-5.64]],
    [[2.11,4.1,-6.04],[2.85,4.7,-6.1],[3.1,5.35,-6.25]],
    [[2.3,1.4,-6.1],[1.3,2.1,-5.9],[.5,2.5,-5.73]],
    [[-2.32,1.4,-6.2],[-1.1,2.0,-5.85],[-.5,2.7,-5.68]]
  ];treePaths.forEach((pts,i)=>line(pts.map(([x,y,z])=>[x*1.08,y,z-1.05]),i===0||i===3?.070:.027,bark,garden));
  const greens=['#708960','#91a97c','#59785a','#b7c995','#98b084','#6b906b'].map(c=>material(c,{roughness:.96,side:T.DoubleSide}));
  // Small lanceolate leaves have pointed tips and a lifted central vein.
  // Three depth layers make the foliage read as trees beyond the panes.
  const leafVertices=[],leafIndices=[];
  for(let j=0;j<=8;j++){
    const t=j/8,x=t*2-1,w=Math.pow(Math.sin(t*Math.PI),.80)*.40;
    leafVertices.push(x,-w,-.035*Math.sin(t*Math.PI),x,0,.065*Math.sin(t*Math.PI),x,w,-.035*Math.sin(t*Math.PI));
    if(j<8){const n=j*3;leafIndices.push(n,n+3,n+1,n+1,n+3,n+4,n+1,n+4,n+2,n+2,n+4,n+5);}
  }
  const foliageGeo=new T.BufferGeometry();foliageGeo.setAttribute('position',new T.Float32BufferAttribute(leafVertices,3));foliageGeo.setIndex(leafIndices);foliageGeo.computeVertexNormals();geometries.add(foliageGeo);
  const transforms=greens.map(()=>[]),foliageDummy=new T.Object3D();
  const clusters=[[-2.7,5.7],[-1.35,6.0],[.45,5.8],[2.2,5.5],[-3.0,4.2],[-1.8,4.0],[1.65,4.55],[3.1,3.75],[-2.25,2.5],[2.65,2.55],[-.75,1.65],[.8,1.95],[0,4.85]];
  for(let i=0;i<6800;i++){
    const c=clusters[i%clusters.length],x=c[0]+(random()+random()-1)*.94,y=c[1]+(random()+random()-1)*.86;
    if(x< -3.7||x>3.7||y<.35||y>6.6)continue;
    // Irregular openings between crowns preserve blue and cream sky glimpses.
    if(Math.pow((x-.10)/.60,2)+Math.pow((y-3.20)/.65,2)<1||Math.pow((x+1.08)/.36,2)+Math.pow((y-5.0)/.35,2)<1)continue;
    const size=.078+random()*.082,layer=i%3;
    foliageDummy.position.set(x,y,-6.4-layer*.64-random()*.55);
    foliageDummy.rotation.set((random()-.5)*1.4,(random()-.5)*1.55,random()*Math.PI);
    foliageDummy.scale.set(size,size,size);
    foliageDummy.updateMatrix();transforms[i%greens.length].push(foliageDummy.matrix.clone());
  }
  transforms.forEach((t,i)=>{const m=new T.InstancedMesh(foliageGeo,greens[i],t.length);t.forEach((matrix,n)=>m.setMatrixAt(n,matrix));m.instanceMatrix.needsUpdate=true;m.castShadow=true;m.receiveShadow=true;m.name='small pointed leaves in distant tree crowns';garden.add(m);});
  const roundedSlab = (w, d, h, radius, mat, x, y, z, parent = root) => {
    const s = new T.Shape(), left = -w / 2, right = w / 2, bottom = -d / 2, top = d / 2;
    s.moveTo(left + radius, bottom); s.lineTo(right - radius, bottom);
    s.quadraticCurveTo(right, bottom, right, bottom + radius); s.lineTo(right, top - radius);
    s.quadraticCurveTo(right, top, right - radius, top); s.lineTo(left + radius, top);
    s.quadraticCurveTo(left, top, left, top - radius); s.lineTo(left, bottom + radius);
    s.quadraticCurveTo(left, bottom, left + radius, bottom);
    const g = new T.ExtrudeGeometry(s, { depth: h, bevelEnabled: true, bevelSize: .025, bevelThickness: .025, bevelSegments: 3, curveSegments: 12 });
    g.rotateX(-Math.PI / 2);
    const object = mesh(g, mat, parent); object.position.set(x, y, z); return object;
  };
  const softBox = (w, h, depth, radius, mat, x, y, z, parent = root) => {
    const s = new T.Shape(), l = -w / 2, r = w / 2, b = -h / 2, t = h / 2;
    s.moveTo(l + radius, b); s.lineTo(r - radius, b); s.quadraticCurveTo(r, b, r, b + radius);
    s.lineTo(r, t - radius); s.quadraticCurveTo(r, t, r - radius, t);
    s.lineTo(l + radius, t); s.quadraticCurveTo(l, t, l, t - radius);
    s.lineTo(l, b + radius); s.quadraticCurveTo(l, b, l + radius, b);
    const bevel = Math.min(.045, depth * .23);
    const geo = new T.ExtrudeGeometry(s, { depth: depth - 2 * bevel, bevelEnabled: true, bevelSegments: 5, bevelSize: bevel, bevelThickness: bevel, curveSegments: 14 });
    geo.translate(0, 0, -depth / 2 + bevel);
    const object = mesh(geo, mat, parent); object.position.set(x, y, z); return object;
  };

  // The room follows the reference: a warm natural-oak table and light spindle chairs
  // occupy the left foreground, leaving the bay and right cat corner open.
  const walnutMap=canvasTexture(1024,512,(ctx,w,h)=>{
    ctx.fillStyle='#a07b56';ctx.fillRect(0,0,w,h);
    for(let row=0;row<5;row++){ctx.fillStyle=row%2?'rgba(209,177,130,.07)':'rgba(78,49,28,.065)';ctx.fillRect(0,row*h/5,w,h/5);ctx.fillStyle='rgba(75,49,30,.16)';ctx.fillRect(0,row*h/5,w,1);}
    for(let i=0;i<620;i++){const y=random()*h;ctx.strokeStyle='rgba('+(i%3?'91,58,32':'225,192,146')+','+(.025+random()*.07)+')';ctx.lineWidth=.35+random()*.95;ctx.beginPath();ctx.moveTo(0,y);ctx.bezierCurveTo(280,y+Math.sin(i*.34)*7,650,y+Math.sin(i*.15)*11,w,y+Math.sin(i)*4);ctx.stroke();}
    for(let knot=0;knot<5;knot++){const x=90+random()*800,y=60+random()*380;for(let j=0;j<6;j++){ctx.strokeStyle='rgba(73,48,27,'+(.08-j*.009)+')';ctx.lineWidth=.65;ctx.beginPath();ctx.ellipse(x,y,9+j*7,2+j*1.4,0,0,Math.PI*2);ctx.stroke();}}
  });
  const walnut=material('#ffffff',{map:walnutMap,roughness:.62}),walnutEdge=material('#896744',{roughness:.66}),chairWood=material('#8e704d',{roughness:.66});
  const diningTable=new T.Group();diningTable.name='long softly finished oak dining table';diningTable.position.set(-1.6,0,2.4);root.add(diningTable);
  const diningTop=roundedSlab(1.70,3.70,.075,.22,walnut,0,.952,0,diningTable);
  const dtp=diningTop.geometry.attributes.position,dtu=diningTop.geometry.attributes.uv;
  for(let i=0;i<dtp.count;i++)dtu.setXY(i,(dtp.getZ(i)+1.85)/3.70,(dtp.getX(i)+.85)/1.70);
  roundedSlab(1.64,3.64,.036,.20,walnutEdge,0,.922,0,diningTable);
  for(const x of [-.70,.70])box(.095,.16,3.28,walnutEdge,x,.852,0,diningTable);
  for(const z of [-1.59,1.59])box(1.40,.16,.095,walnutEdge,0,.852,z,diningTable);
  for(const x of [-.68,.68])for(const z of [-1.54,1.54]){
    const leg=mesh(new T.CylinderGeometry(.065,.045,.85,4),walnutEdge,diningTable);leg.rotation.y=Math.PI/4;leg.position.set(x,.445,z);
    box(.115,.18,.115,walnutEdge,x,.78,z,diningTable);cylinder(.047,.053,.045,walnutEdge,x,.039,z,diningTable);
  }
  const bowlMat=material('#b09064',{roughness:.6,metalness:.08});
  const bowlProfile=[[.05,0],[.16,.022],[.27,.070],[.33,.13],[.32,.145],[.27,.105],[.14,.043],[.05,.023]].map(p=>new T.Vector2(...p));
  const fruitBowl=mesh(new T.LatheGeometry(bowlProfile,40),bowlMat,diningTable);fruitBowl.position.set(-.05,1.05,-.30);fruitBowl.scale.set(1.25,.78,1);
  const lemonMat=material('#d9b951',{roughness:.65});
  for(const [x,y,z,rot]of[[-.18,1.15,-.31,.8],[.02,1.18,-.36,-.4],[.20,1.15,-.29,.5],[-.07,1.23,-.18,-.6],[.06,1.24,-.48,.4]]){
    const lemon=sphere(.11,lemonMat,x,y,z,diningTable);lemon.scale.set(1.38,.88,.90);lemon.rotation.y=rot;
  }
  const ceramic=buildCeramicCat(T);
  const ceramicCat=ceramic.root;
  ceramicCat.position.set(.05,1.052,.88);ceramicCat.rotation.y=.10;
  diningTable.add(ceramicCat);
  const wovenMap=canvasTexture(256,256,(ctx,w,h)=>{
    ctx.fillStyle='#decbb0';ctx.fillRect(0,0,w,h);
    for(let i=0;i<64;i++){ctx.fillStyle=i%2?'rgba(237,220,175,.30)':'rgba(94,75,43,.14)';ctx.fillRect(i*4,0,1,h);ctx.fillRect(0,i*4,w,1);}
  });wovenMap.wrapS=wovenMap.wrapT=T.RepeatWrapping;wovenMap.repeat.set(2,2);
  const woven=material('#ffffff',{map:wovenMap,roughness:1});
  const bench=new T.Group();bench.name='six slender spindle-back dining chairs';root.add(bench);
  const diningChairs=[];
  const makeChair=(x,z,yaw)=>{
    const chair=new T.Group();chair.name='hand-shaped spindle dining chair';chair.position.set(x,0,z);chair.rotation.y=yaw;bench.add(chair);diningChairs.push(chair);
    roundedSlab(.64,.66,.052,.15,chairWood,0,.525,0,chair);roundedSlab(.54,.56,.020,.12,woven,0,.573,.01,chair);
    for(const sx of [-1,1])for(const sz of [-1,1])rod([sx*.24,.535,sz*.245],[sx*.31,.045,sz*.315],.025,chairWood,chair);
    rod([-.29,.24,.28],[.29,.24,.28],.015,chairWood,chair);rod([-.29,.23,-.28],[.29,.23,-.28],.015,chairWood,chair);rod([0,.23,-.28],[0,.24,.28],.014,chairWood,chair);
    line([[-.30,.56,-.265],[-.34,.87,-.31],[-.30,1.16,-.32],[-.16,1.29,-.335],[0,1.31,-.34],[.16,1.29,-.335],[.30,1.16,-.32],[.34,.87,-.31],[.30,.56,-.265]],.030,chairWood,chair);
    line([[-.29,.73,-.28],[0,.75,-.32],[.29,.73,-.28]],.021,chairWood,chair);
    for(let i=0;i<5;i++){const sx=(i-2)*.106,top=1.268-Math.pow(sx/.32,2)*.07;line([[sx,.573,-.235],[sx*.99,.86,-.305],[sx*.90,top,-.332]],.012,chairWood,chair);}
    return chair;
  };
  for(const z of [1.18,3.31]){makeChair(-2.94,z,Math.PI/2);makeChair(-.255,z,-Math.PI/2);}
  makeChair(-1.60,.09,0);makeChair(-1.60,4.66,Math.PI);
  const coffeeTable=diningTable;
  // A flat woven rectangle replaces the earlier soft oval rug.
  const rugMap=canvasTexture(768,1024,(ctx,w,h)=>{
    ctx.fillStyle='#e5d8c0';ctx.fillRect(0,0,w,h);
    for(let i=0;i<1024;i++){ctx.fillStyle=i%2?'rgba(252,243,218,.13)':'rgba(87,73,46,.11)';ctx.fillRect(0,i,w,1);}
    for(let i=0;i<384;i++){ctx.fillStyle=i%2?'rgba(255,241,207,.15)':'rgba(96,77,44,.07)';ctx.fillRect(i*2,0,1,h);}
    ctx.strokeStyle='#baaa90';ctx.lineWidth=6;ctx.strokeRect(18,18,w-36,h-36);ctx.strokeStyle='#ebe2ce';ctx.lineWidth=7;ctx.strokeRect(30,30,w-60,h-60);
    ctx.fillStyle='#a6947b';for(let r=0;r<8;r++)for(let c=0;c<5;c++){const x=75+c*151,y=89+r*122;ctx.fillRect(x-3,y-3,6,6);ctx.fillRect(x+7,y-3,6,6);ctx.fillRect(x-3,y+7,6,6);ctx.fillRect(x+7,y+7,6,6);}
  });
  const rugMat=material('#ffffff',{map:rugMap,roughness:1});
  const rug=new T.Group();rug.name='rectangular natural woven dining rug';rug.position.set(-1.58,.008,2.39);root.add(rug);
  const rugPlane=mesh(new T.PlaneGeometry(4.05,5.62),rugMat,rug);rugPlane.rotation.x=-Math.PI/2;rugPlane.position.y=.009; rugPlane.castShadow=false;
  const fringeGeo=new T.BoxGeometry(.010,.005,.075);geometries.add(fringeGeo);const fringes=new T.InstancedMesh(fringeGeo,upholstery,160);rug.add(fringes);
  const fringeDummy=new T.Object3D();for(let i=0;i<160;i++){const end=i<80?-1:1;fringeDummy.position.set(-1.98+(i%80)*.050,.008,end*2.838);fringeDummy.rotation.y=Math.sin(i*2.3)*.09;fringeDummy.updateMatrix();fringes.setMatrixAt(i,fringeDummy.matrix);}fringes.instanceMatrix.needsUpdate=true;fringes.receiveShadow=true;
  const seatMap=canvasTexture(512,512,(ctx,w,h)=>{
    ctx.fillStyle='#d8b9a5';ctx.fillRect(0,0,w,h);
    for(let i=0;i<16;i++){ctx.fillStyle=i%2?'#b4776c':'#debeb0';ctx.fillRect(i*32,0,32,h);ctx.fillStyle='rgba(92,50,43,.20)';ctx.fillRect(i*32+2,0,2,h);ctx.fillStyle='rgba(255,239,214,.44)';ctx.fillRect(i*32+27,0,2,h);}
    for(let i=0;i<5000;i++){ctx.fillStyle='rgba(96,65,50,'+(random()*.06)+')';ctx.fillRect(random()*w,random()*h,1,2);}
  });seatMap.wrapS=seatMap.wrapT=T.RepeatWrapping;seatMap.repeat.set(1,1);
  const stripe=material('#ffffff',{map:seatMap,roughness:1});
  const windowSeat=new T.Group();windowSeat.name='striped seat beneath the bay window';root.add(windowSeat);
  const seatPlan=[[-2.48,-3.63],[-1.73,-4.86],[1.73,-4.86],[2.48,-3.63]];
  const seatShape=new T.Shape();seatPlan.forEach(([x,z],i)=>i?seatShape.lineTo(x,-z):seatShape.moveTo(x,-z));seatShape.closePath();
  const seatBaseGeo=new T.ExtrudeGeometry(seatShape,{depth:.70,bevelEnabled:false});seatBaseGeo.rotateX(-Math.PI/2);
  const seatBase=mesh(seatBaseGeo,ivory,windowSeat);seatBase.position.y=.10;
  const seatTopGeo=new T.ExtrudeGeometry(seatShape,{depth:.18,bevelEnabled:true,bevelSize:.055,bevelThickness:.035,bevelSegments:4});seatTopGeo.rotateX(-Math.PI/2);
  const seatPos=seatTopGeo.attributes.position,seatUv=seatTopGeo.attributes.uv;
  for(let i=0;i<seatPos.count;i++)seatUv.setXY(i,(seatPos.getX(i)+2.55)/5.1,(seatPos.getZ(i)+4.95)/1.45);
  const seatTop=mesh(seatTopGeo,stripe,windowSeat);seatTop.position.y=.84;
  for(const x of [-1.65,0,1.65]){for(const y of [.24,.66])box(1.45,.025,.035,ivory,x,y,-3.607,windowSeat);for(const e of [-1,1])box(.027,.445,.035,ivory,x+e*.725,.45,-3.607,windowSeat);}
  box(5.03,.078,.11,ivory,0,.81,-3.585,windowSeat);
  const seatPillows=[[-1.12,1.27,-4.60,.16,mustard],[0,1.23,-4.61,-.10,cushion],[1.05,1.29,-4.59,-.14,linen]];
  for(const [x,y,z,a,mat] of seatPillows){const p=softBox(.73,.55,.18,.10,mat,x,y,z,windowSeat);p.rotation.set(-.14,a,a);}
  for(const [x,a] of [[-1.74,.40],[1.63,-.40]]){const bolster=cylinder(.155,.155,.62,stripe,x,1.18,-4.02,windowSeat);bolster.rotation.z=Math.PI/2;bolster.rotation.y=a;const end=sphere(.13,cushionPiping,x+.30*Math.cos(a),1.18,-4.02-.30*Math.sin(a),windowSeat);end.scale.set(.13,1,1);}

  const boucleMap=canvasTexture(512,512,(ctx,w,h)=>{
    ctx.fillStyle='#888888';ctx.fillRect(0,0,w,h);
    for(let i=0;i<16000;i++){
      const x=random()*w,y=random()*h,r=.45+random()*1.3;
      ctx.strokeStyle=i%3?'rgba(237,237,237,.32)':'rgba(45,45,45,.28)';
      ctx.lineWidth=.6;ctx.beginPath();ctx.ellipse(x,y,r,r*.68,random()*Math.PI,0,Math.PI*2);ctx.stroke();
    }
  });boucleMap.colorSpace=T.NoColorSpace;boucleMap.wrapS=boucleMap.wrapT=T.RepeatWrapping;boucleMap.repeat.set(3,2);
  const chairFabric=material('#e4d6bd',{roughness:1,bumpMap:boucleMap,bumpScale:.0035}),chairSeam=material('#cbb99b',{roughness:1});
  const puff=(w,h,d,x,y,z,parent,mat=chairFabric)=>{
    const geo=new T.SphereGeometry(1,36,24),pos=geo.attributes.position;
    for(let i=0;i<pos.count;i++){const sx=pos.getX(i),sy=pos.getY(i),sz=pos.getZ(i);pos.setXYZ(i,Math.sign(sx)*Math.pow(Math.abs(sx),.53)*w/2,Math.sign(sy)*Math.pow(Math.abs(sy),.56)*h/2,Math.sign(sz)*Math.pow(Math.abs(sz),.53)*d/2);}
    geo.computeVertexNormals();const o=mesh(geo,mat,parent);o.position.set(x,y,z);return o;
  };
  const armchair=new T.Group();armchair.name='soft oatmeal boucle reading armchair';armchair.position.set(2.35,0,.12);armchair.rotation.y=-.19;root.add(armchair);
  puff(1.16,.37,1.12,0,.31,0,armchair);puff(.92,.22,.91,0,.54,.10,armchair);
  const backPuff=puff(1.10,.72,.34,0,.90,-.39,armchair);backPuff.rotation.x=-.13;
  for(const x of [-.51,.51]){puff(.27,.57,1.09,x,.64,.005,armchair);const roll=puff(.29,.21,1.04,x,.875,.015,armchair);roll.rotation.z=x<0?-.06:.06;}
  for(const [x,a]of[[-.18,-.12],[.17,.16]]){const p=puff(.43,.43,.20,x,.81,-.025,armchair,material('#e9d7bc',{roughness:1,bumpMap:boucleMap,bumpScale:.003}));p.rotation.set(-.17,0,a);}
  for(const x of [-.39,.39])for(const z of [-.36,.38])cylinder(.034,.027,.18,walnutEdge,x,.095,z,armchair);
  const seamPoints=[];for(let i=0;i<=64;i++){const a=i/64*Math.PI*2;seamPoints.push([Math.sign(Math.cos(a))*Math.pow(Math.abs(Math.cos(a)),.48)*.455,.576,Math.sign(Math.sin(a))*Math.pow(Math.abs(Math.sin(a)),.48)*.445+.10]);}line(seamPoints,.006,chairSeam,armchair);
  for(const x of [-.51,.51])line([[x-.04,.47,.535],[x-.08,.71,.54],[x,.86,.545],[x+.08,.72,.54],[x+.04,.47,.535]],.006,chairSeam,armchair);
  // A quiet woven throw softens the reading chair's manufactured edges.
  const throwMat=material('#ccb494',{roughness:1,bumpMap:boucleMap,bumpScale:.0018,side:T.DoubleSide});
  const folds=[[.02,.65],[.29,.67],[.40,.86],[.52,.965],[.64,.84],[.69,.63],[.73,.39]];
  const foldPath=new T.CatmullRomCurve3(folds.map(([x,y])=>new T.Vector3(x,y,0)));
  const tp=[],tu=[],ti=[],cols=28,rows=42;
  const clothPoint=(u,v)=>{
    const q=foldPath.getPoint(v),ripple=Math.sin(u*Math.PI*7+v*.6)*(.006+v*.009);
    return new T.Vector3(q.x+ripple*(v>.5?1:.2),q.y+ripple*(v>.5?.2:1),-.10+u*.53+Math.sin(v*3.8)*.011);
  };
  for(let j=0;j<=rows;j++)for(let i=0;i<=cols;i++){
    const u=i/cols,v=j/rows,q=clothPoint(u,v);tp.push(q.x,q.y,q.z);tu.push(u,v);
    if(j<rows&&i<cols){const a=j*(cols+1)+i,b=a+cols+1;ti.push(a,a+1,b,a+1,b+1,b);}
  }
  const tg=new T.BufferGeometry();tg.setAttribute('position',new T.Float32BufferAttribute(tp,3));tg.setAttribute('uv',new T.Float32BufferAttribute(tu,2));tg.setIndex(ti);tg.computeVertexNormals();
  const throwMesh=mesh(tg,throwMat,armchair);throwMesh.name='soft woven throw draped over the armrest';
  const stitched=material('#e3ccb0',{roughness:1});
  for(const u of [.025,.975]){const pts=[];for(let j=0;j<=42;j++){const q=clothPoint(u,j/42);q.x+=.0015;q.y+=.0015;pts.push(q.toArray());}line(pts,.0015,stitched,armchair);}
  for(let i=0;i<27;i++){const q=clothPoint((i+.5)/27,1);line([q.toArray(),[q.x+.003,q.y-.025,q.z+.002],[q.x+.008,q.y-.051+Math.sin(i)*.005,q.z+.002]],.0017,stitched,armchair);}
  const lampTable=new T.Group();lampTable.name='linen-shaded ceramic lamp beside the bay';lampTable.position.set(-2.92,0,-1.8);root.add(lampTable);
  cylinder(.35,.35,.055,wood,0,.76,0,lampTable);cylinder(.042,.057,.64,wood,0,.40,0,lampTable);cylinder(.24,.27,.08,wood,0,.06,0,lampTable);
  const lampBaseMat=material('#a17b58',{roughness:.36,metalness:.04});
  const lampProfile=[[.15,0],[.13,.045],[.07,.09],[.085,.19],[.12,.29],[.09,.39],[.046,.43]].map(p=>new T.Vector2(...p));
  const lampBase=mesh(new T.LatheGeometry(lampProfile,32),lampBaseMat,lampTable);lampBase.position.y=.79;rod([0,1.17,0],[0,1.45,0],.022,champagne,lampTable);
  const shadeGeo=new T.CylinderGeometry(.23,.36,.43,64,1,true),shadePos=shadeGeo.attributes.position;
  for(let i=0;i<shadePos.count;i++){const x=shadePos.getX(i),z=shadePos.getZ(i),a=Math.atan2(z,x),s=1+Math.cos(a*32)*.025;shadePos.setX(i,x*s);shadePos.setZ(i,z*s);}shadeGeo.computeVertexNormals();
  const shade=mesh(shadeGeo,lampRed,lampTable);shade.position.y=1.45;
  for(const [r,y]of[[.235,1.665],[.365,1.235]]){const rim=mesh(new T.TorusGeometry(r,.008,6,48),champagne,lampTable);rim.rotation.x=Math.PI/2;rim.position.y=y;}

  const rightLampTable=new T.Group();rightLampTable.name='warm linen lamp and oak side table beside the armchair';rightLampTable.position.set(3.48,0,.30);root.add(rightLampTable);
  roundedSlab(.69,.74,.048,.045,walnut,0,.765,0,rightLampTable);
  box(.58,.095,.60,walnutEdge,0,.695,0,rightLampTable);
  for(const x of [-.245,.245])for(const z of [-.27,.27])rod([x,.69,z],[x*1.10,.035,z*1.1],.026,walnutEdge,rightLampTable);
  roundedSlab(.55,.59,.022,.035,walnutEdge,0,.235,0,rightLampTable);
  for(const child of lampTable.children.slice(3)){rightLampTable.add(child.clone(true));}
  const pendantModel=buildRefinedPendant(T);
  const pendant=pendantModel.root;pendant.position.set(0,5.9,1.15);root.add(pendant);
  return {
    root,floor,backWall,leftWall,rightWall,ceiling,bay,bench,coffeeTable,diningTable,diningChairs,ceramicCat,rug,windowSeat,armchair,lampTable,rightLampTable,garden,pendant,
    windowFocus:[0,2.7,-4.0],bounds:{min:[-5,-.45,-9.2],max:[5,7.7,12]},interiorBounds:{min:[-4,0,-5],max:[4,5.9,12]},
    dispose(){pendantModel.dispose();ceramic.dispose();parquet.dispose();root.removeFromParent();for(const g of geometries)g.dispose();for(const m of materials)m.dispose();for(const t of textures)t.dispose();}
  };
}
