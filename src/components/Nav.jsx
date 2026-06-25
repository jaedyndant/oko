import { useRef, useEffect, useState } from 'react'
import './Nav.css'

export default function Nav({ scrollY }) {
  const visible = scrollY > window.innerHeight * 0.8
  
  return (
    <nav className={`nav ${visible ? 'nav--visible' : ''}`}>
      <span className="nav-logo">ŌKŌ</span>
      <div className="nav-links">
        <a href="#work">Work</a>
        <a href="#philosophy">Philosophy</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  )
}
