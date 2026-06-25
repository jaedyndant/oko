import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Lenis from '@studio-freight/lenis'
import Nav from './components/Nav'
import Hero from './components/Hero'
import HorizontalWork from './components/HorizontalWork'
import Philosophy from './components/Philosophy'
import BentoGrid from './components/BentoGrid'
import FullBleedImage from './components/FullBleedImage'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollTrigger)

const prefersReduced = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function App() {
  const containerRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)

  // Lenis smooth scroll
  useEffect(() => {
    if (prefersReduced) return
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenis.on('scroll', ({ scroll }) => {
      ScrollTrigger.update()
      setScrollY(scroll)
    })
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => { lenis.destroy() }
  }, [])

  return (
    <>
      <Nav scrollY={scrollY} />
      <main ref={containerRef}>
        <Hero />
        <HorizontalWork />
        <Philosophy />
        <BentoGrid />
        <FullBleedImage />
        <Contact />
      </main>
    </>
  )
}
