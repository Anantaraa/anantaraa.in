import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Upload, X } from 'lucide-react'

const ImageUpload = ({ onUpload, currentImage }) => {
    const [uploading, setUploading] = useState(false)
    const [preview, setPreview] = useState(currentImage)

    const handleFileChange = async (e) => {
        try {
            setUploading(true)
            const file = e.target.files[0]
            if (!file) return

            // Create unique file name
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
            const filePath = `${fileName}`

            // Upload
            const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file)
            if (uploadError) throw uploadError

            // Get URL
            const { data } = supabase.storage.from('images').getPublicUrl(filePath)

            setPreview(data.publicUrl)
            onUpload(data.publicUrl)

        } catch (error) {
            alert('Error uploading image: ' + error.message)
        } finally {
            setUploading(false)
        }
    }

    const clearImage = () => {
        setPreview(null)
        onUpload(null)
    }

    return (
        <div className="image-upload-container">
            {preview ? (
                <div className="image-preview">
                    <img src={preview} alt="Preview" />
                    <button type="button" onClick={clearImage} className="btn-remove">
                        <X size={14} />
                    </button>
                </div>
            ) : (
                <div className="upload-box">
                    <label className="upload-btn">
                        {uploading ? 'Uploading...' : (
                            <>
                                <Upload size={18} />
                                <span>Upload Image</span>
                            </>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={uploading}
                            style={{ display: 'none' }}
                        />
                    </label>
                </div>
            )}

            <style>{`
                .image-upload-container {
                    margin-top: 0.5rem;
                }
                .upload-box {
                    border: 1px dashed #ccc;
                    padding: 1rem;
                    text-align: center;
                    border-radius: 4px;
                    background: #fafafa;
                }
                .upload-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    cursor: pointer;
                    color: var(--text-muted);
                    font-size: 0.9rem;
                }
                .image-preview {
                    position: relative;
                    width: 150px;
                    height: 100px;
                    overflow: hidden;
                    border-radius: 4px;
                    border: 1px solid #eee;
                }
                .image-preview img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .btn-remove {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    background: white;
                    border: none;
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    color: crimson;
                }
            `}</style>
        </div>
    )
}

export default ImageUpload
