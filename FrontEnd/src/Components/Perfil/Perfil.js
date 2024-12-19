import React from 'react'
import { useState, useEffect } from 'react';
import Modal from './Modal/Modal.js';
import api from '../../axios/api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import profileImg from "../../Images/Pictures/randomP.png"

import "./Perfil.css"

const Perfil = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const currentUserResponse = await api.get('/auth/sessions/current');
                if(currentUserResponse.data === 'user not found') {
                    setError(new Error("Not authenticated"));
                }else if(currentUserResponse.data.success) {
                    const profileResponse = await api.get('/api/profile');
                    setProfile(profileResponse.data);
                    
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    
    
    const formatDate = (dateString) => {
        if (!dateString) return 'No disponible';
        return new Date(dateString).toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) return <div className="loader"></div>;
    if (error) return (
        <div className="notLogged">
            <p>Inicia sesión para ver tu perfil</p>
            <Link to="/login"><button className='Login'>Iniciar sesión</button></Link>
        </div>
    );
    if (!profile) return <div className="notLogged">No se encontró el perfil.</div>;
    const handleCloseSesion = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.get('/auth/sessions/logout');
            
            if (response.data.success) {
                window.location.href = response.data.redirectUrl;
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    
    const handleUpdate = () => {
        navigate(`/perfil/update/${profile.id}`);
    };

    const handleDeletePerfil = () => {
        navigate(`/perfil/delete/${profile.id}`);
    };
    let buttons = (<></>)
    if(profile.role === "admin"){
        buttons = (
            <div className='pBtns'>
                <Link to={'/dashboard'}><button className='dashboardBtn'>Panel Control</button></Link> 
                <button className='closeBtn' onClick={handleCloseSesion}>Cerrar sesión</button>
            </div>
                );
    } else if (profile.role === "owner") {
        buttons = (
            <div className='pBtns'>
                <button className='updateBtn' onClick={handleUpdate}>Actualizar información</button>
                <Link to={'/dashboard'}><button className='dashboardBtn'>Panel Control</button></Link>
                <button className='closeBtn' onClick={handleCloseSesion}>Cerrar sesión</button>
            </div>
                )
    } else if (profile.role === "user") {
        buttons = (
                    <div className='pBtns'>
                        <button className='updateBtn' onClick={handleUpdate}>Actualizar información</button>
                        <button className='deleteBtn' onClick={handleDeletePerfil}>Borrar perfil</button>
                        <button className='closeBtn'onClick={handleCloseSesion}>Cerrar sesión</button>
                    </div>
        )
    }
    return (
        <div className='perfilContent'>
            <div className='logged'>
                <div className='pBox'>
                    <div className='pPic'>
                        <img src={profileImg} alt='avatar' />
                    </div>
                    <div className='pInfo'>
                        <div className='pInfoSection'>
                            <h2>{profile.name} {profile.lastName}</h2>
                            <p><strong>Email:</strong> {profile.email}</p>
                            <p><strong>Rol:</strong> {profile.role}</p>
                            <p><strong>Provincia:</strong> {profile.province || 'No especificada'}</p>
                            <p><strong>Fecha de nacimiento:</strong> {formatDate(profile.birthDate)}</p>
                            <p><strong>Última conexión:</strong> {formatDate(profile.lastConnection)}</p>
                            <p><strong>Emails informativos:</strong> {profile.informativeEmails ? 'Sí' : 'No'}</p>
                        </div>
                    </div>

                    {buttons}
                </div>
            </div>
        </div>
    );
};

export default Perfil