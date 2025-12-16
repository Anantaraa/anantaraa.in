import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navigation = () => {
    return (
        <nav className="navbar">
            <NavLink to="/" className="logo">
                ANANTARAA <span className="logo-suffix">DESIGN STUDIO</span>
            </NavLink>

            <div className="links">
                {['Work', 'Values', 'Members', 'Contact'].map((item) => (
                    <NavLink
                        key={item}
                        to={`/${item.toLowerCase()}`}
                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    >
                        {item}
                        {({ isActive }) => isActive && (
                            <motion.div
                                layoutId="underline"
                                className="underline"
                            />
                        )}
                    </NavLink>
                ))}
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
          mix-blend-mode: difference;
          color: white;
        }

        .logo {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          letter-spacing: 0.1em;
          font-size: 1.2rem;
          text-decoration: none;
          color: white;
        }
        
        .logo-suffix {
           font-family: 'Inter', sans-serif;
           font-weight: 300;
           font-size: 0.8rem;
           margin-left: 0.5rem;
           opacity: 0.8;
        }

        .links {
           display: flex;
           gap: 3rem;
        }

        .nav-link {
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 0.1rem;
          position: relative;
          color: white;
          text-decoration: none;
          padding-bottom: 5px;
        }

        .underline {
           position: absolute;
           bottom: 0;
           left: 0;
           width: 100%;
           height: 1px;
           background: white;
        }
      `}</style>
        </nav>
    )
}

export default Navigation
