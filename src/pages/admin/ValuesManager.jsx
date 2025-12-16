import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react'

const ValuesManager = () => {
    const [values, setValues] = useState([])
    const [editing, setEditing] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => { fetchValues() }, [])

    const fetchValues = async () => {
        setLoading(true)
        const { data } = await supabase.from('values').select('*').order('display_order', { ascending: true })
        setValues(data || [])
        setLoading(false)
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this value?')) return
        await supabase.from('values').delete().eq('id', id)
        fetchValues()
    }

    const handleSave = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const valData = {
            title: formData.get('title'),
            description: formData.get('description'),
            display_order: parseInt(formData.get('display_order'))
        }

        if (editing.id) {
            await supabase.from('values').update(valData).eq('id', editing.id)
        } else {
            await supabase.from('values').insert([valData])
        }
        setEditing(null)
        fetchValues()
    }

    if (loading) return <div className="p-4">Loading values...</div>

    if (editing) {
        return (
            <div className="manager-container">
                <div className="form-header">
                    <h2>{editing.id ? 'Edit Value' : 'Add Value'}</h2>
                    <button onClick={() => setEditing(null)} className="btn-cancel"><X size={18} /> Cancel</button>
                </div>
                <form onSubmit={handleSave} className="admin-form">
                    <div className="form-group">
                        <label>Title</label>
                        <input name="title" defaultValue={editing.title} required />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" defaultValue={editing.description} rows={4} required />
                    </div>
                    <div className="form-group">
                        <label>Order (1-4)</label>
                        <input name="display_order" type="number" defaultValue={editing.display_order} required />
                    </div>
                    <button type="submit" className="btn-save"><Save size={18} /> Save Value</button>
                </form>
            </div>
        )
    }

    return (
        <div className="manager-container">
            <div className="manager-header">
                <h2>Values Manager</h2>
                <button onClick={() => setEditing({})} className="btn-add"><Plus size={18} /> Add Value</button>
            </div>
            <div className="table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Order</th>
                            <th>Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {values.map(v => (
                            <tr key={v.id}>
                                <td>{v.display_order}</td>
                                <td>{v.title}</td>
                                <td className="actions-cell">
                                    <button onClick={() => setEditing(v)} className="btn-icon"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(v.id)} className="btn-icon delete"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{/* Reusing styles */
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

export default ValuesManager
