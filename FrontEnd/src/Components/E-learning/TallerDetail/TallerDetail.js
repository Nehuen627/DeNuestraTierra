import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../../axios/api.js";
import "./TallerDetail.css";
import { Link } from 'react-router-dom';
const TallerDetail = () => {
  const { id } = useParams(); 
  const [taller, setTaller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTaller = async () => {
      try {
        const response = await api.get(`/api/talleres/${id}`);
        setTaller(response.data);
      } catch (error) {
      } finally {
        setLoading(false)
      }
    };
    fetchTaller();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const currentUserResponse = await api.get('/auth/sessions/current');
      if (!currentUserResponse.data.success) {
        throw new Error('Please log in to add products to the cart.');
      }
  
      const userId = currentUserResponse.data.user._id;
      const cartResponse = await api.get(`/api/carts/user/${userId}`);

      
      
      const response = await api.post(`/api/carts/${cartResponse.data.id}/taller/${taller.id}`);
      if (response) {
        window.location.href = "/carrito";
    }
    } catch (err) {
      setError(err);
    }
  };
  

  if(loading) return <div className="loader"></div>;
    if (error) return (
      <div className="notLogged">
          <p>Inicia sesión para agregar el producto al carrito</p>
          <Link to="/login"><button className='Login'>Iniciar sesión</button></Link>
      </div>
  );
  return (
    <div className="tallerDetailContainer">
      <div className="tallerDetail">
        <div className="tallerGallery">
          <img src={taller.imgUrl} alt={taller.title} className="tallerImage" />
        </div>
        <div className="tallerInfo">
          <h2>{taller.title}</h2>
          <p>{taller.description}</p>
          <h3>${taller.price}</h3>
          <div className="skillsSection">
            <h4>Habilidades del curso:</h4>
            <ul>
              {taller.skills?.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <button className="buyNow" onClick={handleAddToCart}>
            agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default TallerDetail;
