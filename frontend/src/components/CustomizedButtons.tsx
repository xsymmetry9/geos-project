<<<<<<< HEAD
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
=======
import { SquarePen, SquareX } from "lucide-react";

type ButtonProps = {
    handleControl: () => void;
}
export const CreateNewFormBtn: React.FC<ButtonProps> = ({handleControl}) => (
    <button onClick={handleControl} className="btn-primary flex gap-2 items-center justify-center">
        <SquarePen size={18}/>
        <span>Create</span>
    </button>)


export const CloseBtn: React.FC<ButtonProps> = ({handleControl}) =>
    (
        <button className="absolute top-0 right-0 p-1 cursor-pointer" onClick={handleControl}>
            <SquareX className="text-teal-700 group-hover:text-white w-6 h-6" />
        </button>   
    );

>>>>>>> 8dc84781a0d74170503ab50a7efdbde0598b5c9c
