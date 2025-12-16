import React, { useEffect, useState } from 'react'
import PageTransition from '../components/PageTransition'
import { supabase } from '../lib/supabase'

const Team = () => {
    const [teamMembers, setTeamMembers] = useState([])

    useEffect(() => {
        const fetchTeam = async () => {
            const { data } = await supabase.from('team').select('*')
            if (data && data.length > 0) setTeamMembers(data)
            else {
                // Static fallback
                setTeamMembers([
                    { id: 1, name: "Ar. Aryan Sharma", role: "Principal Architect", bio: "20 years of crafting spaces...", image_url: null },
                    { id: 2, name: "Ar. Leela Das", role: "Design Director", bio: "Focusing on sustainable materiality...", image_url: null },
                ])
            }
        }
        fetchTeam()
    }, [])

    return (
        <PageTransition>
            <div className="page-container section">
                <div className="container">
                    <h1 className="page-title">The Architects</h1>

                    <div className="team-grid">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="team-card">
                                <div className="portrait-frame">
                                    {/* Placeholder for portrait */}
                                    <div className="portrait-placeholder"></div>
                                </div>
                                <div className="member-info">
                                    <h3>{member.name}</h3>
                                    <span className="role">{member.role}</span>
                                    <p className="bio">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .team-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 4rem;
                    margin-top: 4rem;
                }
                
                .portrait-frame {
                    aspect-ratio: 3/4;
                    background: #E5E5E5;
                    margin-bottom: 1.5rem;
                    position: relative;
                    overflow: hidden;
                }

                /* Subtle gradient placeholder */
                .portrait-placeholder {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, #d0d0d0, #eaeaea);
                }
                
                .member-info h3 {
                    font-size: 1.25rem;
                    margin-bottom: 0.25rem;
                }
                
                .role {
                    display: block;
                    font-family: var(--font-body);
                    text-transform: uppercase;
                    font-size: 0.75rem;
                    letter-spacing: 0.1em;
                    color: var(--text-muted);
                    margin-bottom: 1rem;
                }
                
                .bio {
                    font-size: 0.9rem;
                    line-height: 1.6;
                    color: var(--text-active);
                    opacity: 0.8;
                }
            `}</style>
        </PageTransition>
    )
}

export default Team
