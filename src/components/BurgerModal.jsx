import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BurgerArt from '../art/BurgerArt'
import { MENU } from '../data/menu'
import { lockScroll, SNAP, EASE_BACK, useIsMobile } from '../lib/motion'

export default function BurgerModal({ index, onClose, onNav }) {
  const item = MENU[index]
  const [exploded, setExploded] = useState(false)
  const closeRef = useRef(null)
  const compact = useIsMobile('(max-width: 1023px)')
  const handlers = useRef({ onClose, onNav })
  handlers.current = { onClose, onNav }

  // Lock the page, wire the keyboard, focus the close button.
  useEffect(() => {
    lockScroll(true)
    const prev = document.activeElement
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') handlers.current.onClose()
      if (e.key === 'ArrowRight') handlers.current.onNav(1)
      if (e.key === 'ArrowLeft') handlers.current.onNav(-1)
      if (e.key === ' ' && e.target === document.body) {
        e.preventDefault()
        setExploded((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      lockScroll(false)
      window.removeEventListener('keydown', onKey)
      prev?.focus?.()
    }
  }, [])

  // Every new burger lands assembled, then blows apart.
  useEffect(() => {
    setExploded(false)
    const t = setTimeout(() => setExploded(true), 380)
    return () => clearTimeout(t)
  }, [index])

  const controls = (
    <>
            <motion.button whileTap={{ scale: 0.92 }} transition={SNAP} type="button" className="btn bg-volt" onClick={() => setExploded((v) => !v)} aria-pressed={!exploded}>
              {exploded ? 'Rimontalo' : 'Smontalo'}
            </motion.button>
            <div className="flex gap-2">
              <motion.button whileTap={{ scale: 0.88 }} transition={SNAP} type="button" className="btn bg-bone px-4" onClick={() => onNav(-1)} aria-label="Panino precedente">
                ‹
              </motion.button>
              <motion.button whileTap={{ scale: 0.88 }} transition={SNAP} type="button" className="btn bg-bone px-4" onClick={() => onNav(1)} aria-label="Panino successivo">
                ›
              </motion.button>
            </div>
              </>
  )

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[80] overflow-hidden bg-black"
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ clipPath: 'circle(0% at 50% 50%)' }}
      transition={{ duration: 0.45, ease: [0.7, 0, 0.2, 1] }}
    >
      <div className="halftone pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute right-[18%] top-1/2 h-[90vh] w-[90vh] -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: `radial-gradient(circle, ${item.accent}, transparent 65%)` }}
        aria-hidden="true"
      />

      <div className="relative flex h-full flex-col lg:grid lg:grid-cols-[minmax(340px,30%)_1fr]">
        <div className="relative z-10 flex flex-col justify-center gap-6 px-5 pr-20 pt-5 lg:px-12 lg:py-10 lg:pr-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ y: 40, opacity: 0, rotate: -2 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -30, opacity: 0 }}
              transition={SNAP}
            >
              <p className="-rotate-2 font-marker text-lg text-volt lg:text-2xl">Smontato pezzo per pezzo</p>
              <h2 id="modal-title" className="mt-1 font-display text-[clamp(40px,7vw,128px)] uppercase leading-[0.85] text-bone lg:mt-2">
                {item.name}
              </h2>
              <p className="mt-3 line-clamp-3 max-w-[38ch] text-sm font-medium leading-snug text-bone/90 lg:mt-6 lg:line-clamp-none lg:text-lg">{item.copy}</p>
              <div className="mt-3 flex flex-wrap gap-3 lg:mt-6">
                <span className="sticker -rotate-2 bg-volt text-xl lg:text-3xl">
                  €{item.prices[0]} <small className="font-body text-xs font-extrabold normal-case">panino + patatine</small>
                </span>
                <span className="sticker rotate-1 bg-neon text-xl lg:text-3xl">
                  €{item.prices[1]} <small className="font-body text-xs font-extrabold normal-case">menù con bibita</small>
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="hidden flex-wrap items-center gap-4 pt-2 lg:flex">{controls}</div>
          <p className="hidden text-sm font-semibold text-bone/50 lg:block">Esc per chiudere. Frecce per cambiare panino.</p>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              className="h-full w-full"
              initial={{ y: -120, opacity: 0, rotate: -6 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 120, opacity: 0, rotate: 6 }}
              transition={{ duration: 0.35, ease: EASE_BACK }}
            >
              <BurgerArt
                recipe={item.recipe}
                labels
                exploded={exploded}
                gap={compact ? 50 : 64}
                side={compact ? 'right' : 'alternate'}
                className="h-full max-h-[100svh] w-full py-2 lg:py-4"
                title={`${item.name}, ingredienti`}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-between gap-3 px-5 pb-6 pt-1 lg:hidden">{controls}</div>
      </div>

      <motion.button
        ref={closeRef}
        type="button"
        onClick={onClose}
        whileHover={{ rotate: 90, scale: 1.1 }}
        whileTap={{ scale: 0.85 }}
        transition={SNAP}
        className="absolute right-4 top-4 z-20 grid h-12 w-12 lg:right-6 lg:top-6 lg:h-14 lg:w-14 place-items-center border-[3px] border-black bg-neon font-display text-3xl text-black shadow-[5px_5px_0_#000]"
        aria-label="Chiudi"
      >
        ✕
      </motion.button>
    </motion.div>
  )
}
