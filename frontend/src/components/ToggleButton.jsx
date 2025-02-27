import "../styles/components/toggleButton.scss";

import {useState} from "react";

const ToggleButton = ({onToggle}) => {
    const [isOn, setIsOn] = useState(false);

    const handleToggle = (e) =>{
        const {id} = e.currentTarget;
        const newState = !isOn;
        setIsOn(newState);
        onToggle(prev => ({...prev,
            [id]: !prev.id
        }));
    }
    return(
        <>
            <button 
                id="display_target" 
                className={`toggle-button ${isOn ? "on" : "off"}`} 
                onClick={handleToggle}
            >
                <span className={`toggle-circle ${isOn ? "on" : "off"}`}></span>
            </button>
        </>
    );

};

export default ToggleButton;