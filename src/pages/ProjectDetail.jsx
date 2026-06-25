import { useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { projects } from '../data/projects'
import './ProjectDetail.css'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find(p => p.slug === slug)
  const ref = useRef(null)
  const heroImgRef = useRef(null)

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  useGSAP(() => {
    if (!project) return

    // Hero image parallax
    gsap.to(heroImgRef.current, {
      y: 150,
      scrollTrigger: {
        trigger: '.pd-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })

    // Title reveal
    gsap.from('.pd-title span', {
      y: 120, opacity: 0,
      stagger: 0.05,
      duration: 1.2,
      ease: 'power4.out',
      delay: 0.3,
    })

    // Meta reveal
    gsap.from('.pd-meta-item', {
      y: 30, opacity: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.6,
    })

    // Body paragraphs
    gsap.from('.pd-body p', {
      y: 50, opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.pd-body',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    })

    // Gallery images
    gsap.from('.pd-gallery-item', {
      y: 60, opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.pd-gallery',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: ref, dependencies: [slug] })

  if (!project) {
    return (
      <section className="pd-notfound">
        <h1>Project not found</h1>
        <Link to="/work">Back to Work</Link>
      </section>
    )
  }

  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length]

  return (
    <article ref={ref} className="pd">
      {/* Hero */}
      <div className="pd-hero">
        <div className="pd-hero-img">
          <img ref={heroImgRef} src={project.heroImage} alt={project.title} />
        </div>
        <div className="pd-hero-overlay">
          <span className="pd-cat">{project.category}</span>
          <h1 className="pd-title">
            {project.title.split('').map((char, i) => (
              <span key={i} style={{ display: char === ' ' ? 'inline' : 'inline-block' }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
          <span className="pd-location">{project.location}</span>
        </div>
      </div>

      {/* Meta strip */}
      <div className="pd-meta">
        {Object.entries(project.details).map(([key, val]) => (
          <div key={key} className="pd-meta-item">
            <span className="pd-meta-label">{key}</span>
            <span className="pd-meta-value">{val}</span>
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="pd-body">
        <div className="pd-body-intro">
          <p className="pd-body-lead">{project.desc}</p>
        </div>
        <div className="pd-body-text">
          {project.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="pd-gallery">
        {project.gallery.map((img, i) => (
          <div key={i} className={`pd-gallery-item pd-gallery-item--${i % 3 === 0 ? 'full' : 'half'}`}>
            <img src={img} alt={`${project.title} detail ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </div>

      {/* Next project */}
      <Link to={`/project/${nextProject.slug}`} className="pd-next" data-cursor="view">
        <span className="pd-next-label">Next Project</span>
        <h2 className="pd-next-title">{nextProject.title}</h2>
        <div className="pd-next-img">
          <img src={nextProject.image} alt={nextProject.title} loading="lazy" />
        </div>
      </Link>
    </article>
  )
}
