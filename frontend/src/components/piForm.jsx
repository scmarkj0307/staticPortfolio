import { useState } from 'react';
import axios from 'axios';
import { usePersonalInfoContext } from '../hooks/usePersonalInfoContext';
import '../styles/masterpage.css';

const PersonalInfoForm = () => {
  const { dispatch } = usePersonalInfoContext();
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageString = '';

    if (image) {
      try {
        // Convert image to base64-encoded string
        imageString = await convertImageToBase64(image);
      } catch (error) {
        console.error('Error converting image to base64:', error);
      }
    }

    const personalInfo = { name, details, category, image: imageString };

    try {
      const response = await axios.post('https://markjportfolio.onrender.com/api/personalInfo', personalInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setEmptyFields([]);
      setError(null);
      setName('');
      setDetails('');
      setCategory('');
      setImage(null);
      dispatch({ type: 'CREATE_PERSONAL_INFO', payload: response.data });
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
        setEmptyFields(err.response.data.emptyFields || []);
      } else {
        setError('Something went wrong');
      }
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add Personal Information</h3>

      <label>Upload Image:</label>
      {image && <img src={URL.createObjectURL(image)} alt="Uploaded Preview" style={{ maxWidth: '800px', maxHeight: '150px' }} />}
      <input type="file" onChange={handleImageChange} />

      <label>Story title:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Details:</label>
      <input
        type="text"
        onChange={(e) => setDetails(e.target.value)}
        value={details}
        className={emptyFields.includes('details') ? 'error' : ''}
      />

      <label>Date:</label>
      <input
        type="text"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        className={emptyFields.includes('category') ? 'error' : ''}
      />

      <button style={{ color: 'black' }}>Add Information</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default PersonalInfoForm;
