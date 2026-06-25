import { useRef, useEffect } from 'react'
import './FullBleedImage.css'

export default function FullBleedImage() {
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

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="fbi">
      <div className="fbi-img-wrap">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
          alt="Modern house with clean lines surrounded by nature"
          loading="lazy"
        />
      </div>
      <div className="fbi-text">
        <p>Every project begins with listening — to the site, to the light, to the people who will live within.</p>
      </div>
    </section>
  )
}
