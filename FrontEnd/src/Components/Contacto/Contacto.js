import React from 'react'
import { Send } from 'react-bootstrap-icons'
import "./Contacto.css"

const Contacto = () => {
    return (
        <div className='contactoContent'>
            <div className='topBlock'>
                <h1>Contáctenos</h1>
                <h3>Nos puedes contactar mediante las siguientes formas:</h3>
            </div>
            <div className='contentBlock'>
                <div className='form'>
                    <form>
                        <div className='personalInfo'>
                            <div className='emailInfo'>
                                <h2>Email:</h2>
                                <input type="text" id="email" name="email" placeholder='Escribe tu email...' required/>
                            </div>
                            <div className='nameInfo'>
                                <h2>Nombre:</h2>
                                <input type="text" id="name" name="name" placeholder='Escribe tu nombre...' required/>
                            </div>
                        </div>
                        <div className='messageInfo'>
                            <div className='messageArea'>
                                <h2>Mensaje:</h2>
                                <textarea id="message" name="message" rows="5" placeholder='Escribe tu mensaje...' required></textarea>
                            </div>
                            <div className='sendBtn'>
                                <button type="submit"><Send/></button>
                            </div>
                        </div>
                        
                    </form>
                </div>
                <div className='infoManual'>
                    <div className='infoTop'>
                        <h3>Mail</h3>
                        <p>00000@gmail.com</p>
                    </div>
                    <div className='infoMiddle'>
                        <h3>Teléfono</h3>
                        <p>2944000000</p>
                    </div>
                    <div className='infoBottom'>
                        <h3>Ubicación</h3>
                        <p>San Carlos de Bariloche</p>
                        <p>Onelli 556 local 10</p>
                    </div>
                    


                </div>
            </div>
        </div>
    )
}

export default Contacto