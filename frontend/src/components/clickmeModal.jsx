import { useState } from 'react';
import VerifyModal from '../components/verfiyModal';
import PropTypes from 'prop-types';  // Import PropTypes


import '../styles/clickmemodal.css';
import Robot from '../assets/Icons/enterpw.png'

function ClickmeModal({ closeModal }) {
  const [openVerifyModal, setOpenVerifyModal]  = useState(false)

 

  return (
    <div className="modalBackground">
      {openVerifyModal && <VerifyModal closeModal={setOpenVerifyModal}/>}
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="body">
          <div className="imageContainer">
           <img src={Robot} alt="Your Icon" />
          </div>
        </div>
        <div className="title">
          <h2>Do you have permission from my master?</h2>
        </div>
        <div className="footer">
          <button
            onClick={()=>{
              setOpenVerifyModal(true)
          }}
          ><h3>YES I HAVE</h3></button>

        </div>
      </div>
    </div>
  );
}

ClickmeModal.propTypes = {
  closeModal: PropTypes.func.isRequired,  // Specify the expected prop type and mark it as required
};

export default ClickmeModal;