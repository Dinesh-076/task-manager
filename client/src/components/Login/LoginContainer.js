import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginContainer.css';

function LoginContainer() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Reset error message
        setError('');

        try {
            const response = await fetch('https://task-manager-nfd8.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const { token } = await response.json();
                localStorage.setItem('token', token);
                navigate('/home');
            } else {
                const { error } = await response.json();
                setError(error);
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred. Please try again.');
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = 'https://task-manager-nfd8.onrender.com/auth/google';
    };

    return (
        <div className='_login_container_'>
            <h1>Login</h1>
            <div className='login-container__'>
                <form onSubmit={handleLogin}>
                    <div className='login__'>
                        <input
                            type="text"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <div className="error-message">{error}</div>}
                        <button className="btn-login__" type="submit">Login</button>
                    </div>
                </form>
                <div className='signup__'>
                    <span>Don't have an account?</span>
                    <Link to='/register'>Signup</Link>
                </div>
                <button className="btn-google" onClick={handleGoogleLogin}>Login with Google</button>
            </div>
        </div>
    );
}

export default LoginContainer;
