import React from 'react'

const Contact = () => {
    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <div className="contact-grid">
                    <div className="contact-info">
                        <h2>Get in Touch</h2>
                        <p>Ready to start your project? <br /> Let's build something timeless.</p>

                        <div className="details">
                            <div className="detail-item">
                                <h4>Studio</h4>
                                <p>123 Architecture Blvd,<br /> Design District, NY 10012</p>
                            </div>
                            <div className="detail-item">
                                <h4>Contact</h4>
                                <p>hello@anantaraa.arch<br /> +1 (555) 123-4567</p>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" placeholder="John Doe" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="john@example.com" />
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea rows="5" placeholder="Tell us about your vision..."></textarea>
                        </div>
                        <button type="submit" className="btn">Send Inquiry</button>
                    </form>
                </div>
            </div>

            <style>{`
        .contact-section {
          background-color: #1a1a1a;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
        }

        @media (min-width: 768px) {
           .contact-grid {
             grid-template-columns: 1fr 1fr;
           }
        }

        .contact-info p {
           font-size: 1.2rem;
           margin-bottom: 3rem;
           color: var(--color-text-muted);
        }

        .details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .detail-item h4 {
           font-size: 0.9rem;
           text-transform: uppercase;
           letter-spacing: 0.1em;
           color: var(--color-accent);
           margin-bottom: 1rem;
        }
        
        .detail-item p {
          font-size: 1rem;
          color: var(--color-text);
          margin-bottom: 0;
        }

        .form-group {
          margin-bottom: 2rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 1rem 0;
          background: transparent;
          border: none;
          border-bottom: 1px solid #333;
          color: white;
          font-family: var(--font-primary);
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
           outline: none;
           border-bottom-color: var(--color-text);
        }
      `}</style>
        </section>
    )
}

export default Contact
