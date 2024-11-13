import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../../axios/api.js";
import "./TallerDetail.css";

const TallerDetail = () => {
  const { id } = useParams(); 
  const [taller, setTaller] = useState(null);
  const [isInCart, setIsInCart] = useState(false); // State to track if the item is added to cart

  useEffect(() => {
    const fetchTaller = async () => {
      try {
        const response = await api.get(`/api/talleres/${id}`);
        setTaller(response.data);
      } catch (error) {
        console.error('Error fetching taller:', error);
      }
    };
    fetchTaller();
  }, [id]);

  // Function to handle adding to cart
  const addToCart = () => {
    if (!isInCart) {
      setIsInCart(true);
      console.log(`${taller.Title} has been added to your cart.`);
    } else {
      console.log(`${taller.Title} is already in your cart.`);
    }
  };

  if (!taller) return <div>Loading...</div>;

  return (
    <div className="tallerDetailContainer">
      <div className="tallerDetail">
        <div className="tallerGallery">
          <img src={taller.ImgUrl} alt={taller.Title} className="tallerImage" />
        </div>
        <div className="tallerInfo">
          <h2>{taller.Title}</h2>
          <p>{taller.Description}</p>
          <h3>${taller.Price}</h3>
          
          {/* Skills Section */}
          <div className="skillsSection">
            <h4>Skills Gained:</h4>
            <ul>
              {taller.Skills?.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          {/* Add to Cart Button */}
          <button className="buyNow" onClick={addToCart}>
            {isInCart ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TallerDetail;
