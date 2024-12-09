import React, { useState, useEffect } from 'react';
import api from "../../axios/api";  // This is your axios instance
import "./Carrito.css";
import { Link } from 'react-router-dom';
const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([])
    
    useEffect(() => {
        fetchCart();
    }, []);
   
    const fetchCart = async () => {
        try {
            const currentUserResponse = await api.get('/auth/sessions/current');
            

            if (currentUserResponse.data.success) {
                const userId = currentUserResponse.data.user._id;
                const cartResponse = await api.get(`/api/carts/user/${userId}`);
                setCart(cartResponse.data)
                setCartItems(cartResponse.data.products || []); 
            } else {
                setError(new Error("Not authenticated"));
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // Fake version for testing frontend (mock data)
   /*  useEffect(() => {
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
    }, []); */

    const handleDelete = async (itemId, quantity) => {
        try {
            await api.delete(`/api/carts/${cart.id}/producto/${itemId}/erase`)
            fetchCart()
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
    const handleDelete1 = async (itemId) => {
        try {
            await api.delete(`/api/carts/${cart.id}/producto/${itemId}`)
            fetchCart()
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
    const handleAdd1 = async (itemId) => {
        try {
            await api.post(`/api/carts/${cart.id}/producto/${itemId}`)
            fetchCart()
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleCheckout = () => {
        alert("Proceeding to payment");
    };

    if (loading) return <div className="loader"></div>;
    if (error) return (
        <div className="notLogged">
            <p>Inicia sesión para ver tu carrito</p>
            <Link to="/login"><button className='Login'>Iniciar sesión</button></Link>
        </div>
    );
    let finalBtn = ""
    if (cartItems.length === 0) {
        finalBtn = (<div className='cartSummary'>
                        <Link to="/catalogo"><button className='buyButton'>Explora el catálogo</button></Link>
                    </div> )
    } else {
        finalBtn = (<div className="cartSummary">
                        <h3>Total: ${cart.total_price}</h3>
                        <button className="buyButton" onClick={handleCheckout}>Comprar Ahora</button>
                    </div>)
    }
    
    
    return (
        <div className="cartContainer">
            <h2>Tu Carrito</h2>
            {cartItems.length === 0 ? (
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
                            <button className="deleteButton" onClick={() => handleDelete(item.productId._id, item.quantity)}>Borrar</button>
                            <button className="addButton" onClick={() => handleAdd1(item.productId._id)}>+</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {finalBtn}
        </div>
    );
};

export default Cart;
