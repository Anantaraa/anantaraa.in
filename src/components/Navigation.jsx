import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
    return (
        <nav className="navbar">
            <div className="container nav-content">
                <NavLink to="/" className="logo">
                    ANANTARAA <span className="logo-suffix">DSGN / STD</span>
                </NavLink>

                <div className="nav-links">
                    {['Projects', 'Values', 'Team', 'Contact'].map((item) => (
                        <NavLink
                            key={item}
                            to={`/${item.toLowerCase()}`}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            {item}
                        </NavLink>
                    ))}
                </div>
            </div>

            <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.5rem 0;
          background: transparent;
          backdrop-filter: blur(1px); /* Subtle */
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-family: var(--font-body);
          font-weight: 500;
          font-size: 0.9rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .logo-suffix {
          color: var(--text-muted);
          margin-left: 0.5rem;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-item {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          position: relative;
        }

        .nav-item.active, .nav-item:hover {
          color: var(--text-active);
        }

        .nav-item.active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--text-active);
        }
      `}</style>
        </nav>
    )
}

export default Navigation
