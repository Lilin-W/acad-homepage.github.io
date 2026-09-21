import * as T from 'three';
import { RoomEnvironment } from './vendor/RoomEnvironment.js';
import { createHangingMotion, resetHangingMotion, stepHangingMotion } from './drag-inertia.js?v=gentle-1';

const $ = id => document.getElementById(id);
const stage = $('stage');
const OWNER=document.documentElement.dataset.editor==='local';
const HERO=document.documentElement.dataset.presentation==='hero';
const desiredPixelRatio=()=>Math.min(HERO?Math.max(devicePixelRatio,2):devicePixelRatio,2);
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let rotating = !reduced.matches, windy = false, night = false, selected = null;
let photos = ['avatar_xiaoman.jpg','keyboard.jpg','wink.jpg','xiaoman.jpg','cute.jpg','jump.jpg'].map((file,i)=>({id:`default-${i}`,src:`../../images/${file}`,title:['小满的正式肖像','键盘上的监督员','送你一个 wink','有自己的小主意','今天也很可爱','腾空的小小瞬间'][i]}));
const status = text => $('status').textContent = text;
photos = Array.from({length:16},(_,i)=>({...photos[i],id:`slot-${i}`,slot:i,title:photos[i]?.title||`第 ${i+1} 个位置`}));
const objectUrls = new Map();
let renderer;
try { renderer = new T.WebGLRenderer({antialias:true,alpha:true}); }
catch { $('loading').textContent=HERO?'Unable to start 3D. Please enable hardware acceleration in your browser.':'当前设备无法启动 3D 渲染，请尝试开启浏览器硬件加速。'; throw new Error('WebGL unavailable'); }
renderer.setPixelRatio(desiredPixelRatio());
renderer.shadowMap.enabled=true; renderer.shadowMap.type=T.VSMShadowMap;
renderer.toneMapping=T.ACESFilmicToneMapping; renderer.toneMappingExposure=.95;
stage.appendChild(renderer.domElement);
renderer.domElement.setAttribute('aria-label',HERO?'3D carousel with hanging photos, pink paw charms and fish charms':'立体木马、悬挂相框、粉色猫爪与鱼干挂饰');
const scene=new T.Scene();
const camera=new T.PerspectiveCamera(34,1,.1,80);
const pmrem=new T.PMREMGenerator(renderer);
const room=new RoomEnvironment(); const env=pmrem.fromScene(room,.04);
scene.environment=env.texture; scene.environmentIntensity=.8; room.dispose();pmrem.dispose();
let heroAtmosphere=null;
if(HERO){
 try { const {createHeroAtmosphere}=await import('./hero-atmosphere.js?v=depth-1');heroAtmosphere=createHeroAtmosphere({renderer,environment:env.texture}); }
 catch(error){console.warn('Hero decorations unavailable',error);}
 renderer.autoClear=false;
}
const hemi=new T.HemisphereLight(0xfff3dc,0x967d70,2.1);scene.add(hemi);
const key=new T.DirectionalLight(0xffe6c5,3.3);key.position.set(-4,8,5);key.castShadow=true;
key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-5;key.shadow.camera.right=5;key.shadow.camera.top=7;key.shadow.camera.bottom=-5;key.shadow.normalBias=.025;key.shadow.bias=-.0002;key.shadow.radius=5;key.shadow.blurSamples=8;scene.add(key);
const fill=new T.DirectionalLight(0xd5e6ff,1.7);fill.position.set(5,4,-4);scene.add(fill);
const warm=new T.PointLight(0xffc879,0,8,2);warm.position.set(0,4.4,0);scene.add(warm);
const ground=new T.Mesh(new T.PlaneGeometry(200,200),new T.ShadowMaterial({color:0x5e4434,opacity:.16}));ground.rotation.x=-Math.PI/2;ground.position.y=-.015;ground.receiveShadow=true;scene.add(ground);
const model=new T.Group();scene.add(model);
const porcelain=new T.MeshPhysicalMaterial({color:0xfff4dd,roughness:.24,metalness:.02,clearcoat:.7,clearcoatRoughness:.25});
const blush=new T.MeshPhysicalMaterial({color:0xdba8a5,roughness:.32,metalness:.12,clearcoat:.6});
const darkPink=new T.MeshStandardMaterial({color:0xad7180,roughness:.4});
const gold=new T.MeshStandardMaterial({color:0xc29a55,metalness:.78,roughness:.26});
const champagne=new T.MeshStandardMaterial({color:0xe6c99a,metalness:.65,roughness:.3});
const maneMat=new T.MeshPhysicalMaterial({color:0xcbb293,metalness:.15,roughness:.34,clearcoat:.5});
const bulbMat=new T.MeshStandardMaterial({color:0xffecd0,emissive:0xffc16e,emissiveIntensity:.4,roughness:.25});
const eyeMat=new T.MeshStandardMaterial({color:0x302724,roughness:.22});
function mesh(geo,mat,parent=model,x=0,y=0,z=0){const m=new T.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function ball(parent,mat,x,y,z,sx,sy=sx,sz=sx){const m=mesh(new T.SphereGeometry(1,40,28),mat,parent,x,y,z);m.scale.set(sx,sy,sz);return m;}
function cyl(parent,r1,r2,h,y,mat){return mesh(new T.CylinderGeometry(r1,r2,h,96),mat,parent,0,y,0);}
function ring(parent,r,t,y,mat){const m=mesh(new T.TorusGeometry(r,t,12,128),mat,parent,0,y,0);m.rotation.x=Math.PI/2;return m;}
function tube(parent,points,r,mat){const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));const segments=Math.min(512,Math.max(64,Math.ceil(curve.getLength()*70),points.length*2));return mesh(new T.TubeGeometry(curve,segments,r,12,false),mat,parent);}
function smoothProfile(points,count=160){const curve=new T.CatmullRomCurve3(points.map(([r,y])=>new T.Vector3(r,y,0)),false,'centripetal');return curve.getPoints(count).map(p=>new T.Vector2(Math.max(0,p.x),p.y));}
function rod(parent,a,b,r,mat){const start=new T.Vector3(...a),end=new T.Vector3(...b),delta=end.clone().sub(start);const m=mesh(new T.CylinderGeometry(r,r,delta.length(),12),mat,parent);m.position.copy(start.add(end).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),delta.normalize());return m;}
const pedestal=new T.Group();pedestal.scale.set(1,.72,1);model.add(pedestal);
// A shallow circular plinth with a single pink band and fine gold piping.
cyl(pedestal,2.19,2.22,.10,.09,champagne);
cyl(pedestal,2.19,2.19,.32,.30,blush);
cyl(pedestal,2.18,2.20,.12,.52,porcelain);
ring(pedestal,2.18,.016,.585,champagne);ring(pedestal,2.20,.016,.145,champagne);
const spindle=new T.Group();spindle.scale.set(.8,.9611099,.8);spindle.position.y=-.16471894;model.add(spindle);
// Three architectural tiers: framed lower drum, enamel belt, and fluted neck.
const columnProfile=[[.62,.65],[.62,.75],[.54,.84],[.49,1.0],[.49,2.48],[.57,2.54],[.57,2.66],[.50,2.73],[.48,3.30],[.53,3.36],[.53,3.48],[.425,3.56],[.425,4.30],[.49,4.40],[.72,4.61],[.99,4.76],[.99,4.79]];
mesh(new T.LatheGeometry(smoothProfile(columnProfile,192),128),porcelain,spindle);
const insetMat=new T.MeshPhysicalMaterial({color:0xdacdd5,roughness:.31,metalness:.08,clearcoat:.65});
for(const [r,y,h] of [[.61,.74,.08],[.566,2.6,.09],[.525,3.42,.08],[.44,4.32,.055]]){
 cyl(spindle,r,r,h,y,blush);ring(spindle,r,.012,y-h/2,gold);ring(spindle,r,.015,y+h/2,champagne);
}
ring(spindle,.99,.023,4.77,champagne);
for(let i=0;i<8;i++){
 const a=i*Math.PI/4,p=new T.Group();p.position.set(.492*Math.sin(a),0,.492*Math.cos(a));p.rotation.y=a;spindle.add(p);
 const arch=new T.Shape();arch.moveTo(-.125,1.02);arch.lineTo(.125,1.02);arch.lineTo(.125,2.19);arch.quadraticCurveTo(.125,2.36,0,2.38);arch.quadraticCurveTo(-.125,2.36,-.125,2.19);arch.closePath();
 mesh(new T.ShapeGeometry(arch,24),insetMat,p);
 const border=arch.getPoints(48).map(p=>[p.x,p.y,.012]);border.push(border[0]);tube(p,border,.011,champagne);
 for(const x of [-.165,.165]){rod(p,[x,.98,-.01],[x,2.43,-.01],.014,porcelain);ball(p,champagne,x,2.40,.005,.023,.017,.018);}
 ball(p,champagne,0,2.27,.025,.033,.022,.01);
 // Shallow draped relief around the middle belt.
 const swag=[];for(let j=0;j<=16;j++){const t=j/16,b=a+t*Math.PI/4;swag.push([.491*Math.sin(b),2.98-.09*Math.sin(Math.PI*t),.491*Math.cos(b)]);}tube(spindle,swag,.012,blush);
 const rib=columnProfile.filter(p=>p[1]>=4.40).map(([r,y])=>[(r+.01)*Math.sin(a),y,(r+.01)*Math.cos(a)]);tube(spindle,rib,.009,champagne);
}
for(let i=0;i<32;i++){const a=i*Math.PI/16;rod(spindle,[.432*Math.sin(a),3.60,.432*Math.cos(a)],[.432*Math.sin(a),4.25,.432*Math.cos(a)],.008,i%4===0?champagne:blush);}
for(const [r,y] of [[.57,2.64],[.53,3.47]])for(let i=0;i<24;i++){const a=i*Math.PI/12;ball(spindle,bulbMat,r*Math.sin(a),y,r*Math.cos(a),.012);}
// Concave radial canopy and a flared, solid cornice; all lower structure stays fixed.
const roof=new T.Group();roof.position.y=1.26;roof.scale.set(1.1,1,1.1);model.add(roof);
const canopyLights=[];
function smallLamp(parent,x,y,z,r=.019,halo=.12){ball(parent,bulbMat,x,y,z,r);canopyLights.push({parent,x,y,z,halo});}
const canopyRadius=2.16,canopyRimY=3.44,canopyRise=canopyRadius*roof.scale.x*.46;
const canopyApex=canopyRimY+canopyRise,fasciaBottom=3.105;
// The inward curve exists only in the vertical radial section, never between ribs.
const canopyY=u=>canopyRimY+canopyRise*(1-u-.60*u*(1-u));
const roofPanelCount=16,roofPanelStep=Math.PI*2/roofPanelCount;
for(let panel=0;panel<roofPanelCount;panel++){
 const start=panel*roofPanelStep,vertices=[],normals=[],indices=[],radial=48,angular=32;
 for(let j=0;j<=radial;j++)for(let k=0;k<=angular;k++){
  const u=j/radial,a=start+k/angular*roofPanelStep,r=canopyRadius*u,slope=canopyRise*(-1.60+1.20*u)/canopyRadius;
  vertices.push(r*Math.sin(a),canopyY(u),r*Math.cos(a));
  const n=new T.Vector3(-slope*Math.sin(a),1,-slope*Math.cos(a)).normalize();normals.push(n.x,n.y,n.z);
  if(j<radial&&k<angular){const q=j*(angular+1)+k,next=q+angular+1;indices.push(q,next,q+1,q+1,next,next+1);}
 }
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(vertices,3));g.setAttribute('normal',new T.Float32BufferAttribute(normals,3));g.setIndex(indices);mesh(g,panel%2?blush:porcelain,roof);
 const rib=[];for(let j=1;j<=64;j++){const u=j/64;rib.push([canopyRadius*u*Math.sin(start),canopyY(u)+.009,canopyRadius*u*Math.cos(start)]);}tube(roof,rib,.009,champagne);
 if(panel%2===0)for(let j=1;j<=10;j++){const u=j/11;smallLamp(roof,canopyRadius*u*Math.sin(start),canopyY(u)+.02,canopyRadius*u*Math.cos(start),.017,.105);}
}
// An outward sweep in section gives the valance its projecting cornice profile.
const corniceCount=16,corniceStep=Math.PI*2/corniceCount,scallopDepth=.115;
const upper=t=>canopyRimY+.035+scallopDepth*Math.pow(Math.cos(Math.PI*t),2);
const lower=t=>fasciaBottom+.027*Math.pow(Math.cos(Math.PI*t),2);
const fasciaRadius=s=>2.16+.25*s+.050*Math.sin(Math.PI*s);
const surfaceRadius=(t,y)=>fasciaRadius(T.MathUtils.clamp((y-lower(t))/(upper(t)-lower(t)),0,1));
for(let panel=0;panel<corniceCount;panel++){
 const start=panel*corniceStep,vertices=[],indices=[],topLine=[],topInlay=[],bottomLine=[],bottomInlay=[],steps=64,sectionSteps=12,sectionSize=2*(sectionSteps+1);
 const point=(t,y,r)=>{const a=start+t*corniceStep;return [r*Math.sin(a),y,r*Math.cos(a)];};
 for(let j=0;j<=steps;j++){
  const t=j/steps,hi=upper(t),lo=lower(t);
  for(let k=0;k<=sectionSteps;k++){const s=k/sectionSteps;vertices.push(...point(t,lo+(hi-lo)*s,fasciaRadius(s)));}
  for(let k=sectionSteps;k>=0;k--){const s=k/sectionSteps;vertices.push(...point(t,lo+(hi-lo)*s,fasciaRadius(s)-.045));}
  topLine.push(point(t,hi,fasciaRadius(1)));topInlay.push(point(t,hi-.032,surfaceRadius(t,hi-.032)+.003));
  bottomLine.push(point(t,lo,fasciaRadius(0)));bottomInlay.push(point(t,lo+.027,surfaceRadius(t,lo+.027)+.003));
  if(j<steps){const q=j*sectionSize;for(let k=0;k<sectionSize;k++){const n=(k+1)%sectionSize;indices.push(q+k,q+sectionSize+k,q+n,q+n,q+sectionSize+k,q+sectionSize+n);}}
 }
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(vertices,3));g.setIndex(indices);g.computeVertexNormals();mesh(g,blush,roof);
 tube(roof,topLine,.016,champagne);tube(roof,topInlay,.008,porcelain);tube(roof,bottomLine,.012,champagne);tube(roof,bottomInlay,.005,porcelain);
 // Closed shoulder joins the fixed roof rim to the inner face of the outward flare.
 const shoulder=[],shoulderIndices=[];
 for(let j=0;j<=steps;j++){
  const t=j/steps,y=canopyRimY-.008;shoulder.push(...point(t,y,canopyRadius-.005),...point(t,y,surfaceRadius(t,y)-.04));
  if(j<steps){const q=j*2;shoulderIndices.push(q,q+1,q+2,q+2,q+1,q+3);}
 }
 const shoulderGeo=new T.BufferGeometry();shoulderGeo.setAttribute('position',new T.Float32BufferAttribute(shoulder,3));shoulderGeo.setIndex(shoulderIndices);shoulderGeo.computeVertexNormals();mesh(shoulderGeo,panel%2?blush:porcelain,roof);
 for(let j=1;j<7;j++){
  const t=j/7;
  for(const [y,size,halo] of [[upper(t)-.085,.020,.11],[lower(t)+.063,.016,.085]])smallLamp(roof,...point(t,y,surfaceRadius(t,y)+.008),size,halo);
 }
 // Broad curved porcelain pilaster with three evenly spaced pearl lamps.
 const strapVertices=[],strapIndices=[],strapSteps=32,strapEdges=[[],[]];
 for(let j=0;j<=strapSteps;j++){
  const s=j/strapSteps,y=lower(0)+(upper(0)-lower(0))*s,r=fasciaRadius(s),halfAngle=(.053+.006*s)/r;
  for(const [radius,angle] of [[r-.004,start-halfAngle],[r+.020,start-halfAngle],[r+.020,start+halfAngle],[r-.004,start+halfAngle]])strapVertices.push(radius*Math.sin(angle),y,radius*Math.cos(angle));
  for(let side=0;side<2;side++){const a=start+(side?1:-1)*halfAngle;strapEdges[side].push([(r+.023)*Math.sin(a),y,(r+.023)*Math.cos(a)]);}
  if(j<strapSteps){const q=j*4;for(let k=0;k<4;k++){const n=(k+1)%4;strapIndices.push(q+k,q+n,q+4+k,q+n,q+4+n,q+4+k);}}
 }
 strapIndices.push(0,2,1,0,3,2);const cap=strapSteps*4;strapIndices.push(cap,cap+1,cap+2,cap,cap+2,cap+3);
 const strapGeometry=new T.BufferGeometry();strapGeometry.setAttribute('position',new T.Float32BufferAttribute(strapVertices,3));strapGeometry.setIndex(strapIndices);strapGeometry.computeVertexNormals();mesh(strapGeometry,porcelain,roof);
 strapEdges.forEach(edge=>tube(roof,edge,.006,champagne));
 for(const s of [.22,.5,.78]){const y=lower(0)+(upper(0)-lower(0))*s;smallLamp(roof,...point(0,y,fasciaRadius(s)+.040),.023,.095);}
 smallLamp(roof,...point(0,upper(0)+.038,fasciaRadius(1)),.041,.23);
}
// Sixteen pink-and-cream interior fans align with the exterior roof sectors.
// The inner edge overlaps the existing column capital; the outer edge meets the eave.
const interiorY=r=>3.08+.045*Math.pow(1-T.MathUtils.clamp((r-.60)/1.55,0,1),2);
for(let panel=0;panel<roofPanelCount;panel++){
 const start=panel*roofPanelStep,vertices=[],indices=[],radial=24,angular=24;
 for(let j=0;j<=radial;j++)for(let k=0;k<=angular;k++){
  const r=.60+1.55*j/radial,a=start+roofPanelStep*k/angular;
  vertices.push(r*Math.sin(a),interiorY(r),r*Math.cos(a));
  if(j<radial&&k<angular){const q=j*(angular+1)+k,n=q+angular+1;indices.push(q,q+1,n,q+1,n+1,n);}
 }
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(vertices,3));g.setIndex(indices);g.computeVertexNormals();
 mesh(g,panel%2?blush:porcelain,roof);
 const seam=[];for(let j=0;j<=32;j++){const r=.70+1.45*j/32;seam.push([r*Math.sin(start),interiorY(r)-.006,r*Math.cos(start)]);}tube(roof,seam,.006,champagne);
}
// The upper row nestles directly below the column/ceiling intersection.
// Its bulb tops clear the soffit; the lower row follows the column's foot.
for(const [r,y] of [[.922,4.707],[.642,.69]])for(let i=0;i<32;i++){
 const a=i*Math.PI/16;
 smallLamp(spindle,r*Math.sin(a),y,r*Math.cos(a),.020,.105);
}
cyl(roof,.055,.10,.05,canopyApex+.005,champagne);smallLamp(roof,0,canopyApex+.11,0,.105,.50);
for(let i=0;i<64;i++){const a=i*Math.PI/32;smallLamp(pedestal,2.203*Math.sin(a),.30,2.203*Math.cos(a),.023,.14);}
const glowCanvas=document.createElement('canvas');glowCanvas.width=128;glowCanvas.height=128;
const glowContext=glowCanvas.getContext('2d');const glowGradient=glowContext.createRadialGradient(64,64,0,64,64,64);
glowGradient.addColorStop(0,'rgba(255,229,177,1)');glowGradient.addColorStop(.15,'rgba(255,201,119,.5)');glowGradient.addColorStop(1,'rgba(255,183,75,0)');glowContext.fillStyle=glowGradient;glowContext.fillRect(0,0,128,128);
const glowTexture=new T.CanvasTexture(glowCanvas);
const glowMaterial=new T.SpriteMaterial({map:glowTexture,transparent:true,opacity:0,depthWrite:false,blending:T.AdditiveBlending});

