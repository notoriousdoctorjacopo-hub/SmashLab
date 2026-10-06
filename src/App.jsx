import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import MenuRail from './components/MenuRail'
import NeonWall from './components/NeonWall'
import Vibe from './components/Vibe'
import Footer from './components/Footer'
import BurgerModal from './components/BurgerModal'
import { MENU } from './data/menu'
import { useSmoothScroll, ScrollTrigger } from './lib/motion'

export default function App() {
  useSmoothScroll()
  const [open, setOpen] = useState(null)

  const nav = useCallback((dir) => setOpen((i) => (i + dir + MENU.length) % MENU.length), [])

  // Fonts change line heights: re-measure every pinned section once they land.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return (
    <>
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero onOpen={setOpen} />
        <MenuRail onOpen={setOpen} />
        <NeonWall />
        <Vibe />
      </main>
      <Footer />
      <AnimatePresence>{open !== null && <BurgerModal key="modal" index={open} onClose={() => setOpen(null)} onNav={nav} />}</AnimatePresence>
    </>
  )
}
