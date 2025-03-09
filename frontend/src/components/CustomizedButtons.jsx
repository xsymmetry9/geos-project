import React from "react";
import { SquarePen, SquareX } from "lucide-react";
import PropTypes from "prop-types";

export function CreateNewFormBtn({handleControl}){
    return(
        <>
            <button onClick={handleControl} className="btn-primary flex gap-2 items-center justify-center">
                <SquarePen size={18}/>
                <span>Create</span>
            </button>
        </>
    )
}

export function CloseBtn({handleControl}){
    return(
        <>
            <button className="absolute top-0 right-0 p-1 cursor-pointer" onClick={handleControl}>
                <SquareX className="text-teal-700 group-hover:text-white w-6 h-6" />
            </button>
        
        </>
    )
}


CreateNewFormBtn.propTypes = {
    handleControl: PropTypes.func, 
}
