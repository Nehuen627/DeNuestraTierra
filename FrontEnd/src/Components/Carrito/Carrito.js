import React, { useState, useEffect } from 'react';
import api from "../../axios/api";  // This is your axios instance
import "./Carrito.css";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Uncomment this once you have the real backend ready
    /*
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored here
                if (!token) throw new Error("User not authenticated");

                // Decode token to get the user cart ID
                const { cart } = JSON.parse(atob(token.split('.')[1]));

                // Send token in Authorization header
                const response = await api.get(`/api/cart/${cart}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCartItems(response.data.items);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);
    */

    // Fake version for testing frontend (mock data)
    useEffect(() => {
        const fetchCart = async () => {
            try {
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating loading time
                const mockCart = [
                    { id: 1, title: 'Wine A', quantity: 2, price: 20 },
                    { id: 2, title: 'Wine B', quantity: 1, price: 30 },
                ];
                setCartItems(mockCart);
            } catch (err) {
                setError('Failed to load cart');
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);

    // Delete item from the cart (mock version)
    const handleDelete = async (itemId) => {
        try {
            // Uncomment when using real backend
            /*
            const token = localStorage.getItem('token');
            const { cart } = JSON.parse(atob(token.split('.')[1]));
            await api.delete(`/api/cart/${cart}/item/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            */

            // Fake removal for frontend testing
            setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleCheckout = () => {
        alert("Proceeding to payment");
    };

    if (loading) return <div className="loader"></div>;
    if (error) return <p>{error}</p>;

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="cartContainer">
            <h2>Tu Carrito</h2>
            {cartItems.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <div className="cartItems">
                    {cartItems.map(item => (
                        <div key={item.id} className="cartItem">
                            <span>{item.title}</span>
                            <span>Cantidad: {item.quantity}</span>
                            <span>Precio: ${item.price}</span>
                            <button className="deleteButton" onClick={() => handleDelete(item.id)}>Eliminar</button>
                        </div>
                    ))}
                </div>
            )}
            <div className="cartSummary">
                <h3>Total: ${total}</h3>
                <button className="buyButton" onClick={handleCheckout}>Comprar Ahora</button>
            </div>
        </div>
    );
};

export default Cart;
