import {useState,useRef,useEffect} from 'react'
import '../styles/verifymodal.css'
import gsap from 'gsap';
import Watcher from '../assets/Icons/enterpw.png'
import { useNavigate } from 'react-router-dom';
import DialogBox from './dialogBox';

function VerfiyModal() {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const inputRef = useRef(); 

  useEffect(() => {
    const { to, set } = gsap;


    function delay(fn, ms) {
      let timer = 0;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(fn.bind(this, ...args), ms || 0);
      };
    }

    document.querySelectorAll('.input').forEach((elem) => {
      let clear = elem.querySelector('.clear'),
        input = elem.querySelector('input'),
        { classList } = elem,
        svgLine = clear.querySelector('.line'),
        svgLineProxy = new Proxy(
          {
            x: null,
          },
          {
            set(target, key, value) {
              target[key] = value;
              if (target.x !== null) {
                svgLine.setAttribute('d', getPath(target.x, 0.1925));
              }
              return true;
            },
            get(target, key) {
              return target[key];
            },
          }
        );

      svgLineProxy.x = 0;

      input.addEventListener(
        'input',
        delay(() => {
          let bool = input.value.length;
          to(elem, {
            '--clear-scale': bool ? 1 : 0,
            duration: bool ? 0.5 : 0.15,
            ease: bool ? 'elastic.out(1, .7)' : 'none',
          });
          to(elem, {
            '--clear-opacity': bool ? 1 : 0,
            duration: 0.15,
          });
        }, 250)
      );

      clear.addEventListener('click', () => {
        classList.add('clearing');
        set(elem, {
          '--clear-swipe-left': (input.offsetWidth - 16) * -1 + 'px',
        });
        to(elem, {
          keyframes: [
            {
              '--clear-rotate': '45deg',
              duration: 0.25,
            },
            {
              '--clear-arrow-x': '2px',
              '--clear-arrow-y': '-2px',
              duration: 0.15,
            },
            {
              '--clear-arrow-x': '-3px',
              '--clear-arrow-y': '3px',
              '--clear-swipe': '-3px',
              duration: 0.15,
              onStart() {
                to(svgLineProxy, {
                  x: 3,
                  duration: 0.1,
                  delay: 0.05,
                });
              },
            },
            {
              '--clear-swipe-x': 1,
              '--clear-x': input.offsetWidth * -1 + 'px',
              duration: 0.45,
              onComplete() {
                input.value = '';
                inputRef.current.focus();
                to(elem, {
                  '--clear-arrow-offset': '4px',
                  '--clear-arrow-offset-second': '4px',
                  '--clear-line-array': '8.5px',
                  '--clear-line-offset': '27px',
                  '--clear-long-offset': '24px',
                  '--clear-rotate': '0deg',
                  '--clear-arrow-o': 1,
                  duration: 0,
                  delay: 0.7,
                  onStart() {
                    classList.remove('clearing');
                  },
                });
                to(elem, {
                  '--clear-opacity': 0,
                  duration: 0.2,
                  delay: 0.55,
                });
                to(elem, {
                  '--clear-arrow-o': 0,
                  '--clear-arrow-x': '0px',
                  '--clear-arrow-y': '0px',
                  '--clear-swipe': '0px',
                  duration: 0.15,
                });
                to(svgLineProxy, {
                  x: 0,
                  duration: 0.45,
                  ease: 'elastic.out(1, .75)',
                });
              },
            },
            {
              '--clear-swipe-x': 0,
              '--clear-x': '0px',
              duration: 0.4,
              delay: 0.35,
            },
          ],
        });
        to(elem, {
          '--clear-arrow-offset': '0px',
          '--clear-arrow-offset-second': '8px',
          '--clear-line-array': '28.5px',
          '--clear-line-offset': '57px',
          '--clear-long-offset': '17px',
          duration: 0.2,
        });
      });
    });

    function getPoint(point, i, a, smoothing) {
      let cp = (current, previous, next, reverse) => {
        let p = previous || current,
          n = next || current,
          o = {
            length: Math.sqrt(Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)),
            angle: Math.atan2(n[1] - p[1], n[0] - p[0]),
          },
          angle = o.angle + (reverse ? Math.PI : 0),
          length = o.length * smoothing;
        return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length];
      },
        cps = cp(a[i - 1], a[i - 2], point, false),
        cpe = cp(point, a[i - 1], a[i + 1], true);
      return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
    }

    function getPath(x, smoothing) {
      return [
        [2, 2],
        [12 - x, 12 + x],
        [22, 22],
      ].reduce(
        (acc, point, i, a) => (i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${getPoint(point, i, a, smoothing)}`),
        ''
      );
    }
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClearClick = () => {
    inputRef.current.focus();
    setInputValue('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validation logic
  if (inputValue === 'admin123') {
    // Redirect to the dashboard or perform any other action
    setShowDialog({ message: 'Welcome Mr/Ms.', type: 'success' });
  } else {
    // Display an error message or perform other actions for invalid credentials
    setShowDialog({ message: ' My BOSS!! do not allow you.', type: 'notsuccess' });
  }
};

const handleCloseDialog = () => {
  setShowDialog(null);
  if (inputValue === 'admin123') {
    navigate('/staticPi');
  }
};


  



  return (
    <div className="container">
        <div className="imageContainer">
           <img src={Watcher} alt="Your Icon" />
          </div>
        <div className="f1">
            <h1>Enter secret key!!</h1>
        </div>
        <div className="f2">
         <div className={`input ${inputValue.length > 0 ? 'clearing' : ''}`}>
           <div className="text">
             <input
               ref={inputRef}
               type="text"
               value={inputValue}
               onChange={handleInputChange}
               placeholder=""
             />
           </div>
           <button className="clear" onClick={handleClearClick}>
             <svg viewBox="0 0 24 24">
               <path className="line" d="M2 2L22 22" />
               <path className="long" d="M9 15L20 4" />
               <path className="arrow" d="M13 11V7" />
               <path className="arrow" d="M17 11H13" />
             </svg>
           </button>
         </div>
         <div className="footer2">
          <button onClick={handleSubmit}>SUBMIT</button>
        </div>

        {showDialog && (
          <DialogBox message={showDialog.message} type={showDialog.type} onClose={handleCloseDialog} />
        )}
        </div>

        
        
        
        
    </div>
  )
}

export default VerfiyModal