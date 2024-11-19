import React from 'react'
import Logo from '../../Images/Logo.png'
import mpLogo from '../../Images/MPLogo.webp'
import ppLogo from '../../Images/PaypalLogo.png'
import './Home.css'
import { GeoAltFill,  BoxFill } from 
'react-bootstrap-icons'
import { useEffect, useState } from 'react'
import bg from "../../Images/bgLayered.svg"
import ProductoSee from '../Catalogo/ProductoSee/ProductSee'
import api from '../../axios/api'


const Home = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await api.get('/api/productos', {
                    params: {
                        rating: 5,
                    }
                });

                
                setProductos(response.data.productos);
            } catch (err) {
                setError(err);
            }
        };
    
        fetchProductos();
    }, []);
    
    
    const top3 = productos.slice(0, 3)
    
    const sortedTop3 = top3.sort((a, b) => b.Rating - a.Rating);
    
    const createVisualizator = sortedTop3.map((producto) => (
        <ProductoSee
            key={producto.id}
            Title={producto.title}
            Id={producto.id}
            Price={producto.price}
            Img={producto.imgUrl}
            Rating={producto.rating}
        />
    ));


    useEffect(() => {

        document.body.style.background = `url(${bg}) `;
        document.body.style.backgroundSize = 'cover';
    
        return () => {
            document.body.style.background = '';
            document.body.style.backgroundSize = '';
        };
    }, []); 

    return (
        <div className='homeContent'>
            <div className='landingSection'>
                <div className='logoBox'>
                    <img src={Logo} alt="Logo copa" className='logoImg'></img>
                </div>
                <h2 className='title title1'>De Nuestra </h2>
                <h2 className='title title2'>Tierra</h2>
                <div className='phraseContent'>
                    <h2>De la tierra a</h2>
                    <h2>tus manos</h2>
                </div>
            </div>
            <div className='presentationBox'>
                <h1>¡Bienvenido/a, amante del vino! Sumérgete en una experiencia enológica única</h1>
                <h3>Explora nuestra vinoteca, donde cada botella cuenta una historia y cada etiqueta es una promesa de calidad.</h3>
                <p>En "De Nuestra Tierra", nos dedicamos a acompañarte en cada sorbo, asegurando que disfrutes al máximo cada copa y que el viñedo se transmita de una forma única. Nos especializamos en degustaciones, capacitaciones, tour de vinos y eventos, entre muchas otras experiencias.
                Queremos que cada vez que descorches un vino, lo hagas con una sonrisa desde el primer sorbo hasta el último. Disfruta de la experiencia ¡Salud!</p>
            </div>
            <div className='productsBox'>
                <div className='topProducts'>
                    <h3>Productos mejores valorados:</h3>
                    <div className='prod'>
                        {createVisualizator}
                    </div>
                </div>
                <div className='productsUrls'>
                    <div>
                        
                        <a href='/Catalogo'>
                            <BoxFill className='icon'/>
                            <h3>Catálogo Completo</h3>
                        </a>
                    </div>
                </div>

            </div>
            <div className='talleresBox'>
                <a href='/Talleres'><h2>Talleres online</h2></a>
                <p>Contamos con una serie de talleres que puedes completar para capacitarse y perfeccionarse, desde conocimientos básicos hasta algunos más complejos.
                Los mismos son ideales para los principiantes que se están adentrando en este mundo, hasta los profesionales que quieren afinar sus conocimientos en específico
                </p>
            </div>
            <div className='locationBox'>
                
                <h2>Encuentranos en:</h2>
                <div className='locationContent'>
                    <div className='textLocation'>
                        <GeoAltFill className='pin'/>
                        <h3>San Carlos de Bariloche</h3>
                        <h3>Onelli 556 local 10</h3>
                    </div>
                    <div className='map'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d216.97625109826558!2d-71.29755969408036!3d-41.1385909596971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x961a7b667155570d%3A0x39111efd991a8eda!2sOnelli%20556%2C%20R8400%20San%20Carlos%20de%20Bariloche%2C%20R%C3%ADo%20Negro!5e0!3m2!1sen!2sar!4v1723320215154!5m2!1sen!2sar" width="600" height="400"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                    </div>
                    
                </div>
            </div>
            <div className='mediosPago'>
                <h2>Nuestros medios de pagos son los siguientes:</h2>
                <div className='mediosContent'>
                    <img className='mp' src={mpLogo}></img>
                    <img className='pp' src={ppLogo}></img>
                </div>
            </div>
        </div>
    )
}

export default Home