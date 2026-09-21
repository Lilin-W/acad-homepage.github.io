// Soft contact occlusion complements the directional window shadows.
export function addRoomContactShadows(T, scene, room, home) {
  const root = new T.Group(); root.name = 'soft furniture contact shadows'; scene.add(root);
  const canvas = document.createElement('canvas'); canvas.width=canvas.height=128;
  const ctx=canvas.getContext('2d'), gradient=ctx.createRadialGradient(64,64,9,64,64,64);
  gradient.addColorStop(0,'rgba(56,39,23,.44)');gradient.addColorStop(.45,'rgba(56,39,23,.23)');gradient.addColorStop(1,'rgba(56,39,23,0)');
  ctx.fillStyle=gradient;ctx.fillRect(0,0,128,128);
  const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
  const geometry=new T.PlaneGeometry(1,1), materials=[];
  const add=(x,z,w,d,y,opacity)=>{
    const material=new T.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false,opacity,toneMapped:false});materials.push(material);
    const plane=new T.Mesh(geometry,material);plane.name='contact shadow';plane.position.set(x,y,z);plane.rotation.x=-Math.PI/2;plane.scale.set(w,d,1);plane.raycast=()=>{};root.add(plane);
  };
  add(home.cat.position.x,home.cat.position.z,2.06,1.04,.006,.52);
  add(home.tree.position.x,home.tree.position.z,1.80,1.15,.005,.63);
  add(room.armchair.position.x,room.armchair.position.z,1.60,1.60,.006,.68);
  add(-1.60,2.40,2.0,4.25,.023,.30);
  for(const chair of room.diningChairs){
    for(const sx of [-1,1])for(const sz of [-1,1]){
      const point=new T.Vector3(sx*.31,0,sz*.315).applyEuler(chair.rotation).add(chair.position);
      add(point.x,point.z,.23,.23,.024,.65);
    }
  }
  for(const x of [-2.28,-.92])for(const z of [.86,3.94])add(x,z,.26,.26,.025,.85);
  add(room.lampTable.position.x,room.lampTable.position.z,.80,.80,.006,.50);
  add(room.rightLampTable.position.x,room.rightLampTable.position.z,.85,.85,.006,.50);
  // Low-contrast corner occlusion seats the walls in the room without dimming them.
  const bandCanvas=document.createElement('canvas');bandCanvas.width=8;bandCanvas.height=128;
  const bc=bandCanvas.getContext('2d'),fade=bc.createLinearGradient(0,0,0,128);
  fade.addColorStop(0,'rgba(73,52,31,.24)');fade.addColorStop(.18,'rgba(73,52,31,.09)');fade.addColorStop(1,'rgba(73,52,31,0)');
  bc.fillStyle=fade;bc.fillRect(0,0,8,128);
  const bandTexture=new T.CanvasTexture(bandCanvas);bandTexture.colorSpace=T.SRGBColorSpace;
  const bandMat=new T.MeshBasicMaterial({map:bandTexture,transparent:true,depthWrite:false,toneMapped:false,opacity:.55});materials.push(bandMat);
  for(const side of [-1,1]){
    const corniceShadow=new T.Mesh(geometry,bandMat);corniceShadow.name='soft cornice contact shade';corniceShadow.position.set(side*3.997,5.34,4.25);corniceShadow.rotation.y=-side*Math.PI/2;corniceShadow.scale.set(15.5,.30,1);corniceShadow.raycast=()=>{};root.add(corniceShadow);
    const floorEdge=new T.Mesh(geometry,bandMat);floorEdge.name='soft skirting contact shade';floorEdge.position.set(side*3.84,.0035,4.25);floorEdge.rotation.set(-Math.PI/2,0,side*Math.PI/2);floorEdge.scale.set(15.5,.29,1);floorEdge.raycast=()=>{};root.add(floorEdge);
  }
  return {root,dispose(){root.removeFromParent();geometry.dispose();texture.dispose();bandTexture.dispose();materials.forEach(m=>m.dispose());}};
}
