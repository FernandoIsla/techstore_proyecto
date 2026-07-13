import React, { useState } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Banner from './components/banner';
import ProductList from './components/ProductList';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import productosData from './data/productos.json';
import './App.css';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  const filteredProducts = productosData.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <Header
        cartCount={cartCount}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Navbar />
      <Banner />

      <main className="main-content">
        <section className="catalog">
          <h2>Productos Destacados</h2>
          <ProductList
            productos={filteredProducts}
            onAddToCart={handleAddToCart}
          />
        </section>
        <Sidebar />
      </main>

      <Footer />
    </div>
  );
}

export default App;
