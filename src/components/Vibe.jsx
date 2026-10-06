import { useRef } from 'react'
import { gsap, reducedMotion, useIsoLayoutEffect } from '../lib/motion'

const TICKER = ['Mattoni a vista', 'Neon rosso', 'Chesterfield in pelle nera', 'Sedie di ferro', 'Zero tovaglie', 'Salse a 30 centesimi']

const SHOTS = [
  { src: '/media/neon-niche.webp', alt: "La nicchia rossa con l'insegna al neon e un tavolo per due", cap: 'Il tavolo sotto la laurea. Qui si litiga meglio.', cls: 'col-span-12 md:col-span-4 md:row-span-2', rot: 3, tape: 'left-6' },
  { src: '/media/arch.webp', alt: 'Arco in mattoni illuminato di rosso e soffitto a travi', cap: 'Il soffitto ha visto cose.', cls: 'col-span-12 md:col-span-4', rot: -2, tape: 'right-8' },
  { src: '/media/burger.webp', alt: 'Uno smash burger vero, cheddar fuso che cola, sulla carta a scacchi', cap: 'Foto vera. Zero filtri. Solo cheddar.', cls: 'col-span-12 md:col-span-4 md:row-span-2', rot: -3, tape: 'left-10' },
  { src: '/media/tables.webp', alt: 'Sedie di ferro nere e tavoli nella sala', cap: 'Sedie di ferro. Comode per chi resta.', cls: 'col-span-12 md:col-span-4', rot: 2, tape: 'right-4' },
  { src: '/media/wipe.webp', alt: 'La salvietta nera quadrata con il logo SmashLab', cap: 'Sì, sembra proprio quello. No, è una salvietta.', cls: 'col-span-12 md:col-span-4', rot: 4, tape: 'left-12' },
  { src: '/media/cheese.webp', alt: 'Primo piano del cheddar fuso tra le due polpette', cap: 'Il momento esatto in cui il cheddar decide di scappare.', cls: 'col-span-12 md:col-span-8', rot: -1.5, tape: 'right-16' },
]

function Shot({ s }) {
  return (
    <figure className={`vibe-piece group relative ${s.cls}`} style={{ '--r': `${s.rot}deg` }}>
      <div className="h-full rotate-[var(--r)] border-[6px] border-bone bg-bone shadow-[10px_10px_0_#FF1E2D] transition-transform duration-300 ease-back group-hover:-translate-y-2 group-hover:rotate-0">
        <img src={s.src} alt={s.alt} loading="lazy" className="h-full max-h-[64vh] w-full object-cover" />
        <figcaption className="bg-bone px-2 pb-1 pt-3 font-marker text-lg leading-tight text-black">{s.cap}</figcaption>
      </div>
      <span className={`absolute -top-3 ${s.tape} h-7 w-24 -rotate-6 bg-volt/85`} aria-hidden="true" />
    </figure>
  )
}

export default function Vibe() {
  const root = useRef(null)

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      gsap.from('.vibe-title > span', {
        yPercent: 110,
        duration: 0.4,
        ease: 'back.out(1.7)',
        stagger: 0.08,
        scrollTrigger: { trigger: '.vibe-title', start: 'top 80%' },
      })
      // Every photo gets slapped onto the wall as it arrives.
      gsap.utils.toArray('.vibe-piece').forEach((el, i) => {
        gsap.from(el, {
          scale: 1.35,
          rotate: i % 2 ? 14 : -14,
          opacity: 0,
          duration: 0.3,
          ease: 'back.out(1.7)',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        })
      })
      gsap.to('.vibe-ticker', {
        xPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const tick = TICKER.map((t) => `${t}  ✕  `).join('')

  return (
    <section id="vibe" ref={root} className="relative overflow-hidden bg-black pb-32" aria-labelledby="vibe-title">
      <div className="-mx-4 -rotate-2 border-y-[4px] border-black bg-volt py-3 text-black">
        <div className="vibe-ticker whitespace-nowrap">
          <p className="marquee inline-block font-display text-2xl uppercase tracking-wide md:text-4xl">
            {tick}
            {tick}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 pt-16 md:px-10 md:pt-24">
        <div className="grid grid-cols-12 items-end gap-6 md:gap-8">
          <h2 id="vibe-title" className="vibe-title col-span-12 overflow-hidden font-display text-[clamp(72px,13vw,210px)] uppercase leading-[0.86] text-bone lg:col-span-7">
            <span className="block">Il posto.</span>
          </h2>
          <p className="col-span-12 max-w-[42ch] pb-4 text-lg font-medium md:text-xl leading-snug text-bone/90 lg:col-span-5">
            Archi di mattoni vecchi, luci rosse, un divano Chesterfield nero che ha sentito più discussioni di un talk show. Entri per un panino. Esci con un’opinione.
          </p>
        </div>

        <div className="vibe-piece relative mt-10 -rotate-1 border-[4px] border-black bg-black shadow-[8px_8px_0_#FF6A00] md:mt-16 md:border-[6px] md:shadow-[14px_14px_0_#FF6A00]">
          <video
            className="aspect-video w-full object-cover"
            src="/media/vibe.mp4"
            poster="/media/vibe-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Dodici secondi da SmashLab: lo smash burger, il cheddar che cola, la sala"
          />
          <p className="absolute -bottom-6 left-4 right-4 rotate-2 bg-neon px-3 py-1 font-marker text-base text-black shadow-[4px_4px_0_#000] md:left-auto md:right-8 md:text-xl">
            12 secondi da noi. Muto, tanto non ti sentiremmo.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-12 gap-x-8 gap-y-12 md:mt-24 md:auto-rows-[minmax(220px,auto)] md:gap-y-14">
          {SHOTS.map((s) => (
            <Shot key={s.src} s={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
