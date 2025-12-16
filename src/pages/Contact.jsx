import React from 'react'
import PageTransition from '../components/PageTransition'

const Contact = () => {
    return (
        <PageTransition>
            <div className="page-container section">
                <div className="container">
                    <div className="contact-layout">
                        <div className="contact-info">
                            <h1 className="page-title">Start a Project</h1>
                            <p className="contact-intro">We are selective with our projects. Tell us about your vision, and if it aligns with our philosophy, we will build it together.</p>

                            <div className="details-block">
                                <div className="detail-item">
                                    <label>Studio</label>
                                    <p>123 Architectural Grid,<br />Design District, NY 10012</p>
                                </div>
                                <div className="detail-item">
                                    <label>Email</label>
                                    <a href="mailto:hello@anantaraa.com">hello@anantaraa.com</a>
                                </div>
                                <div className="detail-item">
                                    <label>Phone</label>
                                    <p>+1 (555) 000-0000</p>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-wrapper">
                            <form className="minimal-form">
                                <div className="form-group slide-up">
                                    <input type="text" placeholder="Your Name" required />
                                </div>
                                <div className="form-group slide-up" style={{ animationDelay: '0.1s' }}>
                                    <input type="email" placeholder="Email Address" required />
                                </div>
                                <div className="form-group slide-up" style={{ animationDelay: '0.2s' }}>
                                    <input type="text" placeholder="Project Location" />
                                </div>
                                <div className="form-group slide-up" style={{ animationDelay: '0.3s' }}>
                                    <textarea rows="4" placeholder="Briefly describe your vision..." required></textarea>
                                </div>
                                <button type="submit" className="submit-btn slide-up" style={{ animationDelay: '0.4s' }}>Submit Inquiry</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
         .contact-layout {
            display: grid;
            gap: 6rem;
         }
         
         @media (min-width: 768px) {
            .contact-layout {
               grid-template-columns: 1fr 1fr;
               align-items: start;
            }
         }
         
         .contact-intro {
            font-size: 1.25rem;
            max-width: 400px;
            margin-bottom: 4rem;
            color: var(--text-muted);
         }
         
         .detail-item {
            margin-bottom: 2rem;
         }
         
         .detail-item label {
            display: block;
            text-transform: uppercase;
            font-size: 0.75rem;
            letter-spacing: 0.1em;
            color: var(--text-muted);
            margin-bottom: 0.5rem;
         }
         
         .detail-item p, .detail-item a {
            font-size: 1.1rem;
         }
         
         .minimal-form {
            display: flex;
            flex-direction: column;
            gap: 2rem;
         }
         
         .form-group input, .form-group textarea {
            width: 100%;
            background: transparent;
            border: none;
            border-bottom: 1px solid var(--dividers);
            padding: 1rem 0;
            font-family: var(--font-body);
            font-size: 1rem;
            transition: border-color 0.3s;
         }
         
         .form-group input:focus, .form-group textarea:focus {
            outline: none;
            border-bottom-color: var(--text-active);
         }
         
         .submit-btn {
            align-self: flex-start;
            background: var(--text-active);
            color: var(--bg-color);
            border: none;
            padding: 1rem 3rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            cursor: pointer;
            transition: background 0.3s;
         }
         
         .submit-btn:hover {
            background: var(--text-muted);
         }

         /* Simple entrance animation for form fields */
         .slide-up {
            opacity: 0;
            animation: slideUp 0.6s forwards;
         }
         
         @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
         }
      `}</style>
        </PageTransition>
    )
}

export default Contact
