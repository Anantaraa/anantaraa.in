import React from 'react'
import { motion } from 'framer-motion'
import heroImage from '../assets/hero.png'

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-background">
                <img src={heroImage} alt="Modern Architecture" />
                <div className="overlay"></div>
            </div>
            <div className="hero-content container">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    Designing the <span className="italic">Future</span>, <br />
                    Preserving the Essence.
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    ANANTARAA ARCHITECTURE
                </motion.p>
            </div>

            <style>{`
        .hero-section {
          height: 100vh;
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }

        .hero-background img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.7);
        }

        .hero-content {
          position: relative;
          z-index: 1;
          color: white;
        }

        .hero-content h1 {
          margin-bottom: 2rem;
        }
        
        .italic {
          font-style: italic;
          font-family: var(--font-display);
        }

        .hero-content p {
          letter-spacing: 0.3em;
          font-size: 0.9rem;
          opacity: 0.8;
        }
      `}</style>
        </section>
    )
}

export default Hero
