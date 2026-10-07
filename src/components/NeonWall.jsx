import { useRef } from 'react'
import { PosterRaccoon, PosterGirl, PosterBull } from '../art/Posters'
import { Logo } from '../art/Cutouts'
import { rng } from '../lib/geo'
import { gsap, reducedMotion, useIsoLayoutEffect, useIsMobile } from '../lib/motion'

const SIGN = ['LAUREA IN', 'SCIENZE DELLA', 'POLEMICA']

function Bricks() {
  return (
    <img
      src="/media/wall.webp"
      alt=""
      aria-hidden="true"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
    />
  )
}

function SauceSticker() {
  return (
    <div className="grid aspect-square w-full place-items-center rounded-full border-[4px] border-black bg-volt text-center text-black shadow-[6px_6px_0_#000]">
      <p className="font-display text-[5vw] uppercase leading-[0.9] md:text-[2.2vw]">
        Salse
        <br />
        €0,30
      </p>
    </div>
  )
}

function BeerPasteUp() {
  return (
    <div className="w-full bg-black px-5 py-4 text-volt shadow-[6px_6px_0_rgba(0,0,0,.6)] [clip-path:polygon(0_4%,8%_0,30%_3%,55%_0,80%_4%,100%_1%,98%_40%,100%_96%,70%_100%,40%_97%,12%_100%,0_95%,2%_50%)]">
      <p className="font-display text-[6vw] uppercase leading-[0.9] md:text-[2.6vw]">+2€</p>
      <p className="font-display text-[3.4vw] uppercase leading-[1] md:text-[1.5vw]">e la bibita diventa birra</p>
    </div>
  )
}

function LogoSticker() {
  return (
    <div className="w-full rounded-xl border-[4px] border-black bg-black px-4 py-3 shadow-[6px_6px_0_rgba(0,0,0,.6)]">
      <Logo className="w-full" />
    </div>
  )
}

// depth: 1 = closest to you (moves most), lower = deeper in the wall.
// `m` = phone layout (portrait): posters above and below the sign instead of beside it.
const PASTE = [
  { k: 'raccoon', C: PosterRaccoon, pos: { left: '2.5vw', top: '8vh' }, w: '21vw', m: { pos: { left: '3vw', top: '9vh' }, w: '44vw' }, rot: -7, from: { xPercent: -170, rotate: -38 }, depth: 1 },
  { k: 'bull', C: PosterBull, pos: { right: '23vw', top: '-4vh' }, w: '15.5vw', m: { pos: { right: '4vw', top: '7vh' }, w: '38vw' }, rot: -4, from: { yPercent: -160, rotate: 24 }, depth: 0.55 },
  { k: 'girl', C: PosterGirl, pos: { right: '2.5vw', top: '36vh' }, w: '20vw', m: { pos: { right: '3vw', top: '63vh' }, w: '42vw' }, rot: 6, from: { xPercent: 170, rotate: 34 }, depth: 0.8 },
  { k: 'logo', C: LogoSticker, pos: { left: '5vw', top: '76vh' }, w: '15vw', m: { pos: { left: '5vw', top: '68vh' }, w: '42vw' }, rot: 7, from: { xPercent: -260, rotate: -60 }, depth: 0.7 },
  { k: 'sauce', C: SauceSticker, pos: { left: '26vw', top: '73vh' }, w: '9vw', m: { pos: { left: '12vw', top: '78vh' }, w: '22vw' }, rot: 8, from: { yPercent: 260 }, depth: 1.2 },
  { k: 'beer', C: BeerPasteUp, pos: { left: '64vw', top: '80vh' }, w: '15vw', m: null, rot: -4, from: { yPercent: 280, rotate: -20 }, depth: 0.9 },
]

