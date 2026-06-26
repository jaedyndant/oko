import { useRef, useEffect } from 'react'
import './Philosophy.css'

export default function Philosophy() {
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
      { threshold: 0.15 }
    )

    section.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const statement = "We design spaces that listen before they speak. Every material, every proportion, every threshold is placed with intention \u2014 to serve the life that will unfold within."

  return (
    <section ref={ref} className="phil" id="philosophy">
      <div className="phil-label reveal">
        <span>Philosophy</span>
      </div>
      <div className="phil-grid">
        <div className="phil-left reveal">
          <p className="phil-statement">
            {statement.split(' ').map((word, i) => (
              <span key={i} className="phil-word" style={{ transitionDelay: `${i * 30}ms` }}>{word} </span>
            ))}
          </p>
        </div>
        <div className="phil-right reveal">
          <div className="phil-divider" />
          <p className="phil-body">
            Founded in Kyoto in 2009 by Takeshi Murakami, ŌKŌ has grown from a two-person
            practice into a studio of 18 architects, engineers, and craftspeople. We work
            across residential, cultural, and commercial projects — always with the same
            conviction: architecture should disappear into the experience of inhabiting it.
          </p>
          <p className="phil-body">
            Our name means "light and shadow" — the interplay that gives form its meaning.
          </p>
          <div className="phil-sig">
            <span className="phil-sig-name">Takeshi Murakami</span>
            <span className="phil-sig-title">Founding Principal</span>
          </div>
        </div>
      </div>
    </section>
  )
}
