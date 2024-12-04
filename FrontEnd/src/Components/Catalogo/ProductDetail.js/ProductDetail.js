import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../../axios/api.js";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/productos/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} of ${product.title} to cart`);
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value <= product.stock) {
      setQuantity(value);
    }
  };

  if (!product) return <div>Loading...</div>;

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

          <button className="addToCart" onClick={handleAddToCart}>
            Add {quantity} to Cart
          </button>

          {/* Ficha Técnica */}
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
