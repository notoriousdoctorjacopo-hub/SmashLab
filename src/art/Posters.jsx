import { useId } from 'react'
import { rng } from '../lib/geo'

const O = { stroke: '#000', strokeWidth: 6, strokeLinejoin: 'round', strokeLinecap: 'round' }

// Ragged paper outline: a wheatpasted poster ripped off a wall a few times.
function torn(w, h, seed, j = 7) {
  const r = rng(seed)
  const pts = []
  const step = 18
  for (let x = 0; x <= w; x += step) pts.push([x, (r() - 0.3) * j])
  for (let y = step; y <= h; y += step) pts.push([w + (r() - 0.7) * j, y])
  for (let x = w - step; x >= 0; x -= step) pts.push([x, h + (r() - 0.7) * j])
  for (let y = h - step; y > 0; y -= step) pts.push([(r() - 0.3) * j, y])
  return 'M' + pts.map((p) => p.map((n) => n.toFixed(1)).join(',')).join('L') + 'Z'
}

function Paper({ id, w = 360, h = 480, seed, fill, dots = '#000', dotsOpacity = 0.16, children }) {
  const path = torn(w, h, seed)
  return (
    <>
      <defs>
        <clipPath id={`${id}-clip`}>
          <path d={path} />
        </clipPath>
        <pattern id={`${id}-dots`} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
          <circle cx="4.5" cy="4.5" r="2.1" fill={dots} />
        </pattern>
        <radialGradient id={`${id}-fade`} cx=".85" cy=".1" r=".9">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".55" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={`${id}-mask`}>
          <rect width={w} height={h} fill={`url(#${id}-fade)`} />
        </mask>
      </defs>
      <path d={path} fill="#000" transform="translate(6 8)" opacity=".55" />
      <g clipPath={`url(#${id}-clip)`}>
        <rect x="-10" y="-10" width={w + 20} height={h + 20} fill={fill} />
        <rect width={w} height={h} fill={`url(#${id}-dots)`} opacity={dotsOpacity} mask={`url(#${id}-mask)`} />
        {children}
        {/* fold creases */}
        <path d={`M0 ${h * 0.52} L${w} ${h * 0.48}`} stroke="#000" strokeOpacity=".12" strokeWidth="2" />
      </g>
    </>
  )
}

function Tape({ x, y, rot }) {
  return <rect x={x} y={y} width="74" height="24" fill="#E9E2CF" opacity=".78" transform={`rotate(${rot} ${x + 37} ${y + 12})`} />
}

function Rays({ cx, cy, n = 18, color, len = 420 }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const a0 = (i / n) * Math.PI * 2
        const a1 = a0 + Math.PI / n
        return (
          <path
            key={i}
            d={`M${cx} ${cy} L${cx + Math.cos(a0) * len} ${cy + Math.sin(a0) * len} L${cx + Math.cos(a1) * len} ${cy + Math.sin(a1) * len}Z`}
            fill={color}
          />
        )
      })}
    </g>
  )
}

const stencil = { fontFamily: 'Anton, Impact, sans-serif', letterSpacing: 1 }