export default function NeonWall() {
  const root = useRef(null)
  const mobile = useIsMobile()
  const pastes = PASTE.filter((p) => !mobile || p.m)

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion()) {
        gsap.set('.neon-on', { opacity: 1 })
        gsap.set('.wall-glow', { opacity: 0.9 })
        gsap.set('.wall-caption', { opacity: 1 })
        return
      }

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 0.35, // follows the scroll tightly, with just enough smoothing to stay fluid
          anticipatePin: 1,
        },
      })

      const flick = (target, at, pattern, step = 0.06) =>
        pattern.forEach((v, k) => tl.to(target, { opacity: v, duration: step }, at + k * step))

      // 1. The sign boots up, one tube at a time, badly.
      flick('.neon-on-0', 0.25, [1, 0, 0.7, 0, 0, 1])
      tl.to('.wall-glow', { opacity: 0.35, duration: 0.2 }, 0.4)
      flick('.neon-on-1', 0.95, [0.6, 0, 1, 0.15, 0, 1])
      tl.to('.wall-glow', { opacity: 0.65, duration: 0.2 }, 1.1)
      flick('.neon-on-2', 1.7, [1, 0, 1, 0, 0.35, 0, 0, 1])
      tl.to('.wall-glow', { opacity: 1, duration: 0.25 }, 2)

      // 2. Paste-ups slide in from the edges, staggered, each at its own depth.
      pastes.forEach((p, i) => {
        tl.from(`.paste-${p.k}`, { ...p.from, duration: 2.6, ease: 'power3.out' }, 1.2 + i * 0.55)
        // continuous depth parallax across the whole pin
        tl.fromTo(`.paste-${p.k}`, { y: 60 * p.depth }, { y: -110 * p.depth, duration: 9.6 }, 0)
      })

      // 3. While you scroll, the whole sign keeps misbehaving.
      const r = rng(77)
      for (let t = 2.6; t < 8.4; t += 0.32 + r() * 0.45) {
        const dip = 0.05 + r() * 0.45
        tl.to('.neon-on', { opacity: dip, duration: 0.04 }, t)
        tl.to('.neon-on', { opacity: 1, duration: 0.05 }, t + 0.05)
        tl.to('.wall-glow', { opacity: 0.4 + dip, duration: 0.04 }, t)
        tl.to('.wall-glow', { opacity: 1, duration: 0.05 }, t + 0.05)
      }
      tl.to('.wall-caption', { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }, 6.4)

      // 4. Glitch, then release.
      tl.to('.sign', { x: -16, skewX: 14, duration: 0.07 }, 8.7)
        .to('.glitch-a', { opacity: 0.9, x: -14, duration: 0.07 }, 8.7)
        .to('.glitch-b', { opacity: 0.9, x: 14, duration: 0.07 }, 8.7)
        .to('.sign', { x: 12, skewX: -9, duration: 0.07 }, 8.8)
        .to('.paste', { x: () => gsap.utils.random(-26, 26), duration: 0.07 }, 8.8)
        .to('.sign', { x: -6, skewX: 4, scaleY: 1.12, duration: 0.07 }, 8.9)
        .to('.neon-on', { opacity: 0, duration: 0.05 }, 9.0)
        .to('.neon-on', { opacity: 1, duration: 0.05 }, 9.08)
        .to('.sign', { x: 0, skewX: 0, scaleY: 1, duration: 0.1 }, 9.35)
        .to(['.glitch-a', '.glitch-b'], { opacity: 0, x: 0, duration: 0.1 }, 9.35)
        .to('.paste', { x: 0, duration: 0.1 }, 9.35)
        .to({}, { duration: 0.25 }, 9.65)
    }, root)
    return () => ctx.revert()
  }, [mobile])

  const signLines = (lit) =>
    SIGN.map((line, i) => (
      <span key={line} className={lit ? `neon-on neon-on-${i} block opacity-0` : 'block'}>
        {line}
      </span>
    ))

  return (
    <section id="muro" ref={root} className="relative h-[100svh] overflow-hidden bg-black" aria-labelledby="muro-title">
      <div className="wall-stage absolute inset-0">
        <Bricks />
        <div
          className="wall-glow pointer-events-none absolute left-1/2 top-[46%] h-[120vh] w-[140vh] -translate-x-1/2 -translate-y-1/2 opacity-0"
          style={{ background: 'radial-gradient(ellipse, rgba(255,30,45,.42), rgba(255,30,45,.1) 45%, transparent 70%)' }}
          aria-hidden="true"
        />

        {pastes.map(({ k, C, pos, w, m, rot, depth }) => (
          <div
            key={k}
            className={`paste paste-${k} absolute`}
            style={{ ...(mobile ? m.pos : pos), width: mobile ? m.w : w, zIndex: Math.round(depth * 10) }}
            aria-hidden={k !== 'raccoon' && k !== 'girl' && k !== 'bull'}
          >
            <div style={{ transform: `rotate(${rot}deg)` }}>
              <C className="w-full" />
            </div>
          </div>
        ))}

        <div className="absolute inset-0 z-[5] grid place-items-center">
          <div className="sign relative text-center font-marker text-[9.6vw] leading-[1.04] md:text-[min(6.2vw,11vh)]">
            <h2 id="muro-title" className="sr-only">
              Laurea in scienze della polemica
            </h2>
            <div className="neon-tube" data-off="true" aria-hidden="true">
              {signLines(false)}
            </div>
            <div className="neon-tube absolute inset-0" aria-hidden="true">
              {signLines(true)}
            </div>
            <div className="glitch-a pointer-events-none absolute inset-0 text-[#00FFF0] opacity-0" aria-hidden="true">
              {signLines(false)}
            </div>
            <div className="glitch-b pointer-events-none absolute inset-0 text-neon opacity-0" aria-hidden="true">
              {signLines(false)}
            </div>
          </div>
        </div>

        <p className="wall-caption absolute inset-x-0 top-[71vh] z-[6] mx-auto hidden max-w-[40ch] translate-y-6 text-center text-lg font-semibold text-bone opacity-0 md:block">
          Corso a numero aperto. Esame finale: un Devastante intero, senza usare la salvietta.
        </p>
      </div>
    </section>
  )
}
