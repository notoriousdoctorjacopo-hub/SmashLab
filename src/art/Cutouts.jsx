import { useId } from 'react'
import { rng, blob } from '../lib/geo'

const O = { stroke: '#000', strokeWidth: 5, strokeLinejoin: 'round', strokeLinecap: 'round' }
const useUid = () => useId().replace(/:/g, '')

export function Logo({ className, title = 'SmashLab' }) {
  return (
    <svg viewBox="0 0 520 120" className={className} role="img" aria-label={title}>
      <text x="2" y="86" fontFamily="Archivo, sans-serif" fontWeight="900" fontSize="92" fill="#fff" textLength="300" lengthAdjust="spacingAndGlyphs">
        SMASH
      </text>
      <rect x="318" y="14" width="182" height="92" rx="16" fill="#F7931E" />
      <text x="334" y="88" fontFamily="Archivo, sans-serif" fontWeight="900" fontSize="84" fill="#000" textLength="150" lengthAdjust="spacingAndGlyphs">
        LAB
      </text>
      <circle cx="510" cy="10" r="9" fill="none" stroke="#fff" strokeWidth="2.5" />
      <text x="510" y="14.5" textAnchor="middle" fontFamily="Archivo, sans-serif" fontWeight="800" fontSize="12" fill="#fff">R</text>
    </svg>
  )
}

export function Fries({ className }) {
  const id = useUid()
  const sticks = [
    [70, 150, -32, 170],
    [110, 140, -14, 190],
    [150, 132, 4, 200],
    [190, 140, 18, 180],
    [226, 152, 34, 160],
    [128, 170, -6, 150],
    [172, 168, 12, 140],
  ]
  return (
    <svg viewBox="0 0 300 300" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`f${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFE07A" />
          <stop offset=".5" stopColor="#FFC93A" />
          <stop offset="1" stopColor="#E89A1E" />
        </linearGradient>
      </defs>
      {sticks.map(([x, y, rot, len], i) => (
        <g key={i} transform={`rotate(${rot} ${x} ${y})`}>
          <rect x={x - 13} y={y - len / 2} width="26" height={len} rx="6" fill={`url(#f${id})`} {...O} />
          <rect x={x - 13} y={y - len / 2} width="26" height="18" rx="6" fill="#C9761C" opacity=".75" />
          <path d={`M${x - 5} ${y - len / 2 + 26} V${y + len / 2 - 14}`} stroke="#FFF4C8" strokeWidth="4" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  )
}

export function CheeseSplash({ className }) {
  const id = useUid()
  const r = rng(42)
  const drops = Array.from({ length: 9 }, (_, i) => {
    const a = (i / 9) * Math.PI * 2 + r() * 0.4
    const d = 118 + r() * 34
    return [150 + Math.cos(a) * d, 150 + Math.sin(a) * d * 0.8, 7 + r() * 10]
  })
  return (
    <svg viewBox="0 0 300 300" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`c${id}`} cx=".4" cy=".35" r=".7">
          <stop offset="0" stopColor="#FFE27A" />
          <stop offset=".6" stopColor="#FFB21A" />
          <stop offset="1" stopColor="#F28A00" />
        </radialGradient>
      </defs>
      <path d={blob(150, 150, 96, 78, 16, 0.55, r)} fill={`url(#c${id})`} {...O} />
      {drops.map(([x, y, s], i) => (
        <circle key={i} cx={x} cy={y} r={s} fill="#FFB21A" {...O} strokeWidth="4" />
      ))}
      <ellipse cx="120" cy="122" rx="26" ry="10" fill="#fff" opacity=".7" transform="rotate(-25 120 122)" />
    </svg>
  )
}

export function OnionRing({ className }) {
  const r = rng(7)
  return (
    <svg viewBox="0 0 300 300" className={className} aria-hidden="true">
      <g transform="rotate(-18 150 150)">
        <ellipse cx="150" cy="150" rx="104" ry="70" fill="none" stroke="#000" strokeWidth="50" />
        <ellipse cx="150" cy="150" rx="104" ry="70" fill="none" stroke="#E2A535" strokeWidth="38" />
        <ellipse cx="150" cy="142" rx="102" ry="64" fill="none" stroke="#FFDB86" strokeWidth="8" />
        {Array.from({ length: 60 }, (_, k) => {
          const a = r() * Math.PI * 2
          const rr = 1 + (r() - 0.5) * 0.3
          return <circle key={k} cx={150 + Math.cos(a) * 104 * rr} cy={150 + Math.sin(a) * 70 * rr} r={2 + r() * 3} fill={k % 2 ? '#A85E18' : '#FFE9B0'} />
        })}
      </g>
    </svg>
  )
}

