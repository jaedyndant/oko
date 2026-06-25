import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import './FullBleedImage.css'

export default function FullBleedImage() {
  const ref = useRef(null)
  const imgRef = useRef(null)

  useGSAP(() => {
    // Parallax zoom
    gsap.fromTo(imgRef.current,
      { scale: 1.2 },
      {
        scale: 1,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    )

    // Text reveal
    gsap.from('.fbi-text', {
      y: 40, opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: ref })

  return (
    <section ref={ref} className="fbi">
      <div className="fbi-img-wrap">
        <img
          ref={imgRef}
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
