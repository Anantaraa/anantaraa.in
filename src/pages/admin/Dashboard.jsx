import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { seedDatabase } from '../../lib/seed'

const Dashboard = () => {
    const [seeding, setSeeding] = useState(false)
    const [msg, setMsg] = useState('')

    const handleSeed = async () => {
        setSeeding(true)
        const res = await seedDatabase()
        if (res.success) setMsg('Database populated successfully!')
        else setMsg(`Error seeding database: ${res.error?.message || JSON.stringify(res.error)}`)
        setSeeding(false)
    }

    return (
        <div>
            <div className="dash-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>Welcome to the Anantaraa Content Management System.</p>
                </div>
                <button onClick={handleSeed} disabled={seeding} className="seed-btn">
                    {seeding ? 'Seeding...' : 'Seed Initial Data'}
                </button>
            </div>
            {msg && <p className="success-msg">{msg}</p>}

            <div className="dash-grid">
                <Link to="/admin/projects" className="dash-card">
                    <h3>Projects</h3>
                    <span>Manage your architectural portfolio.</span>
                </Link>
                <Link to="/admin/team" className="dash-card">
                    <h3>Team</h3>
                    <span>Update studio members.</span>
                </Link>
                <Link to="/admin/values" className="dash-card">
                    <h3>Values</h3>
                    <span>Edit philosophy statements.</span>
                </Link>
            </div>
            <style>{`
         .dash-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin-top: 2rem;
         }
         .dash-card {
            background: white;
            padding: 2rem;
            border: 1px solid #E0E0E0;
            text-decoration: none;
            color: inherit;
            transition: all 0.3s ease;
            display: block;
         }
         .dash-card:hover {
            border-color: #1A1A1A;
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
         }
         .dash-card h3 { margin-bottom: 0.5rem; }
         .dash-card span { color: #666; font-size: 0.9rem; }
         
         .dash-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
         .seed-btn { margin-top: 0; background: #D4AF37; }
         .success-msg { color: green; margin-bottom: 1rem; }
      `}</style>
        </div>
    )
}

export default Dashboard
