import React from 'react'
import { NavLink } from "react-router-dom";
import { PersonCircle, Cart2} from "react-bootstrap-icons";

import './Navbar.css'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="nvContent">
                <div className='nvLeftSide'>
                    <NavLink className="neverActive" to="/" >
                        <div>
                            <h2>De Nuestra Tierra</h2>
                        </div>
                    </NavLink>
                </div>
                <div className='nvCenter'>
                    <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/Contacto">
                        <div>
                            <h2>Contacto</h2>
                        </div>
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/Nosotros">
                        <div>
                            <h2>Nosotros</h2>
                        </div>
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/Catalogo">
                        <div>
                            <h2>Catalogo</h2>
                        </div>
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/Talleres">
                        <div>
                            <h2>Talleres</h2>
                        </div>
                    </NavLink>
                </div>
                
                <div className='nvRightSide'>
                    <NavLink to="/Carrito" className="paddingIcon account"><Cart2 className="navIcon"/></NavLink>
                    <NavLink to="/Perfil" className="paddingIcon account"><PersonCircle className="navIcon"/></NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar