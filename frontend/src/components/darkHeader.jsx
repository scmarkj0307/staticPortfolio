import '../styles/darkheader.css';
import { useNavigate } from 'react-router-dom';

const DarkHeader = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This will go back one step in the history stack
  };

  const goHome = () => {
    navigate('/')
  };

  
  return (
    <div className="navDark">
      <h1 onClick={goHome} className="myNickNameDark">Markjarnaiz</h1>
      <a className="darkBack" onClick={goBack}><h1>&lt;&lt;&lt;</h1>
    </a>
    </div>
  );
};

export default DarkHeader;
