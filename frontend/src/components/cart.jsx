import React from 'react';

const Cart = ({ cartCount, onOpenCart }) => {
    return (
        <div className="cart-container" onClick={onOpenCart} style={{ cursor: 'pointer' }}>
            🛒 Carrito ({cartCount})
        </div>
    );
};

export default Cart;