export function PosterRaccoon({ className, title = 'Procione punk che azzanna un hot dog' }) {
  const id = 'pr' + useId().replace(/:/g, '')
  return (
    <svg viewBox="-12 -12 384 504" className={className} role="img" aria-label={title}>
      <Paper id={id} seed={4} fill="#FFE600">
        <Rays cx={180} cy={215} color="#FFC800" />
        <text x="180" y="64" textAnchor="middle" fontSize="58" fill="#000" style={stencil}>MORDI PRIMA.</text>
        {/* hoodie */}
        <path d="M30 480 C40 380 100 340 180 340 C260 340 320 380 330 480Z" fill="#111" {...O} />
        <path d="M150 352 L146 420 M210 352 L214 420" stroke="#FF1E2D" strokeWidth="6" strokeLinecap="round" />
        {/* ears */}
        <path d="M86 150 L96 70 L156 120Z" fill="#6E6E78" {...O} />
        <path d="M274 150 L264 70 L204 120Z" fill="#6E6E78" {...O} />
        <path d="M102 128 L106 92 L136 118Z" fill="#26262C" />
        <path d="M258 128 L254 92 L224 118Z" fill="#26262C" />
        {/* mohawk */}
        {[
          [142, 112, 60],
          [160, 100, 84],
          [180, 96, 96],
          [200, 100, 84],
          [218, 112, 60],
        ].map(([x, y, hgt], i) => (
          <path key={i} d={`M${x - 15} ${y + 14} L${x} ${y - hgt} L${x + 15} ${y + 14}Z`} fill={i % 2 ? '#FF6A00' : '#FF1E2D'} {...O} />
        ))}
        {/* head with fluffy cheeks */}
        <path
          d="M78 214 C70 150 120 112 180 112 C240 112 290 150 282 214 L304 236 L276 244 L292 266 L258 266 C244 300 214 316 180 316 C146 316 116 300 102 266 L68 266 L84 244 L56 236Z"
          fill="#8D8D98"
          {...O}
        />
        {/* brows */}
        <ellipse cx="136" cy="168" rx="30" ry="12" fill="#ECECF2" transform="rotate(12 136 168)" />
        <ellipse cx="224" cy="168" rx="30" ry="12" fill="#ECECF2" transform="rotate(-12 224 168)" />
        {/* bandit mask */}
        <path d="M70 206 C96 178 150 176 180 196 C210 176 264 178 290 206 C270 236 222 238 180 220 C138 238 90 236 70 206Z" fill="#141418" {...O} />
        <ellipse cx="140" cy="206" rx="17" ry="15" fill="#fff" />
        <ellipse cx="220" cy="206" rx="17" ry="15" fill="#fff" />
        <circle cx="146" cy="211" r="8" fill="#000" />
        <circle cx="226" cy="211" r="8" fill="#000" />
        <circle cx="143" cy="207" r="2.6" fill="#fff" />
        <circle cx="223" cy="207" r="2.6" fill="#fff" />
        {/* muzzle */}
        <path d="M128 252 C128 222 232 222 232 252 C232 290 128 290 128 252Z" fill="#F1F1F6" {...O} />
        <path d="M166 230 Q180 222 194 230 Q190 246 180 248 Q170 246 166 230Z" fill="#000" />
        {/* open mouth biting */}
        <path d="M146 262 Q180 252 214 262 Q206 296 180 298 Q154 296 146 262Z" fill="#5C0B0B" {...O} />
        <path d="M152 263 L160 275 L168 262Z M192 262 L200 275 L208 263Z" fill="#fff" />
        {/* hot dog */}
        <g transform="rotate(-9 180 292)">
          <rect x="44" y="282" width="272" height="30" rx="15" fill="#C7442B" {...O} />
          <path d="M60 292 H300" stroke="#FF9C80" strokeWidth="5" strokeLinecap="round" />
          <path d="M66 300 Q66 330 96 330 H264 Q294 330 294 300Z" fill="#E8962F" {...O} />
          <path d="M70 292 L90 284 L110 296 L130 284 L150 296 L170 284 L190 296 L210 284 L230 296 L250 284 L270 296 L290 286" fill="none" stroke="#000" strokeWidth="9" strokeLinejoin="round" />
          <path d="M70 292 L90 284 L110 296 L130 284 L150 296 L170 284 L190 296 L210 284 L230 296 L250 284 L270 296 L290 286" fill="none" stroke="#FFD21F" strokeWidth="4.5" strokeLinejoin="round" />
        </g>
        {/* paws */}
        <path d="M30 318 C30 296 62 290 74 306 C82 320 70 340 50 340 C38 340 30 330 30 318Z" fill="#6E6E78" {...O} />
        <path d="M330 296 C330 274 298 268 286 284 C278 298 290 318 310 318 C322 318 330 308 330 296Z" fill="#6E6E78" {...O} />
        {/* slogan */}
        <text x="180" y="456" textAnchor="middle" fontSize="40" fill="#FFE600" style={stencil}>CHIEDI DOPO.</text>
      </Paper>
      <Tape x={-18} y={-6} rot={-28} />
      <Tape x={300} y={448} rot={-24} />
    </svg>
  )
}

