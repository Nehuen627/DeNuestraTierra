import React from 'react'
import { useState, useEffect } from 'react';
import Modal from './Modal/Modal.js';
import api from '../../axios/api';
// import Cookies from 'js-cookie';
import "./Perfil.css"

const Perfil = () => {
    /* codigo real tachado solo para mostrar el perfil 
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userKey, setUserKey] = useState(null);
    useEffect(() => {
        const checkLoginStatus = () => {
            const token = Cookies.get('authToken');
            if (token) {
                try {
                    const decodedToken = JSON.parse(atob(token.split('.')[1]));
                    setIsLoggedIn(decodedToken.logged);
                    setUserKey(decodedToken.userKey);
                } catch (e) {
                    console.error('Error decoding token:', e);
                    setIsLoggedIn(false);
                    setUserKey(null);
                }
            } else {
                setIsLoggedIn(false);
                setUserKey(null);
            }
        };

        checkLoginStatus();
    }, []);

    useEffect(() => {
        if (isLoggedIn && userKey) {
            const fetchProfileData = async () => {
                try {
                    const response = await api.get(`/api/profile/${userKey}`);
                    setProfile(response.data);
                } catch (err) {
                    console.error("Error fetching profile:", err);
                    setError(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchProfileData();
        } else {
            setLoading(false);
        }
    }, [isLoggedIn, userKey]);

    const handleImageClick = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };


    if (!isLoggedIn) {
        return <div className="notLogged">Por favor, inicia sesión para ver tu perfil.</div>;
    }

    if (loading) return <div className="loader">Cargando...</div>;
    if (error) return <p>Error al cargar el perfil: {error.message}</p>;
    if (!profile) return <p>No se encontró el perfil del usuario.</p>;
 */

    /* Codigo momentaneo para mostrar el perfil */
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
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
    /* fin codigo momentaneo */

    return (
        <div className='perfilContent'>
            <div className='logged'>
                <div className='pBox'>
                    <div className='pPic' onClick={handleImageClick}>
                        <img src={profile.avatarUrl} alt='avatar'></img>
                    </div>
                    <Modal isOpen={isModalOpen} onClose={closeModal} />
                    <div className='pInfo'>
                        <h2>{profile.name}</h2>
                        <h3>{profile.email}</h3>
                        <h3>{profile.role}</h3>
                    </div>
                    <div className='pBtns'>
                        <button>Actualizar información</button>
                        <button>Borrar perfil</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Perfil