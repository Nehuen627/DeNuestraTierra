import React, { useState } from 'react';
import "./Login.css";
import api from '../../../axios/api';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);


        try {
            const response = await api.post('/api/user/login', { email, password });
            if (response.data.success) {
                console.log("Login successful");
            } else {
                setError("Invalid credentials");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='loginContent'>
            <form onSubmit={handleSubmit}>
                <label>Mail:</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Escribe tu mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <label>Contraseña:</label>
                <input
                    type="password"
                    name="password"
                    placeholder='Escribe tu contraseña'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? <div className="loader"></div> : "Login"}
                </button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Login;
