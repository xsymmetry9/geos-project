import { Link, useParams } from "react-router-dom"
import { useState, useId, useEffect } from "react";
import "../styles/components/dashboard.scss";
import User from "../type/User";
import { getDataFromLocal, editDataFromLocal } from "../utils/functions";

export default function Homepage (){
    const {language} = useParams();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

        useEffect(() =>{
            const fetchData = async () => {
                try{
                    const savedData = getDataFromLocal();

                    if(!savedData) {
                        const newUser = new User();
                        newUser.language = language;
                        editDataFromLocal(savedData);
                        setUserData(newUser);
                    } else {
                        const parsedData = JSON.parse(savedData);
                        parsedData.language = language;
                        setUserData(parsedData);
                        }
                    } catch (error) {
                        console.error("Error fetching or updating user data", error);
                    } finally {
                        setLoading(false);
                    }
                };

            fetchData();

        }, [language]);

        if(loading){
            return(
                <><h1>Loading ...</h1></>
            )
        }


    return(
        <>

            <div className="dashboard"> 
                <h1 className="text-2 p-1">Welcome {userData.name}</h1>
                <div className="buttons-navigation-container">
                    <Link className="btn-primary" to={`/spr/${language}`}>+ SPR</Link>
                    <Link className="btn-primary" to={`/levelCheck/${language}`}>+ Level Check</Link>
                </div> 
            </div>
        </>

    )
}
