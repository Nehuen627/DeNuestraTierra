import React from 'react'
import TallerSee from './TallerSee/TallerSee';
import Img from '../../Images/images.png'
import './E-learning.css'

const Elearning = () => {
    /* const [talleres, setTalleres] = [];

    const createVisualizator = talleres.map(() => (
        <TallerSee
            
        />
    )); */
    return (
        <div className='elearningContent'>
            <div className='topBlock'>
                <h1>Explora Nuestros Talleres</h1>
                <h3>Contamos con una serie de talleres online con los que podrás capacitarte y adentrarte en este mundo de una forma más aficionada</h3>
            </div>
            <div className='contentPlace'>
                {/* {createVisualizator} */}
                <TallerSee  Title="Taller1" Description="En este curso aprenderas ta ta ta..." Price="$506" Img={Img}/>
                <TallerSee  Title="Taller1" Description="En este curso aprenderas ta ta ta..." Price="$506" Img={Img}/>
                <TallerSee  Title="Taller1" Description="En este curso aprenderas ta ta ta..." Price="$506" Img={Img}/>
                <TallerSee  Title="Taller1" Description="En este curso aprenderas ta ta ta..." Price="$506" Img={Img}/>
            </div>
        </div>
    )
}

export default Elearning