// Small damped pendulums for the carousel's suspended objects.
// Input is angular displacement, so pointer event frequency does not set the force.
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));

export function createHangingMotion(length,phase=0,limit=.105){
 const omega=Math.sqrt(12/clamp(length,.24,3.3))+.65;
 return {x:0,y:0,z:0,vx:0,vy:0,vz:0,omega,
  damping:.24+(Math.sin(phase*1.7)+1)*.025,
  response:.92+Math.cos(phase*2.3)*.08,limit};
}

export function resetHangingMotion(m){
 m.x=m.y=m.z=m.vx=m.vy=m.vz=0;
}

function advanceAxis(m,axis,omega,dt,limit){
 const key=`v${axis}`;
 // Limit stored energy, rather than abruptly stopping an object at its angle limit.
 const amplitude=Math.hypot(m[axis],m[key]/omega);
 if(amplitude>limit){const scale=limit/amplitude;m[axis]*=scale;m[key]*=scale;}
 const gamma=m.damping*omega,wd=Math.sqrt(omega*omega-gamma*gamma);
 const decay=Math.exp(-gamma*dt),cos=Math.cos(wd*dt),sin=Math.sin(wd*dt);
 const position=m[axis],velocity=m[key];
 m[axis]=decay*(position*cos+(velocity+gamma*position)/wd*sin);
 m[key]=decay*(velocity*cos-(gamma*velocity+omega*omega*position)/wd*sin);
}

export function stepHangingMotion(m,turn,tilt,facing,dt,strength=1,enabled=true){
 if(!enabled){resetHangingMotion(m);return;}
 const gain=strength*m.response;
 // Tangential lag follows the apparent carousel turn. Vertical gestures are
 // projected into each object's local radial/tangential axes, including back faces.
 m.vx+=clamp(tilt,-.5,.5)*Math.cos(facing)*.9*gain;
 m.vz+=(-clamp(turn,-1.4,1.4)*.60-clamp(tilt,-.5,.5)*Math.sin(facing)*.9)*gain;
 m.vy+=clamp(turn,-1.4,1.4)*.45*gain;
 const step=clamp(dt,0,.1);
 advanceAxis(m,'x',m.omega,step,m.limit);
 advanceAxis(m,'z',m.omega,step,m.limit);
 advanceAxis(m,'y',m.omega*.78,step,m.limit*1.55);
}