export function PosterGirl({ className, title = 'Ragazza pop-art con buzz cut rosa che morde un burger' }) {
  const id = 'pg' + useId().replace(/:/g, '')
  const skin = '#9A5F3E'
  return (
    <svg viewBox="-12 -12 384 504" className={className} role="img" aria-label={title}>
      <Paper id={id} seed={11} fill="#FF1E2D" dots="#7A0008" dotsOpacity={0.35}>
        {/* neck + shoulder */}
        <path d="M120 330 L232 322 L246 400 C290 410 330 440 340 492 L20 492 C30 430 80 404 126 396Z" fill={skin} {...O} />
        <path d="M20 492 C34 440 80 414 130 408 L150 440 L210 440 L240 410 C292 418 328 446 340 492Z" fill="#111" {...O} />
        {/* comic burst */}
        <g transform="translate(-6 168)">
          <path d="M300 250 L338 214 L332 250 L372 252 L336 272 L360 304 L320 292 L314 334 L292 300 L262 326 L268 288 L230 292 L262 266 L236 238 L274 244 L272 204Z" fill="#FFE600" {...O} />
          <text x="300" y="282" textAnchor="middle" fontSize="30" fill="#000" style={stencil} transform="rotate(-10 300 276)">CHOMP!</text>
        </g>
        {/* head profile */}
        <path
          d="M118 336 C96 290 78 236 88 184 C100 122 150 92 202 96 C246 100 270 132 272 168 L276 192 C280 204 296 216 300 230 L286 238 C286 244 290 248 292 252 L262 262 L296 286 C296 298 284 304 276 306 C268 324 248 334 226 332Z"
          fill={skin}
          {...O}
        />
        {/* mouth interior + teeth */}
        <path d="M292 252 L262 262 L296 286Z" fill="#4A0606" />
        <path d="M290 253 L280 256 L284 262Z M292 284 L282 280 L286 274Z" fill="#fff" />
        {/* buzz cut */}
        <path d="M86 196 C84 128 140 90 204 96 C244 100 266 124 270 154 C240 132 200 128 170 140 C150 150 140 176 132 214 C116 200 98 196 86 196Z" fill="#FF5FA2" {...O} />
        <g fill="#C2236F" opacity=".7">
          {Array.from({ length: 40 }, (_, i) => (
            <circle key={i} cx={100 + ((i * 37) % 150)} cy={108 + ((i * 23) % 80)} r="1.6" />
          ))}
        </g>
        {/* ear + gold hoop */}
        <path d="M150 200 C134 196 128 222 138 236 C146 246 160 240 160 228Z" fill="#7E4A2E" {...O} />
        <circle cx="146" cy="268" r="26" fill="none" stroke="#000" strokeWidth="12" />
        <circle cx="146" cy="268" r="26" fill="none" stroke="#FFD21F" strokeWidth="6" />
        {/* eye + brow */}
        <path d="M226 174 Q246 160 266 172 Q248 184 226 174Z" fill="#fff" {...O} strokeWidth="4" />
        <circle cx="252" cy="172" r="6" fill="#000" />
        <path d="M222 172 Q244 152 272 166 L284 158" fill="none" stroke="#000" strokeWidth="6" strokeLinecap="round" />
        <path d="M220 150 Q244 136 270 146" fill="none" stroke="#000" strokeWidth="8" strokeLinecap="round" />
        {/* cheek shading dots */}
        <g fill="#6E3E25">
          {Array.from({ length: 22 }, (_, i) => (
            <circle key={i} cx={196 + (i % 6) * 9} cy={210 + Math.floor(i / 6) * 9} r="2.2" />
          ))}
        </g>
        {/* burger in hand */}
        <g transform="translate(250 196) rotate(8)">
          <path d="M40 54 Q40 6 86 6 Q132 6 132 54Z" fill="#F0A13A" {...O} strokeWidth="5" />
          <ellipse cx="70" cy="26" rx="14" ry="5" fill="#fff" opacity=".8" transform="rotate(-20 70 26)" />
          <path d="M34 56 H138 L132 64 L120 82 L114 66 L94 76 L88 64 L66 80 L62 64 L40 64Z" fill="#FFB21A" {...O} strokeWidth="4" />
          <rect x="32" y="64" width="108" height="18" rx="8" fill="#5B2A16" {...O} strokeWidth="5" />
          <path d="M38 84 H134 Q134 102 116 102 H56 Q38 102 38 84Z" fill="#E28B2A" {...O} strokeWidth="5" />
        </g>
        {/* hand */}
        <path d="M272 330 C262 314 270 296 288 300 L300 298 C312 290 326 296 324 310 C334 312 336 330 322 336 C316 352 290 356 280 344Z" fill={skin} {...O} />
        <text x="24" y="58" fontSize="50" fill="#000" style={stencil}>NIENTE</text>
        <text x="24" y="104" fontSize="50" fill="#FFE600" style={stencil} stroke="#000" strokeWidth="2">FORCHETTE.</text>
      </Paper>
      <Tape x={130} y={-14} rot={4} />
      <Tape x={290} y={456} rot={18} />
    </svg>
  )
}

