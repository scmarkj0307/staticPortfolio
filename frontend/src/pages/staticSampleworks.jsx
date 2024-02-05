import kmWeb from '../assets/Carousel/SampleWorks/w2.jpg'
import CineCity from '../assets/Carousel/SampleWorks/w1.jpg'
import kmMobile from '../assets/Carousel/SampleWorks/w3.jpg'
import '../styles/guesspage.css'
import DarkHeader from '../components/darkHeader'
import '../styles/landingpage.css' 
import {useState,useEffect}from 'react';
import '../styles/masterpage.css'

const StaticSampleworks = () => {

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

        <h4>ARNAIZ CINE CITY HOTEL - A HOTEL ROOM BOOKING SYSTEM (WEB)</h4>
         <img className='showDetailsSW' src={CineCity} alt="Sample work"  />
          <p>
            <strong style={{color: 'lightblue'}}>Description: </strong>
            Implementing Arnaiz Cine Hotel Booking System offers businesses a competitive edge by providing 24/7 accessibility, streamlined efficiency, 
            and enhanced customer experiences. With real-time updates on room availability, customers benefit from a user-friendly interface and instant confirmation, reducing errors and improving overall satisfaction.
          </p>
          <p>
            <strong style={{color: 'cyan'}}>Technologies used: </strong>
            React ,Tailwind Css , Express , Node JS and MongoDB
          </p>


        </div>

        <div className="sampleWork-details">

        <h4>KM GERONIMO DENTAL MANAGEMENT SYSTEM WITH QR TECHNOLOGY ( MOBILE )</h4>
         <img className='showDetailsSW' src={kmMobile} alt="Sample work"  />
          <p>
            <strong style={{color: 'lightblue'}}>Description: </strong>
            As Dr. Geronimo proudly affirms, she stands at the forefront of innovation in the dental field, 
            confidently declaring that the Km Geronimo dental management system is the exclusive system setting her clinic apart in the area.
          </p>
          <p>
            <strong style={{color: 'cyan'}}>Technologies used: </strong>
            React Native , Expo, Tailwind Css , Material Ui , Web Sockets , Springboot (JAVA), PostgreSQL ,Docker , Heroku
          </p>


        </div>

        <div className="sampleWork-details">

        <h4>KM GERONIMO DENTAL MANAGEMENT SYSTEM WITH QR TECHONOLOGY ( WEB )</h4>
         <img className='showDetailsSW' src={kmWeb} alt="Sample work"  />
          <p>
            <strong style={{color: 'lightblue'}}>Description: </strong>
            As Dr. Geronimo proudly affirms, she stands at the forefront of innovation in the dental field, 
            confidently declaring that the Km Geronimo dental management system is the exclusive system setting her clinic apart in the area.
          </p>
          <p>
            <strong style={{color: 'cyan'}}>Technologies used: </strong>
            React, Tailwind Css, Material Ui, Web Sockets, Springboot ( JAVA ), PostgreSQL, Docker and Heroku
          </p>


        </div>

        

        </div>
      
    </div>
    
    </div>
    )}
    </>
  );
};

export default StaticSampleworks;