for(const {parent,x,y,z,halo} of canopyLights){const glow=new T.Sprite(glowMaterial);glow.position.set(x,y,z);glow.scale.setScalar(halo);parent.add(glow);}
const lampCore=ball(roof,bulbMat,0,3.07,0,.18,.1,.18);
// Suspended four-point lanterns, between the photo strings.
const starLanterns=[];
const starLightMat=new T.MeshStandardMaterial({color:0xfff3d9,emissive:0xffdc99,emissiveIntensity:.25,roughness:.28});
const starShape=new T.Shape();starShape.moveTo(0,.23);starShape.quadraticCurveTo(.045,.05,.16,0);starShape.quadraticCurveTo(.04,-.045,0,-.23);starShape.quadraticCurveTo(-.04,-.045,-.16,0);starShape.quadraticCurveTo(-.045,.05,0,.23);
for(let i=0;i<6;i++){
 const a=(i*2+.5)*Math.PI/6+.08,pivot=new T.Group();pivot.position.set(2.29*Math.sin(a),4.40,2.29*Math.cos(a));pivot.rotation.order='YXZ';pivot.rotation.y=a;model.add(pivot);
 const length=[.36,.80,.50,.95,.43,.72][i];rod(pivot,[0,0,0],[0,-length+.21,0],.0045,champagne);
 const pendant=new T.Group();pendant.position.y=-length;pendant.scale.setScalar(i%2?.72:.9);pivot.add(pendant);
 const rim=new T.ExtrudeGeometry(starShape,{depth:.025,bevelEnabled:true,bevelSegments:3,bevelSize:.008,bevelThickness:.008,steps:1,curveSegments:18});rim.translate(0,0,-.0125);mesh(rim,champagne,pendant);
 const face=new T.ExtrudeGeometry(starShape,{depth:.04,bevelEnabled:true,bevelSegments:3,bevelSize:.004,bevelThickness:.005,steps:1,curveSegments:18});face.translate(0,0,-.02);const lamp=mesh(face,starLightMat,pendant);lamp.scale.set(.86,.86,1);
 const halo=new T.Sprite(new T.SpriteMaterial({map:glowTexture,color:0xffdfab,transparent:true,opacity:0,depthWrite:false,blending:T.AdditiveBlending}));halo.scale.setScalar(.8);pendant.add(halo);
 starLanterns.push({pivot,pendant,halo,phase:i*1.7,motion:createHangingMotion(length,i*1.7,.12)});
}
// Ground stardust and suspended lights, batched in one transparent draw call.
let sparkleFade=0;
const starCount=720, starPositions=new Float32Array(starCount*3), starSeeds=new Float32Array(starCount), starSizes=new Float32Array(starCount), starAir=new Float32Array(starCount);
let randomState=51819;
function starRandom(){randomState=(Math.imul(randomState,1664525)+1013904223)>>>0;return randomState/4294967296;}
for(let i=0;i<starCount;i++){
 const air=i>=500,angle=starRandom()*Math.PI*2;
 const radius=air?1.85+starRandom()*1.15:2.16+Math.pow(starRandom(),1.6)*1.09;
 starPositions[i*3]=Math.sin(angle)*radius;starPositions[i*3+1]=air?.5+starRandom()*4.9:.025+starRandom()*.055;starPositions[i*3+2]=Math.cos(angle)*radius;
 starSeeds[i]=starRandom()*30;starSizes[i]=air?.045+starRandom()*.12:.025+starRandom()*.105;starAir[i]=air?1:0;
}
const starGeometry=new T.BufferGeometry();starGeometry.setAttribute('position',new T.BufferAttribute(starPositions,3));starGeometry.setAttribute('seed',new T.BufferAttribute(starSeeds,1));starGeometry.setAttribute('starSize',new T.BufferAttribute(starSizes,1));starGeometry.setAttribute('air',new T.BufferAttribute(starAir,1));
const starMaterial=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,uniforms:{uTime:{value:0},uFade:{value:0},uScale:{value:1000}},
 vertexShader:`attribute float seed;attribute float starSize;attribute float air;uniform float uTime;uniform float uScale;varying float vSeed;varying float vTwinkle;
 void main(){vec3 p=position;p.x+=air*sin(uTime*.19+seed)*.18;p.z+=air*cos(uTime*.16+seed)*.14;p.y+=air*sin(uTime*.28+seed)*.16;vec4 view=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*view;gl_PointSize=clamp(starSize*uScale/max(1.,-view.z),2.,48.);vSeed=seed;vTwinkle=.28+.72*pow(.5+.5*sin(uTime*(.65+fract(seed)*.9)+seed*4.),3.);}`,
 fragmentShader:`uniform float uFade;varying float vSeed;varying float vTwinkle;
 void main(){vec2 p=gl_PointCoord-.5;float r=length(p);float glow=exp(-r*r*25.)*.32;float core=exp(-r*r*230.);float cross=(exp(-abs(p.x)*105.)*exp(-abs(p.y)*8.)+exp(-abs(p.y)*105.)*exp(-abs(p.x)*8.))*.55;float shape=glow+core+cross*step(.58,fract(vSeed));float edge=1.-smoothstep(.34,.5,r);vec3 color=mix(vec3(1.,.76,.43),vec3(.66,.79,1.),step(.65,fract(vSeed*1.7)));color=mix(color,vec3(1.,.70,.81),step(.86,fract(vSeed*2.3)));gl_FragColor=vec4(color,shape*edge*vTwinkle*uFade);}`});
