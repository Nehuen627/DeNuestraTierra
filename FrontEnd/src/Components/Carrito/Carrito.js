import React, { useState, useEffect } from 'react';
import api from "../../axios/api"; 
import "./Carrito.css";
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [tallerItems, setTallerItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);
    const [isCheckout, setIsCheckout] = useState(false); // Add this state for toggling views

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const currentUserResponse = await api.get('/auth/sessions/current');

            if (currentUserResponse.data.success) {
                const userId = currentUserResponse.data.user._id;
                const cartResponse = await api.get(`/api/carts/user/${userId}`);
                console.log(cartResponse.data);
                
                setCart(cartResponse.data);
                setCartItems(cartResponse.data.products || []);
                setTallerItems(cartResponse.data.talleres || []);
            } else {
                setError(new Error("Not authenticated"));
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await api.delete(`/api/carts/${cart.id}/producto/${productId}/erase`);
            fetchCart();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleDeleteTaller = async (tallerId) => {
        try {
            await api.delete(`/api/carts/${cart.id}/taller/${tallerId}`);
            fetchCart();
        } catch (error) {
            console.error('Error deleting taller:', error);
        }
    };

    const handleAddProduct = async (productId) => {
        try {
            await api.post(`/api/carts/${cart.id}/producto/${productId}`);
            fetchCart();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleDelete1 = async (itemId) => {
        try {
            await api.delete(`/api/carts/${cart.id}/producto/${itemId}`);
            fetchCart();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleCheckout = () => {
        setIsCheckout(true); 
    };

    if (loading) return <div className="loader"></div>;
    if (error) return (
        <div className="notLogged">
            <p>Inicia sesión para ver tu carrito</p>
            <Link to="/login"><button className='Login'>Iniciar sesión</button></Link>
        </div>
    );

    if (isCheckout) {
        return (
            <div className="checkoutMessage">
                <h2>El proceso de compra está en mantenimiento</h2>
                <p>Disculpe las molestias ocasionadas, el sistema de compra todavía está bajo mantenimiento.</p>
                <p><strong>Si desea comprar sus productos, contáctese por teléfono para comprarlo en la tienda.</strong></p>
                <button onClick={() => setIsCheckout(false)}>Regresar al carrito</button>
            </div>
        );
    }

    return (
        <div className="cartContainer">
            <h2>Tu Carrito</h2>
            {cartItems.length === 0 && tallerItems.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <div className="cartItems">
                    {cartItems.map(item => (
                        <div key={item.productId._id} className="cartItem">
                            <span>{item.productId.title}</span>
                            <span>Cantidad: {item.quantity}</span>
                            <span>Precio: ${item.productId.price}</span>
                            <div className='buttons'>
                                <button className="minusButton" onClick={() => handleDelete1(item.productId._id)}>-</button>
                                <button className="deleteButton" onClick={() => handleDeleteProduct(item.productId._id)}>Borrar</button>
                                <button className="addButton" onClick={() => handleAddProduct(item.productId._id)}>+</button>
                            </div>
                        </div>
                    ))}
                    {tallerItems.map(taller => (
                        <div key={taller.tallerId._id} className="cartItem">
                            <span>{taller.tallerId.title}</span>
                            <span>Precio: ${taller.tallerId.price}</span>
                            <div className='buttons'>
                                <button className="deleteButton" onClick={() => handleDeleteTaller(taller.tallerId._id)}>Borrar</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="cartSummary">
                <h3>Total: ${cart.total_price}</h3>
                <button className="buyButton" onClick={handleCheckout}>Comprar Ahora</button>
            </div>
        </div>
    );
};

export default Cart;
