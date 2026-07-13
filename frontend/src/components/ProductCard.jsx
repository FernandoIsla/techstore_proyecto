import React from 'react';

const ProductCard = ({ producto, onAddToCart }) => {
    return (
        <div className="product-card">
            <img src={producto.imagen} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <div className="rating">{producto.valoracion}</div>
            <p className="price">${producto.precio.toLocaleString('es-CL')}</p>
            <button type="button" onClick={onAddToCart} className="btn-add-cart">
                Agregar al carrito
            </button>
        </div>
    );
};

export default ProductCard;