const starField=new T.Points(starGeometry,starMaterial);starField.frustumCulled=false;starField.visible=false;scene.add(starField);
const poolMaterial=new T.MeshBasicMaterial({map:glowTexture,color:0xe0b1d1,transparent:true,opacity:0,depthWrite:false,blending:T.AdditiveBlending});
const lightPool=new T.Mesh(new T.PlaneGeometry(6.5,6.5),poolMaterial);lightPool.rotation.x=-Math.PI/2;lightPool.position.y=.012;scene.add(lightPool);

// Sculpted ceramic horses: rounded bodies, tapered curved limbs and relief tack.
function horse(){
 const h=new T.Group();
 ball(h,porcelain,-.08,.88,0,.54,.28,.22);
 ball(h,porcelain,.3,1.03,0,.27,.39,.19);
 const neck=ball(h,porcelain,.43,1.29,0,.18,.38,.145);neck.rotation.z=-.4;
 const head=ball(h,porcelain,.63,1.53,0,.255,.135,.135);head.rotation.z=-.3;
 ball(h,porcelain,.79,1.44,0,.16,.105,.12);
 for(const z of [-.09,.09]){const ear=ball(h,porcelain,.53,1.73,z,.045,.135,.035);ear.rotation.z=.15;ball(h,darkPink,.548,1.742,z+.006,.018,.07,.023);ball(h,eyeMat,.685,1.567,z>0?.122:-.122,.025);}
 ball(h,maneMat,.31,1.4,0,.095,.31,.16);
 for(let i=0;i<9;i++)tube(h,[[.38-i*.025,1.64-i*.047,-.12],[.25-i*.028,1.55-i*.045,-.17],[.31-i*.028,1.42-i*.045,-.16]],.025,maneMat);
 for(const z of [-.15,.15]){
   const front=z>0?[[.29,.8,z],[.51,.6,z],[.66,.72,z],[.81,.53,z]]:[[.3,.81,z],[.41,.49,z],[.52,.25,z],[.64,.23,z]];
   const back=z>0?[[-.44,.86,z],[-.63,.57,z],[-.57,.34,z],[-.76,.24,z]]:[[-.4,.8,z],[-.26,.49,z],[-.41,.22,z],[-.53,.21,z]];
   for(const points of [front,back]){tube(h,points,.058,porcelain);const p=points.at(-1);ball(h,gold,p[0],p[1]-.025,p[2],.086,.06,.066);}
 }
 tube(h,[[-.51,1,0],[-.77,1.02,0],[-.84,.73,.03],[-1.0,.54,.04],[-.96,.37,.02]],.085,maneMat);
 for(let i=0;i<4;i++)tube(h,[[-.59,.98,.05+i*.025],[-.76,.89,.065+i*.02],[-.82,.57,.09+i*.01],[-.98,.42,.04+i*.015]],.015,champagne);
 ball(h,darkPink,-.04,1.105,0,.3,.055,.255);ball(h,blush,-.045,1.16,0,.21,.05,.19);
 tube(h,[[-.29,1.07,.205],[-.19,.86,.22],[.03,.79,.22],[.24,1.04,.205]],.017,gold);
 for(const z of [-.137,.137]){tube(h,[[.59,1.64,z],[.66,1.46,z],[.82,1.36,z]],.012,gold);tube(h,[[.76,1.4,z],[.48,1.1,z*1.4],[.19,1.06,z*1.4]],.012,gold);}
 // Small paired ceramic wings, with raised overlapping feather lobes.
 for(const side of [-1,1]){
  const wing=new T.Group();wing.position.set(.08,1.02,side*.245);wing.rotation.y=side*.22;wing.scale.setScalar(.82);h.add(wing);
  const outline=new T.Shape();outline.moveTo(.075,-.035);
  outline.bezierCurveTo(-.08,-.08,-.25,.015,-.34,.15);
  outline.bezierCurveTo(-.43,.29,-.44,.44,-.39,.49);
  outline.bezierCurveTo(-.30,.43,-.17,.34,-.06,.28);
  outline.bezierCurveTo(.06,.20,.15,.065,.075,-.035);
  const shape=new T.ExtrudeGeometry(outline,{depth:.045,bevelEnabled:true,bevelSegments:5,bevelSize:.025,bevelThickness:.023,steps:1,curveSegments:36});shape.translate(0,0,-.0225);mesh(shape,porcelain,wing);
  // Rounded feathers overlap like small sculpted porcelain leaves.
  for(let j=0;j<5;j++){
   const x0=.025-j*.040,y0=.022+j*.012,x1=-.40+j*.083,y1=.475-j*.055;
   const dx=x1-x0,dy=y1-y0,length=Math.hypot(dx,dy);
   const feather=ball(wing,porcelain,(x0+x1)/2,(y0+y1)/2,side*(.044+j*.001),.030-j*.002,length/2,.023);
   feather.rotation.z=-Math.atan2(dx,dy);
  }
  ball(wing,porcelain,.005,.035,side*.05,.100,.082,.045);
  tube(wing,[[.047,-.013,side*.085],[-.06,.025,side*.084],[-.17,.095,side*.075]],.006,champagne);
 }
 // One little ceramic rosette on each side of the saddle.
 for(const side of [-1,1]){
  for(let j=0;j<5;j++){const a=j*Math.PI*2/5;ball(h,blush,-.1+Math.cos(a)*.055,1.045+Math.sin(a)*.055,side*.246,.035,.035,.018);}
  ball(h,champagne,-.1,1.045,side*.267,.021,.021,.012);
 }
 return h;
}
const horses=[];
for(let i=0;i<3;i++){
 const a=i*Math.PI*2/3;const station=new T.Group();station.position.set(Math.sin(a)*1.4,.475,Math.cos(a)*1.4);station.rotation.y=a;model.add(station);
 rod(station,[0,0,0],[0,3.945,0],.026,champagne);ball(station,gold,0,.15,0,.07,.1,.07);
 const h=horse();h.scale.setScalar(.87);h.position.y=.24;station.add(h);horses.push(h);
}
const frames=[], strings=[];let photoGeneration=0;
function openPhoto(photo){if(!photo.src){startEditor(photo.slot);return;}selected=photo;$('full-photo').src=photo.src;$('full-photo').alt=photo.title;$('photo-title').textContent=photo.title;$('remove').hidden=!OWNER;$('viewer').showModal();}
function disposeGroup(group){group.traverse(o=>{if(o.isMesh){o.geometry.dispose();if(o.userData.photoMaterial){o.material.map?.dispose();o.material.dispose();}}});model.remove(group);}
const paper=new T.MeshStandardMaterial({color:0xfffaf0,roughness:.82});
const beads=[blush,porcelain,maneMat,champagne];
const pawPink=blush;
function pawCharm(parent){
 const charm=new T.Group();charm.scale.setScalar(.78);parent.add(charm);
 // Four oval toe pads and a softly scalloped, single-piece central pad.
 const pad=new T.Shape();
 pad.moveTo(0,-.092);
 pad.bezierCurveTo(.038,-.092,.038,-.133,.064,-.15);
 pad.bezierCurveTo(.086,-.165,.116,-.18,.108,-.212);
 pad.bezierCurveTo(.099,-.251,.052,-.248,0,-.234);
 pad.bezierCurveTo(-.052,-.248,-.099,-.251,-.108,-.212);
 pad.bezierCurveTo(-.116,-.18,-.086,-.165,-.064,-.15);
 pad.bezierCurveTo(-.038,-.133,-.038,-.092,0,-.092);
 // Wrap the outline around a domed volume instead of flat extruded faces.
 const outline=pad.getSpacedPoints(96).slice(0,-1), vertices=[],indices=[],rings=28,n=outline.length;
 for(let j=0;j<=rings;j++){
  const theta=Math.PI*j/rings,r=Math.sin(theta),z=.06*Math.cos(theta);
  for(const p of outline)vertices.push(p.x*r,-.176+(p.y+.176)*r,z);
 }
 for(let j=0;j<rings;j++)for(let i=0;i<n;i++){
  const a=j*n+i,b=j*n+(i+1)%n,c=(j+1)*n+i,d=(j+1)*n+(i+1)%n;
  indices.push(a,b,c,b,d,c);
 }
 const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(vertices,3));geometry.setIndex(indices);geometry.computeVertexNormals();mesh(geometry,pawPink,charm);
 for(const [x,y,tilt] of [[-.124,-.117,.48],[-.055,-.041,.18],[.025,-.023,-.08],[.108,-.061,-.35]]){
  const toe=ball(charm,pawPink,x,y,0,.034,.048,.038);toe.rotation.z=tilt;
 }
}
function littleCharm(parent,index){
 if(index%2===0){pawCharm(parent);}
 else{ball(parent,champagne,0,-.09,0,.11,.05,.03);const tail=mesh(new T.ConeGeometry(.06,.1,3),champagne,parent,.12,-.09,0);tail.rotation.z=Math.PI/2;ball(parent,eyeMat,-.058,-.08,.028,.009);for(let j=0;j<3;j++)rod(parent,[-.02+j*.03,-.06,.03],[-.035+j*.03,-.12,.03],.004,gold);}
}
function printPhoto(photo,image){
 const c=document.createElement('canvas');c.width=580;c.height=800;const ctx=c.getContext('2d');
 ctx.fillStyle='#fffaf0';ctx.fillRect(0,0,580,800);
 const x=32,y=30,w=516,h=650;ctx.fillStyle='#e7ded0';ctx.fillRect(x,y,w,h);
 if(image){const v=photo.crop||{zoom:1,x:.5,y:.5};const scale=Math.max(w/image.width,h/image.height)*v.zoom;
 ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();ctx.drawImage(image,x+(w-image.width*scale)*v.x,y+(h-image.height*scale)*v.y,image.width*scale,image.height*scale);ctx.restore();
if(OWNER){
 const saveButton=$('publish-local');
 saveButton.addEventListener('click',async()=>{
 saveButton.disabled=true;$('owner-status').textContent='正在保存照片和设置…';
 try{
 const entries=[];
 for(const photo of photos){
 let image=null;
 if(photo.src){const response=await fetch(photo.src);if(!response.ok)throw new Error('照片读取失败');const blob=await response.blob();image=await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(blob);});}
 entries.push({slot:photo.slot,title:photo.title,crop:photo.crop||{zoom:1,x:.5,y:.5},image});
 }
 const response=await fetch('/api/save',{method:'POST',headers:{'Content-Type':'application/json','X-Editor-Token':document.querySelector('meta[name="editor-token"]').content},body:JSON.stringify({photos:entries})});
 const result=await response.json();if(!response.ok)throw new Error(result.error||'保存失败');
 $('owner-status').textContent='已保存到本地主页。打开 GitHub Desktop，提交并推送后，所有访客就能看到。';
 }catch(error){$('owner-status').textContent=`未保存：${error.message}`;}
 finally{saveButton.disabled=false;}
 });
}
}
 else{ctx.textAlign='center';ctx.fillStyle='#b7a594';ctx.font='34px serif';ctx.fillText('留给下一次心动',290,347);ctx.font='20px sans-serif';ctx.fillText(OWNER?'点击挂上照片':'等待新的回忆',290,392);}
 ctx.textAlign='center';ctx.fillStyle='#8e7461';ctx.font='20px sans-serif';
 ctx.fillText(`${String(photo.slot+1).padStart(2,'0')}  ·  ${photo.src?photo.title.slice(0,17):'小满的未完待续'}`,290,735);
 ctx.fillStyle='#c19b86';ctx.font='13px serif';ctx.fillText('X I A O M A N   /   L I T T L E   J O Y S',290,770);
 const texture=new T.CanvasTexture(c);texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());return texture;
}
function render(){
 const generation=++photoGeneration;strings.forEach(disposeGroup);strings.length=0;frames.length=0;$('photo-list').replaceChildren();
 // Uneven necklace lengths, with four double-photo strings distributed around the rim.
 const lengths=[.55,1.12,.76,1.54,.91,.45,1.35,.69,1.08,.5,1.46,.85];
 let slot=0;
 for(let k=0;k<12;k++){
 const a=k*Math.PI/6+.08;const chain=new T.Group();chain.position.set(Math.sin(a)*2.2385,4.40,Math.cos(a)*2.2385);chain.rotation.order='YXZ';chain.rotation.y=a;model.add(chain);strings.push(chain);
 const count=[0,3,6,9].includes(k)?2:1;const length=lengths[k]*.72+.23,end=length+(count-1)*1.04+.94;
 chain.userData={x:0,z:0,vx:0,vz:0,phase:k*2.13,length:end,motion:createHangingMotion(end,k*2.13),charmMotion:createHangingMotion(.28,k,.13)};
 rod(chain,[0,0,0],[0,-end,0],.0055,gold);
 for(const [j,y] of [[0,-.12],[1,-.31],[2,-end+.12],[3,-end]])ball(chain,beads[(k+j)%4],0,y,0,j===3?.045:.024);
 for(let row=0;row<count;row++){
 const photo=photos[slot++];const anchor=new T.Group();anchor.position.y=-length-row*1.04;chain.add(anchor);
 const frameGroup=new T.Group();anchor.add(frameGroup);frames.push(frameGroup);
 frameGroup.userData={photo,anchor,rest:(Math.sin(k*2.6+row)*.055),phase:k+row*.8,chain,motion:createHangingMotion(.48,k+row*.8,.075)};frameGroup.rotation.z=frameGroup.userData.rest;
 const board=mesh(new T.BoxGeometry(.63,.87,.022),paper,frameGroup,0,-.435,0);board.userData.photo=photo;
 const clip=mesh(new T.BoxGeometry(.047,.13,.052),beads[photo.slot%4],frameGroup,0,-.012,.026);clip.rotation.z=.08;
 const material=new T.MeshBasicMaterial({map:printPhoto(photo),toneMapped:false});
 const front=mesh(new T.PlaneGeometry(.625,.862),material,frameGroup,0,-.435,.014);front.userData={photo,photoMaterial:true};
 const back=mesh(new T.PlaneGeometry(.625,.862),material,frameGroup,0,-.435,-.014);back.rotation.y=Math.PI;back.userData.photo=photo;
 if(photo.src){const image=new Image();image.onload=()=>{if(generation!==photoGeneration)return;material.map.dispose();material.map=printPhoto(photo,image);material.needsUpdate=true;};image.onerror=()=>status(HERO?'A photo could not load. Please refresh to try again.':'有照片未能加载，请重新选择。');image.src=photo.src;}
 const button=document.createElement('button');button.textContent=`${String(photo.slot+1).padStart(2,'0')} · ${photo.src?photo.title:(OWNER?'挂上照片':'未挂照片')}`;button.disabled=!OWNER&&!photo.src;button.onclick=()=>openPhoto(photo);$('photo-list').append(button);
 }
 const pendant=new T.Group();pendant.position.y=-end-.045;chain.add(pendant);littleCharm(pendant,k);chain.userData.pendant=pendant;
 }
}
const charms=[];

