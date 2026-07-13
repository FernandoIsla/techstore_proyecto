import React from 'react';
import SearchBar from './Searchbar';
import Cart from './cart';

const Header = ({ cartCount, searchTerm, setSearchTerm }) => {
    return (
        <header className="top-header">
            <div className="top-bar-info">
                <span>Envíos a todo Chile</span> | <span>Compra segura</span> | <span>Soporte 24/7</span>
            </div>
            <div className="main-header">
                <div className="logo">🛒 TechStore Chile</div>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <div className="header-actions">
                    <button type="button" className="btn-auth">Iniciar Sesión</button>
                    <button type="button" className="btn-auth">Registrarse</button>
                    <Cart cartCount={cartCount} />
                </div>
            </div>
        </header>
    );
};

export default Header;