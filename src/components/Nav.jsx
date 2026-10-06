import { motion } from 'framer-motion'
import { Logo } from '../art/Cutouts'
import { scrollToId, SNAP } from '../lib/motion'

const LINKS = [
  ['menu', 'Menu'],
  ['muro', 'Il muro'],
  ['vibe', 'Il posto'],
]

export const INSTAGRAM = 'https://www.instagram.com/smashlab.terni/'

export default function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent px-4 py-4 md:px-10 md:py-5">
      <button
        type="button"
        onClick={() => scrollToId('top')}
        className="pointer-events-auto"
        aria-label="SmashLab, torna su"
      >
        <Logo className="h-7 w-auto md:h-9" />
      </button>
      <nav className="pointer-events-auto flex items-center gap-1 md:gap-2" aria-label="Sezioni">
        {LINKS.map(([id, label]) => (
          <motion.button
            key={id}
            type="button"
            onClick={() => scrollToId(id)}
            whileHover={{ y: -3, rotate: -2 }}
            whileTap={{ scale: 0.92 }}
            transition={SNAP}
            className="hidden px-3 py-2 font-body text-[15px] font-extrabold text-bone hover:text-volt md:block"
          >
            {label}
          </motion.button>
        ))}
        <motion.a
          href={INSTAGRAM}
          target="_blank"
          rel="noreferrer"
          whileHover={{ rotate: -3, scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          transition={SNAP}
          className="ml-2 border-[3px] border-black bg-neon px-3 py-1.5 font-display text-base uppercase tracking-wide text-black shadow-[4px_4px_0_#000] md:px-4 md:py-2 md:text-lg"
        >
          @smashlab.terni
        </motion.a>
      </nav>
    </header>
  )
}
