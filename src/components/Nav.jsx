import { Link } from 'react-router-dom'
import './Nav.css'

export default function Nav({ scrollY, location }) {
  const isHome = location?.pathname === '/' || location?.pathname === ''
  const visible = isHome ? scrollY > window.innerHeight * 0.8 : true

  return (
    <nav className={`nav ${visible ? 'nav--visible' : ''}`}>
      <Link to="/" className="nav-logo">ŌKŌ</Link>
      <div className="nav-links">
        <Link to="/work" className={location?.pathname === '/work' ? 'active' : ''}>Work</Link>
        <Link to="/about" className={location?.pathname === '/about' ? 'active' : ''}>About</Link>
        <Link to="/about#contact">Contact</Link>
      </div>
    </nav>
  )
}
