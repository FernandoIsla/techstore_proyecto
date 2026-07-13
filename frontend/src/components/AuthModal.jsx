import React, { useState } from 'react';

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
    if (!isOpen) return null;

    const [activeTab, setActiveTab] = useState('login');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleRegister = (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        if (!email || !username || !password || !confirmPassword) {
            setMessage({ text: 'Todos los campos son obligatorios.', type: 'error' });
            return;
        }

        if (password !== confirmPassword) {
            setMessage({ text: 'Las contraseñas no coinciden.', type: 'error' });
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem('techstore_users') || '[]');
        
        if (existingUsers.some(u => u.email === email)) {
            setMessage({ text: 'Este correo electrónico ya está registrado.', type: 'error' });
            return;
        }

        const newUser = { username, email, password };
        existingUsers.push(newUser);
        localStorage.setItem('techstore_users', JSON.stringify(existingUsers));

        setMessage({ text: '¡Registro exitoso! Ya puedes iniciar sesión.', type: 'success' });
        
        setTimeout(() => {
            setActiveTab('login');
            setEmail(email);
            setPassword('');
            setConfirmPassword('');
            setUsername('');
            setMessage({ text: '', type: '' });
        }, 1500);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        if (!email || !password) {
            setMessage({ text: 'Por favor, rellena todos los campos.', type: 'error' });
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem('techstore_users') || '[]');
        const user = existingUsers.find(u => u.email === email && u.password === password);

        if (!user) {
            setMessage({ text: 'Correo o contraseña incorrectos.', type: 'error' });
            return;
        }

        setMessage({ text: '¡Sesión iniciada con éxito!', type: 'success' });
        
        setTimeout(() => {
            onLoginSuccess(user);
            onClose();
        }, 1000);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="btn-close-modal" onClick={onClose}>&times;</button>
                
                <div className="auth-tabs">
                    <button 
                        type="button" 
                        className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('login'); setMessage({ text: '', type: '' }); }}
                    >
                        Iniciar Sesión
                    </button>
                    <button 
                        type="button" 
                        className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('register'); setMessage({ text: '', type: '' }); }}
                    >
                        Registrarse
                    </button>
                </div>

                {message.text && (
                    <div className={`auth-message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                {activeTab === 'login' ? (
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="login-email">Correo Electrónico</label>
                            <input 
                                type="email" 
                                id="login-email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-password">Contraseña</label>
                            <input 
                                type="password" 
                                id="login-password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required
                            />
                        </div>
                        <button type="submit" className="btn-submit">Ingresar</button>
                    </form>
                ) : (
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <label htmlFor="reg-username">Nombre de Usuario</label>
                            <input 
                                type="text" 
                                id="reg-username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reg-email">Correo Electrónico</label>
                            <input 
                                type="email" 
                                id="reg-email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reg-password">Contraseña</label>
                            <input 
                                type="password" 
                                id="reg-password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reg-confirm">Confirmar Contraseña</label>
                            <input 
                                type="password" 
                                id="reg-confirm" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required
                            />
                        </div>
                        <button type="submit" className="btn-submit">Crear Cuenta</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AuthModal;
