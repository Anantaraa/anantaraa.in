import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import heroImg from '../assets/hero.png'
import p1 from '../assets/project1.png'
import p2 from '../assets/project2.png'
import p3 from '../assets/project3.png'

const Section = ({ children, className = "" }) => (
    <motion.section
        className={`home-section ${className}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
    >
        {children}
    </motion.section>
)

const Home = () => {
    return (
        <PageTransition>
            <div className="home-page theme-canvas">

                {/* NEW HERO */}
                <div className="hero-fullscreen">
                    <motion.div
                        className="hero-bg"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    >
                        <img src={heroImg} alt="Anantaraa Architecture" />
                        <div className="overlay"></div>
                    </motion.div>
                    <div className="hero-content container">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            Anantaraa<br />Design Studio
                        </motion.h1>
                        <p className="hero-subtitle">DESIGNS THAT DON'T RETIRE</p>
                    </div>
                </div>

                {/* INTRODUCTION */}
                <Section className="intro-section container">
                    <div className="intro-grid">
                        <h2>Spatial<br />Narratives</h2>
                        <div className="intro-text">
                            <p className="lead">We do not just build structures; we curate the invisible.</p>
                            <p>Anantaraa operates at the intersection of rigorous planning and artistic intuition. Our studio bridges the gap between the sketch and the sanctuary, ensuring that every line drawn serves a purpose in the final reality.</p>
                            <Link to="/values" className="btn-link">Read our Philosophy</Link>
                        </div>
                    </div>
                </Section>

                {/* FEATURED WORK */}
                <Section className="featured-section">
                    <div className="container">
                        <div className="section-header">
                            <h3>Selected Projects</h3>
                            <Link to="/work" className="view-all">View All Work</Link>
                        </div>
                        <div className="featured-grid">
                            <Link to="/work" className="feat-item">
                                <div className="img-wrap"><img src={p1} alt="Project 1" /></div>
                                <h4>The Residence</h4>
                                <span>Residential</span>
                            </Link>
                            <Link to="/work" className="feat-item">
                                <div className="img-wrap"><img src={p2} alt="Project 2" /></div>
                                <h4>Skyline Hub</h4>
                                <span>Commercial</span>
                            </Link>
                            <Link to="/work" className="feat-item">
                                <div className="img-wrap"><img src={p3} alt="Project 3" /></div>
                                <h4>Oasis Loft</h4>
                                <span>Interior</span>
                            </Link>
                        </div>
                    </div>
                </Section>

                {/* PROCESS / SERVICES */}
                <Section className="process-section contrast-section">
                    <div className="container">
                        <div className="process-grid">
                            <div className="process-step">
                                <span className="step-num">01</span>
                                <h4>Plan</h4>
                                <p>Context-driven conceptualization. We analyze light, wind, and life to create layouts that breathe.</p>
                            </div>
                            <div className="process-step">
                                <span className="step-num">02</span>
                                <h4>Visualize</h4>
                                <p>Hyper-realistic 3D modeling. We eliminate uncertainty by showing you the future before it is built.</p>
                            </div>
                            <div className="process-step">
                                <span className="step-num">03</span>
                                <h4>Construct</h4>
                                <p>Precision execution. We oversee the translation from digital dream to physical legacy.</p>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* CALL TO ACTION */}
                <Section className="cta-section container">
                    <h2>Ready to build your legacy?</h2>
                    <Link to="/contact" className="cta-button">Start a Project</Link>
                </Section>

            </div>

            <style>{`
         .hero-content h1 {
            font-size: clamp(3rem, 7vw, 7rem);
            line-height: 0.9;
            margin-bottom: 2rem;
            text-transform: uppercase;
         }
         
         .hero-subtitle {
            font-family: 'Inter', sans-serif;
            letter-spacing: 0.3em;
            border-left: 2px solid #D4AF37;
            padding-left: 1rem;
         }

         .home-section {
            padding: 8rem 0;
         }

         /* Intro */
         .intro-grid {
            display: grid;
            gap: 4rem;
         }
         @media (min-width: 768px) {
            .intro-grid { grid-template-columns: 1fr 1fr; }
         }
         .intro-grid h2 {
            font-size: 4rem;
            line-height: 1;
            color: var(--accent-color);
         }
         .lead {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            color: var(--text-color);
         }
         
         .btn-link {
            display: inline-block;
            margin-top: 2rem;
            text-decoration: underline;
            text-underline-offset: 5px;
            font-family: 'Inter', sans-serif;
            text-transform: uppercase;
            font-size: 0.8rem;
            letter-spacing: 0.1em;
         }

         /* Featured */
         .section-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 4rem;
            border-bottom: 1px solid #ccc;
            padding-bottom: 1rem;
         }
         
         .featured-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
         }
         
         .img-wrap {
            aspect-ratio: 4/5;
            overflow: hidden;
            margin-bottom: 1rem;
         }
         .img-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s;
         }
         .feat-item:hover .img-wrap img { transform: scale(1.05); }
         .feat-item h4 { font-size: 1.5rem; margin-bottom: 0.2rem; }
         .feat-item span { font-family: 'Inter', sans-serif; color: #888; font-size: 0.9rem; }

         /* Process */
         .process-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 4rem;
         }
         .step-num {
            display: block;
            font-size: 4rem;
            color: #e0e0e0;
            font-family: 'Playfair Display', serif;
            margin-bottom: 1rem;
         }
         .process-step h4 {
             font-size: 1.5rem;
             margin-bottom: 1rem;
             text-transform: uppercase;
             letter-spacing: 0.1em;
         }

         /* CTA */
         .cta-section {
            text-align: center;
            padding: 10rem 0;
         }
         .cta-section h2 {
            font-size: 4rem;
            margin-bottom: 4rem;
         }
         .cta-button {
            display: inline-block;
            background: #1A1A1A;
            color: white;
            padding: 1.5rem 4rem;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            transition: transform 0.3s;
         }
         .cta-button:hover {
            transform: translateY(-5px);
         }
      `}</style>
        </PageTransition>
    )
}

export default Home
