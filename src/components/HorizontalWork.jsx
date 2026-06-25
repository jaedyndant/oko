import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './HorizontalWork.css'

const projects = [
  {
    title: 'Katsura Residence',
    location: 'Kyoto, 2023',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    desc: 'A private home where interior courtyards dissolve the boundary between dwelling and garden.',
  },
  {
    title: 'Tenshō Gallery',
    location: 'Osaka, 2022',
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80',
    desc: 'Exhibition space carved from a former warehouse. Raw concrete meets precision joinery.',
  },
  {
    title: 'Nami Office Tower',
    location: 'Tokyo, 2024',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    desc: 'A 14-storey headquarters designed to bring nature to every floor through cascading terraces.',
  },
  {
    title: 'Suigetsu Chapel',
    location: 'Naoshima, 2021',
    category: 'Sacred',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
    desc: 'A meditation pavilion on the Inland Sea. Water, concrete, sky — nothing more.',
  },
]

export default function HorizontalWork() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useGSAP(() => {
    const track = trackRef.current
    const totalScroll = track.scrollWidth - window.innerWidth

    // Main horizontal scroll
    gsap.to(track, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${totalScroll}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    // Parallax each image (slower than text)
    const cards = track.querySelectorAll('.hw-card')
    cards.forEach((card) => {
      const img = card.querySelector('.hw-card-img img')
      gsap.to(img, {
        x: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          containerAnimation: gsap.getById && undefined,
          start: 'left right',
          end: 'right left',
          scrub: true,
        },
      })
    })

    // Section label reveal
    gsap.from('.hw-label', {
      y: 30, opacity: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
      duration: 0.8,
      ease: 'power3.out',
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="hw" id="work">
      <div className="hw-label">
        <span className="hw-label-text">Selected Work</span>
        <span className="hw-label-count">04</span>
      </div>
      <div ref={trackRef} className="hw-track">
        {projects.map((p, i) => (
          <article key={i} className="hw-card">
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
          </article>
        ))}
        {/* End spacer */}
        <div className="hw-end">
          <span className="hw-end-text">All projects</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
      </div>
    </section>
  )
}
