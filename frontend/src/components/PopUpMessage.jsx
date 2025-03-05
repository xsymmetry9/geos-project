import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { LanguageContext } from "../pages/SPRForm";
import "../styles/components/popupmessage.scss";

const PopUpMessage = ({ setDisplayPopupMessage }) => {
  const language = useContext(LanguageContext);
  return (
    <div className="popUpMessage">
      <div className="header-popup">
        <button onClick={() => setDisplayPopupMessage(false)}>x</button>
      </div>
      <div className="body-popup">
        <h2>Saved successfully!</h2>
        <Link className="btn-primary" to={`/home/${language}`}>
          link to dashboard
        </Link>
      </div>
    </div>
  );
};

PopUpMessage.propTypes = {
  setDisplayPopupMessage: PropTypes.func.required,
};

export default PopUpMessage;
