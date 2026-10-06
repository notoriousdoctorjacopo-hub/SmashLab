// Deterministic randomness so every render of a burger is identical (SSR-safe, no flicker).
export function rng(seed = 1) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const f = (p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`

// Catmull-Rom spline through points, as a closed cubic Bezier path.
export function smoothClosed(pts, k = 1) {
  const n = pts.length
  let d = `M${f(pts[0])}`
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % n]
    const p3 = pts[(i + 2) % n]
    const c1 = [p1[0] + ((p2[0] - p0[0]) / 6) * k, p1[1] + ((p2[1] - p0[1]) / 6) * k]
    const c2 = [p2[0] - ((p3[0] - p1[0]) / 6) * k, p2[1] - ((p3[1] - p1[1]) / 6) * k]
    d += `C${f(c1)} ${f(c2)} ${f(p2)}`
  }
  return d + 'Z'
}

// Same spline, open (for strands, stripes, drizzles).
export function smoothOpen(pts, k = 1) {
  const n = pts.length
  let d = `M${f(pts[0])}`
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(i + 2, n - 1)]
    const c1 = [p1[0] + ((p2[0] - p0[0]) / 6) * k, p1[1] + ((p2[1] - p0[1]) / 6) * k]
    const c2 = [p2[0] - ((p3[0] - p1[0]) / 6) * k, p2[1] - ((p3[1] - p1[1]) / 6) * k]
    d += `C${f(c1)} ${f(c2)} ${f(p2)}`
  }
  return d
}

// Organic blob around an ellipse.
export function blob(cx, cy, rx, ry, n, jitter, r) {
  const pts = []
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2
    const j = 1 + (r() - 0.5) * jitter
    pts.push([cx + Math.cos(a) * rx * j, cy + Math.sin(a) * ry * j])
  }
  return smoothClosed(pts)
}

// A melty slice (cheese, sauce, scamorza): wavy top, drips hanging from a base line.
export function dripPath({ seed, top = 8, base = 24, x0 = 22, x1 = 378, maxDrip = 52, chance = 0.6, minW = 12, varW = 14 }) {
  const r = rng(seed)
  let d = `M${x0},${top + 4} Q200,${top - 8} ${x1},${top + 4} L${x1 + 4},${base} `
  let x = x1 - 6
  while (x > x0 + 18) {
    x -= 6 + r() * 18
    d += `L${x.toFixed(1)},${(base + r() * 3).toFixed(1)} `
    if (x < x0 + 26) break
    const w = minW + r() * varW
    const L = r() < chance ? 14 + r() * (maxDrip - 14) : 3 + r() * 6
    const y0 = base + 1
    d += `C${x.toFixed(1)},${(y0 + L * 0.55).toFixed(1)} ${(x - 1).toFixed(1)},${(y0 + L).toFixed(1)} ${(x - w / 2).toFixed(1)},${(y0 + L).toFixed(1)} `
    d += `C${(x - w + 1).toFixed(1)},${(y0 + L).toFixed(1)} ${(x - w).toFixed(1)},${(y0 + L * 0.55).toFixed(1)} ${(x - w).toFixed(1)},${y0} `
    x -= w
  }
  d += `L${x0 - 4},${base} Z`
  return d
}
