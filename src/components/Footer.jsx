import { motion } from 'framer-motion'
import { Logo } from '../art/Cutouts'
import { INSTAGRAM } from './Nav'
import { SNAP } from '../lib/motion'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-neon text-black">
      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-16 md:px-10 md:pt-24">
        <div className="grid grid-cols-12 items-end gap-8">
          <h2 className="col-span-12 font-display text-[clamp(60px,10vw,170px)] uppercase leading-[0.86] lg:col-span-8">
            Vieni a litigare da noi.
          </h2>
          <div className="col-span-12 lg:col-span-4">
            <p className="max-w-[34ch] text-lg font-bold leading-snug md:text-xl">
              Siamo a Terni. Orari, panini nuovi e polemiche fresche li trovi su Instagram, prima di chiunque altro.
            </p>
            <motion.a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              whileTap={{ scale: 0.94 }}
              transition={SNAP}
              className="btn mt-6 bg-black text-volt"
            >
              Apri @smashlab.terni
            </motion.a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start gap-4 rounded-2xl bg-black px-6 py-7 md:mt-20 md:flex-row md:items-center md:justify-between md:px-10">
          <Logo className="h-auto w-full max-w-[420px]" title="SmashLab" />
          <p className="font-body text-lg font-semibold text-bone md:text-2xl">Burger &amp; Hotdog devastanti</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-between gap-4 text-sm font-bold">
          <p>SmashLab® Terni</p>
          <p>Panino + patatine o menù con bibita. +2€ e la bibita diventa birra 33cl.</p>
          <p>© 2026</p>
        </div>
      </div>
    </footer>
  )
}
