import React, { useState, useEffect } from 'react';
import "./Nosotros.css"
import api from "../../axios/api.js"

const Nosotros = () => {
    const [pictures, setPictures] = useState([]);
    const [text, setText] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchTextData = async () => {
            try {
                const response = await api.get('/api/nosotros/text'); 
                setText(response.data.text); 
            } catch (err) {
                console.error(err);
            } 
        };

        fetchTextData();
    }, []);

    useEffect(() => {
        const fetchPicturesData = async () => {
            try {
                const response = await api.get('/api/nosotros/pictures'); 
                setPictures(response.data); 
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPicturesData();
    }, []);

    const openModal = (imageSrc) => {
        setSelectedImage(imageSrc);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const createVisualizator = pictures.map((pic) => (
        <div key={pic.id} className="imgContainer">
            <img src={pic.url} alt={pic.alt} onClick={() => openModal(pic.url)} />
        </div>
    )); 

    if (loading) return <div className="loader"></div>;

    return (
        <div className='nosotrosContent'>
            <h1>Nuestra Historia</h1>
            <div className='content'>
                <div className='text'>
                    {text}
                </div>
                <h2>Galería:</h2>
                <div className='pictures'>
                    {createVisualizator}
                </div>
            </div>
            {selectedImage && (
                <div className="modal" onClick={closeModal}>
                    <img src={selectedImage} alt="Full size" />
                </div>
            )}
        </div>
    )
}

export default Nosotros