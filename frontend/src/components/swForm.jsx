import { useState } from 'react';
import axios from 'axios';
import { useSampleWorksContext  } from '../hooks/useSampleWorksContext'
import '../styles/masterpage.css'

const SampleWorksForm = () => {
  const { dispatch } = useSampleWorksContext ()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tech, setTech] = useState('');
  const [image, setImage] = useState(null); 
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([])

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

    const sampleWork = { title, description, tech,image: imageString };

    try {
      const response = await axios.post('https://markjportfolio.onrender.com/api/sampleWorks', sampleWork, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setEmptyFields([])
      setError(null);
      setTitle('');
      setDescription('');
      setTech('');
      setImage(null);
      dispatch({type: 'CREATE_SAMPLEWORK', payload: response.data})
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
      <h3>Add a New Project</h3>

      <label>Upload Image:</label>
      {image && <img src={URL.createObjectURL(image)} alt="Uploaded Preview" style={{ maxWidth: '800px', maxHeight: '150px' }} />}
      <input type="file" onChange={handleImageChange} />

      <label>PORJECT TITLE:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>DESCRIPTION:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes('description') ? 'error' : ''}
      />

      <label>TECHNOLOGIES USED:</label>
      <input
        type="text"
        onChange={(e) => setTech(e.target.value)}
        value={tech}
        className={emptyFields.includes('tech') ? 'error' : ''}
      />

      


      <button style={{color: 'black'}}>ADD PROJECT</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SampleWorksForm;
