import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
        } else {
            navigate('/admin/dashboard')
        }
        setLoading(false)
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Anantaraa Admin</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="error">{error}</div>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
            </div>
            <style>{`
        .login-container {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F5F5F0;
        }
        .login-box {
          background: white;
          padding: 3rem;
          width: 100%;
          max-width: 400px;
          border: 1px solid #E0E0E0;
        }
        h1 { margin-bottom: 2rem; text-align: center; }
        .form-group { margin-bottom: 1.5rem; }
        label { display: block; margin-bottom: 0.5rem; font-size: 0.8rem; text-transform: uppercase; }
        input { width: 100%; padding: 0.8rem; border: 1px solid #ddd; font-family: inherit; }
        button { 
          width: 100%; 
          padding: 1rem; 
          background: #1A1A1A; 
          color: white; 
          border: none; 
          text-transform: uppercase; 
          cursor: pointer; 
        }
        .error { color: red; margin-bottom: 1rem; font-size: 0.9rem; }
      `}</style>
        </div>
    )
}

export default Login
