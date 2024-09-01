import React from 'react'
import { useState, useEffect } from 'react';
import api from '../../axios/api';
import TallerSee from './TallerSee/TallerSee';
import './E-learning.css'

const Elearning = () => {
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const fetchCursosData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const response = await api.get('/api/cursos'); 
                setCursos(response.data); 
                } catch (err) {
                setError(err);
                } finally {
                setLoading(false);
            }
        };

    fetchCursosData();}, []);

    const createVisualizator = cursos.map((curso) => (
        <TallerSee
            key={curso.Id}
            Title={curso.Title}
            Id={curso.Id}
            Description={curso.Description}
            Price={curso.Price}
            Img={curso.ImgUrl}
        />
    )); 
    if (loading) return <div className="loader"></div>;
    if (error) return <p>Error loading cursos: {error.message}</p>;

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
    )
}

export default Elearning