export function PosterBull({ className, title = 'Toro in canotta che solleva una pressa da smash' }) {
  const id = 'pb' + useId().replace(/:/g, '')
  const hide = '#3B2418'
  return (
    <svg viewBox="-12 -12 384 504" className={className} role="img" aria-label={title}>
      <Paper id={id} seed={23} fill="#FF6A00" dots="#5A1A00" dotsOpacity={0.3}>
        <Rays cx={180} cy={250} color="#FF8A1F" n={22} />
        {/* barbell made of two smash presses */}
        <rect x="10" y="66" width="340" height="14" rx="7" fill="#1A1A1A" {...O} strokeWidth="5" />
        {[18, 266].map((x) => (
          <g key={x}>
            <rect x={x} y="30" width="76" height="86" rx="6" fill="#C9CDD4" {...O} />
            <rect x={x + 8} y="38" width="22" height="70" fill="#fff" opacity=".45" />
            <rect x={x + 26} y="18" width="24" height="16" rx="5" fill="#111" {...O} strokeWidth="4" />
          </g>
        ))}
        {/* arms up */}
        <path d="M84 300 C70 250 74 170 112 92 L140 98 C122 160 124 230 138 280Z" fill={hide} {...O} />
        <path d="M276 300 C290 250 286 170 248 92 L220 98 C238 160 236 230 222 280Z" fill={hide} {...O} />
        <ellipse cx="124" cy="80" rx="22" ry="18" fill={hide} {...O} />
        <ellipse cx="236" cy="80" rx="22" ry="18" fill={hide} {...O} />
        <path d="M96 210 Q110 190 122 214 M264 210 Q250 190 238 214" fill="none" stroke="#6E4630" strokeWidth="5" strokeLinecap="round" />
        {/* tank top body */}
        <path d="M60 492 C56 380 96 300 180 296 C264 300 304 380 300 492Z" fill={hide} {...O} />
        <path d="M100 492 C98 400 120 334 140 318 L220 318 C240 334 262 400 260 492Z" fill="#111" {...O} />
        <text x="180" y="410" textAnchor="middle" fontSize="44" fill="#FF1E2D" style={stencil}>SMASH</text>
        {/* horns */}
        <path d="M118 176 C80 172 58 140 66 104 C82 128 104 140 132 146Z" fill="#F2E6C8" {...O} />
        <path d="M242 176 C280 172 302 140 294 104 C278 128 256 140 228 146Z" fill="#F2E6C8" {...O} />
        {/* ears */}
        <path d="M112 182 L76 196 L116 208Z" fill={hide} {...O} />
        <path d="M248 182 L284 196 L244 208Z" fill={hide} {...O} />
        {/* head */}
        <path d="M118 150 C130 128 230 128 242 150 C252 190 244 230 230 254 L130 254 C116 230 108 190 118 150Z" fill={hide} {...O} />
        <path d="M150 140 L162 162 L172 138 L182 160 L192 138 L200 160 L212 140" fill="none" stroke="#000" strokeWidth="5" strokeLinejoin="round" />
        {/* angry eyes */}
        <path d="M132 184 L170 196 L164 208 L136 200Z" fill="#fff" {...O} strokeWidth="4" />
        <path d="M228 184 L190 196 L196 208 L224 200Z" fill="#fff" {...O} strokeWidth="4" />
        <circle cx="158" cy="200" r="5" fill="#FF1E2D" />
        <circle cx="202" cy="200" r="5" fill="#FF1E2D" />
        <path d="M126 174 L174 190 M234 174 L186 190" stroke="#000" strokeWidth="8" strokeLinecap="round" />
        {/* snout + ring */}
        <path d="M128 236 C128 212 232 212 232 236 C232 270 212 286 180 286 C148 286 128 270 128 236Z" fill="#C98A6C" {...O} />
        <ellipse cx="158" cy="246" rx="9" ry="7" fill="#2A120A" />
        <ellipse cx="202" cy="246" rx="9" ry="7" fill="#2A120A" />
        <path d="M168 262 A14 14 0 1 0 192 262" fill="none" stroke="#000" strokeWidth="11" />
        <path d="M168 262 A14 14 0 1 0 192 262" fill="none" stroke="#FFD21F" strokeWidth="6" />
        {/* steam */}
        <path d="M118 262 C100 258 92 272 100 280 C86 284 90 300 104 298" fill="#fff" {...O} strokeWidth="4" />
        <path d="M242 262 C260 258 268 272 260 280 C274 284 270 300 256 298" fill="#fff" {...O} strokeWidth="4" />
        <rect x="-10" y="428" width="380" height="56" fill="#000" transform="rotate(-2 180 456)" />
        <text x="180" y="472" textAnchor="middle" fontSize="42" fill="#FF6A00" style={stencil} transform="rotate(-2 180 456)">SCHIACCIA FORTE.</text>
      </Paper>
      <Tape x={-16} y={200} rot={-70} />
      <Tape x={296} y={-8} rot={22} />
    </svg>
  )
}
