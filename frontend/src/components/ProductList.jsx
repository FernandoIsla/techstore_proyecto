import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ productos, onAddToCart, favorites = [], onToggleFavorite }) => {
    if (productos.length === 0) {
        return <p className="no-results">No se encontraron productos coincidentes.</p>;
    }

    return (
        <div className="product-grid">
            {productos.map((prod) => (
                <ProductCard 
                    key={prod.id} 
                    producto={prod} 
                    onAddToCart={onAddToCart} 
                    isFavorite={favorites.includes(prod.id)}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    );
};

export default ProductList;