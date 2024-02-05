import phblockchain from '../assets/Carousel/PersonalInfo/phblockchain.jpg'
import systemD from '../assets/Carousel/PersonalInfo/systemD.jpg'
import thesisD from '../assets/Carousel/PersonalInfo/thesisD.jpg'
import '../styles/guesspage.css'
import DarkHeader from '../components/darkHeader'
import '../styles/landingpage.css' 
import {useState,useEffect}from 'react';
import '../styles/masterpage.css'

const StaticPersonalInfo = () => {

  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    // Simulate an asynchronous task (e.g., fetching data, loading resources)
    const loadingTask = setTimeout(() => {
      setLoading(false); // Set loading to false after a delay (simulating the end of loading)
    }, 3000); // Adjust the delay based on your actual loading time

    // Clear the timeout on component unmount
    return () => {
      clearTimeout(loadingTask);
    };
  }, []);

  return (
    <>

    {loading ? (
      // Loading screen
      <div className="loading-screen">
        <span className="loader"></span>
        {/* You can add a loading animation or any other content here */}
      </div>
    ) : (

    <div>
        <div className="gpheader">
            <DarkHeader/>
            </div>
            
    <div className="gphome">


        <div className="gpworkouts">

        <div className="sampleWork-details">

        <h4>THESIS DEFENSE DAY</h4>
         <img className='showDetailsPI' src={thesisD} alt="Sample work"  />
          <p>
          A fantastic day for a successful thesis defense! We&apos;re not just wrapping up hard work but starting new academic adventures. 
          The friendly vibe during the defense showed teamwork and excitement for growing knowledge. Questions from the committee and the chat about
           the research made it clear that our findings matter, opening doors for more discoveries and academic contributions ahead.
          </p>
          <p>
            <strong style={{color: 'cyan'}}>Date: </strong>
            December 18, 2023
          </p>


        </div>

        <div className="sampleWork-details">

        <h4>KM GERONIMO DENTAL MANAGEMENT SYSTEM CLIENT TURNOVER</h4>
         <img className='showDetailsPI' src={systemD} alt="Sample work"  />
          <p>
          The successful deployment of the system marked the culmination of meticulous planning and implementation.
           Dr. Geronimo&apos;s satisfaction underscores the achievement, reflecting the collaborative efforts and effective execution by the team.
          </p>
          <p>
            <strong style={{color: 'cyan'}}>DATE: </strong>
            November 07, 2023
          </p>


        </div>

        <div className="sampleWork-details">

        <h4>KM GERONIMO DENTAL MANAGEMENT SYSTEM WITH QR TECHONOLOGY - WEB</h4>
         <img className='showDetailsPI' src={phblockchain} alt="Sample work"  />
          <p>
          It is a one week seminar,ideathon and hackthon hosted by DICT at Mariott Grand Ballroom Hotel at Newport BLVD, Pasay Metro Manila
          </p>
          <p>
            <strong style={{color: 'cyan'}}>Date: </strong>
            September 09, 2023
          </p>


        </div>

        

        </div>
      
    </div>
    
    </div>
    )}
    </>
  );
};

export default StaticPersonalInfo;
