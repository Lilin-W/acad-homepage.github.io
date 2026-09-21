// The entry view contains the complete frame outlines, including their real depth.
export function fitOverviewDistance(T, slots, aspect, fov) {
  const tan = Math.tan(T.MathUtils.degToRad(fov) / 2);
  const margin = .89;
  let distance = 10.5;
  for (const slot of slots) {
    const rotation = new T.Euler(0, slot.yaw, 0);
    const origin = new T.Vector3(...slot.position);
    for (const x of [-1, 1]) for (const y of [-1, 1]) {
      const point = new T.Vector3(x * (slot.maxWidth / 2 + .13), y * (slot.maxHeight / 2 + .13), .08)
        .applyEuler(rotation).add(origin);
      distance = Math.max(distance, point.z + Math.abs(point.x) / (tan * aspect * margin),
        point.z + Math.abs(point.y - 2.8) / (tan * margin));
    }
  }
  return distance;
}
