import { Link, useParams } from "react-router-dom"
import { useState, useId, useEffect } from "react";
import "../styles/components/dashboard.scss";
import User from "../type/User";
import { getDataFromLocal } from "../utils/functions";

export default function Homepage (){
    const {language} = useParams();
    const [userData, setUserData] = useState(null);
        useEffect(() =>{
            const savedData = getDataFromLocal();

            if(!savedData) {
                const newUser = new User(language);
                setUserData(newUser);
                localStorage.setItem("GEOS_app", JSON.stringify(newUser));
            } else {
                 const parsedData = JSON.parse(savedData);
                 parsedData.language = language;
                 setUserData(parsedData);
                 localStorage.setItem("GEOS_app", JSON.stringify(parsedData));   
            }
    
        }, [language]);


    return(
        <>

            <div className="dashboard"> 
                {/* <h1 className="text-2 p-1">Welcome {userData.user}</h1> */}
                <div className="buttons-navigation-container">
                    <Link className="btn-primary" to={`/spr/${language}`}>+ SPR</Link>
                    <Link className="btn-primary" to={`/levelCheck/${language}`}>+ Level Check</Link>
                </div> 
            </div>
        </>

    )
}
