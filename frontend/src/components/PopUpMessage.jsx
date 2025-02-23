import { Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../pages/SPRForm";
import "../styles/components/popupmessage.scss";

const popUpMessage = ({setDisplayPopupMessage}) =>{
    const language = useContext(LanguageContext);
    return(
        <div className="popUpMessage">
            <div className="header-popup">
                <button onClick={() => setDisplayPopupMessage(false)}>x</button>
            </div>
            <div className="body-popup">
                <h2>Saved successfully!</h2>
                <Link className="btn-primary" to={`/home/${language}`}>link to dashboard</Link>
            </div>
        </div>  
    )
}

export default popUpMessage;