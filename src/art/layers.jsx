import { rng, smoothClosed, smoothOpen, blob, dripPath } from '../lib/geo'

/*
  Every ingredient lives in a 400-unit-wide drawing.
  h   = drawing height
  top = y where the next ingredient rests
  a   = y of this ingredient's own base (where it sits on the one below)
  The stack height an ingredient adds is (a - top). Drips may hang below `a`
  and cover the ingredient underneath, exactly like real cheese does.
*/

const INK = '#000'
const O = { stroke: INK, strokeWidth: 5, strokeLinejoin: 'round', strokeLinecap: 'round' }
const thin = { stroke: INK, strokeWidth: 3.5, strokeLinejoin: 'round', strokeLinecap: 'round' }

export const SAUCES = {
  smashlab: { fill: '#FF8C6B', hi: '#FFC1A8' },
  bbq: { fill: '#6E2410', hi: '#B5532E' },
  sriracha: { fill: '#F2200F', hi: '#FF7A5C' },
  sesame: { fill: '#F0CF8A', hi: '#FFF0C8' },
  mustard: { fill: '#FFD21F', hi: '#FFF08A' },
}

export function Defs({ p }) {
  return (
    <defs>
      <linearGradient id={`${p}-bun`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FBBE55" />
        <stop offset=".55" stopColor="#E0821F" />
        <stop offset="1" stopColor="#A9520F" />
      </linearGradient>
      <linearGradient id={`${p}-croissant`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#F7B54C" />
        <stop offset=".6" stopColor="#D27420" />
        <stop offset="1" stopColor="#8E430E" />
      </linearGradient>
      <linearGradient id={`${p}-patty`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7A3A1B" />
        <stop offset=".5" stopColor="#53240F" />
        <stop offset="1" stopColor="#2C1006" />
      </linearGradient>
      <linearGradient id={`${p}-cheese`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFC93A" />
        <stop offset="1" stopColor="#FF9500" />
      </linearGradient>
      <linearGradient id={`${p}-sausage`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#E8664A" />
        <stop offset=".6" stopColor="#B8361F" />
        <stop offset="1" stopColor="#7A1E10" />
      </linearGradient>
      <linearGradient id={`${p}-fried`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#F6C25A" />
        <stop offset="1" stopColor="#C2741C" />
      </linearGradient>
      <filter id={`${p}-rim`} x="-15%" y="-60%" width="130%" height="220%">
        <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="d" />
        <feOffset in="d" dx="-5" dy="0" result="l" />
        <feFlood floodColor="#FF1E2D" />
        <feComposite in2="l" operator="in" result="lr" />
        <feOffset in="d" dx="5" dy="0" result="r" />
        <feFlood floodColor="#FF6A00" />
        <feComposite in2="r" operator="in" result="rr" />
        <feGaussianBlur in="lr" stdDeviation="9" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="lr" />
          <feMergeNode in="rr" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <pattern id={`${p}-ht`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
        <circle cx="3.5" cy="3.5" r="1.6" fill="#000" />
      </pattern>
    </defs>
  )
}

const specks = (r, n, x0, x1, y0, y1, colors, rmin = 1.5, rvar = 2.5) =>
  Array.from({ length: n }, (_, i) => (
    <circle
      key={i}
      cx={x0 + r() * (x1 - x0)}
      cy={y0 + r() * (y1 - y0)}
      r={rmin + r() * rvar}
      fill={colors[i % colors.length]}
    />
  ))

export const LAYERS = {
  bunBottom: {
    h: 96, top: 22, a: 88,
    draw: ({ p }) => (
      <g>
        <path d="M24 34 Q24 18 44 18 H356 Q376 18 376 34 L370 58 Q360 92 296 92 H104 Q40 92 30 58 Z" fill={`url(#${p}-bun)`} {...O} />
        <path d="M34 62 Q48 86 104 88 H296 Q352 86 366 62 Q340 80 200 80 Q60 80 34 62Z" fill={`url(#${p}-ht)`} opacity=".35" />
        <ellipse cx="200" cy="24" rx="170" ry="9" fill="#F7D08C" {...thin} />
        <path d="M60 46 Q66 70 100 76" fill="none" stroke="#FFE2A6" strokeWidth="5" strokeLinecap="round" opacity=".8" />
      </g>
    ),
  },

  bunTop: {
    h: 178, top: 0, a: 166,
    draw: ({ p, seed }) => {
      const r = rng(seed)
      return (
        <g>
          <path d="M22 152 C22 64 96 18 200 14 C304 18 378 64 378 152 Q378 172 356 172 H44 Q22 172 22 152 Z" fill={`url(#${p}-bun)`} {...O} />
          <path d="M30 150 Q60 162 200 162 Q340 162 370 150 Q372 168 352 168 H48 Q28 168 30 150Z" fill="#F7D08C" opacity=".95" />
          <path d="M290 40 C340 62 362 100 364 146 L372 146 C372 92 340 50 290 32 Z" fill={`url(#${p}-ht)`} opacity=".3" />
          <ellipse cx="128" cy="66" rx="58" ry="20" fill="#FFF3D6" opacity=".55" transform="rotate(-22 128 66)" />
          <ellipse cx="112" cy="62" rx="20" ry="7" fill="#fff" opacity=".9" transform="rotate(-22 112 62)" />
          {specks(r, 7, 160, 330, 40, 110, ['#FFE7B0'], 1.5, 2)}
        </g>
      )
    },
  },

  patty: {
    h: 64, top: 12, a: 54,
    draw: ({ p, seed }) => {
      const r = rng(seed)
      const pts = []
      for (let x = 26; x <= 374; x += 23) pts.push([x, 15 + (r() - 0.5) * 7])
      pts.push([384, 19 + r() * 3], [392, 27 + (r() - 0.5) * 4], [388, 35], [392, 42], [382, 50])
      for (let x = 374; x >= 26; x -= 23) pts.push([x, 52 + (r() - 0.5) * 6])
      pts.push([16, 50], [8, 42], [12, 34], [8, 26], [16, 18])
      const lace = []
      for (let i = 0; i < 26; i++) {
        const a = (i / 26) * Math.PI * 2
        const sp = i % 2 ? 1.035 : 0.975
        lace.push([200 + Math.cos(a) * 197 * sp, 33 + Math.sin(a) * 25 * sp])
      }
      return (
        <g>
          <path d={smoothClosed(lace, 0.6)} fill="#8E4A20" {...thin} />
          <path d={smoothClosed(pts, 0.9)} fill={`url(#${p}-patty)`} {...O} />
          <path d={smoothOpen(pts.slice(1, 16).map(([x, y]) => [x, y + 6]))} fill="none" stroke="#A35A2A" strokeWidth="5" strokeLinecap="round" opacity=".9" />
          {specks(r, 46, 30, 370, 24, 48, ['#2A0F05', '#9C5226', '#1A0803', '#B8692F'], 1.4, 2.6)}
          <path d="M60 22 Q120 16 170 21" fill="none" stroke="#FFD9B8" strokeWidth="3" strokeLinecap="round" opacity=".55" />
          <path d="M250 20 Q300 16 340 22" fill="none" stroke="#FFD9B8" strokeWidth="2.5" strokeLinecap="round" opacity=".4" />
        </g>
      )
    },
  },

  cheddar: {
    h: 92, top: 6, a: 22,
    draw: ({ p, seed }) => {
      const r = rng(seed + 7)
      return (
        <g>
          <path d={dripPath({ seed, top: 6, base: 22, maxDrip: 64 })} fill={`url(#${p}-cheese)`} {...O} />
          <path d="M44 12 Q200 2 356 12" fill="none" stroke="#FFE68A" strokeWidth="5" strokeLinecap="round" />
          {specks(r, 6, 60, 340, 30, 60, ['#FFF4C2'], 2, 2.5)}
        </g>
      )
    },
  },

  scamorza: {
    h: 80, top: 6, a: 24,
    draw: ({ seed }) => (
      <g>
        <path d={dripPath({ seed: seed + 3, top: 6, base: 24, maxDrip: 44, chance: 0.5, minW: 16 })} fill="#F4DEAA" {...O} />
        {[70, 130, 190, 250, 310].map((x) => (
          <path key={x} d={`M${x} 8 L${x + 26} 22`} stroke="#5A3214" strokeWidth="6" strokeLinecap="round" opacity=".85" />
        ))}
        <path d="M44 12 Q200 2 356 12" fill="none" stroke="#FFF8E0" strokeWidth="4" strokeLinecap="round" />
      </g>
    ),
  },

  sauce: {
    h: 72, top: 6, a: 16,
    draw: ({ seed, color = 'smashlab' }) => {
      const c = SAUCES[color] || SAUCES.smashlab
      return (
        <g>
          <path d={dripPath({ seed: seed + 11, top: 4, base: 16, maxDrip: 54, chance: 0.45, minW: 8, varW: 8 })} fill={c.fill} {...thin} />
          <path d="M60 10 Q200 2 340 10" fill="none" stroke={c.hi} strokeWidth="3.5" strokeLinecap="round" />
        </g>
      )
    },
  },

  bacon: {
    h: 58, top: 10, a: 44,
    draw: ({ seed }) => {
      const r = rng(seed)
      const strip = (y0, ph, th) => {
        const topE = [], botE = [], mid = []
        for (let i = 0; i <= 18; i++) {
          const x = 10 + i * 21.1
          const y = y0 + Math.sin(i * 0.9 + ph) * 6 + (r() - 0.5) * 2
          topE.push([x, y])
          botE.push([x, y + th])
          mid.push([x, y + th * 0.45])
        }
        return (
          <g>
            <path d={smoothClosed([...topE, ...botE.reverse()], 0.8)} fill="#B23322" {...O} />
            <path d={smoothOpen(mid)} fill="none" stroke="#F4C4A4" strokeWidth="4" strokeLinecap="round" />
            <path d={smoothOpen(topE.map(([x, y]) => [x, y + 3]))} fill="none" stroke="#6B160B" strokeWidth="3" opacity=".7" />
          </g>
        )
      }
      return (
        <g>
          {strip(16, 0.4, 16)}
          {strip(26, 2.2, 15)}
        </g>
      )
    },
  },

  onionGrilled: {
    h: 46, top: 10, a: 34,
    draw: ({ seed }) => {
      const r = rng(seed)
      return (
        <g fill="none" strokeLinecap="round">
          {Array.from({ length: 15 }, (_, i) => {
            const x = 30 + i * 23 + (r() - 0.5) * 10
            const y = 18 + r() * 10
            const d = `M${x - 26} ${y + 6} Q${x} ${y - 14 - r() * 6} ${x + 26} ${y + 8}`
            return (
              <g key={i}>
                <path d={d} stroke={INK} strokeWidth="11" />
                <path d={d} stroke={i % 3 ? '#D58E34' : '#A85E1C'} strokeWidth="5.5" />
              </g>
            )
          })}
        </g>
      )
    },
  },

  onionCrispy: {
    h: 42, top: 8, a: 30,
    draw: ({ seed }) => {
      const r = rng(seed + 5)
      return (
        <g fill="none" strokeLinecap="round">
          {Array.from({ length: 34 }, (_, i) => {
            const x = 28 + r() * 344
            const y = 14 + r() * 14
            const d = `M${x} ${y} q${6 + r() * 6} ${-8 - r() * 6} ${14 + r() * 6} ${r() * 4}`
            return (
              <g key={i}>
                <path d={d} stroke={INK} strokeWidth="8" />
                <path d={d} stroke={i % 2 ? '#C77A22' : '#8E4A12'} strokeWidth="3.5" />
              </g>
            )
          })}
        </g>
      )
    },
  },

  onionRings: {
    h: 82, top: 10, a: 68,
    draw: ({ seed }) => {
      const r = rng(seed)
      const rings = [
        [96, 44, -8],
        [302, 42, 7],
        [200, 36, 0],
      ]
      return (
        <g>
          {rings.map(([cx, cy, rot], i) => (
            <g key={i} transform={`rotate(${rot} ${cx} ${cy})`}>
              <ellipse cx={cx} cy={cy} rx="74" ry="26" fill="none" stroke={INK} strokeWidth="31" />
              <ellipse cx={cx} cy={cy} rx="74" ry="26" fill="none" stroke="#E2A535" strokeWidth="21" />
              <ellipse cx={cx} cy={cy - 4} rx="72" ry="22" fill="none" stroke="#F8D27A" strokeWidth="5" opacity=".9" />
              {Array.from({ length: 30 }, (_, k) => {
                const a = r() * Math.PI * 2
                const rr = 1 + (r() - 0.5) * 0.25
                return (
                  <circle key={k} cx={cx + Math.cos(a) * 74 * rr} cy={cy + Math.sin(a) * 26 * rr} r={1.6 + r() * 2} fill={k % 2 ? '#A85E18' : '#FFE3A0'} />
                )
              })}
            </g>
          ))}
        </g>
      )
    },
  },

  jalapeno: {
    h: 48, top: 10, a: 34,
    draw: ({ seed }) => {
      const r = rng(seed)
      return (
        <g>
          {[46, 104, 164, 226, 290, 350].map((cx, i) => {
            const cy = 22 + (r() - 0.5) * 8
            const rot = (r() - 0.5) * 18
            return (
              <g key={i} transform={`rotate(${rot} ${cx} ${cy})`}>
                <ellipse cx={cx} cy={cy} rx="30" ry="12" fill="#3EA33A" {...O} />
                <ellipse cx={cx} cy={cy - 1} rx="20" ry="6.5" fill="#D8EC9E" />
                {[-9, -3, 3, 9].map((dx) => (
                  <ellipse key={dx} cx={cx + dx} cy={cy - 1 + (dx % 2 ? 1 : -1)} rx="2.4" ry="1.6" fill="#F7FADC" stroke="#9CB860" strokeWidth=".8" />
                ))}
              </g>
            )
          })}
        </g>
      )
    },
  },

  pickles: {
    h: 42, top: 10, a: 30,
    draw: ({ seed }) => {
      const r = rng(seed + 2)
      return (
        <g>
          {[70, 150, 232, 314].map((cx, i) => {
            const cy = 20 + (r() - 0.5) * 6
            return (
              <g key={i} transform={`rotate(${(r() - 0.5) * 14} ${cx} ${cy})`}>
                <ellipse cx={cx} cy={cy} rx="38" ry="11" fill="#8BAA36" {...O} />
                <ellipse cx={cx} cy={cy - 1} rx="28" ry="6" fill="#C9DB7A" />
                {[-14, -5, 5, 14].map((dx) => (
                  <circle key={dx} cx={cx + dx} cy={cy - 1} r="2" fill="#EEF5C2" />
                ))}
              </g>
            )
          })}
        </g>
      )
    },
  },

  tomato: {
    h: 48, top: 8, a: 38,
    draw: () => (
      <g>
        {[
          [118, -3],
          [282, 3],
        ].map(([cx, rot]) => (
          <g key={cx} transform={`rotate(${rot} ${cx} 24)`}>
            <path d={`M${cx - 96} 18 Q${cx - 96} 36 ${cx - 80} 38 H${cx + 80} Q${cx + 96} 36 ${cx + 96} 18 Z`} fill="#B81E16" {...O} />
            <ellipse cx={cx} cy="18" rx="96" ry="12" fill="#F0362A" {...O} />
            {[-54, -18, 18, 54].map((dx) => (
              <ellipse key={dx} cx={cx + dx} cy="18" rx="12" ry="5" fill="#FFB69A" stroke="#C8241A" strokeWidth="2" />
            ))}
          </g>
        ))}
      </g>
    ),
  },

  lettuce: {
    h: 58, top: 8, a: 40,
    draw: ({ seed }) => {
      const r = rng(seed)
      const topE = [], botE = []
      for (let i = 0; i <= 26; i++) {
        const x = 4 + i * 15.2
        topE.push([x, 16 + (i % 2 ? -7 : 5) + (r() - 0.5) * 5])
        botE.push([x, 38 + (i % 2 ? 6 : -3) + (r() - 0.5) * 4])
      }
      return (
        <g>
          <path d={smoothClosed([...topE, ...botE.reverse()], 0.9)} fill="#86D94A" {...O} />
          {[60, 130, 200, 270, 340].map((x) => (
            <path key={x} d={`M${x - 20} 30 Q${x} 20 ${x + 22} 26`} fill="none" stroke="#D9F7A8" strokeWidth="3.5" strokeLinecap="round" />
          ))}
        </g>
      )
    },
  },

  chickenCutlet: {
    h: 98, top: 12, a: 84,
    draw: ({ p, seed }) => {
      const r = rng(seed)
      const pts = []
      for (let i = 0; i <= 22; i++) pts.push([14 + i * 16.5, 16 + (i % 2 ? -5 : 2) + (r() - 0.5) * 5])
      pts.push([396, 50])
      for (let i = 22; i >= 0; i--) pts.push([14 + i * 16.5, 84 + (i % 2 ? 4 : -2) + (r() - 0.5) * 4])
      pts.push([4, 50])
      return (
        <g>
          <path d={smoothClosed(pts, 0.85)} fill={`url(#${p}-fried)`} {...O} />
          <path d={smoothClosed(pts, 0.85)} fill={`url(#${p}-ht)`} opacity=".18" />
          {specks(r, 70, 24, 376, 20, 78, ['#FFE7A6', '#9C5714', '#FFF4CF', '#B8671A'], 1.5, 2.6)}
          <path d="M50 26 Q200 14 350 26" fill="none" stroke="#FFF0C2" strokeWidth="4" strokeLinecap="round" opacity=".8" />
        </g>
      )
    },
  },

  sausage: {
    h: 80, top: 12, a: 66,
    draw: ({ p }) => (
      <g>
        <rect x="2" y="14" width="396" height="54" rx="27" fill={`url(#${p}-sausage)`} {...O} />
        <path d="M30 26 H370" stroke="#FF9C80" strokeWidth="6" strokeLinecap="round" opacity=".8" />
        {[80, 140, 200, 260, 320].map((x) => (
          <path key={x} d={`M${x} 30 L${x + 22} 58`} stroke="#4A0E06" strokeWidth="6" strokeLinecap="round" opacity=".75" />
        ))}
      </g>
    ),
  },

  hotdogBun: {
    h: 112, top: 50, a: 104,
    draw: ({ p }) => (
      <g>
        <path d="M14 70 Q10 16 60 8 H340 Q390 16 386 70 Z" fill="#C46A1A" {...O} />
        <path d="M30 64 Q30 26 66 20 H334 Q370 26 370 64 Z" fill="#F7D08C" />
        <path d="M6 66 Q6 54 22 54 H378 Q394 54 394 66 L388 84 Q380 108 330 108 H70 Q20 108 12 84 Z" fill={`url(#${p}-bun)`} {...O} />
        <path d="M40 92 Q60 102 110 102" fill="none" stroke="#FFE2A6" strokeWidth="4" strokeLinecap="round" opacity=".8" />
      </g>
    ),
  },

  chili: {
    h: 64, top: 10, a: 36,
    draw: ({ seed }) => {
      const r = rng(seed + 9)
      return (
        <g>
          <path d={dripPath({ seed: seed + 21, top: 8, base: 30, maxDrip: 30, chance: 0.5, minW: 14, varW: 12 })} fill="#8A2615" {...O} />
          {specks(r, 34, 40, 360, 12, 34, ['#5A170B', '#C24A26', '#E8A27A', '#3A0E06'], 2.4, 3.4)}
          <path d="M60 14 Q200 4 340 14" fill="none" stroke="#D86B48" strokeWidth="3.5" strokeLinecap="round" opacity=".8" />
        </g>
      )
    },
  },

  drizzle: {
    h: 44, top: 6, a: 22,
    draw: ({ color = 'smashlab' }) => {
      const c = SAUCES[color] || SAUCES.smashlab
      const pts = []
      for (let i = 0; i <= 16; i++) pts.push([24 + i * 22, i % 2 ? 8 : 32])
      const d = smoothOpen(pts, 1.1)
      return (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={d} stroke={INK} strokeWidth="13" />
          <path d={d} stroke={c.fill} strokeWidth="7" />
          <path d={d} stroke={c.hi} strokeWidth="2" opacity=".9" transform="translate(-1 -2)" />
        </g>
      )
    },
  },

  croissantBottom: {
    h: 64, top: 16, a: 56,
    draw: ({ p }) => (
      <g>
        <path d="M14 34 Q24 14 80 16 H320 Q376 14 386 34 Q392 56 344 58 H56 Q8 56 14 34 Z" fill={`url(#${p}-croissant)`} {...O} />
        <ellipse cx="200" cy="20" rx="160" ry="7" fill="#F7D08C" {...thin} />
        {[90, 150, 210, 270, 330].map((x) => (
          <path key={x} d={`M${x - 30} 40 Q${x} 50 ${x + 24} 40`} fill="none" stroke="#7A3A0C" strokeWidth="3" opacity=".7" />
        ))}
      </g>
    ),
  },

  croissantTop: {
    h: 178, top: 0, a: 162,
    draw: ({ p }) => (
      <g>
        <path d="M6 150 C0 112 30 96 56 100 C66 52 128 18 200 16 C272 18 334 52 344 100 C370 96 400 112 394 150 Q390 170 358 168 H42 Q10 170 6 150 Z" fill={`url(#${p}-croissant)`} {...O} />
        {[
          'M56 100 Q74 136 66 168',
          'M120 44 Q140 110 126 168',
          'M200 16 Q214 96 200 168',
          'M280 44 Q262 110 274 168',
          'M344 100 Q326 136 334 168',
        ].map((d) => (
          <path key={d} d={d} fill="none" stroke="#6E3008" strokeWidth="4.5" strokeLinecap="round" />
        ))}
        <path d="M84 70 Q150 30 200 28" fill="none" stroke="#FFE7B0" strokeWidth="7" strokeLinecap="round" opacity=".75" />
        <ellipse cx="236" cy="56" rx="22" ry="8" fill="#fff" opacity=".6" transform="rotate(14 236 56)" />
        <path d="M14 150 Q60 162 200 162 Q340 162 386 150 Q384 166 358 166 H42 Q16 166 14 150Z" fill="#F7D08C" opacity=".9" />
      </g>
    ),
  },
}
