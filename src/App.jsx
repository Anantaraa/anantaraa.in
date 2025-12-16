import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import SmoothScroll from './components/SmoothScroll'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Work from './pages/Work'
import Values from './pages/Values'
import Members from './pages/Members'
import Contact from './pages/Contact'
import './index.css'

function App() {
    const location = useLocation()

    return (
        <SmoothScroll>
            <Navigation />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/values" element={<Values />} />
                    <Route path="/members" element={<Members />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </AnimatePresence>
        </SmoothScroll>
    )
}

export default App
