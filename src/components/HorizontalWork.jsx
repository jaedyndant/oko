import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import './HorizontalWork.css'

export default function HorizontalWork() {
  const wrapperRef = useRef(null)
  const trackRef = useRef(null)
  const [wrapperHeight, setWrapperHeight] = useState('200vh')

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Height = scrollDistance only. Sticky sticks when wrapper enters viewport,
    // so no need to add viewport height — that's automatic
    const scrollDistance = track.scrollWidth - window.innerWidth
    setWrapperHeight(`${scrollDistance}px`)

    const onScroll = () => {
      const wrapper = wrapperRef.current
      if (!wrapper) return
      const rect = wrapper.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -rect.top / scrollDistance))
      track.style.transform = `translateX(${-progress * scrollDistance}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    // Recalculate on resize
    const onResize = () => {
      const newScrollDist = track.scrollWidth - window.innerWidth
      setWrapperHeight(`${newScrollDist}px`)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div ref={wrapperRef} className="hw-wrapper" id="work" style={{ height: wrapperHeight }}>
      <div className="hw-sticky">
        <div className="hw-label">
          <span className="hw-label-text">Selected Work</span>
          <span className="hw-label-count">04</span>
        </div>
        <div ref={trackRef} className="hw-track">
          {projects.map((p, i) => (
            <Link to={`/project/${p.slug}`} key={i} className="hw-card" data-cursor="view">
              <div className="hw-card-img">
                <img src={p.image} alt={p.title} loading="lazy" />
              </div>
              <div className="hw-card-content">
                <span className="hw-card-cat">{p.category}</span>
                <h2 className="hw-card-title">{p.title}</h2>
                <p className="hw-card-desc">{p.desc}</p>
                <div className="hw-card-meta">
                  <span>{p.location}</span>
                  <span className="hw-card-num">0{i + 1}</span>
                </div>
              </div>
            </Link>
          ))}
          <div className="hw-end">
            <span className="hw-end-text">All projects</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
