import React, { useState, useEffect } from 'react';
import api from '../../axios/api';
import TallerSee from './TallerSee/TallerSee';
import './E-learning.css';

const Elearning = () => {
    const [talleres, settalleres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch talleres data on component mount
    useEffect(() => {
        const fetchtalleresData = async () => {
            try {
                const response = await api.get('/api/talleres');
                settalleres(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchtalleresData();
    }, []);
    
    // Map talleres to display
    const createVisualizator = talleres.map((curso) => (
        <TallerSee
            key={curso.Id}
            Title={curso.title}
            Id={curso.id}
            Price={curso.price}
            Skills={curso.skills}
            Img={curso.imgUrl}
        />
    ));

    if (loading) return <div className="loader"></div>;
    if (error) return <p>Error loading talleres: {error.message}</p>;

    return (
        <div className='elearningContent'>
            <div className='topBlock'>
                <h1>Explora Nuestros Talleres</h1>
                <h3>Contamos con una serie de talleres online con los que podrás capacitarte y adentrarte en este mundo de una forma más aficionada</h3>
            </div>
            <div className='contentPlace'>
                {createVisualizator}
            </div>
        </div>
    );
};

export default Elearning;
