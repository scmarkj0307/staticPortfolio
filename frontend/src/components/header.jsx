import { useState } from 'react';
import { Link } from 'react-scroll';
import '../styles/header.css';

const Header = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const menuItems = [
    { id: 1, title: "HOME" },
    { id: 2, title: "SAMPLE WORKS" },
    { id: 3, title: "CONTACT ME!!" },
  ];
  
  return (
    <div className="nav">
      <h1 className="myNickName">Markjarnaiz</h1>

      <div>
        <ul id="list" className={clicked ? "list active" : "list"}>
          {menuItems.map((menu) => (
            <li key={menu.id}>
              <Link
                className="nav-link"
                to={menu.title.toLowerCase()}
                smooth={true}
                offset={
                  menu.title === "HOME"
                    ? -100
                    : menu.title === "SAMPLE WORKS"
                    ? 70
                    : menu.title === "CONTACT ME!!"
                    ? 65 
                    : 0
                }
                duration={500}
                onClick={handleClick}
              >
                {menu.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div id="mobileView" onClick={handleClick}>
        <i id="bar" className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
    </div>
  );
};

export default Header;
