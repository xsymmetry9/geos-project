import React from "react";
import PropTypes from "prop-types";
import logo from "./logo.svg";

const Image = (props) =>{
  const {style, description} = props;
  return(
    <>
      <img className= {style} src={logo} alt={description}/> 
    </>
  );

};

Image.propTypes = {
  style: PropTypes.string,
  description: PropTypes.string,
};
export default Image;
