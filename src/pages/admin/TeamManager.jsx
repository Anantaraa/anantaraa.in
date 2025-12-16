import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react'

import ImageUpload from '../../components/ImageUpload'

const TeamManager = () => {
    const [team, setTeam] = useState([])
    const [editing, setEditing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [imageUrl, setImageUrl] = useState(null)

    useEffect(() => { fetchTeam() }, [])

    const fetchTeam = async () => {
        setLoading(true)
        const { data } = await supabase.from('team').select('*').order('created_at', { ascending: true })
        setTeam(data || [])
        setLoading(false)
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this member?')) return
        await supabase.from('team').delete().eq('id', id)
        fetchTeam()
    }

    const startEditing = (member) => {
        setEditing(member)
        setImageUrl(member.image_url)
    }

    const startNew = () => {
        setEditing({})
        setImageUrl(null)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const memberData = {
            name: formData.get('name'),
            role: formData.get('role'),
            bio: formData.get('bio'),
            image_url: imageUrl
        }

        if (editing.id) {
            await supabase.from('team').update(memberData).eq('id', editing.id)
        } else {
            await supabase.from('team').insert([memberData])
        }
        setEditing(null)
        fetchTeam()
    }

    if (loading) return <div className="p-4">Loading team...</div>

    if (editing) {
        return (
            <div className="manager-container">
                <div className="form-header">
                    <h2>{editing.id ? 'Edit Member' : 'Add Member'}</h2>
                    <button onClick={() => setEditing(null)} className="btn-cancel"><X size={18} /> Cancel</button>
                </div>
                <form onSubmit={handleSave} className="admin-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input name="name" defaultValue={editing.name} required />
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <input name="role" defaultValue={editing.role} required />
                    </div>
                    <div className="form-group">
                        <label>Bio</label>
                        <textarea name="bio" defaultValue={editing.bio} rows={3} required />
                    </div>

                    <div className="form-group">
                        <label>Profile Image</label>
                        <ImageUpload onUpload={setImageUrl} currentImage={imageUrl || editing.image_url} />
                    </div>

                    <button type="submit" className="btn-save"><Save size={18} /> Save Member</button>
                </form>
            </div>
        )
    }

    return (
        <div className="manager-container">
            <div className="manager-header">
                <h2>Team Manager</h2>
                <button onClick={startNew} className="btn-add"><Plus size={18} /> Add Member</button>
            </div>
            <div className="table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team.map(m => (
                            <tr key={m.id}>
                                <td>{m.name}</td>
                                <td>{m.role}</td>
                                <td className="actions-cell">
                                    <button onClick={() => startEditing(m)} className="btn-icon"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(m.id)} className="btn-icon delete"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{/* Same styles as ProjectsManager, assuming they are scoped or we can duplicate for simplicity in this context */
                `
            .manager-container { color: #1A1A1A; }
            .manager-header, .form-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
            .btn-add, .btn-save { background: #1A1A1A; color: white; border: none; padding: 0.8rem 1.5rem; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
            .btn-cancel { background: transparent; border: 1px solid #ccc; padding: 0.8rem 1.5rem; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
            .admin-table { width: 100%; border-collapse: collapse; background: white; }
            .admin-table th, .admin-table td { padding: 1rem; text-align: left; border-bottom: 1px solid #eee; }
            .btn-icon { background: none; border: none; cursor: pointer; padding: 0.5rem; color: #666; }
            .btn-icon:hover { color: #1A1A1A; }
            .admin-form { background: white; padding: 2rem; max-width: 600px; }
            .form-group { margin-bottom: 1.5rem; }
            .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.9rem; }
            .form-group input, .form-group textarea { width: 100%; padding: 0.8rem; border: 1px solid #ddd; }
            `}</style>
        </div>
    )
}

export default TeamManager
