import React from 'react';
import { Heart } from 'lucide-react';

const ProductCard = ({ producto, onAddToCart, isFavorite, onToggleFavorite }) => {
    return (
        <div className="product-card">
            <button 
                type="button" 
                className={`btn-favorite ${isFavorite ? 'active' : ''}`}
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(producto.id);
                }}
                title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
                <Heart size={18} fill={isFavorite ? "var(--accent-purple-bright)" : "transparent"} />
            </button>
            <img src={producto.imagen} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <div className="rating">{producto.valoracion}</div>
            <p className="price">${producto.precio.toLocaleString('es-CL')}</p>
            <button type="button" onClick={() => onAddToCart(producto)} className="btn-add-cart">
                Agregar al carrito
            </button>
        </div>
    );
};

export default ProductCard;