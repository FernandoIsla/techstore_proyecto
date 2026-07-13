import React from 'react';
import SearchBar from './Searchbar';
import Cart from './cart';

const Header = ({ cartCount, searchTerm, setSearchTerm, user, onLogout, onOpenLogin, onOpenRegister, onOpenCart, theme, onToggleTheme }) => {
    return (
        <header className="top-header">
            <div className="top-bar-info">
                <div className="top-bar-left">
                    <span>Envíos a todo Chile</span> | <span>Compra segura</span> | <span>Soporte 24/7</span>
                </div>
                <div className="top-bar-right">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        </svg>
                    </a>
                </div>
            </div>
            <div className="main-header">
                <div className="logo">🛒 TechStore Chile</div>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <div className="header-actions">
                    <button 
                        type="button" 
                        className="btn-theme-toggle" 
                        onClick={onToggleTheme}
                        title={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                    {user ? (
                        <>
                            <span style={{ marginRight: '10px', color: 'var(--text-white)', fontWeight: '600', fontSize: '0.9rem' }}>
                                Hola, {user.username}
                            </span>
                            <button type="button" className="btn-auth" onClick={onLogout}>Cerrar Sesión</button>
                        </>
                    ) : (
                        <>
                            <button type="button" className="btn-auth" onClick={onOpenLogin}>Iniciar Sesión</button>
                            <button type="button" className="btn-auth" onClick={onOpenRegister}>Registrarse</button>
                        </>
                    )}
                    <Cart cartCount={cartCount} onOpenCart={onOpenCart} />
                </div>
            </div>
        </header>
    );
};

export default Header;