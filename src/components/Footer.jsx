import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState({ type: '', message: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setStatus({ type: '', message: '' })

        try {
            const response = await fetch('/api/send-newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            })

            const data = await response.json()

            if (response.ok) {
                setStatus({ type: 'success', message: '✓' })
                setEmail('')
                setTimeout(() => setStatus({ type: '', message: '' }), 3000)
            } else {
                setStatus({ type: 'error', message: '✗' })
                setTimeout(() => setStatus({ type: '', message: '' }), 3000)
            }
        } catch (error) {
            setStatus({ type: 'error', message: '✗' })
            setTimeout(() => setStatus({ type: '', message: '' }), 3000)
        } finally {
            setIsSubmitting(false)
        }
    }

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
                        <a href="https://www.instagram.com/anantaraadesignstudio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">Instagram</a>
                        <a href="#">LinkedIn</a>
                        <a href="#">Pinterest</a>
                    </div>

                    <div className="footer-col newsletter">
                        <h6>Newsletter</h6>
                        <form onSubmit={handleNewsletterSubmit}>
                            <div className="newsletter-input">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isSubmitting}
                                />
                                <button type="submit" disabled={isSubmitting}>
                                    {status.message || '→'}
                                </button>
                            </div>
                        </form>
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
          transition: color 0.3s;
        }

        .newsletter-input button:disabled {
          cursor: not-allowed;
        }

        .newsletter-input input:disabled {
          opacity: 0.6;
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
