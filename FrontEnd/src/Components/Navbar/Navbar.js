import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { PersonCircle, Cart2, List } from "react-bootstrap-icons";

import './Navbar.css';

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

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
                <button className="menuButton" onClick={toggleModal}>
                    <List className="navIcon" />
                </button>
            </div>
            <div className={`navModal ${isModalOpen ? 'open' : ''}`}>
                <NavLink to="/Contacto" onClick={toggleModal}>Contacto</NavLink>
                <NavLink to="/Nosotros" onClick={toggleModal}>Nosotros</NavLink>
                <NavLink to="/Catalogo" onClick={toggleModal}>Catalogo</NavLink>
                <NavLink to="/Talleres" onClick={toggleModal}>Talleres</NavLink>
                <NavLink to="/Carrito" onClick={toggleModal}>Carrito</NavLink>
                <NavLink to="/Perfil" onClick={toggleModal}>Perfil</NavLink>
            </div>
        </div>
    );
};

export default Navbar;