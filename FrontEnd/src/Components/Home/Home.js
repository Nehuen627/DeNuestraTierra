import React from 'react'
import Logo from '../../Images/Logo.png'
import mpLogo from '../../Images/MPLogo.webp'
import ppLogo from '../../Images/PaypalLogo.png'
import './Home.css'
import { GeoAltFill, StarFill, BoxFill } from 
'react-bootstrap-icons'
import { useEffect } from 'react'
import bg from "../../Images/bgLayered.svg"
const Home = () => {
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
                <h2>Presentación</h2>
                <h3>lorem20</h3>
            </div>
            <div className='productsBox'>
                <div className='productsUrls'>
                    <div>
                        <StarFill/>
                        <a><h3>Mejores Valorados</h3></a>
                    </div>
                    <div>
                        <BoxFill/>
                        <a><h3>Catálogo Completo</h3></a>
                    </div>
                </div>
                <div className='topProducts'>
                    Productos
                </div>

            </div>
            <div className='elearningBox'>
                <h2>Talleres online</h2>
                <h3>Explicación de esta modalidad</h3>
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