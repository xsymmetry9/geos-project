import logo from "./logo.svg";
import React from 'react';

const Image = (props) =>{
    const {style, description} = props;
    return(
            <>
                <img className= {style} src={logo} alt={description}/> 
            </>
    );

}

export default Image;
