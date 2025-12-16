import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import heroImg from '../assets/hero.png'
import { supabase } from '../lib/supabase'
import { projects as staticProjects } from '../data/projects'

const Home = () => {
    const heroRef = useRef(null)
    const [featuredProjects, setFeaturedProjects] = useState([])

    useEffect(() => {
        const fetchFeatured = async () => {
            const { data } = await supabase.from('projects').select('*').eq('featured', true).limit(4)
            if (data && data.length > 0) setFeaturedProjects(data)
            else setFeaturedProjects(staticProjects.slice(0, 4))
        }
        fetchFeatured()
    }, [])

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

    return (
        <PageTransition>
            <div className="home-page">
                {/* Hero */}
                <section ref={heroRef} className="hero-section">
                    <motion.div style={{ y }} className="hero-bg">
                        <img src={heroImg} alt="Anantaraa Architecture" />
                        <div className="overlay"></div>
                    </motion.div>
                    <div className="container hero-content">
                        <motion.h1
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            Designing Spaces.<br />Crafting Experiences.
                        </motion.h1>
                        <motion.div
                            className="scroll-indicator"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            <span>Scroll</span>
                            <div className="line"></div>
                        </motion.div>
                    </div>
                </section>

                {/* Manifesto */}
                <section className="section manifesto">
                    <div className="container">
                        <div className="manifesto-grid">
                            <h2 className="fade-in">We curate the invisible.</h2>
                            <div className="manifesto-text">
                                <p className="text-lg">Anantaraa operates at the intersection of rigorous planning and artistic intuition. We believe that architecture is not just about shelter, but about the poetry of living.</p>
                                <Link to="/values" className="btn-link">Our Philosophy</Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Projects Highlight */}
                <section className="section featured">
                    <div className="container">
                        <div className="section-header">
                            <span className="text-xs">Selected Works</span>
                            <Link to="/projects" className="text-xs">View All</Link>
                        </div>
                        <div className="featured-grid">
                            {featuredProjects.map((project) => (
                                <Link key={project.id} to={`/ projects / ${project.id} `} className="featured-card">
                                    <div className="img-wrapper">
                                        <img src={project.image_url || project.img || '/src/assets/p1.png'} alt={project.title} />
                                    </div>
                                    <div className="card-info">
                                        <h3>{project.title}</h3>
                                        <span>{project.type}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <style>{`
                .hero-section {
                    height: 100vh;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                }
                
                .hero-bg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 120%; /* For parallax */
                    z-index: -1;
                }
                
                .hero-bg img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.3);
                }
                
                .hero-content {
                    color: white;
                    position: relative;
                    width: 100%;
                }
                
                .hero-content h1 {
                    font-size: clamp(3rem, 6vw, 6rem);
                    line-height: 1.1;
                }
                
                .scroll-indicator {
                    position: absolute;
                    bottom: -15vh; /* Adjust based on hero height */
                    left: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .scroll-indicator .line {
                    width: 1px;
                    height: 60px;
                    background: white;
                }

                .manifesto-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 4rem;
                }
                
                .manifesto h2 {
                    font-size: 3rem;
                    line-height: 1.2;
                }
                
                .btn-link {
                    display: inline-block;
                    margin-top: 2rem;
                    text-decoration: underline;
                    text-underline-offset: 5px;
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid var(--dividers);
                    padding-bottom: 1rem;
                    margin-bottom: 3rem;
                }
                
                .featured-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 4rem;
                }
                
                .img-wrapper {
                    overflow: hidden;
                    aspect-ratio: 4/3;
                    margin-bottom: 1rem;
                }
                
                .img-wrapper img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                
                .featured-card:hover .img-wrapper img {
                    transform: scale(1.05);
                }
                
                .card-info {
                    display: flex;
                    justify-content: space-between;
                    align-items: baseline;
                }
                
                .card-info h3 { font-size: 1.5rem; }
                .card-info span { color: var(--text-muted); font-family: var(--font-body); }

                @media(min-width: 768px) {
                    .manifesto-grid { grid-template-columns: 1fr 1fr; }
                    .featured-grid { grid-template-columns: 1fr 1fr; }
                    .scroll-indicator { bottom: -20vh; }
                }
            `}</style>
        </PageTransition>
    )
}

export default Home

