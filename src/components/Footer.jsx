import React from 'react'

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-logo">ANANTARAA</div>
                    <div className="footer-links">
                        <a href="https://instagram.com">Instagram</a>
                        <a href="https://linkedin.com">LinkedIn</a>
                        <a href="https://twitter.com">Twitter</a>
                    </div>
                    <div className="footer-copy">
                        &copy; {new Date().getFullYear()} Anantaraa Architecture. All rights reserved.
                    </div>
                </div>
            </div>
            <style>{`
        footer {
          padding: 4rem 0;
          border-top: 1px solid #222;
          font-size: 0.8rem;
          color: #666;
        }

        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }
        
        @media (min-width: 768px) {
           .footer-content {
             flex-direction: row;
             justify-content: space-between;
           }
        }

        .footer-logo {
          color: white;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .footer-links a {
          margin: 0 1rem;
          hover: text-decoration: underline;
        }
      `}</style>
        </footer>
    )
}

export default Footer
