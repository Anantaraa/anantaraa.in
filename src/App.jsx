import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import SmoothScroll from './components/SmoothScroll'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'

import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Values from './pages/Values'
import Team from './pages/Team'
import Contact from './pages/Contact'

import { AuthProvider } from './contexts/AuthContext'
// Admin Pages
import Login from './pages/admin/Login'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import ProjectsManager from './pages/admin/ProjectsManager'
import TeamManager from './pages/admin/TeamManager'
import ValuesManager from './pages/admin/ValuesManager'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const location = useLocation()

  return (
    <AuthProvider>
      <SmoothScroll>
        <Navigation />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/values" element={<Values />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="projects" element={<ProjectsManager />} />
              <Route path="team" element={<TeamManager />} />
              <Route path="values" element={<ValuesManager />} />
            </Route>
          </Routes>
        </AnimatePresence>
        <Footer />
      </SmoothScroll>
    </AuthProvider>
  )
}

export default App
