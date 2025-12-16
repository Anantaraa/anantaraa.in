import React from 'react'
import PageTransition from '../components/PageTransition'

const Contact = () => {
    return (
        <PageTransition>
            <div className="page-container theme-canvas">
                <div className="container header-spacer">
                    <div className="contact-layout">
                        <div className="contact-text">
                            <h1 className="page-title">Start a Project</h1>
                            <p className="intro">We are currently accepting new projects for 2025. Tell us about your vision.</p>

                            <div className="info-block">
                                <span>Email</span>
                                <a href="mailto:hello@anantaraadesign.com">hello@anantaraadesign.com</a>
                            </div>

                            <div className="info-block">
                                <span>Office</span>
                                <p>123 Design District<br />New York, NY 10012</p>
                            </div>
                        </div>

                        <form className="minimal-form">
                            <div className="input-group">
                                <label>Name</label>
                                <input type="text" placeholder="John Doe" />
                            </div>
                            <div className="input-group">
                                <label>Email</label>
                                <input type="email" placeholder="john@example.com" />
                            </div>
                            <div className="input-group">
                                <label>Details</label>
                                <textarea rows="4" placeholder="Project location, square footage..."></textarea>
                            </div>
                            <button type="submit">Submit Inquiry</button>
                        </form>
                    </div>
                </div>
            </div>
            <style>{`
         .contact-layout {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
         }
         
         @media (min-width: 768px) {
            .contact-layout {
               grid-template-columns: 1fr 1fr;
               gap: 8rem;
            }
         }
         
         .intro {
            font-size: 1.5rem;
            margin-bottom: 4rem;
            line-height: 1.4;
         }
         
         .info-block {
            margin-bottom: 2rem;
         }
         
         .info-block span {
            display: block;
            text-transform: uppercase;
            font-family: 'Inter', sans-serif;
            font-size: 0.8rem;
            color: #888;
            margin-bottom: 0.5rem;
         }
         
         .info-block a, .info-block p {
            font-size: 1.2rem;
            color: var(--text-color);
         }
         
         .minimal-form {
            padding-top: 1rem;
         }
         
         .input-group {
            margin-bottom: 3rem;
         }
         
         .input-group label {
            display: block;
            margin-bottom: 1rem;
            font-family: 'Inter', sans-serif;
            text-transform: uppercase;
            font-size: 0.8rem;
            letter-spacing: 0.1em;
         }
         
         .input-group input, .input-group textarea {
            width: 100%;
            border: none;
            border-bottom: 1px solid #ccc;
            padding: 1rem 0;
            font-size: 1rem;
            background: transparent;
            font-family: 'Inter', sans-serif;
         }
         
         .input-group input:focus, .input-group textarea:focus {
            outline: none;
            border-bottom-color: black;
         }
         
         button {
            background: black;
            color: white;
            border: none;
            padding: 1rem 3rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            cursor: pointer;
            transition: opacity 0.3s;
         }
         
         button:hover { opacity: 0.8; }
      `}</style>
        </PageTransition>
    )
}

export default Contact
