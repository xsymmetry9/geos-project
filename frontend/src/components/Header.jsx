import React, {useState} from "react";
import geosImg from "../assets/images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faSearch, faPrint } from "@fortawesome/free-solid-svg-icons";


const Header = ({language}) =>{
    const getLanguage = language;
    const title = 
    {
        "english": ["English", "Chinese", "Korean", "Japanese"],
        "chinese": ["英語", "中文", "韓語", "日語"],
        "korean": ["영어", "중국어", "한국어", "일본어"],
        "japanese": ["えいご", "ちゅうごくご", "かんこくご", "にほんご"]
    }

    const langCode = () =>{
        switch(getLanguage.toLowerCase()){
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
                </div>
                <nav>
                <ul className='navigation-container'>
                    <li className='navigation-lists' id="input">
                        <a href= {`${langCode()}input`} className="nav-icon-container"><FontAwesomeIcon icon={faPencil}></FontAwesomeIcon><span className="hidden">input</span></a>
                        </li>
                    <li className='navigation-lists' id="preview">
                        <a href={`${langCode()}preview`} className="nav-icon-container">
                            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon><span className="hidden">preview</span></a></li>
                    <li className="navigation-lists" id="print">
                        <a href={`${langCode()}print`} className="nav-icon-container"><FontAwesomeIcon icon={faPrint}></FontAwesomeIcon><span className="hidden">print</span></a></li>
                    <li>languages</li>
                </ul>
                    <ul>
                        <li><a href="/">{title[language.toLowerCase()][0]}</a></li>
                        <li><a href="/ch">{title[language.toLowerCase()][1]}</a></li>
                        <li><a href="/kor">{title[language.toLowerCase()][2]}</a></li>
                        <li><a href="/jp">{title[language.toLowerCase()][3]}</a></li>
                    </ul>
                </nav>

            </header>
        </>
    )
}

export default Header;