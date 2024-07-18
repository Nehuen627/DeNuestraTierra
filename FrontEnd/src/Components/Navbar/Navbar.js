import React from 'react'
import { NavLink } from "react-router-dom";
import { PersonCircle} from "react-bootstrap-icons";
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="">
            <div className="navbar">
                <Link className="linkStyle" to="/">
                    <div>
                        <h2>De Nuestra Tierra</h2>
                    </div>
                </Link>
                <Link className="linkStyle" to="/Contacto">
                    <div>
                        <h2>Contacto</h2>
                    </div>
                </Link>
                <Link className="linkStyle" to="/Nosotros">
                    <div>
                        <h2>Nosotros</h2>
                    </div>
                </Link>
                <Link className="linkStyle" to="/Catalogo">
                    <div>
                        <h2>Catalogo</h2>
                    </div>
                </Link>
                <Link className="linkStyle" to="/E-learning">
                    <div>
                        <h2>E-learning</h2>
                    </div>
                </Link>
                <div>
                    <NavLink to="/Perfil" className="paddingIcon account"><PersonCircle className="navIcon"/></NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar