import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { projects } from '../data/projects'
import './Work.css'

export default function Work() {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.from('.work-heading span', {
      y: 100, opacity: 0,
      stagger: 0.04,
      duration: 1.2,
      ease: 'power4.out',
      delay: 0.2,
    })

    gsap.from('.work-card', {
      y: 80, opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5,
    })
  }, { scope: ref })

  return (
    <section ref={ref} className="work-page">
      <div className="work-header">
        <span className="work-label">Selected Projects</span>
        <h1 className="work-heading">
          {'Our Work'.split('').map((char, i) => (
            <span key={i} style={{ display: char === ' ' ? 'inline' : 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
        <p className="work-count">{projects.length} Projects</p>
      </div>

      <div className="work-grid">
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            to={`/project/${p.slug}`}
            className={`work-card work-card--${i % 3 === 0 ? 'wide' : i % 3 === 1 ? 'tall' : 'normal'}`}
            data-cursor="view"
          >
            <div className="work-card-img">
              <img src={p.image} alt={p.title} loading="lazy" />
            </div>
            <div className="work-card-info">
              <span className="work-card-cat">{p.category}</span>
              <h2 className="work-card-title">{p.title}</h2>
              <span className="work-card-loc">{p.location}</span>
            </div>
            <span className="work-card-num">0{i + 1}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
