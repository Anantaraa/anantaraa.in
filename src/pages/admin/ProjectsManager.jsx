import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react'
import ImageUpload from '../../components/ImageUpload'
import './ProjectsManager.css' // Import external styles

const ProjectsManager = () => {
    const [projects, setProjects] = useState([])
    const [editing, setEditing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [images, setImages] = useState({
        main: null,
        vertical: null, // Left Vert
        horizontal1: null, // Right Top
        horizontal2: null, // Right Bottom
        grid1: null, // Extra Grid 1
        grid2: null, // Extra Grid 2
        grid3: null  // Extra Grid 3
    })

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        setLoading(true)
        const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
        setProjects(data || [])
        setLoading(false)
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete project?')) return
        await supabase.from('projects').delete().eq('id', id)
        fetchProjects()
    }

    const startEditing = (project) => {
        setEditing(project)
        setImages({
            main: project.image_url,
            vertical: project.gallery_vertical,
            horizontal1: project.gallery_horizontal_1,
            horizontal2: project.gallery_horizontal_2,
            grid1: project.gallery_grid_1,
            grid2: project.gallery_grid_2,
            grid3: project.gallery_grid_3
        })
    }

    const startNew = () => {
        setEditing({})
        setImages({ main: null, vertical: null, horizontal1: null, horizontal2: null, grid1: null, grid2: null, grid3: null })
    }

    const updateImage = (key, url) => {
        setImages(prev => ({ ...prev, [key]: url }))
    }

    const handleSave = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const isFeatured = formData.get('featured') === 'on'

        if (isFeatured) {
            const currentFeatured = projects.filter(p => p.featured && p.id !== editing.id).length
            if (currentFeatured >= 4) {
                alert('Max 4 featured projects allowed.')
                return
            }
        }

        const projectData = {
            title: formData.get('title'),
            type: formData.get('type'),
            location: formData.get('location'),
            year: formData.get('year'),
            role: formData.get('role'),
            description: formData.get('description'),
            challenge: formData.get('challenge'),
            solution: formData.get('solution'),
            image_url: images.main,
            gallery_vertical: images.vertical,
            gallery_horizontal_1: images.horizontal1,
            gallery_horizontal_2: images.horizontal2,
            gallery_grid_1: images.grid1,
            gallery_grid_2: images.grid2,
            gallery_grid_3: images.grid3,
            featured: isFeatured
        }

        const { error } = editing.id
            ? await supabase.from('projects').update(projectData).eq('id', editing.id)
            : await supabase.from('projects').insert([projectData])

        if (error) alert(error.message)
        else {
            setEditing(null)
            fetchProjects()
        }
    }

    if (loading) return <div className="p-12 text-center">Loading...</div>

    if (editing) {
        return (
            <div className="manager-container">
                <div className="form-header">
                    <h2>{editing.id ? 'Edit Project' : 'New Project'}</h2>
                    <button onClick={() => setEditing(null)} className="btn-cancel"><X size={18} /> Cancel</button>
                </div>

                <form onSubmit={handleSave} className="admin-form redesign">
                    {/* SETTINGS */}
                    <div className="form-section">
                        <h3 className="section-title">01. Settings</h3>
                        <label className="checkbox-card">
                            <input type="checkbox" name="featured" defaultChecked={editing.featured} />
                            <div className="checkbox-info">
                                <span className="cb-title">Feature on Home Page</span>
                                <span className="cb-desc">Display on landing page (Max 4).</span>
                            </div>
                        </label>
                    </div>

                    {/* ESSENTIALS */}
                    <div className="form-section">
                        <h3 className="section-title">02. Essentials</h3>
                        <div className="form-group">
                            <label>Project Title</label>
                            <input name="title" defaultValue={editing.title} required className="input-lg" placeholder="Project Name" />
                        </div>
                        <div className="grid-2">
                            <div className="form-group"><label>Type</label><input name="type" defaultValue={editing.type} required /></div>
                            <div className="form-group"><label>Location</label><input name="location" defaultValue={editing.location} required /></div>
                            <div className="form-group"><label>Year</label><input name="year" defaultValue={editing.year} required /></div>
                            <div className="form-group"><label>Role</label><input name="role" defaultValue={editing.role} required /></div>
                        </div>
                    </div>

                    {/* NARRATIVE */}
                    <div className="form-section">
                        <h3 className="section-title">03. Narrative</h3>
                        <div className="form-group">
                            <label>Short Description (Index)</label>
                            <textarea name="description" defaultValue={editing.description} rows={3} required />
                        </div>
                        <div className="grid-2">
                            <div className="form-group">
                                <label>The Challenge</label>
                                <textarea name="challenge" defaultValue={editing.challenge} rows={5} />
                            </div>
                            <div className="form-group">
                                <label>The Solution</label>
                                <textarea name="solution" defaultValue={editing.solution} rows={5} />
                            </div>
                        </div>
                    </div>

                    {/* MEDIA GALLERY */}
                    <div className="form-section">
                        <h3 className="section-title">04. Media Gallery (6 Slots + Cover)</h3>

                        <div className="media-grid">
                            <div className="media-slot full-width">
                                <label>Main Cover (Hero Image)</label>
                                <ImageUpload onUpload={(u) => updateImage('main', u)} currentImage={images.main} />
                            </div>

                            {/* New Layout Group (3 Images) */}
                            <div className="media-slot">
                                <label>Gallery: Right Vertical</label>
                                <ImageUpload onUpload={(u) => updateImage('vertical', u)} currentImage={images.vertical} />
                            </div>
                            <div className="media-slot">
                                <label>Gallery: Left Top (Horiz)</label>
                                <ImageUpload onUpload={(u) => updateImage('horizontal1', u)} currentImage={images.horizontal1} />
                            </div>
                            <div className="media-slot">
                                <label>Gallery: Left Btm (Horiz)</label>
                                <ImageUpload onUpload={(u) => updateImage('horizontal2', u)} currentImage={images.horizontal2} />
                            </div>

                            {/* Additional Grid (3 Images) */}
                            <div className="media-slot">
                                <label>Extra: Horizontal</label>
                                <ImageUpload onUpload={(u) => updateImage('grid1', u)} currentImage={images.grid1} />
                            </div>
                            <div className="media-slot">
                                <label>Extra: Vertical 1</label>
                                <ImageUpload onUpload={(u) => updateImage('grid2', u)} currentImage={images.grid2} />
                            </div>
                            <div className="media-slot">
                                <label>Extra: Vertical 2</label>
                                <ImageUpload onUpload={(u) => updateImage('grid3', u)} currentImage={images.grid3} />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn-save full-width"><Save size={18} /> Save Project</button>
                </form>
            </div>
        )
    }

    return (
        <div className="manager-container">
            <div className="manager-header">
                <h2>Projects</h2>
                <button onClick={startNew} className="btn-add"><Plus size={18} /> New Project</button>
            </div>
            <div className="table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th width="50"></th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Year</th>
                            <th className="actions-col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.length === 0 ? (
                            <tr><td colSpan={5} className="text-center">No projects found.</td></tr>
                        ) : projects.map(p => (
                            <tr key={p.id}>
                                <td>{p.featured && <span className="badge">Featured</span>}</td>
                                <td>{p.title}</td>
                                <td>{p.type}</td>
                                <td>{p.year}</td>
                                <td className="actions-cell">
                                    <button onClick={() => startEditing(p)} className="btn-icon"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(p.id)} className="btn-icon delete"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProjectsManager
