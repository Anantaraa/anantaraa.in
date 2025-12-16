import React from 'react'
import { motion } from 'framer-motion'
import p1 from '../assets/project1.png'
import p2 from '../assets/project2.png'
import p3 from '../assets/project3.png'

const projects = [
    { id: 1, title: 'The Residence', category: 'Residential', img: p1 },
    { id: 2, title: 'Skyline Hub', category: 'Commercial', img: p2 },
    { id: 3, title: 'Oasis Loft', category: 'Interior', img: p3 },
]

const Portfolio = () => {
    return (
        <section id="work" className="section portfolio-section">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    Selected Works
                </motion.h2>

                <div className="gallery">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            className="project-card"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="image-wrapper">
                                <img src={project.img} alt={project.title} />
                                <div className="hover-info">
                                    <p>{project.category}</p>
                                    <h3>{project.title}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
        .portfolio-section {
          padding-bottom: 0;
        }
        
        .section-title {
          margin-bottom: 4rem;
        }

        .gallery {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        
        @media (min-width: 768px) {
           .gallery {
             grid-template-columns: repeat(3, 1fr);
           }
        }

        .image-wrapper {
          position: relative;
          overflow: hidden;
          aspect-ratio: 4/5;
          cursor: pointer;
        }

        .image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .image-wrapper:hover img {
          transform: scale(1.05);
        }

        .hover-info {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 2rem;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.4s ease;
        }

        .image-wrapper:hover .hover-info {
          opacity: 1;
          transform: translateY(0);
        }
        
        .hover-info h3 {
          font-size: 1.5rem;
          color: white;
        }
        
        .hover-info p {
           color: var(--color-accent);
           text-transform: uppercase;
           font-size: 0.8rem;
           letter-spacing: 0.1em;
           margin-bottom: 0.5rem;
        }
      `}</style>
        </section>
    )
}

export default Portfolio
