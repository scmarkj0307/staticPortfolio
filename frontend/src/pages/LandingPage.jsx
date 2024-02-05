import {useState,useEffect,useRef,useMemo}from 'react';

//Styling import
import '../styles/landingpage.css' 


//components import
import Header from '../components/header'
import MouseCursor from '../components/cursor.jsx'
import ClickmeModal from '../components/clickmeModal.jsx';

//dependencies library import
import Typewriter from 'typewriter-effect';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer, faHandPaper } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


//Images import
import dp3 from '../assets/Images/dp3.png';
import C1 from '../assets/Carousel/SampleWorks/w1.jpg'
import C2 from '../assets/Carousel/SampleWorks/w2.jpg'
import C4 from '../assets/Carousel/SampleWorks/w3.jpg'
import a2 from '../assets/Carousel/PersonalInfo/systemD.jpg'
import a3 from '../assets/Carousel/PersonalInfo/thesisD.jpg'
import a4 from '../assets/Carousel/PersonalInfo/phblockchain.jpg'
import Location from '../assets/ContactImages/location.png'
import Mail from '../assets/ContactImages/mail.png'
import Call from '../assets/ContactImages/call.png'



function LandingPage() {

  const navigate = useNavigate();
  
//EMAIL----------------------------------------------------------------------------------------------------
  const [messageStatus, setMessageStatus] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = 'service_qwn9xhc';
    const templateId = 'template_6d88j2g';
    const publicKey = 'SwMqzyNUQjS8CBc68';

    // Create an object with EmailJS service ID, template ID, Public Key, and Template params
    const data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name: name,
        from_email: email,
        to_name: 'Jhon Mark Ruiz Arnaiz',
        message: message,
      }
    };

    // Send the email using EmailJS
    
    try {
      const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);
      console.log(res.data);
      setName('');
      setEmail('');
      setMessage('');
      setMessageStatus('Message sent successfully!');
    } catch (error) {
      console.error(error);
      setMessageStatus('Failed to send message. Please try again.');
    }
  }



//For cursor visibility----------------------------------------------------------------------------------------
const [showCursor, setShowCursor] = useState(false); // State to track cursor visibility
const toggleCursor = () => {
  setShowCursor(!showCursor);
};

//For modals---------------------------------------------------------------------------------------------------
  const [openModal, setOpenModal]  = useState(false)


//FOR PROFILE IMAGE CONTENT AND ANIMATION---------------------------------------------------------------------------
const [animateDp, setAnimateDp] = useState(false);
const myDpContainerRef = useRef(null);

useEffect(() => {
  // Trigger the hover effect on myDpContainerRef after a delay
  const timeoutId = setTimeout(() => {
    setAnimateDp(true);
  }, 2000); // Adjust the delay as needed

  // Clear the timeout on component unmount
  return () => {
    clearTimeout(timeoutId);
  };
}, []);

