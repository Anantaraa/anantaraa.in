import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar from '../components/Navbar' // Will need to make this minimal
import Footer from '../components/Footer' // Reuse footer
import p1 from '../assets/project1.png'
import p2 from '../assets/project2.png'
import p3 from '../assets/project3.png'

const projects = [
    { id: 1, title: 'The Residence', location: 'Kyoto, Japan', img: p1, offset: 0 },
    { id: 2, title: 'Skyline Hub', location: 'New York, USA', img: p2, offset: 20 },
    { id: 3, title: 'Oasis Loft', location: 'Berlin, Germany', img: p3, offset: -10 },
]

const CanvasLayout = () => {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, -50])

    return (
        <div className="canvas-container theme-canvas">
            <Navbar />

            {/* Hero */}
            <section className="hero-canvas">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="hero-text"
                >
                    <h1>Anantaraa</h1>
                    <p className="subtitle">Architecture / Interiors / Design</p>
                </motion.div>
                <div className="scroll-indicator">
                    <span>Explore</span>
                    <div className="line"></div>
                </div>
            </section>

            {/* Manifesto */}
            <section className="manifesto-canvas contrast-section">
                <div className="container">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ margin: "-100px" }}
                        className="big-statement"
                    >
                        Space is not merely emptiness. It is a canvas for life, a vessel for light, and a silent observer of time. We curate moments, not just walls.
                    </motion.p>
                </div>
            </section>

            {/* Gallery */}
            <section className="gallery-canvas" ref={containerRef}>
                <div className="container">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={`project-row ${index % 2 === 0 ? 'left' : 'right'}`}
                            style={{ y: project.offset }} // Simple parallax effect
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="project-image">
                                <img src={project.img} alt={project.title} />
                                <div className="overlay"></div>
                            </div>
                            <div className="project-info">
                                <span className="project-number">0{index + 1}</span>
                                <h3>{project.title}</h3>
                                <p>{project.location}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Values Compact */}
            <section className="values-canvas">
                <div className="container">
                    <div className="value-strip">
                        <span>Sustainability</span>
                        <span>/</span>
                        <span>Innovation</span>
                        <span>/</span>
                        <span>Timelessness</span>
                    </div>
                </div>
            </section>

            {/* Contact Simple */}
            <section className="contact-canvas contrast-section">
                <div className="container center-text">
                    <h2>Let's build the future.</h2>
                    <a href="mailto:hello@anantaraa.arch" className="email-link">hello@anantaraa.arch</a>
                </div>
            </section>

            <Footer />

            <style>{`
        /* Theme Variables */
        .theme-canvas {
          --bg-color: #F4F4F0;
          --text-color: #1A1A1A;
          --accent-color: #D4AF37;
          --font-display: 'Playfair Display', serif;
          --font-body: 'Inter', sans-serif;
          
          background-color: var(--bg-color);
          color: var(--text-color);
          overflow-x: hidden;
        }

        /* Utils */
        .contrast-section {
           background-color: #EAEAE6; /* Slightly darker for contrast */
        }
        .center-text { text-align: center; }

        /* Typography */
        h1 {
           font-family: var(--font-display);
           font-size: clamp(5rem, 15vw, 12rem);
           font-weight: 400;
           line-height: 0.9;
           letter-spacing: -0.04em;
           color: var(--text-color);
        }
        
        h2 {
           font-family: var(--font-display);
           font-size: clamp(2rem, 5vw, 4rem);
           margin-bottom: 2rem;
        }

        /* Hero */
        .hero-canvas {
           height: 100vh;
           display: flex;
           flex-direction: column;
           justify-content: center;
           align-items: center;
           padding: 2rem;
           position: relative;
        }
        
        .subtitle {
           font-family: var(--font-body);
           text-transform: uppercase;
           letter-spacing: 0.2em;
           font-size: 0.8rem;
           margin-top: 1rem;
           text-align: right;
           margin-right: 1rem;
        }
        
        .scroll-indicator {
           position: absolute;
           bottom: 3rem;
           display: flex;
           flex-direction: column;
           align-items: center;
           gap: 1rem;
        }
        
        .scroll-indicator span {
           font-size: 0.7rem;
           text-transform: uppercase;
           letter-spacing: 0.2em;
        }
        
        .line {
           width: 1px;
           height: 50px;
           background-color: var(--text-color);
        }

        /* Manifesto */
        .manifesto-canvas {
           padding: 10rem 0;
           display: flex;
           align-items: center;
           justify-content: center;
        }
        
        .big-statement {
           font-family: var(--font-display);
           font-size: clamp(2rem, 4vw, 3.5rem);
           line-height: 1.4;
           text-align: center;
           max-width: 900px;
           margin: 0 auto;
        }

        /* Gallery */
        .gallery-canvas {
           padding: 10rem 0;
        }
        
        .project-row {
           display: flex;
           flex-direction: column;
           margin-bottom: 10rem;
           gap: 2rem;
        }
        
        @media (min-width: 768px) {
           .project-row {
              flex-direction: row;
              align-items: center;
              gap: 4rem;
           }
           
           .project-row.right {
              flex-direction: row-reverse;
           }
        }
        
        .project-image {
           flex: 1.5;
           overflow: hidden;
           position: relative;
        }
        
        .project-image img {
           width: 100%;
           height: auto;
           display: block;
           transition: transform 1s ease;
        }
        
        .project-image:hover img {
           transform: scale(1.05);
        }
        
        .project-info {
           flex: 1;
           padding: 2rem;
        }
        
        .project-number {
           display: block;
           font-size: 0.8rem;
           margin-bottom: 1rem;
           border-bottom: 1px solid var(--text-color);
           padding-bottom: 0.5rem;
           width: fit-content;
        }
        
        .project-info h3 {
           font-size: 3rem;
           margin-bottom: 0.5rem;
        }
        
        .project-info p {
           font-family: var(--font-body);
           color: #555;
        }

        /* Values */
        .values-canvas {
           padding: 6rem 0;
           opacity: 0.6;
        }
        
        .value-strip {
           display: flex;
           justify-content: center;
           gap: 2rem;
           font-size: 1.2rem;
           text-transform: uppercase;
           letter-spacing: 0.1em;
           flex-wrap: wrap;
        }

        /* Contact */
        .contact-canvas {
           padding: 10rem 0;
        }
        
        .email-link {
           font-size: 2rem;
           text-decoration: underline;
           text-underline-offset: 10px;
           transition: opacity 0.3s;
        }
        
        .email-link:hover {
           opacity: 0.6;
        }
      `}</style>
        </div>
    )
}

export default CanvasLayout
