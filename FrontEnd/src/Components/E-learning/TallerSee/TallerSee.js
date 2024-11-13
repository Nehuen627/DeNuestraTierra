import React from 'react';
import { Link } from 'react-router-dom';
import './TallerSee.css';

const TallerSee = ({ Title, Id, Description, Price, Img }) => {
  return (
    <div className="tallerDiv">
        <Link to={`/talleres/${Id}`} style={{textDecoration: 'none', color: 'inherit' }} >
            <div className="infoTaller">
            <img src={Img} alt={`Foto del taller ${Title}`} />
            <h2>{Title}</h2>
            <h5>{Description}</h5>
            <div className="infoPrice">
                <h6>{Price}</h6>
            </div>
            </div>
        </Link>
    </div>
  );
};

export default TallerSee;