//FOR CAROUSEL CONTENT----------------------------------------------------------------------------------------------------
const images = useMemo(() => [C1, C2, C4], []); // Wrap the initialization in useMemo
const images2 = useMemo(() => [a2, a3, a4], []); // Wrap the initialization in useMemo

    const settings = {
      arrows: false,
      dots: false,
      infinite: true,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
  
    };

    useEffect(() => {
      // Preload images
      const preloadImages = [...images, ...images2];
      preloadImages.forEach((image) => {
        const img = new Image();
        img.src = image;
      });
    }, [images, images2]);


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

    <main>
      {showCursor && <div className="cursor"><MouseCursor /></div>}
        <div className="mainContents">
        <Header />
            <div className="homeContainer" id='home'>
                <div className="c-1">
                    <div className="myTechStack">
                        <h1>My TECH STACK  </h1>
                        <h2><Typewriter
                                options={{
                                strings: [" REACT JS", " REACT NATIVE", " JAVASCRIPT" , "NODE JS" , "EXPRESS" , " SPRINGBOOT JAVA", "NO SQL AND SQL", "CSS AND STYLEX", "TAILWINDCSS", "TYPESCRIPT"],
                                autoStart: true,
                                loop: true,
                                }}
                        /></h2>
                  </div>   
                </div>

                <div className="c-2">
                    <div className="typingGreetings">
                      <p>HI!! Good day, Im <span style={{color: 'cyan'}}> Arnaiz, Jhonmark R. </span> A fullstack web and mobile app developer</p>
                    </div>
                </div>

                <div className="c-3">
                <button className="cursor-btn" onClick={toggleCursor}>
                  <div className='cursor-content'>
                    {showCursor ? (
                      <>
                        <FontAwesomeIcon icon={faHandPointer} size="2x" />
                        <p>Cursor Tracker Enabled</p>
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faHandPaper} size="2x" />
                        <p>Cursor Tracker Disabled</p>
                      </>
                    )}
                  </div>
                </button>
                  <div
                    ref={myDpContainerRef}
                    className={`myDpContainer ${animateDp ? 'startAnimation' : ''}`}
                  >
                    <img src={dp3} alt="" className="myPic" />
                  </div>
                </div>
                <div className="c-4">
                   <a className='button' href="https://www.linkedin.com/in/markjarnaiz/">
                      <span></span><span></span>
                      <span></span><span></span>
                        LINKEDiN
                    </a>
                    <a className='button' href="https://github.com/scmarkj0307">
                      <span></span><span></span>
                      <span></span><span></span>
                        GITHUB
                    </a>
                    <a className='button' href="https://read.cv/markjarnaiz">
                      <span></span><span></span>
                      <span></span><span></span>
                        CV
                    </a>
                    <a className='button' href="https://drive.google.com/file/d/1YGAT_QEKHp6kYbs4fOzykAXnpPo9vs_i/view?usp=sharing">
                      <span></span><span></span>
                      <span></span><span></span>
                        RESUME
                    </a>
                </div>
            </div>
            
            <div className="aboutContainer" id='sample works'>
            {openModal && <ClickmeModal closeModal={setOpenModal}/>}
              <div className="a-1">
                <div className="swcarousel-container">
                  <Slider className='.slider' {...settings}>
                      {images.map((image, index) => (
                        <div key={index}>
                          <img
                            src={image}
                            alt={`Sample Works ${index + 1}`}
                            onLoad={() => console.log(`Image ${index + 1} loaded`)}
                          />
                        </div>
                      ))}
                  </Slider>
                </div>
                <div className="swcarouselButton">
                  <div className="svg-wrapper">
                    <svg height="40" width="150" xmlns="http://www.w3.org/2000/svg">
                      <rect id="shape" height="41" width="150"  />
                    </svg>
                    <div id="text">
                      <button onClick={()=>{
                              navigate('/StaticSw');
                              }}  className='black' ><span className="spot"></span>CLICK ME!!</button>
                        </div>
                  </div>
                </div>
                <div className="swcarouselLabel">
                  <h1>Sample Works</h1>
                </div>
                <div className="swcarouselDescription">
                  <p>This projects highlight my expertise and creativity across various technologies.
                     From sleek and responsive web designs to robust backend solutions, my sample works demonstrate my commitment to delivering excellence.
                   </p>
                </div>
              </div>

              <div className="a-2">
                <div className="picarousel-container">
                      <Slider {...settings}>
                        {images2.map((image2, index) => (
                          <div key={index}>
                            <img
                              src={image2}
                              alt={`Personal Info ${index + 1}`}
                              onLoad={() => console.log(`Image ${index + 1} loaded`)}
                            />
                          </div>
                        ))}
                      </Slider>
                  </div>
                  <div className="picarouselButton">
                    <div className="svg-wrapper">
                        <svg height="40" width="150" xmlns="http://www.w3.org/2000/svg">
                          <rect id="shape" height="40" width="150" />
                        </svg>
                       <div id="text">
                          <button onClick={()=>{
                            setOpenModal(true)
                            }}  className='black' ><span className="spot"></span>CLICK ME!!</button>
                        
                        </div>
                    </div>
                </div>
                <div className="picarouselLabel">
                    <h1>Personal Information</h1>
                </div>
                <div className="picarouselDescription">
                    <p>Welcome! I&apos;m Arnaiz, Jhon Mark R., and this is your window into my world. As a Computer Science student, 
                      I believe in the power of connecting through shared experiences and personal stories. Here&apos;s a snapshot of some of my stories.
                        </p>
                </div> 
              </div>
            </div>

            <div className="contactContainer" id="contact me!!">
              <div className="bubbles">
                <span style={{ "--i": 11 }}></span>
                <span style={{ "--i": 12 }}></span>
                <span style={{ "--i": 24 }}></span>
                <span style={{ "--i": 10 }}></span>
                <span style={{ "--i": 14 }}></span>
                <span style={{ "--i": 23 }}></span>
                <span style={{ "--i": 18 }}></span>
                <span style={{ "--i": 16 }}></span>
                <span style={{ "--i": 19 }}></span>
                <span style={{ "--i": 20 }}></span>
                <span style={{ "--i": 22 }}></span>
                <span style={{ "--i": 25 }}></span>
                <span style={{ "--i": 18 }}></span>
                <span style={{ "--i": 21 }}></span>
                <span style={{ "--i": 15 }}></span>
                <span style={{ "--i": 13 }}></span>
                <span style={{ "--i": 26 }}></span>
                <span style={{ "--i": 17 }}></span>
                <span style={{ "--i": 13 }}></span>
                <span style={{ "--i": 28 }}></span>
                <span style={{ "--i": 11 }}></span>
                <span style={{ "--i": 12 }}></span>
                <span style={{ "--i": 24 }}></span>
                <span style={{ "--i": 10 }}></span>
                <span style={{ "--i": 14 }}></span>
                <span style={{ "--i": 23 }}></span>
                <span style={{ "--i": 18 }}></span>
                <span style={{ "--i": 16 }}></span>
                <span style={{ "--i": 19 }}></span>
                <span style={{ "--i": 20 }}></span>
                <span style={{ "--i": 22 }}></span>
                <span style={{ "--i": 25 }}></span>
                <span style={{ "--i": 18 }}></span>
                <span style={{ "--i": 21 }}></span>
                <span style={{ "--i": 15 }}></span>
                <span style={{ "--i": 13 }}></span>
                <span style={{ "--i": 26 }}></span>
                <span style={{ "--i": 17 }}></span>
                <span style={{ "--i": 13 }}></span>
                <span style={{ "--i": 28 }}></span>
                <span style={{ "--i": 11 }}></span>
                <span style={{ "--i": 12 }}></span>
                <span style={{ "--i": 24 }}></span>
                <span style={{ "--i": 10 }}></span>
                <span style={{ "--i": 14 }}></span>
                <span style={{ "--i": 23 }}></span>
                <span style={{ "--i": 18 }}></span>
                <span style={{ "--i": 16 }}></span>
                <span style={{ "--i": 19 }}></span>
                <span style={{ "--i": 20 }}></span>
                <span style={{ "--i": 22 }}></span>
                <span style={{ "--i": 25 }}></span>
                <span style={{ "--i": 18 }}></span>
                <span style={{ "--i": 21 }}></span>
                <span style={{ "--i": 15 }}></span>
                <span style={{ "--i": 13 }}></span>
                <span style={{ "--i": 26 }}></span>
                <span style={{ "--i": 17 }}></span>
                <span style={{ "--i": 13 }}></span>
                <span style={{ "--i": 28 }}></span>
              </div>
      

            <div className="cContainer">
              <div className="cc1">
                <lord-icon
                    src="https://cdn.lordicon.com/xzalkbkz.json"
                    trigger="loop"
                    delay="2000"
                    colors="primary:#08a88a,secondary:#B7ADA1"
                    style={{ width: '250px', height: '250px' }}>
                </lord-icon>
              </div>
              <div className="cc2">
                <div className="contactInfo">
                  <div className='infoContainer'>
                    <h2>Contact Info</h2>
                    <ul className="info">
                      <li>
                        <span><img src={Location} alt="Location" /></span>
                        <span>Kaunlaran Village, Caloocan</span>
                      </li>
                      <li>
                        <span><img src={Mail} alt="Mail" /></span>
                        <span>Jhonmarkruiz.arnaiz@gmail.com</span>
                      </li>
                      <li>
                        <span><img src={Call} alt="Call" /></span>
                        <span>09454121817</span>
                      </li>
                    </ul>
                    <p>© markj 2024</p>
                  </div>
                </div>
                <div className="contactForm">
                  <h2>Send me a Message</h2>
                  <form onSubmit={handleSubmit} className="form-container">
                    <div className="row px-3">
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)}  placeholder="Enter your name" className="form-input" required/>
                    </div>
                    <div className="row px-3">
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className="form-input" required/>
                    </div>
                    <div className="row px-3">
                      <textarea type="text" value={message} onChange={(e) => setMessage(e.target.value)}  placeholder="Write your message" className="form-textarea" required></textarea>
                    </div>
                    <div className="row px-3">
                      <button className="form-submit" type="submit">SEND MESSAGE</button>
                    </div>
                    {/* Display the message status */}
                      {messageStatus && (
                        <div style={{color: 'cyan'}}className={`message-status ${messageStatus.includes('successfully') ? 'success' : 'error'}`}>
                          {messageStatus}
                        </div>
                      )}
                  </form>
                 
                </div>
              </div>
              <div className="cc3">
              <lord-icon
                  src="https://cdn.lordicon.com/qtykvslf.json"
                  trigger="loop"
                  delay="2000"
                  colors="primary:#B7ADA1,secondary:#08a88a"
                  style={{ width: '250px', height: '250px' }}>
              </lord-icon>
            </div>
          </div>

              



            </div>
          


        </div>

    </main>
    )}

  </>
  )
}







export default LandingPage;
