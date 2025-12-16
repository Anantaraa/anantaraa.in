import React, { useEffect, useState } from 'react'
import PageTransition from '../components/PageTransition'
import { supabase } from '../lib/supabase'

const Values = () => {
    const [values, setValues] = useState([])

    useEffect(() => {
        const fetchValues = async () => {
            const { data } = await supabase.from('values').select('*').order('display_order', { ascending: true })
            if (data && data.length > 0) setValues(data)
            else {
                // Static Fallback if connection fails/empty
                setValues([
                    { title: "Sustainability", description: "Architecture must give more than it takes...", display_order: 1 },
                    { title: "Context", description: "A building should look like it grew from the site...", display_order: 2 },
                ])
            }
        }
        fetchValues()
    }, [])

    return (
        <PageTransition>
            <div className="page-container section">
                <div className="container">
                    <h1 className="page-title">Philosophy</h1>

                    <div className="values-layout">
                        {values.map((val, i) => (
                            <div key={val.id || i} className="value-block">
                                <span className="index">0{val.display_order}</span>
                                <h2>{val.title}</h2>
                                <p>{val.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
         .values-layout {
            display: grid;
            grid-template-columns: 1fr;
            gap: 6rem;
            margin-top: 4rem;
         }
         
         .value-block {
            border-top: 1px solid var(--dividers);
            padding-top: 1rem;
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
         }
         
         @media (min-width: 768px) {
            .values-layout {
               grid-template-columns: 1fr 1fr;
               column-gap: 4rem;
               row-gap: 8rem;
            }
         }
         
         .index {
            font-family: var(--font-body);
            color: var(--accent-sand);
            font-size: 0.9rem;
         }
         
         .value-block h2 {
            font-size: 2.5rem;
         }
         
         .value-block p {
            color: var(--text-muted);
            line-height: 1.8;
            font-size: 1.1rem;
         }
      `}</style>
        </PageTransition>
    )
}

export default Values
