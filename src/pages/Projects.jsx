import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import { supabase } from '../lib/supabase'
import { projects as staticProjects } from '../data/projects' // Fallback

const Projects = () => {
    const [hovered, setHovered] = useState(null)
    const [projectsData, setProjectsData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProjects = async () => {
            const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
            if (!error && data && data.length > 0) {
                setProjectsData(data)
            } else {
                setProjectsData(staticProjects) // Fallback if DB empty
            }
            setLoading(false)
        }
        fetchProjects()
    }, [])

    return (
        <PageTransition>
            <div className="page-container section">
                <div className="container">
                    <h1 className="page-title">Selected Works</h1>

                    <div className="projects-grid">
                        {projectsData.map((project) => (
                            <motion.div
                                key={project.id}
                                className={`project-card ${hovered && hovered !== project.id ? 'dimmed' : ''}`}
                                onMouseEnter={() => setHovered(project.id)}
                                onMouseLeave={() => setHovered(null)}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <Link to={`/projects/${project.id}`}>
                                    <div className="project-img">
                                        {/* If image_url is null (from seed), fallback to placeholder or map by ID if possible. For now specific fallback */}
                                        <img src={project.image_url || project.img || '/src/assets/p1.png'} alt={project.title} />
                                        <div className="overlay"></div>
                                    </div>
                                    <div className="project-info">
                                        <span className="text-xs">{project.type} — {project.location}</span>
                                        <h3>{project.title}</h3>
                                        <AnimatePresence>
                                            {hovered === project.id && (
                                                <motion.p
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="project-desc"
                                                >
                                                    {project.description}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        .page-title {
           margin-bottom: 4rem;
           font-size: 4rem;
        }
        
        .projects-grid {
           display: grid;
           grid-template-columns: 1fr;
           gap: 6rem;
        }
        
        @media (min-width: 768px) {
           .projects-grid {
              grid-template-columns: 1fr 1fr;
              row-gap: 10rem;
           }
           
           .project-card:nth-child(even) {
              margin-top: 6rem;
           }
        }
        
        .project-card {
           transition: opacity 0.4s ease;
           cursor: pointer;
        }
        
        .project-card.dimmed {
           opacity: 0.4;
        }
        
        .project-img {
           aspect-ratio: 4/5;
           overflow: hidden;
           margin-bottom: 1.5rem;
           background: #e0e0e0;
        }
        
        .project-img img {
           width: 100%;
           height: 100%;
           object-fit: cover;
           transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .project-card:hover .project-img img {
           transform: scale(1.03);
        }
        
        .project-info h3 {
           font-size: 2rem;
           margin: 0.5rem 0;
           font-weight: 400;
        }
        
        .project-desc {
           color: var(--text-muted);
           overflow: hidden;
           font-size: 0.9rem;
        }
      `}</style>
        </PageTransition>
    )
}

export default Projects
