import React from 'react'
import PageTransition from '../components/PageTransition'

const Values = () => {
    return (
        <PageTransition>
            <div className="page-container theme-canvas">
                <div className="container header-spacer">
                    <h1 className="page-title">Philosophy</h1>

                    <div className="values-list-large">
                        <div className="value-row">
                            <span className="index">01</span>
                            <div className="content">
                                <h2>Plan from Scratch</h2>
                                <p>We believe every site whispers a different story. We do not impose; we listen. Every line drawn is a direct response to the context, the light, and the life that will inhabit the space.</p>
                            </div>
                        </div>

                        <div className="value-row">
                            <span className="index">02</span>
                            <div className="content">
                                <h2>3D Visualization</h2>
                                <p>Uncertainty is the enemy of great design. We bridge the gap between imagination and reality with hyper-realistic visualization, ensuring the dream you see is the home you get.</p>
                            </div>
                        </div>

                        <div className="value-row">
                            <span className="index">03</span>
                            <div className="content">
                                <h2>Timeless Designs</h2>
                                <p>Trends fade. Architecture should not. We strive for a silence in our work—a quality that allows the building to age gracefully, becoming more dignity with time.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
         .values-list-large {
            display: flex;
            flex-direction: column;
            gap: 6rem;
         }
         
         .value-row {
            display: grid;
            grid-template-columns: 100px 1fr;
            border-top: 1px solid #ddd;
            padding-top: 2rem;
         }
         
         .index {
            font-family: 'Inter', sans-serif;
            color: #D4AF37;
         }
         
         .content h2 {
            font-size: 3rem;
            margin-bottom: 2rem;
         }
         
         .content p {
            font-family: 'Inter', sans-serif;
            max-width: 600px;
            font-size: 1.1rem;
            color: #555;
            line-height: 1.8;
         }
         
         @media (max-width: 768px) {
            .value-row { grid-template-columns: 1fr; }
            .index { margin-bottom: 1rem; display: block; }
         }
      `}</style>
        </PageTransition>
    )
}

export default Values
