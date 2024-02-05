import  { useState, useEffect } from 'react'; 
import { useSampleWorksContext } from '../hooks/useSampleWorksContext';
import PropTypes from 'prop-types';
import '../styles/guesspage.css'

const SampleWorksDetails = ({ sampleWork, showDeleteButton = true  }) => {
  const { dispatch } = useSampleWorksContext();
  const [isLoading, setIsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleClick = async () => {
    try {
      setDeleteLoading(true); // Set deleteLoading to true when deletion starts
      const response = await fetch(`https://markjportfolio.onrender.com/api/sampleWorks/${sampleWork._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const json = await response.json();
        dispatch({ type: 'DELETE_SAMPLEWORK', payload: json });
      } else {
        const errorMessage = await response.json();
        console.error(errorMessage);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setDeleteLoading(false); // Set deleteLoading back to false when deletion is completed
    }
  };


    // Simulate a delay for demonstration purposes (remove this in the actual implementation) - LOADING SCREEN
    useEffect(() => {
      const delay = setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Set a reasonable delay to simulate loading
  
      // Cleanup the timeout to avoid memory leaks
      return () => clearTimeout(delay);
    }, []);

  return (
    <div className="sampleWork-details">
      {isLoading ? (
        <p style={{color:'cyan'}}>Loading...</p>
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
          <h4>{sampleWork.title}</h4>
          {sampleWork.image && <img className='showDetailsSW' src={sampleWork.image} alt="Sample work"  />} 
          <p>
            <strong style={{color: 'cyan'}}>Description: </strong>
            {sampleWork.description}
          </p>
          <p>
            <strong style={{color: 'lightblue'}}>Technologies used: </strong>
            {sampleWork.tech}
          </p>
          
        </>
      )}
    </div>
  );
};

SampleWorksDetails.propTypes = {
  sampleWork: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string.isRequired,
    tech: PropTypes.string.isRequired,
  }).isRequired,
  showDeleteButton: PropTypes.bool,
};

export default SampleWorksDetails;
