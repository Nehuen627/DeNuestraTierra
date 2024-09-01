import React from 'react';
import './Modal.css'; 

const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                <h2>Cambiar imagen</h2>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
