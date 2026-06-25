import { useRef, useState, useEffect } from 'react'
import './BentoGrid.css'

function CounterCard({ inView }) {
  const [counts, setCounts] = useState([0, 0, 0])
  const targets = [47, 12, 18]

  useEffect(() => {
    if (!inView) { setCounts([0, 0, 0]); return }
    const duration = 2000
    const start = performance.now()
    let raf
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const ease = 1 - Math.pow(1 - t, 3)
      setCounts(targets.map(v => Math.round(v * ease)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView])

  return (
    <div className="bento-card bento-card--stats">
      {targets.map((t, i) => (
        <div key={i} className="bento-stat">
          <span className="bento-counter-num">{counts[i]}</span>
          <span className="bento-counter-label">
            {['Projects completed', 'Awards received', 'Studio members'][i]}
          </span>
        </div>
      ))}
    </div>
  )
}

function MaterialCard() {
  return (
    <div className="bento-card bento-card--material">
      <img
        src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80"
        alt="Raw concrete texture"
        loading="lazy"
      />
      <div className="bento-material-overlay">
        <span className="bento-material-label">Materials</span>
        <p>Concrete, timber, stone, steel, glass. We let materials speak their own language.</p>
      </div>
    </div>
  )
}

function LocationCard() {
  return (
    <div className="bento-card bento-card--location">
      <div className="bento-loc-content">
        <span className="bento-loc-label">Studio</span>
        <h3 className="bento-loc-city">Kyoto</h3>
        <p className="bento-loc-addr">
          42 Kamogawa-dori<br />
          Higashiyama-ku<br />
          Kyoto 605-0801
        </p>
        <Clock />
      </div>
    </div>
  )
}

function Clock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () => {
      const d = new Date()
      const jst = new Date(d.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }))
      setTime(jst.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }))
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="bento-loc-clock">{time} JST</span>
}

function QuoteCard() {
  return (
    <div className="bento-card bento-card--quote">
      <blockquote>
        <p>"ŌKŌ understood what we couldn't articulate — they gave our home a soul."</p>
        <footer>
          <cite>Yuki Tanaka</cite>
          <span>Katsura Residence Client</span>
        </footer>
      </blockquote>
    </div>
  )
}

function AwardsCard() {
  return (
    <div className="bento-card bento-card--awards">
      <span className="bento-awards-label">Recognition</span>
      <ul className="bento-awards-list">
        <li><span>Pritzker Nomination</span><span>2024</span></li>
        <li><span>JIA Grand Prize</span><span>2023</span></li>
        <li><span>Dezeen Awards</span><span>2022</span></li>
        <li><span>AR House Award</span><span>2021</span></li>
      </ul>
    </div>
  )
}

function ImageCard() {
  return (
    <div className="bento-card bento-card--image">
      <img
        src="https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=80"
        alt="Architectural model in studio"
        loading="lazy"
      />
    </div>
  )
}

export default function BentoGrid() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setInView(true)
          e.target.classList.toggle('in', e.isIntersecting)
        })
      },
      { threshold: 0.05 }
    )

    section.querySelectorAll('.bento-card').forEach((el) => observer.observe(el))
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="bento">
      <div className="bento-label">
        <span>At a Glance</span>
      </div>
      <div className="bento-grid">
        <CounterCard inView={inView} />
        <MaterialCard />
        <LocationCard />
        <QuoteCard />
        <AwardsCard />
        <ImageCard />
      </div>
    </section>
  )
}
