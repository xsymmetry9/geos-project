import React, {useState} from "react";
import { Link } from "react-router-dom";

const Dropdown = ({buttonTitle, title}) =>{
  const language="english";
  const [isHidden, setIsHidden] = useState(true);

  const handler = () =>{
    setIsHidden(prev => !prev);
  };

  const closeDropdownMenu = () =>{
    setIsHidden(true);
  };
  return(
    <>
      <button onClick={handler} className="btn btn-navigation">{buttonTitle}</button>
      <ul className={`dropdown-content ${isHidden && "hidden"}`}>
        <li className="btn language-nav"><Link to="/" onClick={closeDropdownMenu}>{title[language.toLowerCase()][0]}</Link></li>
        <li className="btn language-nav"><Link to="/home/ch" onClick={closeDropdownMenu}>{title[language.toLowerCase()][1]}</Link></li>
        <li className="btn language-nav"><Link to="/home/kr" onClick={closeDropdownMenu}>{title[language.toLowerCase()][2]}</Link></li>
        <li className="btn language-nav"><Link to="/home/jp" onClick={closeDropdownMenu}>{title[language.toLowerCase()][3]}</Link></li>
      </ul>
    </>

  );
};

export default Dropdown;