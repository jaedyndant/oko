import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import './BentoGrid.css'

function CounterCard() {
  const ref = useRef(null)
  useGSAP(() => {
    const counters = ref.current.querySelectorAll('.bento-counter-num')
    counters.forEach((el) => {
      const target = parseInt(el.dataset.target, 10)
      const obj = { val: 0 }
      gsap.to(obj, {
        val: target,
        duration: 2.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        onUpdate: () => { el.textContent = Math.round(obj.val) },
      })
    })
  }, { scope: ref })

  return (
    <div ref={ref} className="bento-card bento-card--stats">
      <div className="bento-stat">
        <span className="bento-counter-num" data-target="47">0</span>
        <span className="bento-counter-label">Projects completed</span>
      </div>
      <div className="bento-stat">
        <span className="bento-counter-num" data-target="12">0</span>
        <span className="bento-counter-label">Awards received</span>
      </div>
      <div className="bento-stat">
        <span className="bento-counter-num" data-target="18">0</span>
        <span className="bento-counter-label">Studio members</span>
      </div>
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

  useGSAP(() => {
    const cards = ref.current.querySelectorAll('.bento-card')
    gsap.from(cards, {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: ref })

  return (
    <section ref={ref} className="bento">
      <div className="bento-label">
        <span>At a Glance</span>
      </div>
      <div className="bento-grid">
        <CounterCard />
        <MaterialCard />
        <LocationCard />
        <QuoteCard />
        <AwardsCard />
        <ImageCard />
      </div>
    </section>
  )
}
