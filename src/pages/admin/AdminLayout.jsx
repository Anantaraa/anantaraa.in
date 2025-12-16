import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const AdminLayout = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h3>Admin Panel</h3>
        </div>
        <nav className="sidebar-nav">
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/projects">Projects</Link>
          <Link to="/admin/team">Team</Link>
          <Link to="/admin/values">Values</Link>
        </nav>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
      <style>{`
        .admin-layout { 
            display: flex; 
            min-height: 100vh; 
        }
        .sidebar { 
          width: 250px; 
          background: #1A1A1A; 
          color: white; 
          padding: 2rem; 
          display: flex; 
          flex-direction: column; 
          position: fixed; /* FIXED POSITION */
          height: 100vh;
          top: 0;
          left: 0;
          z-index: 100;
        }
        .sidebar-header { margin-bottom: 3rem; }
        .sidebar-nav { display: flex; flex-direction: column; gap: 1rem; flex: 1; }
        .sidebar-nav a { 
          color: #A0A0A0; 
          text-decoration: none; 
          font-size: 0.9rem; 
          padding: 0.5rem 0; 
        }
        .sidebar-nav a:hover { color: white; }
        .logout-btn { 
          background: transparent; 
          border: 1px solid #333; 
          color: #A0A0A0; 
          padding: 0.8rem; 
          cursor: pointer; 
        }
        .admin-content { 
            flex: 1; 
            background: #F5F5F0; 
            padding: 3rem; 
            margin-left: 250px; /* OFFSET CONTENT */
            min-height: 100vh;
        }
        h1, h2, h3 { color: #1A1A1A; }
      `}</style>
    </div>
  )
}

export default AdminLayout
