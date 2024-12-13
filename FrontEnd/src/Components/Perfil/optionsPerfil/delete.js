import React, { useState } from 'react';
import "./delete.css"
import api from '../../../axios/api.js';
import { useParams } from 'react-router';
const DeleteAccount = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [confirmation, setConfirmation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (confirmation === 'BORRAR') {
            setLoading(true)
            try {
                const response = await api.get('/auth/sessions/deletedUser');
                
                if (response.data.success) {
                    try {
                        const response = await api.delete(`/api/users/delete/${id}`); 
                        alert('Cuenta borrada exitosamente');
                        if (response.data.success) {
                            window.location.href = response.data.redirectUrl;
                        } else {
                            setError(response.data.message);
                        }
                    } catch (err) {
                        setError(err.response?.data?.message || "An error occurred. Please try again.");
                    } finally {
                        setLoading(false);
                    }
                } else {
                    alert('Error al borrar la cuenta');
                }
            } catch (error) {
                console.error('Error deleting account:', error);
                alert('Error al borrar la cuenta');
            }
        } else {
            alert('Debes escribir "BORRAR" para confirmar.');
        }
    };

    if (loading) return <div className="loader"></div>;
        if (error) return (
            <p>{error}</p>
        );

    
    return (
        <div className="deleteAccount">
            <h2>Borrar Cuenta</h2>
            <p>¿Estás seguro de que deseas borrar tu cuenta? Esta acción es irreversible.</p>
            <p>Escribe "BORRAR" en el campo para confirmar:</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                    placeholder="Escribe BORRAR"
                />
                <button type="submit">Borrar Cuenta</button>
            </form>
        </div>
    );
};

export default DeleteAccount;
