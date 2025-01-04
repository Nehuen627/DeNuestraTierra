import React from 'react';
import { Link } from 'react-router-dom';
import './TallerSee.css';

const TallerSee = ({ Title, Id,  Price, Skills, Img }) => {
  console.log(Skills);
  
  const formattedSkills = Skills ? Skills.join(', ') : '';
  
  return (
    <div className="tallerDiv">
        <Link to={`/talleres/${Id}`} style={{textDecoration: 'none', color: 'inherit' }} >
            <div className="infoTaller">
            <img src={Img} alt={`Foto del taller ${Title}`} />
            <h2>{Title}</h2>
            <p>{formattedSkills}</p>
            <div className="infoPrice">
                <h6>{Price}</h6>
            </div>
            </div>
        </Link>
    </div>
  );
};

export default TallerSee;
