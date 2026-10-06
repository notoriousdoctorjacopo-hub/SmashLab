import { useId, useMemo } from 'react'
import { motion } from 'framer-motion'
import { LAYERS, Defs } from './layers'

const EASE_BACK = [0.34, 1.56, 0.64, 1]

// Compute where every ingredient sits, assembled and exploded.
export function layout(recipe, gap = 0, margin = 24) {
  let stack = 0
  const rows = recipe.map((item) => {
    const L = LAYERS[item.l]
    const row = { ...item, L, S: stack }
    stack += L.a - L.top
    return row
  })
  const last = rows[rows.length - 1]
  const T = stack + last.L.top + 12 // assembled height incl. the top piece's crown
  const n = rows.length
  const spread = gap * (n - 1)
  rows.forEach((row, i) => {
    // y of the drawing's origin when assembled (centered inside the exploded box)
    row.base = T - row.S - row.L.a + margin + spread / 2
    row.delta = spread / 2 - i * gap // bottom layers drop, top layers rise
    row.mid = (row.L.top + row.L.a) / 2
  })
  return { rows, height: T + spread + margin * 2 + 40 }
}

export default function BurgerArt({
  recipe,
  exploded = false,
  labels = false,
  gap = 70,
  className = '',
  title,
  rim = labels,
  side = 'alternate', // 'right' puts every label on the right: used on phones
}) {
  const uid = useId().replace(/[:]/g, '')
  const p = `b${uid}`
  const { rows, height } = useMemo(() => layout(recipe, labels ? gap : 0), [recipe, gap, labels])

  const oneSide = side === 'right'
  const vbX = labels ? (oneSide ? -20 : -400) : -14
  const vbW = labels ? (oneSide ? 860 : 1200) : 428
  const labelSize = oneSide ? 36 : 30
  const noteSize = oneSide ? 22 : 17

  return (
    <svg
      viewBox={`${vbX} 0 ${vbW} ${height}`}
      className={className}
      role="img"
      aria-label={title}
      overflow="visible"
    >
      <Defs p={p} />
      {rows.map((row, i) => {
        const right = oneSide || i % 2 === 0
        const labelY = row.mid
        return (
          <g key={i} transform={`translate(0 ${row.base.toFixed(1)})`}>
            <motion.g
              initial={false}
              animate={{ y: exploded ? row.delta : 0 }}
              transition={{
                duration: 0.55,
                ease: EASE_BACK,
                delay: exploded ? (rows.length - 1 - i) * 0.045 : i * 0.03,
              }}
            >
              <g filter={rim ? `url(#${p}-rim)` : undefined}>{row.L.draw({ p, seed: 17 + i * 31, color: row.color })}</g>
              {labels && (
                <motion.g
                  initial={false}
                  animate={{ opacity: exploded ? 1 : 0, x: exploded ? 0 : right ? -30 : 30 }}
                  transition={{ duration: 0.3, ease: EASE_BACK, delay: exploded ? 0.35 + (rows.length - 1 - i) * 0.04 : 0 }}
                >
                  <circle cx={right ? 384 : 16} cy={labelY} r="7" fill="#FFE600" stroke="#000" strokeWidth="3" />
                  <path
                    d={right ? `M384 ${labelY} H460 L478 ${labelY - 14}` : `M16 ${labelY} H-60 L-78 ${labelY - 14}`}
                    fill="none"
                    stroke="#FFE600"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <text
                    x={right ? 486 : -86}
                    y={labelY - 10}
                    textAnchor={right ? 'start' : 'end'}
                    className="font-marker"
                    fontSize={labelSize}
                    fill="#fff"
                  >
                    {row.label}
                  </text>
                  {row.note && (
                    <text
                      x={right ? 486 : -86}
                      y={labelY + (oneSide ? 26 : 20)}
                      textAnchor={right ? 'start' : 'end'}
                      fontFamily="Archivo, sans-serif"
                      fontWeight="600"
                      fontSize={noteSize}
                      fill="#FFB199"
                    >
                      {row.note}
                    </text>
                  )}
                </motion.g>
              )}
            </motion.g>
          </g>
        )
      })}
    </svg>
  )
}
