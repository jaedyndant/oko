import { useEffect, useRef, useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import Nav from './components/Nav'
import CustomCursor from './components/CustomCursor'
import Loader from './components/Loader'
import Home from './pages/Home'
import Work from './pages/Work'
import ProjectDetail from './pages/ProjectDetail'
import About from './pages/About'

gsap.registerPlugin(ScrollTrigger)

const prefersReduced = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function ScrollManager({ children }) {
  const location = useLocation()
  const [scrollY, setScrollY] = useState(0)
  const lenisRef = useRef(null)

  useEffect(() => {
    if (prefersReduced) return
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis
    lenis.on('scroll', ({ scroll }) => {
      ScrollTrigger.update()
      setScrollY(scroll)
    })
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => { lenis.destroy() }
  }, [])

  // Kill all ScrollTriggers on route change and scroll to top
  useEffect(() => {
    ScrollTrigger.getAll().forEach(t => t.kill())
    window.scrollTo(0, 0)
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true })
    // Refresh after a tick to let new page mount
    setTimeout(() => ScrollTrigger.refresh(), 100)
  }, [location.pathname])

  return (
    <>
      <Nav scrollY={scrollY} location={location} />
      {children}
    </>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const base = import.meta.env.BASE_URL

  return (
    <BrowserRouter basename={base.endsWith('/') ? base.slice(0, -1) : base}>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <CustomCursor />
      <ScrollManager>
        <main style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </ScrollManager>
    </BrowserRouter>
  )
}
