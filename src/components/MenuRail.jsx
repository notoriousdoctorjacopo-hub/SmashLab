import { useRef } from 'react'
import BurgerArt from '../art/BurgerArt'
import { MENU, SIDES, DRINKS, SAUCE_LIST } from '../data/menu'
import { gsap, reducedMotion, useIsoLayoutEffect } from '../lib/motion'

const euro = (n) => `€${n}`

// Every panel is split into fixed bands (name, burger, copy, prices) so prices
// sit on the same line across the whole rail, whatever the name or copy length.
function Panel({ item, index, onOpen }) {
  return (
    <article
      className="menu-panel relative grid h-full w-[88vw] shrink-0 grid-rows-[auto_minmax(0,1fr)_auto_auto] border-r-[3px] border-white/10 px-6 pb-8 pt-20 md:w-[clamp(440px,33vw,560px)] md:px-9 md:pb-10 md:pt-28"
      aria-labelledby={`dish-${item.id}`}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-[44%] h-[46vh] w-[46vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 blur-2xl"
        style={{ background: `radial-gradient(circle, ${item.accent}, transparent 68%)` }}
        aria-hidden="true"
      />

      {/* name: always two lines tall, text sits on the bottom line */}
      <div className="relative font-display text-[clamp(44px,4.8vw,84px)] leading-[0.9]">
        <h3 id={`dish-${item.id}`} className="flex h-[1.8em] items-end uppercase text-bone">
          {item.name}
        </h3>
        <span className="mt-3 block h-[10px] w-28 -skew-x-12" style={{ background: item.accent }} aria-hidden="true" />
      </div>

      <div className="menu-burger relative flex min-h-0 items-center justify-center py-4">
        <button
          type="button"
          onClick={() => onOpen(index)}
          className="shake-on-hover group relative block h-full max-h-[42vh] w-[86%] max-w-[400px] transition-transform duration-300 ease-back hover:scale-[1.06]"
          aria-label={`Smonta il ${item.name} e guarda gli ingredienti`}
        >
          <BurgerArt recipe={item.recipe} className="shake-target rim h-full w-full" title={item.name} />
          <span className="pointer-events-none absolute -right-3 top-0 rotate-6 font-marker text-base text-volt transition-opacity duration-300 md:text-xl md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
            cliccalo. smontalo.
          </span>
        </button>
      </div>

      {/* copy: fixed height for the longest description */}
      <p className="relative h-[7em] max-w-[38ch] overflow-hidden text-[15px] font-medium leading-[1.38] text-bone/90 md:text-[17px]">
        {item.copy}
      </p>

      <div className="relative mt-3 flex flex-nowrap items-stretch gap-3 md:mt-4">
        <span className="sticker -rotate-2 flex-col items-start gap-0 bg-volt">
          <span className="text-2xl leading-none md:text-3xl">{euro(item.prices[0])}</span>
          <small className="font-body text-[11px] font-extrabold normal-case md:text-xs">panino + patatine</small>
        </span>
        <span className="sticker rotate-1 flex-col items-start gap-0 bg-neon">
          <span className="text-2xl leading-none md:text-3xl">{euro(item.prices[1])}</span>
          <small className="font-body text-[11px] font-extrabold normal-case md:text-xs">menù con bibita</small>
        </span>
      </div>
    </article>
  )
}

function Intro() {
  return (
    <div className="flex h-full w-[88vw] shrink-0 flex-col justify-center border-r-[3px] border-white/10 px-6 pt-16 md:w-[clamp(480px,40vw,640px)] md:px-10">
      <h2 className="font-display text-[clamp(54px,6.6vw,118px)] uppercase leading-[0.88] text-bone">
        Otto modi di perdere la dignità.
      </h2>
      <p className="mt-6 max-w-[40ch] text-base font-medium md:mt-8 md:text-lg leading-snug text-bone/85">
        Ogni panino arriva con le patatine. Col menù c’è anche la bibita. Metti 2 euro in più e la bibita diventa una birra da 33.
      </p>
      <p className="mt-8 -rotate-2 font-marker text-xl text-volt md:mt-10 md:text-2xl">Scorri. Poi clicca un panino e guardalo esplodere.</p>
    </div>
  )
}

function PriceList({ rows }) {
  return (
    <ul className="space-y-1.5 text-[15px] font-bold md:text-[17px]">
      {rows.map(([n, p]) => (
        <li key={n} className="flex justify-between gap-4 border-b-2 border-black/15 pb-1">
          <span>{n}</span>
          <span className="font-display text-lg md:text-xl">€{p}</span>
        </li>
      ))}
    </ul>
  )
}

function Sides() {
  const title = 'font-display text-[clamp(56px,6vw,110px)] uppercase leading-[0.85]'
  const col = 'flex h-full w-[88vw] shrink-0 flex-col justify-center gap-6 px-6 pt-16 md:h-auto md:w-auto md:p-0'
  return (
    <div className="flex h-full shrink-0 bg-volt text-black md:w-[clamp(560px,46vw,760px)] md:flex-col md:justify-center md:gap-8 md:px-12 md:pt-16">
      <h3 className={`hidden md:block ${title}`}>Lato B.</h3>
      <div className="flex h-full md:grid md:h-auto md:grid-cols-2 md:gap-x-10">
        <div className={col}>
          <h3 className={`md:hidden ${title}`}>Lato B.</h3>
          <PriceList rows={SIDES} />
        </div>
        <div className={`${col} border-l-[3px] border-black/20 md:border-0`}>
          <PriceList rows={DRINKS} />
          <div className="-rotate-1 border-[3px] border-black bg-black p-4 text-volt shadow-[6px_6px_0_#FF1E2D]">
            <p className="font-display text-2xl uppercase leading-none md:text-3xl">Salse extra €0,30</p>
            <p className="mt-2 text-sm font-semibold leading-snug text-bone">{SAUCE_LIST.join(', ')}.</p>
          </div>
          <p className="rotate-1 font-marker text-lg leading-tight md:text-xl">Novità: mega salsa cheddar con bacon, €4. Da sola. Senza vergogna.</p>
        </div>
      </div>
    </div>
  )
}

export default function MenuRail({ onOpen }) {
  const root = useRef(null)
  const track = useRef(null)
  const bar = useRef(null)

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const distance = () => track.current.scrollWidth - window.innerWidth
      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          scrub: reducedMotion() ? true : 0.8,
          start: 'top top',
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
      gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${distance()}`, scrub: true, invalidateOnRefresh: true },
        },
      )
      if (reducedMotion()) return
      gsap.utils.toArray('.menu-burger').forEach((el) => {
        gsap.from(el, {
          scale: 0.55,
          rotate: -14,
          opacity: 0,
          duration: 0.3,
          ease: 'back.out(1.7)',
          scrollTrigger: { trigger: el, containerAnimation: tween, start: 'left 88%', toggleActions: 'play none none reverse' },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="menu" ref={root} className="relative h-[100svh] overflow-hidden bg-black" aria-label="Il menu">
      <div ref={track} className="flex h-full w-max will-change-transform">
        <Intro />
        {MENU.map((item, i) => (
          <Panel key={item.id} item={item} index={i} onOpen={onOpen} />
        ))}
        <Sides />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[6px] bg-white/10" aria-hidden="true">
        <div ref={bar} className="h-full origin-left bg-neon" />
      </div>
    </section>
  )
}
