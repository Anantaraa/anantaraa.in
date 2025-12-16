import React, { useState, useEffect } from 'react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">ANANTARAA</div>
      <div className="links">
        <a href="#work">Work</a>
        <a href="#values">Values</a>
        <a href="#contact">Contact</a>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 2rem 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 100;
          transition: all 0.3s ease;
          color: #1A1A1A; /* Dark text for light theme */
        }

        .navbar.scrolled {
          background: rgba(244, 244, 240, 0.9); /* Match theme bg */
          backdrop-filter: blur(10px);
          padding: 1.5rem 3rem;
        }
        
        .logo {
          font-family: 'Playfair Display', serif; /* Match theme font */
          font-weight: 700;
          letter-spacing: 0.1em;
          font-size: 1.5rem;
        }
        
        .links a::after {
          background: #1A1A1A;
        }

        .links a:hover::after {
          width: 100%;
        }
      `}</style>
    </nav>
  )
}

export default Navbar
