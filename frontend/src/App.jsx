import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Banner from './components/banner';
import ProductList from './components/ProductList';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import CartModal from './components/CartModal';

import productosData from './data/productos.json';
import './App.css';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('techstore_logged_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('default');
  
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('techstore_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [toast, setToast] = useState('');

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('techstore_theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('techstore_theme', theme);
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setToast(`¡${product.nombre} agregado al carrito!`);
  };

  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('techstore_logged_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('techstore_logged_user');
  };

  const handleToggleFavorite = (productId) => {
    setFavorites((prevFavs) => {
      const updated = prevFavs.includes(productId)
        ? prevFavs.filter((id) => id !== productId)
        : [...prevFavs, productId];
      localStorage.setItem('techstore_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const getProductCategory = (nombre) => {
    if (nombre.includes('Notebook')) return 'Notebooks';
    if (nombre.includes('iPhone')) return 'Smartphones';
    if (nombre.includes('Monitor')) return 'Monitores';
    return 'Accesorios';
  };

  let filteredProducts = productosData.filter((producto) => {
    const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'Todos') return matchesSearch;
    if (selectedCategory === 'Favoritos') {
      return matchesSearch && favorites.includes(producto.id);
    }
    return matchesSearch && getProductCategory(producto.nombre) === selectedCategory;
  });

  if (sortBy === 'price-asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.precio - b.precio);
  } else if (sortBy === 'price-desc') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.precio - a.precio);
  }

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleToggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app-container">
      <Header
        cartCount={cartCount}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        user={user}
        onLogout={handleLogout}
        onOpenLogin={() => setIsAuthOpen(true)}
        onOpenRegister={() => setIsAuthOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
      <Navbar />
      <Banner />

      <main className="main-content">
        <section className="catalog">
          <div className="catalog-header">
            <h2>Productos Destacados</h2>
            <div className="sort-container">
              <label htmlFor="sort-select">Ordenar por:</label>
              <select 
                id="sort-select" 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-dropdown"
              >
                <option value="default">Relevancia</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>

          <div className="categories-bar">
            {["Todos", "Notebooks", "Smartphones", "Monitores", "Accesorios", "Favoritos"].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'Favoritos' ? `❤️ ${cat} (${favorites.length})` : cat}
              </button>
            ))}
          </div>

          <ProductList
            productos={filteredProducts}
            onAddToCart={handleAddToCart}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </section>
        <Sidebar />
      </main>

      <Footer />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {toast && (
        <div className="toast-notification">
          <span className="toast-icon">✨</span>
          <span className="toast-text">{toast}</span>
        </div>
      )}
    </div>
  );
}

export default App;
