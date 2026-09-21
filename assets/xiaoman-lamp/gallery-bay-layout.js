// Five paintings on each side wall; the bay window stays open and central.
// Frame envelopes preserve the source artwork's complete aspect ratio.
export const GALLERY_SLOTS = [
  {wall:'left',position:[-3.90,3.95,-2.4],yaw:Math.PI/2,maxWidth:1.55,maxHeight:1.55,ratio:1},
  {wall:'right',position:[3.90,4.35,-2.4],yaw:-Math.PI/2,maxWidth:1.55,maxHeight:1.50,ratio:1},
  {wall:'left',position:[-3.90,2.12,-2.4],yaw:Math.PI/2,maxWidth:1.65,maxHeight:1.15,ratio:1.4},
  {wall:'left',position:[-3.90,3.12,-.08],yaw:Math.PI/2,maxWidth:1.75,maxHeight:1.85,ratio:.85},
  {wall:'left',position:[-3.90,4.05,2.35],yaw:Math.PI/2,maxWidth:1.60,maxHeight:1.55,ratio:1.15},
  {wall:'left',position:[-3.90,2.18,2.35],yaw:Math.PI/2,maxWidth:1.55,maxHeight:1.22,ratio:1.25},
  {wall:'right',position:[3.90,3.98,-.08],yaw:-Math.PI/2,maxWidth:1.6,maxHeight:1.55,ratio:.85},
  {wall:'right',position:[3.90,2.18,-.08],yaw:-Math.PI/2,maxWidth:1.55,maxHeight:1.16,ratio:1.35},
  {wall:'right',position:[3.90,4.12,2.35],yaw:-Math.PI/2,maxWidth:1.65,maxHeight:1.50,ratio:1},
  {wall:'right',position:[3.90,2.38,2.35],yaw:-Math.PI/2,maxWidth:1.60,maxHeight:1.18,ratio:1.4}
];
export function fitArtwork(slot,ratio){const width=Math.min(slot.maxWidth,slot.maxHeight*ratio);return{width,height:width/ratio};}
