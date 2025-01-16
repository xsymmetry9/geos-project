import React, {useContext} from "react";
import geosImg from "../assets/images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "./Dropdown";
import { faPencil, faSearch, faPrint } from "@fortawesome/free-solid-svg-icons";
import "../styles/components/header.scss";
import { LanguageContext } from "../App";

const Header = () =>{
    const {language} = useContext(LanguageContext);

    const title = 
    {
        "english": ["English", "Chinese", "Korean", "Japanese"],
        "chinese": ["英語", "中文", "韓語", "日語"],
        "korean": ["영어", "중국어", "한국어", "일본어"],
        "japanese": ["英語", "中文", "韓語", "日語"]
    }
    const languageTitle = {
        "english": "eng",
        "chinese": "言語",
        "korean": "언어",
        "japanese": "語言"
    }

    const langCode = () =>{
        switch(language){
            case "english":
                return `/`;
            case "chinese":
                return `ch/`
            case "korean":
                return `kor/`
            case "japanese":
                return `jp/`
            default:
                return `/`;
        }

    }
    return(
        <>
            <header>
                <div className="header-container">
                    <div className="header-image">
                        <a href="https://online.geos.com.tw/zh-TW/home/home">
                            <img className = "logo" src = {geosImg} alt="Geos logo" />
                        </a>
                    </div>
                <nav className="navigation-root">
                    <ul className='navigation-container'>
                        <li className='btn btn-navigation' id="input">
                            <a href= {`${langCode()}input`} className="nav-icon-container"><FontAwesomeIcon icon={faPencil}></FontAwesomeIcon><span className="hidden">input</span></a>
                        </li>
                        <li className='btn btn-navigation' id="preview">
                            <a href={`${langCode()}preview`} className="nav-icon-container">
                            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon><span className="hidden">preview</span></a></li>
                        <li className="btn btn-navigation" id="print">
                            <a href={`${langCode()}print`} className="nav-icon-container"><FontAwesomeIcon icon={faPrint}></FontAwesomeIcon><span className="hidden">print</span></a></li>
                        <li className="btn btn-navigation" id="nav-languages">
                            <Dropdown buttonTitle = {languageTitle[language.toLowerCase()]} title ={title} language = {language}/>
                        </li>
                    </ul>
           
                </nav>
            </div>

            </header>
        </>
    )
}

export default Header;