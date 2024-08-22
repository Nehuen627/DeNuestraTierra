import React from 'react'
import './TallerSee.css'

const TallerSee = ({Title, Description, Price, Img}) => {
    return (
        <div className='tallerDiv'>
            <div className='infoTaller'>
                <img src={Img}></img>
                <h2>{Title}</h2>
                <h5>{Description}</h5>
                <div className='infoPrice'>
                    <h6>{Price}</h6>
                </div>
            </div>
        </div>
    )
}

export default TallerSee