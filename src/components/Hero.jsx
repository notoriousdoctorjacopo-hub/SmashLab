import { useRef } from 'react'
import { motion } from 'framer-motion'
import BurgerArt from '../art/BurgerArt'
import { Fries, CheeseSplash, OnionRing, SodaCan, Wipe } from '../art/Cutouts'
import { MENU } from '../data/menu'
import { gsap, reducedMotion, scrollToId, useIsoLayoutEffect, SNAP } from '../lib/motion'

const DEVASTANTE = MENU[0]

// x/y in % of the hero, size in vw, depth drives scroll + mouse parallax.
const FLOATERS = [
  { C: Fries, x: 4, y: 16, w: 13, rot: -14, depth: 1 },
  { C: OnionRing, x: 80, y: 12, w: 12, rot: 18, depth: 0.7 },
  { C: CheeseSplash, x: 66, y: 58, w: 9, rot: 0, depth: 1.3 },
  { C: SodaCan, x: 86, y: 52, w: 7.5, rot: 14, depth: 0.5 },
  { C: Wipe, x: 13, y: 60, w: 10, rot: -18, depth: 0.85 },
]

function Chars({ text, className }) {
  return (
    <span className={`hero-line block overflow-hidden ${className}`} aria-hidden="true">
      {[...text].map((c, i) => (
        <span key={i} className="inline-block will-change-transform">
          {c === ' ' ? '\u00A0' : c}
        </span>
      ))}
    </span>
  )
}

export default function Hero({ onOpen }) {
  const root = useRef(null)

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion()) return

      // The one orchestrated entrance: type slams up, burger drops, props pop.
      const tl = gsap.timeline({ defaults: { ease: 'back.out(1.7)' }, delay: 0.15 })
      tl.from('.hero-line > span', { yPercent: 115, duration: 0.45, stagger: { amount: 0.55 } })
        .from('.hero-burger', { y: () => -window.innerHeight * 1.1, rotate: -40, duration: 0.75, ease: 'bounce.out' }, '-=0.25')
        .from('.hero-float-in', { scale: 0, rotate: -120, duration: 0.3, stagger: 0.06 }, '-=0.35')
        .from('.hero-foot > *', { y: 40, opacity: 0, duration: 0.3, stagger: 0.07 }, '-=0.2')

      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to('.hero-burger-wrap', { yPercent: 22, scale: 0.86, rotate: 6, ease: 'none', scrollTrigger: st })
      gsap.to('.hero-title', { yPercent: -28, ease: 'none', scrollTrigger: st })
      gsap.utils.toArray('.hero-float').forEach((el) => {
        const d = Number(el.dataset.depth)
        gsap.to(el, { yPercent: -140 * d, rotate: 40 * d, ease: 'none', scrollTrigger: st })
      })

      // Mouse parallax, only with a real pointer.
      if (window.matchMedia('(pointer: fine)').matches) {
        const movers = gsap.utils.toArray('.hero-float-mouse').map((el) => ({
          d: Number(el.dataset.depth),
          x: gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' }),
          y: gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' }),
        }))
        const burgerX = gsap.quickTo('.hero-burger', 'x', { duration: 0.8, ease: 'power3.out' })
        const burgerR = gsap.quickTo('.hero-burger', 'rotate', { duration: 0.8, ease: 'power3.out' })
        const onMove = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5
          const ny = e.clientY / window.innerHeight - 0.5
          movers.forEach((m) => {
            m.x(nx * 70 * m.d)
            m.y(ny * 50 * m.d)
          })
          burgerX(nx * -18)
          burgerR(nx * -4)
        }
        root.current.addEventListener('pointermove', onMove)
      }
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="top" ref={root} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-black pt-24">
      {/* the real burger, as a red duotone ghost */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[52vw] opacity-50" aria-hidden="true">
        <img src="/media/burger-duo.webp" alt="" className="h-full w-full object-cover mix-blend-lighten [mask-image:linear-gradient(to_left,#000_30%,transparent)]" />
        <div className="halftone absolute inset-0" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-[48%] h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,30,45,.38),transparent_65%)]" aria-hidden="true" />

      <h1 className="hero-title relative z-10 px-4 text-center">
        <span className="sr-only">SmashLab: burger e hot dog devastanti</span>
        <Chars text="Burger & hot dog" className="ml-[6vw] -rotate-3 pb-1 text-left font-marker text-[clamp(26px,3.2vw,52px)] leading-tight text-volt" />
        <span className="relative block">
          <Chars
            text="DEVASTANTI."
            className="absolute inset-x-0 top-0 translate-x-[0.6vw] translate-y-[0.6vw] font-display text-[19.5vw] leading-[0.95] text-neon"
          />
          <Chars text="DEVASTANTI." className="relative font-display text-[19.5vw] leading-[0.95] text-bone" />
        </span>
      </h1>

      <div className="hero-burger-wrap pointer-events-none relative z-20 mx-auto -mt-[16vw] mb-4 w-[min(72vw,48vh)] md:absolute md:inset-x-0 md:top-[11%] md:mb-0 md:mt-0 md:w-[min(34vw,52vh)]">
        <button
          type="button"
          onClick={() => onOpen(0)}
          className="hero-burger shake-on-hover pointer-events-auto block w-full"
          aria-label="Smonta il Devastante e guarda cosa c'è dentro"
        >
          <span className="block -rotate-6">
            <BurgerArt recipe={DEVASTANTE.recipe} className="shake-target rim w-full" title="Il Devastante" />
          </span>
        </button>
      </div>

      {FLOATERS.map(({ C, x, y, w, rot, depth }, i) => (
        <div
          key={i}
          className="hero-float pointer-events-none absolute z-30"
          data-depth={depth}
          style={{ left: `${x}%`, top: `${y}%`, '--w': w }}
          aria-hidden="true"
        >
          <div className="hero-float-mouse" data-depth={depth}>
            <div className="hero-float-in" style={{ transform: `rotate(${rot}deg)` }}>
              <C className="rim w-full" />
            </div>
          </div>
        </div>
      ))}

      <div className="hero-foot relative z-30 mt-auto flex flex-wrap items-end justify-between gap-5 px-5 pb-8 md:gap-8 md:px-10 md:pb-10">
        <p className="max-w-[34ch] text-base font-semibold leading-snug text-bone md:text-xl">
          180 grammi di manzo in due palline. Le schiacciamo sulla piastra finché il bordo diventa pizzo croccante. Poi cheddar, finché non cola sul tavolo.
        </p>
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <span className="sticker rotate-3 bg-volt text-xl md:text-2xl">
            €12 <small className="font-body text-sm font-extrabold normal-case">panino + patatine</small>
          </span>
          <motion.button whileTap={{ scale: 0.94 }} transition={SNAP} type="button" onClick={() => scrollToId('menu')} className="btn bg-volt">
            Apri il menu
          </motion.button>
          <motion.button whileTap={{ scale: 0.94 }} transition={SNAP} type="button" onClick={() => onOpen(0)} className="btn bg-neon">
            Smonta il Devastante
          </motion.button>
        </div>
      </div>
    </section>
  )
}
