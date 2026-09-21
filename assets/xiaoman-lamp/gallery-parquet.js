// Seamless real herringbone: 0.70 m x 0.14 m boards, with an embedded 45-degree rotation.
// The texture covers 3 x 3 lattice cells (90 boards), so board variation does not
// repeat on every short zigzag. The paired herringbone lattice is (5,5),(1,-1).
export const PARQUET_TILE_METERS = 3 * 5 * Math.SQRT2 * .14;

export function createParquetTextures(T) {
  const size = 2048, ratio = 5, repeats = 3;
  const tileUnits = repeats * ratio * Math.SQRT2;
  const pixelsPerUnit = size / tileUnits;
  const boardLength = ratio * pixelsPerUnit, boardWidth = pixelsPerUnit;
  const seam = pixelsPerUnit * .011; // 1.54 mm joints; warm and narrow, not black.
  const mapCanvas = document.createElement('canvas');
  const bumpCanvas = document.createElement('canvas');
  mapCanvas.width = mapCanvas.height = bumpCanvas.width = bumpCanvas.height = size;
  const color = mapCanvas.getContext('2d');
  const height = bumpCanvas.getContext('2d');
  if (!color || !height) throw new Error('A 2D canvas is needed for the parquet floor.');
  color.fillStyle = '#9e805d'; color.fillRect(0, 0, size, size);
  height.fillStyle = '#858585'; height.fillRect(0, 0, size, size);
  const mod = (value, divisor) => ((value % divisor) + divisor) % divisor;
  const rng = (k, l, direction) => {
    let state = ((mod(k, repeats) + 1) * 73856093 ^
      (mod(l, repeats * ratio) + 1) * 19349663 ^ (direction + 1) * 83492791) >>> 0;
    return () => ((state = (Math.imul(state, 1664525) + 1013904223) >>> 0) / 4294967296);
  };
  const clamp = value => Math.max(0, Math.min(255, Math.round(value)));
  const rgb = (r, g, b) => 'rgb(' + clamp(r) + ',' + clamp(g) + ',' + clamp(b) + ')';

  function paintBoard(k, l, vertical) {
    const random = rng(k, l, vertical ? 1 : 0);
    // Translate from the unrotated integer board lattice into the square tile.
    // Vertical planks start at n+1, then rotate, to share the T-shaped joints.
    let ox = k * ratio + l, oy = k * ratio - l;
    if (vertical) ox += ratio + 1;
    const x = (ox - oy) * Math.SQRT1_2 * pixelsPerUnit;
    const y = (ox + oy) * Math.SQRT1_2 * pixelsPerUnit;
    const angle = Math.PI / 4 + (vertical ? Math.PI / 2 : 0);
    for (const ctx of [color, height]) {
      ctx.save(); ctx.translate(x, y); ctx.rotate(angle);
      ctx.beginPath(); ctx.rect(seam / 2, seam / 2, boardLength - seam, boardWidth - seam);
      ctx.clip();
    }

    // Quiet honey/beige oak, not a repeated orange or dark-brown checkerboard.
    const shade = (random() - .5) * 20;
    const warm = (random() - .5) * 3;
    const r = 181 + shade + warm, g = 150 + shade, b = 111 + shade - warm;
    color.fillStyle = rgb(r, g, b);
    color.fillRect(0, 0, boardLength, boardWidth);
    height.fillStyle = '#b8b8b8'; height.fillRect(0, 0, boardLength, boardWidth);

    // A faint change across the board catches the light without looking striped.
    const wash = color.createLinearGradient(0, 0, 0, boardWidth);
    wash.addColorStop(0, 'rgba(255,244,218,.045)');
    wash.addColorStop(.48, 'rgba(255,244,218,0)');
    wash.addColorStop(1, 'rgba(97,76,48,.026)');
    color.fillStyle = wash; color.fillRect(0, 0, boardLength, boardWidth);

    // Long narrow fibres follow the LOCAL long axis of every individual slat.
    for (let i = 0; i < 92; i++) {
      const gy = random() * boardWidth;
      const bend = (random() - .5) * boardWidth * .052;
      const drift = (random() - .5) * boardWidth * .035;
      const lineWidth = .32 + random() * .54;
      color.strokeStyle = 'rgba(107,87,58,' + (.018 + random() * .046) + ')';
      color.lineWidth = lineWidth;
      color.beginPath(); color.moveTo(-2, gy);
      color.bezierCurveTo(boardLength * .29, gy + bend,
        boardLength * .72, gy - bend * .60 + drift, boardLength + 2, gy + drift);
      color.stroke();
      if (i % 3 === 0) {
        height.strokeStyle = 'rgba(109,109,109,' + (.032 + random() * .050) + ')';
        height.lineWidth = lineWidth * .85;
        height.beginPath(); height.moveTo(-2, gy);
        height.bezierCurveTo(boardLength * .29, gy + bend,
          boardLength * .72, gy - bend * .60 + drift, boardLength + 2, gy + drift);
        height.stroke();
      }
      if (i % 7 === 0) {
        color.strokeStyle = 'rgba(255,239,204,.040)';
        color.lineWidth = .45; color.beginPath(); color.moveTo(0, gy + 1.1);
        color.bezierCurveTo(boardLength * .34, gy + bend + 1.1,
          boardLength * .72, gy - bend * .6 + 1.1, boardLength, gy + drift + 1.1);
        color.stroke();
      }
    }

    // Occasional tight, elongated growth rings, never a conspicuous painted knot.
    if (random() > .78) {
      const nx = boardLength * (.24 + random() * .51), ny = boardWidth * (.24 + random() * .52);
      for (let ring = 0; ring < 6; ring++) {
        color.strokeStyle = 'rgba(115,92,57,' + (.057 - ring * .006) + ')';
        color.lineWidth = .54;
        color.beginPath(); color.ellipse(nx, ny, 6 + ring * 5.1, 1.0 + ring * .73, 0, 0, Math.PI * 2); color.stroke();
      }
    }
    // A very fine eased edge provides the physical seam in the bump texture.
    color.strokeStyle = 'rgba(131,111,80,.16)';
    color.lineWidth = .75;
    color.strokeRect(seam * .66, seam * .66, boardLength - seam * 1.32, boardWidth - seam * 1.32);
    height.strokeStyle = '#a4a4a4'; height.lineWidth = 1.1;
    height.strokeRect(seam * .66, seam * .66, boardLength - seam * 1.32, boardWidth - seam * 1.32);
    color.restore(); height.restore();
  }

  // Extra lattice rows cover all four cropped edges. Modular seeds make the
  // same crossing board identical when it re-enters the opposite tile edge.
  for (let k = -2; k <= repeats + 1; k++) {
    for (let l = -ratio - 2; l <= repeats * ratio + ratio + 2; l++) {
      paintBoard(k, l, false); paintBoard(k, l, true);
    }
  }

  const map = new T.CanvasTexture(mapCanvas);
  const bumpMap = new T.CanvasTexture(bumpCanvas);
  map.colorSpace = T.SRGBColorSpace;
  bumpMap.colorSpace = T.NoColorSpace;
  for (const texture of [map, bumpMap]) {
    texture.wrapS = texture.wrapT = T.RepeatWrapping;
    texture.repeat.set(8 / PARQUET_TILE_METERS, 17 / PARQUET_TILE_METERS);
    texture.minFilter = T.LinearMipmapLinearFilter;
    texture.magFilter = T.LinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = 4;
  }
  return {
    map, bumpMap,
    dispose() { map.dispose(); bumpMap.dispose(); }
  };
}
