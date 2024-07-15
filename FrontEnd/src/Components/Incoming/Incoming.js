import React from 'react';
import Logo from '../../LogoDeNuestraTierra.jpg'
import './Incoming.css'

const Incoming = () => {
    return (
        <div>
            <header className="App-header">
                <img src={Logo} className="App-logo" alt="logo" />
                <h2 className='TextIncoming'>Algo especial se está macerando... ¡Próximamente!</h2>
            </header>
        </div>
    );
}

export default Incoming;
