import { motion } from 'framer-motion'
import { Logo } from '../art/Cutouts'
import { INSTAGRAM } from './Nav'
import { SNAP } from '../lib/motion'

const MAPS = 'https://www.google.com/maps/place/SMASHLAB/@42.5636423,12.6428556,648m/data=!3m2!1e3!4b1!4m6!3m5!1s0x132efb64b8cf6375:0x86454eea9177928d!8m2!3d42.5636384!4d12.6454305!16s%2Fg%2F11z2kd6mx7'

const HOURS = [
  ['Lun – Ven, Dom', '12:00–15:00', '19:00–23:00'],
  ['Sabato', '12:00–15:00', '19:00–23:30'],
]

function Info() {
  return (
    <div className="mt-12 grid gap-8 border-t-[3px] border-black pt-8 md:mt-16 md:grid-cols-3 md:gap-10">
      <div>
        <h3 className="font-display text-2xl uppercase leading-none">Dove</h3>
        <p className="mt-3 text-base font-bold leading-snug md:text-lg">
          Via San Marco 14
          <br />
          05100 Terni
        </p>
        <motion.a
          href={MAPS}
          target="_blank"
          rel="noreferrer"
          whileHover={{ rotate: -2 }}
          whileTap={{ scale: 0.94 }}
          transition={SNAP}
          className="mt-3 inline-block font-marker text-lg underline decoration-2 underline-offset-4"
        >
          Apri su Google Maps
        </motion.a>
      </div>
      <div>
        <h3 className="font-display text-2xl uppercase leading-none">Quando</h3>
        <dl className="mt-3 space-y-1.5 text-base font-bold md:text-lg">
          {HOURS.map(([days, lunch, dinner]) => (
            <div key={days} className="flex flex-wrap gap-x-3">
              <dt className="min-w-[8.5em]">{days}</dt>
              <dd>
                {lunch} · {dinner}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 text-sm font-semibold">Aperti tutti i giorni, pranzo e cena.</p>
      </div>
      <div>
        <h3 className="font-display text-2xl uppercase leading-none">Chiama</h3>
        <a href="tel:+393481846807" className="mt-3 inline-block text-base font-bold underline decoration-2 underline-offset-4 md:text-lg">
          348 184 6807
        </a>
        <p className="mt-2 text-sm font-semibold">Per l’asporto. Per litigare, vieni di persona.</p>
      </div>
    </div>
  )
}

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
              Via San Marco 14, Terni. Panini nuovi e polemiche fresche li trovi su Instagram, prima di chiunque altro.
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

        <Info />

        <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-black px-6 py-7 md:mt-16 md:flex-row md:items-center md:justify-between md:px-10">
          <Logo className="h-auto w-full max-w-[420px]" title="SmashLab" />
          <p className="font-body text-lg font-semibold text-bone md:text-2xl">Burger &amp; Hotdog devastanti</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-between gap-4 text-sm font-bold">
          <p>SmashLab® · Via San Marco 14, Terni</p>
          <p>Panino + patatine o menù con bibita. +2€ e la bibita diventa birra 33cl.</p>
          <p>© 2026</p>
        </div>
      </div>
    </footer>
  )
}
