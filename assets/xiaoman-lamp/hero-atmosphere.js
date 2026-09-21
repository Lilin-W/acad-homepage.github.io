import * as T from 'three';

// Separate orthographic set dressing: positions reflow with the viewport while
// each ornament keeps its own world-space dimensions and proportions.
export function createHeroAtmosphere({ renderer, environment }) {
  const scene = new T.Scene();
  scene.environment = environment;
  scene.environmentIntensity = .65;
  const camera = new T.OrthographicCamera(-8, 8, 5, -5, .1, 60);
  camera.position.set(0, 0, 20);
  const reduced = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  const geometries = new Set(), materials = new Set();
  const geometry = value => { geometries.add(value); return value; };
  const material = value => { materials.add(value); return value; };
  const key = new T.DirectionalLight(0xffead9, 2.6);
  key.position.set(-5, 7, 10);
  const fill = new T.DirectionalLight(0xe8edf7, 1.15);
  fill.position.set(6, 1, 5);
  const hemisphere = new T.HemisphereLight(0xfff3e4, 0xad8978, 1.3);
  scene.add(key, fill, hemisphere);

  const gold = material(new T.MeshPhysicalMaterial({ color: 0xe0b783, metalness: .68, roughness: .28, clearcoat: .3, clearcoatRoughness: .3 }));
  const pearl = material(new T.MeshPhysicalMaterial({ color: 0xebbbb5, metalness: .12, roughness: .23, envMapIntensity: .38, clearcoat: 1, clearcoatRoughness: .10, iridescence: .10, iridescenceIOR: 1.32, iridescenceThicknessRange: [110, 210] }));
  const satin = material(new T.MeshPhysicalMaterial({ color: 0xe4b2ac, transparent:true, opacity:.84, depthWrite:false, roughness:.5, metalness:.02, sheen:.7, sheenColor:0xffeee5, sheenRoughness:.5, clearcoat:.08, clearcoatRoughness:.45, side:T.DoubleSide }));
  const satinEdge = material(new T.MeshPhysicalMaterial({ color:0xf5ded0, transparent:true, opacity:.5, depthWrite:false, roughness:.5, metalness:.03, sheen:.6, sheenColor:0xffefdd, sheenRoughness:.5 }));

  function starGeometry() {
    const points = Array.from({ length: 10 }, (_, i) => {
      const angle = Math.PI / 2 + i * Math.PI / 5;
      const radius = i % 2 ? .43 : 1;
      return new T.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
    });
    const positions = [];
    const tri = (a, b, c) => positions.push(...a, ...b, ...c);
    for (let i = 0; i < 10; i++) {
      const p = points[i], q = points[(i + 1) % 10];
      const innerP = [p.x * .948, p.y * .948, .075];
      const innerQ = [q.x * .948, q.y * .948, .075];
      const edgeP = [p.x, p.y, .018], edgeQ = [q.x, q.y, .018];
      const backP = [p.x, p.y, -.055], backQ = [q.x, q.y, -.055];
      // Convex triangular faces catch different light across the raised centre.
      tri([0, 0, .36], innerP, innerQ);
      tri(innerP, edgeP, edgeQ); tri(innerP, edgeQ, innerQ);
      tri(edgeP, backP, backQ); tri(edgeP, backQ, edgeQ);
      tri([0, 0, -.22], backQ, backP);
    }
    const result = new T.BufferGeometry();
    result.setAttribute('position', new T.Float32BufferAttribute(positions, 3));
    result.computeVertexNormals();
    return geometry(result);
  }
  const starGeo = starGeometry(), sphereGeo = geometry(new T.SphereGeometry(1, 40, 28));
  const stars = Array.from({ length: 3 }, (_, i) => {
    const mesh = new T.Mesh(starGeo, gold);
    mesh.rotation.set([.14, -.15, .07][i], [-.2, .28, -.3][i], [-.12, .16, .12][i]);
    mesh.userData.phase = i * 1.7;
    scene.add(mesh); return mesh;
  });
  const pearls = Array.from({ length: 3 }, () => {
    const mesh = new T.Mesh(sphereGeo, pearl); scene.add(mesh); return mesh;
  });
  // Only the low pearl touches the ground; the other two remain suspended.
  const pearlShadowMaterial = material(new T.ShaderMaterial({
    transparent: true, depthWrite: false, depthTest: false, toneMapped: false,
    uniforms: { uOpacity: { value: .24 } },
    vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `varying vec2 vUv;uniform float uOpacity;void main(){vec2 p=(vUv-.5)*2.;float r=dot(p,p);float a=exp(-r*4.2)*smoothstep(1.,.3,r)*uOpacity;gl_FragColor=vec4(.30,.18,.14,a);\n#include <colorspace_fragment>\n}`
  }));
  const pearlShadow = new T.Mesh(geometry(new T.PlaneGeometry(1, 1)), pearlShadowMaterial);
  pearlShadow.renderOrder = -2; scene.add(pearlShadow);

  const ribbons = new T.Group(); scene.add(ribbons);
  let ribbonGeometries = [];
  function ribbon(points, width, twists, seed) {
    const curve = new T.CatmullRomCurve3(points, false, 'centripetal');
    const steps = 180, crossSteps = 8, vertices = [], indices = [];
    const leftSeam = [], rightSeam = [];
    const viewNormal = new T.Vector3(0, 0, 1);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps, centre = curve.getPointAt(t), tangent = curve.getTangentAt(t).normalize();
      const across = new T.Vector3().crossVectors(viewNormal, tangent).normalize();
      const normal = new T.Vector3().crossVectors(tangent, across).normalize();
      const turn = twists * t + Math.sin(t * Math.PI * 2 + seed) * .33 + seed;
      const widthAxis = across.clone().multiplyScalar(Math.cos(turn)).addScaledVector(normal, Math.sin(turn));
      const faceNormal = new T.Vector3().crossVectors(tangent, widthAxis).normalize();
      const taper = .78 + .22 * Math.sin(t * Math.PI);
      for (let j = 0; j <= crossSteps; j++) {
        const u = j / crossSteps * 2 - 1;
        // A slightly domed cross-section and twisting normal form actual satin,
        // with a narrow rolled hem instead of an SVG silhouette or billboard.
        const p = centre.clone().addScaledVector(widthAxis, u * width * taper / 2)
          .addScaledVector(faceNormal, (1 - u * u) * width * .065);
        vertices.push(p.x, p.y, p.z);
        if (j === 0) leftSeam.push(p);
        if (j === crossSteps) rightSeam.push(p);
        if (i < steps && j < crossSteps) {
          const a = i * (crossSteps + 1) + j, b = a + crossSteps + 1;
          indices.push(a, b, a + 1, a + 1, b, b + 1);
        }
      }
    }
    const geo = new T.BufferGeometry();
    geo.setAttribute('position', new T.Float32BufferAttribute(vertices, 3)); geo.setIndex(indices); geo.computeVertexNormals();
    ribbonGeometries.push(geo);
    const surface = new T.Mesh(geo, satin); ribbons.add(surface);
    for (const seam of [leftSeam, rightSeam]) {
      const seamGeo = new T.TubeGeometry(new T.CatmullRomCurve3(seam), steps, .0025, 5, false);
      ribbonGeometries.push(seamGeo); ribbons.add(new T.Mesh(seamGeo, satinEdge));
    }
  }

  // These clouds are translucent three-dimensional density fields. Integrating
  // through their volume gives wispy edges and self shading, without hard balls.
  const cloudVertex = `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
  const cloudFragment = `
    varying vec2 vUv;
    uniform float uSeed, uTime, uOpacity;
    uniform vec3 uLight, uShade;
    float hash(vec3 p){p=fract(p*.3183099+vec3(.11,.37,.73));p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
    float noise3(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
      return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
      mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
    float puff(vec3 p,vec3 c,vec3 radii){vec3 q=(p-c)/radii;return exp(-dot(q,q)*2.3);}
    float density(vec3 p){
      float d=puff(p,vec3(-.5,-.12,.02),vec3(.39,.44,.63))
        +puff(p,vec3(-.12,.02,.03),vec3(.42,.62,.74))
        +puff(p,vec3(.28,-.10,-.06),vec3(.36,.43,.55))
        +puff(p,vec3(.57,-.28,.07),vec3(.30,.32,.59));
      float n=noise3(p*5.+vec3(uSeed,uTime*.018,0.))*.68+noise3(p*11.+uSeed)*.32;
      return smoothstep(.04,.78,d*(.74+n*.40));
    }
    void main(){
      vec2 xy=(vUv-.5)*2.; float alpha=0.; vec3 light=vec3(0.);
      for(int i=0;i<24;i++){
        float z=1.-(float(i)+.5)/12.;vec3 p=vec3(xy,z);float d=density(p);
        float stepAlpha=(1.-exp(-d*.29))*uOpacity;
        float lightD=density(p+vec3(-.09,.17,.20));
        float shade=clamp(.61+(d-lightD)*1.12+p.y*.18,0.,1.);
        vec3 c=mix(uShade,uLight,shade);light+=(1.-alpha)*stepAlpha*c;alpha+=(1.-alpha)*stepAlpha;
      }
      if(alpha<.003)discard;gl_FragColor=vec4(light/max(alpha,.0001),alpha);
      #include <colorspace_fragment>
    }`;
  const cloudGeo = geometry(new T.PlaneGeometry(2, 2));
  const cloudScene = new T.Scene();
  const clouds = Array.from({ length: 4 }, (_, i) => {
    const mat = material(new T.ShaderMaterial({
      vertexShader: cloudVertex, fragmentShader: cloudFragment,
      uniforms: { uSeed: { value: i * 3.17 }, uTime: { value: 0 }, uOpacity: { value: .42 }, uLight: { value: new T.Color(0xfff9ed) }, uShade: { value: new T.Color(0xdfcbbc) } },
      transparent: true, depthWrite: false, depthTest: false, toneMapped: false
    }));
    const cloud = new T.Mesh(cloudGeo, mat); cloud.renderOrder = -10; cloudScene.add(cloud); return cloud;
  });

  // Volume integration only runs when layout or lighting changes. The resulting
  // transparent layer stays independent of the carousel and its shadow map.
  const cloudTarget = new T.WebGLRenderTarget(1, 1, { depthBuffer: false, stencilBuffer: false });
  cloudTarget.texture.colorSpace = T.LinearSRGBColorSpace;
  const cloudCompositeMaterial = material(new T.ShaderMaterial({
    transparent: true, depthWrite: false, depthTest: false, toneMapped: false,
    uniforms: { uCloud: { value: cloudTarget.texture } }, vertexShader: cloudVertex,
    fragmentShader: `varying vec2 vUv;uniform sampler2D uCloud;void main(){vec4 c=texture2D(uCloud,vUv);if(c.a<.001)discard;gl_FragColor=vec4(c.rgb/max(c.a,.0001),c.a);\n#include <colorspace_fragment>\n}`
  }));
  const cloudComposite = new T.Mesh(cloudGeo, cloudCompositeMaterial);
  cloudComposite.position.z = -6; cloudComposite.renderOrder = -20; scene.add(cloudComposite);
  let cloudCacheDirty = true;
  function updateCloudCache() {
    const oldTarget = renderer.getRenderTarget();
    const oldFace = renderer.getActiveCubeFace(), oldMip = renderer.getActiveMipmapLevel();
    const oldColor = renderer.getClearColor(new T.Color()), oldAlpha = renderer.getClearAlpha();
    const oldScissorTest = renderer.getScissorTest();
    try {
      renderer.setRenderTarget(cloudTarget);
      // setRenderTarget uses this target's pixel-sized viewport directly;
      // setViewport would multiply it again by the main canvas DPR.
      renderer.setScissorTest(false); renderer.setClearColor(0x000000, 0);
      renderer.clear(true, true, true); renderer.render(cloudScene, camera);
      cloudCacheDirty = false;
    } finally {
      renderer.setRenderTarget(oldTarget, oldFace, oldMip);
      renderer.setClearColor(oldColor, oldAlpha); renderer.setScissorTest(oldScissorTest);
    }
  }

  const glowGeometry = geometry(new T.PlaneGeometry(1, 1));
  const glintMaterial = material(new T.ShaderMaterial({
    transparent: true, depthWrite: false, depthTest: false,
    uniforms: { uOpacity: { value: .65 } },
    vertexShader: cloudVertex,
    fragmentShader: `varying vec2 vUv; uniform float uOpacity; void main(){vec2 p=(vUv-.5)*2.;float r=length(p);float core=exp(-r*r*36.);float halo=exp(-r*r*5.)*.14;float cross=(exp(-abs(p.x)*48.-abs(p.y)*5.)+exp(-abs(p.y)*48.-abs(p.x)*5.))*.28;float a=(core+halo+cross)*smoothstep(1.,.65,r)*uOpacity;gl_FragColor=vec4(1.,.89,.72,a);}`
  }));
  const glints = Array.from({ length: 5 }, () => { const mesh = new T.Mesh(glowGeometry, glintMaterial); scene.add(mesh); return mesh; });

  let viewportWidth = 16, mobile = false, previousNight;
  const at = (x, y, z = 0) => new T.Vector3((x - .5) * viewportWidth, (0.5 - y) * 10, z);
  function resize(width, height) {
    viewportWidth = 10 * Math.max(1, width) / Math.max(1, height); mobile = width <= 760;
    camera.left = -viewportWidth / 2; camera.right = viewportWidth / 2; camera.updateProjectionMatrix();
    const starLayout = mobile ? [[.86,.375,.18],[.92,.61,.16],[.08,.66,.17]] : [[.81,.115,.25],[.925,.365,.23],[.412,.674,.24]];
    stars.forEach((star, i) => { const [x,y,size] = starLayout[i]; star.position.copy(at(x,y,-1));star.scale.setScalar(size);star.userData.baseY=star.position.y; });
    const pearlLayout = mobile ? [[.12,.85,.065],[.94,.77,.06],[.86,.947,.07]] : [[.37,.82,.105],[.95,.61,.095],[.88,.935,.105]];
    pearls.forEach((mesh,i) => {const [x,y,size]=pearlLayout[i];mesh.position.copy(at(x,y,-.4));mesh.scale.setScalar(size);});
    const [pearlX, pearlY, pearlSize] = pearlLayout[2];
    pearlShadow.position.copy(at(pearlX+.003,pearlY+pearlSize/10,-.45));
    pearlShadow.scale.set(pearlSize*4.8,pearlSize*1.05,1);
    const glintLayout = mobile ? [[.12,.4],[.86,.52],[.1,.79],[.9,.88],[.8,.41]] : [[.431,.35],[.43,.47],[.901,.66],[.953,.46],[.393,.85]];
    glints.forEach((mesh,i) => {mesh.position.copy(at(...glintLayout[i],-.5));mesh.scale.setScalar(mobile?.13:.19);});
    for (const geo of ribbonGeometries) geo.dispose(); ribbonGeometries=[]; ribbons.clear();
    const right = mobile ? [[1.08,.32,-3],[.91,.39,-2.6],[.96,.50,-2.4],[1.06,.57,-2.7],[.9,.72,-3]] : [[1.06,.058,-3],[.932,.13,-2.6],[.889,.223,-2.5],[.964,.344,-2.2],[.932,.439,-2.4],[.818,.532,-3]];
    const lower = mobile ? [[-.16,.83,-3],[.03,.88,-2.5],[.2,.91,-2.9],[.48,.9,-3.2]] : [[-.075,.785,-3],[.11,.835,-2.5],[.232,.791,-2.6],[.335,.731,-2.8],[.449,.806,-3],[.53,.802,-3.1]];
    ribbon(right.map(p=>at(...p)), mobile?.14:.215, 2.1, -.32);
    ribbon(lower.map(p=>at(...p)), mobile?.12:.195, -1.7, .26);
    // Two billowing banks frame the lower corners; their inner edges enter only
    // 10–18% of the view, leaving the centre as open floor and carousel shadow.
    const outerCloudWidth = Math.min(7.1, viewportWidth * (mobile ? .64 : .45));
    const innerCloudWidth = Math.min(5.4, viewportWidth * (mobile ? .43 : .28));
    const cloudLayout = mobile
      ? [[-.07,.88,outerCloudWidth,2.55],[.025,.98,innerCloudWidth,1.8],[1.08,.9,outerCloudWidth,2.4],[.99,.99,innerCloudWidth,1.75]]
      : [[.02,.85,outerCloudWidth,3.25],[.10,.972,innerCloudWidth,2.2],[1.005,.873,outerCloudWidth,3.0],[.945,.978,innerCloudWidth,2.15]];
    clouds.forEach((cloud,i)=>{const [x,y,w,h]=cloudLayout[i];cloud.position.copy(at(x,y,-5-i*.03));cloud.scale.set(w/2,h/2,1);});
    cloudComposite.scale.set(viewportWidth / 2, 5, 1);
    const cacheScale = Math.min(.7, 1100 / Math.max(1,width));
    cloudTarget.setSize(Math.max(1, Math.round(width * cacheScale)), Math.max(1, Math.round(height * cacheScale)));
    cloudCacheDirty = true;
  }

  function render(time, night = false) {
    const t = reduced.matches ? 0 : time;
    if (night !== previousNight) {
      scene.environmentIntensity = night ? .26 : .65;
      key.intensity = night ? .68 : 2.6; fill.intensity = night ? .25 : 1.15; hemisphere.intensity = night ? .37 : 1.3;
      gold.emissive.setHex(night ? 0x6e3e18 : 0x000000); gold.emissiveIntensity = night ? .24 : 0;
      pearlShadowMaterial.uniforms.uOpacity.value = night ? .12 : .24;
      clouds.forEach(cloud=>{
        cloud.material.uniforms.uLight.value.setHex(night?0x756577:0xffffff);
        cloud.material.uniforms.uShade.value.setHex(night?0x30283e:0xe4cfbd);
        cloud.material.uniforms.uOpacity.value=night?.62:.98;
      });
      cloudCacheDirty = true;
      glintMaterial.uniforms.uOpacity.value = night ? .9 : .65;
      previousNight = night;
    }
    stars.forEach((star,i)=>{
      star.position.y = star.userData.baseY + (reduced.matches?0:Math.sin(t*.42+star.userData.phase)*.035);
      star.rotation.y = [-.2,.28,-.3][i] + (reduced.matches?0:Math.sin(t*.23+i)*.08);
    });
    if (cloudCacheDirty) updateCloudCache();
    renderer.render(scene,camera);
  }
  function dispose() {
    cloudTarget.dispose(); cloudScene.clear();
    for (const value of geometries) value.dispose();
    for (const value of ribbonGeometries) value.dispose();
    for (const value of materials) value.dispose();
    scene.clear();
  }
  resize(1600,950);
  return { resize, render, dispose };
}
