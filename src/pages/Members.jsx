import React from 'react'
import PageTransition from '../components/PageTransition'

const Members = () => {
    return (
        <PageTransition>
            <div className="page-container theme-canvas">
                <div className="container header-spacer">
                    <h1 className="page-title">The Studio</h1>

                    <div className="members-grid">
                        {/* Placeholders for team members */}
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="member-card">
                                <div className="member-photo"></div>
                                <h3>Architect Name</h3>
                                <p>Lead Architect</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style>{`
         .members-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 4rem;
         }
         
         .member-card {
            text-align: center;
         }
         
         .member-photo {
            width: 100%;
            aspect-ratio: 3/4;
            background-color: #e0e0e0;
            margin-bottom: 1.5rem;
         }
         
         .member-card h3 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
         }
         
         .member-card p {
            font-family: 'Inter', sans-serif;
            color: #888;
            text-transform: uppercase;
            font-size: 0.8rem;
            letter-spacing: 0.1em;
         }
      `}</style>
        </PageTransition>
    )
}

export default Members
