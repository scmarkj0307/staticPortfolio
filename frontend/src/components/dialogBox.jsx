
import PropTypes from 'prop-types';
import '../styles/dialogbox.css';
import SuccessIcon from '../assets/Icons/cute.png'; 
import ErrorIcon from '../assets/Icons/angry.png'; 

const DialogBox = ({ message, type, onClose }) => {
  return (
    <div className={`dialog-box ${type}`}>
      <img className='iconImg' src={type === 'success' ? SuccessIcon : ErrorIcon} alt={type}  />
      <p>{message}</p>
      <button className='closeBtn' onClick={onClose}>Close</button>
    </div>
  );
};

DialogBox.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'notsuccess']).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DialogBox;
