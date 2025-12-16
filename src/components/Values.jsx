import React from 'react'
import { motion } from 'framer-motion'

const Values = () => {
    const values = [
        { title: "Sustainability", desc: "Building in harmony with nature." },
        { title: "Innovation", desc: "Pushing boundaries of form and function." },
        { title: "Timelessness", desc: "Creating spaces that endure." }
    ]

    return (
        <section id="values" className="section values-section">
            <div className="container">
                <div className="values-grid">
                    <div className="values-header">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            Our Philosophy
                        </motion.h2>
                    </div>
                    <div className="values-list">
                        {values.map((item, index) => (
                            <motion.div
                                key={index}
                                className="value-item"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <h3>0{index + 1}</h3>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <style>{`
        .values-section {
          background-color: var(--color-bg);
        }
        
        .values-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
        }
        
        @media (min-width: 768px) {
          .values-grid {
             grid-template-columns: 1fr 2fr;
          }
        }

        .values-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
        }

        .value-item h3 {
          color: var(--color-accent);
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }

        .value-item h4 {
          font-size: 2rem;
          margin-bottom: 1rem;
          font-family: var(--font-display);
        }

        .value-item p {
          color: var(--color-text-muted);
        }
      `}</style>
        </section>
    )
}

export default Values
