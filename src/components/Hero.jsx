import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './Hero.css'

export default function Hero() {
  const heroRef = useRef(null)
  const imgRef = useRef(null)

  useGSAP(() => {
    // Image parallax zoom on scroll
    gsap.to(imgRef.current, {
      scale: 1.15,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })

    // Text lines stagger in
    const lines = heroRef.current.querySelectorAll('.hero-line')
    gsap.from(lines, {
      y: 120,
      opacity: 0,
      duration: 1.4,
      stagger: 0.15,
      ease: 'power4.out',
      delay: 0.3,
    })

    // Eyebrow + sub
    gsap.from('.hero-eyebrow', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.1 })
    gsap.from('.hero-sub', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.8 })
    gsap.from('.hero-scroll', { opacity: 0, duration: 1, delay: 1.2 })

    // Fade out hero content on scroll
    gsap.to('.hero-overlay', {
      opacity: 0,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'center center',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, { scope: heroRef })

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-img-wrap">
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
          alt="Modern architectural interior with concrete walls and natural light"
          loading="eager"
        />
        <div className="hero-darken" />
      </div>
      <div className="hero-overlay">
        <p className="hero-eyebrow">Architecture Studio &mdash; Kyoto, Japan</p>
        <h1 className="hero-title">
          <span className="hero-line-wrap"><span className="hero-line">Shaping</span></span>
          <span className="hero-line-wrap"><span className="hero-line">silence</span></span>
          <span className="hero-line-wrap"><span className="hero-line">into form.</span></span>
        </h1>
        <p className="hero-sub">
          Spatial design rooted in restraint, materiality, and light.
        </p>
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
      <div className="hero-meta">
        <span>35.0116&deg; N, 135.7681&deg; E</span>
        <span>Est. 2009</span>
      </div>
    </section>
  )
}
