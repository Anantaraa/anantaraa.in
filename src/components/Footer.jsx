import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer section">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-col brand">
                        <h5>ANANTARAA</h5>
                        <p>Design Studio</p>
                    </div>

                    <div className="footer-col links">
                        <h6>Sitemap</h6>
                        <Link to="/projects">Projects</Link>
                        <Link to="/values">Philosophy</Link>
                        <Link to="/team">Team</Link>
                        <Link to="/contact">Contact</Link>
                    </div>

                    <div className="footer-col social">
                        <h6>Social</h6>
                        <a href="#">Instagram</a>
                        <a href="#">LinkedIn</a>
                        <a href="#">Pinterest</a>
                    </div>

                    <div className="footer-col newsletter">
                        <h6>Newsletter</h6>
                        <div className="newsletter-input">
                            <input type="email" placeholder="Email Address" />
                            <button>→</button>
                        </div>
                    </div>
                </div>

                <div className="footer-btm">
                    <span>© {new Date().getFullYear()} Anantaraa Design Studio.</span>
                    <span>Privacy Policy</span>
                </div>
            </div>

            <style>{`
        .footer {
          border-top: 1px solid var(--dividers);
          background: var(--bg-color);
          margin-top: 4rem;
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 2fr;
          gap: 4rem;
          margin-bottom: 4rem;
        }
        
        .footer-col h6 {
          font-family: var(--font-body);
          font-size: 0.75rem;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          opacity: 0.6;
        }
        
        .footer-col a {
          display: block;
          margin-bottom: 0.8rem;
          font-size: 0.9rem;
        }
        
        .newsletter-input {
          display: flex;
          border-bottom: 1px solid var(--text-active);
          padding-bottom: 0.5rem;
        }
        
        .newsletter-input input {
          width: 100%;
          border: none;
          background: transparent;
          font-family: var(--font-body);
        }
        .newsletter-input input:focus { outline: none; }
        
        .newsletter-input button {
          background: transparent;
          border: none;
          cursor: pointer;
        }
        
        .footer-btm {
          display: flex;
          justify-content: space-between;
          padding-top: 2rem;
          border-top: 1px solid var(--dividers);
          font-size: 0.75rem;
          opacity: 0.6;
        }
        
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
        }
      `}</style>
        </footer>
    )
}

export default Footer
