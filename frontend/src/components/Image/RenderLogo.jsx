import React from "react";
import logo from "./logo.svg";

const Image = (props) =>{
  const {style, description} = props;
  return(
    <>
      <img className= {style} src={logo} alt={description}/> 
    </>
  );

};

export default Image;
