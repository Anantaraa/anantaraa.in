import React, { useState } from 'react'
import PageTransition from '../components/PageTransition'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        location: '',
        message: ''
    })
    const [status, setStatus] = useState({ type: '', message: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setStatus({ type: '', message: '' })

        try {
            const response = await fetch('/api/send-contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (response.ok) {
                setStatus({ type: 'success', message: 'Thank you! We will get back to you soon.' })
                setFormData({ name: '', phone: '', location: '', message: '' })
            } else {
                setStatus({ type: 'error', message: data.error || 'Failed to send message. Please try again.' })
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to send message. Please try again.' })
        } finally {
            setIsSubmitting(false)
        }
    }

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
                                    <p>341, Avadh Arena,<br />VIP Road, Vesu,<br /> Surat 395007</p>
                                </div>
                                <div className="detail-item">
                                    <label>Email</label>
                                    <a href="mailto:hello@anantaraa.in">hello@anantaraa.in</a>
                                </div>
                                <div className="detail-item">
                                    <label>Phone</label>
                                    <p>+91 9574652320</p>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-wrapper">
                            <form className="minimal-form" onSubmit={handleSubmit}>
                                {status.message && (
                                    <div className={`form-message ${status.type}`}>
                                        {status.message}
                                    </div>
                                )}
                                <div className="form-group slide-up">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group slide-up" style={{ animationDelay: '0.1s' }}>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Contact Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group slide-up" style={{ animationDelay: '0.2s' }}>
                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="Project Location"
                                        value={formData.location}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group slide-up" style={{ animationDelay: '0.3s' }}>
                                    <textarea
                                        rows="4"
                                        name="message"
                                        placeholder="Briefly describe your vision..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="submit-btn slide-up"
                                    style={{ animationDelay: '0.4s' }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                                </button>
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

         .submit-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
         }

         .form-message {
            padding: 1rem;
            border-radius: 4px;
            margin-bottom: 1.5rem;
            font-size: 0.95rem;
         }

         .form-message.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
         }

         .form-message.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
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
