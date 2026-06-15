import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router' // Ekdum sahi hai yeh
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("") // Naya state error ke liye

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMsg("") 

        try {
            await handleLogin({ email, password })
            navigate('/') // Sirf success pe navigate hoga
        } catch (err) {
            setErrorMsg(err.message || "Failed to login. Please check your credentials.")
        }
    }

    if (loading) {
        return (<main><h1>Loading.......</h1></main>)
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                
                {/* 🔴 ERROR MESSAGE UI */}
                {errorMsg && (
                    <div style={{
                        backgroundColor: '#fee2e2', 
                        color: '#b91c1c', 
                        padding: '10px', 
                        borderRadius: '6px', 
                        marginBottom: '15px', 
                        border: '1px solid #f87171',
                        fontSize: '14px',
                        fontWeight: '500'
                    }}>
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='Enter email address' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='Enter password' required />
                    </div>
                    <button className='button primary-button' disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
            </div>
        </main>
    )
}

export default Login