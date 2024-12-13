import React from 'react'
import { Link } from 'react-router-dom'
import "./ProductoSee.css"


const productoSee = ({Title, Id, Price, Img, Rating}) => {

    return (
        <div className='productoDiv'>
            <Link to={`/Producto/${Id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className='infoProduct'>
                <img src={Img} alt='foto producto'></img>
                <h3>{Title}</h3>
                <h4>Id: {Id}</h4>
                <h5><span>★</span>{Rating}</h5>
                <div className='infoPrice'>
                    <h6>${Price}</h6>
                </div>
                </div>
            </Link>
        </div>
    )
}

export default productoSee