let speed=0, gust=0, targetZoom=1, heldSlot=null;
let yaw=.28,pitch=HERO?-.03:.2,zoom=1,drag=null,moved=false,visible=true,last=0,elapsed=0;
function resize(){
 const w=stage.clientWidth,h=stage.clientHeight;renderer.setPixelRatio(desiredPixelRatio());renderer.setSize(w,h);camera.aspect=w/h;
 if(HERO){const mobile=w<=760;const center=.72-.06*T.MathUtils.clamp((w-1080)/520,0,1);document.documentElement.style.setProperty('--hero-center',`${center*100}%`);camera.setViewOffset(w,h,mobile?0:-w*(center-.5),mobile?-h*.15:h*.045,w,h);heroAtmosphere?.resize(w,h);}
 camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(stage);
const ray=new T.Raycaster();
let pressTimer=null, swapFrom=null, swapping=false;
const ghost=document.createElement('div');ghost.className='drag-photo-label';ghost.hidden=true;document.body.append(ghost);
function photoAt(e){const r=renderer.domElement.getBoundingClientRect();ray.setFromCamera(new T.Vector2((e.clientX-r.left)/r.width*2-1,1-(e.clientY-r.top)/r.height*2),camera);return ray.intersectObjects(model.children,true)[0]?.object.userData.photo;}
function clearHold(){clearTimeout(pressTimer);pressTimer=null;heldSlot=null;ghost.hidden=true;}
function prepareHold(e){if(!OWNER)return;const photo=photoAt(e);if(!photo?.src)return;pressTimer=setTimeout(()=>{heldSlot=photo.slot;moved=true;ghost.textContent=`${photo.slot+1} 号照片 · 拖到另一个相框`;ghost.hidden=false;ghost.style.left=`${e.clientX+15}px`;ghost.style.top=`${e.clientY+15}px`;},520);}
async function swapSlots(from,to){
 if(swapping||from===to)return;swapping=true;
 function rowFor(slot,destination){const old=rowsBySlot.get(slot);const photo=photos[slot];return {id:`slot-${destination}`,slot:destination,legacyId:old?.legacyId,blob:old?.blob||null,src:old?.blob?null:photo.src||null,title:photo.title,crop:photo.crop};}
 const a=rowFor(from,to),b=rowFor(to,from);
 try{const db=await ready;if(!db)throw new Error('storage');await new Promise((resolve,reject)=>{const tx=db.transaction('photos','readwrite');const store=tx.objectStore('photos');store.put(a);store.put(b);tx.oncomplete=resolve;tx.onerror=tx.onabort=()=>reject(tx.error);});rowsBySlot.set(to,a);rowsBySlot.set(from,b);applyRow(a);applyRow(b);render();status(`${from+1} 号与 ${to+1} 号照片已交换。`);}
 catch{status('暂时无法交换，请稍后再试。');}finally{swapping=false;}
}
const pointers=new Map();let pinchDistance=0;
const dragInput={turn:0,tilt:0};
function clearDragInertia(resetBodies=false){
 dragInput.turn=dragInput.tilt=0;
 if(!resetBodies)return;
 strings.forEach(chain=>{resetHangingMotion(chain.userData.motion);resetHangingMotion(chain.userData.charmMotion);});
 frames.forEach(f=>resetHangingMotion(f.userData.motion));
 starLanterns.forEach(s=>resetHangingMotion(s.motion));
}
function setZoom(value){targetZoom=T.MathUtils.clamp(value,.42,1.6);zoom=targetZoom;$('zoom-in').disabled=zoom<=.42;$('zoom-out').disabled=zoom>=1.6;}
const pointerDistance=()=>{const p=[...pointers.values()];return Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);};
stage.addEventListener('wheel',e=>{
 if(HERO&&!e.ctrlKey&&!e.metaKey){
  if(parent!==window){e.preventDefault();parent.postMessage({type:'xiaoman:scroll',deltaY:e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1)},location.origin);}return;
 }
 e.preventDefault();setZoom(zoom*Math.exp(T.MathUtils.clamp(e.deltaY,-150,150)*.0015));
},{passive:false});
if(HERO)document.addEventListener('wheel',e=>{
 if(e.defaultPrevented||e.ctrlKey||e.metaKey||e.target.closest('dialog')||parent===window)return;
 e.preventDefault();parent.postMessage({type:'xiaoman:scroll',deltaY:e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1)},location.origin);
},{passive:false});
$('zoom-in').onclick=()=>setZoom(zoom*.82);$('zoom-out').onclick=()=>setZoom(zoom/ .82);
$('reset-view').onclick=()=>{yaw=.28;pitch=HERO?-.03:.2;setZoom(1);clearDragInertia(true);};
stage.addEventListener('pointerdown',e=>{if(e.button!==0||swapping)return;clearHold();pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});stage.setPointerCapture(e.pointerId);if(pointers.size===2){clearDragInertia();pinchDistance=pointerDistance();moved=true;drag=null;return;}drag={x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,id:e.pointerId};moved=false;prepareHold(e);});
stage.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;if(heldSlot!==null){ghost.style.left=`${e.clientX+15}px`;ghost.style.top=`${e.clientY+15}px`;return;}pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2){const distance=pointerDistance();if(pinchDistance>0)setZoom(zoom*pinchDistance/Math.max(distance,1));pinchDistance=distance;return;}if(!drag||drag.id!==e.pointerId)return;if(Math.hypot(e.clientX-drag.startX,e.clientY-drag.startY)>5){moved=true;clearTimeout(pressTimer);}if(moved&&HERO&&e.pointerType==='touch'&&parent!==window){
 if(!drag.heroDirection)drag.heroDirection=Math.abs(e.clientY-drag.startY)>Math.abs(e.clientX-drag.startX)?'scroll':'rotate';
 if(drag.heroDirection==='scroll'){
  clearDragInertia();parent.postMessage({type:'xiaoman:scroll',deltaY:drag.y-e.clientY},location.origin);
  drag.x=e.clientX;drag.y=e.clientY;return;
 }
}
if(moved){
 const turn=(e.clientX-drag.x)*.008,nextPitch=T.MathUtils.clamp(pitch+(e.clientY-drag.y)*.003,-.25,.65);
 if(!reduced.matches){dragInput.turn+=turn;dragInput.tilt+=nextPitch-pitch;}
 yaw-=turn;pitch=nextPitch;
}drag.x=e.clientX;drag.y=e.clientY;});
stage.addEventListener('pointerup',e=>{clearTimeout(pressTimer);if(heldSlot!==null){const destination=photoAt(e);const from=heldSlot;clearHold();pointers.delete(e.pointerId);drag=null;if(destination)swapSlots(from,destination.slot);return;}if(drag&&!moved){const box=renderer.domElement.getBoundingClientRect();ray.setFromCamera(new T.Vector2((e.clientX-box.left)/box.width*2-1,-(e.clientY-box.top)/box.height*2+1),camera);const hit=ray.intersectObjects(model.children,true)[0];if(hit?.object.userData.photo)openPhoto(hit.object.userData.photo);}pointers.delete(e.pointerId);pinchDistance=0;drag=null;});
function cancelPointer(e){clearHold();pointers.delete(e.pointerId);drag=null;pinchDistance=0;if(e.type==='pointercancel')clearDragInertia();}
stage.addEventListener('pointercancel',cancelPointer);stage.addEventListener('lostpointercapture',cancelPointer);
stage.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();yaw+=e.key==='ArrowLeft'?.15:-.15;}});
function syncRotation(){$('rotation').textContent=HERO?(rotating?'Ⅱ Pause':'▷ Play'):(rotating?'Ⅱ 暂停旋转':'▷ 轻轻旋转');$('rotation').setAttribute('aria-pressed',String(rotating));}
$('rotation').onclick=()=>{rotating=!rotating;syncRotation();};
function syncWind(){$('wind').setAttribute('aria-pressed',String(windy));$('wind').textContent=HERO?(windy?'〰 Calm':'〰 Breeze'):(windy?'〰 风停了':'〰 起风了');}
$('wind').onclick=()=>{windy=!windy;syncWind();};
syncWind();
$('lighting').onclick=()=>{night=!night;document.body.classList.toggle('night',night);$('lighting').textContent=HERO?(night?'☀ Day':'☾ Night'):(night?'☀ 白昼':'☾ 夜晚');$('lighting').setAttribute('aria-pressed',String(night));hemi.intensity=night?.32:2.1;key.intensity=night?.7:3.3;fill.intensity=night?.5:1.7;warm.intensity=night?13:0;bulbMat.emissiveIntensity=night?5:.4;scene.environmentIntensity=night?.32:.8;glowMaterial.opacity=night?.7:0;};
$('close').onclick=()=>$('viewer').close();
$('viewer').addEventListener('click',e=>{const b=$('viewer').getBoundingClientRect();if(e.target===$('viewer')&&(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom))$('viewer').close();});
reduced.addEventListener('change',e=>{if(e.matches){rotating=false;windy=false;clearDragInertia(true);syncRotation();syncWind();}});
new IntersectionObserver(([e])=>visible=e.isIntersecting).observe(stage);
window.addEventListener('blur',()=>{clearHold();pointers.clear();drag=null;clearDragInertia(true);});
window.addEventListener('keydown',e=>{if(e.key==='Escape')clearHold();});
function frame(time){requestAnimationFrame(frame);const dt=Math.min((time-(last||time))/1000,.05);last=time;if(!visible||document.hidden){clearDragInertia(true);return;}elapsed+=dt;
 sparkleFade+=(Number(night)-sparkleFade)*(1-Math.exp(-dt*2.4));
 starField.visible=sparkleFade>.002;starMaterial.uniforms.uFade.value=sparkleFade;
 starMaterial.uniforms.uTime.value=reduced.matches?0:elapsed;
 starMaterial.uniforms.uScale.value=stage.clientHeight*renderer.getPixelRatio()/(2*Math.tan(T.MathUtils.degToRad(camera.fov/2)));
 poolMaterial.opacity=sparkleFade*.12;

 const editing=$('viewer').open||$('editor').open||$('slots').open||heldSlot!==null;
 const turn=dragInput.turn,tilt=dragInput.tilt;clearDragInertia(editing||reduced.matches);
 const goal=rotating&&pointers.size===0&&!editing?.085:0;
 speed+=(goal-speed)*(1-Math.exp(-dt*3));model.rotation.y+=speed*dt;
 gust+=(Number(windy)-gust)*(1-Math.exp(-dt*1.4));
 if(!editing){
 starLightMat.emissiveIntensity=.25+sparkleFade*1.8;
 starLanterns.forEach(({pivot,pendant,halo,phase,motion})=>{
 stepHangingMotion(motion,turn,tilt,yaw-model.rotation.y-pivot.rotation.y,dt,.9,!reduced.matches);
 pivot.rotation.x=motion.x;pivot.rotation.z=motion.z+(reduced.matches?0:Math.sin(elapsed*1.1+phase)*(.025+gust*.075));
 pendant.rotation.y=motion.y+(reduced.matches?0:Math.sin(elapsed*.6+phase)*.22);halo.material.opacity=sparkleFade*.22;
});
 horses.forEach((h,i)=>{h.position.y=.24+(reduced.matches?0:Math.sin(elapsed*1.15+i*2.2)*.08);h.rotation.z=reduced.matches?0:Math.sin(elapsed*1.15+i*2.2)*.015;});
 strings.forEach((chain,i)=>{
 const state=chain.userData;
 const facing=yaw-model.rotation.y-chain.rotation.y;
 stepHangingMotion(state.motion,turn,tilt,facing,dt,1,!reduced.matches);
 stepHangingMotion(state.charmMotion,turn,tilt,facing,dt,.6,!reduced.matches);
 const force=reduced.matches?0:.012+gust*.085;
 const tx=Math.cos(elapsed*(.93+i*.019)+state.phase)*force*.65+speed*.14;
 const tz=Math.sin(elapsed*(1.16+i*.021)+state.phase)*force-speed*.24;
 const spring=6.4/state.length+2.2;
 state.vx+=((tx-state.x)*spring-state.vx*2.4)*dt;state.vz+=((tz-state.z)*spring-state.vz*2.4)*dt;
 state.x+=state.vx*dt;state.z+=state.vz*dt;chain.rotation.x=state.x+state.motion.x;chain.rotation.z=state.z+state.motion.z;
 state.pendant.rotation.z=state.charmMotion.z+(reduced.matches?0:Math.sin(elapsed*2.4+i)*(.025+gust*.13));
 state.pendant.rotation.y=state.charmMotion.y;
 });
 frames.forEach(f=>{
 const u=f.userData;stepHangingMotion(u.motion,turn,tilt,yaw-model.rotation.y-u.chain.rotation.y,dt,.55,!reduced.matches);
 f.rotation.x=u.motion.x*.5;
 f.rotation.z=u.rest+u.motion.z+(reduced.matches?0:Math.sin(elapsed*1.8+u.phase)*(.006+gust*.027));
 f.rotation.y=u.motion.y+(reduced.matches?0:Math.sin(elapsed*1.3+u.phase)*(.018+gust*.1));
});
 }
 if(renderer.getPixelRatio()!==desiredPixelRatio())resize();
 const heroDistance=stage.clientWidth<=760?Math.max(19.5,10.15/camera.aspect):Math.max(13.4,9.3/(camera.aspect*.605));
 const distance=(HERO?heroDistance:(camera.aspect<.9?16.4:13.2))*zoom;camera.position.set(Math.sin(yaw)*distance,3.02+(2.65+pitch*5)*zoom,Math.cos(yaw)*distance);camera.lookAt(0,3.02,0);
 if(HERO){renderer.clear();heroAtmosphere?.render(elapsed,night);renderer.clearDepth();}
 renderer.render(scene,camera);
}
render();syncRotation();resize();$('loading').hidden=true;requestAnimationFrame(frame);
let database = null;
  const ready = new Promise((resolve) => {
    try {
      if(!OWNER){resolve(null);return;}
      const request = indexedDB.open('xiaoman-memory-lamp', 1);
      request.onupgradeneeded = () => request.result.createObjectStore('photos', { keyPath: 'id' });
      request.onerror = () => resolve(null);
      request.onblocked = () => resolve(null);
      request.onsuccess = () => { database = request.result; resolve(database); };
    } catch { resolve(null); }
  });
  async function transaction(mode, action) {
    const db = await ready;
    if (!db) throw new Error('storage');
    return new Promise((resolve, reject) => {
      const tx = db.transaction('photos', mode);
      const request = action(tx.objectStore('photos'));
      tx.oncomplete = () => resolve(request.result);
      tx.onerror = tx.onabort = () => reject(tx.error || new Error('storage'));
    });
  }
  function storedPhoto(row) {
    const src = URL.createObjectURL(row.blob); objectUrls.set(row.id, src);
    return { id: row.id, src, title: row.title, custom: true };
  }
  async function compress(file) {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('format');
    if (file.size > 20 * 1024 * 1024) throw new Error('size');
    const bitmap = await createImageBitmap(file);
    const ratio = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * ratio));
    canvas.height = Math.max(1, Math.round(bitmap.height * ratio));
    const context = canvas.getContext('2d');
    context.fillStyle = '#fffaf3'; context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height); bitmap.close();
    return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('decode')), 'image/jpeg', .86));
  }

