import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { supabase } from '../lib/supabase'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { projects as staticProjects } from '../data/projects'

const ProjectDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [project, setProject] = useState(null)
    const { scrollYProgress } = useScroll()
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

    useEffect(() => {
        const fetchProject = async () => {
            // Try fetching from DB
            const { data, error } = await supabase.from('projects').select('*').eq('id', id).single()

            if (!error && data) {
                setProject(data)
            } else {
                // Fallback to static if not found in DB (or if using static IDs)
                const staticP = staticProjects.find(p => p.id === id)
                if (staticP) setProject(staticP)
                else if (error) console.error(error)
            }
        }
        fetchProject()
    }, [id])

    if (!project) return <div className="container section">Loading...</div>

    // Find next project logic would need a full list, skipping for now or fetching all IDs
    const nextProject = { id: '#', title: 'Next Project' }

    return (
        <PageTransition>
            <div className="project-detail-page">
                {/* Header */}
                <div className="container section pb-0">
                    <Link to="/projects" className="back-link">
                        <ArrowLeft size={16} /> Back to Projects
                    </Link>
                    <h1 className="detail-title">{project.title}</h1>
                    <div className="meta-grid">
                        <div className="meta-item">
                            <label>Location</label>
                            <span>{project.location}</span>
                        </div>
                        <div className="meta-item">
                            <label>Type</label>
                            <span>{project.type}</span>
                        </div>
                        <div className="meta-item">
                            <label>Year</label>
                            <span>{project.year}</span>
                        </div>
                        <div className="meta-item">
                            <label>Role</label>
                            <span>{project.role}</span>
                        </div>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="detail-hero">
                    <motion.img
                        style={{ scale }}
                        src={project.image_url || project.img || '/src/assets/hero.png'}
                        alt={project.title}
                    />
                </div>

                {/* Narrative */}
                <div className="container section">
                    <div className="narrative-grid">
                        <div className="narrative-intro">
                            <p>{project.description}</p>
                        </div>
                    </div>
                </div>

                {/* Stats Strip */}
                {project.stats && project.stats.length > 0 && (
                    <div className="stats-section">
                        <div className="container">
                            <div className="stats-grid">
                                {project.stats.map((stat, i) => (
                                    <div key={i} className="stat-card">
                                        <span className="stat-val">{stat.value}</span>
                                        <span className="stat-label">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Extended Gallery Mosaic */}
                {/* Additional Grid Section (Floor Plans / Extra Views) - MOVED TO TOP */}
                {(project.gallery_grid_1 || project.gallery_grid_2 || project.gallery_grid_3) && (
                    <div className="section pt-0">
                        <div className="container">
                            <div className="extra-grid-layout">
                                {project.gallery_grid_1 && (
                                    <div className="extra-item full-width">
                                        <img src={project.gallery_grid_1} alt="Detail Grid 1" />
                                    </div>
                                )}
                                {(project.gallery_grid_2 || project.gallery_grid_3) && (
                                    <div className="extra-row-split">
                                        {project.gallery_grid_2 && (
                                            <div className="extra-item portrait">
                                                <img src={project.gallery_grid_2} alt="Detail Grid 2" />
                                            </div>
                                        )}
                                        {project.gallery_grid_3 && (
                                            <div className="extra-item portrait">
                                                <img src={project.gallery_grid_3} alt="Detail Grid 3" />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Challenge & Solution Section */}
                <div className="section">
                    <div className="container">
                        <div className="narrative-grid split-view">
                            <div className="narrative-col">
                                <h3>The Challenge</h3>
                                <p>{project.challenge}</p>
                            </div>
                            <div className="narrative-col">
                                <h3>The Solution</h3>
                                <p>{project.solution}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Extended Gallery Mosaic - MOVED TO BOTTOM */}
                {(project.gallery_vertical || project.gallery_horizontal_1) && (
                    <div className="section">
                        <div className="container">
                            <h3 className="text-xs mb-8 uppercase tracking-widest text-muted">Project Gallery</h3>
                            <div className="mosaic-grid">
                                <div className="mosaic-column-left">
                                    {project.gallery_horizontal_1 && (
                                        <div className="mosaic-item horizontal-top">
                                            <img src={project.gallery_horizontal_1} alt="Detail Top" />
                                        </div>
                                    )}
                                    {project.gallery_horizontal_2 && (
                                        <div className="mosaic-item horizontal-bottom">
                                            <img src={project.gallery_horizontal_2} alt="Detail Bottom" />
                                        </div>
                                    )}
                                </div>

                                {project.gallery_vertical && (
                                    <div className="mosaic-item vertical-right">
                                        <img src={project.gallery_vertical} alt="Detail Vertical" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
         .pb-0 { padding-bottom: 0; }
         
         .back-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--text-muted);
            margin-bottom: 2rem;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
         }
         
         .detail-title {
            font-size: clamp(3rem, 6vw, 6rem);
            line-height: 1;
            margin-bottom: 4rem;
         }
         
         .meta-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
            border-top: 1px solid var(--dividers);
            padding-top: 2rem;
            margin-bottom: 4rem;
         }
         
         @media (min-width: 768px) {
            .meta-grid { grid-template-columns: repeat(4, 1fr); }
         }
         
         .meta-item label {
            display: block;
            text-transform: uppercase;
            font-size: 0.75rem;
            color: var(--text-muted);
            margin-bottom: 0.5rem;
            letter-spacing: 0.1em;
         }
         
         .meta-item span {
            font-size: 1.1rem;
         }
         
         .detail-hero {
            width: 100%;
            height: 80vh;
            overflow: hidden;
            background: #e0e0e0;
         }
         
         .detail-hero img {
            width: 100%;
            height: 100%;
            object-fit: cover;
         }
         
         .narrative-grid {
            display: grid;
            gap: 4rem;
         }
         
         @media (min-width: 768px) {
            .narrative-grid { 
                grid-template-columns: 1fr 1fr; 
                column-gap: 4rem;
                row-gap: 3rem;
            }
            .narrative-intro { grid-column: span 2; }
         }
         
         .narrative-intro p {
             font-size: 1.5rem;
             line-height: 1.4;
             color: var(--text-active);
             font-family: var(--font-display);
             font-weight: 300;
             margin-bottom: 3rem;
             max-width: 900px;
         }

         .narrative-col h3 {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            color: var(--text-active);
         }
         
         .narrative-col p {
            font-size: 1.1rem;
            line-height: 1.8;
            color: var(--text-muted);
         }
         
         /* Stats */
         .stats-section {
            background: #E5E5E5;
            padding: 4rem 0;
         }
         
         .stats-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            text-align: center;
         }
         
         .stat-val {
            display: block;
            font-family: var(--font-display);
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
         }
         
         .stat-label {
            font-family: var(--font-body);
            text-transform: uppercase;
            font-size: 0.75rem;
            letter-spacing: 0.1em;
            color: var(--text-muted);
         }
         
         /* Gallery Mosaic */
         .mosaic-grid {
             display: flex;
             flex-direction: column-reverse; /* Horizontal first on mobile */
             gap: 2rem;
         }
         
         .mosaic-item img {
             width: 100%;
             height: 100%;
             object-fit: cover;
             display: block;
         }

         @media(min-width: 768px) {
             .mosaic-grid {
                 display: grid;
                 grid-template-columns: 1fr 1fr;
                 gap: 2rem;
                 height: auto;
                 aspect-ratio: 16/9;
             }

             /* Extra Grid Layout */
             .extra-grid-layout {
                 display: flex;
                 flex-direction: column;
                 gap: 2rem;
             }

             .extra-item img {
                 width: 100%;
                 height: 100%;
                 object-fit: cover;
                 display: block;
             }

             .extra-row-split {
                 display: grid;
                 grid-template-columns: 1fr;
                 gap: 2rem;
             }

             @media (min-width: 768px) {
                 .extra-row-split {
                     grid-template-columns: 1fr 1fr;
                 }
                 .extra-item.full-width {
                     height: auto;
                     aspect-ratio: 16/9;
                 }
                 .extra-item.portrait {
                     height: auto;
                     aspect-ratio: 4/5;
                 }
             }
             
             .mosaic-column-left {
                 display: flex;
                 flex-direction: column;
                 gap: 2rem;
                 height: 100%;
             }
             
             .mosaic-item.vertical-right {
                 height: 100%;
             }
             
             .mosaic-item.horizontal-top, 
             .mosaic-item.horizontal-bottom {
                 flex: 1; /* Split height evenly */
             }
         }
         
         /* Next Project */
         .next-project-link {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid var(--dividers);
            padding-top: 2rem;
            margin-top: 1rem;
         }
         
         .next-project-link h2 {
            font-size: 3rem;
            transition: opacity 0.3s;
         }
         
         .next-project-link:hover h2, .next-project-link:hover svg {
            opacity: 0.6;
         }
      `}</style>
        </PageTransition>
    )
}

export default ProjectDetail
