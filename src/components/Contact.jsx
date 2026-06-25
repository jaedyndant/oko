import { useRef, useEffect } from 'react'
import './Contact.css'

export default function Contact() {
  const ref = useRef(null)

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          e.target.classList.toggle('in', e.isIntersecting)
        })
      },
      { threshold: 0.1 }
    )

    section.querySelectorAll('.contact-reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="contact" id="contact">
      <div className="contact-grid">
        <div className="contact-left">
          <span className="contact-label contact-reveal">Get in Touch</span>
          <h2 className="contact-heading contact-reveal">
            Let's build<br />something<br />
            <span className="contact-accent">enduring.</span>
          </h2>
        </div>
        <div className="contact-right">
          <a href="mailto:studio@oko-arch.jp" className="contact-link contact-reveal">
            studio@oko-arch.jp
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
          <div className="contact-divider contact-reveal" />
          <div className="contact-socials contact-reveal">
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">Archdaily</a>
          </div>
          <div className="contact-divider contact-reveal" />
          <div className="contact-footer contact-reveal">
            <p>42 Kamogawa-dori, Higashiyama-ku</p>
            <p>Kyoto 605-0801, Japan</p>
            <p>+81 75 555 0142</p>
          </div>
        </div>
      </div>
      <div className="contact-bottom contact-reveal">
        <span className="contact-logo">ŌKŌ</span>
        <span className="contact-copy">&copy; 2009&ndash;2026</span>
      </div>
    </section>
  )
}