export function SodaCan({ className }) {
  const id = useUid()
  const r = rng(3)
  return (
    <svg viewBox="0 0 200 320" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`can${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#8E0710" />
          <stop offset=".3" stopColor="#FF2A33" />
          <stop offset=".55" stopColor="#E0121C" />
          <stop offset="1" stopColor="#6E030A" />
        </linearGradient>
        <linearGradient id={`top${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#7C8088" />
          <stop offset=".4" stopColor="#F2F4F7" />
          <stop offset="1" stopColor="#8D9198" />
        </linearGradient>
      </defs>
      <path d="M40 40 Q40 22 60 18 H140 Q160 22 160 40 L166 64 V262 L160 284 Q158 302 140 304 H60 Q42 302 40 284 L34 262 V64Z" fill={`url(#can${id})`} {...O} />
      <path d="M40 40 Q40 22 60 18 H140 Q160 22 160 40 L166 64 H34Z" fill={`url(#top${id})`} {...O} />
      <ellipse cx="100" cy="28" rx="44" ry="8" fill="#C9CDD4" stroke="#000" strokeWidth="3" />
      <path d="M34 150 C70 120 120 190 166 150 V186 C120 226 70 156 34 186Z" fill="#fff" />
      <text x="100" y="250" textAnchor="middle" fontFamily="Anton, Impact, sans-serif" fontSize="34" fill="#fff" letterSpacing="2">FREDDA.</text>
      <rect x="52" y="74" width="12" height="190" rx="6" fill="#fff" opacity=".35" />
      {Array.from({ length: 22 }, (_, i) => (
        <ellipse key={i} cx={46 + r() * 112} cy={80 + r() * 200} rx={2 + r() * 2.4} ry={3 + r() * 3} fill="#fff" opacity=".75" />
      ))}
      <path d="M34 262 L40 284 Q42 302 60 304 H140 Q158 302 160 284 L166 262Z" fill={`url(#top${id})`} {...O} />
    </svg>
  )
}

// The black square wipe that everyone mistakes for something else.
export function Wipe({ className }) {
  const teeth = []
  const n = 18
  const s = 260
  const o = 20
  for (let i = 0; i <= n; i++) teeth.push([o + (i * s) / n, o + (i % 2 ? 6 : -4)])
  for (let i = 1; i <= n; i++) teeth.push([o + s + (i % 2 ? -6 : 4), o + (i * s) / n])
  for (let i = n - 1; i >= 0; i--) teeth.push([o + (i * s) / n, o + s + (i % 2 ? -6 : 4)])
  for (let i = n - 1; i > 0; i--) teeth.push([o + (i % 2 ? 6 : -4), o + (i * s) / n])
  const d = 'M' + teeth.map((p) => p.join(',')).join('L') + 'Z'
  return (
    <svg viewBox="0 0 300 300" className={className} aria-hidden="true">
      <path d={d} fill="#1B1B1D" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
      <rect x="46" y="46" width="208" height="208" rx="14" fill="#0E0E10" />
      <path d="M46 70 Q46 46 70 46 H150 Q90 80 46 160Z" fill="#fff" opacity=".07" />
      <g transform="translate(66 128) scale(.32)">
        <text x="2" y="86" fontFamily="Archivo, sans-serif" fontWeight="900" fontSize="92" fill="#F2EFE9" textLength="300" lengthAdjust="spacingAndGlyphs">SMASH</text>
        <rect x="318" y="14" width="182" height="92" rx="16" fill="#F7931E" />
        <text x="334" y="88" fontFamily="Archivo, sans-serif" fontWeight="900" fontSize="84" fill="#000" textLength="150" lengthAdjust="spacingAndGlyphs">LAB</text>
      </g>
      <text x="150" y="182" textAnchor="middle" fontFamily="Archivo, sans-serif" fontWeight="600" fontSize="10.5" fill="#E8E4DD">Burger &amp; Hotdog devastanti</text>
    </svg>
  )
}
