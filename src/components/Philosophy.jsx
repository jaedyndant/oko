import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import './Philosophy.css'

export default function Philosophy() {
  const ref = useRef(null)

  useGSAP(() => {
    // Large text word reveal
    const words = ref.current.querySelectorAll('.phil-word')
    gsap.from(words, {
      y: 60, opacity: 0,
      stagger: 0.06,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    })

    // Right column
    gsap.from('.phil-right', {
      y: 40, opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.phil-right',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    // Divider line
    gsap.from('.phil-divider', {
      scaleX: 0, transformOrigin: 'left',
      duration: 1.2, ease: 'power3.inOut',
      scrollTrigger: {
        trigger: '.phil-divider',
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: ref })

  const statement = "We design spaces that listen before they speak. Every material, every proportion, every threshold is placed with intention — to serve the life that will unfold within."

  return (
    <section ref={ref} className="phil" id="philosophy">
      <div className="phil-label">
        <span>Philosophy</span>
      </div>
      <div className="phil-grid">
        <div className="phil-left">
          <p className="phil-statement">
            {statement.split(' ').map((word, i) => (
              <span key={i} className="phil-word">{word} </span>
            ))}
          </p>
        </div>
        <div className="phil-right">
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
