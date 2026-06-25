import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Contact from '../components/Contact'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const values = [
  { title: 'Restraint', body: 'We add nothing that doesn\'t earn its place. Every element must justify its existence through function, meaning, or beauty — preferably all three.' },
  { title: 'Materiality', body: 'We choose materials for how they will age, not how they look on opening day. A building should grow more beautiful with time, not less.' },
  { title: 'Light', body: 'Natural light is our primary material. We design buildings as instruments for capturing, filtering, and directing sunlight through space.' },
  { title: 'Silence', body: 'Great architecture creates moments of stillness. We design spaces that quiet the mind — through proportion, through simplicity, through care.' },
]

export default function About() {
  const ref = useRef(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useGSAP(() => {
    // Title char reveal
    gsap.from('.about-heading span', {
      y: 100, opacity: 0,
      stagger: 0.03,
      duration: 1.2,
      ease: 'power4.out',
      delay: 0.2,
    })

    // Pinned values section
    const valueItems = gsap.utils.toArray('.about-value')
    valueItems.forEach((item, i) => {
      gsap.from(item, {
        opacity: 0,
        y: 40,
        scrollTrigger: {
          trigger: item,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        duration: 1,
        ease: 'power3.out',
      })
    })

    // Team image reveals
    gsap.from('.about-team-member', {
      y: 60, opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-team-grid',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: ref })

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="about-hero">
        <span className="about-label">About ŌKŌ</span>
        <h1 className="about-heading">
          {'Architecture is the thoughtful making of space.'.split('').map((c, i) => (
            <span key={i} style={{ display: c === ' ' ? 'inline' : 'inline-block' }}>
              {c === ' ' ? '\u00A0' : c}
            </span>
          ))}
        </h1>
      </section>

      {/* Split intro */}
      <section className="about-intro">
        <div className="about-intro-img">
          <img src="https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80" alt="ŌKŌ Studio interior" loading="lazy" />
        </div>
        <div className="about-intro-text">
          <p>Founded in 2009 in Kyoto by Takeshi Murakami, ŌKŌ has spent fifteen years refining a practice rooted in Japanese spatial traditions and contemporary material innovation.</p>
          <p>Our studio of 18 architects, engineers, and craftspeople works across scales — from a single-room chapel to a 14-storey tower — but always with the same conviction: architecture should disappear into the experience of inhabiting it.</p>
          <p>The name ŌKŌ (光影) means "light and shadow" — the interplay that gives form its meaning.</p>
        </div>
      </section>

      {/* Values - staggered reveal */}
      <section className="about-values">
        <span className="about-values-label">Core Values</span>
        <div className="about-values-list">
          {values.map((v, i) => (
            <div key={i} className="about-value">
              <span className="about-value-num">0{i + 1}</span>
              <h3 className="about-value-title">{v.title}</h3>
              <p className="about-value-body">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="about-team">
        <span className="about-team-label">The Studio</span>
        <div className="about-team-grid">
          {[
            { name: 'Takeshi Murakami', role: 'Founding Principal', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
            { name: 'Yuki Sato', role: 'Design Director', img: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80' },
            { name: 'Kenji Yamada', role: 'Technical Director', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
            { name: 'Hana Ito', role: 'Project Architect', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
            { name: 'Ren Tanaka', role: 'Landscape Architect', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
            { name: 'Mei Kobayashi', role: 'Interior Designer', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80' },
          ].map((person, i) => (
            <div key={i} className="about-team-member">
              <div className="about-team-img">
                <img src={person.img} alt={person.name} loading="lazy" />
              </div>
              <h4>{person.name}</h4>
              <p>{person.role}</p>
            </div>
          ))}
        </div>
      </section>

      <Contact />
    </div>
  )
}
