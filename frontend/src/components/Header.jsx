import React, {useContext} from "react";
import geosImg from "../assets/images/logo.svg";
import "../styles/components/header.scss";

const Header = () =>{
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
                 
                </nav>
            </div>

            </header>
        </>
    )
}

export default Header;