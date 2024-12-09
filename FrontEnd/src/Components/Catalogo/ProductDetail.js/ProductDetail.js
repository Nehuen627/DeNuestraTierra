import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../../axios/api.js";
import "./ProductDetail.css";
import { Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/productos/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(err);

      } finally {
        setLoading(false);
    }
    };
    fetchProduct();
  }, [id]);


  const handleAddToCart = async (quantity1) => {
    try {
      const currentUserResponse = await api.get('/auth/sessions/current');
      if (!currentUserResponse.data.success) {
        throw new Error('Please log in to add products to the cart.');
      }
  
      const userId = currentUserResponse.data.user._id;
      const cartResponse = await api.get(`/api/carts/user/${userId}`);

      
      
      const response = await api.post(`/api/carts/${cartResponse.data.id}/producto/${product.id}`, {
        quantity1,
      });
      if (response) {
        window.location.href = "/carrito";
    }
    } catch (err) {
      setError(err);
    }
  };
  
  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value <= product.stock) {
      setQuantity(value);
    }
  };

  if (loading) return <div className="loader"></div>;
  if (error) return (
    <div className="notLogged">
        <p>Inicia sesión para agregar el producto al carrito</p>
        <Link to="/login"><button className='Login'>Iniciar sesión</button></Link>
    </div>
);
  return (
    <div className="productContainer">
      <div className="productDetail">
        <div className="productGallery">
          <img src={product.imgUrl} alt={product.title} className="productImage" />
        </div>
        <div className="productInfo">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <h3>${product.price}</h3>
          
          <div className="starRating">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <span
                  key={index}
                  className="star"
                  style={{
                    color: ratingValue <= product.rating ? "#8e173d" : "#f996b5",
                  }}
                >
                  ★
                </span>
              );
            })}
            <span>({product.rating})</span>
          </div>

          <div className="quantitySection">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={handleQuantityChange}
            />
            <span>Stock: {product.stock}</span>
          </div>

          <button className="addToCart" onClick={() => handleAddToCart(quantity)}>
            Agrega {quantity} al carrito
          </button>


          <div className="fichaTecnica">
            <h4>Ficha Técnica</h4>
            <ul>
              <li><strong>Tipo de uva:</strong> {product.grapeType || "No especificado"}</li>
              <li><strong>Región:</strong> {product.region || "No especificado"}</li>
              <li><strong>Cosecha:</strong> {product.harvestYear || "No especificado"}</li>
              <li><strong>Maridaje:</strong> {product.pairing || "No especificado"}</li>
              <li><strong>Graduación alcohólica:</strong> {product.alcoholContent || "No especificado"}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
