import React from 'react'
import { Send } from 'react-bootstrap-icons'
import "./Contacto.css"
import api from '../../axios/api';
import { useState } from 'react';

const Contacto = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [statusType, setStatusType] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setLoading(true);
        setStatus('');
        
        try {
            const response = await api.post('/api/sendEmail', {
                to: 'contacto@vinosdenuestratierra.com.ar', 
                subject: `Mensaje de ${formData.name}`, 
                text: formData.message, 
                html: `<p>${formData.message}</p>`, 
            });
            setStatus('Mensaje enviado correctamente!');
            setStatusType("success")
            setFormData({ email: '', name: '', message: '' });
        } catch (error) {
            console.error('Error sending email:', error);
            setStatusType('error');
            setStatus('Error al enviar el mail!');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className='contactoContent'>
            <div className='topBlock'>
                <h1>Contáctenos</h1>
                <h3>Nos puedes contactar mediante las siguientes formas:</h3>
            </div>
            <div className='contentBlock'>
                <div className='form'>
                    <form onSubmit={handleSubmit}>
                        <div className='personalInfo'>
                            <div className='emailInfo'>
                                <h2>Email:</h2>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder='Escribe tu email...'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='nameInfo'>
                                <h2>Nombre:</h2>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder='Escribe tu nombre...'
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className='messageInfo'>
                            <div className='messageArea'>
                                <h2>Mensaje:</h2>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    placeholder='Escribe tu mensaje...'
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <div className='sendBtn'>
                                <button type="submit">
                                    {loading ? <div className="loaderBtn"></div> : <Send />}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='infoManual'>
                    <div className='infoTop'>
                        <h3>Mail</h3>
                        <p>contacto@vinosdenuestratierra.com.ar</p>
                    </div>
                    <div className='infoMiddle'>
                        <h3>Teléfono</h3>
                        <p>2944237579</p>
                    </div>
                    <div className='infoBottom'>
                        <h3>Ubicación</h3>
                        <p>San Carlos de Bariloche</p>
                    </div>
                </div>
            </div>
            {status && (
                <div className={`notification ${statusType}`}>
                    {status}
                </div>
            )}
        </div>
    );
}

export default Contacto;
