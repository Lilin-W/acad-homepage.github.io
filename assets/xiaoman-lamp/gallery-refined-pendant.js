// A small French glass bowl pendant. All dimensions are local to its ceiling point.
// The owner supplies room lighting and places root at the centre of the ceiling.
export function buildRefinedPendant(T) {
  const root = new T.Group();
  root.name = 'centred fluted opal glass pendant';
  const geometries = new Set(), materials = new Set();
  const mat = (color, values = {}) => {
    const m = new T.MeshStandardMaterial({color, roughness: .6, ...values});
    materials.add(m); return m;
  };
  const add = (g, m, name) => {
    geometries.add(g);
    const object = new T.Mesh(g, m);
    object.name = name;
    object.castShadow = true; object.receiveShadow = true;
    root.add(object); return object;
  };
  const brass = mat('#bba06b', {metalness: .7, roughness: .38});
  const brassEdge = mat('#d2bb83', {metalness: .65, roughness: .30});
  const plaster = mat('#fff3df', {roughness: .91});
  const opal = mat('#fff4df', {roughness: .36, emissive: '#ffe4b3', emissiveIntensity: .28});
  const glass = new T.MeshPhysicalMaterial({
    color: '#f4eddf', roughness: .24, metalness: 0,
    transparent: true, opacity: .86, depthWrite: false,
    clearcoat: .45, clearcoatRoughness: .16,
    emissive: '#fbe3b9', emissiveIntensity: .075,
    side: T.DoubleSide
  });
  materials.add(glass);
  const sphere = (r, material, x, y, z, name, seg = 16) => {
    const object = add(new T.SphereGeometry(r, seg, 10), material, name);
    object.position.set(x, y, z); return object;
  };
  const torus = (r, tube, y, material, name, radial = 8, tubular = 64) => {
    const object = add(new T.TorusGeometry(r, tube, radial, tubular), material, name);
    object.rotation.x = Math.PI / 2; object.position.y = y; return object;
  };
  const lathe = (profile, material, name, segments = 64) =>
    add(new T.LatheGeometry(profile.map(p => new T.Vector2(...p)), segments), material, name);

  // The low-relief plaster rose lies entirely below the finished ceiling.
  lathe([
    [0, -.008], [.482, -.008], [.490, -.018], [.485, -.034],
    [.472, -.046], [.452, -.050], [.440, -.040], [.430, -.040],
    [.421, -.059], [.402, -.064], [.391, -.044], [.367, -.035],
    [.223, -.036], [.207, -.053], [.198, -.066], [.176, -.066],
    [.159, -.047], [.105, -.046], [.099, -.063], [0, -.063]
  ], plaster, 'turned plaster ceiling rose', 72);
  torus(.469, .008, -.043, plaster, 'fine outer plaster bead');
  torus(.218, .008, -.051, plaster, 'inner plaster bead');
  const reliefGeo = new T.SphereGeometry(1, 12, 8);
  geometries.add(reliefGeo);
  for (let i = 0; i < 24; i++) {
    const a = i / 24 * Math.PI * 2;
    const leaf = add(reliefGeo, plaster, 'small acanthus relief');
    leaf.position.set(Math.cos(a) * .300, -.040, Math.sin(a) * .300);
    leaf.scale.set(.066, .017, .026);
    leaf.rotation.y = -a;
  }
  lathe([[0,-.059],[.074,-.059],[.083,-.076],[.075,-.103],[.052,-.117],[.035,-.133],[.022,-.139],[0,-.139]], brass, 'brushed brass ceiling canopy');
  torus(.075,.004,-.081,brassEdge,'canopy rolled edge',6,40);

  // Elliptical links physically overlap: no floating cables or disconnected bowl.
  const linkGeometry = new T.TorusGeometry(.0205, .0035, 6, 14);
  geometries.add(linkGeometry);
  const vertical = new T.Vector3(0, 1, 0);
  const chain = (start, end, name, spacing = .039) => {
    const a = new T.Vector3(...start), b = new T.Vector3(...end);
    const delta = b.clone().sub(a), length = delta.length();
    const direction = delta.clone().normalize();
    const orientation = new T.Quaternion().setFromUnitVectors(vertical, direction);
    const count = Math.max(2, Math.ceil(length / spacing));
    // End links touch the two fixing points, and adjacent links intersect in orthogonal planes.
    const endInset = .025;
    for (let i = 0; i < count; i++) {
      const t = endInset + (length - 2 * endInset) * i / (count - 1);
      const link = add(linkGeometry, brass, name);
      link.position.copy(a).addScaledVector(direction, t);
      link.quaternion.copy(orientation).multiply(new T.Quaternion().setFromAxisAngle(vertical, (i % 2) * Math.PI / 2));
      link.scale.y = 1.31;
    }
  };
  chain([0,-.129,0],[0,-.700,0],'interlocked main suspension chain');
  lathe([[0,-.687],[.024,-.687],[.036,-.706],[.042,-.728],[.036,-.750],[.026,-.765],[0,-.765]], brass, 'three-way brass suspension junction',40);
  torus(.036,.004,-.733,brassEdge,'junction bead',6,32);

  const flutes = 24;
  const bowlProfile = [
    [.045,-1.348],[.090,-1.346],[.145,-1.338],[.205,-1.321],
    [.270,-1.293],[.329,-1.253],[.383,-1.201],[.426,-1.145],
    [.460,-1.087],[.482,-1.034],[.488,-1.014],
    [.477,-1.015],[.470,-1.039],[.448,-1.091],[.414,-1.148],
    [.370,-1.202],[.316,-1.253],[.257,-1.289],[.192,-1.315],
    [.135,-1.329],[.085,-1.335],[.045,-1.337]
  ];
  const bowlGeometry = new T.LatheGeometry(bowlProfile.map(p => new T.Vector2(...p)), 120);
  const positions = bowlGeometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i), z = positions.getZ(i), r = Math.hypot(x,z), a = Math.atan2(z,x);
    const wave = Math.cos(a*flutes), factor = 1 + wave * (.012 + .022 * r/.488);
    positions.setXYZ(i, x*factor, positions.getY(i) + wave * .004 * Math.pow(r/.488,3), z*factor);
  }
  bowlGeometry.computeVertexNormals();
  const bowl = add(bowlGeometry, glass, 'scalloped pressed glass bowl');
  bowl.castShadow = false;
  bowl.renderOrder = 2;

  // A broad shallow opal diffuser fills the bowl, so its underside reads as lit glass.
  const diffuser = lathe([
    [0,-1.316],[.070,-1.319],[.145,-1.306],[.220,-1.284],
    [.290,-1.243],[.350,-1.194],[.393,-1.140],[.418,-1.085],
    [.410,-1.080],[.376,-1.119],[.317,-1.148],[.228,-1.166],
    [.130,-1.175],[0,-1.179]
  ], opal, 'warm concealed opal diffuser', 80);
  diffuser.castShadow = false;

  // A continuous glass rolled lip follows the same scalloping as the bowl itself.
  const rimPath = [];
  for (let i = 0; i <= 120; i++) {
    const a=i/120*Math.PI*2, wave=Math.cos(a*flutes), r=.484*(1+wave*.034);
    rimPath.push(new T.Vector3(Math.cos(a)*r,-1.017+wave*.004,Math.sin(a)*r));
  }
  const rimCurve = new T.CatmullRomCurve3(rimPath, true);
  const lip = add(new T.TubeGeometry(rimCurve,144,.007,6,true),glass,'rolled scalloped glass lip');
  lip.castShadow=false; lip.renderOrder=2;

  for (let i=0;i<3;i++) {
    const a=Math.PI/6+i*Math.PI*2/3;
    const x=Math.cos(a)*.494,z=Math.sin(a)*.494;
    chain([Math.cos(a)*.025,-.747,Math.sin(a)*.025],[x,-1.011,z],'fine three-point bowl suspension');
    const clasp=sphere(.018,brass,x,-1.020,z,'small glass rim clasp');
    clasp.scale.set(.7,1.6,.7);
    const foot=sphere(.021,brassEdge,x,-1.036,z,'rim clasp return');foot.scale.y=.3;
  }
  lathe([[0,-1.339],[.052,-1.339],[.058,-1.350],[.052,-1.363],[.030,-1.370],[.020,-1.396],[0,-1.407]],brass,'small turned brass bottom finial',48);
  torus(.047,.004,-1.358,brassEdge,'finial collar bead',6,40);
  const tip=sphere(.012,brass,0,-1.411,0,'finial tip');tip.scale.y=1.08;
  root.userData.lightPosition = [0, -1.13, 0];
  return {
    root,
    lightPosition: new T.Vector3(0,-1.13,0),
    dispose() {
      root.removeFromParent();
      for (const g of geometries) g.dispose();
      for (const m of materials) m.dispose();
    }
  };
}
