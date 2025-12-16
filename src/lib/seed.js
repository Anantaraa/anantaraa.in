import { supabase } from './supabase'
import { projects } from '../data/projects'

// Static data for Team
const team = [
    { name: "Ar. Aryan Sharma", role: "Principal Architect", bio: "20 years of crafting spaces that resonate with silence and light.", image_url: null },
    { name: "Ar. Leela Das", role: "Design Director", bio: "Focusing on sustainable materiality and context-driven forms.", image_url: null },
    { name: "Rohan Mehta", role: "Structural Lead", bio: "Ensuring that the most ambitious visions stand the test of time.", image_url: null },
    { name: "Siya Kapoor", role: "Interior Lead", bio: "Curating the tactile experience of every room.", image_url: null }
]

// Static data for Values
const values = [
    { title: "Sustainability", description: "Architecture must give more than it takes. We design net-positive buildings that breathe with the environment, using passive cooling, local materials, and renewable energy to minimize our footprint.", display_order: 1 },
    { title: "Context", description: "A building should look like it grew from the site. We study the soil, the wind, the history, and the people to create spaces that are deeply rooted in their location. No two designs are ever the same.", display_order: 2 },
    { title: "Human-Centric", description: "Space affects the psyche. We prioritize natural light, air quality, and spatial flow to enhance the well-being of the inhabitants. Architecture is for people, not just for photos.", display_order: 3 },
    { title: "Innovation", description: "We embrace technology to solve age-old problems. From parametric design to advanced fabrication, we push the boundaries of what is possible in construction.", display_order: 4 }
]

export const seedDatabase = async () => {
    try {
        // 1. Seed Projects
        // Map static project structure to DB columns if necessary
        const projectRows = projects.map(p => ({
            title: p.title,
            type: p.type,
            location: p.location,
            year: p.year,
            role: p.role,
            description: p.desc,
            challenge: p.challenge,
            solution: p.solution,
            // Use placeholder image if p.img is a local import (which is a string URL in Vite)
            image_url: null, // We can't upload assets easily from client side seed without File objects. Users should upload images manually or we leave null.
            stats: p.stats,
            gallery: []
        }))

        const { error: pError } = await supabase.from('projects').insert(projectRows)
        if (pError) throw pError

        // 2. Seed Team
        const { error: tError } = await supabase.from('team').insert(team)
        if (tError) throw tError

        // 3. Seed Values
        const { error: vError } = await supabase.from('values').insert(values)
        if (vError) throw vError

        return { success: true }
    } catch (error) {
        console.error("Seeding error:", error)
        return { success: false, error }
    }
}
