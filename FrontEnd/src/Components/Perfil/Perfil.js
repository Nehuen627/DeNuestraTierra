import React from 'react'
import { useState, useEffect } from 'react';
import Modal from './Modal/Modal.js';
import api from '../../axios/api';
import "./Perfil.css"

const Perfil = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                const response = await api.get('/api/profile'); 
                setProfile(response.data); 
                } catch (err) {
                setError(err);
                } finally {
                setLoading(false);
            }
        };

    fetchProfileData();}, []);


    if (loading) return <div className="loader"></div>;
    if (error) return <p>Error loading profile: {error.message}</p>;

    const handleImageClick = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    return (
        <div className='perfilContent'>
            <div className='pBox'>
                <div className='pPic' onClick={handleImageClick}>
                    <img src={profile.avatarUrl} alt='avatar picture'></img>
                </div>
                <Modal isOpen={isModalOpen} onClose={closeModal} />
                <div className='pInfo'>
                    <h2>{profile.name}</h2>
                    <h3>{profile.email}</h3>
                    
                </div>
                <div className='pBtns'>
                    <button>Actualizar información</button>
                    <button>Borrar perfil</button>
                </div>
            </div>
        </div>
    )
}

export default Perfil