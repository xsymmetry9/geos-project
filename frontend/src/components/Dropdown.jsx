import React, {useState} from "react";

const Dropdown = ({buttonTitle, title, language}) =>{
    const [isHidden, setIsHidden] = useState(true)

    const handler = () =>{
        setIsHidden(prev => !prev);
    }
    return(
        <>
            <button onClick={handler} className="btn btn-navigation">{buttonTitle}</button>
                <ul className={`dropdown-content ${isHidden && "hidden"}`}>
                    <li className="btn language-nav"><a href="/">{title[language.toLowerCase()][0]}</a></li>
                    <li className="btn language-nav"><a href="/ch">{title[language.toLowerCase()][1]}</a></li>
                    <li className="btn language-nav"><a href="/kor">{title[language.toLowerCase()][2]}</a></li>
                    <li className="btn language-nav"><a href="/jp">{title[language.toLowerCase()][3]}</a></li>
                </ul>
        </>

    )
}

export default Dropdown;