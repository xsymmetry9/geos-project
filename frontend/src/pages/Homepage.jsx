import { Link, useParams } from "react-router-dom"
import { useState, useId, useEffect } from "react";
import data from "@/utils/data.json"
import "../styles/components/dashboard.scss";

export default function Homepage (){

    const levelCheckid = useId();
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
        <div className="dashboard"> 
            <h1 className="text-2 p-1">Welcome {userData.user}</h1>
            <div className="buttons-navigation-container">
                <Link className="btn-primary" to={`/spr/${language}`}>+ SPR</Link>
                <Link className="btn-primary" to={`/levelCheck/${language}`}>+ Level Check</Link>
            </div> 
            <h2 className="text-2 p-1">SPR</h2>
            <table id="spr-table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Textbook</th>
                    </tr>
                </thead>
                <tbody>
                    {userData && userData.SPR.map((item, index) => 
                        <>
                            <tr key={`spr-${index}`}>
                                <td key={`spr-${index}-id`}>{item.id}</td>
                                <td key={`spr-${index}-name`}>{item.name}</td>
                                <td key={`spr-${index}-textbook`}>{item.textbook}</td>
                            </tr>

                        </>
                    )}
                </tbody>
               
            </table>

            <h2 className="text-2 p-1">Level Check</h2>

            <table id="level-check-table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {userData && userData.levelCheck.map((item) =>
                        <tr key={`${levelCheckid}}`}>
                            <td key={`${levelCheckid}-levelCheck-id`}>{item.id}</td>
                            <td key={`${levelCheckid}-levelCheck-name`}>{item.name}</td>
                            <td key={`${levelCheckid}-levelCheck-feedback`}>{item.feedback}</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    )
}
