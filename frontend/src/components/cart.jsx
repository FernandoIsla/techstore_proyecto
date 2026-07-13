import React from 'react';

const Cart = ({ cartCount }) => {
    return (
        <div className="cart-container">
            🛒 Carrito ({cartCount})
        </div>
    );
};

export default Cart;