let editSlot=0, editImage=null, editBlob=null, editTitle='', loadGeneration=0;
const rowsBySlot=new Map();
function cropSettings(){return {zoom:Number($('crop-zoom').value),x:Number($('crop-x').value),y:Number($('crop-y').value)};}
function drawCrop(){
 const canvas=$('crop-preview'),c=canvas.getContext('2d');c.fillStyle='#eee4d7';c.fillRect(0,0,canvas.width,canvas.height);
 if(!editImage){c.fillStyle='#a28b79';c.font='20px sans-serif';c.textAlign='center';c.fillText('选择一张喜欢的照片',232,292);return;}
 const v=cropSettings(),scale=Math.max(canvas.width/editImage.width,canvas.height/editImage.height)*v.zoom;
 const w=editImage.width*scale,h=editImage.height*scale;c.drawImage(editImage,(canvas.width-w)*v.x,(canvas.height-h)*v.y,w,h);
}
async function startEditor(slot){
 if(!OWNER)return;
 editSlot=slot;editBlob=null;editImage=null;editTitle=photos[slot].src?photos[slot].title:'';$('caption').value=editTitle;
 $('slots').close();$('viewer').close();$('editor-title').textContent=`挂在 ${String(slot+1).padStart(2,'0')} 号位置`;
 $('editor-status').textContent='';$('save-photo').disabled=true;
 const v=photos[slot].crop||{zoom:1,x:.5,y:.5};$('crop-zoom').value=v.zoom;$('crop-x').value=v.x;$('crop-y').value=v.y;
 $('editor').showModal();drawCrop();
 const generation=++loadGeneration;
 if(photos[slot].src){try{const image=new Image();image.src=photos[slot].src;await image.decode();if(generation!==loadGeneration)return;editImage=image;editBlob=rowsBySlot.get(slot)?.blob||null;$('save-photo').disabled=false;drawCrop();}catch{$('editor-status').textContent='照片加载失败，请重新选择。';}}
}
function chooseSlot(){if(!OWNER)return;
 $('slot-grid').replaceChildren();
 photos.forEach((p,i)=>{const b=document.createElement('button');b.type='button';
 if(p.src){const img=document.createElement('img');img.src=p.src;img.alt=p.title;b.append(img);}else{const plus=document.createElement('span');plus.className='slot-empty';plus.textContent='＋';b.append(plus);}
 const label=document.createElement('span');label.textContent=`${String(i+1).padStart(2,'0')} · ${p.src?'已挂':'空位'}`;b.append(label);b.onclick=()=>{if(swapFrom!==null){const from=swapFrom;swapFrom=null;$('slots').close();swapSlots(from,i);}else startEditor(i);};$('slot-grid').append(b);});
 $('slots').showModal();
}
$('upload').onclick=()=>{swapFrom=null;$('slots-title').textContent='给照片选个位置';chooseSlot();};
$('swap-photo').onclick=()=>{swapFrom=selected.slot;$('viewer').close();$('slots-title').textContent='选择要交换的位置';chooseSlot();};
$('edit-photo').onclick=()=>startEditor(selected.slot);
$('choose-file').onclick=()=>$('files').click();
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>$(b.dataset.close).close());
$('editor').addEventListener('close',()=>{loadGeneration++;});
['crop-zoom','crop-x','crop-y'].forEach(id=>$(id).addEventListener('input',drawCrop));
$('reset-crop').onclick=()=>{$('crop-zoom').value=1;$('crop-x').value=.5;$('crop-y').value=.5;drawCrop();};
$('files').onchange=async()=>{
 const file=$('files').files[0];if(!file)return;
 const generation=++loadGeneration;$('save-photo').disabled=true;$('editor-status').textContent='正在准备照片…';
 try{
 const blob=await compress(file),src=URL.createObjectURL(blob),img=new Image();
 try{img.src=src;await img.decode();}finally{URL.revokeObjectURL(src);}
 if(generation!==loadGeneration)return;
 editImage=img;editBlob=blob;editTitle=file.name.replace(/\.[^.]+$/,'').slice(0,32);$('caption').value=editTitle;
 $('reset-crop').click();$('save-photo').disabled=false;$('editor-status').textContent='';
 }catch{if(generation===loadGeneration)$('editor-status').textContent='请选择 20 MB 以内的 JPG、PNG 或 WebP。';}
 finally{$('files').value='';}
};
$('save-photo').onclick=async()=>{
 if(!editImage)return;$('save-photo').disabled=true;
 const slot=editSlot,row={id:`slot-${slot}`,slot,legacyId:rowsBySlot.get(slot)?.legacyId,title:$('caption').value.trim()||'小满的小瞬间',crop:cropSettings(),blob:editBlob,src:editBlob?null:photos[slot].src};
 try{await transaction('readwrite',store=>store.put(row));rowsBySlot.set(slot,row);applyRow(row);render();$('editor').close();status(`照片已挂在 ${slot+1} 号位置。`);}
 catch{$('editor-status').textContent='暂时无法保存，请检查浏览器是否允许本地存储。';}
 finally{$('save-photo').disabled=false;}
};
function applyRow(row){
 const slot=row.slot;const previous=objectUrls.get(`slot-${slot}`);if(previous)URL.revokeObjectURL(previous);
 let src=row.src||null;if(row.blob){src=URL.createObjectURL(row.blob);objectUrls.set(`slot-${slot}`,src);}
 photos[slot]={id:`slot-${slot}`,slot,src,title:row.title||`第 ${slot+1} 个位置`,custom:true,crop:row.crop};
}
$('remove').onclick=async()=>{
 if(!selected)return;$('remove').disabled=true;
 try{const row={id:`slot-${selected.slot}`,slot:selected.slot,legacyId:rowsBySlot.get(selected.slot)?.legacyId,src:null,title:`第 ${selected.slot+1} 个位置`};await transaction('readwrite',store=>store.put(row));rowsBySlot.set(row.slot,row);applyRow(row);$('viewer').close();render();status('照片已取下，可以在这个位置挂上新的回忆。');}
 catch{status('暂时无法取下照片，请稍后再试。');}finally{$('remove').disabled=false;}
};
async function restore(){
 try{const response=await fetch('./album.json',{cache:'no-store'});if(response.ok){const album=await response.json();photos=album.photos.map(p=>({...p,id:`slot-${p.slot}`}));}}catch{status(HERO?'The photo album could not load. Please try again.':'相册配置暂时无法读取。');}
 if(!OWNER){render();return;}
 $('upload').disabled=true;
 try{const rows=await transaction('readonly',store=>store.getAll());
 const current=rows.filter(r=>Number.isInteger(r.slot)&&r.slot>=0&&r.slot<16);current.forEach(row=>{rowsBySlot.set(row.slot,row);applyRow(row);});
 // Migrate old local uploads into available slots once, without deleting originals.
 for(const row of rows.filter(r=>!Number.isInteger(r.slot)&&r.blob)){
 if(current.some(r=>r.legacyId===row.id))continue;
 const slot=photos.findIndex(p=>!p.src&&!rowsBySlot.has(p.slot));if(slot<0)break;
 const migrated={...row,id:`slot-${slot}`,slot,legacyId:row.id};await transaction('readwrite',store=>store.put(migrated));rowsBySlot.set(slot,migrated);applyRow(migrated);
 }
 render();
 }catch{status('暂时无法读取已保存的照片。');}finally{$('upload').disabled=false;}
}
restore();
if(OWNER){
 const saveButton=$('publish-local');
 saveButton.addEventListener('click',async()=>{
 saveButton.disabled=true;$('owner-status').textContent='正在保存照片和设置…';
 try{
 const entries=[];
 for(const photo of photos){
 let image=null;
 if(photo.src){const response=await fetch(photo.src);if(!response.ok)throw new Error('照片读取失败');const blob=await response.blob();image=await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(blob);});}
 entries.push({slot:photo.slot,title:photo.title,crop:photo.crop||{zoom:1,x:.5,y:.5},image});
 }
 const response=await fetch('/api/save',{method:'POST',headers:{'Content-Type':'application/json','X-Editor-Token':document.querySelector('meta[name="editor-token"]').content},body:JSON.stringify({photos:entries})});
 const result=await response.json();if(!response.ok)throw new Error(result.error||'保存失败');
 $('owner-status').textContent='已保存到本地主页。打开 GitHub Desktop，提交并推送后，所有访客就能看到。';
 }catch(error){$('owner-status').textContent=`未保存：${error.message}`;}
 finally{saveButton.disabled=false;}
 });
}
