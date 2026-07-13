import React, { useState } from 'react';

const CartModal = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) => {
    if (!isOpen) return null;

    const [isSuccess, setIsSuccess] = useState(false);

    const total = cartItems.reduce((acc, item) => acc + (item.precio * item.quantity), 0);

    const handleCheckout = () => {
        if (cartItems.length === 0) return;
        setIsSuccess(true);
        onClearCart();
    };

    const handleClose = () => {
        setIsSuccess(false);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content cart-modal-width" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="btn-close-modal" onClick={handleClose}>&times;</button>
                
                {isSuccess ? (
                    <div className="checkout-success-container">
                        <div className="checkout-success-icon">📦</div>
                        <h2>¡Compra Realizada con Éxito!</h2>
                        <p style={{ marginTop: '15px', color: 'var(--text-gray-muted)' }}>
                            Muchas gracias por tu compra. Te enviaremos un correo electrónico con el número de seguimiento de tu despacho.
                        </p>
                        <button type="button" className="btn-submit" style={{ marginTop: '25px', width: 'auto', padding: '10px 30px' }} onClick={handleClose}>
                            Seguir Comprando
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 style={{ marginBottom: '20px', color: 'var(--text-white)' }}>Tu Carrito</h2>
                        
                        {cartItems.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🛒</div>
                                <p style={{ color: 'var(--text-gray-muted)' }}>Tu carrito está vacío.</p>
                                <button type="button" className="btn-submit" style={{ marginTop: '20px', width: 'auto', padding: '10px 30px' }} onClick={handleClose}>
                                    Volver a la tienda
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="cart-items-list">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="cart-item-row">
                                            <img src={item.imagen} alt={item.nombre} />
                                            <div className="cart-item-info">
                                                <h4>{item.nombre}</h4>
                                                <p>${item.precio.toLocaleString('es-CL')}</p>
                                            </div>
                                            <div className="cart-item-qty">
                                                <button 
                                                    type="button" 
                                                    className="btn-qty"
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    -
                                                </button>
                                                <span style={{ color: 'var(--text-white)', fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>
                                                    {item.quantity}
                                                </span>
                                                <button 
                                                    type="button" 
                                                    className="btn-qty"
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button 
                                                type="button" 
                                                className="btn-remove-item"
                                                onClick={() => onRemoveItem(item.id)}
                                                title="Eliminar producto"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="cart-total-section">
                                    <span>Total:</span>
                                    <span style={{ color: 'var(--accent-cyan)' }}>
                                        ${total.toLocaleString('es-CL')}
                                    </span>
                                </div>
                                
                                <button 
                                    type="button" 
                                    className="btn-submit"
                                    onClick={handleCheckout}
                                >
                                    Finalizar Compra
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default CartModal;
