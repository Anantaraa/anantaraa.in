import React from 'react'
import PageTransition from '../components/PageTransition'
import p1 from '../assets/project1.png'
import p2 from '../assets/project2.png'
import p3 from '../assets/project3.png'

const works = [
    { id: 1, title: 'The Residence', type: 'Residential', img: p1, year: '2024' },
    { id: 2, title: 'Skyline Hub', type: 'Icons', img: p2, year: '2023' },
    { id: 3, title: 'Oasis Loft', type: 'Interior', img: p3, year: '2023' },
    { id: 4, title: 'Minimal Villa', type: 'Residential', img: p1, year: '2024' }
]

const Work = () => {
    return (
        <PageTransition>
            <div className="page-container theme-canvas">
                <div className="container header-spacer">
                    <h1 className="page-title">Selected Works</h1>
                    <div className="work-grid">
                        {works.map((work) => (
                            <div key={work.id} className="work-item">
                                <div className="work-image">
                                    <img src={work.img} alt={work.title} />
                                    <div className="status-badge">3D Visualization</div>
                                </div>
                                <div className="work-info">
                                    <h3>{work.title}</h3>
                                    <div className="meta">
                                        <span>{work.type}</span>
                                        <span>{work.year}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style>{`
         .header-spacer { padding-top: 150px; padding-bottom: 100px; }
         
         .page-title {
            font-size: 4rem;
            margin-bottom: 4rem;
            color: var(--text-color);
         }

         .work-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
         }
         
         @media (min-width: 768px) {
            .work-grid {
               grid-template-columns: 1fr 1fr;
               row-gap: 8rem;
            }
            
            .work-item:nth-child(even) {
               margin-top: 6rem;
            }
         }
         
         .work-image {
            position: relative;
            margin-bottom: 1.5rem;
            overflow: hidden;
            cursor: pointer;
         }
         
         .work-image img {
            width: 100%;
            display: block;
            transition: transform 0.6s ease;
         }
         
         .work-image:hover img {
            transform: scale(1.03);
         }
         
         .status-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: white;
            color: black;
            padding: 0.5rem 1rem;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
         }
         
         .work-info h3 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
         }
         
         .meta {
            display: flex;
            justify-content: space-between;
            font-family: 'Inter', sans-serif;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 1rem;
         }
      `}</style>
        </PageTransition>
    )
}

export default Work
