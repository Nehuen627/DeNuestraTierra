import React from 'react'
import "./ProductoSee.css"


const productoSee = ({Title, Id, Price, Img, Rating}) => {

    return (
        <div className='productoDiv'>
            <div className='infoProduct'>
                <img src={Img} alt='foto producto'></img>
                <h2>{Title}</h2>
                <h4>Id: {Id}</h4>
                <h5><span>★</span>{Rating}</h5>
                <div className='infoPrice'>
                    <h6>${Price}</h6>
                </div>
            </div>
        </div>
    )
}

export default productoSee