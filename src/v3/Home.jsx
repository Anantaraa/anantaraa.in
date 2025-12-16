import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import p1 from '../assets/project1.png'
import p2 from '../assets/project2.png'

const V3Home = () => {
    return (
        <div className="v3-container theme-canvas">
            <Navbar />
            <div className="scroll-container">
                <section className="hero-v3">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        Anantaraa
                    </motion.h1>
                </section>

                <section className="gallery-v3">
                    <div className="art-piece floating" style={{ top: '20%', left: '10%' }}>
                        <img src={p1} alt="Project 1" />
                        <span>Residential 001</span>
                    </div>
                    <div className="art-piece floating" style={{ top: '40%', right: '15%' }}>
                        <img src={p2} alt="Project 2" />
                        <span>Commercial 002</span>
                    </div>

                    <div className="canvas-text">
                        <p>Architecture as art.</p>
                        <p>Space as emotion.</p>
                    </div>
                </section>
            </div>

            <style>{`
        .theme-canvas {
          --color-bg: #eaeaea;
          --color-text: #222;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          background-color: var(--color-bg);
          color: var(--color-text);
          overflow-x: hidden;
        }
        
        .hero-v3 {
           height: 70vh;
           display: flex;
           justify-content: center;
           align-items: center;
        }
        
        .hero-v3 h1 {
           font-size: 12vw;
           font-weight: 300;
           letter-spacing: -0.05em;
           mix-blend-mode: difference;
        }

        .gallery-v3 {
           position: relative;
           height: 150vh;
           width: 100%;
        }

        .art-piece {
           position: absolute;
           width: 30vw;
           transition: transform 0.1s;
        }
        
        .art-piece img {
           width: 100%;
           box-shadow: 20px 20px 60px rgba(0,0,0,0.1);
           border-radius: 4px;
        }
        
        .art-piece span {
           display: block;
           margin-top: 1rem;
           font-size: 0.8rem;
           font-style: italic;
        }
        
        .canvas-text {
           position: absolute;
           bottom: 10%;
           left: 50%;
           transform: translateX(-50%);
           text-align: center;
           font-size: 2rem;
           font-family: 'Playfair Display', serif;
        }
      `}</style>
        </div>
    )
}

export default V3Home
