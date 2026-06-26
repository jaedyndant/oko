import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-img-wrap">
        <img
          className="hero-img"
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
          alt="Modern architectural interior with concrete walls and natural light"
          loading="eager"
        />
        <div className="hero-darken" />
        <div className="hero-grain" />
      </div>
      <div className="hero-overlay">
        <p className="hero-eyebrow">Architecture Studio &mdash; Kyoto, Japan</p>
        <h1 className="hero-title">
          <span className="hero-line-wrap"><span className="hero-line hero-line--1">Shaping</span></span>
          <span className="hero-line-wrap"><span className="hero-line hero-line--2">silence</span></span>
          <span className="hero-line-wrap"><span className="hero-line hero-line--3">into form.</span></span>
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
