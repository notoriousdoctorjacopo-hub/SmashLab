import { useEffect, useRef } from 'react'
import { gsap } from '../lib/motion'

export default function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined
    const el = ref.current
    const root = document.documentElement
    root.classList.add('has-crosshair')
    const xTo = gsap.quickTo(el, 'x', { duration: 0.12, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.12, ease: 'power3.out' })

    const move = (e) => {
      el.style.opacity = '1'
      xTo(e.clientX)
      yTo(e.clientY)
    }
    const over = (e) => {
      el.dataset.hot = e.target.closest('a, button, [data-cursor]') ? '1' : ''
    }
    const down = () => (el.dataset.down = '1')
    const up = () => (el.dataset.down = '')
    const leave = () => (el.style.opacity = '0')

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    document.addEventListener('pointerleave', leave)
    return () => {
      root.classList.remove('has-crosshair')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      document.removeEventListener('pointerleave', leave)
    }
  }, [])

  const lines = (
    <>
      <circle r="15" fill="none" />
      <path d="M0 -26 V-9 M0 9 V26 M-26 0 H-9 M9 0 H26" fill="none" />
    </>
  )

  return (
    <div ref={ref} aria-hidden="true" className="crosshair pointer-events-none fixed left-0 top-0 z-[100] opacity-0">
      <svg width="60" height="60" viewBox="-30 -30 60 60" className="crosshair-svg">
        <g stroke="#000" strokeWidth="7" strokeLinecap="round">{lines}</g>
        <g stroke="#FF1E2D" strokeWidth="3.5" strokeLinecap="round">{lines}</g>
        <circle className="crosshair-dot" r="3" fill="#FF1E2D" stroke="#000" strokeWidth="1.5" />
      </svg>
    </div>
  )
}
