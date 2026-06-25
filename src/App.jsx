import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import CustomCursor from './components/CustomCursor'
import Loader from './components/Loader'
import Home from './pages/Home'
import Work from './pages/Work'
import ProjectDetail from './pages/ProjectDetail'
import About from './pages/About'

function ScrollManager({ children }) {
  const location = useLocation()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
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
