import { Link, useParams } from "react-router-dom"
import { useState, useId, useEffect } from "react";
import data from "@/utils/data.json"

export default function Homepage (){
    const id = useId();
    const {language} = useParams();

    const [userData, setUserData] = useState(data);
        useEffect(() =>{
            if(localStorage.getItem(!null))
                {
                    localStorage.setItem('GEOS_app', JSON.parse(userData)) 
                } 
            else{
                setUserData(data);
                localStorage.setItem('GEOS_app', JSON.stringify(data) );
            }
    
        }, [userData]);

    return(
        <div> 
            <h1>Welcome {userData.user}</h1>
            <div className="buttons-navigation-container">
                <Link className="btn-primary" to={`/spr/${language}`}>New SPR</Link>
                <Link className="btn-primary" to={`/levelCheck/${language}`}>New Level Check</Link>
            </div> 
            <h2>SPR</h2>
            <table>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Textbook</th>
                </tr>
                {userData && userData.SPR.map((item) => 
                    <>
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.textbook}</td>
                            <td>edit</td>
                        </tr>

                    </>
                )}
            </table>
            <h2>Level Check</h2>
            <table>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Feedback</th>
                </tr>
                {userData && userData.levelCheck.map((item, index) =>
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.feedback}</td>
                    </tr>
                )}
            </table>

        </div>
    )
}
