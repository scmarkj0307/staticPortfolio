import  { useState, useEffect } from 'react';
import { usePersonalInfoContext } from '../hooks/usePersonalInfoContext';
import PropTypes from 'prop-types';
import '../styles/guesspage.css'


const PersonalInfoDetails = ({ personalInfo, showDeleteButton = true }) => {
  const { dispatch } = usePersonalInfoContext();
  const [isLoading, setIsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleClick = async () => {
    try {
      setDeleteLoading(true);
      const response = await fetch(`https://markjportfolio.onrender.com/api/personalInfo/${personalInfo._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const json = await response.json();
        dispatch({ type: 'DELETE_PERSONAL_INFO', payload: json });
      } else {
        const errorMessage = await response.json();
        console.error(errorMessage);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="sampleWork-details">
      {isLoading ? (
        <p style={{ color: 'cyan' }}>Loading...</p>
      ) : (
        <>
        {showDeleteButton && (
              <span className='delete-btn' onClick={handleClick} 
              style={{
                position: 'relative',
                top: '-0.5rem',
                left: '21rem',
                backgroundColor: 'transparent',
                color: 'red',
                border: 'none',
                cursor: deleteLoading ? 'not-allowed' : 'pointer',
                fontSize: '16px', 
                fontFamily: 'Arial, sans-serif', 
                fontWeight: 'bold', 
              }}>
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </span>
            )}
          <h4>{personalInfo.name}</h4>
          {personalInfo.image && (
            <img className='showDetailsPI' src={personalInfo.image} alt="Personal Information"  />
          )}
          <p>
            {personalInfo.details}
          </p>
          <p>
            <strong style={{color: 'cyan'}}>Date: </strong>
            {personalInfo.category}
          </p>
        </>
      )}
    </div>
  );
};


PersonalInfoDetails.propTypes = {
  personalInfo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    details: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  showDeleteButton: PropTypes.bool,
};

export default PersonalInfoDetails;
